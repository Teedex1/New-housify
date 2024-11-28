import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { FaHome, FaChartLine, FaUsers, FaMobile, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const AgentLandingPage = () => {
  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-purple-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Grow Your Real Estate Business with Housify
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              Join Nigeria's fastest-growing real estate platform and connect with serious property seekers
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/agent-registration"
                className="px-8 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-100 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/loginForm"
                className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose Housify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit Cards */}
            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <FaHome className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Premium Listings
              </h3>
              <p className="text-gray-400">
                Showcase your properties with high-quality listings that attract serious buyers and renters.
              </p>
            </div>

            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Performance Analytics
              </h3>
              <p className="text-gray-400">
                Track your listings' performance with detailed analytics and insights.
              </p>
            </div>

            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Quality Leads
              </h3>
              <p className="text-gray-400">
                Connect with verified buyers and renters who are actively looking for properties.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Powerful Features for Agents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-purple-500 text-xl flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Professional Dashboard
                </h3>
                <p className="text-gray-400">
                  Manage your listings, leads, and client communications all in one place.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-purple-500 text-xl flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Mobile App Access
                </h3>
                <p className="text-gray-400">
                  Stay connected with clients and manage your business on the go.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-purple-500 text-xl flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Marketing Tools
                </h3>
                <p className="text-gray-400">
                  Access promotional tools and templates to market your properties effectively.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-purple-500 text-xl flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Training Resources
                </h3>
                <p className="text-gray-400">
                  Access exclusive training materials and industry insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-purple-900 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-purple-200 mb-8">
              Join thousands of successful agents on Housify
            </p>
            <Link
              to="/agent-registration"
              className="inline-flex items-center px-8 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-100 transition-colors"
            >
              Get Started Now
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AgentLandingPage;
