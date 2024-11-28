import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSpinner, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import axiosInstance from '../../utils/axios';

const AgentDashboardAccess = () => {
  const [loading, setLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [agentData, setAgentData] = useState(null);

  useEffect(() => {
    checkApplicationStatus();
  }, []);

  const checkApplicationStatus = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/agent/application-status');
      setApplicationStatus(response.data.status);
      setAgentData(response.data.agent);
    } catch (error) {
      console.error('Error checking application status:', error);
      setApplicationStatus('not_applied');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-purple-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {applicationStatus === 'approved' && agentData ? (
          <div className="bg-zinc-800 rounded-lg p-8 text-center">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Welcome back, {agentData.name}!
            </h2>
            <p className="text-gray-400 mb-8">
              Your agent account is active. You can access your dashboard to manage properties,
              view leads, and track your performance.
            </p>
            <Link
              to="/agent-dashboard"
              className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : applicationStatus === 'pending' ? (
          <div className="bg-zinc-800 rounded-lg p-8 text-center">
            <FaClock className="text-6xl text-yellow-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Application Under Review
            </h2>
            <p className="text-gray-400 mb-4">
              Thank you for your interest in becoming an agent with Housify. Our team is currently
              reviewing your application. This process typically takes 1-2 business days.
            </p>
            <p className="text-gray-400">
              We'll notify you via email once your application has been reviewed. You can also
              check back here for updates.
            </p>
          </div>
        ) : applicationStatus === 'rejected' ? (
          <div className="bg-zinc-800 rounded-lg p-8 text-center">
            <FaTimesCircle className="text-6xl text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Application Not Approved
            </h2>
            <p className="text-gray-400 mb-6">
              Unfortunately, we were unable to approve your application at this time. This might
              be due to incomplete information or not meeting our current requirements.
            </p>
            <div className="space-y-4">
              <Link
                to="/agent/apply"
                className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
              >
                Apply Again
              </Link>
              <p className="text-sm text-gray-500">
                If you believe this is an error, please contact our support team.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-800 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Become a Housify Agent
            </h2>
            <p className="text-gray-400 mb-8">
              Join our network of professional real estate agents and grow your business with
              our powerful platform.
            </p>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-zinc-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Property Management
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Easily list and manage your properties
                  </p>
                </div>
                <div className="p-4 bg-zinc-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Lead Generation
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Connect with potential clients
                  </p>
                </div>
                <div className="p-4 bg-zinc-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Analytics
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Track your performance and growth
                  </p>
                </div>
              </div>
              <Link
                to="/agent/apply"
                className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboardAccess;
