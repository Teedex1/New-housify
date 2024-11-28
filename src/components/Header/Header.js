import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logo from "../../assets/housify.png";

function Header() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="w-full h-[80px] bg-zinc-900">
      <div className="max-w-[1240px] mx-auto px-4 flex justify-between items-center h-full">
        <div className="flex items-center">
          <NavLink to="/">
            <img className="h-10" src={logo} alt="Housify Logo" />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <nav className="flex items-center">
            <NavLink to="/" className={({ isActive }) => (isActive ? "text-purple-500 block p-3 text-lg navlink" : "block p-3 text-lg navlink")}>
              Home
            </NavLink>
            <NavLink to="/property" className={({ isActive }) => (isActive ? "text-purple-500 block p-3 text-lg navlink" : "block p-3 text-lg navlink")}>
              Properties
            </NavLink>
            <NavLink to="/agents" className={({ isActive }) => (isActive ? "text-purple-500 block p-3 text-lg navlink" : "block p-3 text-lg navlink")}>
              Agents
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "text-purple-500 block p-3 text-lg navlink" : "block p-3 text-lg navlink")}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-purple-500 block p-3 text-lg navlink" : "block p-3 text-lg navlink")}>
              Contact
            </NavLink>
          </nav>
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <NavLink
            to="/login"
            className="px-6 py-2 bg-purple-500 text-white hover:bg-purple-600 rounded-lg transition-colors"
          >
            Login
          </NavLink>
          <NavLink
            to="/agent/signin"
            className="px-6 py-2 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white rounded-lg transition-colors"
          >
            For Agents
          </NavLink>
        </div>

        {/* Hamburger Menu */}
        <div className="lg:hidden">
          <button
            onClick={handleNav}
            className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {nav && (
          <div className="lg:hidden fixed top-[80px] left-0 w-full bg-zinc-900 py-4">
            <nav className="flex flex-col items-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-purple-500 p-3 text-lg" : "text-white p-3 text-lg"
                }
                onClick={() => setNav(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/property"
                className={({ isActive }) =>
                  isActive ? "text-purple-500 p-3 text-lg" : "text-white p-3 text-lg"
                }
                onClick={() => setNav(false)}
              >
                Properties
              </NavLink>
              <NavLink
                to="/agents"
                className={({ isActive }) =>
                  isActive ? "text-purple-500 p-3 text-lg" : "text-white p-3 text-lg"
                }
                onClick={() => setNav(false)}
              >
                Agents
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-purple-500 p-3 text-lg" : "text-white p-3 text-lg"
                }
                onClick={() => setNav(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-purple-500 p-3 text-lg" : "text-white p-3 text-lg"
                }
                onClick={() => setNav(false)}
              >
                Contact
              </NavLink>
              {/* Mobile Auth Button */}
              <div className="mt-4 flex flex-col items-center space-y-4">
                <NavLink
                  to="/login"
                  className="px-6 py-2 bg-purple-500 text-white hover:bg-purple-600 rounded-lg transition-colors"
                  onClick={() => setNav(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/agent/signin"
                  className="px-6 py-2 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white rounded-lg transition-colors"
                  onClick={() => setNav(false)}
                >
                  For Agents
                </NavLink>
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
