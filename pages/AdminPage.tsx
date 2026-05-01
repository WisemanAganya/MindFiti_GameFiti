
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../components/admin/AdminDashboard';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  if (!user) {
    return null; // Should not reach here due to route protection
  }

  return (
    <div className="bg-neutral-100 min-h-screen">
      <AdminDashboard user={user} onLogout={handleLogout} />
    </div>
  );
};

export default AdminPage;