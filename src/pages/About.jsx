import { Container, Row, Col, Card, Badge, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

  const platformDetails = [
    {
      title: 'What This Platform Is',
      icon: 'mortarboard',
      items: [
        'A target application for API and UI automation practice',
        'Learners build their own frameworks (Playwright, Cypress, Selenium, pytest, Postman, REST Assured)',
        'Includes realistic success/failure states for robust test design',
      ],
    },
    {
      title: 'UI Practice Areas',
      icon: 'window-stack',
      items: [
        'Form Elements Zoo: all key form controls and states',
        'Dynamic Widgets: loaders, toasts, countdowns, tabs, accordion',
        'Drag & Upload: drag-drop ordering + upload workflows',
        'Broken UI Challenge: intentional defects for bug discovery',
      ],
    },
    {
      title: 'API Practice Areas',
      icon: 'terminal',
      items: [
        'Auth and RBAC flows: register, login, profile, admin-only routes',
        'Behavior endpoints: echo, status, delay, flaky, headers, paginate',
        'Versioning endpoints: v1 vs v2 user payloads',
        'Sanity endpoint for SQL injection and XSS payload detection',
      ],
    },
  ];

  const defaultAccounts = [
    { role: 'Admin', email: 'admin@example.com', password: 'Admin@123' },
    { role: 'User', email: 'john@example.com', password: 'User@123' },
    { role: 'Tester', email: 'sara@example.com', password: 'Tester@123' },
  ];

  const endpointCards = [
    {
      title: 'Authentication',
      icon: 'shield-lock',
      lg: 6,
      endpoints: [
        {
          method: 'POST',
          methodClass: 'success',
          path: '/register',
          description: 'Register new user',
          payload: '{\n  "name": "John Doe",\n  "email": "john@example.com",\n  "age": 25,\n  "password": "StrongPass@123"\n}',
        },
        {
          method: 'POST',
          methodClass: 'success',
          path: '/login',
          description: 'User login (returns JWT)',
          payload: '{\n  "email": "admin@example.com",\n  "password": "Admin@123"\n}',
        },
        {
          method: 'GET',
          methodClass: 'info',
          path: '/me',
          description: 'Get current user profile',
          payload: 'No request body required.\nRequired header:\nAuthorization: Bearer <token>',
        },
        {
          method: 'PUT',
          methodClass: 'warning text-dark',
          path: '/me',
          description: 'Update current user profile',
          payload: '{\n  "name": "Updated Name",\n  "email": "updated@example.com",\n  "age": 26,\n  "password": "NewPass@123"\n}\n\nAny field is optional.',
        },
      ],
    },
    {
      title: 'User Management',
      icon: 'people',
      lg: 6,
      endpoints: [
        {
          method: 'GET',
          methodClass: 'info',
          path: '/users',
          description: 'List all users (paginated)',
          payload: 'No request body required.\nOptional query params:\npage, per_page, sort_by, sort_order, role',
        },
        {
          method: 'POST',
          methodClass: 'success',
          path: '/users',
          description: 'Create user (Admin)',
          payload: '{\n  "name": "Sara Tester",\n  "email": "sara@example.com",\n  "age": 29,\n  "password": "Sara@123",\n  "role": "user"\n}',
        },
        {
          method: 'GET',
          methodClass: 'info',
          path: '/users/:id',
          description: 'Get user by ID',
          payload: 'No request body required.\nPath param: id',
        },
        {
          method: 'PUT',
          methodClass: 'warning text-dark',
          path: '/users/:id',
          description: 'Update user',
          payload: '{\n  "name": "Updated Name",\n  "email": "updated@example.com",\n  "age": 30,\n  "role": "admin",\n  "password": "Strong@123"\n}\n\nAny field is optional.',
        },
        {
          method: 'DELETE',
          methodClass: 'danger',
          path: '/users/:id',
          description: 'Delete user (Admin)',
          payload: 'No request body required.\nPath param: id',
        },
      ],
    },
    {
      title: 'Projects',
      icon: 'kanban',
      lg: 6,
      endpoints: [
        {
          method: 'GET',
          methodClass: 'info',
          path: '/projects',
          description: 'List all projects',
          payload: 'No request body required.\nOptional query params:\npage, per_page, sort_by, sort_order, q, status, owner_id',
        },
        {
          method: 'POST',
          methodClass: 'success',
          path: '/projects',
          description: 'Create project',
          payload: '{\n  "title": "Website Redesign",\n  "description": "Revamp landing pages and improve conversion funnel.",\n  "status": "active"\n}',
        },
        {
          method: 'GET',
          methodClass: 'info',
          path: '/projects/:id',
          description: 'Get project by ID',
          payload: 'No request body required.\nPath param: id',
        },
        {
          method: 'PUT',
          methodClass: 'warning text-dark',
          path: '/projects/:id',
          description: 'Update project',
          payload: '{\n  "title": "Website Redesign v2",\n  "description": "Updated project scope",\n  "status": "on_hold"\n}\n\nAny field is optional.',
        },
        {
          method: 'PATCH',
          methodClass: 'secondary',
          path: '/projects/:id/archive',
          description: 'Archive project',
          payload: 'No request body required.\nPath param: id',
        },
        {
          method: 'DELETE',
          methodClass: 'danger',
          path: '/projects/:id',
          description: 'Delete project',
          payload: 'No request body required.\nPath param: id',
        },
      ],
    },
    {
      title: 'Tasks',
      icon: 'list-check',
      lg: 6,
      endpoints: [
        {
          method: 'GET',
          methodClass: 'info',
          path: '/tasks',
          description: 'List all tasks (filterable)',
          payload: 'No request body required.\nOptional query params:\npage, per_page, sort_by, sort_order, q, project_id, assigned_to, created_by, status, priority, overdue',
        },
        {
          method: 'POST',
          methodClass: 'success',
          path: '/tasks',
          description: 'Create task',
          payload: '{\n  "title": "Design hero section",\n  "description": "Create responsive hero section variants",\n  "project_id": 1,\n  "status": "todo",\n  "priority": "high",\n  "assigned_to": 2,\n  "estimated_hours": 6,\n  "due_date": "2026-03-20",\n  "tags": ["ui", "design"]\n}',
        },
        {
          method: 'GET',
          methodClass: 'info',
          path: '/tasks/:id',
          description: 'Get task by ID',
          payload: 'No request body required.\nPath param: id',
        },
        {
          method: 'PUT',
          methodClass: 'warning text-dark',
          path: '/tasks/:id',
          description: 'Update task',
          payload: '{\n  "title": "Updated Task Title",\n  "description": "Updated task details",\n  "status": "in_progress",\n  "priority": "critical",\n  "assigned_to": 3,\n  "estimated_hours": 8,\n  "due_date": "2026-03-25",\n  "tags": "frontend,urgent"\n}\n\nAny field is optional.',
        },
        {
          method: 'PATCH',
          methodClass: 'secondary',
          path: '/tasks/:id/status',
          description: 'Update task status/priority',
          payload: '{\n  "status": "done",\n  "priority": "medium"\n}\n\nOnly status and priority allowed.',
        },
        {
          method: 'PATCH',
          methodClass: 'secondary',
          path: '/tasks/bulk-update',
          description: 'Bulk update tasks (Admin)',
          payload: '{\n  "task_ids": [1, 2, 3],\n  "status": "in_review",\n  "priority": "high",\n  "assigned_to": 2\n}',
        },
        {
          method: 'DELETE',
          methodClass: 'danger',
          path: '/tasks/:id',
          description: 'Delete task',
          payload: 'No request body required.\nPath param: id',
        },
      ],
    },
    {
      title: 'Comments',
      icon: 'chat-left-text',
      lg: 4,
      endpoints: [
        {
          method: 'GET',
          methodClass: 'info',
          path: '/tasks/:id/comments',
          description: 'List comments',
          payload: 'No request body required.\nPath param: id (task id)',
        },
        {
          method: 'POST',
          methodClass: 'success',
          path: '/tasks/:id/comments',
          description: 'Add comment',
          payload: '{\n  "content": "Please attach final wireframes before EOD."\n}',
        },
        {
          method: 'DELETE',
          methodClass: 'danger',
          path: '/comments/:id',
          description: 'Delete comment',
          payload: 'No request body required.\nPath param: id (comment id)',
        },
      ],
    },
    {
      title: 'Analytics & Audit',
      icon: 'bar-chart',
      lg: 4,
      endpoints: [
        {
          method: 'GET',
          methodClass: 'info',
          path: '/analytics/summary',
          description: 'Dashboard stats',
          payload: 'No request body required.',
        },
        {
          method: 'GET',
          methodClass: 'info',
          path: '/audit-logs',
          description: 'Activity audit trail',
          payload: 'No request body required.\nOptional query params:\npage, per_page, sort_by, sort_order, entity_type, action, actor_id',
        },
      ],
    },
    {
      title: 'Utilities',
      icon: 'tools',
      lg: 4,
      endpoints: [
        {
          method: 'GET',
          methodClass: 'info',
          path: '/health',
          description: 'API health check',
          payload: 'No request body required.',
        },
        {
          method: 'GET',
          methodClass: 'info',
          path: '/error',
          description: 'Simulate server error',
          payload: 'No request body required.',
        },
        {
          method: 'POST',
          methodClass: 'success',
          path: '/reset',
          description: 'Reset database to seed data',
          payload: 'No request body required.',
        },
      ],
    },
  ];

  const isAuthRequired = (path) => {
    const publicPaths = ['/register', '/login', '/health', '/error', '/reset'];
    return !publicPaths.includes(path);
  };

  const renderPayloadBadge = (payload, id, path) => {
    const authRequired = isAuthRequired(path);
    const authText = authRequired
      ? 'Auth Required: Yes\nToken: Bearer token required in Authorization header\n\n'
      : 'Auth Required: No\nToken: Not required\n\n';

    return (
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id={`payload-${id}`}>
            <div className="text-start" style={{ whiteSpace: 'pre-line', maxWidth: '320px' }}>
              {authText + payload}
            </div>
          </Tooltip>
        }
      >
        <Badge bg="dark" pill style={{ cursor: 'help' }}>
          Payload
        </Badge>
      </OverlayTrigger>
    );
  };

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

      {/* Testing Documentation */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">
                <i className="bi bi-journal-text me-2 text-primary"></i>
                Testing Documentation
              </h5>
              <p className="text-muted mb-3">
                Use these two documents as your complete testing guide for the platform.
              </p>
              <div className="d-flex gap-2 flex-wrap mb-3">
                <Button
                  id="about-open-frontend-test-docs-btn"
                  as={Link}
                  to="/frontend-test-cases"
                  variant="primary"
                >
                  <i className="bi bi-window me-2"></i>
                  Open Frontend Test Cases Page
                </Button>
                <Button
                  id="about-open-backend-test-docs-btn"
                  as={Link}
                  to="/backend-test-cases"
                  variant="outline-primary"
                >
                  <i className="bi bi-server me-2"></i>
                  Open Backend Test Cases Page
                </Button>
              </div>
              <div className="small text-muted">
                Backend test cases file: <code>BACKEND_TEST_CASES_COMPLETE.md</code>
              </div>
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

      {/* Platform Coverage */}
      <Row className="mb-4">
        <Col>
          <h4 className="fw-bold mb-3">Platform Coverage</h4>
        </Col>
      </Row>
      <Row className="mb-4">
        {platformDetails.map((section) => (
          <Col key={section.title} lg={4} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h6 className="fw-bold text-primary mb-3">
                  <i className={`bi bi-${section.icon} me-2`}></i>
                  {section.title}
                </h6>
                <ul className="mb-0">
                  {section.items.map((item) => (
                    <li key={item} className="mb-2 text-muted">{item}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Default Accounts */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">
                <i className="bi bi-person-badge me-2 text-primary"></i>
                Default Accounts (Seed Data)
              </h5>
              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Email</th>
                      <th>Password</th>
                    </tr>
                  </thead>
                  <tbody>
                    {defaultAccounts.map((acc) => (
                      <tr key={acc.email}>
                        <td><Badge bg="secondary">{acc.role}</Badge></td>
                        <td><code>{acc.email}</code></td>
                        <td><code>{acc.password}</code></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
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

      <Row className="mb-4">
        {endpointCards.map((card, cardIdx) => (
          <Col key={card.title} lg={card.lg} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h6 className="fw-bold text-primary mb-3">
                  <i className={`bi bi-${card.icon} me-2`}></i>
                  {card.title}
                </h6>
                <ul className="list-unstyled mb-0">
                  {card.endpoints.map((endpoint, endpointIdx) => {
                    const key = `${cardIdx}-${endpointIdx}`;
                    return (
                      <li key={key} className={endpointIdx === card.endpoints.length - 1 ? 'mb-0' : 'mb-2'}>
                        <span className={`badge bg-${endpoint.methodClass} me-2`}>{endpoint.method}</span>
                        {endpoint.path} — {endpoint.description}
                        <span className="ms-2">{renderPayloadBadge(endpoint.payload, key, endpoint.path)}</span>
                      </li>
                    );
                  })}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
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
