import React, { useEffect, useState, useMemo } from 'react';
import { withRouter, Redirect} from 'react-router-dom';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import Snackbar from '../components/snackbar/Snackbar';
import axios from 'axios';
import { HeaderTable } from '../components';


const Tracking = (props) => {


    const [location, setLocation] = useState();

    // Contenido del Snackbar.
    const[snack, setsnack] = useState({});
  
    const [markerEmployees, setmarkerEmployees] = useState([]);
  
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
  
    let details = JSON.parse(localStorage.getItem('userdata'));

    console.log(details.firstname);

    useEffect(() => {

        // Traera el role del usuario logueado mediante su username.
        axios.get("https://localhost:44322/api/administration/obtainuserrole/" + localStorage.getItem('username'))
        .then((response  => {
            setRole(response.data.role);
        }))
        .catch(function (response) {
          console.log(response);
        });
    
              // Traera el idCompany de la empresa a la cual trabaja el usuario logueado mediante su username.
              axios.get("https://localhost:44322/api/company/ObtainIdCompanyEmployee/" + localStorage.getItem('username'))
              .then((response  => {
    
                  var idCompany = response.data.idCompany;
    
                setInterval(function() {
                  if(role === 'Monitor'){
                        axios.get("https://localhost:44322/api/location/GetAllEmployeesLastLocation/" + idCompany)
                        .then((response  => {
                            console.log("Prueba");
                            setmarkerEmployees(response.data);
                        }))
                        .catch(function (response) {
                          console.log(response);
                        });
                  }
                }, 5000);
                //clearInterval(interval);
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
                            
                              bodyFormData.append('Username', localStorage.getItem('username'));
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
    
      }, [role, localStorage.getItem('username')]);
    

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
    
      console.log(markerEmployees);


  return isLoaded ?(
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <HeaderTable category="Servicio" title="Tracking" />
        <div>
           {props.location.state !== undefined?
             <div>             
              <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={7}
                  center = {center}
                  onClick={coord => onMapClicked(coord)}
              >
                {markerEmployees.map(({ idLocation, firstName, latitude, longitude }) => (
                  <Marker
                    key={idLocation}
                    position={{lat: latitude, lng: longitude}}
                    onClick={() => handleActiveMarker(idLocation)}
                    animation={window.google.maps.Animation.BOUNCE}
                  >
                    {activeMarker === idLocation ? (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <div>{markerEmployees.employee.firstName}</div>
                      </InfoWindow>
                    ) : null}
                  </Marker>
                ))}

              {role === 'Employee'?
              <div>
                <Marker
                  position={location}
                  animation={window.google.maps.Animation.BOUNCE}
                  visible={true}
                >
                </Marker>
                </div> : <div/>
              }

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

    </div>
  ): <></>
}

export default withRouter(Tracking);