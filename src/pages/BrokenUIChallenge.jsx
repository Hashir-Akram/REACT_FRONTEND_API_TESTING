import { useState } from 'react';
import {
  Alert, Badge, Button, Card, Col, Container, Form, Row, Table,
} from 'react-bootstrap';

/**
 * Broken UI Challenge Page
 * ────────────────────────
 * Real-world QA simulation: deliberately broken UI elements.
 * The QA learner must FIND the bugs by running their automation
 * or doing exploratory testing. Each card shows a challenge and
 * tracks whether the learner revealed the answer.
 *
 * Bug categories:
 *   1. Wrong ID on submit button           (typo: id="sbumit-btn")
 *   2. Button that does nothing             (onClick is null)
 *   3. Form that clears on submit           (no e.preventDefault)
 *   4. Login always fails wrong message     (wrong comparison)
 *   5. Table row count mismatch             (off-by-one render)
 *   6. Invisible text (white on white)      (CSS color: #fff on white bg)
 *   7. Input with wrong type                (type="button" not "text")
 *   8. Duplicate IDs                        (two elements share an id)
 */

const BUG_HINTS = {
  b1: 'Look at the id attribute on the submit button — there\'s a typo.',
  b2: 'The "Save" button has no onClick handler attached.',
  b3: 'The form is missing e.preventDefault() so it triggers a full-page refresh.',
  b4: 'The password check compares value to the wrong variable.',
  b5: 'The loop renders one fewer row than the data array length.',
  b6: 'The label text has color: #ffffff on a white background.',
  b7: 'The search field has type="button" instead of type="text".',
  b8: 'Two different elements share the same id attribute value.',
};

const BrokenUIChallenge = () => {
  const [revealed, setRevealed] = useState({});
  const [score, setScore] = useState(0);
  const [b4Username, setB4Username] = useState('');
  const [b4Password, setB4Password] = useState('');
  const [b4Result, setB4Result] = useState(null);
  const [b3Value, setB3Value] = useState('');
  const [b3Submitted, setB3Submitted] = useState(false);
  const [tableFilter, setTableFilter] = useState('');

  const reveal = (key) => {
    if (!revealed[key]) {
      setRevealed((p) => ({ ...p, [key]: true }));
      setScore((s) => s + 1);
    }
  };

  // BUG 4: intentionally wrong comparison
  const handleBugLogin = (e) => {
    e.preventDefault();
    // BUG: comparing password to username variable instead of "secret123"
    if (b4Username === 'admin' && b4Password === b4Username) {
      setB4Result('success');
    } else {
      setB4Result('fail');
    }
  };

  // Table data (BUG 5: renders data.length - 1 rows)
  const tableData = [
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' },
    { id: 3, name: 'Carol', role: 'QA' },
    { id: 4, name: 'Dave', role: 'Dev' },
    { id: 5, name: 'Eve', role: 'User' },
  ];

  const bugCount = Object.keys(BUG_HINTS).length;
  const foundCount = Object.keys(revealed).length;

  return (
    <Container fluid>
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-bug me-2 text-danger"></i>
            Broken UI Challenge
          </h2>
          <p className="text-muted mb-0">
            Each card below contains a <strong>deliberately broken</strong> UI element. Find the bug using your automation tool or manual inspection.
            Click "Reveal Hint" only after you've investigated.
          </p>
          <div className="mt-2 d-flex gap-2 flex-wrap">
            <Badge bg="danger">Level 3 — Advanced</Badge>
            <Badge bg="secondary">Bug Hunt</Badge>
            <Badge bg="secondary">Real QA Workflow</Badge>
          </div>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Card className="border-0 shadow-sm px-4 py-2 text-center">
            <div id="challenge-score" className="fw-bold fs-4 text-primary">{foundCount} / {bugCount}</div>
            <div className="text-muted small">Bugs Revealed</div>
          </Card>
        </Col>
      </Row>

      {foundCount === bugCount && (
        <Alert id="challenge-complete-alert" variant="success" className="mb-4">
          <i className="bi bi-trophy me-2"></i>
          <strong>Outstanding!</strong> You revealed all {bugCount} bugs. Now write automation assertions for each one.
        </Alert>
      )}

      <Row className="g-3">

        {/* BUG 1 — Typo in ID */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm border-start border-danger border-3">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <span className="fw-semibold"><Badge bg="danger" className="me-2">Bug #1</Badge>Wrong Element ID</span>
              <Badge bg={revealed.b1 ? 'success' : 'secondary'}>{revealed.b1 ? 'Revealed' : 'Hidden'}</Badge>
            </Card.Header>
            <Card.Body>
              <p className="text-muted small">The form below has an automation-breaking issue with one element's <code>id</code>. Try locating the submit button by ID in your test.</p>
              <Form id="bug1-form">
                <Form.Group className="mb-2">
                  <Form.Control id="bug1-input" type="text" placeholder="Enter something" />
                </Form.Group>
                {/* BUG: typo in id — "sbumit" instead of "submit" */}
                <Button id="bug1-sbumit-btn" variant="primary" type="submit">Submit</Button>
              </Form>
              <div className="mt-3 d-flex gap-2">
                <Button id="bug1-reveal-btn" variant="outline-danger" size="sm" onClick={() => reveal('b1')}>
                  Reveal Hint
                </Button>
                {revealed.b1 && (
                  <Alert id="bug1-hint" variant="warning" className="mb-0 py-1 px-3 small">
                    <strong>Hint:</strong> {BUG_HINTS.b1}
                  </Alert>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* BUG 2 — Button with no handler */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm border-start border-danger border-3">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <span className="fw-semibold"><Badge bg="danger" className="me-2">Bug #2</Badge>Silent Button</span>
              <Badge bg={revealed.b2 ? 'success' : 'secondary'}>{revealed.b2 ? 'Revealed' : 'Hidden'}</Badge>
            </Card.Header>
            <Card.Body>
              <p className="text-muted small">Click the "Save Changes" button. Your test expects a confirmation message to appear, but nothing happens.</p>
              <div className="d-flex gap-2">
                {/* BUG: onClick={null} — button does nothing */}
                <Button id="bug2-save-btn" variant="success" onClick={null}>Save Changes</Button>
                <Button id="bug2-cancel-btn" variant="outline-secondary" onClick={() => {}}>Cancel</Button>
              </div>
              <p id="bug2-confirmation-msg" className="text-success small mt-2" style={{ display: 'none' }}>
                Changes saved successfully!
              </p>
              <div className="mt-3 d-flex gap-2">
                <Button id="bug2-reveal-btn" variant="outline-danger" size="sm" onClick={() => reveal('b2')}>
                  Reveal Hint
                </Button>
                {revealed.b2 && (
                  <Alert id="bug2-hint" variant="warning" className="mb-0 py-1 px-3 small">
                    <strong>Hint:</strong> {BUG_HINTS.b2}
                  </Alert>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* BUG 3 — Form without preventDefault */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm border-start border-danger border-3">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <span className="fw-semibold"><Badge bg="danger" className="me-2">Bug #3</Badge>Form Reloads Page</span>
              <Badge bg={revealed.b3 ? 'success' : 'secondary'}>{revealed.b3 ? 'Revealed' : 'Hidden'}</Badge>
            </Card.Header>
            <Card.Body>
              <p className="text-muted small">Type in the box and submit. Your test expects to assert a success message, but the page reloads and the field clears instead.</p>
              {/* BUG: no e.preventDefault() — causes page reload in real HTML forms */}
              <form id="bug3-form" onSubmit={() => { /* intentionally no preventDefault */ setB3Submitted(true); }}>
                <Form.Group className="mb-2">
                  <Form.Control
                    id="bug3-input"
                    type="text"
                    placeholder="Type here then submit"
                    value={b3Value}
                    onChange={(e) => setB3Value(e.target.value)}
                  />
                </Form.Group>
                <Button id="bug3-submit-btn" type="submit" variant="primary">Submit</Button>
              </form>
              {b3Submitted && (
                <Alert id="bug3-success-msg" variant="success" className="mt-2 mb-0 py-1">
                  Note: In a real HTML page without React, this form would have reloaded and cleared your data.
                </Alert>
              )}
              <div className="mt-3 d-flex gap-2">
                <Button id="bug3-reveal-btn" variant="outline-danger" size="sm" onClick={() => reveal('b3')}>
                  Reveal Hint
                </Button>
                {revealed.b3 && (
                  <Alert id="bug3-hint" variant="warning" className="mb-0 py-1 px-3 small">
                    <strong>Hint:</strong> {BUG_HINTS.b3}
                  </Alert>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* BUG 4 — Wrong validation logic */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm border-start border-danger border-3">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <span className="fw-semibold"><Badge bg="danger" className="me-2">Bug #4</Badge>Login Always Fails</span>
              <Badge bg={revealed.b4 ? 'success' : 'secondary'}>{revealed.b4 ? 'Revealed' : 'Hidden'}</Badge>
            </Card.Header>
            <Card.Body>
              <p className="text-muted small">
                Log in with <code>admin</code> / <code>secret123</code>. Your test expects a success message but always gets a failure.
              </p>
              <Form id="bug4-login-form" onSubmit={handleBugLogin}>
                <Form.Group className="mb-2">
                  <Form.Control
                    id="bug4-username-input"
                    type="text"
                    placeholder="Username"
                    value={b4Username}
                    onChange={(e) => setB4Username(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    id="bug4-password-input"
                    type="password"
                    placeholder="Password"
                    value={b4Password}
                    onChange={(e) => setB4Password(e.target.value)}
                  />
                </Form.Group>
                <Button id="bug4-login-btn" type="submit" variant="primary">Login</Button>
              </Form>
              {b4Result === 'success' && <Alert id="bug4-success-msg" variant="success" className="mt-2 mb-0">Login successful!</Alert>}
              {b4Result === 'fail' && <Alert id="bug4-error-msg" variant="danger" className="mt-2 mb-0">Invalid credentials.</Alert>}
              <div className="mt-3 d-flex gap-2">
                <Button id="bug4-reveal-btn" variant="outline-danger" size="sm" onClick={() => reveal('b4')}>
                  Reveal Hint
                </Button>
                {revealed.b4 && (
                  <Alert id="bug4-hint" variant="warning" className="mb-0 py-1 px-3 small">
                    <strong>Hint:</strong> {BUG_HINTS.b4}
                  </Alert>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* BUG 5 — Off-by-one table */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm border-start border-danger border-3">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <span className="fw-semibold"><Badge bg="danger" className="me-2">Bug #5</Badge>Table Row Count Mismatch</span>
              <Badge bg={revealed.b5 ? 'success' : 'secondary'}>{revealed.b5 ? 'Revealed' : 'Hidden'}</Badge>
            </Card.Header>
            <Card.Body>
              <p className="text-muted small">
                The API returns 5 users. Your test asserts <code>find_elements</code> returns 5 rows, but the count is wrong.
              </p>
              <p id="bug5-expected-count" className="text-muted small">API says: <strong>5 users</strong></p>
              <Table id="bug5-table" bordered size="sm">
                <thead><tr><th>ID</th><th>Name</th><th>Role</th></tr></thead>
                <tbody>
                  {/* BUG: renders tableData.length - 1 rows (missing last entry) */}
                  {tableData.slice(0, tableData.length - 1).map((row) => (
                    <tr key={row.id} id={`bug5-row-${row.id}`}>
                      <td>{row.id}</td>
                      <td id={`bug5-row-${row.id}-name`}>{row.name}</td>
                      <td>{row.role}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <p id="bug5-rendered-count" className="text-muted small">
                Rendered rows: <strong>{tableData.length - 1}</strong>
              </p>
              <div className="mt-1 d-flex gap-2">
                <Button id="bug5-reveal-btn" variant="outline-danger" size="sm" onClick={() => reveal('b5')}>
                  Reveal Hint
                </Button>
                {revealed.b5 && (
                  <Alert id="bug5-hint" variant="warning" className="mb-0 py-1 px-3 small">
                    <strong>Hint:</strong> {BUG_HINTS.b5}
                  </Alert>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* BUG 6 — Invisible text */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm border-start border-danger border-3">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <span className="fw-semibold"><Badge bg="danger" className="me-2">Bug #6</Badge>Invisible Text</span>
              <Badge bg={revealed.b6 ? 'success' : 'secondary'}>{revealed.b6 ? 'Revealed' : 'Hidden'}</Badge>
            </Card.Header>
            <Card.Body>
              <p className="text-muted small">
                There is a status label below. Your test checks its text content, but <code>get_text()</code> returns an empty string.
              </p>
              <div className="border rounded p-3 bg-white">
                {/* BUG: text color is white (#fff) on white background — invisible to users */}
                <p id="bug6-invisible-label" style={{ color: '#ffffff', background: 'white' }} className="mb-0 fw-bold">
                  Status: ACTIVE — User has admin privileges
                </p>
              </div>
              <small className="text-muted d-block mt-1">
                (Inspect element <code>#bug6-invisible-label</code> to spot the CSS bug)
              </small>
              <div className="mt-3 d-flex gap-2">
                <Button id="bug6-reveal-btn" variant="outline-danger" size="sm" onClick={() => reveal('b6')}>
                  Reveal Hint
                </Button>
                {revealed.b6 && (
                  <Alert id="bug6-hint" variant="warning" className="mb-0 py-1 px-3 small">
                    <strong>Hint:</strong> {BUG_HINTS.b6}
                  </Alert>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* BUG 7 — Wrong input type */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm border-start border-danger border-3">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <span className="fw-semibold"><Badge bg="danger" className="me-2">Bug #7</Badge>Wrong Input Type</span>
              <Badge bg={revealed.b7 ? 'success' : 'secondary'}>{revealed.b7 ? 'Revealed' : 'Hidden'}</Badge>
            </Card.Header>
            <Card.Body>
              <p className="text-muted small">
                The search field below refuses <code>send_keys()</code> input in automation. Inspect the element to understand why.
              </p>
              <Form.Group className="mb-2">
                <Form.Label htmlFor="bug7-search-input">Search Users</Form.Label>
                {/* BUG: type="button" makes it uneditable */}
                <input
                  id="bug7-search-input"
                  type="button"
                  className="form-control"
                  placeholder="Type to search…"
                  value={tableFilter}
                  onChange={(e) => setTableFilter(e.target.value)}
                  readOnly
                />
              </Form.Group>
              <Button id="bug7-search-btn" variant="primary" size="sm">Search</Button>
              <div className="mt-3 d-flex gap-2">
                <Button id="bug7-reveal-btn" variant="outline-danger" size="sm" onClick={() => reveal('b7')}>
                  Reveal Hint
                </Button>
                {revealed.b7 && (
                  <Alert id="bug7-hint" variant="warning" className="mb-0 py-1 px-3 small">
                    <strong>Hint:</strong> {BUG_HINTS.b7}
                  </Alert>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* BUG 8 — Duplicate IDs */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm border-start border-danger border-3">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <span className="fw-semibold"><Badge bg="danger" className="me-2">Bug #8</Badge>Duplicate Element IDs</span>
              <Badge bg={revealed.b8 ? 'success' : 'secondary'}>{revealed.b8 ? 'Revealed' : 'Hidden'}</Badge>
            </Card.Header>
            <Card.Body>
              <p className="text-muted small">
                There are two action buttons below. Your test finds one by ID and clicks it, but the wrong action fires. Inspect both IDs.
              </p>
              <div className="d-flex gap-3">
                {/* BUG: both buttons share the same id */}
                <div className="text-center">
                  <Button id="bug8-action-btn" variant="success" onClick={() => alert('Edit clicked')}>Edit User</Button>
                  <div className="text-muted small mt-1">id="bug8-action-btn"</div>
                </div>
                <div className="text-center">
                  {/* BUG: duplicate id — same value as the Edit button */}
                  <Button id="bug8-action-btn" variant="danger" onClick={() => alert('Delete clicked')}>Delete User</Button>
                  <div className="text-muted small mt-1">id="bug8-action-btn" ← duplicate!</div>
                </div>
              </div>
              <div className="mt-3 d-flex gap-2">
                <Button id="bug8-reveal-btn" variant="outline-danger" size="sm" onClick={() => reveal('b8')}>
                  Reveal Hint
                </Button>
                {revealed.b8 && (
                  <Alert id="bug8-hint" variant="warning" className="mb-0 py-1 px-3 small">
                    <strong>Hint:</strong> {BUG_HINTS.b8}
                  </Alert>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default BrokenUIChallenge;
