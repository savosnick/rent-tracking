import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const Search = ({
  city,
  setCity,
  state,
  setState,
  searchString,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            id="inlineFormInput"
            placeholder="City"
          />
        </Col>
        <Col xs="auto">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              console.log("e.target.value", e.target.value);
              setState(e.target.value);
            }}
          >
            <option hidden value>
              State
            </option>
            <option value="CA">CA</option>
            <option value="TX">TX</option>
            <option value="NY">NY</option>
          </Form.Select>
        </Col>

        <Col xs="auto">
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
