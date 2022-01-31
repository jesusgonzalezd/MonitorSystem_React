import React, {useEffect} from 'react';
import axios from 'axios';
import {Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, CssBaseline, createTheme, ThemeProvider} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, withRouter} from 'react-router-dom';

const Login = (props) => {

const theme = createTheme();

useEffect(() => {

  axios.get("https://localhost:44322/weatherforecast")
    .then((response  => {
      console.log(response.data);
    }));
}, [])

const peticionPost = (username, password) => {

  console.log(username);
  console.log(password);

  var bodyFormData = new FormData();

  bodyFormData.append('Username', username);
  bodyFormData.append('Password', password);

  axios({
    method: "post",
    url: "https://localhost:44322/api/auth/login",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      console.log(response);
      props.history.push('/');
    })
    .catch(function (response) {
      console.log(response);
    });

};

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    peticionPost(data.get('username'), data.get('password'));
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
            backgroundImage: 'url(https://birtual.es/images/logotipo.gif)', 
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

export default withRouter(Login);