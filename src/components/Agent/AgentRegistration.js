import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaMapMarkerAlt, FaBriefcase, FaLock } from 'react-icons/fa';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';

const AgentRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    licenseNumber: '',
    experience: '',
    specialization: '',
    location: '',
    about: '',
    idDocument: null,
    licenseDocument: null,
    profilePhoto: null
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
      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.password || !formData.phone || !formData.licenseNumber) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Validate password length
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return;
      }

      // Validate file uploads
      if (!formData.idDocument || !formData.licenseDocument) {
        toast.error('Please upload all required documents');
        return;
      }

      const formDataToSend = new FormData();
      
      // Add text fields
      Object.keys(formData).forEach(key => {
        if (typeof formData[key] === 'string') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add files
      if (formData.idDocument) {
        formDataToSend.append('idDocument', formData.idDocument);
      }
      if (formData.licenseDocument) {
        formDataToSend.append('licenseDocument', formData.licenseDocument);
      }
      if (formData.profilePhoto) {
        formDataToSend.append('profilePhoto', formData.profilePhoto);
      }

      const response = await axiosInstance.post('/api/agents/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success('Application submitted successfully!');
        navigate('/agent/pending-approval');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Error submitting application');
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6 text-white">Personal Information</h3>
            
            <div className="flex items-center space-x-4 border border-zinc-700 rounded-lg p-3 bg-zinc-900">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name *"
                className="flex-1 outline-none bg-transparent text-white placeholder-gray-400"
                required
              />
            </div>

            <div className="flex items-center space-x-4 border border-zinc-700 rounded-lg p-3 bg-zinc-900">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address *"
                className="flex-1 outline-none bg-transparent text-white placeholder-gray-400"
                required
              />
            </div>

            <div className="flex items-center space-x-4 border border-zinc-700 rounded-lg p-3 bg-zinc-900">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password (min 6 characters) *"
                className="flex-1 outline-none bg-transparent text-white placeholder-gray-400"
                required
                minLength="6"
              />
            </div>

            <div className="flex items-center space-x-4 border border-zinc-700 rounded-lg p-3 bg-zinc-900">
              <FaPhone className="text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number *"
                className="flex-1 outline-none bg-transparent text-white placeholder-gray-400"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6 text-white">Professional Details</h3>
            <div className="flex items-center space-x-4 border border-zinc-700 rounded-lg p-3 bg-zinc-900">
              <FaIdCard className="text-gray-400" />
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                placeholder="License Number *"
                className="flex-1 outline-none bg-transparent text-white placeholder-gray-400"
                required
              />
            </div>
            <div className="flex items-center space-x-4 border border-zinc-700 rounded-lg p-3 bg-zinc-900">
              <FaBriefcase className="text-gray-400" />
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="flex-1 outline-none bg-transparent text-white"
                required
              >
                <option value="" className="bg-zinc-800">Years of Experience</option>
                <option value="0-2" className="bg-zinc-800">0-2 years</option>
                <option value="3-5" className="bg-zinc-800">3-5 years</option>
                <option value="5-10" className="bg-zinc-800">5-10 years</option>
                <option value="10+" className="bg-zinc-800">10+ years</option>
              </select>
            </div>
            <div className="flex items-center space-x-4 border border-zinc-700 rounded-lg p-3 bg-zinc-900">
              <FaMapMarkerAlt className="text-gray-400" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Location"
                className="flex-1 outline-none bg-transparent text-white placeholder-gray-400"
              />
            </div>
            <div className="border border-zinc-700 rounded-lg p-3 bg-zinc-900">
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                className="w-full outline-none bg-transparent text-white placeholder-gray-400 min-h-[100px]"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6 text-white">Document Upload</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-300">Profile Photo</label>
                <input
                  type="file"
                  name="profilePhoto"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full p-2 border border-zinc-700 rounded-lg bg-zinc-900 text-gray-300"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-300">ID Document *</label>
                <input
                  type="file"
                  name="idDocument"
                  onChange={handleFileChange}
                  required
                  className="w-full p-2 border border-zinc-700 rounded-lg bg-zinc-900 text-gray-300"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-300">License Document *</label>
                <input
                  type="file"
                  name="licenseDocument"
                  onChange={handleFileChange}
                  required
                  className="w-full p-2 border border-zinc-700 rounded-lg bg-zinc-900 text-gray-300"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Header />
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-white">Agent Registration</h2>
          <p className="text-gray-300">Complete the form below to register as an agent</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-800 p-6 rounded-lg">
          {renderStep()}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 ml-auto"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AgentRegistration;
