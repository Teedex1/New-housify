import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RegistrationSuccessPage = () => {
  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <CheckCircleIcon className="text-green-500 text-6xl mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Registration Successful!</h1>
          <p className="text-xl text-gray-300 mb-8">
            Thank you for applying to join Housify as an agent. We'll review your application and get back to you within 48 hours.
          </p>
          <div className="bg-zinc-800 p-8 rounded-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">What's Next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <span className="text-white font-semibold">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium">Application Review</h3>
                  <p className="text-gray-300">Our team will review your application and verify your documents.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <span className="text-white font-semibold">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium">Email Confirmation</h3>
                  <p className="text-gray-300">You'll receive an email with your account credentials if approved.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <span className="text-white font-semibold">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium">Profile Setup</h3>
                  <p className="text-gray-300">Complete your profile and start listing properties.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationSuccessPage;
