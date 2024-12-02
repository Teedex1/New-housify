import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../utils/axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log('[AuthContext] Checking auth...');
      const currentPath = window.location.pathname;
      const isAdminRoute = currentPath.startsWith('/admin');

      if (isAdminRoute) {
        const adminToken = localStorage.getItem('adminToken');
        const adminData = localStorage.getItem('adminData');

        if (adminToken && adminData) {
          try {
            const parsedData = JSON.parse(adminData);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
            setUser(parsedData);
            setUserType('admin');
            setIsAuthenticated(true);
            setError(null);
          } catch (parseError) {
            console.error('[AuthContext] Error parsing admin data:', parseError);
            logout();
            setError('Invalid admin data');
          }
        } else {
          console.log('[AuthContext] No admin credentials found');
          logout();
        }
      } else {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');

        if (token && userData) {
          try {
            const parsedData = JSON.parse(userData);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(parsedData);
            setUserType(parsedData.role);
            setIsAuthenticated(true);
            setError(null);
          } catch (parseError) {
            console.error('[AuthContext] Error parsing user data:', parseError);
            logout();
            setError('Invalid user data');
          }
        } else {
          console.log('[AuthContext] No user credentials found');
          logout();
        }
      }
    } catch (error) {
      console.error('[AuthContext] Auth check error:', error);
      logout();
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token, userData, type = 'user') => {
    try {
      console.log('[AuthContext] Login called:', { type, userData });

      if (type === 'admin') {
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminData', JSON.stringify(userData));
      } else {
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify({ ...userData, role: type }));
      }

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ ...userData, role: type });
      setUserType(type);
      setIsAuthenticated(true);
      setError(null);

      console.log('[AuthContext] Login successful:', { type, userData });
      return true;
    } catch (error) {
      console.error('[AuthContext] Login error:', error);
      logout();
      setError(error.message);
      return false;
    }
  };

  const logout = () => {
    console.log('[AuthContext] Logout called');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    delete axiosInstance.defaults.headers.common['Authorization'];
    
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    userType,
    error,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
