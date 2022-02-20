import { useState, useEffect } from "react";

const useWatchLocation = (options = {}) => {
  
  const [location, setLocation] = useState({ lat: "", lng: "", });
  const [error, setError] = useState();

  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;

    console.log("Latitude: " + latitude + "\n" + "Longitude: " + longitude);

    setLocation({
      lat: latitude,
      lng: longitude,
    });
  };

  const handleError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }
    else{
      geolocation.watchPosition(handleSuccess, handleError, options);
    }

  }, [options]);

  return { location, error };
};

export default useWatchLocation;