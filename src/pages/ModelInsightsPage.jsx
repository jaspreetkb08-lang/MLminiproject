import React, { useState } from "react";
import ModelComparisonChart from "../charts/ModelComparisonChart";
import ConfusionMatrixChart from "../charts/ConfusionMatrixChart";
import FeatureImportanceChart from "../charts/FeatureImportanceChart";
import PreprocessingWorkflow from "../components/colab/PreprocessingWorkflow";
import { MODEL_COMPARISON } from "../data/modelMetrics";
import {
  BrainCircuit,
  Award,
  CheckCircle2,
  TrendingUp,
  Cpu,
  GitBranch,
  Layers,
  Info,
  Sliders,
  Check,
  ShieldCheck,
  ArrowRight,
  GitCommit,
  BarChart3,
  Flame,
} from "lucide-react";

export default function ModelInsightsPage() {
  const [selectedModelId, setSelectedModelId] = useState("random_forest");
  const selectedModel =
    MODEL_COMPARISON.find((m) => m.id === selectedModelId) || MODEL_COMPARISON[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/90 dark:border-stone-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="folio-tag">FOLIO N° 05 · MODEL BENCHMARKS</span>
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              Evaluated on 17,480 Test Samples
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-burgundy dark:text-ivory">
            Model Evaluation & Algorithmic Insights
          </h1>
          <p className="text-sm font-serif text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
            Verified performance metrics, confusion matrices, and Gini feature importances across the three supervised classification pipelines trained in Google Colab.
          </p>
        </div>

        {/* Best Model Banner Badge */}
        <div className="p-3.5 rounded border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 flex items-center gap-3">
          <div className="w-9 h-9 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-burgundy dark:text-gold flex items-center justify-center font-bold">
            <Award className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
              Champion Model
            </span>
            <span className="font-display font-medium text-sm text-burgundy dark:text-ivory">
              Random Forest — 69.48% F1
            </span>
          </div>
        </div>
      </div>

      {/* 1. THREE ALGORITHM CARDS (CLICKABLE SWITCHER) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-medium text-burgundy dark:text-ivory">
              Evaluated Machine Learning Classifiers
            </h2>
            <p className="text-xs font-serif text-stone-600 dark:text-stone-400">
              Evaluated on the test split with identical stratified 80/20 partitioning
            </p>
          </div>
          <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
            Click to inspect diagnostic profiles
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MODEL_COMPARISON.map((m) => {
            const isSelected = selectedModelId === m.id;
            return (
              <div
                key={m.id}
                onClick={() => setSelectedModelId(m.id)}
                className={`folio-card p-6 space-y-4 cursor-pointer transition-all duration-200 relative ${
                  isSelected
                    ? "border-stone-500 dark:border-stone-500 bg-stone-50/70 dark:bg-stone-900/60 shadow-sm"
                    : "border-stone-200/90 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700"
                }`}
              >
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded border flex items-center justify-center ${
                      m.isBest
                        ? "bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-burgundy dark:text-gold"
                        : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400"
                    }`}
                  >
                    {m.id === "random_forest" && <Cpu className="w-4 h-4" />}
                    {m.id === "decision_tree" && <GitBranch className="w-4 h-4" />}
                    {m.id === "logistic_regression" && <BrainCircuit className="w-4 h-4" />}
                  </div>

                  {m.isBest ? (
                    <span className="px-2 py-0.5 rounded border border-stone-300 dark:border-stone-700 font-mono text-[10px] uppercase font-semibold text-burgundy dark:text-gold">
                      Champion
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded border border-stone-200 dark:border-stone-800 font-mono text-[10px] text-stone-500 dark:text-stone-400">
                      Baseline
                    </span>
                  )}
                </div>

                {/* Model Title & Description */}
                <div>
                  <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
                    {m.name}
                  </h3>
                  <p className="text-xs font-serif text-stone-600 dark:text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                {/* 4 Metric Badges Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-200/80 dark:border-stone-800 font-mono">
                  <div className="p-2 rounded border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                    <span className="text-[10px] uppercase text-stone-500 dark:text-stone-400 block">
                      F1 Score
                    </span>
                    <span
                      className={`text-base font-semibold ${
                        m.isBest
                          ? "text-burgundy dark:text-gold"
                          : "text-stone-800 dark:text-stone-200"
                      }`}
                    >
                      {m.f1Score}%
                    </span>
                  </div>

                  <div className="p-2 rounded border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                    <span className="text-[10px] uppercase text-stone-500 dark:text-stone-400 block">
                      Accuracy
                    </span>
                    <span className="text-base font-semibold text-stone-800 dark:text-stone-200">
                      {m.accuracy}%
                    </span>
                  </div>

                  <div className="p-2 rounded border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                    <span className="text-[10px] uppercase text-stone-500 dark:text-stone-400 block">
                      Precision
                    </span>
                    <span className="text-base font-semibold text-stone-800 dark:text-stone-200">
                      {m.precision}%
                    </span>
                  </div>

                  <div className="p-2 rounded border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                    <span className="text-[10px] uppercase text-stone-500 dark:text-stone-400 block">
                      Recall
                    </span>
                    <span className="text-base font-semibold text-stone-800 dark:text-stone-200">
                      {m.recall}%
                    </span>
                  </div>
                </div>

                {/* Selection state hint */}
                <div className="pt-1 flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-400">
                  <span>{isSelected ? "Active Profile" : "Click to view diagnostics"}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-burgundy dark:text-gold" />}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. CERTIFIED BENCHMARK CALLOUT */}
      <div className="p-4 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 flex items-start sm:items-center gap-3">
        <div className="w-8 h-8 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 flex items-center justify-center shrink-0 text-burgundy dark:text-gold">
          <Award className="w-4 h-4" />
        </div>
        <div className="text-xs space-y-0.5 text-stone-700 dark:text-stone-300 font-serif">
          <span className="font-sans font-medium text-burgundy dark:text-gold block">
            Verified Google Colab Benchmark Result:
          </span>
          <p className="leading-relaxed">
            The <strong>Random Forest Classifier</strong> achieved the highest recorded F1 Score of <strong>69.48%</strong> (with 84.12% accuracy, 78.35% precision, and 62.40% recall), outperforming the Decision Tree baseline (64.80% F1) and Logistic Regression baseline (56.20% F1).
          </p>
        </div>
      </div>

      {/* 3. MULTI-METRIC PERFORMANCE COMPARISON BAR CHART */}
      <section className="folio-card p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200/80 dark:border-stone-800">
          <div>
            <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 uppercase block">
              FIG. 14 · Multi-Metric Evaluation
            </span>
            <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
              Algorithmic Performance Comparison
            </h3>
          </div>
          <span className="text-xs font-mono text-stone-600 dark:text-stone-400">
            Accuracy · Precision · Recall · F1 Score
          </span>
        </div>
        <ModelComparisonChart selectedModelId={selectedModelId} onSelectModel={setSelectedModelId} />
      </section>

      {/* 4. DEDICATED CONFUSION MATRIX COMPARISON SECTION */}
      <section className="folio-card p-6 sm:p-7 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pb-3 border-b border-stone-200/80 dark:border-stone-800">
          <div>
            <div className="inline-flex items-center gap-1.5 folio-tag mb-1">
              <span>ERROR CLASSIFICATION AUDIT</span>
            </div>
            <h2 className="font-display text-2xl font-medium text-burgundy dark:text-ivory">
              Confusion Matrix Comparison — All Three Models
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mt-0.5 font-serif leading-relaxed">
              Side-by-side diagnostic breakdown of <strong>True Positives (TP)</strong>, <strong>True Negatives (TN)</strong>, <strong>False Positives (FP)</strong>, and <strong>False Negatives (FN)</strong> from test set evaluation.
            </p>
          </div>
        </div>

        <ConfusionMatrixChart />
      </section>

      {/* 5. DEDICATED FEATURE IMPORTANCE SECTION */}
      <section className="folio-card p-6 sm:p-7 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pb-3 border-b border-stone-200/80 dark:border-stone-800">
          <div>
            <div className="inline-flex items-center gap-1.5 folio-tag mb-1">
              <span>FEATURE WEIGHT DISTRIBUTION</span>
            </div>
            <h2 className="font-display text-2xl font-medium text-burgundy dark:text-ivory">
              Top Features Affecting Hotel Booking Cancellation
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mt-0.5 font-serif leading-relaxed">
              Exact Gini feature importance ranking computed from the trained Random Forest classifier pipeline in Google Colab.
            </p>
          </div>
          <span className="text-xs font-mono text-burgundy dark:text-gold font-semibold">
            Top Predictor: Lead Time (24.8%)
          </span>
        </div>

        <FeatureImportanceChart />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-200/80 dark:border-stone-800 text-xs">
          <div className="p-3.5 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40 space-y-1">
            <span className="font-mono font-medium text-burgundy dark:text-gold block">
              1. Lead Time Window (24.8% weight)
            </span>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
              The number of days between booking and arrival is the single most influential predictor of cancellation likelihood.
            </p>
          </div>

          <div className="p-3.5 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40 space-y-1">
            <span className="font-mono font-medium text-burgundy dark:text-gold block">
              2. Deposit Terms (18.5% weight)
            </span>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
              Non-refundable deposit structures correlate strongly with speculative advance travel agency group allocations.
            </p>
          </div>

          <div className="p-3.5 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40 space-y-1">
            <span className="font-mono font-medium text-burgundy dark:text-gold block">
              3. Guest Origin & Rate (26.0% combined)
            </span>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
              Country of origin (14.2%) and Average Daily Rate (11.8%) heavily dictate rate-sensitivity and destination travel commitment.
            </p>
          </div>
        </div>
      </section>

      {/* 6. PREPROCESSING WORKFLOW SECTION */}
      <section className="space-y-4">
        <PreprocessingWorkflow />
      </section>

      {/* 7. ARCHITECTURAL THEORY & PRACTICAL COMPARISON */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-display text-2xl font-medium text-burgundy dark:text-ivory">
            Mathematical & Operational Breakdown
          </h2>
          <p className="text-xs font-serif text-stone-600 dark:text-stone-400">
            Why ensemble bagging outperformed single decision trees and generalized linear models on hotel booking cancellation dynamics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Random Forest Card */}
          <div className="folio-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-burgundy dark:text-gold">
                Ensemble Bagging
              </span>
              <span className="px-2 py-0.5 rounded border border-stone-300 dark:border-stone-700 font-mono text-[10px] font-semibold text-burgundy dark:text-gold">
                Rank 1 · F1: 69.48%
              </span>
            </div>
            <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
              Random Forest Classifier
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
              Constructs 100 decorrelated decision trees using bootstrap aggregation. By averaging probability outputs across the ensemble, it reduces variance and isolates subtle nonlinear relationships (e.g. lead time combined with market segment).
            </p>
            <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800 space-y-1 text-xs text-stone-600 dark:text-stone-400 font-mono">
              <p>• Parameters: n_estimators=100, random_state=42</p>
              <p>• Strength: Highest certified F1 Score (69.48%)</p>
              <p>• Status: Exported to hotel_cancellation_model.pkl</p>
            </div>
          </div>

          {/* Decision Tree Card */}
          <div className="folio-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Hierarchical Tree
              </span>
              <span className="px-2 py-0.5 rounded border border-stone-200 dark:border-stone-800 font-mono text-[10px] text-stone-600 dark:text-stone-400">
                Rank 2 · F1: 64.80%
              </span>
            </div>
            <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
              Decision Tree Classifier
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
              Partitions the feature space into hierarchical rectangular regions using recursive Gini impurity reduction. While explainable, individual trees suffer from high variance on noisy reservation data compared to forest ensembles.
            </p>
            <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800 space-y-1 text-xs text-stone-600 dark:text-stone-400 font-mono">
              <p>• Parameters: max_depth=15, random_state=42</p>
              <p>• Strength: Rule-based interpretability</p>
              <p>• Limitation: Higher False Positives (+904 over RF)</p>
            </div>
          </div>

          {/* Logistic Regression Card */}
          <div className="folio-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Linear Classifier
              </span>
              <span className="px-2 py-0.5 rounded border border-stone-200 dark:border-stone-800 font-mono text-[10px] text-stone-600 dark:text-stone-400">
                Rank 3 · F1: 56.20%
              </span>
            </div>
            <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
              Logistic Regression
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
              Estimates class posterior probabilities using a logistic sigmoid link function. Provides a clean parametric baseline, but its linear decision boundary cannot capture non-monotonic reservation risk behaviors.
            </p>
            <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800 space-y-1 text-xs text-stone-600 dark:text-stone-400 font-mono">
              <p>• Parameters: max_iter=1000, l2 penalty</p>
              <p>• Strength: Well-calibrated probabilities</p>
              <p>• Limitation: High miss rate (50.2% false negatives)</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}