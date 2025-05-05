import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// This matches the image in your screenshot with the three service cards
const services = [
  {
    img: '/assets/catering_images/catering1.jpg',
    title: 'Wedding Celebrations',
    text: 'Make your special day even more memorable with our custom menus tailored to your preferences and guest count.',
  },
  {
    img: '/assets/catering_images/catering2.jpg',
    title: 'Corporate Events',
    text: 'Impress clients and reward employees with our professional catering services for meetings, launches, and celebrations.',
  },
  {
    img: '/assets/catering_images/catering3.jpg',
    title: 'Private Parties',
    text: 'Birthday parties, graduations, reunions—whatever the occasion, our mobile kitchen will make it delicious.',
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-5">
      <Container>
        <Row>
          {services.map(({ img, title, text }) => (
            <Col md={4} key={title} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={img}
                  alt={title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="bg-light">
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>{text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}