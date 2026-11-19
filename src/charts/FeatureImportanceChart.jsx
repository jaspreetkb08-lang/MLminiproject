import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { FEATURE_IMPORTANCE } from "../data/modelMetrics";

export default function FeatureImportanceChart() {
  const data = [...FEATURE_IMPORTANCE].sort((a, b) => b.importance - a.importance);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-wine-dark/95 backdrop-blur-md border border-gold/40 p-3.5 rounded-2xl shadow-xl text-xs space-y-1">
          <div className="flex items-center justify-between gap-3">
            <p className="font-serif font-bold text-sm text-burgundy dark:text-gold">
              {item.label}
            </p>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gold/15 text-wine dark:text-gold font-bold">
              Rank #{item.rank}
            </span>
          </div>
          <p className="font-mono text-[11px] text-charcoal/60 dark:text-beige/60">
            Column: <code className="text-gold font-semibold">{item.feature}</code>
          </p>
          <p className="text-charcoal/70 dark:text-beige/70 text-[11px]">
            Domain: <span className="font-semibold text-gold-700 dark:text-gold">{item.category}</span>
          </p>
          <p className="font-mono font-bold text-charcoal dark:text-ivory border-t border-gold/20 pt-1 flex justify-between gap-4">
            <span>Gini Importance Weight:</span>
            <span>{(item.importance * 100).toFixed(1)}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 130, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(198, 164, 106, 0.18)" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: "#A88548", fontSize: 11 }}
            axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
            tickLine={false}
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            domain={[0, 0.28]}
          />
          <YAxis
            type="category"
            dataKey="label"
            tick={{ fill: "#A88548", fontSize: 11, fontWeight: 500 }}
            axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
            tickLine={false}
            width={160}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="importance" radius={[0, 6, 6, 0]} maxBarSize={20}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index === 0
                    ? "#45171B"
                    : index === 1
                    ? "#601E24"
                    : index < 4
                    ? "#C6A46A"
                    : "#D8BC88"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
