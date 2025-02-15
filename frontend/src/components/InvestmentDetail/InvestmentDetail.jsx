import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const InvestmentDetails = () => {
  const navigate=useNavigate()
  const { symbol } = useParams(); 
  const [stockData, setStockData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [user, setUser] = useState(null);
  const [isOwned, setIsOwned] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [maxAffordable, setMaxAffordable] = useState(0);
  useEffect(() => {
    const fetchStockData = async () => {
      const url = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/history?symbol=${symbol}&interval=5m&diffandsplits=false`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "293db707d2msh3b8c351d3e22470p1f39eajsn5f72855ed56b",
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)
        setStockData(result.meta);
        
        // Convert the response body into an array suitable for Recharts
        const formattedChartData = Object.values(result.body).map((data) => ({
          time: new Date(data.date_utc * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          open: data.open,
          high: data.high,
          low: data.low,
          close: data.close,
        }));

        setChartData(formattedChartData);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${backendUrl}/user/user`, { credentials: "include" });
        const userData = await response.json();
        setUser(userData);

        // Check if the user already owns the stock
        if (userData.investments && userData.investments.some((inv) => inv.symbol === symbol)) {
          setIsOwned(true);
        }

        // Calculate max affordable quantity
        if (userData.balance && stockData?.regularMarketPrice) {
          console.log(Math.floor(userData.balance / stockData.regularMarketPrice/10))
          setMaxAffordable(Math.floor(userData.balance / (stockData.regularMarketPrice/10)));
        }
      } catch (error) {
        navigate('/')
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();

    fetchStockData();
  }, [symbol,stockData?.regularMarketPrice]);
 

  const handleBuyStock = async () => {
    if (!user) return alert("Please log in to purchase stocks.");

    if (quantity < 1 || quantity > maxAffordable) {
      return alert("Invalid quantity. Please enter a valid number.");
    }

    try {
      const response = await fetch(`${backendUrl}/user/buy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id, 
          name: symbol,
          amount: quantity,
          price: stockData.regularMarketPrice
        }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Successfully purchased ${quantity} shares of ${stockData.longName}!`);
        setIsOwned(true); 
        setShowForm(false); 
      } else {
        alert(data.err);
      }
    } catch (error) {
      console.error("Error buying stock:", error);
    }
  };


  if (!stockData) return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: 'white'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2 style={{ color: 'white', fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        {stockData.longName} <span>({stockData.symbol})</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
          <h4 style={{ color: 'black', backgroundColor: 'white',fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Current Price</h4>
          <p style={{ color: 'black', backgroundColor: 'white',fontWeight: '600' }}>${stockData.regularMarketPrice}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
          <h4 style={{ color: 'black', backgroundColor: 'white', fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>52-Week High</h4>
          <p style={{ color: 'black', backgroundColor: 'white', fontWeight: '600' }}>${stockData.fiftyTwoWeekHigh}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
          <h4 style={{ color: 'black', backgroundColor: 'white',fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>52-Week Low</h4>
          <p style={{ color: 'black', backgroundColor: 'white',fontWeight: '600' }}>${stockData.fiftyTwoWeekLow}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
          <h4 style={{ color: 'black', backgroundColor: 'white',fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Day High</h4>
          <p style={{ color: 'black', backgroundColor: 'white',fontWeight: '600' }}>${stockData.regularMarketDayHigh}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
          <h4 style={{ color: 'black', backgroundColor: 'white',fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Day Low</h4>
          <p style={{ color: 'black', backgroundColor: 'white',fontWeight: '600' }}>${stockData.regularMarketDayLow}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
          <h4 style={{ color: 'black', backgroundColor: 'white',fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Market Volume</h4>
          <p style={{ color: 'black', backgroundColor: 'white',fontWeight: '600' }}>{stockData.regularMarketVolume}</p>
        </div>
      </div>

      {!showForm ? (
        <button 
          style={{ 
            padding: '1rem', 
            backgroundColor: isOwned ? '#ccc' : '#3b82f6', 
            border: '2px solid', 
            borderRadius: '0.5rem', 
            color: 'white', 
            fontWeight: '600', 
            marginBottom: '1.5rem', 
            cursor: isOwned ? 'not-allowed' : 'pointer'
          }} 
          onClick={() => setShowForm(true)}
          disabled={isOwned}
        >
          {isOwned ? "Stock Already Purchased" : "Invest"}
        </button>
      ) : (
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
          <label style={{color: 'black', backgroundColor: 'white',fontSize: '1.125rem', fontWeight: 'bold', display: 'block',  marginBottom: '0.5rem' }}>
            Enter Quantity (Max: {maxAffordable})
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(maxAffordable, parseInt(e.target.value) || 1)))}
            min="1"
            max={maxAffordable}
            style={{color: 'black', backgroundColor: 'white',fontSize: '1.125rem', fontWeight: 'bold', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem', width: '100%', marginBottom: '1rem' }}
          />
          <button 
            style={{ 
              padding: '1rem', 
              backgroundColor: quantity > maxAffordable ? '#ccc' : '#22c55e', 
              border: '2px solid', 
              borderRadius: '0.5rem', 
              color: 'white', 
              fontWeight: '600', 
              marginRight: '1rem',
              cursor: quantity > maxAffordable ? 'not-allowed' : 'pointer'
            }} 
            onClick={handleBuyStock}
            disabled={quantity > maxAffordable}
          >
            Confirm Purchase
          </button>
          <button 
            style={{ 
              padding: '1rem', 
              backgroundColor: '#dc2626', 
              border: '2px solid', 
              borderRadius: '0.5rem', 
              color: 'white', 
              fontWeight: '600'
            }} 
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      )}

      <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        📈 Stock Price Trend (5-Min Intervals)
      </h3>
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="time" stroke="#ddd" />
            <YAxis stroke="#ddd" />
            <Tooltip />
            <Line type="monotone" dataKey="close" stroke="#4ade80" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="high" stroke="#facc15" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="low" stroke="#dc2626" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InvestmentDetails;
