import React , {useState, useEffect} from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography, Container, Avatar, Button, Tooltip, Menu, MenuItem, Badge, ThemeProvider, createTheme, styled} from '@mui/material';
import {DragHandle, AccountBox, Face, PhotoCamera, Logout, Map, ListAlt, ShareLocation, FactCheck, Home, Hail, Business} from '@mui/icons-material';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { useStateContext } from '../../context/ContextProvider';
import  RequestMonitor  from '../request/RequestMonitor';

const Header = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

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
    avatar: '',
    role: ''
  });

  // Empresa a la cual el usuario logueado trabaja.
  const[namecompany, setNameCompany] = useState();

  useEffect(() => {
        axios.get("https://localhost:44322/api/auth/obtainuserrole/" + props.username)
              .then((response  => {
                setUserin({
                  id: response.data.user.id,
                  firstname: response.data.user.firstName,
                  lastname: response.data.user.lastName,
                  username: response.data.user.userName,
                  email: response.data.user.email,
                  department: response.data.user.department,
                  avatar: response.data.user.avatar,
                  role: response.data.role,
                });
              }))
              .catch(function (response) {
                console.log(response);
              });

        axios.get("https://localhost:44322/api/company/ObtainNameCompanyEmployee/" + props.username)
             .then((response  => {
                  setNameCompany(response.data.nameCompany);
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
        props.history.push('/');
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
              <MenuItem disabled><Business/>{namecompany}</MenuItem>
              <MenuItem disabled><Face/>{userin.firstname + " " + userin.lastname}</MenuItem>
              <MenuItem disabled><Hail/>{userin.role}</MenuItem>
              <MenuItem
                to={{
                  pathname: '/home',
                  state: { username: userin.username }
                }}
                component={React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />)}
              ><Home/>{' '}Inicio</MenuItem>
              {userin.role === "Supervisor"?
                <div>
                  <MenuItem
                    to={{
                      pathname: '/zonification',
                      state: { username: userin.username }
                    }}
                    component={React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />)} 
                  ><Map/>Zonificacion
                  </MenuItem>
                  </div>
                  : <div/>
              }
               { userin.role === 'Monitor' ? (
                <MenuItem>
                    <FactCheck/>{' '}
                          Solicitudes                      
                </MenuItem>

              ) : (<div></div>) }
                
              <MenuItem><ListAlt/>{' '}Reportes</MenuItem>
              <MenuItem><ShareLocation/>{' '}Ubicaciones</MenuItem>
                            
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                to={{
                  pathname: '/home',
                  state: { username: userin.username }
                }}
                component={React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />)} 
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              ><Home/>{' '}
                Inicio
              </Button>
              {userin.role === "Supervisor"?
                <div>
                  <Button 
                    to={{
                      pathname: '/zonification',
                      state: { username: userin.username }
                  }} 
                    component={React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />)}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  ><Map/>{' '}
                    Zonificacion
                  </Button>
              </div> : <div/>
              }
              {               
                userin.role === 'Monitor' ? (   
                     <Button
                            onClick={() => handleClick('requestMonitor')}
                            sx={{ my: 2, color: 'white', display: 'block' , 
                                '&:hover': {
                                  color: 'teal',
                                  backgroundColor: 'white',                                
                               },
                            }}
                            ><FactCheck/>{' '}
                              Solicitudes                                         
                        </Button>
              ) : ( <div></div>)
              
              }
              {isClicked.requestMonitor && (<RequestMonitor />)}
              
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              ><ListAlt/>{' '}
                Reportes
              </Button>
                  
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              ><ShareLocation/>{' '}
                Ubicaciones
              </Button>

              <MenuItem disabled><Business/>{namecompany}</MenuItem>
              <MenuItem disabled><Face/>{userin.firstname + " " + userin.lastname}</MenuItem>
              <MenuItem disabled><Hail/>{userin.role}</MenuItem>
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