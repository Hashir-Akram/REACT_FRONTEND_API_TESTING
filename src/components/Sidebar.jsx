import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: 'speedometer2', label: 'Dashboard', role: ['admin', 'user'] },
    { path: '/users', icon: 'people', label: 'Users', role: ['admin'] },
    { path: '/projects', icon: 'kanban', label: 'Projects', role: ['admin', 'user'] },
    { path: '/tasks', icon: 'list-check', label: 'Tasks', role: ['admin', 'user'] },
    { path: '/test-scenarios', icon: 'window', label: 'Test Scenarios', role: ['admin', 'user'] },
    { path: '/activity', icon: 'activity', label: 'Activity Logs', role: ['admin'] },
    { path: '/profile', icon: 'person', label: 'Profile', role: ['admin', 'user'] },
    { path: '/about', icon: 'info-circle', label: 'About', role: ['admin', 'user'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.role.includes(isAdmin() ? 'admin' : 'user')
  );

  return (
    <div
      className={`sidebar bg-dark text-white p-3 ${collapsed ? 'collapsed' : ''}`}
      style={{
        width: collapsed ? '80px' : '250px',
        minHeight: '100vh',
        transition: 'width 0.3s',
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        {!collapsed && (
          <h4 className="mb-0">
            <i className="bi bi-code-square me-2"></i>
            API Backend
          </h4>
        )}
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => setCollapsed(!collapsed)}
        >
          <i className={`bi bi-${collapsed ? 'chevron-right' : 'chevron-left'}`}></i>
        </button>
      </div>

      <Nav className="flex-column">
        {filteredMenuItems.map((item) => (
          <Nav.Link
            key={item.path}
            as={Link}
            to={item.path}
            className={`text-white mb-2 rounded ${
              location.pathname === item.path ? 'bg-primary' : ''
            }`}
            style={{ padding: '10px 15px' }}
          >
            <i className={`bi bi-${item.icon} me-2`}></i>
            {!collapsed && item.label}
          </Nav.Link>
        ))}
      </Nav>

      {!collapsed && (
        <div className="mt-auto pt-4" style={{ position: 'absolute', bottom: '20px' }}>
          <small className="text-muted">
            <i className="bi bi-shield-check me-2"></i>
            v1.0.0 - Secure API
          </small>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
