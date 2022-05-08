import React , {useState, useEffect} from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography, Container, Avatar, Button, Tooltip, Menu, MenuItem, Badge, ThemeProvider, createTheme, styled} from '@mui/material';
import {DragHandle, AccountBox, Face, PhotoCamera, Logout, Map, ListAlt, ShareLocation, Home} from '@mui/icons-material';
import axios from 'axios';
import { withRouter, Link as RouterLink } from 'react-router-dom';

const Header = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  // Usuario logueado en sistema.
  const[userin, setUserin] = useState({
    id: '',
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    department: '',
    avatar: ''
  });

  useEffect(() => {

        axios.get("https://localhost:44322/api/auth/obtainuser/" + props.username)
          .then((response  => {
            console.log(response.data);

            setUserin({
              id: response.data.message.id,
              firstname: response.data.message.firstName,
              lastname: response.data.message.lastName,
              username: response.data.message.userName,
              email: response.data.message.email,
              department: response.data.message.department,
              avatar: response.data.message.avatar
            });
          }))
          .catch(function (response) {
            console.log(response);
          });
  }, [props.username]);

  const handleLogout = () => {

    axios({
      method: "post",
      url: "https://localhost:44322/api/auth/logout",
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
        props.history.push('/loginemployee');
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  return (
  <ThemeProvider theme={darkTheme}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar sx={{ width: 65, height: 65 }} src="https://i.gifer.com/4RzR.gif"/>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Sistema de Geolocalizacion
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <DragHandle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem
                to={{
                  pathname: '/',
                  state: { username: userin.username }
                }}
                component={React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)}
              ><Home/>Inicio</MenuItem>
              <MenuItem
                to={{
                  pathname: '/zonification',
                  state: { username: userin.username }
                }}
                component={React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)} 
              ><Map/>Zonificacion
              </MenuItem>
              <MenuItem><ListAlt/>Reportes</MenuItem>
              <MenuItem><ShareLocation/>Ubicaciones</MenuItem>
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                to={{
                  pathname: '/',
                  state: { username: userin.username }
                }}
                component={React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)} 
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              ><Home/>
                Inicio
              </Button>
              <Button 
                to={{
                  pathname: '/zonification',
                  state: { username: userin.username }
              }} 
                component={React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />)}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              ><Map/>
                Zonificacion
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              ><ListAlt/>
                Reportes
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              ><ShareLocation/>
                Ubicaciones
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar alt={userin.firstname + " " + userin.lastname} src=""/>
              </StyledBadge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem disabled><Face/>{userin.firstname + " " + userin.lastname}</MenuItem>
              <MenuItem><AccountBox/>
                <Typography textAlign="right">Perfil</Typography>
              </MenuItem>
              <MenuItem><PhotoCamera/>
                <Typography textAlign="right">Cambio de Avatar</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}><Logout/>
                <Typography textAlign="right">Cerrar sesion</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  </ThemeProvider>
  );
};
export default withRouter(Header);