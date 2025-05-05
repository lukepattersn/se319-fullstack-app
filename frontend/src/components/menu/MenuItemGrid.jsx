import React from "react";
import { Row, Col } from "react-bootstrap";
import MenuItem from "./MenuItem";

const MenuItemGrid = ({ items, onAddToCart }) => (
  <Row xs={1} md={2} lg={3} className="g-4">
    {items.map((item) => (
      <Col key={item.id}>
        <MenuItem item={item} onAddToCart={onAddToCart} />
      </Col>
    ))}
  </Row>
);

export default MenuItemGrid;
