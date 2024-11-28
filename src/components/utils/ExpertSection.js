import React from "react";
import ExpertCard from "./ExpertCard";
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

// Importing images
import LucyImage from "../../assets/Zeliq.jpg";
import ZeliphaImage from "../../assets/Headshot.jpg";
import MildredImage from "../../assets/Zeliq.jpg";
import RobertImage from "../../assets/Zeliq.jpg";

const ExpertSection = ({ header, text, showCTA = false }) => {
  return (
    <div className="w-full bg-zinc-900/50">
      <div className="max-w-[1440px] mx-auto py-20 px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{header}</h2>
          <p className="text-gray-400 text-lg">{text}</p>
        </div>

        {/* Agents Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ExpertCard 
            name="Agent Ruth"
            img={LucyImage}
            title="Luxury Property Specialist"
            linkedin="https://linkedin.com"
            contact="+2348123456789"
          />
          <ExpertCard 
            name="Tunde Ogunmodede"
            img={ZeliphaImage}
            title="Commercial Real Estate"
            linkedin="https://linkedin.com"
            contact="+2348123456789"
          />
          <ExpertCard 
            name="Angelina A"
            img={MildredImage}
            title="Residential Expert"
            linkedin="https://linkedin.com"
            contact="+2348123456789"
          />
          <ExpertCard 
            name="Angela B"
            img={RobertImage}
            title="Investment Advisor"
            linkedin="https://linkedin.com"
            contact="+2348123456789"
          />
        </div>

        {/* Agent Registration CTA - Only shown when showCTA is true */}
        {showCTA && (
          <div className="mt-20 max-w-2xl mx-auto text-center bg-gradient-to-r from-purple-900/20 to-zinc-800/20 p-10 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Are You a Real Estate Professional?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              Join Housify's network of trusted real estate agents. Expand your reach and connect with serious property seekers across Nigeria.
            </p>
            <NavLink 
              to="/agent/register"
              className="inline-flex items-center bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 group"
            >
              Join as an Agent
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertSection;
