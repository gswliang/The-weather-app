import { useState, useEffect } from "react";
import "./styles.css";
import styled from "styled-components";
import WeatherCard from "./WeatherCard";
import Input from "./Input";
import { getGeoLocation, getTemperature } from "./api";

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

const SearchInput = styled(Input)`
  position: absolute;
  top: 160px;
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

export default function App() {
  const [inputText, setInputText] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [long, setLong] = useState();
  const [lat, setLat] = useState();

  const init = () => {
    // get long/lat of the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => {
        setLong(res.coords.longitude);
        setLat(res.coords.latitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    init();
  }, []);

  const getTemp = async (city) => {
    const { data } = await getTemperature(city);
    setWeatherData(data);
  };

  const onSearchButtonClick = () => {
    console.log("clicked!!!", inputText);
    getGeoLocation(inputText)
      .then((res) => {
        // get long, lat of the first searched result in the array
        const [lat, long] = res.data.features[0].center;
        console.log("lat", lat);
        console.log("long", long);
      })
      .catch((e) => {
        console.error(e);
      });

    getTemp(inputText);
  };

  const Search = (
    <SearchButton onClick={onSearchButtonClick}>Search</SearchButton>
  );

  return (
    <div className="App">
      <WeatherMain>
        <Title>The Weather App</Title>
        <SearchInput
          placeholder="Search a city..."
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          suffix={Search}
        />
        <WeatherCard weather={weatherData} />
      </WeatherMain>
    </div>
  );
}
