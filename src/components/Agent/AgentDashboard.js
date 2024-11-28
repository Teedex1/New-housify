import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { FaHome, FaUser, FaChartLine, FaListAlt, FaBell, FaCog, FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";

function AgentDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [agentData, setAgentData] = useState(null);
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    viewsThisMonth: 0,
    leadsGenerated: 0
  });
  const [recentListings, setRecentListings] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [sectionLoading, setSectionLoading] = useState({
    stats: false,
    listings: false,
    leads: false
  });

  // Fetch agent data
  const fetchAgentData = async () => {
    try {
      const response = await axiosInstance.get('/api/agent/profile');
      setAgentData(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/agent/signin');
      }
      console.error('Error fetching agent data:', error);
    }
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      await fetchAgentData();

      // Fetch stats
      setSectionLoading(prev => ({ ...prev, stats: true }));
      const statsRes = await axiosInstance.get('/api/agent/stats');
      setStats(statsRes.data);
      setSectionLoading(prev => ({ ...prev, stats: false }));

      // Fetch listings
      setSectionLoading(prev => ({ ...prev, listings: true }));
      const listingsRes = await axiosInstance.get('/api/agent/listings');
      setRecentListings(listingsRes.data);
      setSectionLoading(prev => ({ ...prev, listings: false }));

      // Fetch leads
      setSectionLoading(prev => ({ ...prev, leads: true }));
      const leadsRes = await axiosInstance.get('/api/agent/leads');
      setRecentLeads(leadsRes.data);
      setSectionLoading(prev => ({ ...prev, leads: false }));
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/agent/signin');
        return;
      }
      toast.error('Error loading dashboard data');
      console.error('Dashboard data error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Handle new property listing
  const handleNewListing = () => {
    navigate('/list-property');
  };

  // Handle settings click
  const handleSettingsClick = () => {
    navigate('/agent-dashboard/settings');
  };

  // Handle notifications click
  const handleNotificationsClick = () => {
    navigate('/agent-dashboard/notifications');
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white">Agent Dashboard</h1>
                <p className="text-gray-400 mt-1">Welcome back, {agentData?.name || 'Agent'}</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <button 
                  onClick={handleNewListing}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
                >
                  <FaPlus className="mr-2" />
                  List New Property
                </button>
                <button 
                  onClick={handleNotificationsClick}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FaBell size={20} />
                </button>
                <button 
                  onClick={handleSettingsClick}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FaCog size={20} />
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {sectionLoading.stats ? (
                <div className="col-span-4 flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                <>
                  <div className="bg-zinc-800 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-600 rounded-lg">
                        <FaHome className="text-white" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-400 text-sm">Total Listings</p>
                        <h3 className="text-2xl font-bold text-white">{stats.totalListings}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="bg-zinc-800 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-600 rounded-lg">
                        <FaListAlt className="text-white" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-400 text-sm">Active Listings</p>
                        <h3 className="text-2xl font-bold text-white">{stats.activeListings}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="bg-zinc-800 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-600 rounded-lg">
                        <FaChartLine className="text-white" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-400 text-sm">Views This Month</p>
                        <h3 className="text-2xl font-bold text-white">{stats.viewsThisMonth}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="bg-zinc-800 p-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-3 bg-yellow-600 rounded-lg">
                        <FaUser className="text-white" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-400 text-sm">Leads Generated</p>
                        <h3 className="text-2xl font-bold text-white">{stats.leadsGenerated}</h3>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Recent Listings */}
            <div className="bg-zinc-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Recent Listings</h2>
              {sectionLoading.listings ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : recentListings.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No recent listings</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 text-sm">
                        <th className="pb-4">Property</th>
                        <th className="pb-4">Location</th>
                        <th className="pb-4">Price</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4">Views</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentListings.map((listing) => (
                        <tr key={listing._id} className="border-t border-zinc-700">
                          <td className="py-4">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <div className="text-sm font-medium text-white">{listing.title}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-gray-400">{listing.location}</td>
                          <td className="py-4 text-sm text-white">{formatCurrency(listing.price)}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              listing.status === 'active' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                            }`}>
                              {listing.status}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-gray-400">{listing.views}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent Leads */}
            <div className="bg-zinc-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Recent Leads</h2>
              {sectionLoading.leads ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : recentLeads.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No recent leads</p>
              ) : (
                <div className="space-y-4">
                  {recentLeads.map((lead) => (
                    <div key={lead._id} className="border-t border-zinc-700 pt-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                            <span className="text-white font-medium">{lead.name.charAt(0)}</span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-white">{lead.name}</div>
                          <div className="text-sm text-gray-400">{lead.email}</div>
                          <div className="text-sm text-gray-400 mt-1">
                            Interested in: {lead.property.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{formatDate(lead.createdAt)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AgentDashboard;
