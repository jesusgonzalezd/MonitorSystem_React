import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginEmployee from '../components/login/LoginEmployee';
import Signup from '../components/signup/Signup';
import Home from '../components/home/Home';
import Zonification from '../components/zonification/Zonification';
import LoginMonitor from '../components/login/LoginMonitor';
import LoginSupervisor from '../components/login/LoginSupervisor';
import Selector from '../components/selector/Selector';
import RegisterCompany from '../components/register/RegisterCompany';
import RegisterArea from '../components/register/RegisterArea';
import RegisterDepartment from '../components/register/RegisterDepartment';
import RegisterRole from '../components/register/RegisterRole';
import AdminSelector from '../components/adminselector/AdminSelector';

// Componente Funcional Routes.
const Routes = () =>(
    <Switch>
      <Route exact path = "/signup" component={Signup}/>
      <Route exact path = "/loginemployee" component={LoginEmployee}/>
      <Route exact path = "/loginmonitor" component={LoginMonitor}/>
      <Route exact path = "/loginsupervisor" component={LoginSupervisor}/>
      <Route exact path = "/zonification" component={Zonification}/>
      <Route exact path = "/registercompany" component={RegisterCompany}/>
      <Route exact path = "/registerdepartment" component={RegisterDepartment}/>
      <Route exact path = "/registerarea" component={RegisterArea}/>
      <Route exact path = "/registerrole" component={RegisterRole}/>
      <Route exact path = "/adminselector" component={AdminSelector}/>
      <Route exact path = "/home" component={Home} />
      <Route exact path = "/" component={Selector}/>
    </Switch>
);

export default Routes;