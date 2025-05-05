import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

export default function CateringForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    date: '', time: '', guests: '',
    location: '', eventType: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      console.log('Form submitted:', formData);
      setFormData({
        name: '', email: '', phone: '',
        date: '', time: '', guests: '',
        location: '', eventType: '', message: '',
      });
      setSubmitted(true);
    } catch {
      // handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Added ID here for the anchor link to target
    <section className="py-5" id="catering-form">
      <Container>
        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="shadow">
              <Card.Header className="bg-danger text-white">
                <h3 className="mb-0">Request Catering Information</h3>
              </Card.Header>
              <Card.Body>
                {submitted ? (
                  <div className="text-center py-5">
                    <i className="bi bi-check-circle text-success" style={{ fontSize: '4rem' }} />
                    <h4 className="mt-3">Thank You!</h4>
                    <p className="lead">
                      Your request has been received. We'll contact you in 24-48 hours.
                    </p>
                    <Button
                      variant="outline-secondary"
                      onClick={() => setSubmitted(false)}
                      className="mt-3"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Your Name*</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address*</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number*</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Event Type*</Form.Label>
                          <Form.Select
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Event Type</option>
                            <option value="wedding">Wedding</option>
                            <option value="corporate">Corporate</option>
                            <option value="birthday">Birthday</option>
                            <option value="graduation">Graduation</option>
                            <option value="holiday">Holiday</option>
                            <option value="other">Other</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Event Date*</Form.Label>
                          <Form.Control
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Event Time*</Form.Label>
                          <Form.Control
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Estimated Guests*</Form.Label>
                          <Form.Control
                            type="number"
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            required
                            min="1"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Event Location*</Form.Label>
                          <Form.Control
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            placeholder="Venue name or address"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label>Additional Info</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Any special requests or questions?"
                      />
                    </Form.Group>

                    <div className="text-center">
                      <Button
                        variant="danger"
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}