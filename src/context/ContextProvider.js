import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    userProfile: false,
    requestMonitor: false
}

export const ContextProvider = ({ children }) => {
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#03C9D7'); /**Color default */
    const [currentMode, setCurrentMode] = useState('Light'); /**Modo default */
    const [themeSettings, setThemeSettings] = useState(false); /**Está abierto o no */
    const [activeMenu, setActiveMenu] = useState(true);   
    const [isClicked, setIsClicked] = useState(initialState);
    const [currentUser, setCurrentUser] = useState(undefined);

    const setMode = (e) => {
      setCurrentMode(e.target.value);
      localStorage.setItem('themeMode', e.target.value);
    };

    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
      };

    const setUserCurrent = (user) =>{
      setCurrentUser(user);
      localStorage.setItem('userCurrent', user);
    }
    
    
    {/** función que se encarga de redireccionar los click. Se cambia el valor de lo clickeado a true */}
    const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });
    
    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <StateContext.Provider 
        value={{ 
          currentColor, 
          currentMode, 
          activeMenu, 
          screenSize,
          currentUser, 
          setScreenSize, 
          handleClick, 
          isClicked, 
          initialState, 
          setIsClicked, 
          setActiveMenu, 
          setCurrentColor, 
          setCurrentMode, 
          setCurrentUser,
          setMode, 
          setColor,
          setUserCurrent, 
          themeSettings, 
          setThemeSettings }}>
          {/* Se traen todos los children para poder mostrar todos los componentes al cargar el context */}
          {children}
        </StateContext.Provider>
      );
    };

    export const useStateContext = () => useContext(StateContext);
