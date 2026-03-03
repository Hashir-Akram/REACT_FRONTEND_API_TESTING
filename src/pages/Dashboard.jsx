import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';
import AdminDashboard from '../components/AdminDashboard';
import UserDashboard from '../components/UserDashboard';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const usersResponse = await apiService.getUsers();
      const users = usersResponse.data.data.users;
      
      const statsData = {
        totalUsers: users.length,
        adminUsers: users.filter(u => u.role === 'admin').length,
        regularUsers: users.filter(u => u.role === 'user').length,
        recentUsers: users.slice(-5).reverse(),
      };
      
      setStats(statsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-speedometer2 me-2 text-primary"></i>
            Dashboard
          </h2>
          <p className="text-muted">
            Welcome back, <strong>{user?.name}</strong>!
            {isAdmin() && <span className="badge bg-danger ms-2">Admin</span>}
          </p>
        </Col>
      </Row>

      {isAdmin() ? (
        <AdminDashboard stats={stats} refreshStats={fetchStats} />
      ) : (
        <UserDashboard user={user} stats={stats} />
      )}
    </Container>
  );
};

export default Dashboard;
