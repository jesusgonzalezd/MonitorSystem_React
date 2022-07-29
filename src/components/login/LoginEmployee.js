import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, CssBaseline, createTheme, ThemeProvider} from '@mui/material';
import { Link as RouterLink, withRouter, Redirect} from 'react-router-dom';
import Snackbar from '../snackbar/Snackbar';

const LoginEmployee = (props) => {


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

// Hook para verificar si hizo click al boton login y accedio de manera satisfactoria a su cuenta.
const [login, setLogin] = useState(false);

// Contenido del Snackbar.
const[snack, setsnack] = useState({});

// Hook para almacenar las credenciales del usuario.
const [user, setUser] = useState({
  username: '',
  password: '',
  role: 'Employee'
});

 // Cambio en la tarjeta del usuario, cada vez que alguien inicia sesion.
 const handleChange = (e) => {

  setsnack({
    appear: false,
  });

  // Limites para la contrasena.
  if(e.target.name === 'password' && e.target.value.length > 20)
      return;

  if(e.target.name === 'username' && e.target.value.length > 64)
      return;

  // Transforma el caracter ingresado a código ASCII.
  var key = e.target.value.charCodeAt(e.target.value.length - 1);

  // Validación del campo email.
  if(e.target.name === 'username')
    if( (key > 31 && key < 45) || (key > 57 && key < 64) || (key >= 64 && key < 95) || (key > 122 || key === 47 || key === 96)) return;

   // Validación del campo contraseña.
  if(e.target.name === 'password')
    if((key > 126 || key === 32)) return;
    
  // Se almacena en el Hook.
  setUser({
    ...user,
    [e.target.name]: e.target.value
  });

  
};

useEffect(() => {

  
}, [])

const peticionPost = (username, password) => {

  var bodyFormData = new FormData();

  bodyFormData.append('Username', username);
  bodyFormData.append('Password', password);
  bodyFormData.append('Role', user.role);

  axios({
    method: "post",
    url: "https://localhost:44322/api/auth/login",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      console.log("Entro 1");
      setsnack({
        motive: 'success', text: response.data.message, appear: true,
      });
      setLogin(true);
      
    })
    .catch(function (error) {
      console.log("Entro 2");
      setsnack({
        motive: 'error', text: error.message, appear: true,
      });
    });
};

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    peticionPost(data.get('username'), data.get('password'));
};

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://i.pinimg.com/originals/87/78/33/877833b548a0eb2d48ed03028f9bef77.gif)', 
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Avatar sx={{ m: 1, width: 106, height: 106 }} src="https://static.vecteezy.com/system/resources/previews/004/181/466/large_2x/improve-time-management-rgb-color-icon-professional-skills-for-employee-to-increase-productivity-self-improvement-for-higher-efficiency-isolated-illustration-simple-filled-line-drawing-vector.jpg" />

            <Typography component="h1" variant="h5">
              Login de Empleado
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuario"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuerdame"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}           
              >
                Acceder
              </Button>
              <Button
                to="/" component={React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)} variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Atras
              </Button>

              <div>
              {login? (
                          <Redirect
                            to={{
                                pathname: '/home',
                                state: { username: user.username }
                            }}
                          />
                      ) : null}
              </div>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Has olvidado tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" component={React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)} variant="body2">
                    {"No tienes cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
          {snack.appear?
            <div> <Snackbar motive={snack.motive} text={snack.text} appear={snack.appear}/> </div>
            : <div/>
          }
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Sistema de Geolocalizacion
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default withRouter(LoginEmployee);