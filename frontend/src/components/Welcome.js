import React from "react";
import { Card, Button } from "react-bootstrap";
import startPage from "../images/welcomePicture.png";
const Welcome = () => (
  <Card border="dark" style={{ width: "50%" }}>
    <Card.Body>
      <Card.Title bg="dark">Rent Tracking</Card.Title>
      <Card.Text>
        This Website allows you to search for open rentals on Zillow in your
        neighborhood and track houses of interest. These houses can then be seen
        on the google maps API to obtain further information on them even if
        they are already rented out.
      </Card.Text>

      {/* <Button variant="primary">Go somewhere</Button> */}
    </Card.Body>
    <Card.Img
      variant="bottom"
      src={startPage}
      className="mb-4"
      style={{
        maxHeight: "400px",
        objectFit: "scale-down",
      }}
    ></Card.Img>
    <Card.Footer>Example view in the 'Tracked Houses' tab</Card.Footer>
  </Card>
);

export default Welcome;
