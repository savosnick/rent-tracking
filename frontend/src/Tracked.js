import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasTitle,
  OffcanvasBody,
} from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import MapContainer from "./components/MapContainer";
import HouseCard from "./components/HouseCard";

// import Logo from "../images/logo.svg";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

const Tracked = () => {
  const [trackedHouses, setTrackedHouses] = useState([]);
  const [showCanvas, setShowCanvas] = useState(false);
  const [target, setTarget] = useState({});
  //   const [map, setMap] = useState("");
  const getTrackedHouses = async () => {
    try {
      const res = await axios.get(`${API_URL}/tracked`);
      setTrackedHouses(res.data || []);
      console.log(trackedHouses);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrackedHouses();
    console.log(trackedHouses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => setShowCanvas(false);

  const getTargetInfo = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />

      <Container className="mt-3">
        <Card bg="primary" border="primary" style={{ width: "100%" }}>
          <Card.Body>
            {trackedHouses.length ? (
              <MapContainer
                trackedHouses={trackedHouses}
                setShowCanvas={setShowCanvas}
                setTarget={setTarget}
              />
            ) : (
              "Loading"
            )}
          </Card.Body>
        </Card>
      </Container>
      <Offcanvas show={showCanvas} onHide={handleClose} backdrop={false}>
        <OffcanvasHeader closeButton>
          <OffcanvasTitle>Zpid: {target.name}</OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
          <Card>
            <Card.Body>{target.name}</Card.Body>
          </Card>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default Tracked;
