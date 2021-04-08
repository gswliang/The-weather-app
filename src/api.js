import axios from "axios";

// do not put your access tokens here
// this is for demostration purposes only
const MAP_BOX_TOKEN =
  "pk.eyJ1IjoidGVycnkwMzE1IiwiYSI6ImNrM24wZmtpNzFrejUzanQ3eWw4Z2FtbDUifQ.mJt7R5egrK_ofYtgnHD5sw";

const WEATHER_TOKEN = "68816e03c47fef0521f306655b0e3232";

const mapboxInstance = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/",
  timeout: 10000,
});

const weatherURL = axios.create({
  baseURL: "http://api.weatherstack.com/",
  timeout: 10000,
});

export const getGeoLocation = (location) => {
  return mapboxInstance.get(
    `mapbox.places/${location}.json?access_token=${MAP_BOX_TOKEN}&language=zh_tw`
  );
};

export const getTemperature = (location) => {
  return weatherURL.get("current", {
    params: {
      access_key: WEATHER_TOKEN,
      query: location,
    },
  });
};
