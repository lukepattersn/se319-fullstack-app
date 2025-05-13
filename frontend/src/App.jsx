import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import page components
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Catering from "./pages/Catering";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import Admin from "./pages/Admin";
import OrderHistory from "./pages/OrderHistory"; 

// Import cart components
import { CartProvider } from "./components/cart/CartContext";
import { AuthProvider } from "./components/auth/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import ShoppingCart from "./components/cart/ShoppingCart";
import CartToggleButton from "./components/cart/CartToggleButton";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/order-history"
              element={
                <PrivateRoute>
                  <OrderHistory />
                </PrivateRoute>
              }
            />
            <Route path="/team" element={<Team />} />
            <Route path="/admin" element={<Admin />} />

            <Route path="*" element={<Home />} />
          </Routes>

          {/* Global Cart Components */}
          <CartWrapper />
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
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