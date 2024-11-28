import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SellIcon from '@mui/icons-material/Sell';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const AgentStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      <div className="bg-zinc-800 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <HomeIcon className="text-purple-500" />
          <span className="text-gray-300 text-sm">Active Listings</span>
        </div>
        <p className="text-2xl font-bold text-white">{stats.activeListings}</p>
      </div>

      <div className="bg-zinc-800 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <SellIcon className="text-purple-500" />
          <span className="text-gray-300 text-sm">Properties Sold</span>
        </div>
        <p className="text-2xl font-bold text-white">{stats.propertiesSold}</p>
      </div>

      <div className="bg-zinc-800 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <StarIcon className="text-purple-500" />
          <span className="text-gray-300 text-sm">Average Rating</span>
        </div>
        <p className="text-2xl font-bold text-white">{stats.averageRating.toFixed(1)}</p>
      </div>

      <div className="bg-zinc-800 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <AccessTimeIcon className="text-purple-500" />
          <span className="text-gray-300 text-sm">Response Time</span>
        </div>
        <p className="text-2xl font-bold text-white">{stats.responseTime}</p>
      </div>
    </div>
  );
};

export default AgentStats;
