import React from "react";
import { Button } from "react-bootstrap";

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const itemId = item.product_id || item.id;

  return (
    <li className="list-group-item p-3">
      <div className="d-flex justify-content-between">
        <div>
          <h6 className="fw-medium mb-1">{item.product_name}</h6>
          <div className="d-flex align-items-center mt-2">
            <Button
              variant="outline-secondary"
              size="sm"
              className="rounded-circle p-0"
              style={{ width: "24px", height: "24px" }}
              onClick={() => onUpdateQuantity(itemId, (item.quantity || 1) - 1)}
            >
              -
            </Button>
            <span className="mx-2">{item.quantity || 1}</span>
            <Button
              variant="outline-secondary"
              size="sm"
              className="rounded-circle p-0"
              style={{ width: "24px", height: "24px" }}
              onClick={() => onUpdateQuantity(itemId, (item.quantity || 1) + 1)}
            >
              +
            </Button>
          </div>
        </div>
        <div className="text-end">
          <p className="fw-medium mb-1">
            ${(item.price * (item.quantity || 1)).toFixed(2)}
          </p>
          <Button
            variant="link"
            className="text-danger p-0"
            size="sm"
            onClick={() => onRemoveItem(itemId)}
          >
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
