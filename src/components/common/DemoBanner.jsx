import React from "react";
import { Link } from "react-router-dom";
import { usePredictions } from "../../context/PredictionContext";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function DemoBanner() {
  const { backendStatus } = usePredictions();

  if (backendStatus.online && backendStatus.modelLoaded) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/30 border-b border-emerald-500/25 px-4 py-1.5 text-xs text-emerald-800 dark:text-emerald-200 font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <span>
              LIVE INFERENCE: Connected to FastAPI backend with model <code className="font-bold">{backendStatus.modelFile}</code>
            </span>
          </div>
          <Link
            to="/settings"
            className="hidden sm:inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            Settings <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-100/90 dark:bg-[#120C0E] border-b border-stone-200/80 dark:border-stone-800/80 px-4 py-1.5 text-xs text-stone-600 dark:text-stone-300 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <span className="folio-tag text-[9px] px-1.5 py-0.5 rounded bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
            FOLIO N° 01 · ML RESEARCH
          </span>
          <span className="text-stone-600 dark:text-stone-400 text-[11px] font-sans">
            Hotel Booking Cancellation Prediction • 119,390 Benchmark Records • Random Forest Champion (69.48% F1)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/model-insights"
            className="inline-flex items-center gap-1 text-stone-700 dark:text-stone-300 hover:text-burgundy dark:hover:text-gold font-mono text-[11px] underline underline-offset-4"
          >
            <span>Algorithm Insights</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
