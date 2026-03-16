import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center">
        <h1 style={{ fontSize: '8rem', fontWeight: 'bold', color: '#667eea' }}>404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="text-muted mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          id="not-found-back-dashboard-btn"
          variant="primary"
          size="lg"
          onClick={() => navigate('/dashboard')}
        >
          <i className="bi bi-house me-2"></i>
          Back to Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
