import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./components/Header";
import Search from "./components/Search";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

const App = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("CA");
  // const [houses, setHouses] = useState({ test: "test" });
  // const [loading, setLoading] = useState(true);
  const [newHouses, setNewHouses] = useState([]);
  // const getSavedHouses = async () => {
  //   try {
  //     const res = await axios.get(`${API_URL}/houses`);
  //     setHouses(res.data || []);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => getSavedHouses(), []);

  const searchString = "status_type=ForRent&home_type=Houses";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `${API_URL}/new-results?location=${city}%2C%20${state}&${searchString}`
    );
    setNewHouses(res.data);
    console.log(newHouses);
    console.log(Object.keys(newHouses).length);
    try {
    } catch (error) {
      console.log(error);
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
      <Container className="mt-2" fluid>
        {JSON.stringify(newHouses, null, 2)}
      </Container>
    </div>
  );
};

export default App;
