import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Header";

// import Logo from "../images/logo.svg";

const navbarStyle = {
  backgroundColor: "blue",
};

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

const Tracked = () => {
  const [trackedHouses, setTrackedHouses] = useState([]);
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
                {house.zpid}
              </Col>
            ))}
          </Row>
        ) : (
          "No Houses are stored"
        )}
      </Container>
    </div>
  );
};

export default Tracked;
