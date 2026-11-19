import React, { useState } from "react";
import { MODEL_COMPARISON } from "../data/modelMetrics";
import { Award, CheckCircle2, AlertTriangle, Layers, Info } from "lucide-react";

export default function ConfusionMatrixChart() {
  const [activeTab, setActiveTab] = useState("all"); // "all" (side-by-side) or specific model id

  return (
    <div className="space-y-6">
      
      {/* View Toggle Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/20 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "all"
                ? "bg-gold text-wine shadow-sm"
                : "bg-white/80 dark:bg-wine-light/30 text-charcoal/70 dark:text-beige/70 border border-gold/20 hover:border-gold/50"
            }`}
          >
            All 3 Models (Side-by-Side Comparison)
          </button>

          {MODEL_COMPARISON.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveTab(m.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === m.id
                  ? "bg-gold text-wine shadow-sm"
                  : "bg-white/80 dark:bg-wine-light/30 text-charcoal/70 dark:text-beige/70 border border-gold/20 hover:border-gold/50"
              }`}
            >
              <span>{m.shortName}</span>
              {m.isBest && (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-wine text-gold uppercase font-bold">
                  Top F1
                </span>
              )}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-mono text-gold-700 dark:text-gold font-medium">
          Test Sample: 35,878 (Stratified 30%) / 17,480 (20%)
        </span>
      </div>

      {/* SIDE-BY-SIDE ALL 3 MATRICES VIEW */}
      {activeTab === "all" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MODEL_COMPARISON.map((m) => {
            const { tp, fp, fn, tn } = m.confusionMatrix;
            const total = tp + fp + fn + tn;
            return (
              <div
                key={m.id}
                className={`p-5 rounded-2xl border transition-all ${
                  m.isBest
                    ? "bg-gold/10 dark:bg-gold/5 border-gold shadow-sm ring-1 ring-gold/40"
                    : "bg-white/90 dark:bg-wine-deep/90 border-gold/20"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gold/15 mb-3">
                  <div>
                    <span className="font-serif text-base font-bold text-burgundy dark:text-ivory block">
                      {m.shortName}
                    </span>
                    <span className="text-[10px] text-charcoal/50 dark:text-beige/50 font-mono">
                      {m.isBest ? "Champion Model" : "Evaluated Baseline"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-charcoal/50 dark:text-beige/50 uppercase block font-semibold">
                      F1 Score
                    </span>
                    <span className="font-mono text-base font-bold text-gold">
                      {m.f1Score}%
                    </span>
                  </div>
                </div>

                {/* 2x2 Matrix */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  {/* True Positive */}
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                      TP (True Pos)
                    </span>
                    <span className="font-mono text-lg font-bold text-emerald-950 dark:text-emerald-100 block my-0.5">
                      {tp.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-charcoal/60 dark:text-beige/60">
                      Predicted Cancel & Cancelled
                    </span>
                  </div>

                  {/* False Positive */}
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 block">
                      FP (False Alarm)
                    </span>
                    <span className="font-mono text-lg font-bold text-rose-950 dark:text-rose-100 block my-0.5">
                      {fp.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-charcoal/60 dark:text-beige/60">
                      Predicted Cancel, Guest Stayed
                    </span>
                  </div>

                  {/* False Negative */}
                  <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                      FN (Missed)
                    </span>
                    <span className="font-mono text-lg font-bold text-amber-950 dark:text-amber-100 block my-0.5">
                      {fn.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-charcoal/60 dark:text-beige/60">
                      Predicted Stay, Cancelled
                    </span>
                  </div>

                  {/* True Negative */}
                  <div className="p-3 rounded-xl bg-blue-500/15 border border-blue-500/30">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 block">
                      TN (True Neg)
                    </span>
                    <span className="font-mono text-lg font-bold text-blue-950 dark:text-blue-100 block my-0.5">
                      {tn.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-charcoal/60 dark:text-beige/60">
                      Predicted Stay & Stayed
                    </span>
                  </div>
                </div>

                {/* Micro Metric Footer */}
                <div className="mt-3 pt-2 border-t border-gold/15 grid grid-cols-3 gap-1 text-center font-mono text-[10px]">
                  <div>
                    <span className="text-charcoal/50 dark:text-beige/50 block">Accuracy</span>
                    <span className="font-bold text-charcoal dark:text-ivory">{m.accuracy}%</span>
                  </div>
                  <div>
                    <span className="text-charcoal/50 dark:text-beige/50 block">Precision</span>
                    <span className="font-bold text-charcoal dark:text-ivory">{m.precision}%</span>
                  </div>
                  <div>
                    <span className="text-charcoal/50 dark:text-beige/50 block">Recall</span>
                    <span className="font-bold text-charcoal dark:text-ivory">{m.recall}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* FOCUSED SINGLE MODEL VIEW */
        (() => {
          const m = MODEL_COMPARISON.find((mod) => mod.id === activeTab) || MODEL_COMPARISON[0];
          const { tp, fp, fn, tn } = m.confusionMatrix;
          const total = tp + fp + fn + tn;
          return (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
                <div className="p-5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    True Positives (TP)
                  </span>
                  <span className="font-display text-3xl font-bold text-emerald-900 dark:text-emerald-200 my-1">
                    {tp.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-charcoal/60 dark:text-beige/60">
                    Correctly Identified Cancellations
                  </span>
                  <span className="text-[10px] font-mono mt-1 text-emerald-700 dark:text-emerald-400">
                    {((tp / total) * 100).toFixed(1)}% of test set
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-rose-500/10 dark:bg-rose-950/30 border border-rose-500/30 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                    False Positives (FP)
                  </span>
                  <span className="font-display text-3xl font-bold text-rose-900 dark:text-rose-200 my-1">
                    {fp.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-charcoal/60 dark:text-beige/60">
                    Type I Error (False Alarm: Guest Stayed)
                  </span>
                  <span className="text-[10px] font-mono mt-1 text-rose-700 dark:text-rose-400">
                    {((fp / total) * 100).toFixed(1)}% of test set
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    False Negatives (FN)
                  </span>
                  <span className="font-display text-3xl font-bold text-amber-900 dark:text-amber-200 my-1">
                    {fn.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-charcoal/60 dark:text-beige/60">
                    Type II Error (Missed Cancellation)
                  </span>
                  <span className="text-[10px] font-mono mt-1 text-amber-700 dark:text-amber-400">
                    {((fn / total) * 100).toFixed(1)}% of test set
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-blue-500/10 dark:bg-blue-950/30 border border-blue-500/30 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                    True Negatives (TN)
                  </span>
                  <span className="font-display text-3xl font-bold text-blue-900 dark:text-blue-200 my-1">
                    {tn.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-charcoal/60 dark:text-beige/60">
                    Correctly Identified Fulfilled Stays
                  </span>
                  <span className="text-[10px] font-mono mt-1 text-blue-700 dark:text-blue-400">
                    {((tn / total) * 100).toFixed(1)}% of test set
                  </span>
                </div>
              </div>

              {/* Diagnostic Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/90 dark:bg-wine-light/30 border border-gold/25 text-center shadow-sm">
                  <div className="text-[11px] text-charcoal/60 dark:text-beige/60">Accuracy</div>
                  <div className="font-display text-xl font-bold text-burgundy dark:text-gold mt-0.5">
                    {m.accuracy}%
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/90 dark:bg-wine-light/30 border border-gold/25 text-center shadow-sm">
                  <div className="text-[11px] text-charcoal/60 dark:text-beige/60">Precision</div>
                  <div className="font-display text-xl font-bold text-burgundy dark:text-gold mt-0.5">
                    {m.precision}%
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/90 dark:bg-wine-light/30 border border-gold/25 text-center shadow-sm">
                  <div className="text-[11px] text-charcoal/60 dark:text-beige/60">Recall (Sensitivity)</div>
                  <div className="font-display text-xl font-bold text-burgundy dark:text-gold mt-0.5">
                    {m.recall}%
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/90 dark:bg-wine-light/30 border border-gold/35 text-center shadow-sm">
                  <div className="text-[11px] font-semibold text-gold-700 dark:text-gold">F1 Score</div>
                  <div className="font-display text-xl font-bold text-gold-700 dark:text-gold mt-0.5">
                    {m.f1Score}%
                  </div>
                </div>
              </div>
            </div>
          );
        })()
      )}

      {/* Evaluation Cost Context Note */}
      <div className="p-4 rounded-2xl bg-charcoal/5 dark:bg-wine-light/20 border border-gold/20 text-xs text-charcoal/80 dark:text-beige/80 space-y-1">
        <strong className="text-burgundy dark:text-gold block">
          Hospitality Cost Asymmetry Insight:
        </strong>
        <p className="leading-relaxed">
          In hotel revenue management, <strong>False Negatives (Missed Cancellations)</strong> result in unoccupied perished rooms and direct RevPAR loss, whereas <strong>False Positives (False Alarms)</strong> incur guest displacement walk costs only if total property bookings exceed 100% physical capacity. Random Forest's balanced 69.48% F1 score achieves the certified optimal operating equilibrium across both error types.
        </p>
      </div>

    </div>
  );
}
