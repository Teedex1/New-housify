import React from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import { allProperties } from "../../data/allProperties";
import AgentReviews from "./AgentReviews";
import PropertyInquiryForm from "./PropertyInquiryForm";
import AgentStats from "./AgentStats";

const AgentProfile = () => {
  const { id } = useParams();
  
  // In a real app, fetch agent data based on ID
  const agent = {
    id: 1,
    name: "Tunde Ogunmodede",
    title: "Senior Real Estate Agent",
    image: require("../../assets/Headshot.jpg"),
    experience: "5+ years",
    rating: 4.5,
    verified: true,
    specialization: "Residential Homes and Luxury Apartments",
    description: "Expert dealer in residential homes and luxury apartments. Licensed real estate professional with over 5 years of experience in the Nigerian property market.",
    location: "Lagos, Nigeria",
    address: "No 10, Babatope cl, igando, Lagos",
    phone: "+234 7039080311",
    email: "Tundeogunmodede1@email.com",
    whatsapp: "+234 7039080311",
    socials: {
      linkedin: "https://www.linkedin.com/in/tunde-ogunmodede/",
      twitter: "@Rtunde16",
      instagram: "@Tunde_homes"
    },
    stats: {
      activeListings: 15,
      propertiesSold: 45,
      averageRating: 4.5,
      responseTime: "2hrs"
    },
    reviews: [
      {
        clientName: "John Doe",
        date: "2023-10-15",
        rating: 5,
        comment: "Tunde was extremely professional and helped me find my dream home. His knowledge of the Lagos property market is exceptional.",
        property: "3 Bedroom Apartment in Lekki"
      },
      {
        clientName: "Sarah Johnson",
        date: "2023-09-28",
        rating: 4.5,
        comment: "Great communication throughout the process. Very responsive and attentive to our needs.",
        property: "Luxury Villa in Ikoyi"
      }
    ]
  };

  // Filter properties by this agent
  const agentProperties = allProperties.filter(prop => prop.agent?.id === agent.id);

  const handleInquirySubmit = (formData) => {
    // TODO: Implement form submission logic
    console.log('Inquiry submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Agent Header */}
        <div className="bg-zinc-800 rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <img
              src={agent.image}
              alt={agent.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-white">{agent.name}</h1>
                {agent.verified && (
                  <VerifiedIcon className="text-blue-500" titleAccess="Verified Agent" />
                )}
              </div>
              <p className="text-xl text-gray-300 mt-1">{agent.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <LocationOnIcon className="text-purple-500" />
                <span className="text-gray-300">{agent.location}</span>
              </div>
              <p className="text-gray-300 mt-4">{agent.description}</p>
            </div>
          </div>

          {/* Agent Stats */}
          <AgentStats stats={agent.stats} />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            {/* Contact Information */}
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <PhoneIcon className="text-purple-500" />
                  <a href={`tel:${agent.phone}`} className="text-gray-300 hover:text-white">
                    {agent.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <EmailIcon className="text-purple-500" />
                  <a href={`mailto:${agent.email}`} className="text-gray-300 hover:text-white">
                    {agent.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <WhatsAppIcon className="text-purple-500" />
                  <a
                    href={`https://wa.me/${agent.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <h4 className="text-lg font-medium text-white mb-4">Social Media</h4>
                <div className="flex gap-4">
                  <a
                    href={agent.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:text-purple-400"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href={`https://twitter.com/${agent.socials.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:text-purple-400"
                  >
                    <TwitterIcon />
                  </a>
                  <a
                    href={`https://instagram.com/${agent.socials.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:text-purple-400"
                  >
                    <InstagramIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* Agent Reviews */}
            <AgentReviews reviews={agent.reviews} />
          </div>

          <div>
            {/* Property Inquiry Form */}
            <PropertyInquiryForm agentName={agent.name} onSubmit={handleInquirySubmit} />
          </div>
        </div>

        {/* Agent's Properties */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-white mb-6">Listed Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentProperties.map((property) => (
              <div key={property.id} className="bg-zinc-800 rounded-lg overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-medium text-white">{property.title}</h4>
                  <p className="text-gray-300 mt-1">{property.location}</p>
                  <p className="text-purple-500 font-semibold mt-2">₦{property.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AgentProfile;
