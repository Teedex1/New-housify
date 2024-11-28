import React from "react";
import Header from "../Header/Header";
import Service from "./Service";
import Footer from "../Footer/Footer";
import Credibility from "./Credibility";

function About() {
  return (
    <div className="About bg-zinc-900">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-black py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Transforming Real Estate in Nigeria
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Housify is revolutionizing how people find, buy, and sell properties across Nigeria. 
            We're building the future of real estate, one property at a time.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-zinc-800/50 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 text-lg">
              To make property transactions in Nigeria seamless, transparent, and accessible to everyone. 
              We're committed to providing a platform where finding your perfect property is just a click away.
            </p>
          </div>
          <div className="bg-zinc-800/50 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-300 text-lg">
              To be Nigeria's most trusted real estate platform, setting the standard for property transactions 
              and creating opportunities for both property seekers and real estate professionals.
            </p>
          </div>
        </div>
      </div>

      <Service
        label="What We Offer"
        header="Your Trusted Real Estate Partner in Nigeria"
        text="We connect property seekers with verified properties and trusted agents across Nigeria. Our platform makes it easy to find, compare, and secure your next property with confidence."
      />

      <Credibility 
        header="Why Choose Housify" 
        text="Your Success is Our Priority" 
      />

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-900/20 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Your Perfect Property?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who have found their ideal properties through Housify.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => window.location.href = '/property'}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              Browse Properties
            </button>
            <button 
              onClick={() => window.location.href = '/agent/registration'}
              className="px-8 py-3 border border-purple-600 text-purple-500 rounded-lg hover:bg-purple-600 hover:text-white transition-colors duration-300"
            >
              Join as Agent
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
