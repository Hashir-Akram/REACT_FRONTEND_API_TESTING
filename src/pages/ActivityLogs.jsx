import { useEffect, useState } from 'react';
import { Alert, Badge, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';

const ActivityLogs = () => {
  const { isAdmin } = useAuth();
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({ entity_type: '', action: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchLogs = async (nextFilters = filters) => {
    try {
      setLoading(true);
      const response = await apiService.getAuditLogs(nextFilters);
      setLogs(response.data.data.logs);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin()) {
      fetchLogs();
    }
  }, []);

  if (!isAdmin()) {
    return (
      <Container fluid>
        <Alert variant="warning">Only admin users can access audit logs.</Alert>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-activity me-2 text-primary"></i>
            Activity Logs
          </h2>
          <p className="text-muted">Inspect backend audit events for admin, auth, CRUD, and workflow testing.</p>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              fetchLogs(filters);
            }}
          >
            <Row>
              <Col md={5}>
                <Form.Group>
                  <Form.Label>Entity Type</Form.Label>
                  <Form.Control
                    placeholder="user, task, project, comment"
                    value={filters.entity_type}
                    onChange={(event) => setFilters({ ...filters, entity_type: event.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group>
                  <Form.Label>Action</Form.Label>
                  <Form.Control
                    placeholder="created, updated, deleted, login"
                    value={filters.action}
                    onChange={(event) => setFilters({ ...filters, action: event.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <button className="btn btn-dark w-100" type="submit">Filter</button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Action</th>
                  <th>Entity</th>
                  <th>Actor</th>
                  <th>Details</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td><Badge bg="dark">{log.action}</Badge></td>
                    <td>{log.entity_type}</td>
                    <td>{log.actor_name || 'System'}</td>
                    <td><small className="text-muted">{JSON.stringify(log.details)}</small></td>
                    <td>{new Date(log.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ActivityLogs;
