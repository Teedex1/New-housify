import React from "react";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import FeaturedProperty from "./FeaturedProperty";
import Footer from "../Footer/Footer";
import { allProperties } from "../../data/allProperties";

function Property() {
  return (
    <div className="Property">
      <Header />
      <Hero header="Discover More Suitable Properties Across Nigeria" />
      
      <FeaturedProperty 
        header="All Properties" 
        text="Explore Our Complete Collection of Properties" 
        items={allProperties}
        showFilters={true}
      />
      
      <Footer />
    </div>
  );
}

export default Property;