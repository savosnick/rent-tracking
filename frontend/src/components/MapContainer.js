import React, { useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Card, Button, Modal } from "react-bootstrap";
import { useState } from "react";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;

const MapContainer = ({
  trackedHouses,
  setShowCanvas,
  setTarget,
  getTargetInfo,
  target,
  setLoading,
  deleteHouse,
}) => {
  const mapStyles = {
    height: "80vh",
    width: "100%",
  };

  const [selected, setSelected] = useState({});
  const [showModal, setShowModal] = useState(false);

  const onSelect = (item) => {
    setSelected(item);
  };

  const locations = trackedHouses.map((house) => ({
    name: house.zpid,
    img: house.image,
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
    return (max + min) / 2;
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

  const [center, setCenter] = useState({
    lat: midLat(locations),
    lng: midLng(locations),
  });

  const zoomLevel = () => {
    const zoomRange = Math.max(lngRange(locations), latRange(locations));
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
  const [zoom, setZoom] = useState(zoomLevel());
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>Are you sure you want to delete this house?</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              deleteHouse(selected.name);
              setShowModal(false);
              setSelected({});
              setShowCanvas(false);
            }}
          >
            Yes - Delete
          </Button>
          <Button onClick={() => setShowModal(false)}>
            No - I want to keep it tracked
          </Button>
        </Modal.Footer>
      </Modal>
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={zoom}
          mapTypeId="hybrid"
          center={center}
          disableAutoPan={true}
        >
          {locations.map((item) => {
            return (
              <Marker
                key={item.name}
                position={item.location}
                disableAutoPan={true}
                icon="http://maps.google.com/mapfiles/kml/pal3/icon56.png"
                onClick={() => {
                  onSelect(item);
                  setTarget(item);
                  getTargetInfo(item);
                  setLoading(true);
                  setShowCanvas(true);
                  // setCenter({});
                }}
              />
            );
          })}
          {selected.location && (
            <InfoWindow
              position={selected.location}
              clickable={true}
              disableAutoPan={true}
              onCloseClick={() => {
                setSelected({});
                setShowCanvas(false);

                // getTargetInfo(target);
              }}
            >
              <div>
                <Card>
                  <Card.Img
                    src={selected.img}
                    width="125px"
                    height="125px"
                  ></Card.Img>
                  <Card.Body>
                    <Button
                      variant="primary"
                      onClick={() => {
                        // setShowCanvas(false);
                        setShowModal(true);
                        // deleteHouse(selected.name);
                      }}
                    >
                      Stop Tracking
                    </Button>
                  </Card.Body>
                  {/* <Card.Footer>Zpid: {selected.name}</Card.Footer> */}
                </Card>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapContainer;
