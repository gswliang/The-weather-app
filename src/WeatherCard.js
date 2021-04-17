import { useEffect } from "react";
import styled from "styled-components";
import cloudyIcon from "./img/cloudy.png";

const WeatherCardContainer = styled.div`
  width: 400px;
  height: 200px;
  border-radius: 15px;
  background-color: #fae3e4;
  padding: 20px 40px;
  position: fixed;
  display: flex;
  text-align: center;
  color: #9d9691;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
`;

const WeatherIconWrapper = styled.div`
  align-self: center;
  flex: 1;
`;

const WeatherIcon = styled.img`
  width: 50%;
`;

const WeatherIconText = styled.p`
  margin-top: 20px;
  font-size: 18px;
`;

const WeatherTempWrapper = styled.div`
  flex: 1;
  align-self: center;
`;

const WeatherTemp = styled.p`
  font-size: 50px;
  font-weight: bold;
  color: #000;
`;

const WeatherTempLocation = styled.p`
  margin-top: 10px;
`;

const WeatherCard = ({ weather }) => {
  const status = () => {
    if (weather) {
      const iconText = weather.current.weather_descriptions[0];
      const icon = weather.current.weather_icons[0];
      const temp = weather.current.temperature;
      const region = weather.location.region;
      const tempCity = weather.location.name;

      return (
        <WeatherCardContainer>
          <WeatherIconWrapper>
            <WeatherIcon src={icon} alt="icon" />
            <WeatherIconText>{iconText}</WeatherIconText>
          </WeatherIconWrapper>
          <WeatherTempWrapper>
            <WeatherTemp>{temp}&deg;</WeatherTemp>
            <WeatherTempLocation>{`${region}, ${tempCity}`}</WeatherTempLocation>
          </WeatherTempWrapper>
        </WeatherCardContainer>
      );
    }

    return null;
  };
  return status();
};

export default WeatherCard;
