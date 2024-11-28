import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeroImageBox from "../utils/HeroImageBox";
import SearchButton from "../utils/SearchButton";
import ExpertSection from "../utils/ExpertSection";
import Works from "../utils/Works";
import Partners from "../utils/Partners";
import FeaturedProperty from "../Property/FeaturedProperty";
import { featuredProperties } from "../../data/featuredProperties";
import { FaSearch, FaHandshake, FaHome } from "react-icons/fa";

function Home() {
  return (
    <div className="Home">
      <Header />
      {/* Hero Section */}
      <section className="ml-16 mr-16">
        <div className="max-w-[1440px] mx-auto py-5 px-10 md:flex justify-between">
          <div className="md:grid text-center md:text-left grid-cols-2 gap-10">
            <div className="my-10 md:my-auto">
              <h1 className="pb-8 text-4xl md:text-6xl">Find Your Next Perfect Place To Live</h1>
              <p className="text-xl mb-10">Let's help you find a home that is perfect for you</p>
              <SearchButton />
            </div>
            <HeroImageBox p="Featured Homes" url={featuredProperties[0]?.url || require("../../assets/h2.jpg")} />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-[1440px] mx-auto px-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/50 p-8 rounded-xl hover:bg-zinc-800/50 transition-all duration-300">
              <div className="bg-purple-600/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <FaSearch className="text-2xl text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Search</h3>
              <p className="text-gray-400">
                Find your perfect property from our vast collection across Nigeria using our intelligent search tools.
              </p>
            </div>
            
            <div className="bg-zinc-900/50 p-8 rounded-xl hover:bg-zinc-800/50 transition-all duration-300">
              <div className="bg-purple-600/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <FaHandshake className="text-2xl text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Agents</h3>
              <p className="text-gray-400">
                Connect with trusted real estate professionals who understand your needs and preferences.
              </p>
            </div>
            
            <div className="bg-zinc-900/50 p-8 rounded-xl hover:bg-zinc-800/50 transition-all duration-300">
              <div className="bg-purple-600/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <FaHome className="text-2xl text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Listings</h3>
              <p className="text-gray-400">
                Access premium property listings with detailed information and high-quality images.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <FeaturedProperty 
          header="Featured Properties" 
          text="Check Out Our Top Rated Properties in Nigeria" 
          items={featuredProperties}
          showFilters={false}
        />
      </section>

      <section className="bg-black text-white">
        <ExpertSection
          header="Meet Our Expert Agents"
          text="Our professional agents are here to help you find your perfect home"
          showCTA={false}
        />
      </section>

      <section className="bg-black text-white pt-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Your Journey to Home Ownership Made Simple</p>
          </div>
          <Works />
        </div>
      </section>

      <section className="bg-black text-white py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Partners</h2>
          <p className="text-xl text-gray-400">Trusted by Nigeria's leading real estate professionals</p>
        </div>
        <Partners />
      </section>

      <section className="bg-zinc-900/50 text-white py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Need Help?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Our support team is here to assist you with any questions about finding your perfect home.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.location.href = '/support/help'}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Get Help
              </button>
              <button
                onClick={() => window.location.href = '/contact'}
                className="px-8 py-3 border border-purple-600 text-purple-500 rounded-lg hover:bg-purple-600 hover:text-white transition-colors duration-300"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
