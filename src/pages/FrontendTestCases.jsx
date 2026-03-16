import { Accordion, Alert, Badge, Card, Col, Container, Row, Table } from 'react-bootstrap';

const modules = [
  {
    key: 'auth',
    title: 'Authentication (Login)',
    cases: [
      {
        id: 'FE-AUTH-001',
        objective: 'Login with valid admin credentials',
        steps: 'Open Login page -> click Admin demo button or type valid credentials -> click Sign In.',
        expected: 'Redirect to /dashboard and user menu shows admin role.',
        selectors: 'login-fill-admin-btn, login-email-input, login-password-input, login-submit-btn, top-navbar-user-menu',
      },
      {
        id: 'FE-AUTH-002',
        objective: 'Login with valid regular user credentials',
        steps: 'Use User demo button -> click Sign In.',
        expected: 'Redirect to /dashboard and user role badge is user.',
        selectors: 'login-fill-user-btn, login-submit-btn, top-navbar-user-menu',
      },
      {
        id: 'FE-AUTH-003',
        objective: 'Invalid login shows error',
        steps: 'Enter wrong password -> submit form.',
        expected: 'Danger alert appears and page stays on /login.',
        selectors: 'login-email-input, login-password-input, login-submit-btn',
      },
      {
        id: 'FE-AUTH-004',
        objective: 'Logout redirects to login',
        steps: 'Login -> open top user dropdown -> click Logout.',
        expected: 'User is logged out and redirected to /login.',
        selectors: 'top-navbar-user-menu, top-navbar-logout-item',
      },
    ],
  },
  {
    key: 'nav',
    title: 'Navigation, Sidebar, and Access',
    cases: [
      {
        id: 'FE-NAV-001',
        objective: 'Sidebar remains fixed width on every page',
        steps: 'Navigate Dashboard -> Form Elements Zoo -> Dynamic Widgets -> Broken UI.',
        expected: 'Sidebar width remains stable and does not shrink.',
        selectors: 'sidebar-nav-dashboard, sidebar-nav-form-elements-zoo, sidebar-nav-dynamic-widgets, sidebar-nav-broken-ui',
      },
      {
        id: 'FE-NAV-002',
        objective: 'Sidebar menu is scrollable when content is long',
        steps: 'Reduce viewport height and scroll inside sidebar.',
        expected: 'Menu scrolls vertically and lower items (About/Profile) remain reachable.',
        selectors: 'sidebar-nav-about, sidebar-nav-profile',
      },
      {
        id: 'FE-NAV-003',
        objective: 'Admin-only links hidden for non-admin users',
        steps: 'Login as regular user and inspect sidebar.',
        expected: 'Users and Activity Logs links are not visible.',
        selectors: 'sidebar-nav-users, sidebar-nav-activity',
      },
      {
        id: 'FE-NAV-004',
        objective: 'About page is reachable from sidebar',
        steps: 'Click About in sidebar.',
        expected: 'About content loads with platform details and default accounts.',
        selectors: 'sidebar-nav-about',
      },
    ],
  },
  {
    key: 'users',
    title: 'Users Module (Admin)',
    cases: [
      {
        id: 'FE-USR-001',
        objective: 'Open Add User modal',
        steps: 'Go to Users -> click Add New User.',
        expected: 'Modal opens with input fields and role selector.',
        selectors: 'users-add-btn, users-modal-form, users-name-input, users-email-input',
      },
      {
        id: 'FE-USR-002',
        objective: 'Create user success flow',
        steps: 'Fill all required fields -> click Create User.',
        expected: 'Success alert appears and table contains new user.',
        selectors: 'users-save-btn',
      },
      {
        id: 'FE-USR-003',
        objective: 'Edit existing user',
        steps: 'Click row edit button -> update values -> save.',
        expected: 'Updated user data is shown in table.',
        selectors: 'users-edit-btn-{id}, users-save-btn',
      },
      {
        id: 'FE-USR-004',
        objective: 'Delete user with confirmation',
        steps: 'Click row delete button -> confirm browser dialog.',
        expected: 'User disappears and success alert is shown.',
        selectors: 'users-delete-btn-{id}',
      },
    ],
  },
  {
    key: 'projects',
    title: 'Projects Module',
    cases: [
      {
        id: 'FE-PRJ-001',
        objective: 'Create project',
        steps: 'Click New Project -> fill modal -> save.',
        expected: 'Project appears in table.',
        selectors: 'projects-new-btn, projects-title-input, projects-description-input, projects-save-btn',
      },
      {
        id: 'FE-PRJ-002',
        objective: 'Filter projects by text and status',
        steps: 'Fill filter search/status -> click Filter.',
        expected: 'Table only shows matching projects.',
        selectors: 'projects-filter-search-input, projects-filter-status-select, projects-filter-submit-btn',
      },
      {
        id: 'FE-PRJ-003',
        objective: 'Archive project',
        steps: 'Click archive action for a non-archived project.',
        expected: 'Project status changes to archived.',
        selectors: 'projects-archive-btn-{id}',
      },
      {
        id: 'FE-PRJ-004',
        objective: 'Delete project',
        steps: 'Click delete action and confirm dialog.',
        expected: 'Project row removed.',
        selectors: 'projects-delete-btn-{id}',
      },
    ],
  },
  {
    key: 'tasks',
    title: 'Tasks Module + Comments + Bulk Update',
    cases: [
      {
        id: 'FE-TSK-001',
        objective: 'Create task',
        steps: 'Click New Task -> fill modal -> save task.',
        expected: 'Task appears in list with selected project/status/priority.',
        selectors: 'tasks-new-btn, tasks-title-input, tasks-project-select, tasks-save-btn',
      },
      {
        id: 'FE-TSK-002',
        objective: 'Filter tasks',
        steps: 'Apply status/priority/project/search filters -> click Go.',
        expected: 'Only matching tasks remain visible.',
        selectors: 'tasks-filter-status-select, tasks-filter-priority-select, tasks-filter-project-select, tasks-filter-submit-btn',
      },
      {
        id: 'FE-TSK-003',
        objective: 'Quick status transition to Done',
        steps: 'Click Done on task row.',
        expected: 'Task badge updates to done.',
        selectors: 'tasks-done-btn-{id}',
      },
      {
        id: 'FE-TSK-004',
        objective: 'Open comments and add comment',
        steps: 'Click comments count -> enter comment -> add comment.',
        expected: 'New comment appears in modal list.',
        selectors: 'tasks-comments-btn-{id}, tasks-comment-input, tasks-comment-add-btn',
      },
      {
        id: 'FE-TSK-005',
        objective: 'Admin bulk status update',
        steps: 'Select multiple rows -> choose status -> Apply Bulk Update.',
        expected: 'Selected tasks move to the chosen status.',
        selectors: 'tasks-select-{id}, tasks-bulk-status-select, tasks-bulk-apply-btn',
      },
      {
        id: 'FE-TSK-006',
        objective: 'Delete task',
        steps: 'Click Delete action on a row and confirm.',
        expected: 'Task is removed from table.',
        selectors: 'tasks-delete-btn-{id}',
      },
    ],
  },
  {
    key: 'labs',
    title: 'UI Test Lab Pages',
    cases: [
      {
        id: 'FE-LAB-001',
        objective: 'Form Elements Zoo submission output',
        steps: 'Fill multiple fields -> submit form.',
        expected: 'Success alert and submitted JSON block appear.',
        selectors: 'zoo-main-form, zoo-submit-btn, zoo-success-alert, zoo-submitted-values',
      },
      {
        id: 'FE-LAB-002',
        objective: 'Dynamic Widgets loading success and error paths',
        steps: 'Click success load, then error load.',
        expected: 'Spinner appears; then success or error alert appears correctly.',
        selectors: 'widget-load-success-btn, widget-load-error-btn, widget-loading-spinner, widget-load-result, widget-load-error-msg',
      },
      {
        id: 'FE-LAB-003',
        objective: 'Drag and drop reorder',
        steps: 'Drag an item to a new position.',
        expected: 'Order summary and drop history update.',
        selectors: 'dnd-list-container, dnd-item-order-summary, dnd-drop-history',
      },
      {
        id: 'FE-LAB-004',
        objective: 'Upload simulation flow',
        steps: 'Select files -> click Upload Files.',
        expected: 'Progress bar reaches 100 and success alert appears.',
        selectors: 'upload-file-input, upload-submit-btn, upload-progress-bar, upload-success-alert',
      },
      {
        id: 'FE-LAB-005',
        objective: 'Wizard validation gates',
        steps: 'Try Next with invalid fields, then correct and continue.',
        expected: 'Validation errors block progress until corrected.',
        selectors: 'wizard-next-btn, wizard-email-error, wizard-password-error, wizard-step-indicator',
      },
      {
        id: 'FE-LAB-006',
        objective: 'Broken UI challenge bug verification',
        steps: 'Run checks for each known bug card.',
        expected: 'Each defective behavior is reproducible.',
        selectors: 'bug1-sbumit-btn, bug2-save-btn, bug6-invisible-label, bug8-action-btn',
      },
    ],
  },
  {
    key: 'api-lab-ui',
    title: 'API Lab UI (Frontend behavior)',
    cases: [
      {
        id: 'FE-APIUI-001',
        objective: 'Tab navigation works for all API panels',
        steps: 'Click every tab in API Lab left menu.',
        expected: 'Correct panel renders each time without crash.',
        selectors: 'apilab-tab-echo, apilab-tab-status, apilab-tab-delay, apilab-tab-flaky, apilab-tab-versioning',
      },
      {
        id: 'FE-APIUI-002',
        objective: 'Response box shows status/time/body',
        steps: 'Send any request from API Lab.',
        expected: 'Status badge, response time, and response body are displayed.',
        selectors: 'apilab-response-status, apilab-response-time, apilab-response-body',
      },
      {
        id: 'FE-APIUI-003',
        objective: 'Upload panel enforces file select before upload',
        steps: 'Try clicking Upload with no file, then with file.',
        expected: 'Button disabled until file exists and selected file info is shown.',
        selectors: 'apilab-upload-file-input, apilab-upload-send-btn, apilab-upload-selected-file',
      },
    ],
  },
];

const FrontendTestCases = () => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-journal-text me-2 text-primary"></i>
            Frontend Test Case Documentation
          </h2>
          <p className="text-muted mb-0">
            Complete UI test-case guide with "how to execute" steps and expected results for each module.
          </p>
          <div className="mt-2 d-flex gap-2 flex-wrap">
            <Badge bg="primary">Manual QA</Badge>
            <Badge bg="secondary">Selenium / Playwright / Cypress</Badge>
            <Badge bg="secondary">Stable ID-based selectors</Badge>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Alert variant="info" id="fe-docs-how-to-use">
            <strong>How to use this page:</strong> pick a module, execute each test case steps, verify expected results, then automate using the listed selector IDs.
            Keep test data isolated and capture screenshots/video for failed cases.
          </Alert>
        </Col>
      </Row>

      <Row>
        <Col>
          <Accordion defaultActiveKey="0" alwaysOpen id="fe-docs-accordion">
            {modules.map((module, moduleIndex) => (
              <Accordion.Item eventKey={String(moduleIndex)} key={module.key}>
                <Accordion.Header>
                  <span className="fw-semibold">{module.title}</span>
                  <Badge bg="dark" className="ms-2">{module.cases.length} cases</Badge>
                </Accordion.Header>
                <Accordion.Body>
                  <Card className="border-0 shadow-sm">
                    <Card.Body className="p-0">
                      <div className="table-responsive">
                        <Table striped hover className="mb-0 align-middle" id={`fe-docs-table-${module.key}`}>
                          <thead className="table-light">
                            <tr>
                              <th style={{ minWidth: 110 }}>Case ID</th>
                              <th style={{ minWidth: 220 }}>Objective</th>
                              <th style={{ minWidth: 320 }}>How To Do It (Steps)</th>
                              <th style={{ minWidth: 260 }}>Expected Result</th>
                              <th style={{ minWidth: 320 }}>Suggested Selectors</th>
                            </tr>
                          </thead>
                          <tbody>
                            {module.cases.map((testCase) => (
                              <tr key={testCase.id} id={`fe-case-${testCase.id.toLowerCase()}`}>
                                <td><code>{testCase.id}</code></td>
                                <td>{testCase.objective}</td>
                                <td>{testCase.steps}</td>
                                <td>{testCase.expected}</td>
                                <td><small className="text-muted">{testCase.selectors}</small></td>
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

export default FrontendTestCases;
