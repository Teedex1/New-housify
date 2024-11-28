import React from 'react';
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const PendingApproval = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <FaHourglassHalf className="text-6xl text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Application Under Review</h1>
            <p className="text-gray-600 mb-6">
              Thank you for registering as an agent with Housify. Your application is currently under review by our team.
            </p>
          </div>

          <div className="space-y-4 text-left mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">What happens next?</h2>
            
            <div className="flex items-start space-x-3">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <p className="text-gray-600">Our team will review your submitted documents and credentials</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <p className="text-gray-600">We'll verify your real estate license and professional information</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <p className="text-gray-600">You'll receive an email notification once your application is approved</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This process typically takes 1-2 business days. If you have any questions, please contact our support team.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PendingApproval;
