import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: 'speedometer2', label: 'Dashboard', role: ['admin', 'user'] },
    { path: '/users', icon: 'people', label: 'Users', role: ['admin'] },
    { path: '/projects', icon: 'kanban', label: 'Projects', role: ['admin', 'user'] },
    { path: '/tasks', icon: 'list-check', label: 'Tasks', role: ['admin', 'user'] },
    { path: '/activity', icon: 'activity', label: 'Activity Logs', role: ['admin'] },
    { path: '', icon: '', label: '── UI Test Lab ──', role: ['admin', 'user'], divider: true },
    { path: '/test-scenarios', icon: 'window', label: 'Test Scenarios', role: ['admin', 'user'] },
    { path: '/form-elements-zoo', icon: 'ui-checks', label: 'Form Elements Zoo', role: ['admin', 'user'] },
    { path: '/dynamic-widgets', icon: 'lightning-charge', label: 'Dynamic Widgets', role: ['admin', 'user'] },
    { path: '/drag-drop-upload', icon: 'arrow-left-right', label: 'Drag & Upload', role: ['admin', 'user'] },
    { path: '/multi-step-wizard', icon: 'card-checklist', label: 'Multi-step Wizard', role: ['admin', 'user'] },
    { path: '/broken-ui', icon: 'bug', label: 'Broken UI Challenge', role: ['admin', 'user'] },
    { path: '/frontend-test-cases', icon: 'journal-text', label: 'Frontend Test Cases', role: ['admin', 'user'] },
    { path: '', icon: '', label: '── API Test Lab ──', role: ['admin', 'user'], divider: true },
    { path: '/api-lab', icon: 'terminal', label: 'API Lab', role: ['admin', 'user'] },
    { path: '/backend-test-cases', icon: 'server', label: 'Backend Test Cases', role: ['admin', 'user'] },
    { path: '/profile', icon: 'person', label: 'Profile', role: ['admin', 'user'] },
    { path: '/about', icon: 'info-circle', label: 'About', role: ['admin', 'user'] },
  ];

  const filteredMenuItems = menuItems.filter(item =>
    item.divider || item.role.includes(isAdmin() ? 'admin' : 'user')
  );

  return (
    <div
      className="sidebar bg-dark text-white p-3"
      style={{
        width: '280px',
        minWidth: '280px',
        maxWidth: '280px',
        minHeight: '100vh',
        flexShrink: 0,
        overflowX: 'hidden',
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">
          <i className="bi bi-code-square me-2"></i>
          API Backend
        </h4>
      </div>

      <Nav className="sidebar-nav flex-column flex-grow-1 pe-1">
        {filteredMenuItems.map((item, idx) => {
          if (item.divider) {
            return (
              <div key={`divider-${idx}`} className="text-uppercase text-muted mt-3 mb-1 px-2" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', opacity: 0.7 }}>
                {item.label}
              </div>
            );
          }
          return (
            <Nav.Link
              id={`sidebar-nav-${item.path.replace(/\//g, '') || 'root'}`}
              key={item.path}
              as={Link}
              to={item.path}
              className={`text-white mb-1 rounded ${
                location.pathname === item.path ? 'bg-primary' : ''
              }`}
              style={{ padding: '8px 15px' }}
            >
              <i className={`bi bi-${item.icon} me-2`}></i>
              {item.label}
            </Nav.Link>
          );
        })}
      </Nav>

      <div className="mt-auto pt-3">
        <small className="text-muted">
          <i className="bi bi-shield-check me-2"></i>
          v1.0.0 - Secure API
        </small>
      </div>
    </div>
  );
};

export default Sidebar;
