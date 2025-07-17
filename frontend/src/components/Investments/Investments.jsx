import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
const stocks = [
  {
    id: 1,
    name: "Apple Inc.",
    symbol: "AAPL",
    image: "https://logo.clearbit.com/apple.com",
    price: 215.32,
    change: "+1.23%",
  },
  {
    id: 2,
    name: "Amazon",
    symbol: "AMZN",
    image: "https://logo.clearbit.com/amazon.com",
    price: 142.12,
    change: "-0.56%",
  },
  {
    id: 3,
    name: "Google",
    symbol: "GOOGL",
    image: "https://logo.clearbit.com/google.com",
    price: 3125.12,
    change: "+3.45%",
  },
  {
    id: 4,
    name: "Microsoft",
    symbol: "MSFT",
    image: "https://logo.clearbit.com/microsoft.com",
    price: 345.67,
    change: "+2.10%",
  },
  {
    id: 5,
    name: "Tesla",
    symbol: "TSLA",
    image: "https://logo.clearbit.com/tesla.com",
    price: 789.45,
    change: "-1.34%",
  },
  {
    id: 6,
    name: "Meta Platforms",
    symbol: "META",
    image: "https://logo.clearbit.com/meta.com",
    price: 265.78,
    change: "+0.89%",
  },
  {
    id: 7,
    name: "Netflix",
    symbol: "NFLX",
    image: "https://logo.clearbit.com/netflix.com",
    price: 410.23,
    change: "+2.56%",
  },
  {
    id: 8,
    name: "NVIDIA",
    symbol: "NVDA",
    image: "https://logo.clearbit.com/nvidia.com",
    price: 1200.34,
    change: "+4.12%",
  },
];

const Investments = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchCharts = async () => {
      const newChartData = {};

      for (const stock of stocks) {
        try {
          const res = await fetch(
            `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/history?symbol=${stock.symbol}&interval=1d&diffandsplits=false`,
            {
              headers: {
                "x-rapidapi-key": "293db707d2msh3b8c351d3e22470p1f39eajsn5f72855ed56b",
                "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
              },
            }
          );

          const result = await res.json();
          const dataPoints = Object.values(result.body)
            .slice(-10)
            .map((item) => ({
              time: new Date(item.date_utc * 1000).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              }),
              close: item.close,
            }));

          newChartData[stock.symbol] = dataPoints;
        } catch (err) {
          console.error(`Error fetching chart for ${stock.symbol}:`, err);
        }
      }

      setChartData(newChartData);
    };

    fetchCharts();
  }, [stocks]);

  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
        Top Profiting Companies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stocks.map((stock) => (
          <motion.div
            key={stock.id}
            className="bg-gray-100 rounded-xl p-4 cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all"
            onClick={() => navigate(`/investment/${stock.symbol}`)}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={stock.image}
                alt={stock.name}
                className="h-10 w-10 rounded-full object-contain"
              />
              <h3 className="text-lg font-bold text-gray-800">{stock.name}</h3>
            </div>

          
           

            <div className="h-28 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData[stock.symbol] || []}>
                  <defs>
                    <linearGradient id="miniColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <YAxis hide domain={["auto", "auto"]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderRadius: "8px",
                      border: "none",
                    }}
                    labelStyle={{ color: "#9ca3af" }}
                    formatter={(value) => [`$${value.toFixed(2)}`, "Close"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="close"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#miniColor)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Investments;
