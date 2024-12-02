import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaListAlt, FaUser, FaChartLine, FaEnvelope, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useAuth } from '../../context/AuthContext';

const AgentDashboardLayout = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/agent-dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/agent-dashboard/properties', icon: FaListAlt, label: 'Properties' },
    { path: '/agent-dashboard/leads', icon: FaEnvelope, label: 'Leads' },
    { path: '/agent-dashboard/analytics', icon: FaChartLine, label: 'Analytics' },
    { path: '/agent-dashboard/profile', icon: FaUser, label: 'Profile' },
    { path: '/agent-dashboard/settings', icon: FaCog, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-zinc-800 min-h-[calc(100vh-80px)]">
          <nav className="flex-1 px-4 py-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:bg-zinc-700 hover:text-white'
                  }`
                }
              >
                <item.icon className="mr-3" />
                {item.label}
              </NavLink>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 mt-auto text-gray-400 hover:bg-zinc-700 hover:text-white rounded-lg transition-colors"
            >
              <FaSignOutAlt className="mr-3" />
              Sign Out
            </button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-800 border-t border-zinc-700 z-50">
          <nav className="flex justify-around py-3">
            {navItems.slice(0, 4).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center px-3 ${
                    isActive ? 'text-purple-500' : 'text-gray-400'
                  }`
                }
              >
                <item.icon className="text-xl mb-1" />
                <span className="text-xs">{item.label}</span>
              </NavLink>
            ))}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col items-center px-3 text-gray-400"
            >
              <FaUser className="text-xl mb-1" />
              <span className="text-xs">More</span>
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="absolute bottom-16 left-0 right-0 bg-zinc-800 p-4">
              {navItems.slice(4).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 mb-2 rounded-lg ${
                      isActive
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:bg-zinc-700 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="mr-3" />
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-gray-400 hover:bg-zinc-700 hover:text-white rounded-lg"
              >
                <FaSignOutAlt className="mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AgentDashboardLayout;
