import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import axiosInstance from '../utils/axios';

const AgentSignIn = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isSignIn) {
        // Handle Sign In
        const response = await axiosInstance.post('/api/agent/signin', {
          email: formData.email,
          password: formData.password,
        });
        
        localStorage.setItem('token', response.data.token);
        toast.success('Successfully signed in!');
        navigate('/agent/dashboard');
      } else {
        // Handle Sign Up
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match!');
          return;
        }

        await axiosInstance.post('/api/agent/signup', {
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phone: formData.phone,
        });

        toast.success('Account created! Please complete your profile.');
        navigate('/agent/profile-setup');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-zinc-800 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isSignIn ? 'Welcome Back' : 'Join Housify'}
            </h2>
            <p className="text-gray-400">
              {isSignIn 
                ? 'Sign in to access your agent dashboard' 
                : 'Create an account to start listing properties'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isSignIn && (
              <>
                <div>
                  <label className="block text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              </>
            )}
            
            <div>
              <label className="block text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            {!isSignIn && (
              <div>
                <label className="block text-gray-300 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              {isSignIn ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              {isSignIn 
                ? "Don't have an account? Sign up" 
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AgentSignIn;
