import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import page components
import Home from "./pages/Home";
// import About from "./pages/About";
import Menu from "./pages/Menu";
import Catering from "./pages/Catering";
// import Team from "./pages/Team";
// import Admin from "./pages/Admin";

// Import cart components
import { CartProvider } from "./components/cart/CartContext";
import ShoppingCart from "./components/cart/ShoppingCart";
import CartToggleButton from "./components/cart/CartToggleButton";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/catering" element={<Catering />} />
          <Route path="/menu" element={<Menu />} />
          {/* <Route path="/team" element={<Team />} /> */}
          {/* <Route path="/admin" element={<Admin />} /> */}

          {/* Redirect to home for unknown routes */}
          <Route path="*" element={<Home />} />
        </Routes>

        {/* Global Cart Components */}
        <CartWrapper />
        <Footer />
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
