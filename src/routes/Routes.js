import React from 'react';
// Redireccionamientos.
import {Route, Switch} from 'react-router-dom';
// Componentes de la aplicación.
import Login from '../components/login/Login';
import Signup from '../components/signup/Signup';
import Home from '../components/home/Home';

// Componente Funcional Routes.
const Routes = () =>(
    <Switch>
      <Route exact path = "/signup" component={Signup}/>
      <Route exact path = "/login" component={Login}/>
      <Route exact path = "/" component={Home}/>
    </Switch>
);

export default Routes;