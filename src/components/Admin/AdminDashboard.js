import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes, FaSpinner, FaEye, FaEnvelope, FaPhone, FaBuilding, FaIdCard, FaCalendar } from 'react-icons/fa';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [pendingAgents, setPendingAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingId, setProcessingId] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
    });

    // Create axios instance with default config
    const api = axios.create({
        baseURL: 'http://localhost:5001/api',
        timeout: 30000  // Increased timeout to 30 seconds
    });

    // Add request interceptor to add token
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // Add response interceptor to handle token expiration
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminData');
                navigate('/admin/login');
                toast.error('Session expired. Please log in again.');
            }
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const token = localStorage.getItem('adminToken');
                if (!token) {
                    navigate('/admin/login');
                    return;
                }

                // Fetch stats and pending agents one after another to avoid timeout
                const statsResponse = await api.get('/admin/agents/stats');
                setStats(statsResponse.data);

                const agentsResponse = await api.get('/admin/agents/pending');
                setPendingAgents(agentsResponse.data);
                
                setLoading(false);
            } catch (error) {
                console.error('Dashboard error:', error);
                if (error.message?.includes('timeout')) {
                    setError('Server is taking too long to respond. Please try again.');
                } else if (error.response?.status === 401) {
                    // Token expired or invalid - handled by interceptor
                    return;
                } else {
                    setError(error.response?.data?.message || 'Failed to load dashboard data');
                }
                toast.error(error.response?.data?.message || 'Failed to load dashboard data');
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleAgentStatus = async (agentId, status, reason = '') => {
        if (processingId) return; // Prevent multiple clicks
        
        setProcessingId(agentId);
        try {
            await api.put(`/admin/agents/${agentId}/status`, { status, reason });
            
            toast.success(`Agent ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
            setPendingAgents(pendingAgents.filter(agent => agent._id !== agentId));
            
            // Update stats after status change
            const statsResponse = await api.get('/admin/agents/stats');
            setStats(statsResponse.data);
        } catch (error) {
            console.error('Status update error:', error);
            if (error.response?.status !== 401) { // 401 is handled by interceptor
                toast.error(error.response?.data?.message || `Failed to ${status} agent`);
            }
        } finally {
            setProcessingId(null);
        }
    };

    const viewAgentDetails = (agent) => {
        setSelectedAgent(agent);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <FaSpinner className="animate-spin text-4xl text-purple-500 mb-4" />
                <p className="text-gray-400">Loading dashboard data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-red-500 text-xl mb-4">Error loading dashboard</div>
                <p className="text-gray-400">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-gray-400 text-sm">Total Agents</h3>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <div className="bg-yellow-600 bg-opacity-20 rounded-lg p-4">
                    <h3 className="text-yellow-400 text-sm">Pending</h3>
                    <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
                </div>
                <div className="bg-green-600 bg-opacity-20 rounded-lg p-4">
                    <h3 className="text-green-400 text-sm">Approved</h3>
                    <p className="text-2xl font-bold text-green-400">{stats.approved}</p>
                </div>
                <div className="bg-red-600 bg-opacity-20 rounded-lg p-4">
                    <h3 className="text-red-400 text-sm">Rejected</h3>
                    <p className="text-2xl font-bold text-red-400">{stats.rejected}</p>
                </div>
            </div>

            {/* Pending Applications */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-100 mb-6">Pending Agent Applications</h2>
                
                {pendingAgents.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No pending agent applications</p>
                ) : (
                    <div className="grid gap-6">
                        {pendingAgents.map((agent) => (
                            <div key={agent._id} className="bg-gray-700 rounded-lg p-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-medium text-gray-100">
                                            {agent.name}
                                        </h3>
                                        <div className="flex items-center text-gray-400">
                                            <FaEnvelope className="mr-2" />
                                            <span>{agent.email}</span>
                                        </div>
                                        <div className="flex items-center text-gray-400">
                                            <FaPhone className="mr-2" />
                                            <span>{agent.phone}</span>
                                        </div>
                                        <div className="flex items-center text-gray-400">
                                            <FaIdCard className="mr-2" />
                                            <span>License: {agent.licenseNumber}</span>
                                        </div>
                                        {agent.experience && (
                                            <div className="flex items-center text-gray-400">
                                                <FaCalendar className="mr-2" />
                                                <span>Experience: {agent.experience}</span>
                                            </div>
                                        )}
                                        {agent.specialization && (
                                            <div className="flex items-center text-gray-400">
                                                <FaBuilding className="mr-2" />
                                                <span>Specialization: {agent.specialization}</span>
                                            </div>
                                        )}
                                        {agent.location && (
                                            <div className="flex items-center text-gray-400">
                                                <FaBuilding className="mr-2" />
                                                <span>Location: {agent.location}</span>
                                            </div>
                                        )}
                                        {agent.about && (
                                            <div className="text-gray-400 mt-2">
                                                <p className="text-sm font-medium mb-1">About:</p>
                                                <p className="text-sm">{agent.about}</p>
                                            </div>
                                        )}
                                        <div className="flex items-center text-gray-400">
                                            <FaCalendar className="mr-2" />
                                            <span>Applied: {new Date(agent.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <button
                                            onClick={() => viewAgentDetails(agent)}
                                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <FaEye className="mr-2" />
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => handleAgentStatus(agent._id, 'approved')}
                                            disabled={processingId === agent._id}
                                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                        >
                                            {processingId === agent._id ? (
                                                <FaSpinner className="animate-spin mr-2" />
                                            ) : (
                                                <FaCheck className="mr-2" />
                                            )}
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleAgentStatus(agent._id, 'rejected')}
                                            disabled={processingId === agent._id}
                                            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                                        >
                                            {processingId === agent._id ? (
                                                <FaSpinner className="animate-spin mr-2" />
                                            ) : (
                                                <FaTimes className="mr-2" />
                                            )}
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Agent Details Modal */}
            {selectedAgent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
                        <h2 className="text-xl font-semibold text-gray-100 mb-4">Agent Details</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-gray-400">Personal Information</h3>
                                    <p className="text-white">Name: {selectedAgent.name}</p>
                                    <p className="text-white">Email: {selectedAgent.email}</p>
                                    <p className="text-white">Phone: {selectedAgent.phone}</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-400">Professional Information</h3>
                                    <p className="text-white">License: {selectedAgent.licenseNumber}</p>
                                    <p className="text-white">Experience: {selectedAgent.experience}</p>
                                    <p className="text-white">Specialization: {selectedAgent.specialization}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-gray-400">Additional Information</h3>
                                <p className="text-white">{selectedAgent.about}</p>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setSelectedAgent(null)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
