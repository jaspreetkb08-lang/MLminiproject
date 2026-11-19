import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { MODEL_COMPARISON } from "../data/modelMetrics";

export default function ModelComparisonChart({ selectedModelId, onSelectModel }) {
  const data = MODEL_COMPARISON.map((m) => ({
    id: m.id,
    name: m.shortName,
    Accuracy: m.accuracy,
    Precision: m.precision,
    Recall: m.recall,
    "F1 Score": m.f1Score,
    isBest: m.isBest,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isRandomForest = label === "Random Forest";
      return (
        <div className="bg-white/95 dark:bg-wine-dark/95 backdrop-blur-md border border-gold/40 p-4 rounded-2xl shadow-xl text-xs space-y-2">
          <div className="flex items-center justify-between gap-3 border-b border-gold/20 pb-1.5">
            <span className="font-serif font-bold text-sm text-burgundy dark:text-gold">{label}</span>
            {isRandomForest && (
              <span className="px-2 py-0.5 rounded text-[10px] bg-gold text-wine font-extrabold uppercase tracking-wide">
                Best F1: 69.48%
              </span>
            )}
          </div>
          <div className="space-y-1">
            {payload.map((entry, idx) => (
              <div key={idx} className="flex justify-between items-center gap-6">
                <span style={{ color: entry.color }} className="font-medium">
                  {entry.name}:
                </span>
                <span className="font-mono font-bold text-charcoal dark:text-ivory">
                  {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-84">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
          barGap={6}
          onClick={(state) => {
            if (state && state.activePayload && onSelectModel) {
              onSelectModel(state.activePayload[0].payload.id);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(198, 164, 106, 0.18)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#A88548", fontSize: 12, fontWeight: 600 }}
            axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#A88548", fontSize: 11 }}
            axisLine={{ stroke: "rgba(198, 164, 106, 0.3)" }}
            tickLine={false}
            tickFormatter={(val) => `${val}%`}
            domain={[40, 95]}
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
          <Bar dataKey="Accuracy" fill="#C6A46A" radius={[5, 5, 0, 0]} maxBarSize={28} />
          <Bar dataKey="Precision" fill="#B77B7E" radius={[5, 5, 0, 0]} maxBarSize={28} />
          <Bar dataKey="Recall" fill="#6C2830" radius={[5, 5, 0, 0]} maxBarSize={28} />
          <Bar dataKey="F1 Score" fill="#45171B" radius={[5, 5, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
