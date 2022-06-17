import React, {useEffect, useState, useMemo} from 'react';
import Header from '../header/Header';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import { Link as RouterLink, withRouter, Redirect} from 'react-router-dom';
import Snackbar from '../snackbar/Snackbar';

const Home = (props) =>{

  const [location, setLocation] = useState();

  const [, setshowInfoWindow] = useState({
      activeMarker: {},
      selectedPlace: {},
      showing: false
  });

  // Contenido del Snackbar.
const[snack, setsnack] = useState({});

  const markers = [
    {
      id: 1,
      name: "Chicago, Illinois",
      position: { lat: 41.881832, lng: -87.623177 }
    },
    {
      id: 2,
      name: "Denver, Colorado",
      position: { lat: 39.739235, lng: -104.99025 }
    },
    {
      id: 3,
      name: "Los Angeles, California",
      position: { lat: 34.052235, lng: -118.243683 }
    },
    {
      id: 4,
      name: "New York, New York",
      position: { lat: 40.712776, lng: -74.005974 }
    }
  ];

  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAL1SkGABwvcHm8nZ6c1xlNCNVcnCi9ye8"
  })

  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {

          setInterval(() => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          }, 5000);

          setsnack({
              motive: 'success', text: "Posicion Actualizada", appear: true,
          });
          },  error => {
          setsnack({
              motive: 'error', text: error.code, appear: true,
          });
          },{
              enableHighAccuracy: true,
              maximumAge: 0,
          });
    }

    // Manejo de perdida de memoria - Funcion de limpieza
    return () => {
      setLocation({});
    };
  }, []);

  const onMarkerClick = (props, marker) =>
    setshowInfoWindow({
      activeMarker: marker,
      selectedPlace: props,
      showing: true
    });

  /*const onInfoWindowClose = () =>
    setshowInfoWindow({
      activeMarker: null,
      selectedPlace: '',
      showing: false
    });*/

  /*const onMapClicked = (t, map, coord) => {

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
  };*/

  const center = useMemo(() => ({lat: 18.762391, lng: -69.439192}), []);

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  /*const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };*/

return isLoaded ?(
        <div>
           {props.location.state !== undefined?
             <div>
              <Header username={props.location.state.username}/>
              <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={7}
                  center = {center}
                  //onLoad={handleOnLoad}
                  onClick={() => setActiveMarker(null)}
              >
                {markers.map(({ id, name, position }) => (
                  <Marker
                    key={id}
                    position={position}
                    onClick={() => handleActiveMarker(id)}
                    animation={window.google.maps.Animation.BOUNCE}
                  >
                    {activeMarker === id ? (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <div>{name}</div>
                      </InfoWindow>
                    ) : null}
                  </Marker>
                ))}

                <Marker
                  onClick={onMarkerClick}
                  position={location}
                  animation={window.google.maps.Animation.BOUNCE}
                  visible={true}
                  /*icon={{url: '',
                        anchor: window.google.maps.Point(17, 46),
                        scaledSize: window.google.maps.Size(37, 37),
                  }}*/
                />

            </GoogleMap>
            </div> :
            <div>
              <Redirect to="/home"/>
            </div>
          }
           {snack.appear?
              <div> <Snackbar motive={snack.motive} text={snack.text} appear={snack.appear}/> </div>
              : <div/>
          }
        </div>
) : <></>
}

export default withRouter(Home);