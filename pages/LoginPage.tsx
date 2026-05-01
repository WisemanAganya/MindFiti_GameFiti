import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/admin/LoginForm';
import { User } from '../types';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (token: string, user: User) => {
    setIsLoading(true);
    // Update auth context
    login(token, user);
    
    // Redirect to admin dashboard after a brief delay
    setTimeout(() => {
      navigate('/admin', { replace: true });
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo/Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white font-montserrat mb-2">
            MindStrong
          </h1>
          <p className="text-primary-light text-lg">
            Admin Dashboard
          </p>
        </div>

        {/* Login Form Container */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <LoginForm onLogin={handleLogin} />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white text-sm">
            Protected Admin Area • Project MindStrong © 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
