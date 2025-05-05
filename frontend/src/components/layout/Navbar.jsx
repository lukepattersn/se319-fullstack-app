// src/components/layout/Navbar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../auth/AuthContext';

export default function AppNavbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          <Nav className="me-auto">
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
          
          {/* User Authentication Controls */}
          <Nav>
            {currentUser ? (
              <NavDropdown 
                title={
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle me-1" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    {currentUser.username}
                  </span>
                } 
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item as={NavLink} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/order-history">
                  Order History
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Item className="d-flex">
                <Nav.Link as={NavLink} to="/login" className="nav-link">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="nav-link">
                  Register
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}