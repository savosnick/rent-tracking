import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./components/Header";
import Search from "./components/Search";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

const App = () => {
  // const [houses, setHouses] = useState({ test: "test" });
  // const [loading, setLoading] = useState(true);

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

  return (
    <div>
      {/* <Container fluid> */}
      <Header />
      {/* </Container> */}
      <Container className="mt-2" fluid>
        <Search />
      </Container>
    </div>
  );
};

export default App;
