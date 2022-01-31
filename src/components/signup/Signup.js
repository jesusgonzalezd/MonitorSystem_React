import React, {useState, useEffect, useRef} from 'react';
import {Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, CssBaseline, createTheme, ThemeProvider, CircularProgress, FormLabel, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, withRouter} from 'react-router-dom';
import AvatarEdit from 'react-avatar-edit';
import axios from 'axios';
import Snackbar from '../snackbar/Snackbar';

const Signup = (props) => {

  const theme = createTheme();

   // Hook para almacenar la imagen del usuario.
   const [avatarC, setAvatar] = useState({
    image: '',
    preview: '',
  });

  // Hook para almacenar el usuario.
  const [user, setUser] = useState({
    FirstName: '',
    LastName: '',
    UserName: '',
    Department: '',
    Email: '',
    Password: ''
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

    bodyFormData.append('FirstName', user.FirstName);
    bodyFormData.append('LastName', user.LastName);
    bodyFormData.append('UserName', user.UserName);
    bodyFormData.append('Department', user.Department + department);
    bodyFormData.append('Avatar', avatarC.image);
    bodyFormData.append('Email', user.Email + direction);
    bodyFormData.append('Password', user.Password);

    axios({
      method: "post",
      url: "https://localhost:44322/api/auth/register",
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

      // Limites para la contrasena.
      if(e.target.name === 'Password' && e.target.value.length > 20)
          return;
      
      if(e.target.name === 'Email' && e.target.value.length > 64)
          return;
  
      // Limites para el nombre y apellido.
      if(e.target.name === 'FirstName' || e.target.name === 'LastName' || e.target.name === 'UserName')
        if(e.target.value.length > 20)
            return;
  
      // Transforma el caracter ingresado a código ASCII.
      var key = e.target.value.charCodeAt(e.target.value.length - 1);
  
      // Validación del campo Nombre y Apellido, solo se podrán introducir letras.
      if(e.target.name === 'FirstName' || e.target.name === 'LastName'){
        if((e.target.value.length -1 === 0) && (key < 65 || key > 90) && (key < 97 || key > 122)) return;
          
        if((e.target.value.length -1 !== 0) && (key < 97 || key > 122)) return;
      }

      // Validación del campo email.
      if(e.target.name === 'Email')
        if( (key > 31 && key < 45) || (key > 57 && key < 64) || (key >= 64 && key < 95) || (key > 122 || key === 47 || key === 96)) return;
  
      // Validación del campo contraseña.
      if(e.target.name === 'Password')
        if((key > 126 || key === 32)) return;
      
      // Almacenando el usuario en el Hook.
      setUser({
        ...user,
        [e.target.name]: e.target.value
      });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  setshowProgress(true);

  peticionPost();
};

// Funcion para quitar la foto elegida.
const onClose = () => {
    setAvatar({
      image: '',
      preview: '',
    });
}

// Fijando el nuevo previo a la foto del user.
const onCrop = (preview) => {
  avatarC.preview = preview;
  console.log(preview.name);
  console.log(avatarC.image.name);
}

// Verificando el tamaño de la imagen y 
const onBeforeFileLoad = (elem) => {

setsnack({ appear: false, });

if(elem.target.files[0].type === "image/jpeg" || elem.target.files[0].type === "image/jpg" || elem.target.files[0].type === "image/png"){

  if(elem.target.files[0].size > 71680){
    setsnack({
        motive: 'warning', text: 'La imagen es demasiado grande, elija otra.', appear: true,
    });
    console.log("Arriba");

    elem.target.value = "";
    return;
  };

  // Fijando la imagen tomada al state.
  avatarC.image = elem.target.files[0];
}else{
  elem.target.value = "";
  setsnack({
      motive: 'error', text: 'Formato incorrecto. Elija una imagen.', appear: true,
  });

  console.log("Abajo");

  return;
}
}

// Funcion dedicada para modificar las direcciones del correo.
const handleModifiedDirection = (event) => {
  setDirection(event.target.value);
};

const handleModifiedDepartment = (event) => {
  setDepartment(event.target.value);
};

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://cdn.dribbble.com/users/1115728/screenshots/6619822/map_compas.gif)',
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registro de Empleado
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="FirstName"
                  required
                  fullWidth
                  id="FirstName"
                  label="Nombre"
                  autoFocus
                  value={user.FirstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="LastName"
                  label="Apellido"
                  name="LastName"
                  autoComplete="family-name"
                  value={user.LastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="UserName"
                  label="Username"
                  name="UserName"
                  autoComplete="family-name"
                  value={user.UserName}
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
                     <MenuItem value={"Contabilidad"}>Contabilidad</MenuItem>
                     <MenuItem value={"Ventas"}>Ventas</MenuItem>
                     <MenuItem value={"Compras"}>Compras</MenuItem>
                </Select>
                </FormControl>
            </Grid>
              <Grid container justify="center" alignItems="center">
                <FormLabel>Selecciona un avatar</FormLabel>
                      <AvatarEdit
                          width={150}
                          height={140}
                          onCrop={onCrop}
                          onClose={onClose}
                          onBeforeFileLoad={onBeforeFileLoad}
                      />
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
                  value={user.Email}
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
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="Contraseña"
                  type="password"
                  id="Password"
                  autoComplete="new-password"
                  value={user.Password}
                  onChange={handleChange}
                />
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
                  Registrarme
                </Button>
                </div>
            }
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link to="/" component={React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)} variant="body2">
                  Tienes una cuenta? Inicia sesion.
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

export default withRouter(Signup);