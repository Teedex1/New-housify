import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import SellIcon from '@mui/icons-material/Sell';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const PropertyDetails = ({ property, onClose }) => {
  const agent = {
    name: "Tunde Ogunmodede",
    title: "Senior Real Estate Agent",
    phone: "+234 801 234 5678",
    email: "tunde.ogunmodede@housify.com",
    whatsapp: "+234 801 234 5678",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    experience: "15+ years",
    properties: "200+ properties sold",
    specialization: "Luxury Homes and Commercial Properties"
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
        >
          <CloseIcon />
        </button>

        <div className="p-6">
          {/* Property Images */}
          <div className="relative h-96 rounded-xl overflow-hidden mb-8">
            <img 
              src={property.url} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-semibold">
                {property.purpose}
              </span>
            </div>
          </div>

          {/* Property Details */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Property Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{property.title}</h2>
                <div className="flex items-center text-gray-400 gap-2">
                  <LocationOnIcon className="text-purple-500" />
                  <span>{property.state}</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-y border-zinc-700">
                <h3 className="text-2xl font-bold text-purple-500">{property.price}</h3>
                <div className="flex items-center gap-1 text-gray-400">
                  <HomeIcon className="text-purple-500" />
                  <span>{property.type}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <BedIcon className="text-purple-500" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <BathtubIcon className="text-purple-500" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Description</h4>
                <p className="text-gray-400">
                  This beautiful property offers modern living at its finest. With spacious rooms,
                  premium finishes, and a prime location, it's perfect for those seeking luxury
                  and comfort. The property features high ceilings, large windows providing natural light,
                  and premium appliances throughout.
                </p>
              </div>
            </div>

            {/* Right Column - Agent Info */}
            <div className="bg-zinc-800 rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={agent.image} 
                    alt={agent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                <p className="text-purple-500">{agent.title}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <PhoneIcon className="text-purple-500" />
                  <span>{agent.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <EmailIcon className="text-purple-500" />
                  <span>{agent.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <WhatsAppIcon className="text-purple-500" />
                  <span>{agent.whatsapp}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="text-gray-400">
                  <span className="text-white font-semibold">Experience:</span> {agent.experience}
                </div>
                <div className="text-gray-400">
                  <span className="text-white font-semibold">Track Record:</span> {agent.properties}
                </div>
                <div className="text-gray-400">
                  <span className="text-white font-semibold">Specialization:</span> {agent.specialization}
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <button className="w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition-colors">
                  Contact Agent
                </button>
                <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors flex items-center justify-center gap-2">
                  <WhatsAppIcon />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
