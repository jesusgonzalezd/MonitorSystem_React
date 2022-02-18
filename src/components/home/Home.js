import React, {useEffect, useState} from 'react';
import Header from '../header/Header';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';

const Home = (props) =>{

  const[state, setState] = useState({
      currentLocation: {lat: 18.476310, lng: -69.937382}
  })

  const [ubicacion, setUbicacion] = useState({
      longitude: '',
      latitude: ''
  })

  useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        function (position) {
            console.log(position.coords.longitude);
            console.log(position.coords.latitude);
            console.log(position.coords.accuracy);

            setUbicacion({longitude: position.coords.longitude, latitude: position.coords.latitude})
      }, 
      function (error) {
          console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }, []);

return(
  <div>
        <Header username={props.location.state.username}/>
        <Map google={props.google}
             style = {{width: "100%", height: "100%"}}
             zoom = {10}
             initialCenter = {state.currentLocation}>

             <Marker key="marker_1"
                position={ubicacion.latitude, ubicacion.longitude} />
        </Map>

  </div>
)}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB3rjwTiwERUQZJ-eY3NqtpfabR04Jqt-E"
})(Home)