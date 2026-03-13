import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';

const defaultForm = {
  title: '',
  description: '',
  status: 'active'
};

const Projects = () => {
  const { user, isAdmin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ q: '', status: '' });
  const [formData, setFormData] = useState(defaultForm);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async (nextFilters = filters) => {
    try {
      setLoading(true);
      const response = await apiService.getProjects(nextFilters);
      setProjects(response.data.data.projects);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const canManageProject = (project) => isAdmin() || project.owner_id === user?.id;

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedProject(null);
    setFormData(defaultForm);
    setShowModal(true);
  };

  const openEditModal = (project) => {
    setModalMode('edit');
    setSelectedProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      status: project.status
    });
    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (modalMode === 'create') {
        await apiService.createProject(formData);
        setSuccess('Project created successfully');
      } else {
        await apiService.updateProject(selectedProject.id, formData);
        setSuccess('Project updated successfully');
      }
      setShowModal(false);
      setFormData(defaultForm);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Project operation failed');
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Delete this project and all related tasks?')) {
      return;
    }
    try {
      await apiService.deleteProject(projectId);
      setSuccess('Project deleted successfully');
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete project');
    }
  };

  const handleArchive = async (projectId) => {
    try {
      await apiService.archiveProject(projectId);
      setSuccess('Project archived successfully');
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to archive project');
    }
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    fetchProjects(filters);
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-kanban me-2 text-primary"></i>
            Projects
          </h2>
          <p className="text-muted">Create, filter, update, archive, and delete projects for end-to-end testing.</p>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={openCreateModal}>
            <i className="bi bi-plus-circle me-2"></i>
            New Project
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Form onSubmit={handleFilterSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    placeholder="Search title or description"
                    value={filters.q}
                    onChange={(event) => setFilters({ ...filters, q: event.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={filters.status}
                    onChange={(event) => setFilters({ ...filters, status: event.target.value })}
                  >
                    <option value="">All statuses</option>
                    <option value="active">active</option>
                    <option value="on_hold">on_hold</option>
                    <option value="completed">completed</option>
                    <option value="archived">archived</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button type="submit" variant="dark" className="w-100">
                  Filter
                </Button>
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
                  <th>Title</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Tasks</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>
                      <div className="fw-semibold">{project.title}</div>
                      <small className="text-muted">{project.description.slice(0, 80)}</small>
                    </td>
                    <td>
                      <Badge bg={project.status === 'active' ? 'success' : project.status === 'archived' ? 'secondary' : 'warning'}>
                        {project.status}
                      </Badge>
                    </td>
                    <td>{project.owner_name}</td>
                    <td>{project.task_count}</td>
                    <td>{new Date(project.updated_at).toLocaleString()}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm" onClick={() => openEditModal(project)}>
                          <i className="bi bi-pencil"></i>
                        </Button>
                        {canManageProject(project) && project.status !== 'archived' && (
                          <Button variant="outline-warning" size="sm" onClick={() => handleArchive(project.id)}>
                            <i className="bi bi-archive"></i>
                          </Button>
                        )}
                        {canManageProject(project) && (
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(project.id)}>
                            <i className="bi bi-trash"></i>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'create' ? 'New Project' : 'Edit Project'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={formData.title}
                onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={formData.description}
                onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(event) => setFormData({ ...formData, status: event.target.value })}
              >
                <option value="active">active</option>
                <option value="on_hold">on_hold</option>
                <option value="completed">completed</option>
                <option value="archived">archived</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex gap-2">
              <Button type="submit" variant="primary">Save</Button>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Projects;
