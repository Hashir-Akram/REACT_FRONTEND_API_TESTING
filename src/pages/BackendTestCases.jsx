import { Accordion, Alert, Badge, Card, Col, Container, Row, Table } from 'react-bootstrap';

const backendModules = [
  {
    key: 'auth-rbac',
    title: 'Authentication and RBAC',
    cases: [
      {
        id: 'BE-AUTH-001',
        method: 'POST',
        endpoint: '/api/register',
        auth: 'No',
        steps: 'Send valid name/email/age/password payload.',
        expected: '201 with created user data.',
      },
      {
        id: 'BE-AUTH-002',
        method: 'POST',
        endpoint: '/api/login',
        auth: 'No',
        steps: 'Login with admin@example.com and Admin@123.',
        expected: '200 with JWT token and user object.',
      },
      {
        id: 'BE-AUTH-003',
        method: 'GET',
        endpoint: '/api/me',
        auth: 'Bearer Token',
        steps: 'Call with valid Authorization header.',
        expected: '200 current user profile returned.',
      },
      {
        id: 'BE-RBAC-001',
        method: 'GET',
        endpoint: '/api/users',
        auth: 'Admin Token',
        steps: 'Call endpoint with admin token.',
        expected: '200 users list returned.',
      },
      {
        id: 'BE-RBAC-002',
        method: 'GET',
        endpoint: '/api/users',
        auth: 'User Token',
        steps: 'Call endpoint with non-admin token.',
        expected: '403 forbidden response.',
      },
      {
        id: 'BE-RBAC-003',
        method: 'POST',
        endpoint: '/reset',
        auth: 'No Token',
        steps: 'Call reset without Authorization header.',
        expected: '401 unauthorized response.',
      },
      {
        id: 'BE-RBAC-004',
        method: 'POST',
        endpoint: '/reset',
        auth: 'Admin Token',
        steps: 'Call reset with admin token.',
        expected: '200 reset success response.',
      },
    ],
  },
  {
    key: 'users-projects',
    title: 'Users and Projects CRUD',
    cases: [
      {
        id: 'BE-USR-001',
        method: 'POST',
        endpoint: '/api/users',
        auth: 'Admin Token',
        steps: 'Create user with valid payload and role.',
        expected: '201 created user returned.',
      },
      {
        id: 'BE-USR-002',
        method: 'PUT',
        endpoint: '/api/users/{id}',
        auth: 'Admin Token',
        steps: 'Update user email/age/role fields.',
        expected: '200 updated user returned.',
      },
      {
        id: 'BE-USR-003',
        method: 'DELETE',
        endpoint: '/api/users/{id}',
        auth: 'Admin Token',
        steps: 'Delete an existing user.',
        expected: '200 success delete message.',
      },
      {
        id: 'BE-PRJ-001',
        method: 'POST',
        endpoint: '/api/projects',
        auth: 'Bearer Token',
        steps: 'Create project with title, description, status.',
        expected: '201 created project returned.',
      },
      {
        id: 'BE-PRJ-002',
        method: 'GET',
        endpoint: '/api/projects?q=term&status=active',
        auth: 'Bearer Token',
        steps: 'Call with search + status filters.',
        expected: '200 filtered projects list.',
      },
      {
        id: 'BE-PRJ-003',
        method: 'PATCH',
        endpoint: '/api/projects/{id}/archive',
        auth: 'Bearer Token',
        steps: 'Archive an active project.',
        expected: '200 project status archived.',
      },
      {
        id: 'BE-PRJ-004',
        method: 'DELETE',
        endpoint: '/api/projects/{id}',
        auth: 'Bearer Token',
        steps: 'Delete a project by id.',
        expected: '200 success delete message.',
      },
    ],
  },
  {
    key: 'tasks-comments',
    title: 'Tasks, Comments, and Analytics',
    cases: [
      {
        id: 'BE-TSK-001',
        method: 'POST',
        endpoint: '/api/tasks',
        auth: 'Bearer Token',
        steps: 'Create task with project, status, priority, assignee.',
        expected: '201 created task returned.',
      },
      {
        id: 'BE-TSK-002',
        method: 'PATCH',
        endpoint: '/api/tasks/{id}/status',
        auth: 'Bearer Token',
        steps: 'Patch task status and priority fields.',
        expected: '200 updated task status response.',
      },
      {
        id: 'BE-TSK-003',
        method: 'PATCH',
        endpoint: '/api/tasks/bulk-update',
        auth: 'Admin Token',
        steps: 'Send task_ids with status/priority payload.',
        expected: '200 bulk update success with counts.',
      },
      {
        id: 'BE-CMT-001',
        method: 'POST',
        endpoint: '/api/tasks/{id}/comments',
        auth: 'Bearer Token',
        steps: 'Create comment using content field.',
        expected: '201 comment created.',
      },
      {
        id: 'BE-CMT-002',
        method: 'DELETE',
        endpoint: '/api/comments/{id}',
        auth: 'Bearer/Admin Token',
        steps: 'Delete own comment or as admin.',
        expected: '200 deletion success.',
      },
      {
        id: 'BE-ANA-001',
        method: 'GET',
        endpoint: '/api/analytics/summary',
        auth: 'Bearer Token',
        steps: 'Call dashboard summary endpoint.',
        expected: '200 metrics payload for users/projects/tasks.',
      },
      {
        id: 'BE-ANA-002',
        method: 'GET',
        endpoint: '/api/audit-logs',
        auth: 'Admin Token',
        steps: 'Call audit endpoint with/without filters.',
        expected: '200 logs list (403 for non-admin).',
      },
    ],
  },
  {
    key: 'api-lab',
    title: 'API Lab Endpoints (Practice and Resilience)',
    cases: [
      {
        id: 'BE-LAB-001',
        method: 'GET',
        endpoint: '/api/echo?foo=bar',
        auth: 'No',
        steps: 'Send query parameters and inspect reflection.',
        expected: '200 returns method/url/query/body fields.',
      },
      {
        id: 'BE-LAB-002',
        method: 'GET',
        endpoint: '/api/status/404',
        auth: 'No',
        steps: 'Request status simulator with target status.',
        expected: 'HTTP 404 response with structured body.',
      },
      {
        id: 'BE-LAB-003',
        method: 'GET',
        endpoint: '/api/delay/3',
        auth: 'No',
        steps: 'Measure round-trip time.',
        expected: 'Response delayed about 3 seconds.',
      },
      {
        id: 'BE-LAB-004',
        method: 'GET',
        endpoint: '/api/flaky?fail_rate=0.4',
        auth: 'No',
        steps: 'Run endpoint 10 times and record status codes.',
        expected: 'Mix of 200 and 500 outcomes.',
      },
      {
        id: 'BE-LAB-005',
        method: 'GET',
        endpoint: '/api/headers',
        auth: 'No',
        steps: 'Send custom X-Test header.',
        expected: '200 response includes reflected custom header.',
      },
      {
        id: 'BE-LAB-006',
        method: 'GET',
        endpoint: '/api/paginate?page=2&per_page=5',
        auth: 'No',
        steps: 'Call endpoint with pagination params.',
        expected: '200 with pagination metadata and 5 items.',
      },
      {
        id: 'BE-LAB-007',
        method: 'POST',
        endpoint: '/api/upload',
        auth: 'No',
        steps: 'Upload multipart file with field name file.',
        expected: '200 with filename/type/size metadata.',
      },
      {
        id: 'BE-LAB-008',
        method: 'POST',
        endpoint: '/api/sanity',
        auth: 'No',
        steps: 'Send possible SQLi/XSS payload fields.',
        expected: '200 with flagged_fields and risk booleans.',
      },
      {
        id: 'BE-LAB-009',
        method: 'GET',
        endpoint: '/api/v1/users',
        auth: 'Admin Token',
        steps: 'Call v1 users endpoint.',
        expected: '200 minimal user fields.',
      },
      {
        id: 'BE-LAB-010',
        method: 'GET',
        endpoint: '/api/v2/users',
        auth: 'Admin Token',
        steps: 'Call v2 users endpoint.',
        expected: '200 full user fields + pagination + changelog.',
      },
    ],
  },
];

const quickCommands = `# 1) Login and capture token\ncurl -X POST http://127.0.0.1:5000/api/login \\\n  -H "Content-Type: application/json" \\\n  -d '{"email":"admin@example.com","password":"Admin@123"}'\n\n# 2) Use token in protected request\ncurl -X GET http://127.0.0.1:5000/api/users \\\n  -H "Authorization: Bearer <token>"\n\n# 3) Call lab endpoint\ncurl -X GET "http://127.0.0.1:5000/api/paginate?page=1&per_page=10"`;

const BackendTestCases = () => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-server me-2 text-primary"></i>
            Backend Test Case Documentation
          </h2>
          <p className="text-muted mb-0">
            Complete backend API test-case guide with step-by-step execution, expected results, and auth requirements.
          </p>
          <div className="mt-2 d-flex gap-2 flex-wrap">
            <Badge bg="primary">Manual API Testing</Badge>
            <Badge bg="secondary">Postman / curl</Badge>
            <Badge bg="secondary">pytest / requests / REST Assured</Badge>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Alert variant="info" id="be-docs-how-to-use">
            <strong>How to use this page:</strong> start with login token generation, then execute each case by module.
            Validate status code, response schema, business rules, and authorization behavior.
          </Alert>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h6 className="fw-bold mb-2">Quick Execution Commands</h6>
              <pre id="be-docs-quick-commands" className="bg-dark text-light rounded p-3 small mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                {quickCommands}
              </pre>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Accordion defaultActiveKey="0" alwaysOpen id="be-docs-accordion">
            {backendModules.map((module, moduleIndex) => (
              <Accordion.Item eventKey={String(moduleIndex)} key={module.key}>
                <Accordion.Header>
                  <span className="fw-semibold">{module.title}</span>
                  <Badge bg="dark" className="ms-2">{module.cases.length} cases</Badge>
                </Accordion.Header>
                <Accordion.Body>
                  <Card className="border-0 shadow-sm">
                    <Card.Body className="p-0">
                      <div className="table-responsive">
                        <Table striped hover className="mb-0 align-middle" id={`be-docs-table-${module.key}`}>
                          <thead className="table-light">
                            <tr>
                              <th style={{ minWidth: 110 }}>Case ID</th>
                              <th style={{ minWidth: 90 }}>Method</th>
                              <th style={{ minWidth: 240 }}>Endpoint</th>
                              <th style={{ minWidth: 140 }}>Auth</th>
                              <th style={{ minWidth: 320 }}>How To Do It (Steps)</th>
                              <th style={{ minWidth: 280 }}>Expected Result</th>
                            </tr>
                          </thead>
                          <tbody>
                            {module.cases.map((testCase) => (
                              <tr key={testCase.id} id={`be-case-${testCase.id.toLowerCase()}`}>
                                <td><code>{testCase.id}</code></td>
                                <td>
                                  <Badge bg={testCase.method === 'GET' ? 'info' : testCase.method === 'POST' ? 'success' : testCase.method === 'DELETE' ? 'danger' : 'warning'}>
                                    {testCase.method}
                                  </Badge>
                                </td>
                                <td><code>{testCase.endpoint}</code></td>
                                <td>{testCase.auth}</td>
                                <td>{testCase.steps}</td>
                                <td>{testCase.expected}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Card.Body>
                  </Card>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default BackendTestCases;
