// src/pages/OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Badge, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:3001/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Fetch orders on component mount
  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/order-history' } });
      return;
    }
    
    fetchOrders();
  }, [currentUser, navigate]);

  // Function to fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Set up API call with authentication
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Fetch orders from API
      const response = await axios.get(`${API_URL}/orders`, config);

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error.response?.data?.message || error.message || 'Failed to load order history');
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container className="pt-5 mt-4 pb-5">
      <h2 className="mb-4 pt-3">Order History</h2>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="danger" />
          <p className="mt-3 text-muted">Loading your order history...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : orders.length === 0 ? (
        <Alert variant="info">
          You haven't placed any orders yet. <Alert.Link href="/menu">Browse our menu</Alert.Link> to get started.
        </Alert>
      ) : (
        // Orders list
        <div className="mb-4">
          {orders.map((order) => (
            <Card key={order._id} className="mb-4 shadow-sm">
              <Card.Header className="bg-light">
                <Row className="align-items-center">
                  <Col>
                    <h5 className="mb-0">Order #{order._id.substring(order._id.length - 6)}</h5>
                    <small className="text-muted">
                      Placed on {formatDate(order.createdAt)}
                    </small>
                  </Col>
                  <Col xs="auto">
                    <Badge bg={order.status === 'completed' ? 'success' : 'primary'}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </Col>
                </Row>
              </Card.Header>

              <ListGroup variant="flush">
                {order.items.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="fw-medium">{item.name}</span>
                        <span className="text-muted ms-2">x {item.quantity}</span>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <Card.Footer className="bg-white">
                <Row className="align-items-center">
                  <Col>
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total:</span>
                      <span>${order.totalAmount.toFixed(2)}</span>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="text-muted">
                      <small>{order.paymentMethod} - {order.paymentStatus}</small>
                    </div>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default OrderHistory;