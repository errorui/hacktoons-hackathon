
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LineChart as ChartIcon, BookOpenCheck, TrendingUp } from "lucide-react";

const stockChartData = [
  { day: "Mon", price: 124 },
  { day: "Tue", price: 129 },
  { day: "Wed", price: 122 },
  { day: "Thu", price: 135 },
  { day: "Fri", price: 140 },
];

const features = [
  {
    icon: <ChartIcon className="h-6 w-6" />,
    title: "Real-time Analysis",
    desc: "Stay ahead with live market charts, trends, and metrics.",
  },
  {
    icon: <BookOpenCheck className="h-6 w-6" />,
    title: "Learn Stock Basics",
    desc: "Master fundamentals through visual insights and tutorials.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Smart Predictions",
    desc: "AI-powered forecasts to guide your investment decisions.",
  },
];

export default function MissionVisionValues() {
  return (
    <section id="about" className="py-20 bg-white  text-black">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-slate-800 ">Empower Your Investing</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Learn. Analyze. Grow. All in one platform.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="border border-slate-100 bg-white text-blue-950 p-6 rounded-lg shadow-md hover:shadow-2xl transition-transform hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100   mb-4">
              {f.icon}
            </div>
            <h3 className="text-xl font-semibold text-slate-800  mb-2 group-hover:text-blue-600 transition">
              {f.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Sample Stock Chart */}
      <div className="max-w-4xl mx-auto mt-20">
        <h3 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-6">
          Demo: Stock Price Movement
        </h3>
        <div className="bg-white  shadow-2xl p-6 rounded-2xl  border-[4px] border-slate-100">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stockChartData}>
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
