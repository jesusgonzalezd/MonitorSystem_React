import React, {useEffect, useState, useMemo} from 'react';
import Header from '../header/Header';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import { withRouter, Redirect} from 'react-router-dom';
import Snackbar from '../snackbar/Snackbar';
import axios from 'axios';

const Home = (props) =>{

  const [location, setLocation] = useState();

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
    },
  ];

  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAL1SkGABwvcHm8nZ6c1xlNCNVcnCi9ye8"
  })

  const [, setAccuracy] = useState();
  const [, setError] = useState();
  const [role, setRole] = useState();

  useEffect(() => {

    axios.get("https://localhost:44322/api/administration/obtainuserrole/" + props.location.state.username)
    .then((response  => {
        setRole(response.data.role);
    }))
    .catch(function (response) {
      console.log(response);
    });
    
    if(role === 'Employee'){
            if (navigator.geolocation) {
              const geoId = navigator.geolocation.watchPosition(
                (position) => {
                  const lat = position.coords.latitude;
                  const lng = position.coords.longitude;

                  if (position.coords.accuracy > 10) {

                        setsnack({ motive: 'info', text: "La precision del GPS no es suficientemente estable.", appear: true, });
                        setLocation({ lat, lng });
                        setAccuracy(position.coords.accuracy);
                        console.log({ lat, lng }, position.coords.accuracy);

                        // Envio de Locations a la base de datos.
                        function saveLocations () {
                          var bodyFormData = new FormData();
                        
                          bodyFormData.append('Username', props.location.state.username);
                          bodyFormData.append('Latitude', position.coords.latitude);
                          bodyFormData.append('Longitude', position.coords.longitude);
                        
                          axios({
                            method: "post",
                            url: "https://localhost:44322/api/location/register",
                            data: bodyFormData,
                            headers: { "Content-Type": "multipart/form-data" },
                          })
                            .then(function (response) {
                              setsnack({
                                motive: 'success', text: response.data.message, appear: true,
                              });
                            })
                            .catch(function (error) {
                              setsnack({
                                motive: 'error', text: error.message, appear: true,
                              });
                            });
                          };
                          saveLocations();
                }
                },
                (e) => {
                  setsnack({
                    motive: 'error', text: e.message, appear: true,
                  });
                  setError(e.message);
                },
                { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
              );
              return () => {
                setsnack({
                  motive: 'error', text: 'Clear Watch', appear: true,
                });
                window.navigator.geolocation.clearWatch(geoId);
              };
            }
    }
  }, [role, props.location.state.username]);

  const onMapClicked = (coord) => {
    const latitude = coord.latLng.lat();
    const longitude = coord.latLng.lng();
    console.log("Latitud: " + latitude + " Longitud: " + longitude);
  };

  const center = useMemo(() => ({lat: 18.762391, lng: -69.439192}), []);

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

return isLoaded ?(
        <div>
           {props.location.state !== undefined?
             <div>
              <Header username={props.location.state.username}/>
              <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={7}
                  center = {center}
                  onClick={coord => onMapClicked(coord)}
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
                  position={location}
                  animation={window.google.maps.Animation.BOUNCE}
                  visible={true}
                  icon={{url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                        anchor: window.google.maps.Point(17, 46),
                        scaledSize: window.google.maps.Size(37, 37),
                  }}
                >
                </Marker>

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