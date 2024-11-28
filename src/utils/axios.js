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
        // Check for admin token first, then regular token
        const adminToken = localStorage.getItem('adminToken');
        const userToken = localStorage.getItem('token');
        
        console.log('[Axios] Request URL:', config.url);
        console.log('[Axios] Admin token exists:', !!adminToken);
        console.log('[Axios] User token exists:', !!userToken);
        
        if (adminToken && config.url.includes('/api/admin')) {
            console.log('[Axios] Using admin token for admin route');
            config.headers.Authorization = `Bearer ${adminToken}`;
        } else if (userToken) {
            console.log('[Axios] Using user token');
            config.headers.Authorization = `Bearer ${userToken}`;
        } else {
            console.log('[Axios] No token available');
        }

        return config;
    },
    (error) => {
        console.error('[Axios] Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('[Axios] Response from:', response.config.url);
        console.log('[Axios] Response status:', response.status);
        return response;
    },
    (error) => {
        console.error('[Axios] Response error:', error);
        console.error('[Axios] Error response:', error.response?.data);
        
        if (error.response) {
            const status = error.response.status;
            const isAdminRoute = error.config.url.includes('/api/admin');
            
            switch (status) {
                case 401:
                    console.log('[Axios] Authentication error');
                    if (isAdminRoute) {
                        console.log('[Axios] Clearing admin token and redirecting to admin login');
                        localStorage.removeItem('adminToken');
                        localStorage.removeItem('adminData');
                        window.location.href = '/admin/login';
                    } else {
                        console.log('[Axios] Clearing user token and redirecting to login');
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
