import React, {useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import axios from 'axios'; 

import avatar from '../../data/avatar.jpg';
import { useStateContext } from '../../context/ContextProvider';
import  UserProfile  from '../userprofile/UserProfile';


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

  
  useEffect(() => {

    axios.get("https://localhost:44322/api/auth/obtainuserrole/" + props.username)
      .then((response  => {
        console.log(response.data);
        console.log("Entro");

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
      

       {/* Acá se pueden colocar otros botones  */}
      <div className='flex'>
      <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="rounded-full w-8 h-8"
              alt={userin.firstname + " " + userin.lastname} src=""
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {userin.firstname}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {/** Se abre la ventana del UserProfile. Si le da click se renderiza el componente */}
        {isClicked.userProfile && (<UserProfile />)}

      </div>
    </div>
  )
}

export default Navbar