import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import {TooltipComponent} from '@syncfusion/ej2-react-popups';

import './App.css';


import { Sidebar, ThemeSettings, Navbar } from './components';

import { Home, ColorPicker, Employees, Kanban, Tracking, Zonification, Calendar, Line, Pie } from './pages';

import { useStateContext } from './context/ContextProvider';

import Selector from './components/selector/Selector';

const App = () => {

  const { activeMenu } = useStateContext();

  return (
    <div>
      <BrowserRouter>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
           {/* Componente Syncfution para configuración */}
            <TooltipComponent content="Configuración" position="Top">
              <button type= "button" className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              style={{background:'blue', borderRadius:'50%'}}>
                <FiSettings/>
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
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
          

            {/* Div for Routes */}
            <div>
          <Routes>
              

              {/* RUTA DASHBOARD */}
              {/* home */}
              <Route path="/" element={(<Home/>)} />
              {/* home desde navbar */}
              <Route path="/home" element={(<Home/>)} />

              {/* pages  */}
              <Route path="/orders" element="orders"  />
                <Route path="/empleados" element={<Employees />}  />
                <Route path="/customers" element="customer"  />
                <Route path="/tracking" element="Ecommerce"  />
                <Route exact path = "/selector" component={Selector}/> 
                {/* apps  */}
                <Route path="/kanban" element="{<Kanban />}"   />
                <Route path="/editor" element="Ecommerce"  />
                <Route path="/calendario" element={<Calendar />}  />
                <Route path="/color-picker" element="{<ColorPicker />}"  />

                {/* charts  */}
                <Route path="/line" element={(<Line/>)}  />
                <Route path="/area" element="Ecommerce" />
                <Route path="/bar" element="Ecommerce" />
                <Route path="/pie" element={<Pie />}  />
                <Route path="/financial" element="Ecommerce"  />
                <Route path="/color-mapping" element="Ecommerce"  />
                <Route path="/pyramid" element="Ecommerce"  />
                <Route path="/stacked" element="Ecommerce"  />


                           
            </Routes>
          </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App