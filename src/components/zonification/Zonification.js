import React, {useEffect, useState} from 'react';
import Header from '../header/Header';
import {Map, GoogleApiWrapper, Marker, InfoWindow, Polyline} from 'google-maps-react';
import {Button, Box} from '@mui/material';

const Zonification = (props) =>{

  const [location, setLocation] = useState({ lat: "", lng: "", });
  //const { location, error } = useWatchLocation(geolocationOptions);
  const [showInfoWindow, setshowInfoWindow] = useState({
      activeMarker: {},
      selectedPlace: {},
      showing: false
  });

  const [lastlocation, setLastLocation] = useState({});

  const [coords, setCoords] = useState([]);

  const [paths, setPaths] = useState([]);

  const [onZone, setOnZone] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

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

    const pathObject = {lat: latitude, lng: longitude};

    setLastLocation(pathObject);

    setCoords(coords => [...coords, pathObject]);

    console.log(coords);

    if(coords.length == 0)
      setOnZone(true);

    if (showInfoWindow.showing)
    setshowInfoWindow({
        activeMarker: null,
        selectedPlace: '',
        showing: false
      });
  };

  const onSaveZone = () => {
    
    const initialCoords = coords[0];
    setCoords(coords => [...coords, initialCoords]);

    setPaths(paths => [...paths, coords]);

    setOnZone(false);

    console.log(coords);
    console.log(paths);
  };

  const handleDeleteZone = (e) => {

  };

return(
  <div>
        <Header username={props.location.state.username}/>
        <Map className="map"
             google={props.google}
             onClick={onMapClicked}
             style={{ height: "100%", width: "100%" }}
             zoom={17}
             initialCenter = {{lat: 18.538119, lng: -69.944318}}
        >
          {onZone? (
                  <Box textAlign='center'>
                          <Button 
                              onClick={onSaveZone}
                              variant='contained'
                              color='success'>
                                Guardar Zona
                          </Button>
                          <Button 
                              onClick={handleDeleteZone}
                              variant='contained'
                              color='error'>
                                Eliminar Zona
                          </Button>
                  </Box>
              ) : null}
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

            <Polyline
                path={coords}
                strokeColor="#1E1E1E"
                strokeOpacity={0.8}
                strokeWeight={5}
            />

          { paths && paths.map((item, index) => {
            return(            
                    <Polyline key={index}
                          path={item}
                          strokeColor="#1E1E1E"
                          strokeOpacity={0.8}
                          strokeWeight={5}
                    />
           ); // Termina el return, mostrando cada una de las tarjetas de productos.
          })
        }
      </Map>
  </div>
)}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB3rjwTiwERUQZJ-eY3NqtpfabR04Jqt-E"
})(Zonification)