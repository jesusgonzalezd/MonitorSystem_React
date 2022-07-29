import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

import Snackbar from '../snackbar/Snackbar';
import { useStateContext } from '../../context/ContextProvider';

const Request_monitor = (props) => {

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


//Función para registro de Request. Se deshabilita el botón una vez se manda la solicitud.
const handleRequest = () => {
        
    var bodyFormData = new FormData();
  
    bodyFormData.append('IdCompany', localStorage.getItem('idCompany'));        
  
    console.log("Muestrame lo que guardo")             
    console.log(bodyFormData.getAll('IdCompany'));
  
    axios({
      method: "put",
      url: "https://localhost:44322/api/request/update/"+ request.id + localStorage.getItem('idCompany'),
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


   <div className="m-2 md:m-10 mt-20 p-2 md:p-10 bg-white rounded-3xl">
        <div className="bg-white">
            <div className="flex justify-between items-center">
                {request.id !== undefined ?
                 <div>
                    <p className="font-bold text-gray-600">Solicitud pendiente con fecha:</p>
                    <p className="text-2xl">{request.datecreation}</p>
                 </div>
                 : <div/>
                }               
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
  </div>
  )
}

export default withRouter(Request_monitor);