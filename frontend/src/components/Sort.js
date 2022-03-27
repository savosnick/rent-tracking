import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

const sortByPrice = (setNewHouses, newHouses) => {
  setNewHouses(
    newHouses.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
  );
  setNewHouses([...newHouses]);
};

const sortBySqft = (setNewHouses, newHouses) => {
  setNewHouses(
    newHouses.sort((a, b) => parseFloat(b.size) - parseFloat(a.size))
  );
  setNewHouses([...newHouses]);
};

const Sort = ({ setNewHouses, newHouses }) => {
  return (
    <Form>
      <Row>
        <Col xs="auto">
          <Button
            variant="primary"
            active
            onClick={() => sortByPrice(setNewHouses, newHouses)}
          >
            Sort by price
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            active
            onClick={() => sortBySqft(setNewHouses, newHouses)}
          >
            Sort by size
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Sort;
