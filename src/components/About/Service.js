import React from "react";
import { 
  FaSearchLocation, 
  FaShieldAlt, 
  FaHandshake, 
  FaChartLine,
  FaMobileAlt,
  FaClock
} from "react-icons/fa";

const Service = (props) => {
  const services = [
    {
      icon: <FaSearchLocation />,
      title: "Nationwide Coverage",
      description: "Access properties across all major cities and regions in Nigeria, with detailed neighborhood insights and market analysis."
    },
    {
      icon: <FaShieldAlt />,
      title: "Verified Listings",
      description: "Every property undergoes our rigorous verification process to ensure authenticity and prevent fraud."
    },
    {
      icon: <FaHandshake />,
      title: "Professional Network",
      description: "Work with vetted real estate professionals, from agents to property managers, all certified by Housify."
    },
    {
      icon: <FaChartLine />,
      title: "Market Intelligence",
      description: "Make informed decisions with our real-time market data, pricing trends, and property valuations."
    },
    {
      icon: <FaMobileAlt />,
      title: "Digital Solutions",
      description: "Manage your entire property journey from your device - virtual tours, online documentation, and digital payments."
    },
    {
      icon: <FaClock />,
      title: "End-to-End Support",
      description: "From property search to final documentation, our team supports you at every step of your real estate journey."
    }
  ];

  return (
    <div className="bg-zinc-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h3 className="text-purple-600 text-lg font-medium mb-4">{props.label}</h3>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{props.header}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{props.text}</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-zinc-800/50 p-8 rounded-xl hover:bg-zinc-800 transition-all duration-300"
            >
              <div className="bg-purple-600/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl text-purple-500">{service.icon}</span>
              </div>
              <h4 className="text-white text-xl font-semibold mb-4">{service.title}</h4>
              <p className="text-gray-300 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => window.location.href = '/property'}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Explore Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;
