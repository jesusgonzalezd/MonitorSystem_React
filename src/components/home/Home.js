import React, {useEffect, useState} from 'react';
import Header from '../header/Header';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
//import useWatchLocation from "../location/useWatchLocation";
//import { geolocationOptions } from "../../constants/geolocationOptions";

const Home = (props) =>{

  //Hook para conocer si un usuario esta logueado o no.
  const[userin, setUserin] = useState(false);

  const [location, setLocation] = useState({ lat: "", lng: "", });
  //const { location, error } = useWatchLocation(geolocationOptions);
  const [showInfoWindow, setshowInfoWindow] = useState({
      activeMarker: {},
      selectedPlace: {},
      showing: false
  });

  useEffect(() => {

    if(props.postObject.username === undefined)
       setUserin(false);

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, [props.postObject.username]);

  const onMarkerClick = (props, marker) =>
    setshowInfoWindow({
      activeMarker: marker,
      selectedPlace: props,
      showing: true
    });

  const onInfoWindowClose = () =>
    setshowInfoWindow({
      activeMarker: null,
      selectedPlace: '',
      showing: false
    });

  const onMapClicked = (t, map, coord) => {

    // Obtener coordenadas con un click al mapa.
    const { latLng } = coord;
    const latitude = latLng.lat();
    const longitude = latLng.lng();
    console.log("Latitud: " + latitude + " Longitud: " + longitude);

    if (showInfoWindow.showing)
    setshowInfoWindow({
        activeMarker: null,
        selectedPlace: '',
        showing: false
      });
  };

return(
  <div>
    {userin? 
        <div>
              <Header username={props.location.state.username}/>
              <Map className="map"
                  google={props.google}
                  onClick={onMapClicked}
                  style={{ height: "100%", width: "100%" }}
                  zoom={7}
                  initialCenter = {{lat: 18.762391, lng: -69.439192}}
              >
                <Marker
                  name={"Latitud: " + location.lat + " Longitud: " + location.lng}
                  onClick={onMarkerClick}
                  position={{ lat: location.lat, lng: location.lng }}
                />

                <InfoWindow
                  marker={showInfoWindow.activeMarker}
                  onClose={onInfoWindowClose}
                  visible={showInfoWindow.showing}
                >
                  <div>
                    <h4>{showInfoWindow.selectedPlace.name}</h4>
                  </div>
                </InfoWindow>
            </Map>
        </div>
        :  <div/> 
    }
  </div>
)}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB3rjwTiwERUQZJ-eY3NqtpfabR04Jqt-E"
})(Home)