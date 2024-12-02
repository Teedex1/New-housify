import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import FeaturedProperty from "./FeaturedProperty";
import Footer from "../Footer/Footer";
import LoadingSpinner from "../Common/LoadingSpinner";
import axios from "axios";
import { toast } from "react-toastify";

function Property() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log('Fetching properties...');
        const response = await axios.get('http://localhost:5001/api/properties');
        console.log('Properties response:', response.data);
        
        // Transform the data to match the expected format
        const transformedProperties = response.data.map(property => ({
          id: property._id,
          title: property.title,
          url: property.images?.[0] || 'default-image-url.jpg',
          price: property.price,
          purpose: property.purpose || 'For Sale',
          state: property.location || 'Lagos',
          type: property.type || 'House',
          bedrooms: property.bedrooms || 3,
          bathrooms: property.bathrooms || 2
        }));
        
        setProperties(transformedProperties);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Failed to load properties. Please try again later.");
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="Property">
      <Header />
      <Hero header="Discover More Suitable Properties Across Nigeria" />
      
      <FeaturedProperty 
        header="All Properties" 
        text="Explore Our Complete Collection of Properties" 
        items={properties}
        showFilters={true}
      />
      
      <Footer />
    </div>
  );
}

export default Property;