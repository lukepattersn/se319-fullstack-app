// src/components/cart/CartToggleButton.jsx
import React from "react";
import { Button } from "react-bootstrap";
import { useCart } from "./CartContext";

/**
 * Cart toggle button component that appears at the bottom right of the screen
 * Only shown when cart has items and cart is currently hidden
 */
const CartToggleButton = () => {
  const { cartItemCount, toggleCart, showCart, cart } = useCart();

  // Don't render if cart is empty or already shown
  if (cart.length === 0 || showCart) {
    return null;
  }

  return (
    <Button
      variant="danger"
      className="position-fixed bottom-0 end-0 m-3 rounded-circle shadow d-flex justify-content-center align-items-center"
      style={{ width: "56px", height: "56px", zIndex: 1040 }}
      onClick={toggleCart}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="bi bi-cart"
        viewBox="0 0 16 16"
      >
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      </svg>
      <span
        className="position-absolute bg-dark text-white d-flex align-items-center justify-content-center rounded-circle"
        style={{
          top: "-8px",
          right: "-8px",
          fontSize: "0.75rem",
          width: "20px",
          height: "20px",
        }}
      >
        {cartItemCount}
      </span>
    </Button>
  );
};

export default CartToggleButton;
