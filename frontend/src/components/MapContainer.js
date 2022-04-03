import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Container, Row, Col, Card } from "react-bootstrap";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;

const MapContainer = ({ trackedHouses }) => {
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const locations = trackedHouses.map((house) => ({
    name: house.zpid,
    location: { lat: house.latitude, lng: house.longitude },
  }));

  const averageLat = (locations) => {
    let total = 0;
    for (const key in locations) {
      total += locations[key]["location"]["lat"];
    }
    console.log(total / locations.length);
    return total / locations.length;
  };

  const averageLong = (locations) => {
    let total = 0;
    for (const key in locations) {
      total += locations[key]["location"]["lng"];
    }
    console.log(total / locations.length);
    return total / locations.length;
  };

  const defaultCenter = {
    lat: averageLat(locations),
    lng: averageLong(locations),
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={11} center={defaultCenter}>
        {locations.map((item) => {
          return <Marker key={item.name} position={item.location} />;
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
