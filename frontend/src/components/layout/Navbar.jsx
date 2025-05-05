// src/components/layout/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function AppNavbar() {
  return (
    <Navbar
      expand="md"
      fixed="top"
      variant="dark"
      className="navbar-custom shadow-sm"
    >
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <img
            src="/assets/myotherimages/sff-logo.webp"
            alt="Street Food Fighter Logo"
            width="60"
            height="30"
            className="d-inline-block align-text-top me-2"
          />
          The Street Food Fighter
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav>
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className="nav-link"    
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/menu"
              className="nav-link"
            >
              Menu
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/about"
              className="nav-link"
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/catering"
              className="nav-link"
            >
              Catering
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/team"
              className="nav-link"
            >
              Team
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/future"
              className="nav-link"
            >
              Future
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/admin"
              className="nav-link"
            >
              Admin
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
