import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaChartBar, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        navigate('/admin/login');
    };

    const isActive = (path) => {
        return location.pathname === path ? 'bg-purple-700' : '';
    };

    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-gray-100">
                <div className="p-4">
                    <h2 className="text-2xl font-bold text-purple-500">Admin Panel</h2>
                </div>
                <nav className="mt-8 space-y-2">
                    <Link
                        to="/admin/dashboard"
                        className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${isActive('/admin/dashboard') ? 'bg-purple-500 text-white' : 'text-gray-300 hover:bg-zinc-800'}`}
                    >
                        <FaHome size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        to="/admin/agents"
                        className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${isActive('/admin/agents') ? 'bg-purple-500 text-white' : 'text-gray-300 hover:bg-zinc-800'}`}
                    >
                        <FaUsers size={20} />
                        <span>Manage Agents</span>
                    </Link>
                    <Link
                        to="/admin/analytics"
                        className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${isActive('/admin/analytics') ? 'bg-purple-500 text-white' : 'text-gray-300 hover:bg-zinc-800'}`}
                    >
                        <FaChartBar size={20} />
                        <span>Analytics</span>
                    </Link>
                    <Link
                        to="/admin/settings"
                        className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${isActive('/admin/settings') ? 'bg-purple-500 text-white' : 'text-gray-300 hover:bg-zinc-800'}`}
                    >
                        <FaCog size={20} />
                        <span>Settings</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 hover:bg-purple-700 transition-colors text-left"
                    >
                        <FaSignOutAlt className="mr-3" />
                        Logout
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-gray-800 shadow-lg">
                    <div className="max-w-7xl mx-auto py-4 px-6">
                        <h1 className="text-2xl font-bold text-gray-100">
                            {location.pathname === '/admin/dashboard' && 'Dashboard'}
                            {location.pathname === '/admin/agents' && 'Manage Agents'}
                            {location.pathname === '/admin/analytics' && 'Analytics'}
                            {location.pathname === '/admin/settings' && 'Settings'}
                        </h1>
                    </div>
                </header>
                <main className="max-w-7xl mx-auto py-6 px-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardLayout;
