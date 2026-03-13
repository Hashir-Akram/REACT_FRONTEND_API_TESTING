import { Row, Col, Card, Table, Badge } from 'react-bootstrap';

const UserDashboard = ({ user, stats }) => {
  const userInfo = [
    { label: 'Name', value: user?.name, icon: 'person' },
    { label: 'Email', value: user?.email, icon: 'envelope' },
    { label: 'Role', value: user?.role, icon: 'shield-check' },
    { label: 'User ID', value: user?.id, icon: 'hash' },
  ];

  return (
    <>
      {/* Welcome Message */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm" style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <Card.Body className="py-4">
              <h4 className="fw-bold">
                <i className="bi bi-emoji-smile me-2"></i>
                Welcome, {user?.name}!
              </h4>
              <p className="mb-0">
                You're logged in as a regular user. View your profile information below.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Info Cards */}
      <Row className="mb-4">
        {userInfo.map((info, idx) => (
          <Col key={idx} lg={3} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                    style={{ width: '50px', height: '50px' }}
                  >
                    <i className={`bi bi-${info.icon} text-primary`} style={{ fontSize: '1.5rem' }}></i>
                  </div>
                  <div>
                    <p className="text-muted mb-1 small">{info.label}</p>
                    <h6 className="fw-bold mb-0">{info.value}</h6>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Statistics */}
      <Row>
        <Col md={6} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-3">
                <i className="bi bi-graph-up me-2 text-success"></i>
                My Work Summary
              </h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Assigned Tasks:</span>
                <strong>{stats?.tasks?.assigned || 0}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Created Tasks:</span>
                <strong>{stats?.tasks?.created || 0}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>In Progress:</span>
                <strong>{stats?.tasks?.in_progress || 0}</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Owned Projects:</span>
                <strong>{stats?.projects?.owned || 0}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-3">
                <i className="bi bi-info-circle me-2 text-info"></i>
                Quick Info
              </h5>
              <p className="mb-2">
                <i className="bi bi-check-circle text-success me-2"></i>
                Your account is active
              </p>
              <p className="mb-2">
                <i className="bi bi-kanban text-primary me-2"></i>
                Projects and tasks are available for hands-on testing
              </p>
              <p className="mb-0">
                <i className="bi bi-clock text-warning me-2"></i>
                Session expires in 1 hour
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <h5 className="fw-bold mb-3">
                <i className="bi bi-kanban me-2 text-primary"></i>
                Recent Projects
              </h5>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Tasks</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.projects?.recent?.map((project) => (
                    <tr key={project.id}>
                      <td>{project.title}</td>
                      <td>
                        <Badge bg={project.status === 'active' ? 'success' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </td>
                      <td>{project.task_count}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <h5 className="fw-bold mb-3">
                <i className="bi bi-list-check me-2 text-success"></i>
                Recent Assigned Tasks
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
                      <td>{task.title}</td>
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
    </>
  );
};

export default UserDashboard;
