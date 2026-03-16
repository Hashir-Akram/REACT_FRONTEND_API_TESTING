import { useState } from 'react';
import {
  Alert, Badge, Button, Card, Col, Container, Form, ProgressBar, Row,
} from 'react-bootstrap';

/**
 * Form Elements Zoo
 * ─────────────────
 * Every HTML input type in one place so learners can practise:
 *   • send_keys / type  (text, email, password, number, tel, url, search, textarea)
 *   • select_by_value / select_by_visible_text  (select, multi-select)
 *   • click  (radio, checkbox, range, color, file, date/time pickers)
 *   • assertion on displayed value, disabled state, readonly state
 */
const FormElementsZoo = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    textInput: '',
    emailInput: '',
    passwordInput: '',
    numberInput: '',
    telInput: '',
    urlInput: '',
    searchInput: '',
    dateInput: '',
    timeInput: '',
    datetimeInput: '',
    monthInput: '',
    weekInput: '',
    colorInput: '#4e73df',
    rangeInput: 50,
    textareaInput: '',
    selectSingle: '',
    selectMulti: [],
    radioValue: '',
    checkboxA: false,
    checkboxB: false,
    checkboxC: false,
    fileInput: null,
  });

  const handleChange = (e) => {
    const { id, value, type, checked, files, options } = e.target;
    if (type === 'checkbox') {
      setFormValues((prev) => ({ ...prev, [id]: checked }));
    } else if (type === 'file') {
      setFormValues((prev) => ({ ...prev, fileInput: files[0]?.name || '' }));
    } else if (type === 'select-multiple') {
      const selected = Array.from(options).filter((o) => o.selected).map((o) => o.value);
      setFormValues((prev) => ({ ...prev, [id]: selected }));
    } else {
      setFormValues((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleRadio = (val) => setFormValues((prev) => ({ ...prev, radioValue: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormValues({
      textInput: '', emailInput: '', passwordInput: '', numberInput: '',
      telInput: '', urlInput: '', searchInput: '', dateInput: '',
      timeInput: '', datetimeInput: '', monthInput: '', weekInput: '',
      colorInput: '#4e73df', rangeInput: 50, textareaInput: '',
      selectSingle: '', selectMulti: [], radioValue: '',
      checkboxA: false, checkboxB: false, checkboxC: false, fileInput: null,
    });
  };

  return (
    <Container fluid>
      {/* ── Header ── */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-ui-checks me-2 text-success"></i>
            Form Elements Zoo
          </h2>
          <p className="text-muted mb-0">
            Every HTML input type in one place. Practise <code>send_keys</code>, <code>click</code>,{' '}
            <code>select_by_value</code>, file uploads, and state assertions.
          </p>
          <div className="mt-2 d-flex gap-2 flex-wrap">
            <Badge bg="success">Level 1 — Beginner</Badge>
            <Badge bg="secondary">Selenium</Badge>
            <Badge bg="secondary">Playwright</Badge>
            <Badge bg="secondary">Cypress</Badge>
          </div>
        </Col>
      </Row>

      {submitted && (
        <Alert id="zoo-success-alert" variant="success" onClose={() => setSubmitted(false)} dismissible>
          <i className="bi bi-check-circle me-2"></i>
          <strong>Form submitted!</strong> You can now assert these values in your test.
          <pre id="zoo-submitted-values" className="mt-2 mb-0 small">
            {JSON.stringify(formValues, null, 2)}
          </pre>
        </Alert>
      )}

      <Form id="zoo-main-form" onSubmit={handleSubmit} onReset={handleReset}>
        <Row className="g-3">

          {/* ── Text Inputs ── */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-light fw-semibold">
                <i className="bi bi-fonts me-2 text-primary"></i>Text Inputs
              </Card.Header>
              <Card.Body className="d-flex flex-column gap-3">

                <Form.Group>
                  <Form.Label htmlFor="zoo-text-input">Text</Form.Label>
                  <Form.Control
                    id="zoo-text-input"
                    type="text"
                    placeholder="Enter any text"
                    value={formValues.textInput}
                    onChange={handleChange}
                    data-testid="zoo-text-input"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-email-input">Email</Form.Label>
                  <Form.Control
                    id="zoo-email-input"
                    type="email"
                    placeholder="user@example.com"
                    value={formValues.emailInput}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-password-input">Password</Form.Label>
                  <Form.Control
                    id="zoo-password-input"
                    type="password"
                    placeholder="Enter password"
                    value={formValues.passwordInput}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-number-input">Number</Form.Label>
                  <Form.Control
                    id="zoo-number-input"
                    type="number"
                    min={0}
                    max={999}
                    placeholder="0 – 999"
                    value={formValues.numberInput}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-tel-input">Telephone</Form.Label>
                  <Form.Control
                    id="zoo-tel-input"
                    type="tel"
                    placeholder="+1 555 000 0000"
                    value={formValues.telInput}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-url-input">URL</Form.Label>
                  <Form.Control
                    id="zoo-url-input"
                    type="url"
                    placeholder="https://example.com"
                    value={formValues.urlInput}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-search-input">Search</Form.Label>
                  <Form.Control
                    id="zoo-search-input"
                    type="search"
                    placeholder="Search term…"
                    value={formValues.searchInput}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-textarea-input">Textarea</Form.Label>
                  <Form.Control
                    id="zoo-textarea-input"
                    as="textarea"
                    rows={3}
                    placeholder="Multi-line text…"
                    value={formValues.textareaInput}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* ── Date / Time Inputs ── */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-light fw-semibold">
                <i className="bi bi-calendar3 me-2 text-info"></i>Date & Time Inputs
              </Card.Header>
              <Card.Body className="d-flex flex-column gap-3">

                <Form.Group>
                  <Form.Label htmlFor="zoo-date-input">Date</Form.Label>
                  <Form.Control
                    id="zoo-date-input"
                    type="date"
                    value={formValues.dateInput}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-time-input">Time</Form.Label>
                  <Form.Control
                    id="zoo-time-input"
                    type="time"
                    value={formValues.timeInput}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-datetime-input">Date &amp; Time (local)</Form.Label>
                  <Form.Control
                    id="zoo-datetime-input"
                    type="datetime-local"
                    value={formValues.datetimeInput}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-month-input">Month</Form.Label>
                  <Form.Control
                    id="zoo-month-input"
                    type="month"
                    value={formValues.monthInput}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-week-input">Week</Form.Label>
                  <Form.Control
                    id="zoo-week-input"
                    type="week"
                    value={formValues.weekInput}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            {/* ── Special Inputs ── */}
            <Card className="border-0 shadow-sm mt-3">
              <Card.Header className="bg-light fw-semibold">
                <i className="bi bi-sliders me-2 text-warning"></i>Special Inputs
              </Card.Header>
              <Card.Body className="d-flex flex-column gap-3">

                <Form.Group>
                  <Form.Label htmlFor="zoo-range-input">
                    Range (slider) — current: <strong id="zoo-range-display">{formValues.rangeInput}</strong>
                  </Form.Label>
                  <Form.Range
                    id="zoo-range-input"
                    min={0}
                    max={100}
                    value={formValues.rangeInput}
                    onChange={handleChange}
                  />
                  <ProgressBar now={formValues.rangeInput} label={`${formValues.rangeInput}%`} id="zoo-range-progress" />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-color-input">
                    Color — selected: <span id="zoo-color-preview" style={{ background: formValues.colorInput, padding: '2px 10px', borderRadius: 4, border: '1px solid #ccc' }}>&nbsp;</span>
                  </Form.Label>
                  <Form.Control
                    id="zoo-color-input"
                    type="color"
                    value={formValues.colorInput}
                    onChange={handleChange}
                    style={{ width: 60, height: 40 }}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-file-input">File Upload</Form.Label>
                  <Form.Control
                    id="zoo-file-input"
                    type="file"
                    accept=".jpg,.png,.pdf,.txt,.csv"
                    onChange={handleChange}
                  />
                  {formValues.fileInput && (
                    <Form.Text id="zoo-file-selected-name" className="text-success">
                      Selected: {formValues.fileInput}
                    </Form.Text>
                  )}
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* ── Select & Multi-select ── */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-light fw-semibold">
                <i className="bi bi-menu-button me-2 text-danger"></i>Select Dropdowns
              </Card.Header>
              <Card.Body className="d-flex flex-column gap-3">

                <Form.Group>
                  <Form.Label htmlFor="zoo-select-single">Single Select</Form.Label>
                  <Form.Select
                    id="zoo-select-single"
                    value={formValues.selectSingle}
                    onChange={handleChange}
                  >
                    <option value="">-- Choose an option --</option>
                    <option value="option_a">Option A</option>
                    <option value="option_b">Option B</option>
                    <option value="option_c">Option C</option>
                    <option value="option_d">Option D</option>
                    <option value="option_e">Option E</option>
                  </Form.Select>
                  <Form.Text id="zoo-select-single-value" className="text-muted">
                    Value: <code>{formValues.selectSingle || 'none'}</code>
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-select-multi">Multi-Select <small className="text-muted">(Ctrl/Cmd + click)</small></Form.Label>
                  <Form.Select
                    id="zoo-select-multi"
                    multiple
                    size={5}
                    value={formValues.selectMulti}
                    onChange={handleChange}
                  >
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="yellow">Yellow</option>
                    <option value="purple">Purple</option>
                  </Form.Select>
                  <Form.Text id="zoo-select-multi-value" className="text-muted">
                    Selected: <code>{formValues.selectMulti.join(', ') || 'none'}</code>
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* ── Radio Buttons ── */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-light fw-semibold">
                <i className="bi bi-record-circle me-2 text-success"></i>Radio Buttons
              </Card.Header>
              <Card.Body>
                <div id="zoo-radio-group" className="d-flex flex-column gap-2">
                  {['option_1', 'option_2', 'option_3', 'option_4'].map((val, i) => (
                    <Form.Check
                      key={val}
                      type="radio"
                      id={`zoo-radio-${val}`}
                      name="zoo-radio-group"
                      label={`Radio Option ${i + 1}`}
                      value={val}
                      checked={formValues.radioValue === val}
                      onChange={() => handleRadio(val)}
                    />
                  ))}
                </div>
                <Form.Text id="zoo-radio-value" className="text-muted d-block mt-3">
                  Selected: <code>{formValues.radioValue || 'none'}</code>
                </Form.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* ── Checkboxes ── */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-light fw-semibold">
                <i className="bi bi-check2-square me-2 text-warning"></i>Checkboxes
              </Card.Header>
              <Card.Body>
                <div id="zoo-checkbox-group" className="d-flex flex-column gap-2">
                  <Form.Check
                    type="checkbox"
                    id="zoo-checkbox-alpha"
                    label="Checkbox Alpha"
                    checked={formValues.checkboxA}
                    onChange={(e) => setFormValues((p) => ({ ...p, checkboxA: e.target.checked }))}
                  />
                  <Form.Check
                    type="checkbox"
                    id="zoo-checkbox-beta"
                    label="Checkbox Beta"
                    checked={formValues.checkboxB}
                    onChange={(e) => setFormValues((p) => ({ ...p, checkboxB: e.target.checked }))}
                  />
                  <Form.Check
                    type="checkbox"
                    id="zoo-checkbox-gamma"
                    label="Checkbox Gamma"
                    checked={formValues.checkboxC}
                    onChange={(e) => setFormValues((p) => ({ ...p, checkboxC: e.target.checked }))}
                  />
                  <Form.Check
                    type="checkbox"
                    id="zoo-checkbox-disabled"
                    label="Disabled Checkbox (always off)"
                    disabled
                  />
                  <Form.Check
                    type="checkbox"
                    id="zoo-checkbox-disabled-checked"
                    label="Disabled Checkbox (always on)"
                    checked
                    disabled
                    onChange={() => {}}
                  />
                </div>
                <Form.Text id="zoo-checkbox-values" className="text-muted d-block mt-3">
                  Alpha: <code>{String(formValues.checkboxA)}</code> | Beta:{' '}
                  <code>{String(formValues.checkboxB)}</code> | Gamma:{' '}
                  <code>{String(formValues.checkboxC)}</code>
                </Form.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* ── Disabled / Readonly States ── */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-light fw-semibold">
                <i className="bi bi-lock me-2 text-secondary"></i>Disabled &amp; Read-only States
              </Card.Header>
              <Card.Body className="d-flex flex-column gap-3">

                <Form.Group>
                  <Form.Label htmlFor="zoo-input-disabled">Disabled Input</Form.Label>
                  <Form.Control
                    id="zoo-input-disabled"
                    type="text"
                    value="This field is disabled"
                    disabled
                    onChange={() => {}}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-input-readonly">Read-only Input</Form.Label>
                  <Form.Control
                    id="zoo-input-readonly"
                    type="text"
                    value="This field is read-only"
                    readOnly
                    onChange={() => {}}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="zoo-select-disabled">Disabled Select</Form.Label>
                  <Form.Select id="zoo-select-disabled" disabled>
                    <option>Cannot change this</option>
                  </Form.Select>
                </Form.Group>

                <Button id="zoo-btn-disabled" variant="secondary" disabled>
                  Disabled Button
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* ── Submit Area ── */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-light fw-semibold">
                <i className="bi bi-send me-2 text-primary"></i>Form Actions
              </Card.Header>
              <Card.Body className="d-flex flex-column gap-3 justify-content-center">
                <p className="text-muted small mb-0">
                  Submit the form and assert the <code>zoo-submitted-values</code> block that appears above with your expected values.
                </p>
                <div className="d-flex gap-2 flex-wrap">
                  <Button id="zoo-submit-btn" type="submit" variant="primary" size="lg">
                    <i className="bi bi-send me-2"></i>Submit Form
                  </Button>
                  <Button id="zoo-reset-btn" type="reset" variant="outline-secondary" size="lg">
                    <i className="bi bi-arrow-counterclockwise me-2"></i>Reset All
                  </Button>
                </div>

                <hr />
                <p className="text-muted small mb-1 fw-semibold">Quick fill buttons for automation demos:</p>
                <div className="d-flex gap-2 flex-wrap">
                  <Button
                    id="zoo-fill-all-btn"
                    variant="outline-success"
                    size="sm"
                    onClick={() => setFormValues((p) => ({
                      ...p,
                      textInput: 'Automation Test',
                      emailInput: 'qa@example.com',
                      numberInput: '42',
                      dateInput: '2026-06-15',
                      selectSingle: 'option_b',
                      radioValue: 'option_2',
                      checkboxA: true,
                    }))}
                  >
                    Fill Sample Data
                  </Button>
                  <Button
                    id="zoo-clear-all-btn"
                    variant="outline-danger"
                    size="sm"
                    onClick={() => setSubmitted(false) || handleReset()}
                  >
                    Clear All
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Form>
    </Container>
  );
};

export default FormElementsZoo;
