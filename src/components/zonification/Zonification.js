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

  const [position, setPosition] = useState();
  
  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        setPosition({
          lat: 18.7623, 
          lng: -69.4391
      });
      });
    }

    // Manejo de perdida de memoria - Funcion de limpieza
    return () => {
      setLocation({});
      setPosition({});
    };
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
    googleMapsApiKey: "AIzaSyAL1SkGABwvcHm8nZ6c1xlNCNVcnCi9ye8"
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

    const latitude = latLng.lat();
    const longitude = latLng.lng();

    setPosition({
      lat: latitude,
      lng: longitude
    });

    setPath([
      {lat: latLng.lat(), lng: latLng.lng()},
      {lat: latLng.lat()+0.001, lng: latLng.lng()-0.001},
      {lat: latLng.lat()+0.001, lng: latLng.lng()+0.001}
    ])

    setActive(true);
  }

  console.log(zones);

// Cambio de contenido del Textfield del Nombre de la Zona.
 const handleChange = (e) => {
  setNamezone({
    ...namezone,
    [e.target.name]: e.target.value
  });
};

// Referencia del Mapa para obtener sus atributos.
const mapRef = useRef(null);

//Funcion para fijar el mapa en la ubicacion de la creacion de la nueva zona laboral.
const handleCenter = () => {
  if (!mapRef.current) return;

  const newPos = mapRef.current.getCenter().toJSON();
  setPosition(newPos);
}

return isLoaded ?(

  <div>
      <Header username={props.location.state.username}/>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        onLoad={onLoad_}
        onUnmount={onUnmount}
        zoom={7}
        center = {position}
        onClick={handleAddNewZone}
        onDragEnd={handleCenter}
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
            position={location}
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