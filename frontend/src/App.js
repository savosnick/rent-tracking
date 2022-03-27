import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./components/Header";
import Search from "./components/Search";
import HouseCard from "./components/HouseCard";
import Sort from "./components/Sort";
import Welcome from "./components/Welcome";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

const App = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("State");
  // const [houses, setHouses] = useState({ test: "test" });
  // const [loading, setLoading] = useState(true);
  const [newHouses, setNewHouses] = useState([]);
  const [trackedHouses, setTrackedHouses] = useState([]);

  const getSavedHouses = async () => {
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
    getSavedHouses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchString = "status_type=ForRent&home_type=Houses";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${API_URL}/new-results?location=${city}%2C%20${state}&${searchString}`
      );
      setNewHouses(Object.values(res.data));
      // for (const [key, value] of Object.entries(res.data)) {
      //   console.log(value);
      //   setNewHouses([res.data[key], ...newHouses]);
      // }

      console.log(newHouses.length);
      setCity("");
      setState("State");
      // // console.log(Object.keys(newHouses).length);
    } catch (error) {
      console.log(error);
    }
  };

  const trackNewHouse = async (zpid) => {
    const houseToBeTracked = newHouses.find((house) => house.zpid === zpid);
    houseToBeTracked.tracked = true;
    try {
      await axios.post(`${API_URL}/tracked`, houseToBeTracked);
      setTrackedHouses((trackedHouses) => [...trackedHouses, houseToBeTracked]);
      console.log(trackedHouses);
    } catch (error) {
      console.log("House is already tracked");
    }
  };

  return (
    <div>
      {/* <Container fluid> */}
      <Header />
      {/* </Container> */}
      <Container className="mt-2" fluid>
        <Search
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          searchString={searchString}
          handleSubmit={handleSubmit}
        />
      </Container>
      {newHouses.length ? (
        <Container className="mt-2" fluid>
          <Sort setNewHouses={setNewHouses} newHouses={newHouses} />
        </Container>
      ) : (
        ""
      )}

      <Container className="mt-2" fluid>
        {newHouses.length ? (
          <Row xs={1} md={3} lg={5}>
            {newHouses.map((house, i) => (
              <Col key={i} className="pb-3">
                <HouseCard
                  house={house}
                  trackHouse={trackNewHouse}
                  trackedHouses={trackedHouses}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
        {/* {JSON.stringify(newHouses, null, 2)} */}
      </Container>
    </div>
  );
};

export default App;
