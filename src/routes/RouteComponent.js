import React from 'react';
import {Route, Routes, Switch} from 'react-router-dom';
import LoginEmployee from '../components/login/LoginEmployee';
import Signup from '../components/signup/Signup';

import Zonification from '../components/zonification/Zonification';
import LoginMonitor from '../components/login/LoginMonitor';
import LoginSupervisor from '../components/login/LoginSupervisor';
import Selector from '../components/selector/Selector';
import RegisterCompany from '../components/register/RegisterCompany';
import AdminSelector from '../components/adminselector/AdminSelector';
import SupervisorDashboard from '../components/dashboard/SupervisorDashboard';

import { Sidebar, ThemeSettings, Navbar } from '../components';

import { Home, ColorPicker, Employees, Kanban, Editor, Tracking, Calendar, Line, Pie } from '../pages';

// Componente Funcional Routes.
const RouteComponent = () =>(
   <Routes>
      <Route exact path = "/signup" component={Signup}/>
      <Route exact path = "/loginemployee" component={LoginEmployee}/>
      <Route exact path = "/loginmonitor" component={LoginMonitor}/>
      <Route exact path = "/loginsupervisor" component={LoginSupervisor}/>
      <Route exact path = "/zonification" component={Zonification}/>
      <Route exact path = "/registercompany" component={RegisterCompany}/>
      <Route exact path = "/adminselector" component={AdminSelector}/>
      <Route path="/supervisordashboard/*" element={<SupervisorDashboard />} /> 
      
      {/* <Route exact path = "/home" element={(<Home/>)} />  */}
      <Route exact path = "/" element={<Selector/>}/> 
      <Route exact path = "/selector" element={<Selector/>}/>


    {/*   <Route path="/" element={<Home />} />
               
      <Route path="/home" element={<Home />} /> */}

                {/* pages  */}
      <Route path="/orders" element="orders" />
      
      <Route path="/customers" element="customer" />
      <Route path="/tracking" element="Ecommerce" />
      <Route exact path="/selector" component={Selector} />
                {/* apps  */}
   


   </Routes>
);

export default RouteComponent;