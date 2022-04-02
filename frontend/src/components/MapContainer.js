import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Container, Row, Col, Card } from "react-bootstrap";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;

const MapContainer = ({ trackedHouses }) => {
  const mapStyles = {
    height: "60vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 38.653854,
    lng: -121.16676,
  };

  const locations = trackedHouses.map((house) => ({
    name: house.zpid,
    location: { lat: house.latitude, lng: house.longitude },
  }));

  console.log(trackedHouses);

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={12} center={defaultCenter}>
        {locations.map((item) => {
          return <Marker key={item.name} position={item.location} />;
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
