import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age)
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await apiService.updateUser(user.id, updateData);
      updateUser(response.data.data);
      setSuccess('Profile updated successfully!');
      setEditing(false);
      setFormData({ ...formData, password: '', confirmPassword: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-person me-2 text-primary"></i>
            My Profile
          </h2>
          <p className="text-muted">Manage your personal information</p>
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

      <Row>
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Profile Information</h5>
                {!editing && (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setEditing(true)}
                  >
                    <i className="bi bi-pencil me-2"></i>
                    Edit Profile
                  </Button>
                )}
              </div>

              {!editing ? (
                <div>
                  <div className="mb-3 pb-3 border-bottom">
                    <label className="text-muted small">Name</label>
                    <p className="fw-semibold mb-0">{user?.name}</p>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <label className="text-muted small">Email</label>
                    <p className="fw-semibold mb-0">{user?.email}</p>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <label className="text-muted small">Age</label>
                    <p className="fw-semibold mb-0">{user?.age}</p>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <label className="text-muted small">Role</label>
                    <p className="fw-semibold mb-0">
                      <span className={`badge bg-${user?.role === 'admin' ? 'danger' : 'secondary'}`}>
                        {user?.role}
                      </span>
                    </p>
                  </div>
                  <div className="mb-0">
                    <label className="text-muted small">User ID</label>
                    <p className="fw-semibold mb-0">{user?.id}</p>
                  </div>
                </div>
              ) : (
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

                  <hr className="my-4" />

                  <h6 className="fw-bold mb-3">Change Password (Optional)</h6>

                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      minLength={8}
                      placeholder="Leave blank to keep current password"
                    />
                    <Form.Text className="text-muted">
                      Must be at least 8 characters with uppercase, lowercase, digit, and special character
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      minLength={8}
                      placeholder="Confirm new password"
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="primary" type="submit">
                      <i className="bi bi-check-circle me-2"></i>
                      Save Changes
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setEditing(false);
                        setFormData({
                          name: user?.name || '',
                          email: user?.email || '',
                          age: user?.age || '',
                          password: '',
                          confirmPassword: ''
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
              <h6 className="fw-bold mb-3">
                <i className="bi bi-shield-check me-2 text-success"></i>
                Security
              </h6>
              <p className="small text-muted mb-2">
                <i className="bi bi-check-circle text-success me-2"></i>
                Your password is encrypted
              </p>
              <p className="small text-muted mb-0">
                <i className="bi bi-clock text-warning me-2"></i>
                Session expires after 1 hour
              </p>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h6 className="fw-bold mb-3">
                <i className="bi bi-info-circle me-2 text-info"></i>
                Account Info
              </h6>
              <p className="small mb-2">
                <strong>Member since:</strong><br />
                {new Date(user?.created_at || Date.now()).toLocaleDateString()}
              </p>
              <p className="small mb-0">
                <strong>Last updated:</strong><br />
                {new Date(user?.updated_at || Date.now()).toLocaleDateString()}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
