import { useState, useEffect, useRef } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Form, Nav, Row, Spinner, Tab, Accordion, OverlayTrigger, Tooltip } from 'react-bootstrap';

/**
 * Dynamic Widgets Lab
 * ───────────────────
 * Covers: spinners/loading states, accordion, tabs, tooltips,
 *         toast notifications, disabled→enabled transitions, countdown timers.
 * Testing skills: explicit waits, visibility assertions, element_to_be_clickable,
 *                 presence_of_element_located vs invisibility_of.
 */
const DynamicWidgets = () => {
  // ── Loading / Spinner state ──
  const [loading, setLoading] = useState(false);
  const [loadResult, setLoadResult] = useState(null);
  const [loadError, setLoadError] = useState(false);

  const triggerLoad = (succeed = true) => {
    setLoading(true);
    setLoadResult(null);
    setLoadError(false);
    setTimeout(() => {
      setLoading(false);
      if (succeed) setLoadResult('Data loaded successfully! User count: 42');
      else setLoadError(true);
    }, 2500);
  };

  // ── Countdown timer ──
  const [countdown, setCountdown] = useState(null);
  const countdownRef = useRef(null);
  const startCountdown = (seconds) => {
    clearInterval(countdownRef.current);
    setCountdown(seconds);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(countdownRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  // ── Toast notifications ──
  const [toasts, setToasts] = useState([]);
  let toastIdRef = useRef(0);
  const addToast = (variant, message) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, variant, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  // ── Dynamic content reveal ──
  const [revealStep, setRevealStep] = useState(0);
  const revealItems = [
    { id: 'reveal-item-1', text: 'Step 1 — Element appeared after click', variant: 'info' },
    { id: 'reveal-item-2', text: 'Step 2 — Another element appeared', variant: 'warning' },
    { id: 'reveal-item-3', text: 'Step 3 — Final element appeared', variant: 'success' },
  ];

  // ── Tab active key ──
  const [activeTab, setActiveTab] = useState('tab-overview');

  // ── Accordion open key ──
  const [accordionKey, setAccordionKey] = useState(null);

  // ── Tooltip target ──

  return (
    <Container fluid>
      {/* Toast area */}
      <div
        id="toast-container"
        style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, minWidth: 300 }}
      >
        {toasts.map((t) => (
          <Alert
            key={t.id}
            id={`toast-${t.id}`}
            variant={t.variant}
            dismissible
            onClose={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
            className="shadow"
          >
            <i className={`bi bi-${t.variant === 'success' ? 'check-circle' : t.variant === 'danger' ? 'x-circle' : t.variant === 'warning' ? 'exclamation-triangle' : 'info-circle'} me-2`}></i>
            {t.message}
          </Alert>
        ))}
      </div>

      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-lightning-charge me-2 text-warning"></i>
            Dynamic Widgets Lab
          </h2>
          <p className="text-muted mb-0">
            Practise explicit waits, visibility assertions, tab switching, accordion navigation, tooltip detection, and toast handling.
          </p>
          <div className="mt-2 d-flex gap-2 flex-wrap">
            <Badge bg="warning" text="dark">Level 2 — Intermediate</Badge>
            <Badge bg="secondary">WebDriverWait</Badge>
            <Badge bg="secondary">expected_conditions</Badge>
            <Badge bg="secondary">ActionChains</Badge>
          </div>
        </Col>
      </Row>

      <Row className="g-3">

        {/* ── Spinner / Loading States ── */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-light fw-semibold">
              <i className="bi bi-arrow-repeat me-2 text-primary"></i>Loading States &amp; Spinners
            </Card.Header>
            <Card.Body>
              <p className="text-muted small">
                Click a button, wait for the spinner to disappear, then assert the result element.
                Tests: <code>invisibility_of_element</code>, <code>presence_of_element_located</code>.
              </p>

              <div className="d-flex gap-2 flex-wrap mb-3">
                <Button
                  id="widget-load-success-btn"
                  variant="primary"
                  onClick={() => triggerLoad(true)}
                  disabled={loading}
                >
                  {loading ? <><Spinner animation="border" size="sm" id="widget-loading-spinner" className="me-2" />Loading…</> : 'Load Data (Success)'}
                </Button>
                <Button
                  id="widget-load-error-btn"
                  variant="danger"
                  onClick={() => triggerLoad(false)}
                  disabled={loading}
                >
                  Load Data (Error)
                </Button>
              </div>

              {!loading && loadResult && (
                <Alert id="widget-load-result" variant="success" className="mb-0">
                  <i className="bi bi-check-circle me-2"></i>{loadResult}
                </Alert>
              )}
              {!loading && loadError && (
                <Alert id="widget-load-error-msg" variant="danger" className="mb-0">
                  <i className="bi bi-x-circle me-2"></i>Failed to load data. Server returned 500.
                </Alert>
              )}
              {loading && (
                <div id="widget-skeleton" className="mt-2">
                  {[80, 60, 90].map((w, i) => (
                    <div key={i} className="bg-secondary bg-opacity-25 rounded mb-2" style={{ height: 14, width: `${w}%`, animation: 'pulse 1.5s infinite' }} />
                  ))}
                </div>
              )}

              <hr />
              <p className="text-muted small mb-2">Disabled → Enabled transition:</p>
              <DisabledToggle />
            </Card.Body>
          </Card>
        </Col>

        {/* ── Countdown Timer ── */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-light fw-semibold">
              <i className="bi bi-stopwatch me-2 text-danger"></i>Countdown Timer
            </Card.Header>
            <Card.Body>
              <p className="text-muted small">
                Start a countdown. Assert <code>widget-countdown-display</code> reaches "0" before acting on time-gated elements.
              </p>
              <div className="text-center my-3">
                <div
                  id="widget-countdown-display"
                  style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1 }}
                  className={countdown === 0 ? 'text-success' : countdown !== null ? 'text-danger' : 'text-muted'}
                >
                  {countdown === null ? '--' : countdown}
                </div>
                <small id="widget-countdown-status" className="text-muted">
                  {countdown === null ? 'Not started' : countdown === 0 ? 'Finished!' : 'Counting down…'}
                </small>
              </div>
              <div className="d-flex justify-content-center gap-2 flex-wrap">
                {[3, 5, 10].map((s) => (
                  <Button key={s} id={`widget-countdown-${s}s-btn`} variant="outline-primary" onClick={() => startCountdown(s)}>
                    Start {s}s
                  </Button>
                ))}
              </div>
              {countdown === 0 && (
                <Alert id="widget-countdown-done-alert" variant="success" className="mt-3 mb-0 text-center">
                  <i className="bi bi-trophy me-2"></i>Time's up! Assert this element appeared.
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* ── Toast Notifications ── */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-light fw-semibold">
              <i className="bi bi-bell me-2 text-info"></i>Toast / Snackbar Notifications
            </Card.Header>
            <Card.Body>
              <p className="text-muted small">
                Toasts auto-dismiss after 4 seconds. Assert <code>id="toast-N"</code> appears and then disappears.
                Tests: <code>visibility_of_element_located</code>, <code>invisibility_of</code>.
              </p>
              <div className="d-flex gap-2 flex-wrap">
                <Button id="widget-toast-success-btn" variant="success" onClick={() => addToast('success', 'Operation completed successfully!')}>
                  Success Toast
                </Button>
                <Button id="widget-toast-danger-btn" variant="danger" onClick={() => addToast('danger', 'An error occurred. Please retry.')}>
                  Error Toast
                </Button>
                <Button id="widget-toast-warning-btn" variant="warning" onClick={() => addToast('warning', 'Warning: this action is irreversible.')}>
                  Warning Toast
                </Button>
                <Button id="widget-toast-info-btn" variant="info" onClick={() => addToast('info', 'Info: your session expires in 5 minutes.')}>
                  Info Toast
                </Button>
              </div>
              <p id="widget-toast-count" className="text-muted small mt-3 mb-0">
                Active toasts: <strong>{toasts.length}</strong>
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* ── Dynamic Reveal ── */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-light fw-semibold">
              <i className="bi bi-eye me-2 text-success"></i>Progressive Element Reveal
            </Card.Header>
            <Card.Body>
              <p className="text-muted small">
                Click "Reveal Next" to make elements appear one by one. Assert <code>is_displayed()</code> for each.
              </p>
              <div id="widget-reveal-container" className="d-flex flex-column gap-2 mb-3">
                {revealItems.map((item, idx) => (
                  idx < revealStep ? (
                    <Alert key={item.id} id={item.id} variant={item.variant} className="mb-0 py-2">
                      {item.text}
                    </Alert>
                  ) : (
                    <div key={item.id} id={`${item.id}-placeholder`} className="border rounded p-2 text-muted text-center" style={{ borderStyle: 'dashed !important', opacity: 0.4 }}>
                      Hidden — reveal step {idx + 1}
                    </div>
                  )
                ))}
              </div>
              <div className="d-flex gap-2">
                <Button
                  id="widget-reveal-next-btn"
                  variant="primary"
                  onClick={() => setRevealStep((p) => Math.min(p + 1, revealItems.length))}
                  disabled={revealStep >= revealItems.length}
                >
                  Reveal Next
                </Button>
                <Button
                  id="widget-reveal-reset-btn"
                  variant="outline-secondary"
                  onClick={() => setRevealStep(0)}
                >
                  Reset
                </Button>
              </div>
              <p id="widget-reveal-step" className="text-muted small mt-2 mb-0">
                Step: <strong>{revealStep}</strong> / {revealItems.length}
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* ── Tabs ── */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-light fw-semibold">
              <i className="bi bi-folder2-open me-2 text-warning"></i>Tab Navigation
            </Card.Header>
            <Card.Body>
              <p className="text-muted small mb-3">
                Switch tabs and assert content visibility. Tests: <code>element_to_be_clickable</code>, <code>text_to_be_present_in_element</code>.
              </p>
              <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                <Nav variant="tabs" id="widget-tab-nav" className="mb-3">
                  <Nav.Item>
                    <Nav.Link id="widget-tab-overview" eventKey="tab-overview">Overview</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link id="widget-tab-details" eventKey="tab-details">Details</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link id="widget-tab-settings" eventKey="tab-settings">Settings</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link id="widget-tab-disabled" eventKey="tab-disabled" disabled>Disabled Tab</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="tab-overview">
                    <p id="widget-tab-overview-content" className="mb-0">
                      <strong>Overview tab content.</strong> Assert this text is visible when Overview tab is active.
                    </p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab-details">
                    <p id="widget-tab-details-content" className="mb-0">
                      <strong>Details tab content.</strong> Assert this text appears after clicking the Details tab.
                    </p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab-settings">
                    <p id="widget-tab-settings-content" className="mb-0">
                      <strong>Settings tab content.</strong> Assert this text appears after clicking Settings tab.
                    </p>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
              <p id="widget-active-tab-value" className="text-muted small mt-2 mb-0">
                Active tab key: <code>{activeTab}</code>
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* ── Accordion ── */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-light fw-semibold">
              <i className="bi bi-chevron-expand me-2 text-secondary"></i>Accordion / Collapse
            </Card.Header>
            <Card.Body>
              <p className="text-muted small mb-3">
                Expand panels and assert content visibility. Tests: <code>is_displayed()</code>, <code>element_to_be_clickable</code>.
              </p>
              <Accordion activeKey={accordionKey} onSelect={setAccordionKey}>
                {[1, 2, 3].map((n) => (
                  <Accordion.Item key={n} eventKey={String(n)} id={`widget-accordion-item-${n}`}>
                    <Accordion.Header id={`widget-accordion-header-${n}`}>
                      Accordion Panel {n}
                    </Accordion.Header>
                    <Accordion.Body id={`widget-accordion-body-${n}`}>
                      This is the body of Panel {n}. Assert <code>widget-accordion-body-{n}</code> is visible after expanding.
                      {n === 2 && <div className="mt-2"><Badge bg="info">Special badge inside Panel 2 — assert its text</Badge></div>}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
              <p id="widget-accordion-open-key" className="text-muted small mt-2 mb-0">
                Open panel: <code>{accordionKey || 'none'}</code>
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* ── Tooltips ── */}
        <Col lg={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-light fw-semibold">
              <i className="bi bi-chat-square-dots me-2 text-danger"></i>Tooltips &amp; Hover Effects
            </Card.Header>
            <Card.Body>
              <p className="text-muted small mb-3">
                Hover over each button to reveal tooltip text. Tests: <code>ActionChains.move_to_element()</code>,{' '}
                <code>visibility_of_element_located</code>.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                {[
                  { id: 'widget-tooltip-info', text: 'This is an info tooltip', variant: 'info', label: 'Hover: Info' },
                  { id: 'widget-tooltip-success', text: 'Action will succeed', variant: 'success', label: 'Hover: Success' },
                  { id: 'widget-tooltip-danger', text: 'This action is destructive!', variant: 'danger', label: 'Hover: Danger' },
                  { id: 'widget-tooltip-warning', text: 'Proceed with caution', variant: 'warning', label: 'Hover: Warning' },
                ].map(({ id, text, variant, label }) => (
                  <OverlayTrigger
                    key={id}
                    placement="top"
                    overlay={<Tooltip id={`${id}-tooltip`}>{text}</Tooltip>}
                  >
                    <Button id={id} variant={variant}>{label}</Button>
                  </OverlayTrigger>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

// Sub-component: disabled → enabled button after delay
const DisabledToggle = () => {
  const [enabled, setEnabled] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const startEnable = () => {
    setWaiting(true);
    setTimeout(() => { setEnabled(true); setWaiting(false); }, 3000);
  };

  return (
    <div className="d-flex align-items-center gap-3 flex-wrap">
      <Button id="widget-enable-trigger-btn" variant="outline-primary" onClick={startEnable} disabled={waiting || enabled} size="sm">
        {waiting ? <><Spinner size="sm" className="me-1" />Enabling in 3s…</> : 'Enable Button Below'}
      </Button>
      <Button
        id="widget-conditionally-enabled-btn"
        variant="success"
        disabled={!enabled}
        onClick={() => setEnabled(false)}
        size="sm"
      >
        {enabled ? 'Now Enabled — Click Me!' : 'Currently Disabled'}
      </Button>
    </div>
  );
};

export default DynamicWidgets;
