// src/components/cart/ShoppingCart.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";
import CartItem from "./CartItem";
import { useCart } from "./CartContext";

/**
 * Shopping cart component that displays cart contents and checkout options
 * Animates in/out based on showCart state
 */
const ShoppingCart = () => {
  const {
    cart,
    showCart,
    setShowCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartItemCount,
  } = useCart();

  // Don't render if cart is empty
  if (cart.length === 0) {
    return null;
  }

  return (
    <div
      className="position-fixed bottom-0 end-0 m-3"
      style={{
        width: "320px",
        zIndex: 1050,
        transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
        // Completely hide the cart when not shown (transform out of view and fade opacity)
        transform: showCart ? "translateX(0)" : "translateX(100%)",
        opacity: showCart ? 1 : 0,
        pointerEvents: showCart ? "auto" : "none", // Disable interactions when hidden
      }}
    >
      <Card className="shadow">
        <Card.Header
          className="bg-danger text-white d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
          onClick={() => setShowCart(!showCart)}
        >
          <h5 className="mb-0">Your Cart ({cartItemCount})</h5>
          <Button
            variant="link"
            className="text-white p-0 border-0"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering parent onClick
              setShowCart(!showCart);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </Button>
        </Card.Header>

        <div style={{ maxHeight: "288px", overflowY: "auto" }}>
          <ul className="list-group list-group-flush">
            {cart.map((item) => (
              <CartItem
                key={item.id || item.product_id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
              />
            ))}
          </ul>
        </div>

        <Card.Footer className="bg-light">
          <div className="d-flex justify-content-between fw-bold mb-3">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <Button
            variant="danger"
            className="w-100"
            onClick={() => alert("Checkout functionality coming soon!")}
          >
            Checkout
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ShoppingCart;
