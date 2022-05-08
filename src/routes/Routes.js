import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginEmployee from '../components/login/LoginEmployee';
import Signup from '../components/signup/Signup';
import Home from '../components/home/Home';
import Zonification from '../components/zonification/Zonification';
import Company from '../components/company/Company';
import LoginMonitor from '../components/login/LoginMonitor';

// Componente Funcional Routes.
const Routes = () =>(
    <Switch>
      <Route exact path = "/signup" component={Signup}/>
      <Route exact path = "/loginemployee" component={LoginEmployee}/>
      <Route exact path = "/loginmonitor" component={LoginMonitor}/>
      <Route exact path = "/zonification" component={Zonification}/>
      <Route exact path = "/company" component={Company}/>
      <Route exact path = "/" component={Home}/>
    </Switch>
);

export default Routes;