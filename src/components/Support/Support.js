import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const SupportForm = ({ type }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Implement actual form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setLoading(false);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const getTitle = () => {
    switch (type) {
      case 'trust-safety':
        return 'Trust & Safety Support';
      case 'help':
        return 'Platform Support';
      case 'technical':
        return 'Technical Support';
      case 'partnerships':
        return 'Business Partnerships';
      default:
        return 'Support';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'trust-safety':
        return 'Report suspicious activities, safety concerns, or policy violations.';
      case 'help':
        return "Get help with using Housify's features and platform functionality.";
      case 'technical':
        return "Report technical issues or bugs you've encountered on the platform.";
      case 'partnerships':
        return 'Explore business partnership opportunities with Housify.';
      default:
        return 'How can we help you today?';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors duration-300"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors duration-300"
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors duration-300"
          placeholder="Brief subject of your inquiry"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="6"
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors duration-300"
          placeholder="Please provide as much detail as possible..."
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-purple-600 text-white py-4 px-8 rounded-lg font-semibold 
          ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-700'} 
          transition-colors duration-300 flex items-center justify-center`}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
};

function Support() {
  const { type } = useParams();

  const getTitle = () => {
    switch (type) {
      case 'trust-safety':
        return 'Trust & Safety Support';
      case 'help':
        return 'Platform Support';
      case 'technical':
        return 'Technical Support';
      case 'partnerships':
        return 'Business Partnerships';
      default:
        return 'Support';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'trust-safety':
        return 'Report suspicious activities, safety concerns, or policy violations.';
      case 'help':
        return "Get help with using Housify's features and platform functionality.";
      case 'technical':
        return "Report technical issues or bugs you've encountered on the platform.";
      case 'partnerships':
        return 'Explore business partnership opportunities with Housify.';
      default:
        return 'How can we help you today?';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-900/20 to-black py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{getTitle()}</h1>
            <p className="text-xl text-gray-400">
              {getDescription()}
            </p>
          </div>
        </div>
      </section>

      {/* Support Form Section */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <SupportForm type={type} />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Support;
