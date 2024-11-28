import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import { FaSearch, FaEye, FaTrash, FaCheck, FaTimes, FaUndo } from 'react-icons/fa';

const ManageAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [counts, setCounts] = useState({});

  useEffect(() => {
    fetchAgents();
    fetchCounts();
  }, [selectedStatus]);

  const fetchCounts = async () => {
    try {
      const response = await axiosInstance.get('/api/admin/manage/agents/counts');
      if (response.data.success) {
        setCounts(response.data.counts);
      }
    } catch (error) {
      console.error('Error fetching agent counts:', error);
    }
  };

  const fetchAgents = async () => {
    try {
      setLoading(true);
      console.log('Fetching agents...');
      const url = selectedStatus === 'all' 
        ? '/api/admin/manage/agents/all'
        : `/api/admin/manage/agents/all?status=${selectedStatus}`;
        
      const response = await axiosInstance.get(url);
      console.log('Agent response:', response.data);
      
      if (response.data.success) {
        setAgents(response.data.agents);
      } else {
        toast.error('Failed to fetch agents: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (agentId, newStatus) => {
    try {
      const response = await axiosInstance.put(`/api/admin/manage/agents/${agentId}/status`, {
        status: newStatus
      });
      
      if (response.data.success) {
        toast.success(`Agent ${newStatus} successfully`);
        fetchAgents();
        fetchCounts();
      } else {
        toast.error('Failed to update agent status: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error updating agent status:', error);
      toast.error(error.response?.data?.message || 'Failed to update agent status');
    }
  };

  const handleDeleteAgent = async (agentId) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      try {
        const response = await axiosInstance.delete(`/api/admin/manage/agents/${agentId}`);
        
        if (response.data.success) {
          toast.success('Agent deleted successfully');
          fetchAgents();
          fetchCounts();
        } else {
          toast.error('Failed to delete agent: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error deleting agent:', error);
        toast.error(error.response?.data?.message || 'Failed to delete agent');
      }
    }
  };

  const getStatusActions = (agent) => {
    switch (agent.status) {
      case 'pending':
        return (
          <>
            <button
              onClick={() => handleStatusChange(agent._id, 'approved')}
              className="p-2 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/30"
              title="Approve Agent"
            >
              <FaCheck />
            </button>
            <button
              onClick={() => handleStatusChange(agent._id, 'rejected')}
              className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30"
              title="Reject Agent"
            >
              <FaTimes />
            </button>
          </>
        );
      case 'approved':
        return (
          <button
            onClick={() => handleStatusChange(agent._id, 'suspended')}
            className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30"
            title="Suspend Agent"
          >
            <FaTimes />
          </button>
        );
      case 'suspended':
      case 'rejected':
        return (
          <button
            onClick={() => handleStatusChange(agent._id, 'approved')}
            className="p-2 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/30"
            title="Reactivate Agent"
          >
            <FaUndo />
          </button>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'suspended':
        return 'bg-orange-500/20 text-orange-400';
      case 'rejected':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getFullName = (agent) => {
    return `${agent.firstName || ''} ${agent.lastName || ''}`.trim() || 'N/A';
  };

  const matchesSearch = (agent) => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    const fullName = getFullName(agent).toLowerCase();
    const email = (agent.email || '').toLowerCase();
    const phone = (agent.phone || '').toLowerCase();
    const license = (agent.licenseNumber || '').toLowerCase();
    
    return fullName.includes(search) ||
           email.includes(search) ||
           phone.includes(search) ||
           license.includes(search);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Manage Agents</h2>
        
        {/* Status Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          {['all', 'pending', 'approved', 'rejected', 'suspended'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg ${
                selectedStatus === status
                  ? 'bg-blue-500 text-white'
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {counts[status] !== undefined && ` (${counts[status]})`}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-4 bg-zinc-800 rounded-lg p-2">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or license..."
            className="bg-transparent text-white outline-none flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading agents...</div>
      ) : agents.length === 0 ? (
        <div className="text-center text-gray-400">
          No {selectedStatus !== 'all' ? selectedStatus : ''} agents found
        </div>
      ) : (
        <div className="grid gap-6">
          {agents
            .filter(matchesSearch)
            .map((agent) => (
              <div
                key={agent._id}
                className="bg-zinc-800 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">{getFullName(agent)}</h3>
                  <p className="text-gray-400">{agent.email}</p>
                  <p className="text-sm text-gray-500">License: {agent.licenseNumber || 'N/A'}</p>
                  <p className="text-sm text-gray-500">Phone: {agent.phone || 'N/A'}</p>
                  {agent.specialization && (
                    <p className="text-sm text-gray-500">Specialization: {agent.specialization}</p>
                  )}
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(agent.status)}`}>
                      {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {getStatusActions(agent)}
                  <button
                    onClick={() => handleDeleteAgent(agent._id)}
                    className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    title="Delete Agent"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ManageAgents;
