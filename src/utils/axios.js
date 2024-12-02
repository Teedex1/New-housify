import axios from 'axios';

// Create custom axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const adminToken = localStorage.getItem('adminToken');
        
        if (config.url.includes('/api/admin') && adminToken) {
            config.headers.Authorization = `Bearer ${adminToken}`;
        } else if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;
            const currentPath = window.location.pathname;
            const isAdminRoute = currentPath.startsWith('/admin');

            switch (status) {
                case 401:
                    if (isAdminRoute) {
                        localStorage.removeItem('adminToken');
                        localStorage.removeItem('adminData');
                        window.location.href = '/admin/login';
                    } else {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userData');
                        window.location.href = '/login';
                    }
                    break;
                case 403:
                    console.error('[Axios] Access denied');
                    break;
                case 404:
                    console.error('[Axios] Resource not found');
                    break;
                default:
                    console.error('[Axios] Error:', error.response.data);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
