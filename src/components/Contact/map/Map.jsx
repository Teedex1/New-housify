import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from './LocationPin';
import './map.css';

function Map({ location, zoomLevel }) {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <div className="map">
      <h4 className="map-h2">Come Visit Us At Our Office</h4>

      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleMapsApiKey }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin lat={location.lat} lng={location.lng} text={location.address} />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default Map;
