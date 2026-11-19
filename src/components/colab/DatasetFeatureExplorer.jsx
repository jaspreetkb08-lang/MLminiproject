import React, { useState, useMemo } from "react";
import {
  ORIGINAL_FEATURE_DICTIONARY,
  DATASET_STATS,
} from "../../data/datasetStats";
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Layers,
  Database,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function DatasetFeatureExplorer() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Booking Information",
    "Stay Information",
    "Customer Information",
    "Booking Channels",
    "Reservation Details",
  ];

  const filteredFeatures = useMemo(() => {
    return ORIGINAL_FEATURE_DICTIONARY.filter((feat) => {
      const matchesCategory =
        selectedCategory === "All" || feat.category === selectedCategory;
      const matchesSearch =
        feat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feat.type.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesStatus = true;
      if (selectedStatus === "Retained") {
        matchesStatus = feat.pipelineFeature;
      } else if (selectedStatus === "Dropped") {
        matchesStatus = feat.status.includes("DROPPED");
      } else if (selectedStatus === "Excluded") {
        matchesStatus = feat.status.includes("EXCLUDED");
      } else if (selectedStatus === "Target") {
        matchesStatus = feat.status.includes("TARGET");
      }

      return matchesCategory && matchesSearch && matchesStatus;
    });
  }, [selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="folio-card p-6 sm:p-8 space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-stone-200/90 dark:border-stone-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="folio-tag">FIG. 06 · FEATURE REPOSITORY</span>
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              32 Columns · 31 Inputs · 1 Target
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-burgundy dark:text-ivory">
            Dataset Feature Explorer
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
            Examine all 32 original schema columns from <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-burgundy dark:text-gold">hotel_bookings.csv</code>. Inspect retention status, preprocessing transforms, and leakage prevention rules.
          </p>
        </div>

        {/* Feature Summary Counters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 font-mono text-xs text-stone-700 dark:text-stone-200">
            28 Retained
          </span>
          <span className="px-3 py-1 rounded border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/30 font-mono text-xs text-rose-800 dark:text-rose-300">
            3 Dropped / Excluded
          </span>
          <span className="px-3 py-1 rounded border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 font-mono text-xs font-semibold text-burgundy dark:text-gold">
            1 Target (is_canceled)
          </span>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-stone-50/80 dark:bg-[#171215] p-3.5 rounded-lg border border-stone-200/80 dark:border-stone-800">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                selectedCategory === cat
                  ? "bg-burgundy text-ivory dark:bg-gold dark:text-wine font-medium shadow-sm"
                  : "bg-white dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:text-burgundy dark:hover:text-gold border border-stone-200 dark:border-stone-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:border-stone-400 dark:focus:border-stone-600"
          >
            <option value="All">All Pipeline Statuses (32)</option>
            <option value="Retained">Retained Pipeline Features (28)</option>
            <option value="Dropped">Dropped (Missingness: company)</option>
            <option value="Excluded">Excluded (Target Leakage: 2)</option>
            <option value="Target">Target (is_canceled)</option>
          </select>

          {/* Search Box */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search column..."
              className="w-full pl-8 pr-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:border-stone-400 dark:focus:border-stone-600"
            />
          </div>
        </div>

      </div>

      {/* Feature Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredFeatures.map((feat) => {
          const isDropped = feat.status.includes("DROPPED");
          const isExcluded = feat.status.includes("EXCLUDED");
          const isTarget = feat.status.includes("TARGET");

          return (
            <div
              key={feat.name}
              className={`p-4 rounded-lg border transition-all duration-200 flex flex-col justify-between ${
                isTarget
                  ? "bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700/60"
                  : isDropped
                  ? "bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 opacity-90"
                  : isExcluded
                  ? "bg-amber-50/40 dark:bg-stone-900/40 border-amber-200 dark:border-amber-900/40 opacity-90"
                  : "bg-white dark:bg-[#181316] border-stone-200/90 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700"
              }`}
            >
              <div className="space-y-2">
                {/* Column Name & Category */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono text-xs font-semibold text-burgundy dark:text-ivory block">
                      {feat.name}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400">
                      {feat.category}
                    </span>
                  </div>

                  {/* Status Badge */}
                  {isTarget ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 shrink-0">
                      Target (y)
                    </span>
                  ) : isDropped ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900 shrink-0">
                      Dropped
                    </span>
                  ) : isExcluded ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900 shrink-0">
                      Leakage Risk
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shrink-0">
                      Input Feature
                    </span>
                  )}
                </div>

                {/* Explanation */}
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
                  {feat.description}
                </p>
              </div>

              {/* Bottom Metadata Strip */}
              <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800/80 space-y-1 text-[11px] font-mono">
                <div className="flex justify-between items-center text-stone-500 dark:text-stone-400">
                  <span>Type:</span>
                  <span className="font-medium text-stone-700 dark:text-stone-300">
                    {feat.type}
                  </span>
                </div>
                <div className="flex justify-between items-center text-stone-500 dark:text-stone-400">
                  <span>Preprocessing:</span>
                  <span
                    className={`font-medium ${
                      isDropped || isExcluded
                        ? "text-rose-700 dark:text-rose-400"
                        : "text-stone-700 dark:text-stone-300"
                    }`}
                  >
                    {isDropped
                      ? "Dropped (94.3% nulls)"
                      : isExcluded
                      ? "Excluded (Leakage)"
                      : feat.imputation}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredFeatures.length === 0 && (
        <div className="text-center py-10 font-serif text-stone-500 dark:text-stone-400">
          No features match your search criteria.
        </div>
      )}

      {/* Target Leakage Clarification Banner */}
      <div className="p-4 rounded-lg bg-stone-50 dark:bg-[#171215] border border-stone-200/90 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-burgundy dark:text-gold shrink-0 mt-0.5" />
        <div className="space-y-1 font-serif">
          <strong className="text-burgundy dark:text-ivory block font-sans text-xs tracking-wide">
            Methodology Note on Target Leakage Prevention:
          </strong>
          <p className="leading-relaxed">
            In naive baseline models, including <code className="font-mono text-burgundy dark:text-gold">reservation_status</code> ('Check-Out', 'Canceled', 'No-Show') yields an artificial 100% accuracy because the column directly records the outcome. In this Colab project, <code className="font-mono">reservation_status</code> and <code className="font-mono">reservation_status_date</code> were rigorously removed prior to train-test split to ensure genuine predictive validity.
          </p>
        </div>
      </div>

    </div>
  );
}