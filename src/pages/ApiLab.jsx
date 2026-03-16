import { useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Form, Row, Spinner, Tab, Nav } from 'react-bootstrap';

/**
 * API Lab
 * ───────
 * Interactive playground for the backend lab endpoints.
 * Learners fire real requests from the browser and see raw responses —
 * exactly what their test assertions should verify.
 *
 * Endpoints covered:
 *   GET  /api/echo
 *   GET  /api/status/<code>
 *   GET  /api/delay/<n>
 *   GET  /api/flaky?fail_rate=<n>
 *   GET  /api/headers
 *   GET  /api/paginate?page=<n>&per_page=<n>
 *   POST /api/upload
 *   POST /api/sanity
 *   GET  /api/v1/users   (JWT required)
 *   GET  /api/v2/users   (JWT required)
 */
const BASE = 'http://127.0.0.1:5000';

const ApiLab = () => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-terminal me-2 text-primary"></i>
            API Lab
          </h2>
          <p className="text-muted mb-0">
            Fire real requests to the practice endpoints and inspect responses — exactly what your test assertions should verify.
          </p>
          <div className="mt-2 d-flex gap-2 flex-wrap">
            <Badge bg="primary">Level 1–4</Badge>
            <Badge bg="secondary">requests / axios</Badge>
            <Badge bg="secondary">Postman</Badge>
            <Badge bg="secondary">pytest / Jest</Badge>
          </div>
        </Col>
      </Row>

      <Tab.Container defaultActiveKey="echo">
        <Row>
          <Col lg={2} className="mb-3">
            <Nav variant="pills" className="flex-column">
              {[
                { key: 'echo', label: 'Echo', icon: 'arrow-repeat' },
                { key: 'status', label: 'Status Codes', icon: 'hash' },
                { key: 'delay', label: 'Delay', icon: 'stopwatch' },
                { key: 'flaky', label: 'Flaky', icon: 'dice-3' },
                { key: 'headers', label: 'Headers', icon: 'list-ul' },
                { key: 'paginate', label: 'Paginate', icon: 'files' },
                { key: 'upload', label: 'Upload', icon: 'cloud-upload' },
                { key: 'sanity', label: 'Security', icon: 'shield-exclamation' },
                { key: 'versioning', label: 'Versioning', icon: 'diagram-2' },
              ].map(({ key, label, icon }) => (
                <Nav.Item key={key}>
                  <Nav.Link id={`apilab-tab-${key}`} eventKey={key} className="py-2">
                    <i className={`bi bi-${icon} me-2`}></i>{label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col lg={10}>
            <Tab.Content>
              <Tab.Pane eventKey="echo"><EchoPanel /></Tab.Pane>
              <Tab.Pane eventKey="status"><StatusPanel /></Tab.Pane>
              <Tab.Pane eventKey="delay"><DelayPanel /></Tab.Pane>
              <Tab.Pane eventKey="flaky"><FlakyPanel /></Tab.Pane>
              <Tab.Pane eventKey="headers"><HeadersPanel /></Tab.Pane>
              <Tab.Pane eventKey="paginate"><PaginatePanel /></Tab.Pane>
              <Tab.Pane eventKey="upload"><UploadPanel /></Tab.Pane>
              <Tab.Pane eventKey="sanity"><SanityPanel /></Tab.Pane>
              <Tab.Pane eventKey="versioning"><VersioningPanel /></Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

// ── Shared ──
const ResponseBox = ({ response, loading }) => (
  <div className="mt-3">
    {loading && <div className="text-center py-3"><Spinner id="apilab-spinner" animation="border" className="me-2" /><span>Waiting for response…</span></div>}
    {response && !loading && (
      <div>
        <div className="d-flex gap-2 mb-2 align-items-center">
          <Badge id="apilab-response-status" bg={response.ok ? 'success' : 'danger'} className="fs-6">
            HTTP {response.status}
          </Badge>
          <small id="apilab-response-time" className="text-muted">{response.time}ms</small>
        </div>
        <pre id="apilab-response-body" className="bg-dark text-light p-3 rounded small" style={{ maxHeight: 350, overflow: 'auto', whiteSpace: 'pre-wrap' }}>
          {response.body}
        </pre>
      </div>
    )}
  </div>
);

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const send = async (url, options = {}) => {
    setLoading(true);
    setResponse(null);
    const t0 = Date.now();
    try {
      const r = await fetch(url, options);
      const text = await r.text();
      let body;
      try { body = JSON.stringify(JSON.parse(text), null, 2); } catch { body = text; }
      setResponse({ status: r.status, ok: r.ok, body, time: Date.now() - t0 });
    } catch (e) {
      setResponse({ status: 0, ok: false, body: `Network error: ${e.message}`, time: Date.now() - t0 });
    } finally {
      setLoading(false);
    }
  };

  return { loading, response, send };
};

// ── Panels ──
const EchoPanel = () => {
  const { loading, response, send } = useFetch();
  const [method, setMethod] = useState('GET');
  const [qs, setQs] = useState('foo=bar&test=1');
  const [body, setBody] = useState('{\n  "hello": "world"\n}');

  const fire = () => {
    const url = `${BASE}/api/echo${qs ? '?' + qs : ''}`;
    const opts = ['POST', 'PUT', 'PATCH'].includes(method) ? {
      method, headers: { 'Content-Type': 'application/json' }, body
    } : { method };
    send(url, opts);
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-light fw-semibold">
        <i className="bi bi-arrow-repeat me-2"></i>Echo Endpoint — <code>GET|POST|PUT /api/echo</code>
      </Card.Header>
      <Card.Body>
        <p className="text-muted small">Returns everything you send back: method, query params, headers, body. Assert any field.</p>
        <Row className="g-2 mb-2">
          <Col xs={3}>
            <Form.Select id="apilab-echo-method" value={method} onChange={(e) => setMethod(e.target.value)}>
              {['GET','POST','PUT','PATCH','DELETE'].map(m => <option key={m}>{m}</option>)}
            </Form.Select>
          </Col>
          <Col>
            <Form.Control id="apilab-echo-qs" value={qs} onChange={(e) => setQs(e.target.value)} placeholder="Query string params" />
          </Col>
        </Row>
        {['POST','PUT','PATCH'].includes(method) && (
          <Form.Control id="apilab-echo-body" as="textarea" rows={4} value={body} onChange={(e) => setBody(e.target.value)} className="font-monospace mb-2" />
        )}
        <Button id="apilab-echo-send-btn" variant="primary" onClick={fire}>Send Request</Button>
        <ResponseBox response={response} loading={loading} />
      </Card.Body>
    </Card>
  );
};

const StatusPanel = () => {
  const { loading, response, send } = useFetch();
  const codes = [200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500, 503];
  const [custom, setCustom] = useState('');

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-light fw-semibold">
        <i className="bi bi-hash me-2"></i>Status Code Simulator — <code>GET /api/status/&lt;code&gt;</code>
      </Card.Header>
      <Card.Body>
        <p className="text-muted small">Practise asserting any HTTP status code. Each button hits a real endpoint that returns that exact code.</p>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {codes.map((c) => (
            <Button
              key={c}
              id={`apilab-status-${c}-btn`}
              size="sm"
              variant={c < 300 ? 'success' : c < 400 ? 'info' : c < 500 ? 'warning' : 'danger'}
              onClick={() => send(`${BASE}/api/status/${c}`)}
            >
              {c}
            </Button>
          ))}
        </div>
        <div className="d-flex gap-2">
          <Form.Control id="apilab-status-custom-input" type="number" placeholder="Custom code" value={custom} onChange={(e) => setCustom(e.target.value)} style={{ maxWidth: 140 }} />
          <Button id="apilab-status-custom-btn" variant="outline-primary" onClick={() => send(`${BASE}/api/status/${custom}`)}>Send Custom</Button>
        </div>
        <ResponseBox response={response} loading={loading} />
      </Card.Body>
    </Card>
  );
};

const DelayPanel = () => {
  const { loading, response, send } = useFetch();
  const [seconds, setSeconds] = useState(2);
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-light fw-semibold">
        <i className="bi bi-stopwatch me-2"></i>Delay Response — <code>GET /api/delay/&lt;seconds&gt;</code>
      </Card.Header>
      <Card.Body>
        <p className="text-muted small">Responds after N seconds. Practise <code>timeout=</code> in requests and <code>WebDriverWait</code> in Selenium.</p>
        <div className="d-flex gap-2 mb-2 flex-wrap">
          {[1, 2, 3, 5].map((s) => (
            <Button key={s} id={`apilab-delay-${s}s-btn`} variant="outline-primary" onClick={() => send(`${BASE}/api/delay/${s}`)}>
              Delay {s}s
            </Button>
          ))}
        </div>
        <div className="d-flex gap-2">
          <Form.Control id="apilab-delay-custom-input" type="number" min={1} max={10} value={seconds} onChange={(e) => setSeconds(e.target.value)} style={{ maxWidth: 100 }} />
          <Button id="apilab-delay-custom-btn" variant="primary" onClick={() => send(`${BASE}/api/delay/${seconds}`)}>Send Custom</Button>
        </div>
        <ResponseBox response={response} loading={loading} />
      </Card.Body>
    </Card>
  );
};

const FlakyPanel = () => {
  const { loading, response, send } = useFetch();
  const [failRate, setFailRate] = useState(0.5);
  const [results, setResults] = useState([]);

  const fire = async () => {
    const t0 = Date.now();
    const r = await fetch(`${BASE}/api/flaky?fail_rate=${failRate}`);
    const text = await r.text();
    setResults((prev) => [{ status: r.status, ok: r.ok, time: Date.now() - t0, id: Date.now() }, ...prev.slice(0, 9)]);
    send(`${BASE}/api/flaky?fail_rate=${failRate}`);
  };

  const successCount = results.filter(r => r.ok).length;
  const failCount = results.filter(r => !r.ok).length;

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-light fw-semibold">
        <i className="bi bi-dice-3 me-2"></i>Flaky Endpoint — <code>GET /api/flaky</code>
      </Card.Header>
      <Card.Body>
        <p className="text-muted small">Randomly returns 200 or 500. Practise retry logic and flaky test detection.</p>
        <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
          <Form.Label className="mb-0" htmlFor="apilab-flaky-rate">Fail rate: <strong>{Math.round(failRate * 100)}%</strong></Form.Label>
          <Form.Range id="apilab-flaky-rate" min={0} max={1} step={0.1} value={failRate} onChange={(e) => setFailRate(e.target.value)} style={{ maxWidth: 200 }} />
          <Button id="apilab-flaky-send-btn" variant="primary" onClick={fire}>Send</Button>
          <Button id="apilab-flaky-send-5-btn" variant="outline-secondary" onClick={() => { for (let i = 0; i < 5; i++) setTimeout(() => fire(), i * 300); }}>Send ×5</Button>
        </div>
        {results.length > 0 && (
          <div>
            <div id="apilab-flaky-summary" className="mb-2">
              <Badge bg="success" className="me-2">Pass: {successCount}</Badge>
              <Badge bg="danger">Fail: {failCount}</Badge>
            </div>
            <div id="apilab-flaky-history" className="d-flex flex-wrap gap-1">
              {results.map((r) => (
                <Badge key={r.id} bg={r.ok ? 'success' : 'danger'}>{r.status}</Badge>
              ))}
            </div>
          </div>
        )}
        <ResponseBox response={response} loading={loading} />
      </Card.Body>
    </Card>
  );
};

const HeadersPanel = () => {
  const { loading, response, send } = useFetch();
  const [customHeader, setCustomHeader] = useState('X-QA-Engineer: my-test-suite');
  const fire = () => {
    const [k, v] = customHeader.split(':').map(s => s.trim());
    send(`${BASE}/api/headers`, { headers: k && v ? { [k]: v } : {} });
  };
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-light fw-semibold">
        <i className="bi bi-list-ul me-2"></i>Headers Inspector — <code>GET /api/headers</code>
      </Card.Header>
      <Card.Body>
        <p className="text-muted small">Returns all headers the client sent. Practise custom header injection and Authorization header assertions.</p>
        <div className="d-flex gap-2 mb-2">
          <Form.Control id="apilab-headers-custom-input" value={customHeader} onChange={(e) => setCustomHeader(e.target.value)} placeholder="Key: Value" />
          <Button id="apilab-headers-send-btn" variant="primary" onClick={fire}>Send</Button>
        </div>
        <ResponseBox response={response} loading={loading} />
      </Card.Body>
    </Card>
  );
};

const PaginatePanel = () => {
  const { loading, response, send } = useFetch();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-light fw-semibold">
        <i className="bi bi-files me-2"></i>Pagination Practice — <code>GET /api/paginate</code>
      </Card.Header>
      <Card.Body>
        <p className="text-muted small">100-item dataset. Practise page/per_page params, assert total_pages, has_next, has_prev, and item IDs.</p>
        <div className="d-flex gap-2 mb-2 flex-wrap align-items-center">
          <Form.Label className="mb-0" htmlFor="apilab-paginate-page">Page:</Form.Label>
          <Form.Control id="apilab-paginate-page" type="number" min={1} value={page} onChange={(e) => setPage(e.target.value)} style={{ maxWidth: 80 }} />
          <Form.Label className="mb-0" htmlFor="apilab-paginate-perpage">Per page:</Form.Label>
          <Form.Control id="apilab-paginate-perpage" type="number" min={1} max={50} value={perPage} onChange={(e) => setPerPage(e.target.value)} style={{ maxWidth: 80 }} />
          <Button id="apilab-paginate-send-btn" variant="primary" onClick={() => send(`${BASE}/api/paginate?page=${page}&per_page=${perPage}`)}>Send</Button>
          <Button id="apilab-paginate-first-btn" variant="outline-secondary" size="sm" onClick={() => { setPage(1); send(`${BASE}/api/paginate?page=1&per_page=${perPage}`); }}>First</Button>
          <Button id="apilab-paginate-last-btn" variant="outline-secondary" size="sm" onClick={() => { const p = Math.ceil(100/perPage); setPage(p); send(`${BASE}/api/paginate?page=${p}&per_page=${perPage}`); }}>Last</Button>
        </div>
        <ResponseBox response={response} loading={loading} />
      </Card.Body>
    </Card>
  );
};

const UploadPanel = () => {
  const { loading, response, send } = useFetch();
  const [file, setFile] = useState(null);
  const fire = () => {
    if (!file) return alert('Select a file first');
    const fd = new FormData();
    fd.append('file', file);
    fd.append('source', 'api-lab-ui');
    fetch(`${BASE}/api/upload`, { method: 'POST', body: fd })
      .then(async (r) => {
        const text = await r.text();
        let body;
        try { body = JSON.stringify(JSON.parse(text), null, 2); } catch { body = text; }
        // Manually update via send workaround — just show alert
        alert(`HTTP ${r.status}\n\n${body}`);
      });
  };
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-light fw-semibold">
        <i className="bi bi-cloud-upload me-2"></i>File Upload Practice — <code>POST /api/upload</code>
      </Card.Header>
      <Card.Body>
        <p className="text-muted small">Multipart upload. Returns filename, size, type. Practise <code>send_keys()</code> with absolute file path in Selenium.</p>
        <div className="d-flex gap-2 mb-2 align-items-center flex-wrap">
          <Form.Control id="apilab-upload-file-input" type="file" accept=".jpg,.png,.pdf,.txt,.csv,.json" onChange={(e) => setFile(e.target.files[0])} style={{ maxWidth: 300 }} />
          <Button id="apilab-upload-send-btn" variant="primary" onClick={fire} disabled={!file || loading}>Upload</Button>
        </div>
        {file && <p id="apilab-upload-selected-file" className="text-muted small">Selected: {file.name} ({(file.size/1024).toFixed(1)} KB)</p>}
      </Card.Body>
    </Card>
  );
};

const SanityPanel = () => {
  const { loading, response, send } = useFetch();
  const [payload, setPayload] = useState('{\n  "username": "\' OR \'1\'=\'1",\n  "query": "SELECT * FROM users",\n  "safe": "John Doe"\n}');
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-light fw-semibold">
        <i className="bi bi-shield-exclamation me-2"></i>Security Sanity — <code>POST /api/sanity</code>
      </Card.Header>
      <Card.Body>
        <p className="text-muted small">Sends any JSON body, returns flagged SQL injection and XSS risks per field. Practise security testing fundamentals.</p>
        <Form.Control id="apilab-sanity-body-input" as="textarea" rows={6} className="font-monospace mb-2" value={payload} onChange={(e) => setPayload(e.target.value)} />
        <Button id="apilab-sanity-send-btn" variant="danger" onClick={() => {
          try {
            send(`${BASE}/api/sanity`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload });
          } catch { alert('Invalid JSON'); }
        }}>
          Scan Payload
        </Button>
        <ResponseBox response={response} loading={loading} />
      </Card.Body>
    </Card>
  );
};

const VersioningPanel = () => {
  const { loading, response, send } = useFetch();
  const [token, setToken] = useState('');
  const fire = (version) => {
    if (!token) return alert('Paste your JWT token first (log in and copy from Login page)');
    send(`${BASE}/api/${version}/users`, { headers: { Authorization: `Bearer ${token}` } });
  };
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-light fw-semibold">
        <i className="bi bi-diagram-2 me-2"></i>API Versioning — <code>GET /api/v1/users</code> vs <code>/api/v2/users</code>
      </Card.Header>
      <Card.Body>
        <p className="text-muted small">
          v1 returns minimal fields (id, name, email, role). v2 returns full fields + pagination.
          Practise backward-compatibility assertions.
        </p>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="apilab-versioning-token-input">Your JWT Token (from Login)</Form.Label>
          <Form.Control id="apilab-versioning-token-input" type="text" placeholder="Paste JWT token here" value={token} onChange={(e) => setToken(e.target.value)} />
        </Form.Group>
        <div className="d-flex gap-2">
          <Button id="apilab-versioning-v1-btn" variant="outline-primary" onClick={() => fire('v1')}>Call v1</Button>
          <Button id="apilab-versioning-v2-btn" variant="primary" onClick={() => fire('v2')}>Call v2</Button>
        </div>
        <ResponseBox response={response} loading={loading} />
      </Card.Body>
    </Card>
  );
};

export default ApiLab;
