import { Container, Nav, Navbar as BSNavbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BSNavbar bg="white" expand="lg" className="shadow-sm">
      <Container fluid>
        <BSNavbar.Brand className="fw-bold text-primary">
          <i className="bi bi-speedometer2 me-2"></i>
          Dashboard
        </BSNavbar.Brand>
        
        <BSNavbar.Toggle />
        
        <BSNavbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown
              title={
                <>
                  <i className="bi bi-person-circle me-2"></i>
                  {user?.name}
                  <span className="badge bg-primary ms-2">{user?.role}</span>
                </>
              }
              align="end"
            >
              <NavDropdown.Item onClick={() => navigate('/profile')}>
                <i className="bi bi-person me-2"></i>
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className="text-danger">
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
