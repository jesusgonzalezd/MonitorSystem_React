import React, {useState} from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import Header from '../header/Header';
import 'leaflet/dist/leaflet.css';

function MapView(props) {

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  return (
  <div>
    <Header username={props.location.state.username}/>
    <MapContainer center={[18.541461, -69.941815]} zoom={10} scrollWheelZoom={true}
      style={{backgroundColor:"white", marginBottom:'90px'
            }} >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <Marker key="marker_1" position={[18.541461, -69.941815]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  </div>
  )
}

export default MapView;