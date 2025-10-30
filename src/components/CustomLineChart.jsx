import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { formatCurrency } from "../util/ChartHelpers";

// Custom tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-3 text-sm">
  <p className="font-semibold text-gray-800 mb-1">{data.month}</p>
  <p className="text-purple-600 font-semibold mb-1">
    Total: {formatCurrency(data.totalAmount)}
  </p>
  <div className="mt-1 text-gray-600 space-y-0.5">
    {data.items.map((item, index) => (
      <p key={index} className="flex justify-between gap-2">
        <span>{item.categoryName}</span>
        <span>{formatCurrency(item.amount)}</span>
      </p>
    ))}
  </div>
</div>
    );
  }
  return null;
};

const CustomLineChart = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          {/* Gradient Fill */}
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#6B7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
  tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value)}
  tick={{ fill: "#6B7280", fontSize: 12 }}
  axisLine={false}
  tickLine={false}
  domain={[0, "auto"]}
  padding={{ top: 10, bottom: 10 }}
/>

          <Tooltip content={<CustomTooltip />} />

          {/* Area for soft fill */}
          <Area
  type="monotone"
  dataKey="totalAmount"
  stroke="#7C3AED"
  fill="url(#colorIncome)"
  strokeWidth={3}
  dot={{ r: 4, stroke: "#7C3AED", strokeWidth: 2, fill: "#fff" }}
  activeDot={{ r: 6 }}
  isAnimationActive={true}
  animationDuration={1200}
  animationEasing="ease-in-out"
/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
