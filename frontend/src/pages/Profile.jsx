// src/pages/Profile.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) {
    return null; // Don't render anything while redirecting
  }

  return (
    <Container className="pt-5 mt-4 pb-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Header className="bg-danger text-white">
              <h3 className="mb-0">Your Profile</h3>
            </Card.Header>
            <Card.Body className="p-4 text-center">
              <div className="mb-4">
                <div className="bg-light rounded-circle d-inline-flex justify-content-center align-items-center mb-3" style={{ width: '100px', height: '100px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  </svg>
                </div>
                <h4 className="mb-3">{currentUser.username}</h4>
              </div>
              
              <div className="mb-4">
                <h5 className="mb-3">Account Information</h5>
                <p className="mb-1"><strong>Username:</strong> {currentUser.username}</p>
                <p className="mb-0"><strong>Member Since:</strong> {new Date().toLocaleDateString()}</p>
              </div>
              
              <div className="d-grid gap-2">
                <Button 
                  variant="outline-secondary"
                  onClick={() => navigate('/order-history')}
                >
                  View Order History
                </Button>
                <Button 
                  variant="danger" 
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;