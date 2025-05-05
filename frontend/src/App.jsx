// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home     from './pages/Home';
import Catering from './pages/Catering';

function App() {
  return (
    <Router>
      <Navbar />

      {/* push page content below the navbar (adjust pt-20 if your navbar height changes) */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catering" element={<Catering />} />
        </Routes>
      </div>

      {/* footer on every page */}
      <Footer />
    </Router>
  );
}

export default App;
