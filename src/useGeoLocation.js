import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => {
        setLong(res.coords.longitude);
        setLat(res.coords.latitude);
      });
    } else {
      // set a default long lat if browser does not support geolocation
      setLong("long");
      setLat("lat");
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  return [long, lat];
};
export default useGeoLocation;
