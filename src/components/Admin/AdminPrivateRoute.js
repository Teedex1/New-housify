import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminPrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading, userType } = useAuth();

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-zinc-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    // Redirect to login if not authenticated or not an admin
    if (!isAuthenticated || userType !== 'admin') {
        console.log('Not authenticated as admin, redirecting to login');
        return <Navigate to="/admin/login" replace />;
    }

    // Render protected content if authenticated as admin
    return children;
};

export default AdminPrivateRoute;
