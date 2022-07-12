import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import {TooltipComponent} from '@syncfusion/ej2-react-popups';

import './SupervisorDashboard.css';


import { Sidebar, ThemeSettings, Navbar } from '../';

import { Home, ColorPicker, Employees, Kanban, Editor, Tracking, Zonification, Calendar, Line, Pie } from '../../pages';

import { useStateContext } from '../../context/ContextProvider';

import Selector from '../selector/Selector';

const SupervisorDashboard = () => {

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();


  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
        
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            {/* Componente Syncfution para configuración */}
            <TooltipComponent content="Configuración" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {/* Creando Sidebar. Si está activo se muestra */}
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          {/* Div para barra de navegación */}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>

            {/* Div for Routes */}
            <div>
              {/**Mostrar themeSettings si es verdad */}
              {themeSettings && (<ThemeSettings />)}
              <Routes>
                {/* RUTA DASHBOARD */}
                {/* home */}
                <Route path="/supervisordashboard" element={<Home />} />
                {/* home desde navbar */}
                <Route path="/home" element={<Home />} />

                <Route path="/empleados" element={<Employees />} />

                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendario" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

               </Routes>
              
           
                           

            </div>
          </div>
        </div>
       
    </div>
  );
};

export default SupervisorDashboard