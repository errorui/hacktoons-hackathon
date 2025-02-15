import React, { useState } from "react";
import "./UserProfile.css";

const StockDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = {
    name: "John Doe",
    profilePic: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35af6a41332353.57a1ce913e889.jpg", // Replace with actual image URL
  };

  const stocks = [
    { symbol: "AAPL", price: 180.32, change: "+1.5%" },
    { symbol: "TSLA", price: 750.12, change: "-0.8%" },
    { symbol: "GOOGL", price: 2725.50, change: "+2.1%" },
  ];

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Stock Dashboard</h1>
        <div className="user-profile">
          <div className="profile-container" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <img src={user.profilePic} alt="Profile" className="profile-pic" />
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <p>{user.name}</p>
              <button>Logout</button>
            </div>
          )}
        </div>
      </div>
      <div className="portfolio">
        <h2>Your Portfolio</h2>
        <div className="stock-grid">
          {stocks.map((stock, index) => (
            <div key={index} className="stock-card">
              <h3>{stock.symbol}</h3>
              <p>${stock.price}</p>
              <p className={stock.change.startsWith("+") ? "green-text" : "red-text"}>{stock.change}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockDashboard;
