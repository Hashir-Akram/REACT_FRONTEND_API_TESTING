import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';

const Users = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    role: 'user'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiService.getUsers();
      setUsers(response.data.data.users);
      setLoading(false);
    } catch (err) {
      setError('Failed to load users');
      setLoading(false);
    }
  };

  const handleShowModal = (mode, user = null) => {
    setModalMode(mode);
    if (mode === 'edit' && user) {
      setSelectedUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        age: user.age,
        password: '',
        role: user.role
      });
    } else {
      setFormData({
        name: '',
        email: '',
        age: '',
        password: '',
        role: 'user'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (modalMode === 'add') {
        await apiService.createUser(formData);
        setSuccess('User created successfully!');
      } else {
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password;
        }
        await apiService.updateUser(selectedUser.id, updateData);
        setSuccess('User updated successfully!');
      }
      handleCloseModal();
      fetchUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await apiService.deleteUser(userId);
        setSuccess('User deleted successfully!');
        fetchUsers();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Delete failed');
      }
    }
  };

  if (!isAdmin()) {
    return (
      <Container>
        <Alert variant="warning">
          <i className="bi bi-exclamation-triangle me-2"></i>
          You don't have permission to access this page.
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-people me-2 text-primary"></i>
            User Management
          </h2>
          <p className="text-muted">Manage all users in the system</p>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => handleShowModal('add')}>
            <i className="bi bi-person-plus me-2"></i>
            Add New User
          </Button>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <i className="bi bi-person-circle me-2 text-primary"></i>
                    {user.name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Badge bg={user.role === 'admin' ? 'danger' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowModal('edit', user)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit User Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === 'add' ? 'Add New User' : 'Edit User'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                minLength={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
                min={18}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Password {modalMode === 'edit' && '(leave blank to keep current)'}
              </Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={modalMode === 'add'}
                minLength={8}
              />
              <Form.Text className="text-muted">
                Must be at least 8 characters with uppercase, lowercase, digit, and special character
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                <i className="bi bi-check-circle me-2"></i>
                {modalMode === 'add' ? 'Create User' : 'Update User'}
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Users;
