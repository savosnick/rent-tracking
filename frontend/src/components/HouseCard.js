import React from "react";
import { Card, Button } from "react-bootstrap";

const HouseCard = ({ house, trackHouse }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={house.image}></Card.Img>
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
