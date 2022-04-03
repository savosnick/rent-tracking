import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Container, Row, Col, Card } from "react-bootstrap";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;

const MapContainer = ({ trackedHouses }) => {
  const mapStyles = {
    height: "60vh",
    width: "100%",
  };

  const locations = trackedHouses.map((house) => ({
    name: house.zpid,
    location: { lat: house.latitude, lng: house.longitude },
  }));

  const midLat = (locations) => {
    let min = 1000;
    let max = -1000;
    for (const key in locations) {
      if (locations[key]["location"]["lat"] < min) {
        min = locations[key]["location"]["lat"];
      }
      if (locations[key]["location"]["lat"] > max) {
        max = locations[key]["location"]["lat"];
      }
    }
    console.log((max + min) / 2);
    return (max + min) / 2;
  };

  const midLng = (locations) => {
    let min = 1000;
    let max = -1000;
    for (const key in locations) {
      if (locations[key]["location"]["lng"] < min) {
        min = locations[key]["location"]["lng"];
      }
      if (locations[key]["location"]["lng"] > max) {
        max = locations[key]["location"]["lng"];
      }
    }
    console.log((max + min) / 2);
    return (max + min) / 2;
  };

  const defaultCenter = {
    lat: midLat(locations),
    lng: midLng(locations),
  };

  const latRange = (locations) => {
    let min = 1000;
    let max = -1000;
    for (const key in locations) {
      if (locations[key]["location"]["lat"] < min) {
        min = locations[key]["location"]["lat"];
      }
      if (locations[key]["location"]["lat"] > max) {
        max = locations[key]["location"]["lat"];
      }
    }
    return max - min;
  };

  const lngRange = (locations) => {
    let min = 1000;
    let max = -1000;
    for (const key in locations) {
      if (locations[key]["location"]["lng"] < min) {
        min = locations[key]["location"]["lng"];
      }
      if (locations[key]["location"]["lng"] > max) {
        max = locations[key]["location"]["lng"];
      }
    }
    return max - min;
  };

  const zoomLevel = (locations) => {
    const zoomRange = Math.max(lngRange(locations), latRange(locations));
    console.log(zoomRange);
    if (zoomRange < 0.1) {
      return 12;
    } else if (zoomRange < 0.2) {
      return 11;
    } else if (zoomRange < 0.4) {
      return 10;
    } else if (zoomRange < 0.7) {
      return 9;
    } else if (zoomRange < 1) {
      return 8;
    } else if (zoomRange < 3) {
      return 7;
    } else if (zoomRange < 5) {
      return 6;
    } else if (zoomRange < 10) {
      return 6;
    } else if (zoomRange < 25) {
      return 5;
    } else if (zoomRange < 40) {
      return 4;
    } else if (zoomRange < 50) {
      return 4;
    } else if (zoomRange < 70) {
      return 2;
    } else {
      return 1;
    }
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={zoomLevel(locations)}
        center={defaultCenter}
      >
        {locations.map((item) => {
          return <Marker key={item.name} position={item.location} />;
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;