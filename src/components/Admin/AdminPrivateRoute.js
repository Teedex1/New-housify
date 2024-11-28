import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ children }) => {
    const adminToken = localStorage.getItem('adminToken');
    
    if (!adminToken) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default AdminPrivateRoute;
