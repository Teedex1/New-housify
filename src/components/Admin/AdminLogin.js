import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log('Attempting login with:', formData.email);
            const response = await axiosInstance.post('/api/admin/login', formData);
            console.log('Login response:', response.data);
            
            if (response.data.success && response.data.token) {
                localStorage.setItem('adminToken', response.data.token);
                if (response.data.admin) {
                    localStorage.setItem('adminData', JSON.stringify(response.data.admin));
                }
                toast.success('Login successful!');
                navigate('/admin/dashboard');
            } else {
                console.error('Invalid response structure:', response.data);
                toast.error('Server response format error');
            }
        } catch (error) {
            console.error('Login error:', error);
            console.error('Error response:', error.response?.data);
            
            let errorMessage = 'Login failed. Please check your credentials.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            toast.error(errorMessage);
            
            // Clear any existing invalid tokens
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminData');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-purple-500 mb-8">
                    Admin Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-gray-300 block mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-gray-300 block mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
