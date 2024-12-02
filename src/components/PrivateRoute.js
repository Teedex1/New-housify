import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, requiredRole = 'user' }) => {
  const { isAuthenticated, isLoading, userType } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Handle different role-based redirects
  if (!isAuthenticated) {
    if (requiredRole === 'admin') {
      return <Navigate to="/admin/login" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role
  if (requiredRole === 'admin' && userType !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  if (requiredRole === 'agent' && userType !== 'agent') {
    return <Navigate to="/login" replace />;
  }

  // Render protected content if authenticated with correct role
  return children;
};

export default PrivateRoute;
