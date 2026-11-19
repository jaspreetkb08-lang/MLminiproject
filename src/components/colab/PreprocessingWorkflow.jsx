import React, { useState } from "react";
import { PREPROCESSING_PIPELINE_STAGES } from "../../data/datasetStats";
import {
  GitCommit,
  CheckCircle2,
  ArrowRight,
  Database,
  Filter,
  Layers,
  Sliders,
  Split,
  ChevronRight,
  Terminal,
  ShieldCheck,
} from "lucide-react";

export default function PreprocessingWorkflow() {
  const [activeStageId, setActiveStageId] = useState("raw_dataset");
  const activeStage =
    PREPROCESSING_PIPELINE_STAGES.find((s) => s.id === activeStageId) ||
    PREPROCESSING_PIPELINE_STAGES[0];

  const getStageIcon = (id) => {
    switch (id) {
      case "raw_dataset":
        return Database;
      case "missing_values":
        return Filter;
      case "duplicate_removal":
        return CheckCircle2;
      case "feature_selection":
        return ShieldCheck;
      case "categorical_encoding":
        return Layers;
      case "numerical_scaling":
        return Sliders;
      case "train_test_split":
        return Split;
      default:
        return GitCommit;
    }
  };

  return (
    <div className="folio-card p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-stone-200/90 dark:border-stone-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="folio-tag">FIG. 07 · TRANSFORMATION PIPELINE</span>
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              7 Sequential Deterministic Stages
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-burgundy dark:text-ivory">
            Data Preprocessing & Preparation Architecture
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed font-serif">
            Sequential mathematical transformations executed in the Python environment, preparing raw records for scikit-learn estimators.
          </p>
        </div>

        <span className="text-xs font-mono text-stone-600 dark:text-stone-400">
          80/20 Stratified Split · Random Seed 42
        </span>
      </div>

      {/* Horizontal Stage Navigator Stepper */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-[760px]">
          {PREPROCESSING_PIPELINE_STAGES.map((stage, idx) => {
            const Icon = getStageIcon(stage.id);
            const isActive = stage.id === activeStageId;
            return (
              <React.Fragment key={stage.id}>
                <button
                  type="button"
                  onClick={() => setActiveStageId(stage.id)}
                  className={`flex-1 p-3 rounded border text-left transition-all ${
                    isActive
                      ? "bg-stone-100 dark:bg-stone-800 border-stone-400 dark:border-stone-600 shadow-sm"
                      : "bg-white dark:bg-[#181316] border-stone-200/90 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`font-mono text-xs font-semibold ${
                        isActive
                          ? "text-burgundy dark:text-gold"
                          : "text-stone-400 dark:text-stone-500"
                      }`}
                    >
                      {stage.stageNumber < 10 ? `0${stage.stageNumber}` : stage.stageNumber}
                    </span>
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        isActive ? "text-burgundy dark:text-gold" : "text-stone-400 dark:text-stone-500"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-medium text-stone-800 dark:text-stone-200 block truncate">
                    {stage.title}
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono block mt-0.5">
                    {stage.inputShape.split("×")[0].trim()}
                  </span>
                </button>

                {idx < PREPROCESSING_PIPELINE_STAGES.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-stone-300 dark:text-stone-700 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep-Dive Card */}
      <div className="p-5 sm:p-6 rounded-lg bg-stone-50/70 dark:bg-[#171215] border border-stone-200/90 dark:border-stone-800 space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-burgundy dark:text-gold font-mono text-xs font-bold flex items-center justify-center">
              {activeStage.stageNumber < 10 ? `0${activeStage.stageNumber}` : activeStage.stageNumber}
            </span>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-medium text-burgundy dark:text-ivory">
                {activeStage.title}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-serif">
                {activeStage.summary}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300">
              Input: {activeStage.inputShape}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-stone-300 dark:border-stone-600 bg-stone-100 dark:bg-stone-800/80 text-burgundy dark:text-gold font-semibold">
              Output: {activeStage.outputShape}
            </span>
          </div>
        </div>

        {/* Bullet Breakdown & Code Frame */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
              Transformations Executed in Pipeline:
            </span>
            <ul className="space-y-2">
              {activeStage.details.map((detail, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-serif"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-burgundy/60 dark:bg-gold/60 shrink-0 mt-1.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code & Logic Representation */}
          <div className="p-3.5 rounded bg-white dark:bg-[#130E11] border border-stone-200 dark:border-stone-800 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-stone-600 dark:text-stone-400">
              <Terminal className="w-3.5 h-3.5 text-burgundy dark:text-gold" />
              <span>Python Source Reference:</span>
            </div>
            <pre className="font-mono text-[11px] text-stone-800 dark:text-stone-200 overflow-x-auto p-2.5 rounded bg-stone-50 dark:bg-[#181316] border border-stone-200/70 dark:border-stone-800 leading-relaxed">
              {activeStage.id === "raw_dataset" &&
                `# 1. Dataset Ingestion\nimport pandas as pd\ndf = pd.read_csv('hotel_bookings.csv')\nprint(f"Shape: {df.shape}")  # (119390, 32)`}
              {activeStage.id === "missing_values" &&
                `# 2. Missing Value Imputation\ndf['children'] = df['children'].fillna(df['children'].median())\ndf['country'] = df['country'].fillna('Unknown')\ndf['agent'] = df['agent'].fillna(0)\ndf = df.drop(columns=['company'])`}
              {activeStage.id === "duplicate_removal" &&
                `# 3. Deduplication\n# Raw rows: 119,390 -> drop 31,994 duplicates\ndf_model = df_clean.drop_duplicates()  # 87,396 rows`}
              {activeStage.id === "feature_selection" &&
                `# 4. Target Leakage Prevention\n# Drop reservation_status to avoid 100% artificial accuracy\nX = df_model.drop(columns=['is_canceled', 'reservation_status', 'reservation_status_date'])\ny = df_model['is_canceled']`}
              {activeStage.id === "categorical_encoding" &&
                `# 5. One-Hot Categorical Encoding\ncat_cols = ['hotel', 'meal', 'market_segment', 'distribution_channel', 'deposit_type', 'customer_type']\nX = pd.get_dummies(X, columns=cat_cols, drop_first=True)`}
              {activeStage.id === "numerical_scaling" &&
                `# 6. Standardization\nfrom sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX[num_cols] = scaler.fit_transform(X[num_cols])`}
              {activeStage.id === "train_test_split" &&
                `# 7. Stratified Train-Test Split (80/20)\nfrom sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.20, stratify=y, random_state=42\n)  # 69,916 train / 17,480 test`}
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
}