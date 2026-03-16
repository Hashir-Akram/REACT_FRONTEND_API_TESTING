import { useState, useRef } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Form, ProgressBar, Row } from 'react-bootstrap';

/**
 * Drag & Drop + File Upload Lab
 * ──────────────────────────────
 * Covers:
 *   • Drag & drop list reordering   → ActionChains.drag_and_drop / Playwright drag_to
 *   • File drag-and-drop zone       → send_keys() with absolute file path
 *   • Multi-file preview table      → assert rows, file names, sizes
 *   • Upload progress simulation    → assert ProgressBar aria-valuenow
 */
const DragDropUpload = () => {
  // ── Drag & Drop list ──
  const [items, setItems] = useState([
    { id: 'dnd-item-1', label: 'Task Alpha', color: '#4e73df' },
    { id: 'dnd-item-2', label: 'Task Beta', color: '#1cc88a' },
    { id: 'dnd-item-3', label: 'Task Gamma', color: '#f6c23e' },
    { id: 'dnd-item-4', label: 'Task Delta', color: '#e74a3b' },
    { id: 'dnd-item-5', label: 'Task Epsilon', color: '#858796' },
  ]);
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [dropHistory, setDropHistory] = useState([]);

  const onDragStart = (idx) => setDragIdx(idx);
  const onDragOver = (e, idx) => { e.preventDefault(); setDragOverIdx(idx); };
  const onDrop = (e, targetIdx) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === targetIdx) return;
    const next = [...items];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(targetIdx, 0, moved);
    setDropHistory((h) => [
      { from: dragIdx + 1, to: targetIdx + 1, label: moved.label, time: new Date().toLocaleTimeString() },
      ...h.slice(0, 4),
    ]);
    setItems(next);
    setDragIdx(null);
    setDragOverIdx(null);
  };
  const onDragEnd = () => { setDragIdx(null); setDragOverIdx(null); };
  const resetOrder = () => {
    setItems([
      { id: 'dnd-item-1', label: 'Task Alpha', color: '#4e73df' },
      { id: 'dnd-item-2', label: 'Task Beta', color: '#1cc88a' },
      { id: 'dnd-item-3', label: 'Task Gamma', color: '#f6c23e' },
      { id: 'dnd-item-4', label: 'Task Delta', color: '#e74a3b' },
      { id: 'dnd-item-5', label: 'Task Epsilon', color: '#858796' },
    ]);
    setDropHistory([]);
  };

  // ── File upload (browse or drop) ──
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dropZoneActive, setDropZoneActive] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const fileInputRef = useRef(null);

  const ALLOWED = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain', 'text/csv'];
  const MAX_SIZE = 5 * 1024 * 1024;

  const processFiles = (fileList) => {
    const newFiles = [];
    const errors = [];
    Array.from(fileList).forEach((f) => {
      if (!ALLOWED.includes(f.type) && !f.name.match(/\.(txt|csv|json)$/i)) {
        errors.push(`${f.name}: file type not allowed`);
        return;
      }
      if (f.size > MAX_SIZE) {
        errors.push(`${f.name}: exceeds 5 MB limit`);
        return;
      }
      newFiles.push({
        id: `file-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: f.name,
        size: f.size,
        type: f.type || 'unknown',
        status: 'pending',
      });
    });
    if (errors.length) alert(errors.join('\n'));
    if (newFiles.length) {
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      setUploadDone(false);
    }
  };

  const onFileInput = (e) => processFiles(e.target.files);
  const onDropZoneDrop = (e) => {
    e.preventDefault();
    setDropZoneActive(false);
    processFiles(e.dataTransfer.files);
  };

  const simulateUpload = () => {
    if (!uploadedFiles.length) return;
    setUploading(true);
    setUploadProgress(0);
    setUploadDone(false);
    setUploadedFiles((prev) => prev.map((f) => ({ ...f, status: 'uploading' })));
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploading(false);
        setUploadDone(true);
        setUploadedFiles((prev) => prev.map((f) => ({ ...f, status: 'done' })));
      }
      setUploadProgress(progress);
    }, 200);
  };

  const removeFile = (id) => setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  const clearAll = () => { setUploadedFiles([]); setUploadProgress(0); setUploadDone(false); };

  const fmtSize = (b) => b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(2)} MB`;

  return (
    <Container fluid>
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            <i className="bi bi-arrow-left-right me-2 text-danger"></i>
            Drag &amp; Drop + File Upload Lab
          </h2>
          <p className="text-muted mb-0">
            Practise drag-and-drop list reordering and file upload via browser pick or drop zone.
          </p>
          <div className="mt-2 d-flex gap-2 flex-wrap">
            <Badge bg="danger">Level 2–3</Badge>
            <Badge bg="secondary">ActionChains</Badge>
            <Badge bg="secondary">drag_to (Playwright)</Badge>
            <Badge bg="secondary">send_keys (file path)</Badge>
          </div>
        </Col>
      </Row>

      <Row className="g-3">

        {/* ── Drag & Drop List ── */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-light fw-semibold">
              <i className="bi bi-grip-vertical me-2 text-primary"></i>Reorderable List
              <small className="text-muted ms-2">(draggable rows)</small>
            </Card.Header>
            <Card.Body>
              <p className="text-muted small mb-3">
                Drag items to reorder. Assert the order via <code>id</code> attributes on each row.
                Use <code>ActionChains.drag_and_drop(source, target)</code> in Selenium.
              </p>

              <div id="dnd-list-container" style={{ minHeight: 260 }}>
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    id={item.id}
                    draggable
                    onDragStart={() => onDragStart(idx)}
                    onDragOver={(e) => onDragOver(e, idx)}
                    onDrop={(e) => onDrop(e, idx)}
                    onDragEnd={onDragEnd}
                    className={`d-flex align-items-center gap-3 p-3 mb-2 rounded border user-select-none ${dragOverIdx === idx ? 'border-primary' : 'border-light'}`}
                    style={{
                      background: dragIdx === idx ? '#f0f4ff' : '#fff',
                      cursor: 'grab',
                      transition: 'background 0.15s',
                      borderLeft: `5px solid ${item.color}`,
                      boxShadow: '0 1px 3px rgba(0,0,0,.1)',
                    }}
                    data-order={idx + 1}
                    data-label={item.label}
                  >
                    <i className="bi bi-grip-vertical text-muted"></i>
                    <span style={{ color: item.color, fontWeight: 600 }}>{idx + 1}.</span>
                    <span id={`${item.id}-label`}>{item.label}</span>
                    <Badge bg="light" text="dark" className="ms-auto" id={`${item.id}-order-badge`}>
                      pos: {idx + 1}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2">
                <Button id="dnd-reset-btn" variant="outline-secondary" size="sm" onClick={resetOrder}>
                  Reset Order
                </Button>
                <small id="dnd-item-order-summary" className="text-muted">
                  Order: {items.map((i) => i.label.split(' ')[1]).join(' → ')}
                </small>
              </div>

              {dropHistory.length > 0 && (
                <div id="dnd-drop-history" className="mt-3">
                  <small className="text-muted fw-semibold">Drop history:</small>
                  {dropHistory.map((h, i) => (
                    <div key={i} id={`dnd-history-${i}`} className="small text-muted">
                      {h.time} — "{h.label}" moved from pos {h.from} → pos {h.to}
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* ── File Upload ── */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-light fw-semibold">
              <i className="bi bi-cloud-upload me-2 text-success"></i>File Upload Zone
            </Card.Header>
            <Card.Body>
              <p className="text-muted small mb-3">
                Drop files or click "Browse". Use <code>send_keys("/absolute/path/to/file")</code> on the hidden{' '}
                <code>#upload-file-input</code> to trigger upload in automation.
              </p>

              {/* Drop zone */}
              <div
                id="upload-drop-zone"
                onDragOver={(e) => { e.preventDefault(); setDropZoneActive(true); }}
                onDragLeave={() => setDropZoneActive(false)}
                onDrop={onDropZoneDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 rounded p-4 text-center mb-3 ${dropZoneActive ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary'}`}
                style={{ borderStyle: 'dashed', cursor: 'pointer', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
              >
                <i className="bi bi-cloud-upload fs-1 text-muted"></i>
                <p className="mb-1 mt-2"><strong>Drop files here</strong> or click to browse</p>
                <small className="text-muted">JPG, PNG, GIF, PDF, TXT, CSV — max 5 MB each</small>
              </div>

              {/* Hidden file input — automation target */}
              <input
                ref={fileInputRef}
                id="upload-file-input"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.gif,.pdf,.txt,.csv"
                style={{ display: 'none' }}
                onChange={onFileInput}
              />

              {/* Browse button */}
              <Button
                id="upload-browse-btn"
                variant="outline-primary"
                className="w-100 mb-3"
                onClick={() => fileInputRef.current?.click()}
              >
                <i className="bi bi-folder2-open me-2"></i>Browse Files
              </Button>

              {/* File list */}
              {uploadedFiles.length > 0 && (
                <div id="upload-file-list" className="mb-3">
                  <table className="table table-sm table-bordered mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>File</th>
                        <th>Size</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {uploadedFiles.map((f) => (
                        <tr key={f.id} id={f.id}>
                          <td id={`${f.id}-name`} className="text-truncate" style={{ maxWidth: 130 }}>{f.name}</td>
                          <td id={`${f.id}-size`}>{fmtSize(f.size)}</td>
                          <td id={`${f.id}-status`}>
                            <Badge bg={f.status === 'done' ? 'success' : f.status === 'uploading' ? 'warning' : 'secondary'}>
                              {f.status}
                            </Badge>
                          </td>
                          <td>
                            <button id={`${f.id}-remove-btn`} className="btn btn-sm btn-outline-danger py-0" onClick={() => removeFile(f.id)} disabled={uploading}>×</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Progress bar */}
              {(uploading || uploadDone) && (
                <div className="mb-3">
                  <ProgressBar
                    id="upload-progress-bar"
                    now={uploadProgress}
                    label={`${uploadProgress}%`}
                    variant={uploadDone ? 'success' : 'primary'}
                    animated={uploading}
                    striped={uploading}
                    aria-valuenow={uploadProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              )}

              {uploadDone && (
                <Alert id="upload-success-alert" variant="success" className="mb-3">
                  <i className="bi bi-check-circle me-2"></i>
                  {uploadedFiles.length} file(s) uploaded successfully.
                </Alert>
              )}

              <div className="d-flex gap-2">
                <Button
                  id="upload-submit-btn"
                  variant="success"
                  onClick={simulateUpload}
                  disabled={!uploadedFiles.length || uploading || uploadDone}
                >
                  <i className="bi bi-upload me-2"></i>Upload Files
                </Button>
                <Button id="upload-clear-btn" variant="outline-danger" onClick={clearAll} disabled={uploading}>
                  Clear All
                </Button>
              </div>

              <p id="upload-file-count" className="text-muted small mt-2 mb-0">
                Files queued: <strong>{uploadedFiles.length}</strong>
              </p>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default DragDropUpload;
