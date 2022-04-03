import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const navbarStyle = {
  backgroundColor: "blue",
};

const Header = () => {
  return (
    <Navbar style={navbarStyle} variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src="http://maps.google.com/mapfiles/kml/pal3/icon56.png"
            width="40"
            height="40"
            alt="Rent tracking logo"
          ></img>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Search</Nav.Link>
          <Nav.Link href="/tracked">Tracked Houses</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
