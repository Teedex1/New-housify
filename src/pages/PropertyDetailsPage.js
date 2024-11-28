import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import SellIcon from '@mui/icons-material/Sell';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { allProperties } from '../data/allProperties';
import ImageGallery from '../components/Property/ImageGallery';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the property by ID, convert string ID to number
  const property = allProperties.find(p => p.id === parseInt(id)) || allProperties[0];
  const { agent } = property;

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Navigation Bar */}
      <div className="bg-zinc-800 py-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowBackIcon />
            <span>Back to Properties</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{property.title}</h1>
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <LocationOnIcon />
              <span>{property.state}</span>
            </div>
            <div className="flex items-center gap-2">
              <HomeIcon />
              <span>{property.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <SellIcon />
              <span>{property.purpose}</span>
            </div>
          </div>
        </div>

        {/* Property Image and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Property Images */}
          <ImageGallery images={property.images} />

          {/* Property Details */}
          <div className="bg-zinc-800 rounded-2xl p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{property.price}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <BedIcon />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <BathtubIcon />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
              </div>
            </div>

            {/* Agent Information */}
            <div className="border-t border-zinc-700 pt-8">
              <h3 className="text-2xl font-bold text-white mb-6">Property Agent</h3>
              <div className="flex items-start gap-6">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">{agent.name}</h4>
                  <p className="text-purple-500 mb-4">{agent.title}</p>
                  <div className="space-y-3">
                    <p className="text-gray-400">Experience: {agent.experience}</p>
                    <p className="text-gray-400">Properties: {agent.properties}</p>
                    <p className="text-gray-400">Specialization: {agent.specialization}</p>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <button
                  onClick={() => window.location.href = `tel:${agent.phone}`}
                  className="flex items-center justify-center gap-2 bg-purple-700 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <PhoneIcon />
                  <span>Call Agent</span>
                </button>
                <button
                  onClick={() => window.location.href = `mailto:${agent.email}`}
                  className="flex items-center justify-center gap-2 bg-zinc-700 text-white py-3 px-6 rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  <EmailIcon />
                  <span>Email Agent</span>
                </button>
                <button
                  onClick={() => window.location.href = `https://wa.me/${agent.whatsapp}`}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-500 transition-colors"
                >
                  <WhatsAppIcon />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
