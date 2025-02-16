import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Invest with Confidence</h1>
        <p>Impact with Purpose</p>
        <div className="hero-buttons">
          <button className="btn green-btn"> 
           <Link style={{
            background:"blue",
            color:"white"
           }} to="/signup">Get Started</Link> </button>
          <button className="btn white-btn">
            <Link style={{
            background:"white",
            color:"blue"
           }}>How It Works →</Link></button>
        </div>
      </div>

      
      </div>
  );
};

export default HeroSection;
