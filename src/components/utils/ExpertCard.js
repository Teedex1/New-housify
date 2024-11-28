import React from "react";
import { NavLink } from "react-router-dom";
import { FaLinkedin, FaPhone, FaStar } from "react-icons/fa";

const ExpertCard = (props) => {
  return (
    <div className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:translate-y-[-4px]">
      {/* Image Container */}
      <div className="relative h-[240px] overflow-hidden">
        <img 
          className="w-full h-full object-cover" 
          src={props.img} 
          alt={props.name} 
        />
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
          <FaStar className="mr-1" /> 4.8
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Agent Info */}
        <div className="mb-4">
          <h3 className="text-white text-xl font-semibold mb-1">{props.name}</h3>
          <p className="text-gray-400 text-sm">
            {props.title || "Real Estate Professional"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-center">
          <div className="bg-zinc-700/50 rounded-lg p-2">
            <p className="text-purple-400 font-semibold">15+</p>
            <p className="text-gray-400 text-sm">Properties</p>
          </div>
          <div className="bg-zinc-700/50 rounded-lg p-2">
            <p className="text-purple-400 font-semibold">98%</p>
            <p className="text-gray-400 text-sm">Success Rate</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <NavLink
            to={`/agent/${props.id}`}
            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-center"
          >
            View Profile
          </NavLink>
          <button 
            onClick={() => window.location.href = `tel:${props.contact}`}
            className="bg-zinc-700 text-white p-2 rounded-lg hover:bg-zinc-600 transition-colors"
            title="Contact Agent"
          >
            <FaPhone />
          </button>
          {props.linkedin && (
            <a 
              href={props.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-700 text-white p-2 rounded-lg hover:bg-zinc-600 transition-colors"
              title="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;
