import React from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Line,
  ResponsiveContainer,
  Legend,
  Area,
} from "recharts";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown } from "lucide-react";
const data = [
  { date: "Mon", open: 100, close: 120, volume: 300, predicted: 115 },
  { date: "Tue", open: 120, close: 110, volume: 200, predicted: 118 },
  { date: "Wed", open: 110, close: 130, volume: 350, predicted: 125 },
  { date: "Thu", open: 130, close: 125, volume: 400, predicted: 128 },
  { date: "Fri", open: 125, close: 140, volume: 450, predicted: 135 },
];
const Hero = () => {
  return (
    <section className="w-full min-h-screen bg-white text-black flex items-center justify-center px-4 md:px-12 lg:px-20 py-12">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            EcoMitra
          </h1>
          <p className="text-gray-600 text-lg">
            Learn, predict, and visualize real-time stock movements with volume, sentiment, and candlestick analytics.
          </p>
          <Link to="/investments">
            <button className="mt-4 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition shadow-md hover:shadow-lg">
              Get Started
            </button>
          </Link>
        </motion.div>

        {/* RIGHT SIDE */}
     <section className="bg-white text-black py-10 px-6 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-2">
          Market Overview — <span className="">Live</span>
        </h1>
        <p className="text-gray-600 mb-6">
          Predicted vs Actual prices with volume and sentiment indicator
        </p>

        <div className="bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={data}>
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                yAxisId="right"
                dataKey="volume"
                barSize={20}
                fill="#cbd5e1"
                name="Volume"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="close"
                stroke="#10b981"
                dot={{ r: 4 }}
                name="Actual"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="predicted"
                stroke="#f59e0b"
                strokeDasharray="5 5"
                dot={{ r: 4 }}
                name="Predicted"
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey={(d) => Math.abs(d.predicted - d.close)}
                stroke="none"
                fill="#facc15"
                opacity={0.1}
                name="Prediction Error"
              />
            </ComposedChart>
          </ResponsiveContainer>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2 ">
              <TrendingUp size={18} /> Market Sentiment: Bullish
            </div>
            <div className="text-gray-500 text-sm">Last updated: 2 mins ago</div>
          </div>
        </div>
      </motion.div>
    </section>
      </div>
    </section>
  );
};

export default Hero;
