import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import { HeaderTable } from '../components';
import {GoogleMap, Polygon, useLoadScript, Marker} from "@react-google-maps/api";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Grid, TextField} from '@mui/material';
import Snackbar from '../components/snackbar/Snackbar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Zonification = () => {

  const [open, setOpen] = React.useState(false);

  // Contenido del Snackbar.
  const[snack,] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [location,] = useState();

  const[namezone, setNamezone] = useState("");

  const[, setPosition] = useState();

  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  };

  useEffect(() => {
   
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

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAL1SkGABwvcHm8nZ6c1xlNCNVcnCi9ye8"
  })

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

  console.log("The path state is", path);

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

const center = useMemo(() => ({lat: 18.762391, lng: -69.439192}), []);

  return isLoaded ?(
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <HeaderTable category="Servicio" title="Zonificación" />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7}
        center = {center}
        onUnmount={onUnmount}
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
            position={location}
            animation={window.google.maps.Animation.BOUNCE}
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
        {snack.appear?
              <div> <Snackbar motive={snack.motive} text={snack.text} appear={snack.appear}/> </div>
              : <div/>
          }
      
    </div>
    ): <></>
}

export default Zonification