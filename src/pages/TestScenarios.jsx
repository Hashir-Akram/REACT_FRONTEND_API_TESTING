import { useState } from 'react';
import { Alert, Button, Card, Col, Container, Row, Form } from 'react-bootstrap';

const TestScenarios = () => {
  const [confirmResult, setConfirmResult] = useState('Not triggered');
  const [promptResult, setPromptResult] = useState('Not triggered');
  const [iframeUrl, setIframeUrl] = useState('https://example.com');

  const handleSimpleAlert = () => {
    window.alert('Simple alert for UI automation testing');
  };

  const handleConfirm = () => {
    const result = window.confirm('Do you confirm this action for testing?');
    setConfirmResult(result ? 'Accepted' : 'Cancelled');
  };

  const handlePrompt = () => {
    const result = window.prompt('Enter sample text for prompt testing:', 'Test value');
    setPromptResult(result === null ? 'Prompt cancelled' : `Input: ${result}`);
  };

  const handleOpenNewTab = () => {
    window.open('https://example.com', '_blank', 'noopener,noreferrer');
  };

  const handleOpenPopup = () => {
    window.open(
      'https://example.com',
      'automationPopupWindow',
      'width=720,height=520,left=180,top=120,toolbar=no,menubar=no,location=yes,status=no'
    );
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-ui-checks-grid me-2 text-primary"></i>
            UI Test Scenarios
          </h2>
          <p className="text-muted mb-0">
            Special page for testing browser dialogs, new tabs, popup windows, and iframe interactions.
          </p>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <h5 className="fw-bold mb-3">Alerts & Dialogs</h5>
              <div className="d-grid gap-2">
                <Button id="btn-simple-alert" variant="warning" onClick={handleSimpleAlert}>
                  Trigger Alert
                </Button>
                <Button id="btn-confirm" variant="info" onClick={handleConfirm}>
                  Trigger Confirm
                </Button>
                <Button id="btn-prompt" variant="secondary" onClick={handlePrompt}>
                  Trigger Prompt
                </Button>
              </div>
              <hr />
              <p id="confirm-result" className="mb-2">
                <strong>Confirm result:</strong> {confirmResult}
              </p>
              <p id="prompt-result" className="mb-0">
                <strong>Prompt result:</strong> {promptResult}
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <h5 className="fw-bold mb-3">Tabs & Windows</h5>
              <div className="d-grid gap-2">
                <Button id="btn-new-tab" variant="primary" onClick={handleOpenNewTab}>
                  Open New Tab
                </Button>
                <Button id="btn-popup-window" variant="dark" onClick={handleOpenPopup}>
                  Open Popup Window
                </Button>
              </div>
              <Alert variant="light" className="mt-3 mb-0 border">
                These actions are useful for validating window handle and tab-switching logic in automation tools.
              </Alert>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <h5 className="fw-bold mb-3">Iframe Playground</h5>
              <Form.Group className="mb-3">
                <Form.Label>Iframe URL</Form.Label>
                <Form.Control
                  id="iframe-url-input"
                  type="text"
                  value={iframeUrl}
                  onChange={(e) => setIframeUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </Form.Group>
              <p className="text-muted mb-0 small">
                Update URL and interact with content inside iframe for frame-switching automation tests.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-3">Iframe Target</h5>
              <iframe
                id="test-iframe"
                title="Automation Test Iframe"
                src={iframeUrl}
                style={{ width: '100%', height: '420px', border: '1px solid #dee2e6', borderRadius: '8px' }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TestScenarios;
