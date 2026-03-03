import { Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ stats, refreshStats }) => {
  const navigate = useNavigate();

  const statsCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: 'people',
      color: 'primary',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Admin Users',
      value: stats?.adminUsers || 0,
      icon: 'person-badge',
      color: 'danger',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Regular Users',
      value: stats?.regularUsers || 0,
      icon: 'person',
      color: 'success',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'System Status',
      value: 'Online',
      icon: 'check-circle',
      color: 'info',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
  ];

  return (
    <>
      {/* Stats Cards */}
      <Row className="mb-4">
        {statsCards.map((stat, idx) => (
          <Col key={idx} lg={3} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted mb-1">{stat.title}</p>
                    <h3 className="fw-bold mb-0">{stat.value}</h3>
                  </div>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: stat.gradient,
                    }}
                  >
                    <i className={`bi bi-${stat.icon} text-white`} style={{ fontSize: '1.5rem' }}></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-3">
                <i className="bi bi-lightning me-2 text-warning"></i>
                Quick Actions
              </h5>
              <div className="d-flex gap-2 flex-wrap">
                <Button
                  variant="primary"
                  onClick={() => navigate('/users')}
                >
                  <i className="bi bi-people me-2"></i>
                  Manage Users
                </Button>
                <Button
                  variant="success"
                  onClick={() => navigate('/users')}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Add New User
                </Button>
                <Button
                  variant="info"
                  onClick={refreshStats}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Refresh Data
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Users */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-3">
                <i className="bi bi-clock-history me-2 text-primary"></i>
                Recent Users
              </h5>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Age</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentUsers?.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Badge bg={user.role === 'admin' ? 'danger' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </td>
                      <td>{user.age}</td>
                      <td>{new Date(user.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
