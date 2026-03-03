import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useState } from 'react';

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="flex-grow-1 d-flex flex-column">
        <Navbar />
        <main className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
