import React from "react";
import "./Portfolio.css";
import portfolioImage from "../../../src/assets/port.png";

const Portfolio = () => {
  return (
    <div className="portfolio-container">
      <div className="portfolio-content">
        <h1>Build your portfolio in minutes...</h1>
        
        <div className="portfolio-step">
          <div className="step-number">1</div>
          <div className="step-text">
            <h3>Create your Energea account</h3>
            <p>Begin your investment journey by answering a series of questions to help us find the best solar energy investments for you.</p>
          </div>
        </div>

        <div className="portfolio-step">
          <div className="step-number">2</div>
          <div className="step-text">
            <h3>Build your solar portfolio</h3>
            <p>Purchase equity in solar energy projects for as little as $100 and build a diverse portfolio.</p>
          </div>
        </div>

        <div className="portfolio-step">
          <div className="step-number">3</div>
          <div className="step-text">
            <h3>Collect dividends as your projects sell energy</h3>
            <p>Monitor your portfolio’s financial performance and environmental impact using our intuitive investor dashboard.</p>
          </div>
        </div>

        <button className="get-started-btn">Get Started →</button>
      </div>

      <div className="portfolio-image">
        <img src={portfolioImage} alt="Portfolio showcase" />
      </div>
    </div>
  );
};

export default Portfolio;
