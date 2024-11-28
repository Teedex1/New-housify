import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../utils/PropertyCard";
import { filterOptions } from "../../data/allProperties";

const FeaturedProperty = ({ items, text, header, showFilters = false }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    state: "All States",
    purpose: "All Purposes",
    type: "All Types",
    priceRange: "All Prices"
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredItems = items.filter(item => {
    if (filters.state !== "All States" && item.state !== filters.state) return false;
    if (filters.purpose !== "All Purposes" && item.purpose !== filters.purpose) return false;
    if (filters.type !== "All Types" && item.type !== filters.type) return false;
    
    if (filters.priceRange !== "All Prices") {
      const price = parseInt(item.price.replace(/[^0-9]/g, ""));
      switch (filters.priceRange) {
        case "Under ₦100M":
          if (price >= 100000000) return false;
          break;
        case "₦100M - ₦200M":
          if (price < 100000000 || price >= 200000000) return false;
          break;
        case "₦200M - ₦300M":
          if (price < 200000000 || price >= 300000000) return false;
          break;
        case "Above ₦300M":
          if (price < 300000000) return false;
          break;
        default:
          break;
      }
    }
    return true;
  });

  return (
    <div className="w-full bg-zinc-900 py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">{header}</h2>
          <p className="text-gray-300 text-lg">{text}</p>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* State Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Location</label>
                <select
                  className="w-full p-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={filters.state}
                  onChange={(e) => handleFilterChange("state", e.target.value)}
                >
                  {filterOptions.states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* Purpose Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Purpose</label>
                <select
                  className="w-full p-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={filters.purpose}
                  onChange={(e) => handleFilterChange("purpose", e.target.value)}
                >
                  {filterOptions.purposes.map(purpose => (
                    <option key={purpose} value={purpose}>{purpose}</option>
                  ))}
                </select>
              </div>

              {/* Property Type Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Property Type</label>
                <select
                  className="w-full p-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                >
                  {filterOptions.propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Price Range</label>
                <select
                  className="w-full p-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                >
                  {filterOptions.priceRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(({ id, title, url, price, purpose, state, type, bedrooms, bathrooms }) => (
            <div key={id} className="transform transition-all duration-300 hover:-translate-y-2">
              <PropertyCard
                id={id}
                url={url}
                price={price}
                state={state}
                purpose={purpose}
                title={title}
                type={type}
                bedrooms={bedrooms}
                bathrooms={bathrooms}
              />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate('/property')}
            className="inline-flex items-center px-8 py-3 bg-purple-700 text-white font-semibold rounded-full hover:bg-pink-700 transition-colors duration-300 transform hover:scale-105"
          >
            Load More Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperty;
