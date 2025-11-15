import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import './admin.css';

const AdminLayout: React.FC = () => {
  return (
    <AuthGuard>
      <div className="admin-app">
        <nav className="admin-nav">
          <h1>Vawmy Curtains Admin</h1>
          <div className="admin-nav-links">
            <Link to="/admin/collections">Collections</Link>
            <Link to="/admin/blog">Blog</Link>
            <Link to="/admin/social">Social Media</Link>
            <Link to="/admin/contact">Contact Info</Link>
            <Link to="/">← Back to Site</Link>
          </div>
        </nav>
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </AuthGuard>
  );
};

export default AdminLayout;
