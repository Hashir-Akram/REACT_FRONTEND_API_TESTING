import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  const features = [
    { icon: 'shield-lock', title: 'JWT Authentication', description: 'Secure token-based authentication' },
    { icon: 'database', title: 'SQLite Database', description: 'Persistent data storage' },
    { icon: 'check-circle', title: 'Input Validation', description: 'Comprehensive data validation' },
    { icon: 'people', title: 'User Management', description: 'Complete CRUD operations' },
    { icon: 'shield-check', title: 'Password Hashing', description: 'Bcrypt encryption' },
    { icon: 'person-badge', title: 'Role-Based Access', description: 'Admin and user roles' },
  ];

  const techStack = [
    { category: 'Backend', items: ['Flask 3.0', 'SQLAlchemy', 'JWT', 'bcrypt'] },
    { category: 'Frontend', items: ['React 18', 'Vite 5', 'React Router', 'Bootstrap 5'] },
    { category: 'Database', items: ['SQLite', 'Thread-safe operations'] },
    { category: 'Security', items: ['JWT tokens', 'Password hashing', 'CORS enabled'] },
  ];

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-info-circle me-2 text-primary"></i>
            About This Application
          </h2>
          <p className="text-muted">Learn more about the API Backend Dashboard</p>
        </Col>
      </Row>

      {/* Introduction */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-3">
                <i className="bi bi-code-square me-2 text-primary"></i>
                API Backend Dashboard
              </h4>
              <p className="lead mb-4">
                A comprehensive RESTful API backend with a modern React frontend, designed for teaching 
                and practicing API testing and automation.
              </p>
              <p className="text-muted mb-0">
                This application demonstrates enterprise-grade security practices, clean code architecture, 
                and modern web development patterns. It includes JWT authentication, role-based access control, 
                password encryption, and comprehensive input validation.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Features */}
      <Row className="mb-4">
        <Col>
          <h4 className="fw-bold mb-3">Key Features</h4>
        </Col>
      </Row>
      <Row className="mb-4">
        {features.map((feature, idx) => (
          <Col key={idx} lg={4} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="mb-3">
                  <i className={`bi bi-${feature.icon} text-primary`} style={{ fontSize: '2rem' }}></i>
                </div>
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="text-muted mb-0">{feature.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Tech Stack */}
      <Row className="mb-4">
        <Col>
          <h4 className="fw-bold mb-3">Technology Stack</h4>
        </Col>
      </Row>
      <Row className="mb-4">
        {techStack.map((stack, idx) => (
          <Col key={idx} lg={3} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h6 className="fw-bold text-primary mb-3">{stack.category}</h6>
                <ul className="list-unstyled mb-0">
                  {stack.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="mb-2">
                      <i className="bi bi-check-circle text-success me-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* API Endpoints */}
      <Row className="mb-4">
        <Col>
          <h4 className="fw-bold mb-3">
            <i className="bi bi-diagram-3 me-2 text-info"></i>
            API Endpoints
          </h4>
        </Col>
      </Row>

      {/* Auth & Profile */}
      <Row className="mb-3">
        <Col lg={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h6 className="fw-bold text-primary mb-3">
                <i className="bi bi-shield-lock me-2"></i>Authentication
              </h6>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><span className="badge bg-success me-2">POST</span>/register — Register new user</li>
                <li className="mb-2"><span className="badge bg-success me-2">POST</span>/login — User login (returns JWT)</li>
                <li className="mb-2"><span className="badge bg-info me-2">GET</span>/me — Get current user profile</li>
                <li className="mb-0"><span className="badge bg-warning text-dark me-2">PUT</span>/me — Update current user profile</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        {/* User Management */}
        <Col lg={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h6 className="fw-bold text-primary mb-3">
                <i className="bi bi-people me-2"></i>User Management
              </h6>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><span className="badge bg-info me-2">GET</span>/users — List all users (paginated)</li>
                <li className="mb-2"><span className="badge bg-success me-2">POST</span>/users — Create user <span className="text-muted small">(Admin)</span></li>
                <li className="mb-2"><span className="badge bg-info me-2">GET</span>/users/:id — Get user by ID</li>
                <li className="mb-2"><span className="badge bg-warning text-dark me-2">PUT</span>/users/:id — Update user</li>
                <li className="mb-0"><span className="badge bg-danger me-2">DELETE</span>/users/:id — Delete user <span className="text-muted small">(Admin)</span></li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Projects & Tasks */}
      <Row className="mb-3">
        <Col lg={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h6 className="fw-bold text-primary mb-3">
                <i className="bi bi-kanban me-2"></i>Projects
              </h6>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><span className="badge bg-info me-2">GET</span>/projects — List all projects</li>
                <li className="mb-2"><span className="badge bg-success me-2">POST</span>/projects — Create project</li>
                <li className="mb-2"><span className="badge bg-info me-2">GET</span>/projects/:id — Get project by ID</li>
                <li className="mb-2"><span className="badge bg-warning text-dark me-2">PUT</span>/projects/:id — Update project</li>
                <li className="mb-2"><span className="badge bg-secondary me-2">PATCH</span>/projects/:id/archive — Archive project</li>
                <li className="mb-0"><span className="badge bg-danger me-2">DELETE</span>/projects/:id — Delete project <span className="text-muted small">(Admin)</span></li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h6 className="fw-bold text-primary mb-3">
                <i className="bi bi-list-check me-2"></i>Tasks
              </h6>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><span className="badge bg-info me-2">GET</span>/tasks — List all tasks (filterable)</li>
                <li className="mb-2"><span className="badge bg-success me-2">POST</span>/tasks — Create task</li>
                <li className="mb-2"><span className="badge bg-info me-2">GET</span>/tasks/:id — Get task by ID</li>
                <li className="mb-2"><span className="badge bg-warning text-dark me-2">PUT</span>/tasks/:id — Update task</li>
                <li className="mb-2"><span className="badge bg-secondary me-2">PATCH</span>/tasks/:id/status — Update task status</li>
                <li className="mb-2"><span className="badge bg-secondary me-2">PATCH</span>/tasks/bulk-update — Bulk update tasks</li>
                <li className="mb-0"><span className="badge bg-danger me-2">DELETE</span>/tasks/:id — Delete task</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Comments, Analytics, Utilities */}
      <Row className="mb-4">
        <Col lg={4} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h6 className="fw-bold text-primary mb-3">
                <i className="bi bi-chat-left-text me-2"></i>Comments
              </h6>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><span className="badge bg-info me-2">GET</span>/tasks/:id/comments — List comments</li>
                <li className="mb-2"><span className="badge bg-success me-2">POST</span>/tasks/:id/comments — Add comment</li>
                <li className="mb-0"><span className="badge bg-danger me-2">DELETE</span>/comments/:id — Delete comment</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h6 className="fw-bold text-primary mb-3">
                <i className="bi bi-bar-chart me-2"></i>Analytics & Audit
              </h6>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><span className="badge bg-info me-2">GET</span>/analytics/summary — Dashboard stats</li>
                <li className="mb-0"><span className="badge bg-info me-2">GET</span>/audit-logs — Activity audit trail</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h6 className="fw-bold text-primary mb-3">
                <i className="bi bi-tools me-2"></i>Utilities
              </h6>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><span className="badge bg-info me-2">GET</span>/health — API health check</li>
                <li className="mb-2"><span className="badge bg-info me-2">GET</span>/error — Simulate server error</li>
                <li className="mb-0"><span className="badge bg-success me-2">POST</span>/reset — Reset database to seed data</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Version Info */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm bg-primary text-white">
            <Card.Body className="text-center py-4">
              <h5 className="fw-bold mb-2">API Backend Dashboard v1.0.0</h5>
              <p className="mb-0">
                <i className="bi bi-github me-2"></i>
                Built with React, Flask, and Bootstrap
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
