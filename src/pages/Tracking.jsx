import React, { useEffect, useState, useMemo } from 'react';
import { withRouter, Redirect} from 'react-router-dom';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import Snackbar from '../components/snackbar/Snackbar';
import axios from 'axios';
import { HeaderTable } from '../components';
import { Button} from '../components';
import { useStateContext } from '../context/ContextProvider';

const Tracking = (props) => {

    const { setCurrentColor, setCurrentMode, currentMode, currentUser, setUserCurrent, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

    const [location, setLocation] = useState();

    const [request,setRequest] = useState({
      id: '',
      status: '',
      datecreation: ''
      });
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
    
   const [disable, setDisable] = useState(false);
  
    
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
                  localStorage.setItem('idCompany', response.data.idCompany);
    
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


        
          axios.get("https://localhost:44322/api/request/ObtainLastRequest/" + localStorage.getItem('idCompany'))
          .then((response  => {
            setRequest({
              id: response.data.idRequest,
              status: response.data.status,
              datecreation: response.data.dateCreation              
            });
              console.log("Muestrame el request")             
              console.log(request);

              request.status === undefined  ? setDisable(false) : setDisable (true);
              console.log(disable);
          }))
          .catch(function (response) {
            console.log(response);
          });  
        
    
      }, [role, localStorage.getItem('username')]);
    
      //Función para registro de Request
      const handleRequest = () => {
        
          var bodyFormData = new FormData();
        
          bodyFormData.append('IdCompany', localStorage.getItem('idCompany'));        
        
          console.log("Muestrame lo que guardo")             
          console.log(bodyFormData.getAll('IdCompany'));
        
          axios({
            method: "post",
            url: "https://localhost:44322/api/request/register",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              setDisable(true);
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
        <div class = "grid grid-cols-2 gap-8 content-start p-4">
        <HeaderTable category="Servicio" title="Tracking" />
        
         <div className="flex flex-col ml-auto justify-between items-start">
            
         {request.id === undefined ? (
               <button 
               type="button"              
               className={` bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded`}
               borderRadius="10px"
               size="md"
               disabled={disable}
               onClick={() => handleRequest()}              
             >Solicitar actualización de posiciones
             </button>
            ) : ( 
              <div className='ml-auto'>
               <p className="font-bold text-gray-500">Ya cuenta con una solicitud abierta</p>
               <p className="font-bold text-gray-500">espere por la respuesta del monitor</p>
              <p className="text-1xl mt-2">{request.datecreation}</p>
             </div>
            
            )}           
           
                     
          </div>
          
         

        </div>

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