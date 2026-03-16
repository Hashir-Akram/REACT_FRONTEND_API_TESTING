import { Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ stats, refreshStats }) => {
  const navigate = useNavigate();

  const statsCards = [
    {
      title: 'Total Users',
      value: stats?.users?.total || 0,
      icon: 'people',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Projects',
      value: stats?.projects?.total || 0,
      icon: 'kanban',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Tasks',
      value: stats?.tasks?.total || 0,
      icon: 'list-check',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Critical Tasks',
      value: stats?.tasks?.critical || 0,
      icon: 'exclamation-octagon',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
  ];

  return (
    <>
      {/* Stats Cards */}
      <Row className="mb-4">
        {statsCards.map((stat, idx) => (
          <Col key={idx} lg={3} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted mb-1">{stat.title}</p>
                    <h3 className="fw-bold mb-0">{stat.value}</h3>
                  </div>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: stat.gradient,
                    }}
                  >
                    <i className={`bi bi-${stat.icon} text-white`} style={{ fontSize: '1.5rem' }}></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-3">
                <i className="bi bi-lightning me-2 text-warning"></i>
                Quick Actions
              </h5>
              <div className="d-flex gap-2 flex-wrap">
                <Button
                  id="dashboard-manage-projects-btn"
                  variant="primary"
                  onClick={() => navigate('/projects')}
                >
                  <i className="bi bi-kanban me-2"></i>
                  Manage Projects
                </Button>
                <Button
                  id="dashboard-manage-tasks-btn"
                  variant="success"
                  onClick={() => navigate('/tasks')}
                >
                  <i className="bi bi-list-check me-2"></i>
                  Manage Tasks
                </Button>
                <Button
                  id="dashboard-view-activity-btn"
                  variant="dark"
                  onClick={() => navigate('/activity')}
                >
                  <i className="bi bi-activity me-2"></i>
                  View Activity
                </Button>
                <Button
                  id="dashboard-refresh-data-btn"
                  variant="info"
                  onClick={refreshStats}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Refresh Data
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-3">
                <i className="bi bi-kanban me-2 text-primary"></i>
                Recent Projects
              </h5>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Tasks</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.projects?.recent?.map((project) => (
                    <tr key={project.id}>
                      <td>{project.id}</td>
                      <td>{project.title}</td>
                      <td>
                        <Badge bg={project.status === 'active' ? 'success' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </td>
                      <td>{project.owner_name}</td>
                      <td>{project.task_count}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <h5 className="fw-bold mb-3">
                <i className="bi bi-list-check me-2 text-success"></i>
                Recent Tasks
              </h5>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.tasks?.recent?.map((task) => (
                    <tr key={task.id}>
                      <td>
                        <div className="fw-semibold">{task.title}</div>
                        <small className="text-muted">{task.project_title}</small>
                      </td>
                      <td>
                        <Badge bg={task.status === 'done' ? 'success' : task.status === 'blocked' ? 'danger' : 'warning'}>
                          {task.status}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={task.priority === 'critical' ? 'danger' : 'secondary'}>
                          {task.priority}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-3">
                <i className="bi bi-activity me-2 text-dark"></i>
                Latest Audit Activity
              </h5>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Entity</th>
                    <th>Actor</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.audit_logs?.map((log) => (
                    <tr key={log.id}>
                      <td>{log.action}</td>
                      <td>{log.entity_type}</td>
                      <td>{log.actor_name || 'System'}</td>
                      <td>{new Date(log.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
