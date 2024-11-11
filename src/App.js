// Polyfills for Node.js modules in Webpack 5
import { Buffer } from 'buffer';
import process from 'process';

// React components
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Property from "./components/Property/Property";
import Agent from "./components/Agent/Agent";
import Blog from "./components/Blog/Blog";
import Contact from "./components/Contact/Contact";
import RegisterAgent from "./components/Templates/RegisterAgent";
import SignupForm from "./components/Templates/SignupForm";
import AgentDashboard from "./components/Agent/AgentDashboard";
import { Routes, Route } from "react-router-dom";
import Error from "./components/Error/Error";
import LoginForm from "./components/Templates/LoginForm";

//import Zeliq from "../src/img/44.jpg";
// Enable dotenv for environment variables
require('dotenv').config();

// Ensure Buffer and process are available globally (if needed)
window.Buffer = Buffer;
window.process = process;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="property" element={<Property />} />
      <Route path="agent" element={<Agent />} />
      <Route path="contact" element={<Contact />} />
      <Route path="blog" element={<Blog />} />
      <Route path="agentDashboard" element={<AgentDashboard />} />
      <Route path="UserForm" element={<SignupForm />} />
      <Route path="AgentForm" element={<RegisterAgent />} />
      <Route path="loginForm" element={<LoginForm />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
