import React, {useState, useEffect, useRef} from 'react';
import {Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, CssBaseline, createTheme, ThemeProvider, CircularProgress, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { Link as RouterLink, withRouter} from 'react-router-dom';
import axios from 'axios';
import Snackbar from '../snackbar/Snackbar';

const Company = (props) => {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  // Hook para almacenar el usuario.
  const [company, setCompany] = useState({
    Name: '',
    Area: '',
    Email: '',
  });

  // Hook para almacenar la direccion de correo del usuario.
  const [direction, setDirection] = useState(null);
  const [department, setDepartment] = useState(null);

  // Hook para mostrar el progress o boton de registrar.
  const [showProgress, setshowProgress] = useState(false);

   // Labels y Hooks para las direcciones de correos.
   const inputLabel = useRef(null);

  // Contenido del Snackbar.
  const[snack, setsnack] = useState({
      motive: '',
      text: '',
      appear: false,
  });

  const peticionPost = async() => {
   
    var bodyFormData = new FormData();

    bodyFormData.append('Name', company.Name);
    bodyFormData.append('Area', company.Area + department);
    bodyFormData.append('Email', company.Email + direction);

    axios({
      method: "post",
      url: "https://localhost:44322/api/company/register",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
        props.history.push('/login');
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  useEffect(() => {
      setDirection("@gmail.com");
      setDepartment("Audiovisual");
  }, []);

  // Evento HandleChange para modificar y asignar los datos al Hook.
  const handleChange = (e) => {

      if(e.target.name === 'Email' && e.target.value.length > 64)
          return;
  
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

      // Validación del campo email.
      if(e.target.name === 'Email')
        if( (key > 31 && key < 45) || (key > 57 && key < 64) || (key >= 64 && key < 95) || (key > 122 || key === 47 || key === 96)) return;
  
      // Almacenando el usuario en el Hook.
      setCompany({
        ...company,
        [e.target.name]: e.target.value
      });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  setshowProgress(true);

  peticionPost();
};

// Funcion dedicada para modificar las direcciones del correo.
const handleModifiedDirection = (event) => {
  setDirection(event.target.value);
};

const handleModifiedDepartment = (event) => {
  setDepartment(event.target.value);
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
            backgroundImage: 'url(https://epi.cl/wp-content/uploads/2019/02/gif-city.gif)',
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
              Registro de Empresa
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Nombre"
                  autoFocus
                  value={company.Name}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                </InputLabel>
                <Select
                     labelId="demo-simple-select-outlined-label"
                     id="demo-simple-select-outlined"
                     required
                     onChange={handleModifiedDepartment}
                     defaultValue={"Audiovisual"}
                     name="direction"
                >
                     <MenuItem value={"Audiovisual"}>Audiovisual</MenuItem>
                     <MenuItem value={"Informatica"}>Informatica</MenuItem>
                     <MenuItem value={"Bancaria"}>Bancaria</MenuItem>
                     <MenuItem value={"Textil"}>Textil</MenuItem>
                     <MenuItem value={"Alimentos"}>Alimentos</MenuItem>
                </Select>
                </FormControl>
            </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Email"
                  label="Correo Electronico"
                  autoFocus
                  name="Email"
                  autoComplete="email"
                  value={company.Email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                </InputLabel>
                <Select
                     labelId="demo-simple-select-outlined-label"
                     id="demo-simple-select-outlined"
                     required
                     onChange={handleModifiedDirection}
                     defaultValue={"@gmail.com"}
                     name="direction"
                >
                     <MenuItem value={"@gmail.com"}>@gmail.com</MenuItem>
                     <MenuItem value={"@hotmail.com"}>@hotmail.com</MenuItem>
                     <MenuItem value={"@outlook.com"}>@outlook.com</MenuItem>
                     <MenuItem value={"@yahoo.com"}>@yahoo.com</MenuItem>
                </Select>
                </FormControl>
            </Grid>
             
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Recibir informacion del Sistema de Geolocalizacion al correo."
                />
              </Grid>
            </Grid>
            {showProgress?
                <Grid container justify="center" alignItems="center">
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
                  Registrar
                </Button>
                </div>
            }
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link to="/login" component={React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)} variant="body2">
                  Eres empleado? Inicia sesion.
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

export default withRouter(Company);