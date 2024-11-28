import React from "react";
import { 
  FaShieldAlt, 
  FaUserCheck, 
  FaChartLine, 
  FaClock,
  FaMoneyBillWave,
  FaHeadset
} from "react-icons/fa";

const Credibility = (props) => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Verified Properties",
      description: "Every listing is verified by our team to ensure authenticity and prevent fraud."
    },
    {
      icon: <FaUserCheck />,
      title: "Certified Agents",
      description: "Work with thoroughly vetted and licensed real estate professionals."
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Transparent Pricing",
      description: "Clear pricing on all properties with no hidden fees or surprise charges."
    },
    {
      icon: <FaChartLine />,
      title: "Market Insights",
      description: "Access real-time market data and trends to make informed decisions."
    },
    {
      icon: <FaClock />,
      title: "Fast Response",
      description: "Quick response times from agents and our support team."
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your real estate needs."
    }
  ];

  return (
    <div className="max-w-[1440px] mx-auto py-20 px-6">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{props.header}</h2>
        <p className="text-xl text-gray-400">{props.text}</p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-zinc-800/50 rounded-xl p-8 hover:bg-zinc-800 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-600/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl text-purple-500">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
        <div className="p-6">
          <h4 className="text-3xl font-bold text-purple-500 mb-2">50K+</h4>
          <p className="text-gray-400">Happy Users</p>
        </div>
        <div className="p-6">
          <h4 className="text-3xl font-bold text-purple-500 mb-2">10K+</h4>
          <p className="text-gray-400">Properties Listed</p>
        </div>
        <div className="p-6">
          <h4 className="text-3xl font-bold text-purple-500 mb-2">1K+</h4>
          <p className="text-gray-400">Verified Agents</p>
        </div>
        <div className="p-6">
          <h4 className="text-3xl font-bold text-purple-500 mb-2">5K+</h4>
          <p className="text-gray-400">Successful Deals</p>
        </div>
      </div>
    </div>
  );
};

export default Credibility;
