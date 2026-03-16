import { useState } from 'react';
import {
  Alert, Badge, Button, Card, Col, Container, Form, ProgressBar, Row,
} from 'react-bootstrap';

/**
 * Multi-step Form Wizard
 * ──────────────────────
 * 4 steps with validation gates between each step.
 * QA skill target: page-object-model motivation, state persistence,
 *   asserting step indicators, forward/back navigation, final submission.
 */
const STEPS = ['Account', 'Personal', 'Preferences', 'Review'];

const defaultData = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  age: '',
  phone: '',
  country: '',
  newsletter: false,
  role: '',
  notifications: 'email',
  agreeTerms: false,
};

const countries = ['Australia', 'Canada', 'Germany', 'India', 'Japan', 'United Kingdom', 'United States', 'Other'];
const roles = ['Software Engineer', 'QA Engineer', 'Product Manager', 'Designer', 'DevOps', 'Student'];

const MultiStepWizard = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(defaultData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key, value) => {
    setData((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  // ── Per-step validation ──
  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
      if (data.password.length < 8) e.password = 'Minimum 8 characters';
      if (data.password !== data.confirmPassword) e.confirmPassword = 'Passwords do not match';
    }
    if (step === 1) {
      if (data.firstName.trim().length < 2) e.firstName = 'At least 2 characters';
      if (data.lastName.trim().length < 2) e.lastName = 'At least 2 characters';
      const age = Number(data.age);
      if (!age || age < 16 || age > 120) e.age = 'Age must be between 16 and 120';
    }
    if (step === 2) {
      if (!data.country) e.country = 'Please select a country';
      if (!data.role) e.role = 'Please select a role';
    }
    if (step === 3) {
      if (!data.agreeTerms) e.agreeTerms = 'You must agree to the terms';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep((s) => s + 1); };
  const back = () => setStep((s) => s - 1);
  const submit = () => { if (validate()) setSubmitted(true); };
  const reset = () => { setData(defaultData); setErrors({}); setStep(0); setSubmitted(false); };

  const progress = ((step) / STEPS.length) * 100;

  if (submitted) {
    return (
      <Container fluid>
        <Row className="justify-content-center mt-5">
          <Col lg={6}>
            <Card className="border-0 shadow text-center p-4">
              <div id="wizard-success-icon" className="fs-1 text-success mb-3">
                <i className="bi bi-check-circle-fill"></i>
              </div>
              <h3 id="wizard-success-title" className="fw-bold">Registration Complete!</h3>
              <p id="wizard-success-message" className="text-muted">
                Account created for <strong>{data.email}</strong>.
              </p>
              <pre id="wizard-submitted-data" className="text-start bg-light rounded p-3 small text-muted mt-3">
                {JSON.stringify({ ...data, password: '***', confirmPassword: '***' }, null, 2)}
              </pre>
              <Button id="wizard-restart-btn" variant="primary" className="mt-3" onClick={reset}>
                Start Again
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid>
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-card-checklist me-2 text-primary"></i>
            Multi-step Form Wizard
          </h2>
          <p className="text-muted mb-0">
            4-step registration wizard with validation gates. Practise Page Object Model, step assertions, and back/next navigation.
          </p>
          <div className="mt-2 d-flex gap-2 flex-wrap">
            <Badge bg="primary">Level 2</Badge>
            <Badge bg="secondary">Page Object Model</Badge>
            <Badge bg="secondary">State Persistence</Badge>
            <Badge bg="secondary">Validation Gates</Badge>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">

              {/* ── Step Indicator ── */}
              <div id="wizard-step-indicator" className="d-flex justify-content-between mb-1">
                {STEPS.map((label, i) => (
                  <div key={i} className="text-center flex-fill">
                    <div
                      id={`wizard-step-${i + 1}-circle`}
                      className={`rounded-circle d-inline-flex align-items-center justify-content-center fw-bold mb-1`}
                      style={{
                        width: 36, height: 36,
                        background: i < step ? '#1cc88a' : i === step ? '#4e73df' : '#dee2e6',
                        color: i <= step ? '#fff' : '#6c757d',
                        transition: 'background .3s',
                      }}
                    >
                      {i < step ? <i className="bi bi-check"></i> : i + 1}
                    </div>
                    <div id={`wizard-step-${i + 1}-label`} className={`small ${i === step ? 'fw-bold text-primary' : 'text-muted'}`}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <ProgressBar
                id="wizard-progress-bar"
                now={progress}
                className="mb-4"
                style={{ height: 6 }}
                aria-valuenow={progress}
              />

              <p id="wizard-current-step" className="text-muted small mb-3">
                Step <strong>{step + 1}</strong> of <strong>{STEPS.length}</strong> — <strong>{STEPS[step]}</strong>
              </p>

              {/* ── Step 0: Account ── */}
              {step === 0 && (
                <div id="wizard-step-account">
                  <h5 className="fw-bold mb-3">Account Details</h5>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="wizard-email-input">Email Address *</Form.Label>
                    <Form.Control
                      id="wizard-email-input"
                      type="email"
                      placeholder="you@example.com"
                      value={data.email}
                      onChange={(e) => update('email', e.target.value)}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback id="wizard-email-error" type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="wizard-password-input">Password *</Form.Label>
                    <Form.Control
                      id="wizard-password-input"
                      type="password"
                      placeholder="Min 8 characters"
                      value={data.password}
                      onChange={(e) => update('password', e.target.value)}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback id="wizard-password-error" type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="wizard-confirm-password-input">Confirm Password *</Form.Label>
                    <Form.Control
                      id="wizard-confirm-password-input"
                      type="password"
                      placeholder="Re-enter password"
                      value={data.confirmPassword}
                      onChange={(e) => update('confirmPassword', e.target.value)}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback id="wizard-confirm-password-error" type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                  </Form.Group>
                </div>
              )}

              {/* ── Step 1: Personal ── */}
              {step === 1 && (
                <div id="wizard-step-personal">
                  <h5 className="fw-bold mb-3">Personal Information</h5>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="wizard-firstname-input">First Name *</Form.Label>
                        <Form.Control
                          id="wizard-firstname-input"
                          type="text"
                          placeholder="John"
                          value={data.firstName}
                          onChange={(e) => update('firstName', e.target.value)}
                          isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback id="wizard-firstname-error" type="invalid">{errors.firstName}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="wizard-lastname-input">Last Name *</Form.Label>
                        <Form.Control
                          id="wizard-lastname-input"
                          type="text"
                          placeholder="Doe"
                          value={data.lastName}
                          onChange={(e) => update('lastName', e.target.value)}
                          isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback id="wizard-lastname-error" type="invalid">{errors.lastName}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="wizard-age-input">Age *</Form.Label>
                    <Form.Control
                      id="wizard-age-input"
                      type="number"
                      min={16}
                      max={120}
                      placeholder="Your age"
                      value={data.age}
                      onChange={(e) => update('age', e.target.value)}
                      isInvalid={!!errors.age}
                    />
                    <Form.Control.Feedback id="wizard-age-error" type="invalid">{errors.age}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="wizard-phone-input">Phone <small className="text-muted">(optional)</small></Form.Label>
                    <Form.Control
                      id="wizard-phone-input"
                      type="tel"
                      placeholder="+1 555 000 0000"
                      value={data.phone}
                      onChange={(e) => update('phone', e.target.value)}
                    />
                  </Form.Group>
                </div>
              )}

              {/* ── Step 2: Preferences ── */}
              {step === 2 && (
                <div id="wizard-step-preferences">
                  <h5 className="fw-bold mb-3">Preferences</h5>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="wizard-country-select">Country *</Form.Label>
                    <Form.Select
                      id="wizard-country-select"
                      value={data.country}
                      onChange={(e) => update('country', e.target.value)}
                      isInvalid={!!errors.country}
                    >
                      <option value="">-- Select your country --</option>
                      {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback id="wizard-country-error" type="invalid">{errors.country}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="wizard-role-select">Your Role *</Form.Label>
                    <Form.Select
                      id="wizard-role-select"
                      value={data.role}
                      onChange={(e) => update('role', e.target.value)}
                      isInvalid={!!errors.role}
                    >
                      <option value="">-- Select your role --</option>
                      {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback id="wizard-role-error" type="invalid">{errors.role}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Notification Preference</Form.Label>
                    <div id="wizard-notification-group">
                      {['email', 'sms', 'none'].map((val) => (
                        <Form.Check
                          key={val}
                          type="radio"
                          id={`wizard-notifications-${val}`}
                          name="wizard-notifications"
                          label={val === 'none' ? 'No notifications' : val.toUpperCase()}
                          value={val}
                          checked={data.notifications === val}
                          onChange={() => update('notifications', val)}
                        />
                      ))}
                    </div>
                  </Form.Group>
                  <Form.Check
                    type="checkbox"
                    id="wizard-newsletter-check"
                    label="Subscribe to newsletter"
                    checked={data.newsletter}
                    onChange={(e) => update('newsletter', e.target.checked)}
                  />
                </div>
              )}

              {/* ── Step 3: Review ── */}
              {step === 3 && (
                <div id="wizard-step-review">
                  <h5 className="fw-bold mb-3">Review &amp; Confirm</h5>
                  <table className="table table-sm table-bordered" id="wizard-review-table">
                    <tbody>
                      {[
                        ['Email', data.email, 'wizard-review-email'],
                        ['First Name', data.firstName, 'wizard-review-firstname'],
                        ['Last Name', data.lastName, 'wizard-review-lastname'],
                        ['Age', data.age, 'wizard-review-age'],
                        ['Phone', data.phone || '—', 'wizard-review-phone'],
                        ['Country', data.country, 'wizard-review-country'],
                        ['Role', data.role, 'wizard-review-role'],
                        ['Notifications', data.notifications, 'wizard-review-notifications'],
                        ['Newsletter', data.newsletter ? 'Yes' : 'No', 'wizard-review-newsletter'],
                      ].map(([label, val, tdId]) => (
                        <tr key={tdId}>
                          <td className="fw-semibold text-muted" style={{ width: '40%' }}>{label}</td>
                          <td id={tdId}>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Form.Check
                    type="checkbox"
                    id="wizard-agree-terms-check"
                    label="I agree to the Terms & Conditions *"
                    checked={data.agreeTerms}
                    onChange={(e) => update('agreeTerms', e.target.checked)}
                    isInvalid={!!errors.agreeTerms}
                  />
                  {errors.agreeTerms && (
                    <div id="wizard-terms-error" className="text-danger small mt-1">{errors.agreeTerms}</div>
                  )}
                </div>
              )}

              {/* ── Navigation ── */}
              <div className="d-flex justify-content-between mt-4">
                <Button
                  id="wizard-back-btn"
                  variant="outline-secondary"
                  onClick={back}
                  disabled={step === 0}
                >
                  <i className="bi bi-chevron-left me-1"></i>Back
                </Button>
                {step < STEPS.length - 1 ? (
                  <Button id="wizard-next-btn" variant="primary" onClick={next}>
                    Next<i className="bi bi-chevron-right ms-1"></i>
                  </Button>
                ) : (
                  <Button id="wizard-submit-btn" variant="success" onClick={submit}>
                    <i className="bi bi-check-circle me-2"></i>Submit Registration
                  </Button>
                )}
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MultiStepWizard;
