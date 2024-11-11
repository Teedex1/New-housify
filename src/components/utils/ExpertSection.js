import React from "react";
import ExpertCard from "./ExpertCard";
import { NavLink } from "react-router-dom";

// Importing images
import LucyImage from "../../assets/Zeliq.jpg";
import ZeliphaImage from "../../assets/Headshot.jpg";
import MildredImage from "../../assets/Zeliq.jpg";
import RobertImage from "../../assets/Zeliq.jpg";

const ExpertSection = (props) => {
  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto py-20 px-10 flex-col justify-between text-center md:flex-row">
        {/* section label */}
        <div className="py-10">
          <h3 className="text-purple-700"> {props.header} </h3>
          <h5 className="pt-4"> {props.text} </h5>
        </div>

        {/* property-card-container */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-2">
            <ExpertCard name="Agent Ruth" img={LucyImage} linkedin="" contact="" />
          </div>
          <div className="p-2">
            <ExpertCard name="Tunde Ogunmodede" img={ZeliphaImage} linkedin="" contact="" />
          </div>
          <div className="p-2">
            <ExpertCard name="Angelina A" img={MildredImage} linkedin="" contact="" />
          </div>
          <div className="p-2">
            <ExpertCard name="Angela B" img={RobertImage} linkedin="" contact="" />
          </div>
        </div>
        <div className="w-full pt-10 flex justify-center">
          <button className="mx-4">Load More</button>
          <button className="mx-4">
            <NavLink className="" to="/AgentForm">
              Become Agent
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertSection;
