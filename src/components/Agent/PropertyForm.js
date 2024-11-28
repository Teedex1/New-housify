import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';
import axiosInstance from '../../utils/axios';

const PropertyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [property, setProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    address: '',
    type: 'apartment',
    status: 'for-sale',
    bedrooms: '',
    bathrooms: '',
    area: '',
    features: [],
    amenities: []
  });

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/agent/properties/' + id);
      setProperty(response.data);
      setImages(response.data.images || []);
    } catch (error) {
      toast.error('Failed to fetch property details');
      navigate('/agent-dashboard/properties');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await axiosInstance.post('/api/agent/properties/upload-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setImages([...images, ...response.data.urls]);
      toast.success('Images uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload images');
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyData = {
        ...property,
        images
      };

      if (isEditing) {
        await axiosInstance.put('/api/agent/properties/' + id, propertyData);
        toast.success('Property updated successfully');
      } else {
        await axiosInstance.post('/api/agent/properties', propertyData);
        toast.success('Property created successfully');
      }

      navigate('/agent-dashboard/properties');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save property');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-8">
        {isEditing ? 'Edit Property' : 'Add New Property'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">Title</label>
              <input
                type="text"
                value={property.title}
                onChange={(e) => setProperty({ ...property, title: e.target.value })}
                required
                className="mt-1 block w-full bg-zinc-700 border border-zinc-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Price</label>
              <input
                type="number"
                value={property.price}
                onChange={(e) => setProperty({ ...property, price: e.target.value })}
                required
                className="mt-1 block w-full bg-zinc-700 border border-zinc-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Location</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">Location</label>
              <input
                type="text"
                value={property.location}
                onChange={(e) => setProperty({ ...property, location: e.target.value })}
                required
                className="mt-1 block w-full bg-zinc-700 border border-zinc-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Full Address</label>
              <textarea
                value={property.address}
                onChange={(e) => setProperty({ ...property, address: e.target.value })}
                rows={2}
                required
                className="mt-1 block w-full bg-zinc-700 border border-zinc-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Property Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">Type</label>
              <select
                value={property.type}
                onChange={(e) => setProperty({ ...property, type: e.target.value })}
                className="mt-1 block w-full bg-zinc-700 border border-zinc-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Status</label>
              <select
                value={property.status}
                onChange={(e) => setProperty({ ...property, status: e.target.value })}
                className="mt-1 block w-full bg-zinc-700 border border-zinc-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Bedrooms</label>
              <input
                type="number"
                value={property.bedrooms}
                onChange={(e) => setProperty({ ...property, bedrooms: e.target.value })}
                required
                className="mt-1 block w-full bg-zinc-700 border border-zinc-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Bathrooms</label>
              <input
                type="number"
                value={property.bathrooms}
                onChange={(e) => setProperty({ ...property, bathrooms: e.target.value })}
                required
                className="mt-1 block w-full bg-zinc-700 border border-zinc-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Area (sq ft)</label>
              <input
                type="number"
                value={property.area}
                onChange={(e) => setProperty({ ...property, area: e.target.value })}
                required
                className="mt-1 block w-full bg-zinc-700 border border-zinc-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
          <div>
            <textarea
              value={property.description}
              onChange={(e) => setProperty({ ...property, description: e.target.value })}
              rows={4}
              required
              className="mt-1 block w-full bg-zinc-700 border border-zinc-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Images */}
        <div className="bg-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Images</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-zinc-700 text-white rounded-lg tracking-wide uppercase border border-dashed border-zinc-600 cursor-pointer hover:bg-zinc-600">
                <FaCloudUploadAlt className="text-3xl" />
                <span className="mt-2 text-base">Select images</span>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Property ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Property' : 'Create Property'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
