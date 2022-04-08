import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from '../components/login/Login';
import Signup from '../components/signup/Signup';
import Home from '../components/home/Home';
import Zonification from '../components/zonification/Zonification';
import Company from '../components/company/Company';

// Componente Funcional Routes.
const Routes = () =>(
    <Switch>
      <Route exact path = "/signup" component={Signup}/>
      <Route exact path = "/login" component={Login}/>
      <Route exact path = "/zonification" component={Zonification}/>
      <Route exact path = "/company" component={Company}/>
      <Route exact path = "/" component={Home}/>
    </Switch>
);

export default Routes;