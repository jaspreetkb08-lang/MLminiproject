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

export default function DepositTypeChart() {
  const [viewMode, setViewMode] = useState("count"); // "count" (Colab countplot) or "rate"

  const data = [
    {
      type: "No Deposit",
      notCancelled: 74947,
      cancelled: 29694,
      total: 104641,
      rate: 28.38,
      observation: "Standard terms; 28.38% baseline churn",
    },
    {
      type: "Non Refund",
      notCancelled: 93,
      cancelled: 14494,
      total: 14587,
      rate: 99.36,
      observation: "Paradoxical 99.36% churn; non-refundable rate-shopping",
    },
    {
      type: "Refundable",
      notCancelled: 126,
      cancelled: 36,
      total: 162,
      rate: 22.22,
      observation: "Low volume (162 stays); lowest cancellation rate",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const match = data.find((d) => d.type === label);
      return (
        <div className="bg-white/95 dark:bg-wine-dark/95 backdrop-blur-md border border-gold/40 p-3.5 rounded-2xl shadow-xl text-xs space-y-1">
          <p className="font-serif font-bold text-sm text-burgundy dark:text-gold mb-1">
            Deposit Policy: {label}
          </p>
          <div className="space-y-1 text-charcoal/80 dark:text-beige/80">
            <p className="flex justify-between gap-4">
              <span>Total Reservations:</span>
              <span className="font-mono font-bold">{match?.total.toLocaleString()}</span>
            </p>
            <p className="flex justify-between gap-4 text-gold-700 dark:text-gold">
              <span>Not Cancelled (0):</span>
              <span className="font-mono font-bold">{match?.notCancelled.toLocaleString()}</span>
            </p>
            <p className="flex justify-between gap-4 text-rose">
              <span>Cancelled (1):</span>
              <span className="font-mono font-bold">{match?.cancelled.toLocaleString()}</span>
            </p>
            <p className="font-bold text-gold-700 dark:text-gold-300 border-t border-gold/20 pt-1 flex justify-between gap-4">
              <span>Cancellation Rate:</span>
              <span>{match?.rate}%</span>
            </p>
            <p className="text-[10px] text-charcoal/60 dark:text-beige/60 italic pt-0.5">
              {match?.observation}
            </p>
          </div>
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
          X-Axis: Deposit Type • Legend: Cancellation Hue (0 vs 1)
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
                dataKey="type"
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
                formatter={(val) => (
                  <span className="text-xs text-charcoal/80 dark:text-beige/80">{val}</span>
                )}
              />
              <Bar dataKey="notCancelled" name="Not Cancelled (0)" fill="#C6A46A" radius={[6, 6, 0, 0]} maxBarSize={40} />
              <Bar dataKey="cancelled" name="Cancelled (1)" fill="#45171B" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          ) : (
            <BarChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(198, 164, 106, 0.18)" vertical={false} />
              <XAxis
                dataKey="type"
                tick={{ fill: "#A88548", fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#A88548", fontSize: 11 }}
                axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
                tickLine={false}
                tickFormatter={(val) => `${val}%`}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rate" name="Cancellation Rate (%)" radius={[8, 8, 0, 0]} maxBarSize={55}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.type === "Non Refund" ? "#45171B" : "#C6A46A"}
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
