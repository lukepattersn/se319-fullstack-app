import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';

export default function CateringPackages() {
  // State for packages data - will be populated from MongoDB in the future
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This useEffect will be used to fetch data from MongoDB in the future
  useEffect(() => {
    // Simulate API call to fetch packages from MongoDB
    const fetchPackages = async () => {
      try {
        setLoading(true);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));

        // Mock data that simulates what would be returned from MongoDB
        // In the future, replace this with an actual API call:
        // const response = await fetch('/api/catering/packages');
        // const data = await response.json();
        // setPackages(data);
        
        // For now, we'll use static data
        const mockPackages = [
          {
            _id: '1',
            name: 'Basic Package',
            price: 15,
            items: [
              'Choice of 2 appetizers',
              '1 main dish',
              '1 side dish',
              'Beverage station',
              'Setup and cleanup',
              'Serving equipment',
              'Staff',
            ],
            minGuests: 20,
            imagePath: '/assets/catering_images/catering1.jpg'
          },
          {
            _id: '2',
            name: 'Premium Package',
            price: 25,
            items: [
              'Choice of 3 appetizers',
              '2 main dishes',
              '2 side dishes',
              'Dessert option',
              'Beverage station',
              'Setup and cleanup',
              'Serving staff & equipment',
            ],
            minGuests: 30,
            imagePath: '/assets/catering_images/catering2.jpg'
          },
          {
            _id: '3',
            name: 'Deluxe Package',
            price: 35,
            items: [
              'Full appetizer spread',
              '3 main dishes',
              '3 side dishes',
              'Dessert station',
              'Premium beverage service',
              'Full service staff',
              'Custom menu consultation',
            ],
            minGuests: 50,
            imagePath: '/assets/catering_images/catering3.jpg'
          },
        ];
        
        setPackages(mockPackages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching catering packages:', err);
        setError('Failed to load catering packages. Please try again later.');
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <section className="py-5 bg-light">
        <Container className="text-center">
          <Spinner animation="border" variant="danger" />
          <p className="mt-3">Loading catering packages...</p>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5 bg-light">
        <Container>
          <div className="alert alert-danger">{error}</div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-5">Catering Packages</h2>

        <Row>
          {packages.map(({ _id, name, price, items, minGuests, imagePath }) => (
            <Col lg={4} className="mb-4" key={_id}>
              <Card 
                className="h-100 shadow-sm hover-card" 
                style={{ 
                  transition: "transform 0.3s ease" 
                }}
              >
                {/* Add image to the card */}
                <Card.Img 
                  variant="top" 
                  src={imagePath} 
                  alt={`${name} Package`}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Header className="text-white text-center bg-danger">
                  <h4 className="my-0">{name}</h4>
                </Card.Header>
                <Card.Body>
                  <h2 className="text-center mb-3">
                    ${price}
                    <small className="text-muted">/person</small>
                  </h2>
                  <ul className="list-unstyled mb-3">
                    {items.map(item => (
                      <li className="mb-2" key={item}>
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        {item}
                      </li>
                    ))}
                    <li className="text-muted">
                      Minimum {minGuests} guests
                    </li>
                  </ul>
                  <div className="text-center mt-4">
                    <Button variant="outline-danger" href="#catering-form">
                      Request Package
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4">
          <p className="lead">
            Custom packages available to suit your specific needs and budget.
          </p>
        </div>
      </Container>
    </section>
  );
}