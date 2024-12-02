import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import SellIcon from '@mui/icons-material/Sell';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ImageGallery from '../components/Property/ImageGallery';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching property:', err);
        setError(err.response?.data?.message || 'Error loading property details');
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-xl font-semibold mb-2">Property Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Navigation Bar */}
      <div className="bg-zinc-800 py-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowBackIcon /> Back
          </button>
        </div>
      </div>

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-zinc-800 rounded-lg shadow-xl overflow-hidden">
          {/* Image Gallery */}
          <ImageGallery images={property.images || []} />

          {/* Property Information */}
          <div className="p-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">{property.title}</h1>
                <div className="flex items-center gap-2 text-gray-400">
                  <LocationOnIcon />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-500">
                  ${property.price.toLocaleString()}
                </div>
                <div className="text-gray-400">{property.type}</div>
              </div>
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="flex items-center gap-2 text-gray-400">
                <HomeIcon />
                <span>{property.size} sqft</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <BedIcon />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <BathtubIcon />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <SellIcon />
                <span>{property.status}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-white mb-2">Description</h2>
              <p className="text-gray-400">{property.description}</p>
            </div>

            {/* Agent Information */}
            <div className="mt-6 p-4 bg-zinc-700 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Contact Agent</h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <PhoneIcon />
                  <span>{property.agent?.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <EmailIcon />
                  <span>{property.agent?.email || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <WhatsAppIcon />
                  <span>{property.agent?.phone || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
