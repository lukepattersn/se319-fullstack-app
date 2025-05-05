import React from 'react';
import { Container } from 'react-bootstrap';

export default function CateringHero() {
  // Style for the hero section with background image - reduced height
  const heroStyle = {
    backgroundImage: "url('/assets/catering_images/catering-hero.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '40vh', // Reduced from 60vh to 40vh
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem'
  };
  
  // Style for the overlay to make text more readable
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1
  };
  
  // Style for the content container
  const contentStyle = {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    color: 'white'
  };

  return (
    <div style={heroStyle}>
      <div style={overlayStyle}></div>
      <Container style={contentStyle}>
        <h1 className="display-4">Catering Services</h1>
        <p className="lead">From private parties to local festivals, we bring the flavor and fun to every event.</p>
        <p>
          <a className="btn btn-lg btn-danger" href="#catering-form">Request a Quote</a>
        </p>
      </Container>
    </div>
  );
}