import React, {useState} from 'react';
import {Avatar, Button, TextField, Link, Paper, Box, Grid, Typography, CssBaseline, createTheme, ThemeProvider, CircularProgress} from '@mui/material';
import { Link as RouterLink, withRouter} from 'react-router-dom';
import axios from 'axios';
import Snackbar from '../snackbar/Snackbar';

const CompanyRegister = () => {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  // Hook para almacenar el role de usuario.
  const [role, setRole] = useState({
    Name: '',
  });

  // Hook para mostrar el progress o boton de registrar.
  const [showProgress, setshowProgress] = useState(false);

  // Contenido del Snackbar.
  const[snack, setsnack] = useState({ });

  const peticionPost = async() => {
   
    var bodyFormData = new FormData();

    bodyFormData.append('roleName', role.Name);

    axios({
      method: "post",
      url: "https://localhost:44322/api/administration/createrole",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        setsnack({
          motive: 'success', text: response.data.message, appear: true,
        });
        setshowProgress(false);
      })
      .catch(function (error) {
        setsnack({
          motive: 'error', text: error.message, appear: true,
        });
        setshowProgress(false);
      });
      
  }

  // Evento HandleChange para modificar y asignar los datos al Hook.
  const handleChange = (e) => {
      
      // Limites para el nombre y apellido.
      if(e.target.name === 'Name')
        if(e.target.value.length > 20)
            return;
  
      // Transforma el caracter ingresado a código ASCII.
      var key = e.target.value.charCodeAt(e.target.value.length - 1);
  
      // Validación del campo Nombre y Apellido, solo se podrán introducir letras.
      if(e.target.name === 'Name'){
        if((e.target.value.length -1 === 0) && (key < 65 || key > 90) && (key < 97 || key > 122)) return;
          
        if((e.target.value.length -1 !== 0) && (key < 97 || key > 122)) return;
      }

      // Almacenando el usuario en el Hook.
      setRole({
        ...role,
        [e.target.name]: e.target.value
      });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  setshowProgress(true);

  peticionPost();
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
            backgroundImage: 'url(https://i.pinimg.com/originals/ba/b4/7e/bab47e473a2d906ed285424e8a6b13f3.gif)',
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
            <Avatar sx={{ m: 1, width: 106, height: 106 }} src="https://i.pinimg.com/originals/d7/ae/01/d7ae0170d3d5ffcbaa7f02fdda387a3b.gif" />

            <Typography component="h1" variant="h5">
              Creacion de Roles
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Nombre"
                  autoFocus
                  value={role.Name}
                  onChange={handleChange}
                />
            <div>
            {showProgress?
                <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '25vh' }}>
                <div>
                    <CircularProgress disableShrink color="secondary" />
                </div>
                </Grid>
                :
                <div>
                  <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Registrarme
                </Button>
                </div>
            }
            </div>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item>
              <Link to="/adminselector" component={React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)} variant="body2">
                  Regresar
                </Link>
              </Grid>
            </Grid>
          </Box>
          </Box>
          <Box mt={5}><Copyright /></Box>
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

export default withRouter(CompanyRegister);