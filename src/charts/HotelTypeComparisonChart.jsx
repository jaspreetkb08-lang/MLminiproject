import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

export default function HotelTypeComparisonChart() {
  const [viewMode, setViewMode] = useState("count"); // "count" (Colab countplot) or "rate"

  const data = [
    {
      category: "City Hotel",
      total: 79330,
      notCancelled: 46228,
      cancelled: 33102,
      rate: 41.73,
      observation: "City properties exhibit 41.73% churn due to business traveler volatility",
    },
    {
      category: "Resort Hotel",
      total: 40060,
      notCancelled: 28938,
      cancelled: 11122,
      rate: 27.76,
      observation: "Resort properties exhibit lower churn (27.76%) due to advance leisure commitment",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const match = data.find((d) => d.category === label);
      return (
        <div className="bg-white/95 dark:bg-wine-dark/95 backdrop-blur-md border border-gold/40 p-3.5 rounded-2xl shadow-xl text-xs space-y-1">
          <p className="font-serif font-bold text-sm text-burgundy dark:text-gold mb-1">{label}</p>
          <p className="text-charcoal/80 dark:text-beige/80">
            Total Inventory: <span className="font-mono font-bold">{match?.total.toLocaleString()}</span>
          </p>
          <div className="mt-1 space-y-1">
            <p className="text-gold-700 dark:text-gold font-medium flex items-center justify-between gap-4">
              <span>Not Cancelled (0):</span>
              <span className="font-mono font-bold">{match?.notCancelled.toLocaleString()}</span>
            </p>
            <p className="text-rose font-medium flex items-center justify-between gap-4">
              <span>Cancelled (1):</span>
              <span className="font-mono font-bold">{match?.cancelled.toLocaleString()}</span>
            </p>
          </div>
          <div className="mt-2 text-rose font-bold border-t border-gold/20 pt-1 flex justify-between">
            <span>Cancellation Rate:</span>
            <span>{match?.rate}%</span>
          </div>
          <p className="text-[10px] text-charcoal/60 dark:text-beige/60 italic pt-0.5">
            {match?.observation}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      {/* View Switcher: Colab Countplot vs Cancellation Rate */}
      <div className="flex items-center justify-between text-xs pb-1">
        <span className="text-charcoal/60 dark:text-beige/60">
          X-Axis: Hotel Type • Legend: Cancellation Hue (0 vs 1)
        </span>
        <div className="flex items-center gap-1 bg-charcoal/5 dark:bg-wine-light/30 p-1 rounded-xl border border-gold/20">
          <button
            type="button"
            onClick={() => setViewMode("count")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              viewMode === "count"
                ? "bg-gold text-wine shadow-sm"
                : "text-charcoal/60 dark:text-beige/60 hover:text-gold"
            }`}
          >
            Countplot (Colab)
          </button>
          <button
            type="button"
            onClick={() => setViewMode("rate")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              viewMode === "rate"
                ? "bg-gold text-wine shadow-sm"
                : "text-charcoal/60 dark:text-beige/60 hover:text-gold"
            }`}
          >
            Rate (%)
          </button>
        </div>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === "count" ? (
            <BarChart data={data} margin={{ top: 20, right: 20, left: -5, bottom: 5 }} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(198, 164, 106, 0.18)" vertical={false} />
              <XAxis
                dataKey="category"
                tick={{ fill: "#A88548", fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#A88548", fontSize: 11 }}
                axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
                tickLine={false}
                tickFormatter={(val) => `${val / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={30}
                formatter={(value) => (
                  <span className="text-xs font-medium text-charcoal/80 dark:text-beige/80">
                    {value}
                  </span>
                )}
              />
              <Bar dataKey="notCancelled" name="Not Cancelled (0)" fill="#C6A46A" radius={[6, 6, 0, 0]} maxBarSize={45} />
              <Bar dataKey="cancelled" name="Cancelled (1)" fill="#45171B" radius={[6, 6, 0, 0]} maxBarSize={45} />
            </BarChart>
          ) : (
            <BarChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(198, 164, 106, 0.18)" vertical={false} />
              <XAxis
                dataKey="category"
                tick={{ fill: "#A88548", fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#A88548", fontSize: 11 }}
                axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
                tickLine={false}
                tickFormatter={(val) => `${val}%`}
                domain={[0, 50]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rate" name="Cancellation Rate (%)" radius={[8, 8, 0, 0]} maxBarSize={55}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.category === "City Hotel" ? "#45171B" : "#C6A46A"}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
