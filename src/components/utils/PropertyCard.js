import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import SellIcon from '@mui/icons-material/Sell';
import PropertyDetails from '../Property/PropertyDetails';

const PropertyCard = ({ id, url, price, purpose, state, title, type, bedrooms, bathrooms }) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const property = {
    url,
    price,
    purpose,
    state,
    title,
    type,
    bedrooms: bedrooms || 4,
    bathrooms: bathrooms || 3
  };

  return (
    <>
      <div className="bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img 
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" 
            src={url} 
            alt={title} 
          />
          <div className="absolute top-4 right-4">
            <span className="bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {purpose}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 space-y-4">
          {/* Price */}
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">{price}</h3>
            <span className="text-purple-500">
              <HomeIcon className="text-xl" />
            </span>
          </div>

          {/* Title */}
          <h4 className="text-lg font-semibold text-gray-200 line-clamp-2">
            {title}
          </h4>

          {/* Details */}
          <div className="flex flex-wrap items-center gap-4 text-gray-400">
            <div className="flex items-center gap-1">
              <LocationOnIcon className="text-purple-500" />
              <span>{state}</span>
            </div>
            <div className="flex items-center gap-1">
              <SellIcon className="text-purple-500" />
              <span>{type}</span>
            </div>
          </div>

          {/* View Details Button */}
          <button 
            onClick={() => navigate(`/property/${id}`)}
            className="w-full mt-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Property Details Modal */}
      {showDetails && (
        <PropertyDetails 
          property={property}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default PropertyCard;
