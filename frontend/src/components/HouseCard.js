import React from "react";
import { Card, Button } from "react-bootstrap";

const HouseCard = ({ house }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={house.image}></Card.Img>
      <Card.Body>
        <Card.Title>{house.address}</Card.Title>
        <Card.Text> Zpid: {house.zpid}</Card.Text>
        <Button variant="primary" className="ml-2">
          Start Tracking
        </Button>
        {/* <Button variant="secondary">Delete</Button> */}
      </Card.Body>
    </Card>
  );
};

export default HouseCard;
