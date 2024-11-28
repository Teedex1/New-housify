import React from "react";
import { FaSearch, FaHome, FaComments, FaHandshake } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const WorkStep = ({ icon: Icon, number, title, description, link, linkText, onClick }) => (
  <div className="group relative p-8 bg-zinc-900 rounded-2xl hover:bg-zinc-800/50 transition-all duration-300">
    {/* Step number */}
    <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
      {number}
    </div>
    
    {/* Content */}
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/10 mb-6">
        <Icon className="text-purple-500 text-3xl" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 mb-5 leading-relaxed">{description}</p>
      {link && (
        <NavLink 
          to={link}
          onClick={onClick}
          className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-400 font-medium hover:translate-x-1 transition-all duration-300"
        >
          {linkText}
          <span className="text-sm">→</span>
        </NavLink>
      )}
    </div>
    
    {/* Connector line (except for last item) */}
    {number < 4 && (
      <div className="hidden lg:block absolute top-1/2 -right-8 w-16 h-0.5 bg-purple-600/30"></div>
    )}
  </div>
);

const Works = () => {
  const navigate = useNavigate();

  const handlePropertySearch = () => {
    // Navigate to properties with search focus
    navigate('/property?focus=search');
  };

  const handleViewings = () => {
    // Navigate to properties with featured properties in view
    navigate('/property?section=featured');
  };

  const steps = [
    {
      icon: FaSearch,
      title: "Search Properties",
      description: "Browse our extensive collection of premium properties across Nigeria. Filter by location, price, and features to find your ideal match.",
      link: "/property",
      linkText: "Start Searching",
      onClick: handlePropertySearch,
      number: 1
    },
    {
      icon: FaHome,
      title: "Schedule Viewings",
      description: "Found properties you like? Schedule in-person or virtual viewings at your convenience. Experience your potential new home firsthand.",
      link: "/property",
      linkText: "View Properties",
      onClick: handleViewings,
      number: 2
    },
    {
      icon: FaComments,
      title: "Connect with Agents",
      description: "Our verified agents will guide you through the property details, answer your questions, and help you make informed decisions.",
      link: "/agent",
      linkText: "Meet Agents",
      number: 3
    },
    {
      icon: FaHandshake,
      title: "Close the Deal",
      description: "Ready to move forward? Our agents will assist with negotiations, paperwork, and ensure a smooth closing process.",
      link: "/contact",
      linkText: "Get Started",
      number: 4
    }
  ];

  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto py-16 px-6 md:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 relative">
          {steps.map((step) => (
            <WorkStep key={step.number} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
