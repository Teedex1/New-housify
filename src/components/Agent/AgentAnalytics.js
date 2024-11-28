import React, { useState, useEffect } from 'react';
import { FaChartLine, FaEye, FaHome, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';

const AgentAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d, 90d
  const [analytics, setAnalytics] = useState({
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    viewsOverTime: [],
    leadConversions: 0,
    popularListings: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/agent/analytics?timeRange=' + timeRange);
      setAnalytics(response.data);
    } catch (error) {
      toast.error('Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-800 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-600 rounded-lg">
              <FaHome className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-gray-400 text-sm">Total Listings</p>
              <h3 className="text-2xl font-bold text-white">{analytics.totalListings}</h3>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-600 rounded-lg">
              <FaChartLine className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-gray-400 text-sm">Active Listings</p>
              <h3 className="text-2xl font-bold text-white">{analytics.activeListings}</h3>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-600 rounded-lg">
              <FaEye className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-gray-400 text-sm">Total Views</p>
              <h3 className="text-2xl font-bold text-white">{analytics.totalViews}</h3>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-600 rounded-lg">
              <FaUser className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-gray-400 text-sm">Lead Conversions</p>
              <h3 className="text-2xl font-bold text-white">{analytics.leadConversions}%</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Listings */}
      <div className="bg-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Popular Listings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="pb-4">Property</th>
                <th className="pb-4">Views</th>
                <th className="pb-4">Leads</th>
                <th className="pb-4">Conversion Rate</th>
              </tr>
            </thead>
            <tbody>
              {analytics.popularListings.map((listing) => (
                <tr key={listing._id} className="border-t border-zinc-700">
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <div className="text-sm font-medium text-white">
                          {listing.title}
                        </div>
                        <div className="text-sm text-gray-400">{listing.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-400">{listing.views}</td>
                  <td className="py-4 text-sm text-gray-400">{listing.leads}</td>
                  <td className="py-4 text-sm text-gray-400">
                    {((listing.leads / listing.views) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentAnalytics;
