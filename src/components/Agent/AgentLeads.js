import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaWhatsapp, FaSearch, FaFilter } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';

const AgentLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/agent/leads');
      setLeads(response.data);
    } catch (error) {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (leadId, status) => {
    try {
      await axiosInstance.patch(\`/api/agent/leads/\${leadId}\`, { status });
      toast.success('Lead status updated');
      fetchLeads();
    } catch (error) {
      toast.error('Failed to update lead status');
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    
    try {
      await axiosInstance.post(\`/api/agent/leads/\${selectedLead._id}/reply\`, { message });
      toast.success('Reply sent successfully');
      setSelectedLead(null);
      e.target.reset();
    } catch (error) {
      toast.error('Failed to send reply');
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.property.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || lead.status === filter;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Leads Management</h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
        >
          <option value="all">All Leads</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {/* Leads List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredLeads.map((lead) => (
            <div key={lead._id} className="bg-zinc-800 rounded-lg p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium text-lg">{lead.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-white">{lead.name}</h3>
                      <div className="mt-1 flex items-center space-x-4">
                        <a href={`mailto:${lead.email}`} className="text-gray-400 hover:text-purple-400">
                          <FaEnvelope className="inline mr-1" /> {lead.email}
                        </a>
                        {lead.phone && (
                          <>
                            <a href={`tel:${lead.phone}`} className="text-gray-400 hover:text-purple-400">
                              <FaPhone className="inline mr-1" /> {lead.phone}
                            </a>
                            <a 
                              href={`https://wa.me/${lead.phone.replace(/\D/g,'')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-green-400"
                            >
                              <FaWhatsapp className="inline mr-1" /> WhatsApp
                            </a>
                          </>
                        )}
                      </div>
                      <div className="mt-2">
                        <p className="text-gray-400">
                          Interested in: <span className="text-white">{lead.property.title}</span>
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          Received: {formatDate(lead.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                    className="px-3 py-1 bg-zinc-700 border border-zinc-600 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                  </select>
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-500 transition-colors"
                  >
                    Reply
                  </button>
                </div>
              </div>

              {lead.message && (
                <div className="mt-4 p-4 bg-zinc-700 rounded-lg">
                  <p className="text-gray-300">{lead.message}</p>
                </div>
              )}
            </div>
          ))}

          {filteredLeads.length === 0 && (
            <div className="text-center py-12 bg-zinc-800 rounded-lg">
              <p className="text-gray-400">No leads found</p>
            </div>
          )}
        </div>
      )}

      {/* Reply Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold text-white mb-4">
              Reply to {selectedLead.name}
            </h3>
            <form onSubmit={handleReply}>
              <textarea
                name="message"
                rows="4"
                className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="Type your message here..."
                required
              ></textarea>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
                >
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentLeads;
