import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
// import Logo from "../images/logo.svg";

const navbarStyle = {
  backgroundColor: "blue",
};

const Header = () => {
  return (
    <Navbar style={navbarStyle} variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home">RENT TRACKING WEBSITE</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Search</Nav.Link>
          <Nav.Link href="#features">Tracked Houses</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
