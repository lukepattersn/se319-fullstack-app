// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useCart } from '../components/cart/CartContext';
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:3001/api';

const Checkout = () => {
  const { cart, cartTotal, removeFromCart } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState('payment');
  const [orderId, setOrderId] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    name: '', 
    email: '', 
    address: '',
    cardNumber: '', 
    expiryDate: '', 
    cvc: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If cart is empty, redirect to menu
  useEffect(() => {
    if (cart.length === 0 && step !== 'summary') {
      navigate('/menu');
    }
  }, [cart, navigate, step]);

  const handleChange = e => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  // Formatting helpers
  const handleCardNumberChange = e => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
    setPaymentInfo({ ...paymentInfo, cardNumber: formatted });
  };

  const handleExpiryDateChange = e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    setPaymentInfo({ ...paymentInfo, expiryDate: v });
  };
  
  const handleCvcChange = e => {
    setPaymentInfo({ ...paymentInfo, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, address, cardNumber, expiryDate, cvc } = paymentInfo;

    // Simple validation
    if (!name || !email || !address || !cardNumber || !expiryDate || !cvc) {
      setError("Please fill out all fields.");
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('You must be logged in to checkout');
      }

      // Prepare checkout data
      const checkoutData = {
        cartItems: cart,
        shippingDetails: {
          name,
          email,
          address
        },
        paymentDetails: {
          method: 'Credit Card',
          cardNumber,
          expiryDate,
          cvc
        },
        totalAmount: cartTotal
      };

      // Send checkout request to API
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post(`${API_URL}/checkout`, checkoutData, config);

      if (response.data.success) {
        // Store order ID
        setOrderId(response.data.data.orderId);
        
        // Advance to summary
        setStep('summary');
      } else {
        setError(response.data.message || 'Checkout failed');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setError(error.response?.data?.message || error.message || 'Error processing checkout');
    } finally {
      setLoading(false);
    }
  };

  const handleContinueShopping = () => {
    // Clear cart
    cart.forEach(item => {
      removeFromCart(item.product_id || item.id);
    });
    navigate('/menu');
  };

  // Render Payment Form
  const renderPaymentForm = () => (
    <Card className="shadow mb-4">
      <Card.Header className="bg-light">
        <h5 className="mb-0">Payment Details</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <h6 className="mb-3">Your Information</h6>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={paymentInfo.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={paymentInfo.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={paymentInfo.address}
                  onChange={handleChange}
                  placeholder="123 Main St, City, State"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          <h6 className="mb-3 mt-4">Payment Information</h6>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="text"
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MM/YY"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>CVC</Form.Label>
                <Form.Control
                  type="text"
                  name="cvc"
                  value={paymentInfo.cvc}
                  onChange={handleCvcChange}
                  placeholder="123"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          <div className="d-grid">
            <Button 
              variant="danger" 
              type="submit" 
              disabled={loading}
              className="py-2"
            >
              {loading ? (
                <>
                  <Spinner 
                    as="span" 
                    animation="border" 
                    size="sm" 
                    role="status" 
                    aria-hidden="true" 
                    className="me-2"
                  />
                  Processing...
                </>
              ) : "Complete Purchase"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  // Render Order Summary
  const renderOrderSummary = () => (
    <Card className="shadow mb-4">
      <Card.Header className="bg-light">
        <h5 className="mb-0">Order Summary</h5>
      </Card.Header>
      <Card.Body>
        <ul className="list-group list-group-flush mb-3">
          {cart.map((item) => (
            <li key={item.product_id || item.id} className="list-group-item px-0">
              <div className="d-flex justify-content-between">
                <div>
                  <span className="fw-medium">{item.product_name}</span>
                  <span className="text-muted ms-2">x {item.quantity || 1}</span>
                </div>
                <span>${((item.price) * (item.quantity || 1)).toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-between fw-bold py-2 border-top">
          <span>Total:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </Card.Body>
    </Card>
  );

  // Render Order Success
  const renderOrderSuccess = () => (
    <Card className="shadow text-center">
      <Card.Body className="py-5">
        <div className="mb-4">
          <div className="bg-success text-white rounded-circle d-inline-flex justify-content-center align-items-center" style={{ width: '80px', height: '80px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
            </svg>
          </div>
        </div>
        <h3 className="mb-3">Thank You for Your Order!</h3>
        <p className="mb-4">Your order (ID: {orderId}) has been received and is being processed.</p>
        <div className="card bg-light mb-4">
          <div className="card-body text-start">
            <p><strong>Name:</strong> {paymentInfo.name}</p>
            <p><strong>Email:</strong> {paymentInfo.email}</p>
            <p className="mb-0"><strong>Delivery Address:</strong> {paymentInfo.address}</p>
          </div>
        </div>
        <Button 
          variant="primary" 
          onClick={handleContinueShopping} 
          className="px-4"
        >
          Continue Shopping
        </Button>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="pt-5 mt-4 pb-5">
      <h2 className="mb-4 pt-3">Checkout</h2>
      <Row>
        <Col lg={7}>
          {step === 'payment' && renderPaymentForm()}
          {step === 'summary' && renderOrderSuccess()}
        </Col>
        <Col lg={5}>
          {step === 'payment' && renderOrderSummary()}
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;