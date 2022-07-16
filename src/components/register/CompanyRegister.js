import React, {useState, useEffect, useRef} from 'react';
import {Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, CssBaseline, createTheme, ThemeProvider, CircularProgress, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { Link as RouterLink, withRouter} from 'react-router-dom';
import AvatarEdit from 'react-avatar-edit';
import axios from 'axios';
import Snackbar from '../snackbar/Snackbar';

const CompanyRegister = (props) => {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

   // Hook para almacenar la imagen del usuario.
   const [avatarC, setAvatar] = useState({
    image: '',
    preview: '',
  });

  // Hook para almacenar el usuario.
  const [company, setCompany] = useState({
    Name: '',
    Area: '',
    Avatar: '',
    Email: ''
  });

  // Hook para almacenar la direccion de correo del usuario.
  const [direction, setDirection] = useState(null);
  const [area, setArea] = useState(null);

  // Hook para mostrar el progress o boton de registrar.
  const [showProgress, setshowProgress] = useState(false);

   // Labels y Hooks para las direcciones de correos.
   const inputLabel = useRef(null);

  // Contenido del Snackbar.
  const[snack, setsnack] = useState({ });

  const peticionPost = async() => {
   
    var bodyFormData = new FormData();

    bodyFormData.append('Name', company.Name);
    bodyFormData.append('Area', company.Area + area);
    bodyFormData.append('Avatar', avatarC.image);
    bodyFormData.append('Email', company.Email + direction);

    axios({
      method: "post",
      url: "https://localhost:44322/api/company/register",
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

  useEffect(() => {

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

const onBeforeFileLoad = (elem) => {

  setsnack({ appear: false, });

  if(elem.target.files[0].type === "image/jpeg" || elem.target.files[0].type === "image/jpg" || elem.target.files[0].type === "image/png"){

      if(elem.target.files[0].size > 71680){
        setsnack({
            motive: 'warning', text: 'La imagen es demasiado grande', appear: true,
        });
        elem.target.value = "";
      } else{
          // Fijando la imagen tomada al state.
          avatarC.image = elem.target.files[0];
          return;
      }
  }
  else{
        setsnack({
            motive: 'error', text: 'Elija una imagen.', appear: true,
        });

        elem.target.value = "";
        return;
  }
}

// Funcion dedicada para modificar las direcciones del correo.
const handleModifiedDirection = (event) => {
  setDirection(event.target.value);
};

const handleModifiedArea = (event) => {
  setArea(event.target.value);
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
            <Avatar sx={{ m: 1, width: 106, height: 106 }} src="https://i.pinimg.com/originals/d7/ae/01/d7ae0170d3d5ffcbaa7f02fdda387a3b.gif" />

            <Typography component="h1" variant="h5">
              Registro de Compañia
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
                <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">Seleccione un Departamento</InputLabel>
                <Select
                     labelId="demo-simple-select-outlined-label"
                     id="demo-simple-select-outlined"
                     required
                     autoWidth
                     onChange={handleModifiedArea}
                     defaultValue={""}
                     name="area"
                >
                     <MenuItem value={"Audiovisual"}>Audiovisual</MenuItem>
                     <MenuItem value={"Informatica"}>Informatica</MenuItem>
                     <MenuItem value={"Contabilidad"}>Contabilidad</MenuItem>
                     <MenuItem value={"Ventas"}>Ventas</MenuItem>
                     <MenuItem value={"Compras"}>Compras</MenuItem>
                </Select>
                </FormControl>
            </Grid>
        
              <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '25vh' }}>
                  <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">Selecciona una Foto</InputLabel>
                  <AvatarEdit
                          width={200}
                          height={200}
                          onCrop={onCrop}
                          onClose={onClose}
                          onBeforeFileLoad={onBeforeFileLoad}
                          autoFocus
                          autoWidth
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
                  value={company.Email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">Selecciona una Direccion</InputLabel>
                <Select
                     labelId="demo-simple-select-outlined-label"
                     id="demo-simple-select-outlined"
                     required
                     autoWidth
                     onChange={handleModifiedDirection}
                     defaultValue={""}
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

export default withRouter(CompanyRegister);