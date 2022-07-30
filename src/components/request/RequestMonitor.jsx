import React, { useEffect, useState, useMemo } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import axios from 'axios'; 

import Button  from '../button/Button';
import { useStateContext } from '../../context/ContextProvider';
import Snackbar from '../snackbar/Snackbar';
import Moment from 'react-moment';
import Lottie from 'react-lottie';
import animationData from '../../assets/9909-order-success';

const RequestMonitor = (props) => {

  const { setCurrentColor, setCurrentMode, currentMode, currentUser, setUserCurrent, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

    // Empresa a la cual el usuario logueado trabaja.
  const[namecompany, setNameCompany] = useState();

   // Contenido del Snackbar.
   const[snack, setsnack] = useState({});

  
  const [request,setRequest] = useState({
    id: '',
    status: '',
    datecreation: ''
    });


    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    useEffect(() => {

    
        axios.get("https://localhost:44322/api/company/ObtainNameCompanyEmployee/" + props.username)
             .then((response  => {
                  setNameCompany(response.data.nameCompany);
              }))
              .catch(function (response) {
                console.log(response);
              });
    
         //Se trae la solicitud de actualización abierta, de haberla
         axios.get("https://localhost:44322/api/request/ObtainLastRequest/" + localStorage.getItem('idCompany'))
         .then((response  => {
           setRequest({
             id: response.data.idRequest,
             status: response.data.status,
             datecreation: response.data.dateCreation              
           });
             console.log("Muestrame el request")             
             console.log(request);
    
            
         }))
         .catch(function (response) {
           console.log(response);
         });       
    
    }, [props.username]);


//Función para solución de Request. Se deshabilita el botón una vez se modifica la solicitud.
    const handleRequest = () => {
            
        var bodyFormData = new FormData();
    
        bodyFormData.append('IdCompany', localStorage.getItem('idCompany'));        
    
        console.log("Muestrame lo que guardo")             
        console.log(bodyFormData.getAll('IdCompany')+request.id + localStorage.getItem('idCompany') );
    
        axios({
        method: "put",
        url: "https://localhost:44322/api/request/update/"+ localStorage.getItem('idCompany'),
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

    return (
        <div className="nav-item absolute right-10 top-20 bg-white p-8 rounded-lg w-96">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg text-black">Solicitudes</p>
              <Button
                icon={<MdOutlineCancel />}
                color="rgb(26, 151,245)"
                bgHoverColor="light-gray"
                size="2xl"
                borderRadius="50%"
              />
          </div>
          {
            request.id !== undefined ?

            <div>
                  <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">            
                      <div>
                          <p className="font-sm text-black">tiene una solicitud pendiente</p>
                      </div>
                  </div> 
                      <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
                          <div>
                              <p className="font-semibold text-black">
                                <Moment format='MMMM Do YYYY, h:mm:ss a'>{request.datecreation}</Moment>
                              </p>                  
                          </div>
                  </div>
                  <div className="mt-5">
                      <button 
                              type="button"              
                              className={` bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded`}
                              borderRadius="10px"
                              size="md"               
                              onClick={() => handleRequest()}              
                              >Actualizar posiciones para supervisor
                      </button> 
                  </div>
            </div>
          : 
          
            <div> 
                  <Lottie 
                      options={defaultOptions}
                        height={300}
                        width={300}
                      />
                      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">            
                      <div>
                          <p className="font-sm text-center text-black">No tienes solicitudes pendientes</p>
                      </div>
                  </div> 
            </div>
        }
        </div>
    
      );
}

export default RequestMonitor