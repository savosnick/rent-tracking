import React from "react";
import { Form, Button } from "react-bootstrap";

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
      <Button
        type="submit"
        active
        onClick={() => sortByPrice(setNewHouses, newHouses)}
      >
        Sort by price
      </Button>
      <Button
        type="submit"
        active
        className="ml-2"
        onClick={() => sortBySqft(setNewHouses, newHouses)}
      >
        Sort by area
      </Button>
    </Form>
  );
};

export default Sort;
