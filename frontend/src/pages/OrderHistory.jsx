// src/pages/OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Spinner, Alert, Accordion, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../components/auth/AuthContext';
import { getApiUrl } from '../config';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { currentUser } = useAuth();
  const API_URL = getApiUrl();
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Not authenticated');
        }
        
        const response = await axios.get(`${API_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          setOrders(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching order history:', error);
        setError('Failed to load your order history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser, API_URL]);
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      case 'processing':
        return <Badge bg="primary">Processing</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Calculate total quantity of items in an order
  const getTotalItemCount = (items) => {
    return items.reduce((total, item) => total + (item.quantity || 1), 0);
  };
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
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
        <Card className="shadow-sm">
          <Card.Body className="text-center py-5">
            <h5>No Orders Yet</h5>
            <p className="text-muted">You haven't placed any orders yet.</p>
          </Card.Body>
        </Card>
      ) : (
        <Accordion defaultActiveKey="0" className="mb-4">
          {orders.map((order, index) => {
            // Calculate total items (sum of quantities)
            const totalItems = getTotalItemCount(order.items);
            
            return (
              <Accordion.Item key={order._id} eventKey={index.toString()}>
                <Accordion.Header>
                  <div className="d-flex justify-content-between align-items-center w-100 me-3">
                    <div>
                      <span className="fw-bold me-2">Order #{order._id.substring(0, 8)}</span>
                      <span className="text-muted">({formatDate(order.createdAt)})</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="me-3">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
                      <span className="me-3">${order.totalAmount.toFixed(2)}</span>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Card className="border-0">
                    <Card.Body>
                      <h5 className="mb-3">Order Details</h5>
                      
                      <Table responsive className="mb-4">
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th className="text-end">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, itemIndex) => (
                            <tr key={itemIndex}>
                              <td>
                                <div className="d-flex align-items-center">
                                  {item.image && (
                                    <img 
                                      src={item.image} 
                                      alt={item.name} 
                                      className="me-2"
                                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                    />
                                  )}
                                  <div>{item.name}</div>
                                </div>
                              </td>
                              <td>${item.price?.toFixed(2)}</td>
                              <td>{item.quantity || 1}</td>
                              <td className="text-end">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="table-group-divider">
                          <tr>
                            <th colSpan="3" className="text-end">Total:</th>
                            <th className="text-end">${order.totalAmount.toFixed(2)}</th>
                          </tr>
                        </tfoot>
                      </Table>
                      
                      {order.shippingDetails && (
                        <div className="mb-3">
                          <h6>Shipping Information</h6>
                          <Card className="bg-light">
                            <Card.Body>
                              <p className="mb-1"><strong>Name:</strong> {order.shippingDetails.name}</p>
                              <p className="mb-1"><strong>Email:</strong> {order.shippingDetails.email}</p>
                              <p className="mb-0"><strong>Address:</strong> {order.shippingDetails.address}</p>
                            </Card.Body>
                          </Card>
                        </div>
                      )}
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <Badge bg="secondary" className="me-2">Order ID: {order._id}</Badge>
                          <Badge bg="secondary">Payment: {order.paymentStatus}</Badge>
                        </div>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => window.print()}
                        >
                          Print Receipt
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      )}
    </Container>
  );
};

export default OrderHistory;