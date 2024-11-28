import React from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import ExpertSection from "../utils/ExpertSection";

function Agent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="Agent">
      <Header />
      <Hero header="We have Expert Agents ready to support your goals" />
      <ExpertSection
        header="Meet Expert Agents"
        text="We have certified experts ready to attend to you"
        showCTA={true}
      />
      <div className="mt-20"></div>
      <Footer />
    </div>
  );
}

export default Agent;
