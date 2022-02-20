import React, {useEffect, useState} from 'react';
import Header from '../header/Header';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
//import useWatchLocation from "../location/useWatchLocation";
//import { geolocationOptions } from "../../constants/geolocationOptions";

const Home = (props) =>{

  const [location, setLocation] = useState({ lat: "", lng: "", });
  //const { location, error } = useWatchLocation(geolocationOptions);

  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);

        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

return(
  <div>
        <Header username={props.location.state.username}/>
        <Map google={props.google}
             style = {{width: "100%", height: "100%"}}
             zoom = {6}
             initialCenter = {{lat: 18.762391, lng: -69.439192}}>

             <Marker 
                name={'Posicion Actual'} 
                key="marker_1"
                position={{lat: location.lat, lng: location.lng}}
              />
        </Map>

  </div>
)}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB3rjwTiwERUQZJ-eY3NqtpfabR04Jqt-E"
})(Home)