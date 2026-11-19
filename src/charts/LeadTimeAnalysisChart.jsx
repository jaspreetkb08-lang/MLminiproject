import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { CANCELLATION_BY_LEAD_TIME, DATASET_STATS } from "../data/datasetStats";

export default function LeadTimeAnalysisChart() {
  const [viewMode, setViewMode] = useState("binned"); // "binned" or "boxplot"

  // Colab Boxplot Summary Statistics
  const boxplotData = [
    {
      status: "Not Cancelled (0)",
      mean: 79.9,
      median: 45,
      q1: 18,
      q3: 124,
      iqr: 106,
      maxP95: 240,
      color: "#C6A46A",
    },
    {
      status: "Cancelled (1)",
      mean: 144.8,
      median: 113,
      q1: 53,
      q3: 214,
      iqr: 161,
      maxP95: 330,
      color: "#45171B",
    },
  ];

  const CustomTooltipBinned = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-wine-dark/95 backdrop-blur-md border border-gold/40 p-3.5 rounded-2xl shadow-xl text-xs space-y-1">
          <p className="font-serif font-bold text-sm text-burgundy dark:text-gold mb-1">
            Lead Time: {label}
          </p>
          <div className="space-y-1 text-charcoal/80 dark:text-beige/80">
            <p className="flex justify-between gap-4">
              <span>Total Volume:</span>
              <span className="font-mono font-bold">{item.total.toLocaleString()}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span>Cancelled:</span>
              <span className="font-mono text-rose font-bold">{item.cancelled.toLocaleString()}</span>
            </p>
            <p className="font-bold text-gold-700 dark:text-gold-300 border-t border-gold/20 pt-1 flex justify-between gap-4">
              <span>Cancellation Probability:</span>
              <span>{item.rate}%</span>
            </p>
            <p className="text-[10px] text-charcoal/60 dark:text-beige/60 italic pt-0.5">
              {item.observation}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomTooltipBoxplot = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-wine-dark/95 backdrop-blur-md border border-gold/40 p-3.5 rounded-2xl shadow-xl text-xs space-y-1">
          <p className="font-serif font-bold text-sm text-burgundy dark:text-gold mb-1">
            {label} — Lead Time Distribution
          </p>
          <div className="space-y-1 text-charcoal/80 dark:text-beige/80 font-mono text-[11px]">
            <p className="flex justify-between gap-4">
              <span>Average (Mean):</span>
              <span className="font-bold text-burgundy dark:text-gold">{item.mean} days</span>
            </p>
            <p className="flex justify-between gap-4">
              <span>Median (50th %):</span>
              <span className="font-bold">{item.median} days</span>
            </p>
            <p className="flex justify-between gap-4">
              <span>Q1 (25th %):</span>
              <span>{item.q1} days</span>
            </p>
            <p className="flex justify-between gap-4">
              <span>Q3 (75th %):</span>
              <span>{item.q3} days</span>
            </p>
            <p className="flex justify-between gap-4 border-t border-gold/20 pt-1 text-gold font-bold">
              <span>Interquartile Range:</span>
              <span>{item.iqr} days</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      {/* View Switcher: Binned Probability vs Colab Boxplot Averages */}
      <div className="flex items-center justify-between text-xs pb-1">
        <span className="text-charcoal/60 dark:text-beige/60">
          {viewMode === "binned"
            ? "Showing: Cancellation Probability by Advance Booking Window"
            : "Showing: Colab Lead Time Quartiles & Dispersion (Mean/Median)"}
        </span>
        <div className="flex items-center gap-1 bg-charcoal/5 dark:bg-wine-light/30 p-1 rounded-xl border border-gold/20">
          <button
            type="button"
            onClick={() => setViewMode("binned")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              viewMode === "binned"
                ? "bg-gold text-wine shadow-sm"
                : "text-charcoal/60 dark:text-beige/60 hover:text-gold"
            }`}
          >
            Risk Curve
          </button>
          <button
            type="button"
            onClick={() => setViewMode("boxplot")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              viewMode === "boxplot"
                ? "bg-gold text-wine shadow-sm"
                : "text-charcoal/60 dark:text-beige/60 hover:text-gold"
            }`}
          >
            Boxplot Quartiles
          </button>
        </div>
      </div>

      <div className="w-full h-72">
        {viewMode === "binned" ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={CANCELLATION_BY_LEAD_TIME}
              margin={{ top: 15, right: 20, left: -10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="leadTimeLuxuryGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#45171B" stopOpacity={0.7} />
                  <stop offset="60%" stopColor="#C6A46A" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#C6A46A" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(198, 164, 106, 0.18)" vertical={false} />
              <XAxis
                dataKey="range"
                tick={{ fill: "#A88548", fontSize: 11, fontWeight: 500 }}
                axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#A88548", fontSize: 11 }}
                axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                domain={[0, 75]}
              />
              <Tooltip content={<CustomTooltipBinned />} />
              <Area
                type="monotone"
                dataKey="rate"
                name="Cancellation Rate"
                stroke="#45171B"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#leadTimeLuxuryGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={boxplotData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              barGap={12}
            >
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
                tickFormatter={(v) => `${v}d`}
                domain={[0, 160]}
              />
              <Tooltip content={<CustomTooltipBoxplot />} />
              <Legend
                verticalAlign="top"
                height={30}
                formatter={(val) => (
                  <span className="text-xs text-charcoal/80 dark:text-beige/80">{val}</span>
                )}
              />
              <Bar dataKey="mean" name="Mean Lead Time (Days)" radius={[6, 6, 0, 0]} maxBarSize={45}>
                {boxplotData.map((entry, index) => (
                  <Cell key={`mean-${index}`} fill={entry.color} />
                ))}
              </Bar>
              <Bar dataKey="median" name="Median Lead Time (Days)" fill="#C6A46A" radius={[6, 6, 0, 0]} maxBarSize={45} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
