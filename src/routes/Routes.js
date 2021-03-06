import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginEmployee from '../components/login/LoginEmployee';
import Signup from '../components/signup/Signup';
import Zonification from '../components/zonification/ZonificationComponent';
import LoginMonitor from '../components/login/LoginMonitor';
import LoginSupervisor from '../components/login/LoginSupervisor';
import Selector from '../components/selector/Selector';
import AdminSelector from '../components/adminselector/AdminSelector';
import SupervisorDashboard from '../components/dashboard/SupervisorDashboard';
import Home from '../components/home/Home';
import CompanyRegister from '../components/register/CompanyRegister';
import RoleRegister from '../components/register/RoleRegister';

// Componente Funcional Routes.
const Routes = () =>(
   <Switch>
      <Route exact path = "/signup" component={Signup}/>
      <Route exact path = "/loginemployee" component={LoginEmployee}/>
      <Route exact path = "/loginmonitor" component={LoginMonitor}/>
      <Route exact path = "/loginsupervisor" component={LoginSupervisor}/>
      <Route exact path = "/zonification" component={Zonification}/>
      <Route exact path = "/companyregister" component={CompanyRegister}/>
      <Route exact path = "/roleregister" component={RoleRegister}/>
      <Route exact path = "/adminselector" component={AdminSelector}/>
      <Route path = "/supervisordashboard" component={SupervisorDashboard } /> 
      
      <Route exact path = "/" component={Selector}/> 
      <Route exact path = "/selector" component={Selector}/>

      <Route exact path = "/home" component={Home} />

    {/*   <Route path="/" element={<Home />} />
               
      <Route path="/home" element={<Home />} /> */}

    
 
                {/* apps  */}
   


   </Switch>
);

export default Routes;