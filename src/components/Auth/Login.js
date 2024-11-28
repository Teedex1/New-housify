import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import { useAuth } from '../../context/AuthContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First try admin login
      try {
        const adminResponse = await axiosInstance.post('/api/admin/login', formData);
        console.log('Admin login response:', adminResponse.data);
        console.log('Admin user role:', adminResponse.data.admin.role);
        login(adminResponse.data.token, adminResponse.data.admin);
        console.log('Auth state after login:', { 
          token: localStorage.getItem('token'),
          user: JSON.parse(localStorage.getItem('user'))
        });
        console.log('About to navigate to /admin');
        navigate('/admin');
        console.log('Navigation completed');
        return;
      } catch (error) {
        // If not admin, continue to try agent login
        if (error.response?.status !== 401) {
          throw error;
        }
      }

      // Try agent login
      try {
        const agentResponse = await axiosInstance.post('/api/agents/login', formData);
        console.log('Agent login successful:', agentResponse.data);
        login(agentResponse.data.token, agentResponse.data.agent);
        console.log('About to navigate to /agent/dashboard');
        navigate('/agent/dashboard');
        console.log('Navigation completed');
        return;
      } catch (error) {
        // If not agent, throw error
        if (error.response?.status !== 401) {
          throw error;
        }
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Access your dashboard
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-zinc-700 placeholder-gray-500 text-white bg-zinc-800 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-zinc-700 placeholder-gray-500 text-white bg-zinc-800 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Want to become an agent?{' '}
              <a
                href="/agent/register"
                className="font-medium text-purple-500 hover:text-purple-400"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
