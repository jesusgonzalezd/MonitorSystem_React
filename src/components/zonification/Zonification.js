import React, {useEffect, useState, useRef, useCallback} from 'react';
import Header from '../header/Header';
import {GoogleMap, Polygon, useJsApiLoader, Marker} from "@react-google-maps/api";

const Zonification = (props) =>{

  const [location, setLocation] = useState({ lat: "", lng: "", });

  const mapContainerStyle = {
    width: '2000px',
    height: '1000px',
  };
  
  const center = {
    lat: 18.538119,
    lng: -69.944318
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
  const [path, setPath] = useState([
    {lat: 18.528119, lng: -69.394318},
    {lat: 18.488119, lng: -69.364318},
    {lat: 18.488119, lng: -69.444318},
  ]);

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

return isLoaded ?(
  
  <div>
      <Header username={props.location.state.username}/>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        onLoad={onLoad_}
        onUnmount={onUnmount}
        zoom={13}
      >

        <Marker
            position={{ lat: location.lat, lng: location.lng }}
        />

        <Polygon
            editable
            draggable
            path={path}
            onMouseUp={onEdit}
            onDragEnd={onEdit}
            onLoad={onLoad}
            onUnmount={onUnmount}
        />
        </GoogleMap>
    </div>
) : <></>
}

export default React.memo(Zonification);