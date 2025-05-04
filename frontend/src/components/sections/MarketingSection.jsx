import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const items = [
  {
    img: '/assets/myotherimages/eggroll.jpg',
    title: 'About Us',
    text: 'Established in 2016, our Lao & Tai Dam family has been serving freshly made fusion street food in Cedar Rapids.',
    link: '/about',
    buttonText: 'View Details',
  },
  {
    img: '/assets/myotherimages/oven.png',
    title: 'Our Menu',
    text: 'From Khao Man Gai to Mongolian Beef Philly Cheesesteak, and more—everything is made fresh!',
    link: '/menu',
    buttonText: 'View Details',
  },
  {
    img: '/assets/myotherimages/events.png',
    title: 'Catering & Events',
    text: 'Let our mobile kitchen bring fresh, flavorful dishes to your next event.',
    link: '/catering',
    buttonText: 'View Details',
  },
];

export default function MarketingSection() {
  return (
    <Container className="py-5">
      <Row className="g-4">
        {items.map(({ img, title, text, link, buttonText }) => (
          <Col md={4} key={title}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Img 
                variant="top" 
                src={img} 
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <Button 
                  as={Link} 
                  to={link} 
                  variant="danger" 
                  className="mt-auto"
                >
                  {buttonText}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
