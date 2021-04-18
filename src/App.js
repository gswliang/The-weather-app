import { useState, useEffect, useRef } from "react";
import "./styles.css";
import styled, { keyframes } from "styled-components";
import WeatherCard from "./WeatherCard";
import Input from "./Input";
import Loader from "./Loader";
import { getGeoLocation, getTemperature } from "./api";
import useGeoLocation from "./useGeoLocation";

const WeatherMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 10px;
`;

const Title = styled.h1`
  font-family: "Dancing Script", cursive;
  position: absolute;
  top: 60px;
  font-weight: 800;
`;

const Form = styled.form`
  position: absolute;
  top: 160px;
`;

const SearchInput = styled(Input)`
  position: relative;
`;

const SearchButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: bold;
  height: 30px;
  background-color: #fae3e4;
  padding: 0 10px;
  letter-spacing: 2px;
`;

const rotate = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(20px);
  }
`;

const NoDataText = styled.h1`
  animation: ${rotate} 1.5s linear alternate infinite;
`;

export default function App() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [long, lat] = useGeoLocation();
  const [message, setMessage] = useState("");

  const init = () => {
    setIsLoading(true);
    if (!long || !lat) {
      setMessage("Cannot retrieve weather data...");
      return;
    }
    getTemp(`${lat},${long}`).then((data) => {
      if (data.error) {
        return;
      }
      setWeatherData(data);
    });
  };

  useEffect(() => {
    init();
  }, []);

  const getTemp = async (coordinate) => {
    const { data } = await getTemperature(coordinate);
    return data;
  };

  const onSearchButtonClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!inputText) {
      setMessage("Search for a city...");
      setWeatherData(null);
      setIsLoading(false);
      return;
    }
    getGeoLocation(inputText)
      .then((res) => {
        // get long, lat of the first searched result in the array
        if (!res.data.features.length) {
          setMessage("Cannot retrieve weather data...");
          setWeatherData(null);
          setIsLoading(false);
          return;
        }
        const [lat, long] = res.data.features[0].center;
        getTemp(`${long},${lat}`).then((data) => {
          setWeatherData(data);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    setIsLoading(false);
  }, [weatherData]);

  const Search = <SearchButton>Search</SearchButton>;

  const NoWeather = <NoDataText>{message}</NoDataText>;

  const Loading = <Loader message="Loading .." />;

  const WeatherInfo = (
    <WeatherMain>
      <Title>The Weather App</Title>
      <Form onSubmit={onSearchButtonClick}>
        <SearchInput
          placeholder="Search a city..."
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          suffix={Search}
        />
      </Form>
      {weatherData ? <WeatherCard weather={weatherData} /> : NoWeather}
    </WeatherMain>
  );

  return <div className="App">{isLoading ? Loading : WeatherInfo}</div>;
}
