import React, { createContext, useState, useEffect, useContext } from "react";

// Create the context
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Cart state
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (item) => {
    // Use a ID
    const itemId = item.product_id || item.id;

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(
      (cartItem) => (cartItem.product_id || cartItem.id) === itemId
    );

    if (existingItemIndex >= 0) {
      // Item exists, update quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity =
        (updatedCart[existingItemIndex].quantity || 1) + 1;
      setCart(updatedCart);
    } else {
      // Item doesn't exist add new item with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    setShowCart(true);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => (item.product_id || item.id) !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      // Remove item if quantity is less than 1
      removeFromCart(itemId);
    } else {
      // Update quantity
      const updatedCart = cart.map((item) =>
        (item.product_id || item.id) === itemId
          ? { ...item, quantity: newQuantity }
          : item
      );
      setCart(updatedCart);
    }
  };

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // Calculate cart item count
  const cartItemCount = cart.reduce(
    (count, item) => count + (item.quantity || 1),
    0
  );

  // Toggle cart visibility
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const value = {
    cart,
    showCart,
    setShowCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartItemCount,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
