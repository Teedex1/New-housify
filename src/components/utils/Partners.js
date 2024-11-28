import React from "react";
import { FaBuilding, FaHandshake, FaChartLine, FaShieldAlt } from "react-icons/fa";

const PartnerCard = ({ icon: Icon, name, description }) => (
  <div className="flex flex-col items-center p-8 bg-zinc-900/50 rounded-xl hover:bg-zinc-900 transition-all duration-300 group">
    <div className="w-16 h-16 bg-purple-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600/20 transition-all duration-300">
      <Icon className="text-3xl text-purple-500" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{name}</h3>
    <p className="text-gray-400 text-center">{description}</p>
  </div>
);

const Partners = () => {
  const partners = [
    {
      icon: FaBuilding,
      name: "Premium Properties",
      description: "Leading real estate developers with a track record of excellence"
    },
    {
      icon: FaHandshake,
      name: "Trusted Partners",
      description: "Network of verified and licensed real estate professionals"
    },
    {
      icon: FaChartLine,
      name: "Market Leaders",
      description: "Top performers in the Nigerian real estate market"
    },
    {
      icon: FaShieldAlt,
      name: "Verified Agents",
      description: "Thoroughly vetted and certified property experts"
    }
  ];

  return (
    <div className="Partners">
      <div className="w-full">
        <div className="max-w-[1440px] mx-auto py-4 px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <PartnerCard key={index} {...partner} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join forces with Nigeria's most trusted real estate platform. 
              Our partners enjoy exclusive benefits and access to premium listings.
            </p>
            <button 
              onClick={() => window.location.href = '/support/partnerships'}
              className="mt-6 px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              Become a Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
