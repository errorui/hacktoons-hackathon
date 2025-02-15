import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <div className="footer-logo">EcoMitra</div>
          <div className="footer-social">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Product</h3>
          <ul>
            <li><a href="#">Investments</a></li>
            <li><a href="#">Referral Program</a></li>
            <li><a href="#">Energea IRA</a></li>
            <li><a href="#">Performance</a></li>
            <li><a href="#">Reviews</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Developers</a></li>
            <li><a href="#">Store</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Articles</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Sustainability Spotlights</a></li>
            <li><a href="#">Films</a></li>
            <li><a href="#">Annual Reports</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © 2025 EcoMitra. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
