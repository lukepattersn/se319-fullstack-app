import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

const MenuItem = ({ item, onAddToCart }) => (
  <Card className="h-100 shadow-sm">
    <Card.Img
      variant="top"
      src={item.image}
      alt={item.product_name}
      style={{ height: "200px", objectFit: "cover" }}
    />
    <Card.Body className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <Card.Title className="mb-0">{item.product_name}</Card.Title>
        <Badge bg="danger" pill>
          ${item.price.toFixed(2)}
        </Badge>
      </div>
      <Card.Text className="text-muted small flex-grow-1">
        {item.description}
      </Card.Text>
      <div className="d-flex justify-content-between align-items-center">
        <Badge bg="light" text="dark" pill>
          {item.category}
        </Badge>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onAddToCart(item)}
        >
          Add to Cart
        </Button>
      </div>
    </Card.Body>
  </Card>
);

export default MenuItem;
