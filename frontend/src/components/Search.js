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
          <Form.Select aria-label="Default select example">
            <option>State</option>
            <option value="1">CA</option>
            <option value="2">TX</option>
            <option value="3">NY</option>
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
