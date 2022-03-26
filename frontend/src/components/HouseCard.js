import React from "react";
import { Card, Button } from "react-bootstrap";
import noImage from "../images/noImage.png";

const houseImage = (house) => {
  if (house.has_image === true) {
    return house.image;
  } else {
    return noImage;
  }
};

const HouseCard = ({ house, trackHouse }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={houseImage(house)}
        style={{
          maxHeight: "214px",
          objectFit: "scale-down",
        }}
      ></Card.Img>
      <Card.Body>
        <Card.Title>{house.address}</Card.Title>
        <Card.Text>
          {" "}
          Price: ${house.price} Size: {house.size} SQFT
        </Card.Text>
        {!house.tracked && (
          <Button
            variant="primary"
            className="ml-2"
            onClick={() => trackHouse(house.zpid)}
          >
            Start Tracking
          </Button>
        )}
        {house.tracked && (
          <Button variant="secondary" className="ml-2">
            Tracked
          </Button>
        )}
        {/* <Button variant="secondary">Delete</Button> */}
      </Card.Body>
      <Card.Footer>Zpid: {house.zpid}</Card.Footer>
    </Card>
  );
};

export default HouseCard;
