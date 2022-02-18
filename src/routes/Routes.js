import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from '../components/login/Login';
import Signup from '../components/signup/Signup';
import Home from '../components/home/Home';
//import MapView from '../components/mapview/MapView';

// Componente Funcional Routes.
const Routes = () =>(
    <Switch>
      <Route exact path = "/signup" component={Signup}/>
      <Route exact path = "/login" component={Login}/>
      <Route exact path = "/" component={Home}/>
    </Switch>
);

export default Routes;