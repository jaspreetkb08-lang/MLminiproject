import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { MONTHLY_TRENDS } from "../data/datasetStats";

export default function MonthlyTrendsChart() {
  const data = MONTHLY_TRENDS.map((item) => ({
    month: item.month,
    "City Cancellations": item.cityCancelled,
    "Resort Cancellations": item.resortCancelled,
    "Total Cancelled": item.cityCancelled + item.resortCancelled,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-wine-dark/95 backdrop-blur-md border border-gold/40 p-3.5 rounded-2xl shadow-xl text-xs space-y-1.5">
          <p className="font-serif font-bold text-sm text-burgundy dark:text-gold mb-1">{label} Seasonality</p>
          <div className="space-y-1">
            {payload.map((entry, idx) => (
              <p key={idx} style={{ color: entry.color }} className="font-medium flex justify-between gap-6">
                <span>{entry.name}:</span>
                <span className="font-mono font-bold">{entry.value.toLocaleString()}</span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(198, 164, 106, 0.18)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: "#A88548", fontSize: 11, fontWeight: 500 }}
            axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#A88548", fontSize: 11 }}
            axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => (
              <span className="text-xs font-medium text-charcoal/80 dark:text-beige/80">
                {value}
              </span>
            )}
          />
          <Line
            type="monotone"
            dataKey="City Cancellations"
            stroke="#45171B"
            strokeWidth={3}
            dot={{ r: 3.5, fill: "#45171B", stroke: "#FAF7F2", strokeWidth: 1.5 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Resort Cancellations"
            stroke="#C6A46A"
            strokeWidth={3}
            dot={{ r: 3.5, fill: "#C6A46A", stroke: "#FAF7F2", strokeWidth: 1.5 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Total Cancelled"
            stroke="#B77B7E"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
