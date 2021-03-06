import React, {useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import axios from 'axios'; 
import { Avatar } from '@mui/material';


import { useStateContext } from '../../context/ContextProvider';
import  UserProfile  from '../userprofile/UserProfile';

import RequestMonitor from '../request/RequestMonitor'

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);


const Navbar = (props) => {

  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  // Usuario logueado en sistema.
  const[userin, setUserin] = useState({
    id: '',
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    department: '',
    avatar: '',
    role: ''
  });

   // Hook para almacenar la imagen del usuario.
   const [avatarC, setAvatar] = useState({
    image: '',
    preview: '',
  });

  const onCrop = (preview) => {
    avatarC.preview = preview;
    console.log(preview.name);
    console.log(avatarC.image.name);
  }

  // Empresa a la cual el usuario logueado trabaja.
  const[namecompany, setNameCompany] = useState();
  
  useEffect(() => {

    axios.get("https://localhost:44322/api/auth/obtainuserrole/" + localStorage.getItem('username'))
      .then((response  => {                                   
        setUserin({
          id: response.data.user.id,
          firstname: response.data.user.firstName,
          lastname: response.data.user.lastName,
          username: response.data.user.userName,
          email: response.data.user.email,
          department: response.data.user.department,
          avatar: response.data.user.avatar,
          role: response.data.role,
        });      

        avatarC.image = response.data.user.avatar;
        /*Se guarda el user y sus datos en LocalStorage */         
      
        localStorage.setItem('userdata', JSON.stringify(response.data.user));
      }))
      .catch(function (response) {
        console.log(response);
      });

    axios.get("https://localhost:44322/api/company/ObtainNameCompanyEmployee/" + localStorage.getItem('username'))
      .then((response  => {
           setNameCompany(response.data.nameCompany);
       }))
       .catch(function (response) {
         console.log(response);
       });

  }, [props.username]);


  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const handleLogout = () => {

    localStorage.clear();

    axios({
      method: "post",
      url: "https://localhost:44322/api/auth/logout",
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
        props.history.push('/');
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  console.log(userin);

  

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton title="Menu" 
      customFunc={handleActiveMenu} 
      color={currentColor} icon={<AiOutlineMenu />} />
      

       {/* Ac?? se pueden colocar otros botones  */}
      <div className='flex'>

     
      <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="rounded-full w-8 h-8"
              alt={userin.firstname + " " + userin.lastname} src={onCrop}
            />
            <p>
              <span className="text-gray-400 text-14">Hola,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {userin.firstname}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {/** Se abre la ventana del UserProfile. Si le da click se renderiza el componente */}
        {isClicked.userProfile && (<UserProfile />)}

        <NavButton title="LogOut" customFunc={handleLogout} color={currentColor} icon={<FiLogOut />} />

      </div>
    </div>
  )
}

export default withRouter(Navbar)