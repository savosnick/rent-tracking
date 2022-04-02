import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import MapContainer from "./components/MapContainer";

// import Logo from "../images/logo.svg";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

const Tracked = () => {
  const [trackedHouses, setTrackedHouses] = useState([]);

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

  return (
    <div>
      <Header />
      <Container className="mt-2" fluid>
        {trackedHouses.length ? (
          <Row xs={1} md={3} lg={5}>
            {trackedHouses.map((house, i) => (
              <Col key={i} className="pb-3">
                <Card>
                  {/* <Card.Title>Tracked house #{i + 1}</Card.Title> */}
                  <Card.Body>
                    latitude: {house.latitude} longitude: {house.longitude}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          "No Houses are stored"
        )}
      </Container>
      <Container className="mt-3">
        <Card bg="primary" border="Info" style={{ width: "12rm" }}>
          <Card.Body>
            {trackedHouses.length ? (
              <MapContainer trackedHouses={trackedHouses} />
            ) : (
              "Loading"
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Tracked;
