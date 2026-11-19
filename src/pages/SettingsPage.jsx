import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { usePredictions } from "../context/PredictionContext";
import {
  getApiBaseUrl,
  setApiBaseUrl,
  isExternalApiEnabled,
  setExternalApiEnabled,
} from "../services/api";
import {
  Settings,
  User,
  Sun,
  Moon,
  Server,
  Cpu,
  Info,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Terminal,
  ShieldCheck,
  Building,
  Sliders,
  DollarSign,
  Bell,
  ChevronDown,
  ChevronUp,
  Palette,
  Check,
  Save,
  Hotel,
  ShieldAlert,
} from "lucide-react";

export default function SettingsPage() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { backendStatus, refreshBackendStatus } = usePredictions();

  // Hotelier Profile State (persisted to localStorage)
  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem("staywise_profile_name") || "Alexander Vance";
  });
  const [profileRole, setProfileRole] = useState(() => {
    return localStorage.getItem("staywise_profile_role") || "VP of Revenue Optimization";
  });
  const [propertyName, setPropertyName] = useState(() => {
    return localStorage.getItem("staywise_property_name") || "The Grand Belmond Hotel & Residences";
  });
  const [propertyCategory, setPropertyCategory] = useState(() => {
    return localStorage.getItem("staywise_property_category") || "5-Star Luxury Resort";
  });
  const [roomInventory, setRoomInventory] = useState(() => {
    return localStorage.getItem("staywise_room_inventory") || "420";
  });
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("staywise_currency") || "USD";
  });

  // Operational Risk & Decision Threshold Controls
  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem("staywise_selected_model") || "Random Forest";
  });
  const [decisionThreshold, setDecisionThreshold] = useState(() => {
    const saved = localStorage.getItem("staywise_decision_threshold");
    return saved ? parseFloat(saved) : 0.50;
  });
  const [autoOverbookingBuffer, setAutoOverbookingBuffer] = useState(() => {
    return localStorage.getItem("staywise_auto_buffer") !== "false";
  });
  const [highRiskAlerts, setHighRiskAlerts] = useState(() => {
    return localStorage.getItem("staywise_risk_alerts") !== "false";
  });

  // UI & Experience Preferences
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    return localStorage.getItem("staywise_animations") !== "false";
  });
  const [compactDensity, setCompactDensity] = useState(() => {
    return localStorage.getItem("staywise_density") === "compact";
  });

  // External API Developer Section State (Optional, tucked at bottom)
  const [showDeveloperIntegration, setShowDeveloperIntegration] = useState(false);
  const [enableExternalApi, setEnableExternalApi] = useState(isExternalApiEnabled());
  const [apiUrl, setApiUrl] = useState(getApiBaseUrl());
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionMessage, setConnectionMessage] = useState(null);

  // Save feedback toast
  const [saveToast, setSaveToast] = useState(false);

  // Save changes to localStorage
  const handleSaveProfileAndRisk = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem("staywise_profile_name", profileName);
    localStorage.setItem("staywise_profile_role", profileRole);
    localStorage.setItem("staywise_property_name", propertyName);
    localStorage.setItem("staywise_property_category", propertyCategory);
    localStorage.setItem("staywise_room_inventory", roomInventory);
    localStorage.setItem("staywise_currency", currency);
    localStorage.setItem("staywise_selected_model", selectedModel);
    localStorage.setItem("staywise_decision_threshold", decisionThreshold.toString());
    localStorage.setItem("staywise_auto_buffer", autoOverbookingBuffer.toString());
    localStorage.setItem("staywise_risk_alerts", highRiskAlerts.toString());
    localStorage.setItem("staywise_animations", animationsEnabled.toString());
    localStorage.setItem("staywise_density", compactDensity ? "compact" : "comfortable");

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleToggleExternalApi = (e) => {
    const val = e.target.checked;
    setEnableExternalApi(val);
    setExternalApiEnabled(val);
    setConnectionMessage(null);
  };

  const handleSaveApiUrl = async () => {
    setApiBaseUrl(apiUrl);
    setExternalApiEnabled(true);
    setEnableExternalApi(true);
    setTestingConnection(true);
    setConnectionMessage(null);
    try {
      const result = await refreshBackendStatus();
      if (result.online) {
        setConnectionMessage({
          type: "success",
          text: `Successfully connected to FastAPI at ${apiUrl}. Model: ${result.modelFile || "Loaded"} (${result.mode})`,
        });
      } else {
        setConnectionMessage({
          type: "error",
          text: `Could not reach service at ${apiUrl}. StayWise AI remains in self-contained standalone mode.`,
        });
      }
    } catch (err) {
      setConnectionMessage({
        type: "error",
        text: `Error connecting to backend: ${err.message}`,
      });
    } finally {
      setTestingConnection(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/90 dark:border-stone-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="folio-tag">FOLIO N° 07 · SYSTEM CONFIGURATION</span>
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              User & Environment Parameters
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-burgundy dark:text-ivory">
            Platform Settings & Configuration
          </h1>
          <p className="text-sm font-serif text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
            Tailor the STAYWISE AI operational environment: personalize hotelier profile details, tune cancellation risk decision cutoffs, and configure visual display standards.
          </p>
        </div>

        {/* Global Save Button */}
        <div className="flex items-center gap-2.5">
          {saveToast && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-emerald-300 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-mono">
              <Check className="w-3.5 h-3.5" />
              <span>Preferences Saved</span>
            </div>
          )}
          <button
            type="button"
            onClick={handleSaveProfileAndRisk}
            className="btn-primary text-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT MAIN COLUMN: Profile, Operations & Risk (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. HOTELIER PROFILE & PROPERTY ASSIGNMENT */}
          <section className="folio-card p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-burgundy dark:text-gold">01</span>
                <div>
                  <h2 className="font-display text-lg font-medium text-burgundy dark:text-ivory">
                    Hotelier Profile & Property Assignment
                  </h2>
                  <p className="text-xs font-serif text-stone-500 dark:text-stone-400">
                    Operator credentials and primary hospitality property configuration
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded border border-stone-200 dark:border-stone-800 font-mono text-[10px] text-stone-600 dark:text-stone-400 uppercase">
                Active Operator
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-stone-600 dark:text-stone-400 mb-1">
                  Operator Full Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="e.g. Alexander Vance"
                  className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-600 dark:text-stone-400 mb-1">
                  Organizational Role / Title
                </label>
                <input
                  type="text"
                  value={profileRole}
                  onChange={(e) => setProfileRole(e.target.value)}
                  placeholder="e.g. VP of Revenue Optimization"
                  className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-stone-600 dark:text-stone-400 mb-1">
                  Assigned Hotel Property
                </label>
                <input
                  type="text"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  placeholder="e.g. The Grand Belmond Hotel & Residences"
                  className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-600 dark:text-stone-400 mb-1">
                  Property Classification
                </label>
                <select
                  value={propertyCategory}
                  onChange={(e) => setPropertyCategory(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100"
                >
                  <option value="5-Star Luxury Resort">5-Star Luxury Resort</option>
                  <option value="4-Star Boutique City Hotel">4-Star Boutique City Hotel</option>
                  <option value="Urban Business Hotel">Urban Business Hotel</option>
                  <option value="Coastal Destination Resort">Coastal Destination Resort</option>
                  <option value="Heritage & Palace Property">Heritage & Palace Property</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-stone-600 dark:text-stone-400 mb-1">
                    Room Inventory
                  </label>
                  <input
                    type="number"
                    value={roomInventory}
                    onChange={(e) => setRoomInventory(e.target.value)}
                    placeholder="420"
                    className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-800 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-600 dark:text-stone-400 mb-1">
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-800 dark:text-stone-100"
                  >
                    <option value="USD">$ USD (US Dollar)</option>
                    <option value="EUR">€ EUR (Euro)</option>
                    <option value="GBP">£ GBP (British Pound)</option>
                    <option value="AED">AED (UAE Dirham)</option>
                    <option value="JPY">¥ JPY (Japanese Yen)</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* 2. OPERATIONAL RISK & DECISION THRESHOLDS */}
          <section className="folio-card p-6 sm:p-7 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-200/80 dark:border-stone-800">
              <span className="font-mono text-xs font-semibold text-burgundy dark:text-gold">02</span>
              <div>
                <h2 className="font-display text-lg font-medium text-burgundy dark:text-ivory">
                  Operational Risk & Decision Thresholds
                </h2>
                <p className="text-xs font-serif text-stone-500 dark:text-stone-400">
                  Tune classification probability limits and automated overbooking tolerance
                </p>
              </div>
            </div>

            {/* Model Architecture Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Primary Machine Learning Classifier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    name: "Random Forest",
                    f1: "69.48%",
                    desc: "Champion Ensemble (100 Trees)",
                    badge: "Certified Benchmark",
                  },
                  {
                    name: "Decision Tree",
                    f1: "64.80%",
                    desc: "Rule-based partition",
                    badge: "Fast Interpretability",
                  },
                  {
                    name: "Logistic Regression",
                    f1: "56.20%",
                    desc: "Linear log-odds baseline",
                    badge: "Parametric Baseline",
                  },
                ].map((m) => {
                  const isSelected = selectedModel === m.name;
                  return (
                    <button
                      key={m.name}
                      type="button"
                      onClick={() => setSelectedModel(m.name)}
                      className={`p-3 rounded border text-left transition-all ${
                        isSelected
                          ? "bg-stone-100 dark:bg-stone-800 border-stone-400 dark:border-stone-600 shadow-sm"
                          : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          {m.name}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-burgundy dark:text-gold shrink-0" />
                        )}
                      </div>
                      <div className="flex items-baseline gap-1.5 mb-1 font-mono text-[11px]">
                        <span className="text-stone-500">F1:</span>
                        <span className="font-semibold text-burgundy dark:text-gold">{m.f1}</span>
                      </div>
                      <span className="inline-block px-1.5 py-0.5 rounded font-mono text-[9px] text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-800">
                        {m.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Probability Cutoff Slider */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 block">
                    Cancellation Decision Cutoff (P-Cancel Risk Index)
                  </label>
                  <p className="text-xs font-serif text-stone-500 dark:text-stone-400">
                    Bookings with estimated cancellation risk exceeding this probability are marked as high risk.
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-mono text-xs font-semibold text-burgundy dark:text-gold">
                  {decisionThreshold.toFixed(2)}
                </div>
              </div>

              <input
                type="range"
                min="0.30"
                max="0.70"
                step="0.05"
                value={decisionThreshold}
                onChange={(e) => setDecisionThreshold(parseFloat(e.target.value))}
                className="w-full accent-burgundy dark:accent-gold cursor-pointer h-2 rounded bg-stone-200 dark:bg-stone-800"
              />

              {/* Slider Scale Labels */}
              <div className="grid grid-cols-3 text-[10px] text-stone-500 dark:text-stone-400 font-mono">
                <div className="text-left">
                  <span className="font-semibold text-burgundy dark:text-gold">0.30</span> — Conservative
                  <p className="text-[9px] font-serif opacity-75">Flags more bookings to protect occupancy</p>
                </div>
                <div className="text-center">
                  <span className="font-semibold text-burgundy dark:text-gold">0.50</span> — Standard
                  <p className="text-[9px] font-serif opacity-75">Optimal F1 benchmark equilibrium</p>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-burgundy dark:text-gold">0.70</span> — Aggressive
                  <p className="text-[9px] font-serif opacity-75">Flags only bookings with severe churn risk</p>
                </div>
              </div>
            </div>

            {/* Operational Automation Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-medium text-stone-800 dark:text-stone-200 block">
                    Overbooking Buffer Guidance
                  </span>
                  <p className="text-[11px] font-serif text-stone-500 dark:text-stone-400 leading-relaxed">
                    Suggest compensatory room inventory buffers based on aggregate churn risk.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={autoOverbookingBuffer}
                    onChange={(e) => setAutoOverbookingBuffer(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-stone-300 peer-focus:outline-none rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-burgundy dark:peer-checked:bg-gold"></div>
                </label>
              </div>

              <div className="p-3.5 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-medium text-stone-800 dark:text-stone-200 block">
                    High Risk Lead Alerts
                  </span>
                  <p className="text-[11px] font-serif text-stone-500 dark:text-stone-400 leading-relaxed">
                    Trigger visual warnings for bookings with lead time over 120 days and zero deposit.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={highRiskAlerts}
                    onChange={(e) => setHighRiskAlerts(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-stone-300 peer-focus:outline-none rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-burgundy dark:peer-checked:bg-gold"></div>
                </label>
              </div>
            </div>
          </section>

          {/* 3. OPTIONAL ADVANCED FASTAPI BACKEND INTEGRATION (COLLAPSED BY DEFAULT) */}
          <section className="folio-card overflow-hidden">
            <button
              type="button"
              onClick={() => setShowDeveloperIntegration(!showDeveloperIntegration)}
              className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-stone-50/50 dark:hover:bg-stone-900/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-semibold text-burgundy dark:text-gold">03</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-base sm:text-lg font-medium text-burgundy dark:text-ivory">
                      Developer & FastAPI Backend Integration
                    </h2>
                    <span className="px-1.5 py-0.5 rounded border border-stone-200 dark:border-stone-800 font-mono text-[9px] text-stone-500 uppercase">
                      Optional
                    </span>
                  </div>
                  <p className="text-xs font-serif text-stone-500 dark:text-stone-400 mt-0.5">
                    Connect an external Python microservice running your trained .pkl model, or leave disabled for standalone simulation
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <span className="px-2 py-0.5 rounded border border-stone-200 dark:border-stone-800 font-mono text-[10px] text-stone-600 dark:text-stone-400">
                  {backendStatus.online ? "API Connected" : "Standalone Engine"}
                </span>
                {showDeveloperIntegration ? (
                  <ChevronUp className="w-4 h-4 text-stone-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400" />
                )}
              </div>
            </button>

            {showDeveloperIntegration && (
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 space-y-4 border-t border-stone-200/80 dark:border-stone-800">
                {/* Enable External Switch */}
                <div className="p-3.5 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-stone-800 dark:text-stone-200 block">
                      Enable External Microservice Endpoint
                    </span>
                    <span className="text-[11px] font-serif text-stone-500 dark:text-stone-400">
                      When turned off, StayWise AI operates entirely in-app without any external network calls
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableExternalApi}
                      onChange={handleToggleExternalApi}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-stone-300 peer-focus:outline-none rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-burgundy dark:peer-checked:bg-gold"></div>
                  </label>
                </div>

                {/* API URL and Test Connection */}
                {enableExternalApi && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-stone-600 dark:text-stone-400">
                      FastAPI Base URL
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <input
                        type="text"
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
                        placeholder="http://127.0.0.1:8000/api"
                        className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-800 dark:text-stone-100"
                      />
                      <button
                        type="button"
                        disabled={testingConnection}
                        onClick={handleSaveApiUrl}
                        className="w-full sm:w-auto btn-primary text-xs py-1.5 shrink-0"
                      >
                        {testingConnection ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <RefreshCw className="w-3.5 h-3.5" />
                        )}
                        <span>Test & Connect</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Connection feedback message */}
                {connectionMessage && (
                  <div
                    className={`p-3 rounded text-xs border font-serif ${
                      connectionMessage.type === "success"
                        ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300"
                        : "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300"
                    }`}
                  >
                    {connectionMessage.text}
                  </div>
                )}

                {/* Local Terminal Instructions */}
                <div className="p-3.5 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-stone-700 dark:text-stone-300">
                    <Terminal className="w-3.5 h-3.5 text-burgundy dark:text-gold" />
                    <span>How to run the companion FastAPI service locally:</span>
                  </div>
                  <div className="space-y-0.5 font-mono text-[11px] bg-white dark:bg-stone-800 p-2.5 rounded border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300">
                    <p className="text-stone-400"># Navigate to backend folder and start service</p>
                    <p>cd backend</p>
                    <p>pip install -r requirements.txt</p>
                    <p>python3 main.py</p>
                  </div>
                </div>
              </div>
            )}
          </section>

        </div>

        {/* RIGHT COLUMN: Theme Preferences & Application Specifications (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* THEME PREFERENCES CARD */}
          <div className="folio-card p-5 space-y-4">
            <div className="pb-2 border-b border-stone-200/80 dark:border-stone-800">
              <h2 className="font-display text-lg font-medium text-burgundy dark:text-ivory">
                Visual Theme & Atmosphere
              </h2>
            </div>
            
            <p className="text-xs font-serif text-stone-600 dark:text-stone-400 leading-relaxed">
              Curated editorial aesthetics. Warm Ivory replicates morning daylight on library folios; Dark Wine offers an evening reading lounge atmosphere.
            </p>

            {/* Interactive Theme Mode Selector Cards */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => isDark && toggleTheme()}
                className={`p-3 rounded border text-center transition-all ${
                  !isDark
                    ? "bg-white border-stone-500 shadow-sm text-burgundy font-medium"
                    : "bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-500"
                }`}
              >
                <Sun className="w-4 h-4 mx-auto mb-1 text-stone-500" />
                <span className="text-xs font-serif block">Warm Ivory</span>
                <span className="text-[10px] font-mono text-stone-400 block">Light Mode</span>
              </button>

              <button
                type="button"
                onClick={() => !isDark && toggleTheme()}
                className={`p-3 rounded border text-center transition-all ${
                  isDark
                    ? "bg-[#181216] border-stone-400 shadow-sm text-gold font-medium"
                    : "bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-500"
                }`}
              >
                <Moon className="w-4 h-4 mx-auto mb-1 text-stone-400" />
                <span className="text-xs font-serif block">Dark Wine</span>
                <span className="text-[10px] font-mono text-stone-400 block">Evening Mode</span>
              </button>
            </div>

            {/* Color Swatches Showcase */}
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1.5">
                Brand Palette Spectrum:
              </span>
              <div className="grid grid-cols-5 gap-1 text-center">
                <div className="space-y-0.5">
                  <div className="h-5 rounded bg-[#45171B] border border-stone-200 dark:border-stone-700" />
                  <span className="text-[8px] font-mono block opacity-60">#45171B</span>
                </div>
                <div className="space-y-0.5">
                  <div className="h-5 rounded bg-[#221418] border border-stone-200 dark:border-stone-700" />
                  <span className="text-[8px] font-mono block opacity-60">#221418</span>
                </div>
                <div className="space-y-0.5">
                  <div className="h-5 rounded bg-[#C6A46A] border border-stone-200 dark:border-stone-700" />
                  <span className="text-[8px] font-mono block opacity-60">#C6A46A</span>
                </div>
                <div className="space-y-0.5">
                  <div className="h-5 rounded bg-[#F8F4EC] border border-stone-200 dark:border-stone-700" />
                  <span className="text-[8px] font-mono block opacity-60">#F8F4EC</span>
                </div>
                <div className="space-y-0.5">
                  <div className="h-5 rounded bg-[#EAE1D4] border border-stone-200 dark:border-stone-700" />
                  <span className="text-[8px] font-mono block opacity-60">#EAE1D4</span>
                </div>
              </div>
            </div>

            {/* Micro-interaction & Density toggles */}
            <div className="pt-2.5 border-t border-stone-200/80 dark:border-stone-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-600 dark:text-stone-400">
                  Smooth UI Transitions
                </span>
                <input
                  type="checkbox"
                  checked={animationsEnabled}
                  onChange={(e) => setAnimationsEnabled(e.target.checked)}
                  className="accent-burgundy dark:accent-gold cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-600 dark:text-stone-400">
                  Compact Dashboard Layout
                </span>
                <input
                  type="checkbox"
                  checked={compactDensity}
                  onChange={(e) => setCompactDensity(e.target.checked)}
                  className="accent-burgundy dark:accent-gold cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* APPLICATION SPECIFICATIONS CARD */}
          <div className="folio-card p-5 space-y-3">
            <div className="pb-2 border-b border-stone-200/80 dark:border-stone-800">
              <h2 className="font-display text-base font-medium text-burgundy dark:text-ivory">
                Application Specifications
              </h2>
            </div>

            <div className="space-y-2 text-xs font-mono text-stone-600 dark:text-stone-400">
              <div className="flex justify-between py-0.5 border-b border-stone-100 dark:border-stone-800">
                <span>Application</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">STAYWISE AI</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-stone-100 dark:border-stone-800">
                <span>Tagline</span>
                <span className="italic font-serif">Predict Smarter. Host Better.</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-stone-100 dark:border-stone-800">
                <span>Release</span>
                <span>v1.0.0 Production</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-stone-100 dark:border-stone-800">
                <span>Dataset Rows</span>
                <span>119,390 Records</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-stone-100 dark:border-stone-800">
                <span>Champion Model</span>
                <span className="text-burgundy dark:text-gold font-semibold">Random Forest</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-stone-100 dark:border-stone-800">
                <span>Benchmark F1</span>
                <span className="text-burgundy dark:text-gold font-semibold">69.48% (Certified)</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-stone-100 dark:border-stone-800">
                <span>Execution Mode</span>
                <span>Standalone Simulation</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] font-serif italic text-stone-500 dark:text-stone-400 leading-relaxed border-t border-stone-200/80 dark:border-stone-800">
              "Every Booking Tells a Story. We Help You Predict Its Ending."
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}