import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const fillDemoCredentials = (role) => {
    if (role === 'admin') {
      setEmail('admin@example.com');
      setPassword('Admin@123');
    } else {
      setEmail('john@example.com');
      setPassword('User@123');
    }
  };

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={10} lg={8} xl={6}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="bi bi-shield-lock-fill text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h2 className="fw-bold text-dark">Welcome Back!</h2>
                  <p className="text-muted">Sign in to access your dashboard</p>
                </div>

                {error && (
                  <Alert variant="danger" dismissible onClose={() => setError('')}>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </Alert>
                )}

                <Form id="login-form" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <Form.Control
                        id="login-email-input"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-lock"></i>
                      </span>
                      <Form.Control
                        id="login-password-input"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Button
                    id="login-submit-btn"
                    variant="primary"
                    type="submit"
                    className="w-100 mb-3"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing in...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Sign In
                      </>
                    )}
                  </Button>
                </Form>

                <div className="demo-credentials mt-4 p-3 bg-light rounded">
                  <small className="text-muted d-block mb-2">
                    <i className="bi bi-info-circle me-1"></i>
                    Demo Credentials:
                  </small>
                  <div className="d-flex gap-2">
                    <Button
                      id="login-fill-admin-btn"
                      variant="outline-primary"
                      size="sm"
                      onClick={() => fillDemoCredentials('admin')}
                    >
                      <i className="bi bi-person-badge me-1"></i>
                      Admin
                    </Button>
                    <Button
                      id="login-fill-user-btn"
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => fillDemoCredentials('user')}
                    >
                      <i className="bi bi-person me-1"></i>
                      User
                    </Button>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    <i className="bi bi-shield-check me-1"></i>
                    Secured with JWT Authentication
                  </small>
                </div>
              </Card.Body>
            </Card>

            <div className="text-center mt-3">
              <small className="text-muted">
                API Backend Dashboard v1.0.0
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

