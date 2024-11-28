import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../../assets/housify.png";

function Footer() {
  return (
    <footer className="bg-zinc-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <NavLink to="/" className="block">
              <img className="h-10" src={logo} alt="Housify Logo" />
            </NavLink>
            <p className="text-gray-400 mb-4">
              Your trusted partner in finding the perfect property. We connect property seekers with expert agents across Nigeria.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-500 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-purple-500 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-purple-500 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-purple-500 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="hover:text-purple-500 transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-purple-500 transition-colors">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/property" className="hover:text-purple-500 transition-colors">
                  Properties
                </NavLink>
              </li>
              <li>
                <NavLink to="/agent" className="hover:text-purple-500 transition-colors">
                  Find Agents
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className="hover:text-purple-500 transition-colors">
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-purple-500 transition-colors">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* For Agents */}
          <div>
            <h3 className="text-xl font-semibold mb-4">For Agents</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/agent-registration" className="hover:text-purple-500 transition-colors">
                  Become an Agent
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="hover:text-purple-500 transition-colors">
                  Agent Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/agentDashboard" className="hover:text-purple-500 transition-colors">
                  Agent Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/agent/pricing" className="hover:text-purple-500 transition-colors">
                  Pricing & Plans
                </NavLink>
              </li>
              <li>
                <NavLink to="/agent/resources" className="hover:text-purple-500 transition-colors">
                  Agent Resources
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <div className="space-y-4">
              <p className="text-gray-400">
                Subscribe to our newsletter for updates and exclusive property listings.
              </p>
              <form className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 bg-purple-800 border border-purple-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Subscribe
                </button>
              </form>
              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <FaPhone className="mr-2" size={16} />
                  <span className="text-sm">+234 703 908 0311</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <FaEnvelope className="mr-2" size={16} />
                  <span className="text-sm">contact@housify.com</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <FaMapMarkerAlt className="mr-2" size={16} />
                  <span className="text-sm">Lagos, Nigeria</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Housify. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
