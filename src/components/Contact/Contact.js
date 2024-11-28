import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { FaShieldAlt, FaQuestionCircle, FaBug, FaUserPlus, FaHandshake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ContactInfo = ({ icon: Icon, title, content, onClick }) => (
  <div 
    onClick={onClick}
    className="flex items-start gap-4 p-6 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
  >
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-purple-600/10 rounded-lg flex items-center justify-center">
        <Icon className="text-purple-500 text-xl" />
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-400 mb-2">{content}</p>
      <span className="text-purple-500 hover:text-purple-400 inline-flex items-center gap-2">
        Learn More →
      </span>
    </div>
  </div>
);

function Contact() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    switch (category) {
      case 'trust':
        navigate('/support/trust-safety');
        break;
      case 'platform':
        navigate('/support/help');
        break;
      case 'technical':
        navigate('/support/technical');
        break;
      case 'agent':
        navigate('/agent/registration');
        break;
      case 'business':
        navigate('/support/partnerships');
        break;
      default:
        break;
    }
  };

  const supportCategories = [
    {
      icon: FaShieldAlt,
      title: "Trust & Safety",
      content: "Report suspicious listings or user behavior on the platform",
      category: 'trust'
    },
    {
      icon: FaQuestionCircle,
      title: "Platform Support",
      content: "Get help with using Housify's features and functionalities",
      category: 'platform'
    },
    {
      icon: FaBug,
      title: "Technical Support",
      content: "Report technical issues or bugs you've encountered",
      category: 'technical'
    },
    {
      icon: FaUserPlus,
      title: "Become an Agent",
      content: "Join our network of professional real estate agents",
      category: 'agent'
    },
    {
      icon: FaHandshake,
      title: "Business Partnerships",
      content: "Explore partnership opportunities with Housify",
      category: 'business'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-900/20 to-black py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How Can We Help?</h1>
            <p className="text-xl text-gray-400">
              Choose a category below or contact our support team for assistance with the Housify platform.
            </p>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((info, index) => (
              <ContactInfo 
                key={index} 
                {...info} 
                onClick={() => handleCategoryClick(info.category)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="p-6 bg-zinc-800 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">How do I contact an agent?</h3>
                <p className="text-gray-400">
                  You can contact agents directly through their profile pages. Each listing also has a "Contact Agent" button that will put you in touch with the property's agent.
                </p>
              </div>
              <div className="p-6 bg-zinc-800 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">How do I report a suspicious listing?</h3>
                <p className="text-gray-400">
                  Click on the Trust & Safety category above to access our reporting system. Our team will investigate and take appropriate action within 24-48 hours.
                </p>
              </div>
              <div className="p-6 bg-zinc-800 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">I'm an agent having technical issues. What should I do?</h3>
                <p className="text-gray-400">
                  Select the Technical Support category above to access our support system. Our tech team typically responds within 24 hours.
                </p>
              </div>
              <div className="p-6 bg-zinc-800 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">How can I verify an agent's credentials?</h3>
                <p className="text-gray-400">
                  All agents on Housify go through a verification process. You can view an agent's verification status, ratings, and reviews on their profile page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
