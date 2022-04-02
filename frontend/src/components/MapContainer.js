import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;

const MapContainer = () => {
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 38.653854,
    lng: -121.16676,
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
      />
    </LoadScript>
  );
};

export default MapContainer;
