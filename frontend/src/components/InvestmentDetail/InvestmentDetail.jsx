import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Calendar, Clock, BarChart3 } from "lucide-react";

const CandlestickChart = ({ data, timeFrame }) => {
  console.log(data)
  const [hoveredCandle, setHoveredCandle] = useState(null);
  
  if (!data || data.length === 0) return (
    <div className="flex items-center justify-center h-80 text-gray-400">
      <div className="text-center">
        <BarChart3 size={48} className="mx-auto mb-2 opacity-50" />
        <p>No data available</p>
      </div>
    </div>
  );

  const prices = data.map(d => [d.low, d.high]).flat();
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  const padding = priceRange * 0.1;
  
  const chartHeight = 320;
  const chartWidth = 1900;
  const candleWidth = Math.max(3, Math.min(15, (chartWidth - 80) / data.length - 2));
  const leftPadding = 60;
  const rightPadding = 80;
  const usableWidth = chartWidth - leftPadding - rightPadding;
  
  const priceToY = (price) => {
    return chartHeight - 40 - ((price - minPrice + padding) / (priceRange + 2 * padding)) * (chartHeight - 80);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    switch(timeFrame) {
      case 'current':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case 'week':
        return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
      case 'month':
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      default:
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  return (
    <div className="relative bg-gray-900/50 rounded-xl p-4 backdrop-blur-sm overflow-hidden w-full">
      <svg width={chartWidth} height={chartHeight} className="overflow-visible">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#ffffff08" strokeWidth="1"/>
          </pattern>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9"/>
          </linearGradient>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Price levels and labels */}
        {[0.1, 0.3, 0.5, 0.7, 0.9].map((level, i) => {
          const y = (chartHeight - 80) * level + 40;
          const price = maxPrice + padding - (level * (priceRange + 2 * padding));
          return (
            <g key={i}>
              <line 
                x1={leftPadding} 
                y1={y} 
                x2={chartWidth - rightPadding} 
                y2={y} 
                stroke="#ffffff10" 
                strokeWidth="1" 
                strokeDasharray="3,3"
              />
              <text 
                x={chartWidth - rightPadding + 10} 
                y={y + 4} 
                fill="#ffffff60" 
                fontSize="12" 
                fontFamily="monospace"
              >
                ${formatPrice(price)}
              </text>
            </g>
          );
        })}
        
        {/* Volume bars background */}
        <rect 
          x={leftPadding} 
          y={chartHeight - 35} 
          width={usableWidth} 
          height="30" 
          fill="#ffffff05" 
          rx="2"
        />
        
        {/* X-axis labels */}
        {data.filter((_, i) => i % Math.max(1, Math.floor(data.length / 8)) === 0).map((candle, index) => {
          const actualIndex = data.findIndex(d => d.date_utc === candle.date_utc);
          const x = leftPadding + (actualIndex * usableWidth) / data.length + usableWidth / (data.length * 2);
          return (
            <text
              key={index}
              x={x}
              y={chartHeight - 8}
              fill="#ffffff40"
              fontSize="10"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {formatTime(candle.date_utc)}
            </text>
          );
        })}
        
        {/* Candlesticks */}
        {data.map((candle, index) => {
          const x = leftPadding + (index * usableWidth) / data.length + usableWidth / (data.length * 2);
          const isGreen = candle.close > candle.open;
          const bodyTop = priceToY(Math.max(candle.open, candle.close));
          const bodyBottom = priceToY(Math.min(candle.open, candle.close));
          const bodyHeight = Math.max(2, bodyBottom - bodyTop);
          
          // Volume bar
          const maxVolume = Math.max(...data.map(d => d.volume || 0));
          const volumeHeight = maxVolume > 0 ? ((candle.volume || 0) / maxVolume) * 25 : 0;
          
          return (
            <g key={index}>
              {/* Volume bar */}
              <rect
                x={x - candleWidth / 2}
                y={chartHeight - 35 - volumeHeight}
                width={candleWidth}
                height={volumeHeight}
                fill={isGreen ? "#22c55e20" : "#ef444420"}
                opacity="0.7"
              />
              
              {/* Wick */}
              <line
                x1={x}
                y1={priceToY(candle.high)}
                x2={x}
                y2={priceToY(candle.low)}
                stroke={isGreen ? "#22c55e" : "#ef4444"}
                strokeWidth="2"
                opacity="0.8"
              />
              
              {/* Body */}
              <rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={bodyHeight}
                fill={isGreen ? "url(#greenGradient)" : "url(#redGradient)"}
                stroke={isGreen ? "#16a34a" : "#dc2626"}
                strokeWidth="1"
                className="cursor-pointer hover:opacity-90 transition-opacity"
                rx="1"
                onMouseEnter={() => setHoveredCandle({ ...candle, index, x, y: bodyTop })}
                onMouseLeave={() => setHoveredCandle(null)}
              />
              
              {/* Glow effect for hovered candle */}
              {hoveredCandle && hoveredCandle.index === index && (
                <rect
                  x={x - candleWidth / 2 - 2}
                  y={bodyTop - 2}
                  width={candleWidth + 4}
                  height={bodyHeight + 4}
                  fill="none"
                  stroke={isGreen ? "#22c55e" : "#ef4444"}
                  strokeWidth="2"
                  opacity="0.5"
                  rx="2"
                />
              )}
            </g>
          );
        })}
        
        {/* Tooltip */}
        {hoveredCandle && (
          <g>
            <rect
              x={Math.min(hoveredCandle.x + 15, chartWidth - 220)}
              y={Math.max(hoveredCandle.y - 80, 10)}
              width="200"
              height="90"
              fill="rgba(0, 0, 0, 0.95)"
              stroke="#ffffff30"
              strokeWidth="1"
              rx="8"
              filter="drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))"
            />
            <text 
              x={Math.min(hoveredCandle.x + 25, chartWidth - 210)} 
              y={Math.max(hoveredCandle.y - 55, 35)} 
              fill="#ffffff" 
              fontSize="13" 
              fontWeight="bold"
              fontFamily="monospace"
            >
              {formatTime(hoveredCandle.date_utc)}
            </text>
            <text 
              x={Math.min(hoveredCandle.x + 25, chartWidth - 210)} 
              y={Math.max(hoveredCandle.y - 38, 52)} 
              fill="#22c55e" 
              fontSize="11"
              fontFamily="monospace"
            >
              O: ${formatPrice(hoveredCandle.open)} H: ${formatPrice(hoveredCandle.high)}
            </text>
            <text 
              x={Math.min(hoveredCandle.x + 25, chartWidth - 210)} 
              y={Math.max(hoveredCandle.y - 23, 67)} 
              fill="#ef4444" 
              fontSize="11"
              fontFamily="monospace"
            >
              L: ${formatPrice(hoveredCandle.low)} C: ${formatPrice(hoveredCandle.close)}
            </text>
            {hoveredCandle.volume && (
              <text 
                x={Math.min(hoveredCandle.x + 25, chartWidth - 210)} 
                y={Math.max(hoveredCandle.y - 8, 82)} 
                fill="#ffffff80" 
                fontSize="11"
                fontFamily="monospace"
              >
                Vol: {(hoveredCandle.volume / 1000000).toFixed(1)}M
              </text>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

const TimeFrameSelector = ({ selected, onSelect }) => {
  const timeFrames = [
    { id: 'current', label: 'Current', icon: Clock },
    { id: 'week', label: 'Week', icon: Calendar },
    { id: 'month', label: 'Month', icon: BarChart3 }
  ];

  return (
    <div className="flex bg-gray-800/50 rounded-xl p-1 backdrop-blur-sm">
      {timeFrames.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            selected === id
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
          }`}
        >
          <Icon size={16} />
          <span className="font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};
import axios from "axios";
const StockDashboard = () => {
  const [timeFrame, setTimeFrame] = useState("current");
  const [chartData, setChartData] = useState([]);
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [stockData, setStockData] = useState({
    longName: "Apple Inc.",
    regularMarketPrice: 0,
    regularMarketOpen: 0,
    regularMarketPreviousClose: 0,
    regularMarketDayHigh: 0,
    regularMarketDayLow: 0,
  });

  // 🧠 Fetch real stock data from Yahoo Finance API
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const intervalMap = {
          current: "5m",
          week: "1h",
          month: "1d",
        };
        console.log("yo")
        const interval = intervalMap[timeFrame] || "1d";

        const options = {
          method: "GET",
          url: `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/history`,
          params: {
            symbol: stockSymbol,
            interval,
            diffandsplits: "false",
          },
          headers: {
                "x-rapidapi-key": "293db707d2msh3b8c351d3e22470p1f39eajsn5f72855ed56b",
                "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
              },
        };

        const response = await axios.request(options);
        // console.log(response)
       const raw = Object.values(response.data?.body || {});
        console.log(raw)
        if (!raw.length) {
          setChartData([]);
          return;
        }

        const formatted = raw.map((item) => ({
          date_utc: Math.floor(new Date(item.date).getTime() / 1000),
          open: parseFloat(item.open),
          high: parseFloat(item.high),
          low: parseFloat(item.low),
          close: parseFloat(item.close),
          volume: parseInt(item.volume),
        }));
        console.log("formated",formatted)
        setChartData(formatted);

        // Also update stats from last candle
        const latest = formatted[formatted.length - 1];
        const first = formatted[0];

        setStockData((prev) => ({
          ...prev,
          regularMarketPrice: latest.close,
          regularMarketOpen: first.open,
          regularMarketPreviousClose: formatted.length >= 2 ? formatted[formatted.length - 2].close : latest.close,
          regularMarketDayHigh: Math.max(...formatted.map((d) => d.high)),
          regularMarketDayLow: Math.min(...formatted.map((d) => d.low)),
        }));
      } catch (err) {
        console.error("Fetch error", err);
        setChartData([]);
      }
    };

    fetchStockData();
  }, [timeFrame, stockSymbol]);
console.log(chartData)
  // 📊 Price Change Summary
  const getPriceChange = () => {
    const change = stockData.regularMarketPrice - stockData.regularMarketPreviousClose;
    const percentage = (change / stockData.regularMarketPreviousClose) * 100;

    return {
      change: change.toFixed(2),
      percentage: percentage.toFixed(2),
      isPositive: change >= 0,
    };
  };

  const priceChange = getPriceChange();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
      <div className="w-full mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {stockData.longName || stockSymbol}
              </h1>
              <p className="text-gray-400 mt-2">{stockSymbol}</p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-3xl font-bold">${stockData.regularMarketPrice}</div>
                <div
                  className={`flex items-center space-x-1 ${
                    priceChange.isPositive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {priceChange.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>{priceChange.isPositive ? "+" : ""}
                    {priceChange.change}
                  </span>
                  <span>({priceChange.isPositive ? "+" : ""}
                    {priceChange.percentage}%)
                  </span>
                </div>
              </div>

              <TimeFrameSelector selected={timeFrame} onSelect={setTimeFrame} />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Price Chart</h2>
            <p className="text-gray-400">Interactive candlestick chart with volume indicators</p>
          </div>

          <div className="overflow-x-auto">
            <CandlestickChart data={chartData} timeFrame={timeFrame} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Open", value: stockData.regularMarketOpen, color: "text-blue-400" },
            { label: "Previous Close", value: stockData.regularMarketPreviousClose, color: "text-gray-400" },
            { label: "Day High", value: stockData.regularMarketDayHigh, color: "text-green-400" },
            { label: "Day Low", value: stockData.regularMarketDayLow, color: "text-red-400" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
            >
              <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>${stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockDashboard;