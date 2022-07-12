import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    userProfile: false
}

export const ContextProvider = ({ children }) => {
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#03C9D7'); /**Color default */
    const [currentMode, setCurrentMode] = useState('Light'); /**Modo default */
    const [themeSettings, setThemeSettings] = useState(false); /**Está abierto o no */
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
  
    const setMode = (e) => {
      setCurrentMode(e.target.value);
      localStorage.setItem('themeMode', e.target.value);
    };

    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
      };
    
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
          setScreenSize, 
          handleClick, 
          isClicked, 
          initialState, 
          setIsClicked, 
          setActiveMenu, 
          setCurrentColor, 
          setCurrentMode, 
          setMode, 
          setColor, 
          themeSettings, 
          setThemeSettings }}>
          {/* Se traen todos los children para poder mostrar todos los componentes al cargar el context */}
          {children}
        </StateContext.Provider>
      );
    };

    export const useStateContext = () => useContext(StateContext);
