import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const InvestmentDetails = () => {
  const { symbol } = useParams(); // Get stock symbol from URL
  const [stockData, setStockData] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const url = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/history?symbol=${symbol}&interval=5m&diffandsplits=false`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "d3e92ae6d0msh46e3c2c20d23d24p15d981jsn32156835c781",
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
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

    fetchStockData();
  }, [symbol]);

  if (!stockData) return <p className="loading-text">Loading...</p>;

  return (
    <div className="stock-container">
      <h2 className="stock-title">
        {stockData.longName} <span>({stockData.symbol})</span>
      </h2>

      <div className="stock-info">
        <p className="price">Current Price: <span>${stockData.regularMarketPrice}</span></p>
        <p className="high"> 52-Week High: <span>${stockData.fiftyTwoWeekHigh}</span></p>
        <p className="low"> 52-Week Low: <span>${stockData.fiftyTwoWeekLow}</span></p>
        <p className="high"> Day High: <span>${stockData.regularMarketDayHigh}</span></p>
        <p className="low"> Day Low: <span>${stockData.regularMarketDayLow}</span></p>
        <p className="volume"> Market Volume: <span>{stockData.regularMarketVolume}</span></p>
      </div>
      <button className=" p-4 invest bg-blue-500 border-2 rounded-4xl text-white ">
        invest
      </button>

      <h3 className="chart-title">📈 Stock Price Trend (5-Min Intervals)</h3>
      <div className="chart-container">
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
