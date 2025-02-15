
import "./About.css";
import { FaMountain, FaLightbulb, FaLeaf } from "react-icons/fa";

const MissionVisionValues = () => {
  return (
    <section className="mvv-section" id="about">
      <div className="mvv-container">
        <div className="mvv-item">
          <FaMountain className="mvv-icon" />
          <h3>Our Mission</h3>
          <p>
            Our mission is to empower individuals to invest in low-carbon 
            infrastructure, channeling capital towards a sustainable future.
          </p>
        </div>
        <div className="mvv-item">
          <FaLightbulb className="mvv-icon" />
          <h3>Our Vision</h3>
          <p>
            We envision a global community of investors who benefit financially from 
            our products and capitalize on the shift towards decarbonization, 
            decentralization, and digitization.
          </p>
        </div>
        <div className="mvv-item">
          <FaLeaf className="mvv-icon" />
          <h3>Our Values</h3>
          <p>
            We are committed to transparency, sustainability, and delivering value 
            to our investors. Returns on invested capital is our priority; the 
            environment is our passion.
          </p>
        </div>
      </div>
      <h2 className="key-managers">Key Managers</h2>
    </section>
  );
};

export default MissionVisionValues;
