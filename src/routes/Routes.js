import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginEmployee from '../components/login/LoginEmployee';
import Signup from '../components/signup/Signup';

import Zonification from '../components/zonification/Zonification';
import LoginMonitor from '../components/login/LoginMonitor';
import LoginSupervisor from '../components/login/LoginSupervisor';
import Selector from '../components/selector/Selector';
import RegisterCompany from '../components/register/RegisterCompany';
import AdminSelector from '../components/adminselector/AdminSelector';
import  Home  from '../pages/Home';

// Componente Funcional Routes.
const Routes = () =>(
   <Routes>
      <Route exact path = "/signup" component={Signup}/>
      <Route exact path = "/loginemployee" component={LoginEmployee}/>
      <Route exact path = "/loginmonitor" component={LoginMonitor}/>
      <Route exact path = "/loginsupervisor" component={LoginSupervisor}/>
      <Route exact path = "/zonification" component={Zonification}/>
      <Route exact path = "/registercompany" component={RegisterCompany}/>
      <Route exact path = "/adminselector" component={AdminSelector}/>
       <Route exact path = "/home" element={(<Home/>)} />
      <Route exact path = "/" component={Selector}/> 
   </Routes>
);

export default Routes;