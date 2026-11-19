import React, { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { CANCELLATION_DISTRIBUTION, DATASET_STATS } from "../data/datasetStats";

export default function CancellationDistributionChart() {
  const [chartType, setChartType] = useState("bar"); // "bar" (Colab countplot) or "donut"

  const data = CANCELLATION_DISTRIBUTION;

  const barData = [
    {
      status: "Not Cancelled (0)",
      count: DATASET_STATS.notCancelled,
      rate: "62.96%",
      color: "#C6A46A",
    },
    {
      status: "Cancelled (1)",
      count: DATASET_STATS.cancelled,
      rate: "37.04%",
      color: "#45171B",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-wine-dark/95 backdrop-blur-md border border-gold/40 p-3.5 rounded-2xl shadow-xl text-xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <p className="font-semibold text-burgundy dark:text-ivory">
              {item.name || item.status}
            </p>
          </div>
          <p className="text-charcoal/80 dark:text-beige/80">
            Total Volume: <span className="font-mono font-bold">{(item.value || item.count).toLocaleString()}</span> bookings
          </p>
          <p className="text-gold-700 dark:text-gold-300 font-bold border-t border-gold/20 pt-1">
            Dataset Proportion: {item.rate}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      {/* Switcher: Colab Countplot vs Donut */}
      <div className="flex items-center justify-between text-xs pb-1">
        <span className="text-charcoal/60 dark:text-beige/60">
          X-Axis: Booking Status (0 = Not Cancelled, 1 = Cancelled)
        </span>
        <div className="flex items-center gap-1 bg-charcoal/5 dark:bg-wine-light/30 p-1 rounded-xl border border-gold/20">
          <button
            type="button"
            onClick={() => setChartType("bar")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              chartType === "bar"
                ? "bg-gold text-wine shadow-sm"
                : "text-charcoal/60 dark:text-beige/60 hover:text-gold"
            }`}
          >
            Countplot (Colab)
          </button>
          <button
            type="button"
            onClick={() => setChartType("donut")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              chartType === "donut"
                ? "bg-gold text-wine shadow-sm"
                : "text-charcoal/60 dark:text-beige/60 hover:text-gold"
            }`}
          >
            Donut Share
          </button>
        </div>
      </div>

      <div className="w-full h-72 relative flex flex-col items-center justify-center">
        {chartType === "bar" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(198, 164, 106, 0.18)" vertical={false} />
              <XAxis
                dataKey="status"
                tick={{ fill: "#A88548", fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#A88548", fontSize: 11 }}
                axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
                tickLine={false}
                tickFormatter={(v) => `${v / 1000}k`}
                domain={[0, 85000]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Number of Bookings" radius={[8, 8, 0, 0]} maxBarSize={60}>
                {barData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[62%] text-center pointer-events-none">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-burgundy dark:text-ivory block leading-none">
                37.0%
              </span>
              <span className="text-[10px] uppercase font-semibold text-charcoal/50 dark:text-beige/60 tracking-wider">
                Cancelled
              </span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="45%"
                  innerRadius={68}
                  outerRadius={96}
                  paddingAngle={4}
                  dataKey="value"
                  animationDuration={800}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value, entry) => (
                    <span className="text-xs font-medium text-charcoal/80 dark:text-beige/80">
                      {value} ({entry.payload.rate})
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    </div>
  );
}
