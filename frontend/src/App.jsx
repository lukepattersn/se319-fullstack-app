import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import page components
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Team from "./pages/Team";
import Admin from "./pages/Admin";

// Import cart components
import { CartProvider } from "./components/cart/CartContext";
import ShoppingCart from "./components/cart/ShoppingCart";
import CartToggleButton from "./components/cart/CartToggleButton";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/team" element={<Team />} />
          <Route path="/admin" element={<Admin />} />

          {/* Redirect to home for unknown routes */}
          <Route path="*" element={<Home />} />
        </Routes>

        {/* Global Cart Components */}
        <CartWrapper />
      </Router>
    </CartProvider>
  );
};

const CartWrapper = () => {
  return (
    <>
      <ShoppingCart />
      <CartToggleButton />
    </>
  );
};

export default App;
