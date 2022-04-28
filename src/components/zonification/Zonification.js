import React, {useEffect, useState, useRef, useCallback} from 'react';
import Header from '../header/Header';
import {GoogleMap, Polygon, useJsApiLoader, Marker} from "@react-google-maps/api";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Grid, TextField} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Zonification = (props) =>{

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [location, setLocation] = useState();

  const[namezone, setNamezone] = useState("");

  const mapContainerStyle = {
    width: '2000px',
    height: '1000px',
  };
  
  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  // Code Stack
  const [path, setPath] = useState([]);

  const [active, setActive] = useState(false);

  const [zones, setZones] = useState([]);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB3rjwTiwERUQZJ-eY3NqtpfabR04Jqt-E"
  })

  const [, setMap] = React.useState(null)

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

  console.log("The path state is", path);

  const onLoad_ = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const handleAddZone = () => {
      setZones(zones => [...zones, path]);
  }

  const handleAddNewZone = (coord) => {
    const { latLng } = coord;
    setPath([
      {lat: latLng.lat(), lng: latLng.lng()},
      {lat: latLng.lat()+0.001, lng: latLng.lng()-0.001},
      {lat: latLng.lat()+0.001, lng: latLng.lng()+0.001}
    ])
    setActive(true);
  }

  console.log(zones);

 const handleChange = (e) => {
  setNamezone({
    ...namezone,
    [e.target.name]: e.target.value
  });
};

const onMapClicked = (coord) => {
  // Obtener coordenadas con un click al mapa.
  const { latLng } = coord;
  const latitude = latLng.lat();
  const longitude = latLng.lng();
  console.log("Latitud: " + latitude + " Longitud: " + longitude);
};

return isLoaded ?(

  <div>
      <Header username={props.location.state.username}/>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        onLoad={onLoad_}
        onUnmount={onUnmount}
        zoom={7}
        center = {{lat: location.lat, lng: location.lng}}
        onClick={handleAddNewZone}
      >
        <Grid container spacing={0} direction="column-reverse" alignItems="center" justifyContent="center">
          <Button variant="contained" onClick={handleClickOpen}>
              Agregar Zona
          </Button>
        </Grid>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Agregar una nueva zona laboral"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Introduzca el nombre de la zona laboral
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nombre de Zona"
                name="name_zone"
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={handleAddZone}>Guardar</Button>
            </DialogActions>
          </Dialog>

        <Marker
            position={{ lat: location.lat, lng: location.lng }}
        />

        {active?
          <div>
            <Polygon
                editable
                draggable
                path={path}
                onMouseUp={onEdit}
                onDragEnd={onEdit}
                onLoad={onLoad}
                onUnmount={onUnmount}
            />
          </div> : <div/>
        }

        { zones && zones.map((item, index) => {
            console.log("Entro al MAP");
            return(            
              // Comienza la tarjeta.
              <div key={index}>
                <Polygon
                    editable
                    draggable
                    path={zones[index]}
                    onMouseUp={onEdit}
                    onDragEnd={onEdit}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                />
              </div>
            );
          })
        }
        </GoogleMap>
    </div>
) : <></>
}

export default React.memo(Zonification);