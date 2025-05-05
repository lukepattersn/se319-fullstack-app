import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light py-5 mt-5 shadow-sm">
      <Container>
        <Row className="mb-4">
          
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3 text-danger">The Street Food Fighter</h5>
            <p className="text-muted mb-3">
              Lao &amp; Tai Dam family owned &amp; operated since 2016. Fresh,
              never frozen, and always made with love!
            </p>
            <p className="text-muted mb-0">
              <i className="bi bi-geo-alt me-2"></i>
              Cedar Rapids, Iowa
            </p>
          </Col>
          
          <Col lg={4} md={12}>
            <h5 className="fw-bold mb-3 text-danger">Connect With Us</h5>
            <div className="d-flex gap-2 mb-3">
              <Button 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                variant="outline-secondary" 
                size="sm" 
                className="rounded-circle"
              >
                FB
              </Button>
              <Button 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                variant="outline-secondary" 
                size="sm" 
                className="rounded-circle"
              >
                IG
              </Button>
              <Button 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                variant="outline-secondary" 
                size="sm" 
                className="rounded-circle"
              >
                TW
              </Button>
            </div>
            <p className="text-muted mb-0">
              Call us: (319) 555-1234<br/>
              Email: info@streetfoodfighter.com
            </p>
          </Col>
          
        </Row>
        
        <Row>
          <Col className="text-center border-top pt-3">
            <p className="text-muted mb-0">
              &copy; {currentYear} The Street Food Fighter. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;