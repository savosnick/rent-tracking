import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import Tracked from "./Tracked";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tracked" element={<Tracked />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
