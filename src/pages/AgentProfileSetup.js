import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import axiosInstance from '../utils/axios';
import { FaUpload } from 'react-icons/fa';

const AgentProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    licenseNumber: '',
    experience: '',
    specialization: '',
    location: '',
    about: '',
    profilePhoto: null,
    idDocument: null,
    licenseDocument: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      
      // Append all text fields
      Object.keys(formData).forEach(key => {
        if (formData[key] && typeof formData[key] !== 'object') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append files
      if (formData.profilePhoto) {
        formDataToSend.append('profilePhoto', formData.profilePhoto);
      }
      if (formData.idDocument) {
        formDataToSend.append('idDocument', formData.idDocument);
      }
      if (formData.licenseDocument) {
        formDataToSend.append('licenseDocument', formData.licenseDocument);
      }

      await axiosInstance.post('/api/agent/complete-profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Profile setup complete!');
      navigate('/agent/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-zinc-800 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Complete Your Profile
            </h2>
            <p className="text-gray-400">
              Provide additional information to start listing properties
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Years of Experience</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:border-purple-500"
                  required
                >
                  <option value="">Select Experience</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Specialization</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:border-purple-500"
                  required
                >
                  <option value="">Select Specialization</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="luxury">Luxury</option>
                  <option value="rental">Rental</option>
                  <option value="land">Land</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Primary Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:border-purple-500"
                  required
                  placeholder="e.g., Lagos, Nigeria"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">About You</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:outline-none focus:border-purple-500"
                rows="4"
                required
                placeholder="Tell potential clients about yourself and your experience..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Profile Photo</label>
                <div className="relative">
                  <input
                    type="file"
                    name="profilePhoto"
                    onChange={handleFileChange}
                    className="hidden"
                    id="profilePhoto"
                    accept="image/*"
                    required
                  />
                  <label
                    htmlFor="profilePhoto"
                    className="flex items-center justify-center px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg cursor-pointer hover:bg-zinc-600 transition-colors"
                  >
                    <FaUpload className="mr-2" />
                    <span className="text-gray-300">Upload Photo</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">ID Document</label>
                <div className="relative">
                  <input
                    type="file"
                    name="idDocument"
                    onChange={handleFileChange}
                    className="hidden"
                    id="idDocument"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                  <label
                    htmlFor="idDocument"
                    className="flex items-center justify-center px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg cursor-pointer hover:bg-zinc-600 transition-colors"
                  >
                    <FaUpload className="mr-2" />
                    <span className="text-gray-300">Upload ID</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">License Document</label>
                <div className="relative">
                  <input
                    type="file"
                    name="licenseDocument"
                    onChange={handleFileChange}
                    className="hidden"
                    id="licenseDocument"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                  <label
                    htmlFor="licenseDocument"
                    className="flex items-center justify-center px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg cursor-pointer hover:bg-zinc-600 transition-colors"
                  >
                    <FaUpload className="mr-2" />
                    <span className="text-gray-300">Upload License</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Complete Profile
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AgentProfileSetup;
