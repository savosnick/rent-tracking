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
  Nav,
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
  const [houseInfo, setHouseInfo] = useState({});
  const [isLoading, setLoading] = useState(true);
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

  const getTargetInfo = async (target) => {
    try {
      const res = await axios.get(`${API_URL}/tracked/${target.name}`);
      setHouseInfo(res.data);
      console.log(houseInfo);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteHouse = async (zpid) => {
    try {
      const houseToBeDeleted = trackedHouses.find(
        (house) => house.zpid === zpid
      );
      const res = await axios.delete(`${API_URL}/tracked/${zpid}`);
      if (res.data?.deleted_id) {
        setTrackedHouses(trackedHouses.filter((house) => house.zpid !== zpid));
      }
    } catch (error) {
      console.log("House was not removed from tracking");
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
                target={target}
                getTargetInfo={getTargetInfo}
                setLoading={setLoading}
                deleteHouse={handleDeleteHouse}
              />
            ) : (
              "Loading"
            )}
          </Card.Body>
        </Card>
      </Container>
      <Offcanvas show={showCanvas} onHide={handleClose} backdrop={false}>
        <OffcanvasHeader closeButton>
          <OffcanvasTitle>{houseInfo.address}</OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
          <Card>
            {!isLoading && (
              <Card.Body>
                <strong>Year Built:</strong> {houseInfo.year_built}
                <br></br>
                <strong>Size:</strong> {houseInfo.size} Square Feet
                <br></br>
                <strong>Bedrooms:</strong> {houseInfo.bedrooms}
                <br></br>
                <strong>Bathrooms</strong>: {houseInfo.bathrooms}
                <br></br>
                <strong>Time on zillow:</strong> {houseInfo.time_on_zillow}
                <br></br>
                <strong>Status of posting:</strong> {houseInfo.home_status}
                <br></br>
                <strong>Date rented out:</strong> {houseInfo.date_rented}
                <br></br>
                <strong>Time to rent it out:</strong> {houseInfo.time_to_rent}
                <br></br>
                <strong>Price:</strong> {houseInfo.price}
                {/* {houseInfo.price_history} */}
              </Card.Body>
            )}
            {isLoading && <Card.Footer>Loading...</Card.Footer>}
            {!isLoading && (
              <Card.Footer>
                <Nav.Link href={`//${houseInfo.zillow_link}`} target="_blank">
                  Official Zillow Link
                </Nav.Link>
              </Card.Footer>
            )}
            {/* // else {<Card.Footer>{houseInfo.zillow_link}</Card.Footer>}} */}
          </Card>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default Tracked;
