import  { useEffect, useState } from "react";
import axios from "axios";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const StockDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
  
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/user`, { withCredentials: true });
        setUser(response.data);
        setPortfolio(response.data.portfolio);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSell = async (symbol,sharesToSell) => {
    try {
      const response = await axios.post(
        `${backendUrl}/user/sell`,
        { symbol,sharesToSell },
        { withCredentials: true }
      );

      alert("sell completely")
      setPortfolio(response.data.portfolio);
    } catch (error) {
      console.error("Error selling stock:", error);
    }
  };
 if(!user){
  navigate('/')
 }

  const logout = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user/logout`, { withCredentials: true });
     console.log(response)
      navigate('/');
        } catch (error) {
      console.error("Error fetching user data:", error);
        }
      };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">

        <div className="header" >
          
          <h1 style={{ color: 'white' }}>{user.name } &apos;s Dashboard</h1>
          <div className="user-profile" >
            <div className="profile-container" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <img src={user.profilePic} alt="Profile" className="profile-pic" />
            </div>
         
            {isDropdownOpen && (
              <div>
           
               <button onClick={()=>{
                logout()
               }} style={{ backgroundColor: 'red' }}>logout </button></div>
          
            )}
          </div>
        </div>

        {/* Portfolio Section */}
      <div className="portfolio">
        <h2>Your Portfolio</h2>
        <div className="stock-grid">
          {portfolio.length > 0 ? (
            portfolio.map((stock, index) => (
              <div key={index} className="stock-card">
                <h3>{stock.symbol}</h3>
                <p>Price: ${stock.currentPrice.toFixed(2)}</p>
                <p>Shares: {stock.shares}</p>
                <p className={stock.profitLoss >= 0 ? "green-text" : "red-text"}>
                  Profit/Loss: ${stock.profitLoss.toFixed(2)}
                </p>
                <button className="sell-button" onClick={() => handleSell(stock.symbol,stock.shares)}>
                  Sell 1 Share
                </button>
              </div>
            ))
          ) : (
            <p>You have no stocks in your portfolio.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockDashboard;
