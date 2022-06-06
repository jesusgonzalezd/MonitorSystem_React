import React from 'react';
import {Avatar, Button, Link, Paper, Box, Grid, Typography, CssBaseline, createTheme, ThemeProvider} from '@mui/material';
import { Link as RouterLink, withRouter} from 'react-router-dom';

const Selector = (props) => {

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

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
            backgroundImage: 'url(https://techcrunch.com/wp-content/uploads/2019/01/tracking-phones.gif?w=730&crop=1)', 
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
              Selector de Login
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              
              <Button
                to="/loginemployee" component={React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)} variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Empleado
              </Button>
              <Button
                to="/loginsupervisor" component={React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)} variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Supervisor
              </Button>
              <Button
                to="/loginmonitor" component={React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)} variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Monitor
              </Button>
                <Grid container alignItems="center" justifyContent="center">
                  <Link to="/signup" component={React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)} variant="contained">
                    {"No tienes cuenta? Registrate"}
                  </Link>
                </Grid>
                <br/>
                <Grid container alignItems="center" justifyContent="center">
                  <Link to="/adminselector" component={React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)} variant="contained">
                    {"Ir al Selector Administrador"}
                  </Link>
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

export default withRouter(Selector);