import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePredictions } from "../context/PredictionContext";
import { predictCancellation } from "../services/api";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Building,
  Shield,
  Send,
  Download,
  BookmarkCheck,
  Zap,
  Info,
  Check,
  Layers,
  ArrowRight,
  Sliders,
  Cpu,
} from "lucide-react";

export default function PredictionStudioPage() {
  const { addPrediction, backendStatus } = usePredictions();

  // Initial Form State with all 18 required fields
  const initialFormState = {
    hotelType: "City Hotel",
    leadTime: 45,
    arrivalYear: 2026,
    arrivalMonth: "August",
    arrivalDate: 15,
    weekendNights: 2,
    weekNights: 3,
    adults: 2,
    children: 0,
    country: "PRT",
    marketSegment: "Online TA",
    distributionChannel: "TA/TO",
    isRepeatedGuest: false,
    previousCancellations: 0,
    depositType: "No Deposit",
    customerType: "Transient",
    adr: 120.00,
    specialRequests: 1,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [completedActions, setCompletedActions] = useState({});

  // Field change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Direct state setter for pill buttons
  const setField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (formData.leadTime === "" || formData.leadTime < 0) {
      newErrors.leadTime = "Lead time must be 0 days or greater";
    }
    if (formData.arrivalDate < 1 || formData.arrivalDate > 31) {
      newErrors.arrivalDate = "Date must be between 1 and 31";
    }
    if (formData.adults < 1) {
      newErrors.adults = "At least 1 adult guest is required";
    }
    if (formData.adr < 0) {
      newErrors.adr = "ADR cannot be negative";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Quick preset loaders
  const loadPreset = (presetType) => {
    if (presetType === "highRisk") {
      setFormData({
        hotelType: "City Hotel",
        leadTime: 230,
        arrivalYear: 2026,
        arrivalMonth: "September",
        arrivalDate: 20,
        weekendNights: 2,
        weekNights: 5,
        adults: 2,
        children: 0,
        country: "PRT",
        marketSegment: "Online TA",
        distributionChannel: "TA/TO",
        isRepeatedGuest: false,
        previousCancellations: 2,
        depositType: "Non Refund",
        customerType: "Transient",
        adr: 145.00,
        specialRequests: 0,
      });
    } else if (presetType === "lowRisk") {
      setFormData({
        hotelType: "Resort Hotel",
        leadTime: 14,
        arrivalYear: 2026,
        arrivalMonth: "July",
        arrivalDate: 10,
        weekendNights: 2,
        weekNights: 2,
        adults: 2,
        children: 1,
        country: "GBR",
        marketSegment: "Direct",
        distributionChannel: "Direct",
        isRepeatedGuest: true,
        previousCancellations: 0,
        depositType: "No Deposit",
        customerType: "Transient",
        adr: 195.00,
        specialRequests: 3,
      });
    } else if (presetType === "corporate") {
      setFormData({
        hotelType: "City Hotel",
        leadTime: 8,
        arrivalYear: 2026,
        arrivalMonth: "November",
        arrivalDate: 18,
        weekendNights: 0,
        weekNights: 3,
        adults: 1,
        children: 0,
        country: "DEU",
        marketSegment: "Corporate",
        distributionChannel: "Corporate",
        isRepeatedGuest: true,
        previousCancellations: 0,
        depositType: "No Deposit",
        customerType: "Contract",
        adr: 110.00,
        specialRequests: 1,
      });
    } else if (presetType === "lastMinute") {
      setFormData({
        hotelType: "City Hotel",
        leadTime: 2,
        arrivalYear: 2026,
        arrivalMonth: "August",
        arrivalDate: 25,
        weekendNights: 1,
        weekNights: 1,
        adults: 2,
        children: 0,
        country: "FRA",
        marketSegment: "Online TA",
        distributionChannel: "TA/TO",
        isRepeatedGuest: false,
        previousCancellations: 0,
        depositType: "No Deposit",
        customerType: "Transient",
        adr: 160.00,
        specialRequests: 2,
      });
    }
    setPredictionResult(null);
    setCompletedActions({});
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSavedSuccess(false);

    try {
      const result = await predictCancellation(formData);
      setPredictionResult(result);
      setCompletedActions({});

      // Automatically log to prediction history
      addPrediction({
        id: result.booking_id,
        hotelType: formData.hotelType,
        leadTime: parseInt(formData.leadTime, 10),
        customerType: formData.customerType,
        predictedStatus: result.predicted_label,
        predictionClass: result.prediction,
        confidence: result.confidence,
        modelUsed: result.model_name,
        predictionDate: result.timestamp,
        adr: parseFloat(formData.adr),
        depositType: formData.depositType,
        marketSegment: formData.marketSegment,
        specialRequests: parseInt(formData.specialRequests, 10),
        country: formData.country,
        riskFactors: result.risk_drivers,
        recommendedAction: result.suggested_actions[0] || "Review booking parameters.",
        isDemo: true,
      });
      setSavedSuccess(true);
    } catch (err) {
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setPredictionResult(null);
    setErrors({});
    setCompletedActions({});
  };

  const toggleAction = (idx) => {
    setCompletedActions((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Estimated booking value: ADR * (weekendNights + weekNights)
  const totalNights = (parseInt(formData.weekendNights, 10) || 0) + (parseInt(formData.weekNights, 10) || 0) || 1;
  const bookingValue = (parseFloat(formData.adr) || 0) * totalNights;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Title & Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/90 dark:border-stone-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="folio-tag">FOLIO N° 03 · INFERENCE ENGINE</span>
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              18 Input Features · Random Forest
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-burgundy dark:text-ivory">
            Booking Cancellation Prediction Studio
          </h1>
          <p className="text-sm font-serif text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
            Evaluate individual reservation attributes across 18 operational variables to calculate cancellation probability. Benchmarked against the trained Random Forest classifier.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mr-1">
            Presets:
          </span>
          <button
            type="button"
            onClick={() => loadPreset("highRisk")}
            className="px-2.5 py-1 rounded border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 text-xs font-mono transition-colors hover:bg-rose-100"
          >
            High-Risk OTA
          </button>
          <button
            type="button"
            onClick={() => loadPreset("lowRisk")}
            className="px-2.5 py-1 rounded border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-mono transition-colors hover:border-stone-400"
          >
            VIP Resort Stay
          </button>
          <button
            type="button"
            onClick={() => loadPreset("corporate")}
            className="px-2.5 py-1 rounded border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-mono transition-colors hover:border-stone-400"
          >
            Corporate Repeat
          </button>
          <button
            type="button"
            onClick={() => loadPreset("lastMinute")}
            className="px-2.5 py-1 rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 text-xs font-mono transition-colors hover:border-stone-400"
          >
            Last-Minute Direct
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FORM CONTAINER (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* SECTION 1: Hotel & Stay Window */}
            <div className="folio-card p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-burgundy dark:text-gold">01</span>
                  <h3 className="font-display text-lg font-medium text-burgundy dark:text-ivory">
                    Property & Arrival Horizon
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                  Inventory & Timing
                </span>
              </div>

              {/* Hotel Type Selector Pills */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
                  Property Classification *
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setField("hotelType", "City Hotel")}
                    className={`p-3 rounded border text-left transition-all ${
                      formData.hotelType === "City Hotel"
                        ? "bg-stone-100 dark:bg-stone-800 border-stone-400 dark:border-stone-600 shadow-sm"
                        : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300"
                    }`}
                  >
                    <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 block">City Hotel</span>
                    <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">Historical 41.7% Churn</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setField("hotelType", "Resort Hotel")}
                    className={`p-3 rounded border text-left transition-all ${
                      formData.hotelType === "Resort Hotel"
                        ? "bg-stone-100 dark:bg-stone-800 border-stone-400 dark:border-stone-600 shadow-sm"
                        : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300"
                    }`}
                  >
                    <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 block">Resort Hotel</span>
                    <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">Historical 27.8% Churn</span>
                  </button>
                </div>
              </div>

              {/* Lead Time Slider & Input Combined */}
              <div className="p-4 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    Lead Time (Days Prior) *
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      name="leadTime"
                      min="0"
                      max="1000"
                      value={formData.leadTime}
                      onChange={handleChange}
                      className="w-20 px-2 py-1 rounded text-right font-mono font-semibold text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100"
                    />
                    <span className="text-xs font-mono text-stone-500 dark:text-stone-400">days</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="365"
                  value={formData.leadTime}
                  onChange={(e) => setField("leadTime", parseInt(e.target.value, 10))}
                  className="w-full accent-burgundy dark:accent-gold cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 dark:text-stone-400 font-mono">
                  <span>0d (Same day)</span>
                  <span>90d (High Risk Threshold)</span>
                  <span>365d+ (Advance)</span>
                </div>
              </div>

              {/* Arrival Date Breakdown */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
                    Year
                  </label>
                  <select
                    name="arrivalYear"
                    value={formData.arrivalYear}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 text-xs"
                  >
                    <option value={2026}>2026</option>
                    <option value={2025}>2025</option>
                    <option value={2027}>2027</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
                    Month
                  </label>
                  <select
                    name="arrivalMonth"
                    value={formData.arrivalMonth}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 text-xs"
                  >
                    {[
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
                    Day (1-31)
                  </label>
                  <input
                    type="number"
                    name="arrivalDate"
                    min="1"
                    max="31"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Nights Breakdown */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
                    Weekend Nights (Sat/Sun)
                  </label>
                  <input
                    type="number"
                    name="weekendNights"
                    min="0"
                    max="20"
                    value={formData.weekendNights}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
                    Week Nights (Mon-Fri)
                  </label>
                  <input
                    type="number"
                    name="weekNights"
                    min="0"
                    max="30"
                    value={formData.weekNights}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: Guest Party & Demographics */}
            <div className="folio-card p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-burgundy dark:text-gold">02</span>
                  <h3 className="font-display text-lg font-medium text-burgundy dark:text-ivory">
                    Party Demographics & Loyalty
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                  Customer Profile
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
                    Adults (1+)
                  </label>
                  <input
                    type="number"
                    name="adults"
                    min="1"
                    max="10"
                    value={formData.adults}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
                    Children (0+)
                  </label>
                  <input
                    type="number"
                    name="children"
                    min="0"
                    max="10"
                    value={formData.children}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
                    Origin (ISO)
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-100 text-xs font-mono"
                  >
                    <option value="PRT">PRT (Portugal)</option>
                    <option value="GBR">GBR (United Kingdom)</option>
                    <option value="FRA">FRA (France)</option>
                    <option value="ESP">ESP (Spain)</option>
                    <option value="DEU">DEU (Germany)</option>
                    <option value="ITA">ITA (Italy)</option>
                    <option value="USA">USA (United States)</option>
                    <option value="IRL">IRL (Ireland)</option>
                    <option value="BEL">BEL (Belgium)</option>
                    <option value="NLD">NLD (Netherlands)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
                    Customer Type
                  </label>
                  <select
                    name="customerType"
                    value={formData.customerType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100"
                  >
                    <option value="Transient">Transient (Independent Traveler)</option>
                    <option value="Transient-Party">Transient-Party</option>
                    <option value="Contract">Contract (Corporate Negotiated)</option>
                    <option value="Group">Group Booking Block</option>
                  </select>
                </div>

                <div className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-stone-800 dark:text-stone-200 block">
                      Repeated Guest (Loyalty)
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                      Historical repeat churn: &lt;14%
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isRepeatedGuest"
                      checked={formData.isRepeatedGuest}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-burgundy dark:peer-checked:bg-gold"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* SECTION 3: Financial & Booking Distribution */}
            <div className="folio-card p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-burgundy dark:text-gold">03</span>
                  <h3 className="font-display text-lg font-medium text-burgundy dark:text-ivory">
                    Financial Policy & Distribution
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                  Channel & Yield
                </span>
              </div>

              {/* Deposit Type Pills */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
                  Deposit Policy *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["No Deposit", "Non Refund", "Refundable"].map((dType) => (
                    <button
                      key={dType}
                      type="button"
                      onClick={() => setField("depositType", dType)}
                      className={`py-2 px-3 rounded text-xs transition-colors ${
                        formData.depositType === dType
                          ? dType === "Non Refund"
                            ? "bg-rose-900 text-white font-medium shadow-sm"
                            : "bg-burgundy text-white dark:bg-gold dark:text-wine font-medium shadow-sm"
                          : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300"
                      }`}
                    >
                      {dType}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Market Segment */}
                <div>
                  <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
                    Market Segment
                  </label>
                  <select
                    name="marketSegment"
                    value={formData.marketSegment}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100"
                  >
                    <option value="Online TA">Online Travel Agency (OTA)</option>
                    <option value="Direct">Direct Hotel Website / Phone</option>
                    <option value="Offline TA/TO">Offline TA / Tour Operator</option>
                    <option value="Corporate">Corporate Account</option>
                    <option value="Groups">Groups</option>
                  </select>
                </div>

                {/* Distribution Channel */}
                <div>
                  <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
                    Distribution Channel
                  </label>
                  <select
                    name="distributionChannel"
                    value={formData.distributionChannel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100"
                  >
                    <option value="TA/TO">Travel Agent / Tour Operator</option>
                    <option value="Direct">Direct Channel</option>
                    <option value="Corporate">Corporate GDS</option>
                    <option value="GDS">Global Distribution System</option>
                  </select>
                </div>
              </div>

              {/* ADR (Average Daily Rate) & Previous Cancellations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
                    Average Daily Rate (ADR $)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-mono text-stone-400">$</span>
                    <input
                      type="number"
                      step="0.01"
                      name="adr"
                      min="0"
                      value={formData.adr}
                      onChange={handleChange}
                      className="w-full pl-7 pr-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-800 dark:text-stone-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
                    Previous Cancellations (Count)
                  </label>
                  <input
                    type="number"
                    name="previousCancellations"
                    min="0"
                    max="20"
                    value={formData.previousCancellations}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-800 dark:text-stone-100"
                  />
                </div>
              </div>

              {/* Special Requests Pills */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-mono text-stone-600 dark:text-stone-400">
                    Total Special Requests (Guest Engagement)
                  </label>
                  <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                    2+ requests drops cancellation by &gt;60%
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setField("specialRequests", num)}
                      className={`py-1.5 rounded text-xs transition-colors ${
                        parseInt(formData.specialRequests, 10) === num
                          ? "bg-burgundy text-white dark:bg-gold dark:text-wine font-medium shadow-sm"
                          : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300"
                      }`}
                    >
                      {num === 3 ? "3+ Requests" : `${num} Request${num === 1 ? "" : "s"}`}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Form Action Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:flex-1 btn-primary py-3 justify-center text-sm disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Evaluating Classifier...</span>
                  </>
                ) : (
                  <>
                    <span>Execute Inference</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto btn-secondary py-3 text-sm justify-center"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Parameters</span>
              </button>
            </div>

          </form>
        </div>

        {/* PREDICTION RESULT PANEL (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          {predictionResult ? (
            <div className="folio-card p-6 sm:p-7 space-y-5">
              
              {/* Header Badges */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
                <span className="font-mono text-xs text-stone-600 dark:text-stone-400">
                  ID: {predictionResult.booking_id}
                </span>
                <span className="px-2 py-0.5 rounded border border-stone-300 dark:border-stone-700 font-mono text-[10px] uppercase text-stone-600 dark:text-stone-400">
                  UI Simulation
                </span>
              </div>

              {/* Status Banner */}
              <div
                className={`p-4 rounded border ${
                  predictionResult.prediction === 1
                    ? "bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200"
                    : "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {predictionResult.prediction === 1 ? (
                    <XCircle className="w-5 h-5 text-rose-800 dark:text-rose-400 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider block opacity-75">
                      Verdict: {predictionResult.predicted_label} (Class {predictionResult.prediction})
                    </span>
                    <h3 className="font-display text-lg font-medium leading-tight">
                      {predictionResult.headline}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Confidence & Revenue at Risk Gauge */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40 font-mono">
                <div>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                    Confidence Factor
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xl font-bold text-burgundy dark:text-gold">
                      {predictionResult.confidence}%
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">
                    Random Forest Model
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                    Exposure at Risk
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xl font-bold text-stone-800 dark:text-stone-100">
                      ${Math.round(bookingValue).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">
                    {totalNights} nights @ ${formData.adr}/nt
                  </span>
                </div>
              </div>

              {/* Rationale */}
              <div className="space-y-1.5 font-serif">
                <h4 className="text-xs font-mono uppercase tracking-wider text-burgundy dark:text-gold">
                  Inference Rationale
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {predictionResult.explanation}
                </p>
              </div>

              {/* Influencing Signals */}
              {predictionResult.risk_drivers && predictionResult.risk_drivers.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-burgundy dark:text-gold">
                    Key Influencing Signals
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 font-serif">
                    {predictionResult.risk_drivers.map((driver, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-burgundy/60 dark:bg-gold/60 shrink-0 mt-1.5" />
                        <span>{driver}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Interactive Operational Checklist */}
              {predictionResult.suggested_actions && predictionResult.suggested_actions.length > 0 && (
                <div className="space-y-2.5 pt-3 border-t border-stone-200/80 dark:border-stone-800">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-burgundy dark:text-gold">
                      Operational Action Playbook
                    </h4>
                    <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                      Checklist
                    </span>
                  </div>
                  <div className="space-y-2">
                    {predictionResult.suggested_actions.map((act, idx) => {
                      const isDone = completedActions[idx];
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleAction(idx)}
                          className={`p-2.5 rounded border text-xs cursor-pointer transition-all flex items-start gap-2.5 font-serif ${
                            isDone
                              ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900 text-stone-500 line-through opacity-80"
                              : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300"
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                              isDone
                                ? "bg-emerald-600 border-emerald-600 text-white"
                                : "border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                            }`}
                          >
                            {isDone && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="flex-1">{act}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Saved confirmation */}
              {savedSuccess && (
                <div className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-stone-700 dark:text-stone-300">
                    <BookmarkCheck className="w-3.5 h-3.5 text-stone-500" />
                    Recorded in Audit History
                  </span>
                  <Link
                    to="/history"
                    className="font-mono text-[11px] text-burgundy dark:text-gold underline"
                  >
                    View Log &rarr;
                  </Link>
                </div>
              )}

            </div>
          ) : (
            /* Empty State */
            <div className="folio-card p-8 text-center space-y-5">
              <div className="w-12 h-12 rounded border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 mx-auto flex items-center justify-center text-stone-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
                  Awaiting Reservation Parameters
                </h3>
                <p className="text-xs font-serif text-stone-600 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
                  Enter booking details on the left or click a preset scenario above to execute the model inference.
                </p>
              </div>

              {/* Instructions checklist */}
              <div className="p-4 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 text-left space-y-2 text-xs text-stone-600 dark:text-stone-400 font-serif">
                <div className="flex items-center gap-1.5 text-burgundy dark:text-gold font-mono text-xs uppercase tracking-wider">
                  <Info className="w-3.5 h-3.5 text-stone-400" />
                  <span>Evaluation Principles:</span>
                </div>
                <div className="space-y-1 pl-5">
                  <p>• Lead Time & deposit type drive ~43% of total model importance</p>
                  <p>• Special requests indicate high guest commitment (&lt;15% churn)</p>
                  <p>• Direct channel reservations possess highest arrival fidelity</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}