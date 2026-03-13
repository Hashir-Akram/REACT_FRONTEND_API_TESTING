import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';

const defaultForm = {
  title: '',
  description: '',
  project_id: '',
  status: 'todo',
  priority: 'medium',
  assigned_to: '',
  due_date: '',
  estimated_hours: '',
  tags: ''
};

const Tasks = () => {
  const { user, isAdmin } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [filters, setFilters] = useState({ q: '', status: '', priority: '', project_id: '', overdue: false });
  const [formData, setFormData] = useState(defaultForm);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [commentText, setCommentText] = useState('');
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [bulkStatus, setBulkStatus] = useState('in_progress');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [tasksResponse, projectsResponse] = await Promise.all([
        apiService.getTasks(),
        apiService.getProjects()
      ]);
      setTasks(tasksResponse.data.data.tasks);
      setProjects(projectsResponse.data.data.projects);

      if (isAdmin()) {
        const usersResponse = await apiService.getUsers();
        setUsers(usersResponse.data.data.users);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async (nextFilters = filters) => {
    try {
      setLoading(true);
      const params = { ...nextFilters };
      if (!params.status) delete params.status;
      if (!params.priority) delete params.priority;
      if (!params.project_id) delete params.project_id;
      if (!params.q) delete params.q;
      if (!params.overdue) delete params.overdue;
      const response = await apiService.getTasks(params);
      setTasks(response.data.data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const canEditTask = (task) => isAdmin() || task.created_by === user?.id;
  const canChangeStatus = (task) => canEditTask(task) || task.assigned_to === user?.id;

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedTask(null);
    setFormData(defaultForm);
    setShowTaskModal(true);
  };

  const openEditModal = (task) => {
    setModalMode('edit');
    setSelectedTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      project_id: task.project_id,
      status: task.status,
      priority: task.priority,
      assigned_to: task.assigned_to || '',
      due_date: task.due_date || '',
      estimated_hours: task.estimated_hours || '',
      tags: (task.tags || []).join(', ')
    });
    setShowTaskModal(true);
  };

  const openCommentsModal = async (task) => {
    setSelectedTask(task);
    setShowCommentsModal(true);
    try {
      const response = await apiService.getTaskComments(task.id);
      setComments(response.data.data.comments);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load comments');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const payload = {
        ...formData,
        tags: formData.tags,
        assigned_to: formData.assigned_to || null,
        estimated_hours: formData.estimated_hours || null,
        due_date: formData.due_date || null
      };

      if (modalMode === 'create') {
        await apiService.createTask(payload);
        setSuccess('Task created successfully');
      } else {
        await apiService.updateTask(selectedTask.id, payload);
        setSuccess('Task updated successfully');
      }
      setShowTaskModal(false);
      setFormData(defaultForm);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Task operation failed');
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Delete this task?')) {
      return;
    }
    try {
      await apiService.deleteTask(taskId);
      setSuccess('Task deleted successfully');
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleQuickStatus = async (task, status) => {
    try {
      await apiService.updateTaskStatus(task.id, { status });
      setSuccess('Task status updated successfully');
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task status');
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      await apiService.createTaskComment(selectedTask.id, { content: commentText });
      setCommentText('');
      const response = await apiService.getTaskComments(selectedTask.id);
      setComments(response.data.data.comments);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await apiService.deleteComment(commentId);
      const response = await apiService.getTaskComments(selectedTask.id);
      setComments(response.data.data.comments);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete comment');
    }
  };

  const handleBulkUpdate = async () => {
    if (!selectedTaskIds.length) {
      setError('Select at least one task for bulk update');
      return;
    }
    try {
      await apiService.bulkUpdateTasks({ task_ids: selectedTaskIds, status: bulkStatus });
      setSuccess('Bulk task update successful');
      setSelectedTaskIds([]);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Bulk update failed');
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-list-check me-2 text-primary"></i>
            Tasks
          </h2>
          <p className="text-muted">Test filtering, sorting, comments, status transitions, and bulk operations.</p>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={openCreateModal}>
            <i className="bi bi-plus-circle me-2"></i>
            New Task
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              fetchTasks(filters);
            }}
          >
            <Row className="g-3">
              <Col md={3}>
                <Form.Control
                  placeholder="Search title, description, tags"
                  value={filters.q}
                  onChange={(event) => setFilters({ ...filters, q: event.target.value })}
                />
              </Col>
              <Col md={2}>
                <Form.Select value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
                  <option value="">All statuses</option>
                  <option value="todo">todo</option>
                  <option value="in_progress">in_progress</option>
                  <option value="in_review">in_review</option>
                  <option value="done">done</option>
                  <option value="blocked">blocked</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Form.Select value={filters.priority} onChange={(event) => setFilters({ ...filters, priority: event.target.value })}>
                  <option value="">All priorities</option>
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                  <option value="critical">critical</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select value={filters.project_id} onChange={(event) => setFilters({ ...filters, project_id: event.target.value })}>
                  <option value="">All projects</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>{project.title}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={2} className="d-flex align-items-center gap-2">
                <Form.Check
                  type="checkbox"
                  label="Overdue"
                  checked={filters.overdue}
                  onChange={(event) => setFilters({ ...filters, overdue: event.target.checked })}
                />
                <Button type="submit" variant="dark">Go</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {isAdmin() && (
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <Row className="align-items-end">
              <Col md={6}>
                <Form.Label>Bulk status update for selected tasks</Form.Label>
                <Form.Select value={bulkStatus} onChange={(event) => setBulkStatus(event.target.value)}>
                  <option value="todo">todo</option>
                  <option value="in_progress">in_progress</option>
                  <option value="in_review">in_review</option>
                  <option value="done">done</option>
                  <option value="blocked">blocked</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <div className="text-muted small">Selected: {selectedTaskIds.length}</div>
              </Col>
              <Col md={3} className="text-end">
                <Button variant="warning" onClick={handleBulkUpdate}>Apply Bulk Update</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

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
                  {isAdmin() && <th></th>}
                  <th>Task</th>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assignee</th>
                  <th>Due</th>
                  <th>Comments</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    {isAdmin() && (
                      <td>
                        <Form.Check
                          checked={selectedTaskIds.includes(task.id)}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setSelectedTaskIds([...selectedTaskIds, task.id]);
                            } else {
                              setSelectedTaskIds(selectedTaskIds.filter((id) => id !== task.id));
                            }
                          }}
                        />
                      </td>
                    )}
                    <td>
                      <div className="fw-semibold">{task.title}</div>
                      <small className="text-muted">{task.tags?.join(', ')}</small>
                    </td>
                    <td>{task.project_title}</td>
                    <td>
                      <Badge bg={task.status === 'done' ? 'success' : task.status === 'blocked' ? 'danger' : 'warning'}>
                        {task.status}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={task.priority === 'critical' ? 'danger' : task.priority === 'high' ? 'warning' : 'secondary'}>
                        {task.priority}
                      </Badge>
                    </td>
                    <td>{task.assigned_to_name || 'Unassigned'}</td>
                    <td>{task.due_date ? new Date(task.due_date).toLocaleDateString() : '-'}</td>
                    <td>
                      <Button variant="outline-secondary" size="sm" onClick={() => openCommentsModal(task)}>
                        {task.comment_count}
                      </Button>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        {canChangeStatus(task) && task.status !== 'done' && (
                          <Button variant="outline-success" size="sm" onClick={() => handleQuickStatus(task, 'done')}>
                            Done
                          </Button>
                        )}
                        {canEditTask(task) && (
                          <Button variant="outline-primary" size="sm" onClick={() => openEditModal(task)}>
                            Edit
                          </Button>
                        )}
                        {canEditTask(task) && (
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(task.id)}>
                            Delete
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

      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'create' ? 'New Task' : 'Edit Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} required />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Project</Form.Label>
                <Form.Select value={formData.project_id} onChange={(event) => setFormData({ ...formData, project_id: event.target.value })} required>
                  <option value="">Select project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>{project.title}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={4} value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} required />
            </Form.Group>
            <Row>
              <Col md={3} className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select value={formData.status} onChange={(event) => setFormData({ ...formData, status: event.target.value })}>
                  <option value="todo">todo</option>
                  <option value="in_progress">in_progress</option>
                  <option value="in_review">in_review</option>
                  <option value="done">done</option>
                  <option value="blocked">blocked</option>
                </Form.Select>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select value={formData.priority} onChange={(event) => setFormData({ ...formData, priority: event.target.value })}>
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                  <option value="critical">critical</option>
                </Form.Select>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Label>Assignee</Form.Label>
                <Form.Select value={formData.assigned_to} onChange={(event) => setFormData({ ...formData, assigned_to: event.target.value })}>
                  <option value="">Unassigned</option>
                  {(isAdmin() ? users : [user]).filter(Boolean).map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" value={formData.due_date} onChange={(event) => setFormData({ ...formData, due_date: event.target.value })} />
              </Col>
            </Row>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Label>Estimated Hours</Form.Label>
                <Form.Control type="number" min="0" step="0.5" value={formData.estimated_hours} onChange={(event) => setFormData({ ...formData, estimated_hours: event.target.value })} />
              </Col>
              <Col md={8} className="mb-3">
                <Form.Label>Tags</Form.Label>
                <Form.Control value={formData.tags} onChange={(event) => setFormData({ ...formData, tags: event.target.value })} placeholder="api, regression, auth" />
              </Col>
            </Row>
            <div className="d-flex gap-2">
              <Button type="submit" variant="primary">Save Task</Button>
              <Button variant="secondary" onClick={() => setShowTaskModal(false)}>Cancel</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showCommentsModal} onHide={() => setShowCommentsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Comments for {selectedTask?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-3 mb-3">
            {comments.map((comment) => (
              <Card key={comment.id} className="border-0 bg-light">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <div className="fw-semibold">{comment.author_name}</div>
                      <small className="text-muted">{new Date(comment.created_at).toLocaleString()}</small>
                    </div>
                    {(isAdmin() || comment.author_id === user?.id) && (
                      <Button variant="outline-danger" size="sm" onClick={() => handleDeleteComment(comment.id)}>
                        Delete
                      </Button>
                    )}
                  </div>
                  <div>{comment.content}</div>
                </Card.Body>
              </Card>
            ))}
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Add Comment</Form.Label>
            <Form.Control as="textarea" rows={3} value={commentText} onChange={(event) => setCommentText(event.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={handleAddComment}>Add Comment</Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Tasks;
