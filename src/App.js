// Polyfills for Node.js modules in Webpack 5
import { Buffer } from 'buffer';
import process from 'process';

// React and Router
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider } from './context/AuthContext';

// Components
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Property from "./components/Property/Property";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import Agent from "./components/Agent/Agent";
import AgentRegistration from "./components/Agent/AgentRegistration";
import Contact from "./components/Contact/Contact";
import Error from "./components/Error/Error";
import Login from "./components/Auth/Login";
import AgentDashboardAccess from "./components/Agent/AgentDashboardAccess";
import Support from "./components/Support/Support";

// Agent Dashboard Components
import RegistrationSuccessPage from "./pages/RegistrationSuccessPage";
import PendingApproval from "./components/Agent/PendingApproval";
import AgentDashboard from "./components/Agent/AgentDashboard";
import AgentDashboardLayout from "./components/Agent/AgentDashboardLayout";
import AgentAnalytics from "./components/Agent/AgentAnalytics";
import AgentProfile from "./components/Agent/AgentProfile";
import AgentSettings from "./components/Agent/AgentSettings";
import PropertyForm from "./components/Agent/PropertyForm";
import PrivateRoute from './components/PrivateRoute';

// Admin Components
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminDashboardLayout from './components/Admin/AdminDashboardLayout';
import AdminPrivateRoute from './components/Admin/AdminPrivateRoute';
import ManageAgents from './components/Admin/ManageAgents';

// Config
require('dotenv').config();
window.Buffer = Buffer;
window.process = process;

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/properties" element={<Property />} />
          <Route path="/properties/:id" element={<PropertyDetailsPage />} />
          <Route path="/agents" element={<Agent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agent/register" element={<AgentRegistration />} />
          <Route path="/agent/registration-success" element={<RegistrationSuccessPage />} />
          <Route path="/agent/pending-approval" element={<PendingApproval />} />

          {/* Agent Dashboard Routes */}
          <Route path="/agent/dashboard" element={
            <PrivateRoute requiredRole="agent">
              <AgentDashboardLayout>
                <AgentDashboard />
              </AgentDashboardLayout>
            </PrivateRoute>
          } />
          <Route path="/agent/analytics" element={
            <PrivateRoute requiredRole="agent">
              <AgentDashboardLayout>
                <AgentAnalytics />
              </AgentDashboardLayout>
            </PrivateRoute>
          } />
          <Route path="/agent/profile" element={
            <PrivateRoute requiredRole="agent">
              <AgentDashboardLayout>
                <AgentProfile />
              </AgentDashboardLayout>
            </PrivateRoute>
          } />
          <Route path="/agent/settings" element={
            <PrivateRoute requiredRole="agent">
              <AgentDashboardLayout>
                <AgentSettings />
              </AgentDashboardLayout>
            </PrivateRoute>
          } />
          <Route path="/agent/add-property" element={
            <PrivateRoute requiredRole="agent">
              <AgentDashboardLayout>
                <PropertyForm />
              </AgentDashboardLayout>
            </PrivateRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <AdminPrivateRoute>
              <AdminDashboardLayout>
                <AdminDashboard />
              </AdminDashboardLayout>
            </AdminPrivateRoute>
          } />
          <Route path="/admin/manage-agents" element={
            <AdminPrivateRoute>
              <AdminDashboardLayout>
                <ManageAgents />
              </AdminDashboardLayout>
            </AdminPrivateRoute>
          } />

          {/* Error Route */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;