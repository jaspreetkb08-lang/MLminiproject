import React, { useState } from "react";
import { Link } from "react-router-dom";
import MetricCard from "../components/common/MetricCard";
import CancellationDistributionChart from "../charts/CancellationDistributionChart";
import HotelTypeComparisonChart from "../charts/HotelTypeComparisonChart";
import DepositTypeChart from "../charts/DepositTypeChart";
import LeadTimeAnalysisChart from "../charts/LeadTimeAnalysisChart";
import CustomerTypeChart from "../charts/CustomerTypeChart";
import ModelComparisonChart from "../charts/ModelComparisonChart";
import DatasetFeatureExplorer from "../components/colab/DatasetFeatureExplorer";
import PreprocessingWorkflow from "../components/colab/PreprocessingWorkflow";
import { DATASET_STATS, CANCELLATION_BY_CUSTOMER_TYPE } from "../data/datasetStats";
import {
  BookOpen,
  CheckCircle,
  XCircle,
  Cpu,
  Award,
  ArrowRight,
  TrendingDown,
  Info,
  Layers,
  Building,
  Compass,
  DollarSign,
  Database,
  Filter,
  CheckCircle2,
  FileSpreadsheet,
} from "lucide-react";

export default function DashboardPage() {
  const [selectedPropertyFilter, setSelectedPropertyFilter] = useState("all");

  // Dynamic KPI calculations based on property selector
  const activeStats =
    selectedPropertyFilter === "city"
      ? {
          total: DATASET_STATS.cityHotel.total,
          notCancelled: DATASET_STATS.cityHotel.notCancelled,
          cancelled: DATASET_STATS.cityHotel.cancelled,
          rate: DATASET_STATS.cityHotel.cancellationRate,
          adr: "$105.30",
          label: "City Hotel Portfolio",
        }
      : selectedPropertyFilter === "resort"
      ? {
          total: DATASET_STATS.resortHotel.total,
          notCancelled: DATASET_STATS.resortHotel.notCancelled,
          cancelled: DATASET_STATS.resortHotel.cancelled,
          rate: DATASET_STATS.resortHotel.cancellationRate,
          adr: "$94.90",
          label: "Resort Hotel Portfolio",
        }
      : {
          total: DATASET_STATS.totalBookings,
          notCancelled: DATASET_STATS.notCancelled,
          cancelled: DATASET_STATS.cancelled,
          rate: DATASET_STATS.cancellationRate,
          adr: "$101.80",
          label: "All Hotel Properties",
        };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. DATASET OVERVIEW & HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/90 dark:border-stone-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="folio-tag">FOLIO N° 02 · EXECUTIVE INTELLIGENCE</span>
            <span className="px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700 font-mono text-[10px] text-stone-600 dark:text-stone-400">
              hotel_bookings.csv
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-burgundy dark:text-ivory">
            Hotel Cancellation Machine Learning Platform
          </h1>
          <p className="text-sm font-serif text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
            Empirical demand analysis, deterministic preprocessing workflow, and supervised learning benchmarks based on the certified <strong>119,390 hotel booking records</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/prediction"
            className="btn-primary"
          >
            <span>Inference Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/model-insights"
            className="btn-secondary"
          >
            <Cpu className="w-3.5 h-3.5 text-stone-400" />
            <span>Model Benchmarks</span>
          </Link>
        </div>
      </div>

      {/* 1A. DETAILED DATASET SCOPE SPECIFICATIONS STRIP */}
      <div className="folio-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-burgundy dark:text-gold">
            <FileSpreadsheet className="w-3.5 h-3.5 text-burgundy dark:text-gold" />
            <span>Colab Dataset Scope & Input Architecture</span>
          </div>
          <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
            Target Variable: <code className="text-burgundy dark:text-gold font-semibold">is_canceled</code> (Binary)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          <div className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40">
            <span className="text-[10px] uppercase font-mono text-stone-500 dark:text-stone-400 block">
              Original Records
            </span>
            <span className="font-mono text-lg font-semibold text-burgundy dark:text-ivory">
              119,390
            </span>
            <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block mt-0.5">
              100% Raw Volume
            </span>
          </div>

          <div className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40">
            <span className="text-[10px] uppercase font-mono text-stone-500 dark:text-stone-400 block">
              Original Columns
            </span>
            <span className="font-mono text-lg font-semibold text-burgundy dark:text-ivory">
              32 Columns
            </span>
            <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block mt-0.5">
              31 Inputs + 1 Target
            </span>
          </div>

          <div className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40">
            <span className="text-[10px] uppercase font-mono text-emerald-800 dark:text-emerald-400 block">
              Not Cancelled (0)
            </span>
            <span className="font-mono text-lg font-semibold text-stone-800 dark:text-stone-100">
              75,166
            </span>
            <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block mt-0.5">
              62.96% Fulfilled Stays
            </span>
          </div>

          <div className="p-3 rounded border border-rose-200 dark:border-rose-950/60 bg-rose-50/40 dark:bg-rose-950/20">
            <span className="text-[10px] uppercase font-mono text-rose-800 dark:text-rose-300 block">
              Cancelled (1)
            </span>
            <span className="font-mono text-lg font-semibold text-rose-900 dark:text-rose-200">
              44,224
            </span>
            <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block mt-0.5">
              37.04% Churn Volume
            </span>
          </div>

          <div className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40">
            <span className="text-[10px] uppercase font-mono text-stone-500 dark:text-stone-400 block">
              Duplicates Dropped
            </span>
            <span className="font-mono text-lg font-semibold text-amber-800 dark:text-amber-300">
              31,994
            </span>
            <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block mt-0.5">
              87,396 Unique Stays
            </span>
          </div>

          <div className="p-3 rounded border border-stone-300 dark:border-stone-700 bg-stone-100/80 dark:bg-stone-800/60">
            <span className="text-[10px] uppercase font-mono text-burgundy dark:text-gold block font-semibold">
              Final Inputs
            </span>
            <span className="font-mono text-lg font-semibold text-burgundy dark:text-gold">
              28 Features
            </span>
            <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block mt-0.5">
              18 Num + 10 Cat
            </span>
          </div>
        </div>

        <div className="p-3 rounded border border-stone-200/80 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/40 text-xs text-stone-600 dark:text-stone-300 flex flex-wrap items-center justify-between gap-2 font-serif">
          <span>
            <strong>Feature Distinction:</strong> 32 original columns &rarr; 1 dropped for sparsity (<code className="font-mono text-burgundy dark:text-gold">company</code>: 94.3% nulls) &rarr; 2 excluded for target leakage (<code className="font-mono text-burgundy dark:text-gold">reservation_status</code>, <code className="font-mono text-burgundy dark:text-gold">reservation_status_date</code>) &rarr; <strong>28 final features</strong> passed into scikit-learn ColumnTransformer.
          </span>
          <span className="font-mono text-xs font-semibold text-burgundy dark:text-gold shrink-0">
            Random Forest F1: 69.48%
          </span>
        </div>
      </div>

      {/* PROPERTY SEGMENT SELECTOR PILL TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50/90 dark:bg-[#161114] p-3 rounded-lg border border-stone-200/90 dark:border-stone-800">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400">
          <Building className="w-3.5 h-3.5 text-burgundy dark:text-gold" />
          <span>Active Portfolio Scope:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedPropertyFilter("all")}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              selectedPropertyFilter === "all"
                ? "bg-burgundy text-ivory dark:bg-gold dark:text-wine font-medium shadow-sm"
                : "bg-white dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:text-burgundy dark:hover:text-gold border border-stone-200 dark:border-stone-700"
            }`}
          >
            All Properties (119.4k)
          </button>
          <button
            type="button"
            onClick={() => setSelectedPropertyFilter("city")}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              selectedPropertyFilter === "city"
                ? "bg-burgundy text-ivory dark:bg-gold dark:text-wine font-medium shadow-sm"
                : "bg-white dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:text-burgundy dark:hover:text-gold border border-stone-200 dark:border-stone-700"
            }`}
          >
            City Hotel (79.3k)
          </button>
          <button
            type="button"
            onClick={() => setSelectedPropertyFilter("resort")}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              selectedPropertyFilter === "resort"
                ? "bg-burgundy text-ivory dark:bg-gold dark:text-wine font-medium shadow-sm"
                : "bg-white dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:text-burgundy dark:hover:text-gold border border-stone-200 dark:border-stone-700"
            }`}
          >
            Resort Hotel (40.1k)
          </button>
        </div>
      </div>

      {/* OVERVIEW KPI CARDS WITH VISUAL HIERARCHY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Total Bookings"
          value={activeStats.total.toLocaleString()}
          subtitle={activeStats.label}
          badge="Inventory"
          badgeType="gold"
          icon={BookOpen}
        />

        <MetricCard
          title="Not Cancelled"
          value={activeStats.notCancelled.toLocaleString()}
          subtitle={`Fulfilled (${(100 - activeStats.rate).toFixed(1)}%)`}
          badge="Active Stays"
          badgeType="emerald"
          icon={CheckCircle}
        />

        <MetricCard
          title="Cancellation Rate"
          value={`${activeStats.rate}%`}
          subtitle={`${activeStats.cancelled.toLocaleString()} lost stays`}
          badge="Risk Factor"
          badgeType="rose"
          icon={XCircle}
        />

        <MetricCard
          title="Average Daily Rate"
          value={activeStats.adr}
          subtitle="Portfolio Mean ADR"
          badge="Yield"
          badgeType="gold"
          icon={DollarSign}
        />

        <MetricCard
          title="Best Model F1"
          value={`${DATASET_STATS.bestF1Score}%`}
          subtitle="Random Forest Model"
          badge="Benchmark"
          badgeType="emerald"
          icon={Award}
        />
      </div>

      {/* 2. DEDICATED SECTION: THE FIVE COLAB EDA VISUALIZATIONS */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-3 border-b border-stone-200/90 dark:border-stone-800">
          <div>
            <div className="inline-flex items-center gap-1.5 folio-tag mb-1">
              <span>EXPLORATORY DATA ANALYSIS</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-burgundy dark:text-ivory">
              The Five Colab Project Visualizations
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mt-0.5 font-serif">
              Exact calculations from <code className="font-mono text-xs text-burgundy dark:text-gold">hotel_bookings.csv</code> mirroring the five Seaborn charts executed in the Google Colab notebook.
            </p>
          </div>
          <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
            5 Empirical Figures
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Visual 1: Booking Cancellation Distribution */}
          <div className="folio-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
              <div>
                <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block">
                  FIG. 01 · sns.countplot(data=df, x='is_canceled')
                </span>
                <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
                  Hotel Booking Cancellation Distribution
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded border border-stone-200 dark:border-stone-700 font-mono text-xs text-stone-700 dark:text-stone-300">
                119,390 Bookings
              </span>
            </div>
            <CancellationDistributionChart />
            <div className="p-3 rounded border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 text-xs text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
              <strong>Observation:</strong> Out of 119,390 total reservations, 75,166 guests arrived (62.96%) and 44,224 cancelled (37.04%). This indicates significant demand volatility requiring proactive predictive intervention.
            </div>
          </div>

          {/* Visual 2: Cancellation by Hotel Type */}
          <div className="folio-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
              <div>
                <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block">
                  FIG. 02 · sns.countplot(data=df_clean, x='hotel', hue='is_canceled')
                </span>
                <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
                  Booking Cancellation by Hotel Type
                </h3>
              </div>
              <span className="font-mono text-xs text-stone-600 dark:text-stone-400">
                City: 41.7% | Resort: 27.8%
              </span>
            </div>
            <HotelTypeComparisonChart />
            <div className="p-3 rounded border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 text-xs text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
              <strong>Observation:</strong> City Hotels experience a substantially higher cancellation frequency (41.73%) compared to Resort Hotels (27.76%), driven by flexible corporate traveler schedules and higher availability of substitute urban properties.
            </div>
          </div>

          {/* Visual 3: Cancellation vs Lead Time */}
          <div className="folio-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
              <div>
                <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block">
                  FIG. 03 · sns.boxplot(data=df_clean, x='is_canceled', y='lead_time')
                </span>
                <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
                  Cancellation vs Lead Time
                </h3>
              </div>
              <span className="font-mono text-xs text-stone-600 dark:text-stone-400">
                Mean: 144.8d vs 79.9d
              </span>
            </div>
            <LeadTimeAnalysisChart />
            <div className="p-3 rounded border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 text-xs text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
              <strong>Observation:</strong> Average lead time for cancelled stays is 144.8 days compared to 79.9 days for fulfilled bookings (+81.2% longer). Bookings placed over 180 days in advance cancel at over 55%, rendering lead time the #1 predictive feature in Random Forest.
            </div>
          </div>

          {/* Visual 4: Cancellation by Customer Type */}
          <div className="folio-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
              <div>
                <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block">
                  FIG. 04 · sns.countplot(data=df_clean, x='customer_type', hue='is_canceled')
                </span>
                <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
                  Booking Cancellation by Customer Type
                </h3>
              </div>
              <span className="font-mono text-xs text-stone-600 dark:text-stone-400">
                Transient: 40.75% Churn
              </span>
            </div>
            <CustomerTypeChart />
            <div className="p-3 rounded border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 text-xs text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
              <strong>Observation:</strong> Transient independent travelers constitute 75.1% of total reservation volume with the highest cancellation rate (40.75%). Group bookings show the highest loyalty with only a 10.23% cancellation rate.
            </div>
          </div>

        </div>

        {/* Visual 5: Cancellation by Deposit Type (Full Width) */}
        <div className="folio-card p-6 sm:p-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200/80 dark:border-stone-800">
            <div>
              <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block">
                FIG. 05 · sns.countplot(data=df_clean, x='deposit_type', hue='is_canceled')
              </span>
              <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
                Booking Cancellation by Deposit Type
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30 font-mono text-xs text-rose-800 dark:text-rose-300">
              Non-Refundable Churn: 99.36%
            </span>
          </div>
          <DepositTypeChart />
          <div className="p-3.5 rounded border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
            <strong>Critical Behavioral Finding:</strong> Non-refundable bookings exhibit a striking 99.36% cancellation rate in this dataset (14,494 out of 14,587 cancelled). This paradoxical correlation is driven by speculative travel agency bookings locked under non-refundable policies that are abandoned during market fluctuations.
          </div>
        </div>
      </section>

      {/* 3. DEDICATED SECTION: PREPROCESSING WORKFLOW */}
      <section className="space-y-4">
        <PreprocessingWorkflow />
      </section>

      {/* 4. DEDICATED SECTION: DATASET FEATURE EXPLORER */}
      <section className="space-y-4">
        <DatasetFeatureExplorer />
      </section>

    </div>
  );
}