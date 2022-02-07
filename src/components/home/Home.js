import React from 'react';
import Header from '../header/Header';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const Home = (props) =>{

return(
  <div>
        <Header username={props.location.state.username}/>
        <Map google={props.google}
             style = {{width: "100%", height: "100%"}}
             zoom = {10}
             initialCenter = {{
                lat:  18.502790,
                lng: -69.961900
             }}
        />
  </div>
)}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB3rjwTiwERUQZJ-eY3NqtpfabR04Jqt-E"
})(Home)