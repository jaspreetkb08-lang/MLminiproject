import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  BrainCircuit,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  DollarSign,
  Clock,
  Award,
  Layers,
  Users,
} from "lucide-react";
import { DATASET_STATS } from "../data/datasetStats";

export default function LandingPage() {
  // Quick interactive teaser in hero
  const [demoLeadTime, setDemoLeadTime] = useState(45);
  const [demoDeposit, setDemoDeposit] = useState("No Deposit");

  // Dynamic quick calculation for teaser
  const isHighRisk = demoLeadTime > 90 || demoDeposit === "Non Refund";
  const estimatedProb = Math.min(
    95,
    Math.max(12, Math.round((demoLeadTime / 300) * 55 + (demoDeposit === "Non Refund" ? 40 : 15)))
  );

  return (
    <div className="relative overflow-hidden bg-ivory dark:bg-wine-deep text-charcoal dark:text-ivory transition-colors duration-300">
      
      {/* 1. HERO SECTION — Editorial Literary Masthead */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 lg:py-24 overflow-hidden">
        
        {/* Luxury Hotel Facade Background Image with Softened Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-hotel.jpg"
            alt="Luxury Hotel Entrance"
            className="w-full h-full object-cover object-center filter brightness-[0.98] dark:brightness-[0.78] contrast-[1.02] transition-transform duration-1000 ease-out"
          />
          {/* Luminous Warm Ivory Wash in Light Mode, Soft Twilight Wine in Dark Mode */}
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/90 via-ivory/80 to-ivory dark:from-[#150F12]/92 dark:via-[#1D1418]/85 dark:to-[#150F12] transition-colors duration-300" />
        </div>

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-10 w-full">
          
          {/* Folio Masthead Rules Strip */}
          <div className="flex items-center justify-between border-b border-stone-300/60 dark:border-stone-800 pb-2.5 folio-tag text-[10px] text-stone-500 dark:text-stone-400">
            <span>FOLIO N° 01 · MACHINE LEARNING RESEARCH</span>
            <span className="hidden sm:inline">HOTEL DEMAND PREDICTION PLATFORM</span>
            <span>DATASET: 119,390 STAYS</span>
          </div>

          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Masthead Headline */}
            <h1 className="folio-masthead text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-burgundy dark:text-ivory">
              Every Booking Tells a Story. <br />
              <span className="text-gold italic font-normal">We Help You Predict Its Ending.</span>
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
              Intelligent cancellation prediction powered by supervised machine learning algorithms, engineered for proactive hotel revenue and front-office operations.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/prediction"
                className="w-full sm:w-auto px-7 py-3 rounded-lg btn-primary text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Predict a Booking</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-7 py-3 rounded-lg btn-secondary text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <BarChart3 className="w-4 h-4 text-stone-500 dark:text-gold" />
                <span>Explore Dashboard</span>
              </Link>
            </div>
          </div>

          {/* INTERACTIVE MINI-SIMULATOR CARD RIGHT IN HERO */}
          <div className="max-w-2xl mx-auto luxury-card rounded-2xl p-6 sm:p-7 border border-stone-200/90 dark:border-stone-800 shadow-folio relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200/80 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <h3 className="font-serif font-bold text-sm text-burgundy dark:text-ivory">
                  Interactive Risk Preview
                </h3>
                <span className="text-[11px] text-stone-500 font-mono">
                  [FIG. 0.1 · SIMULATED BEHAVIOR]
                </span>
              </div>
              <span className="folio-tag text-[9px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                Sample Output
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 pt-4 items-center">
              
              {/* Controls (7 cols) */}
              <div className="sm:col-span-7 space-y-3.5">
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    <span className="flex items-center gap-1.5 font-sans">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      Lead Time Before Arrival:
                    </span>
                    <span className="font-mono text-burgundy dark:text-gold font-bold">
                      {demoLeadTime} days
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="300"
                    step="5"
                    value={demoLeadTime}
                    onChange={(e) => setDemoLeadTime(parseInt(e.target.value, 10))}
                    className="w-full accent-burgundy dark:accent-gold cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                    <span>5d (Last minute)</span>
                    <span>90d (Cliff)</span>
                    <span>300d (Year ahead)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    Deposit Policy Terms:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDemoDeposit("No Deposit")}
                      className={`py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                        demoDeposit === "No Deposit"
                          ? "bg-burgundy dark:bg-gold text-ivory dark:text-wine font-bold shadow-sm"
                          : "bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400"
                      }`}
                    >
                      No Deposit (Standard)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDemoDeposit("Non Refund")}
                      className={`py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                        demoDeposit === "Non Refund"
                          ? "bg-[#8A2B34] text-white font-bold shadow-sm"
                          : "bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400"
                      }`}
                    >
                      Non-Refund (99% Risk)
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Output Indicator (5 cols) */}
              <div className="sm:col-span-5 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 text-center space-y-1.5">
                <span className="folio-tag text-[9px] text-stone-500 block">
                  Simulated Risk
                </span>
                <div
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold border ${
                    isHighRisk
                      ? "bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/30"
                      : "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                  }`}
                >
                  {isHighRisk ? "High Cancellation Risk" : "Lower Cancellation Risk"}
                </div>
                <div className="font-display text-2xl font-bold text-burgundy dark:text-ivory">
                  {estimatedProb}% <span className="text-xs font-sans text-stone-400 font-normal">Index</span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
                  {isHighRisk
                    ? "Vulnerable to churn. Recommend card re-authorization."
                    : "Stable arrival fidelity. Standard allocation."}
                </p>
                <div className="pt-1">
                  <Link
                    to="/prediction"
                    className="inline-flex items-center gap-1 text-[11px] text-burgundy dark:text-gold font-semibold underline underline-offset-4"
                  >
                    Open Full 18-Param Form &rarr;
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* Minimalist Editorial Statistics Strip */}
          <div className="pt-2 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl luxury-card border border-stone-200/80 dark:border-stone-800 text-center">
              <div className="font-display text-2xl font-bold text-burgundy dark:text-gold">119,390</div>
              <div className="folio-tag text-[9px] text-stone-500 mt-0.5">Historical Stays</div>
            </div>
            <div className="p-4 rounded-xl luxury-card border border-stone-200/80 dark:border-stone-800 text-center">
              <div className="font-display text-2xl font-bold text-burgundy dark:text-gold">69.48%</div>
              <div className="folio-tag text-[9px] text-stone-500 mt-0.5">Champion F1 Score</div>
            </div>
            <div className="p-4 rounded-xl luxury-card border border-stone-200/80 dark:border-stone-800 text-center">
              <div className="font-display text-2xl font-bold text-burgundy dark:text-gold">Random Forest</div>
              <div className="folio-tag text-[9px] text-stone-500 mt-0.5">Top Architecture</div>
            </div>
            <div className="p-4 rounded-xl luxury-card border border-stone-200/80 dark:border-stone-800 text-center">
              <div className="font-display text-2xl font-bold text-burgundy dark:text-gold">37.04%</div>
              <div className="folio-tag text-[9px] text-stone-500 mt-0.5">Historical Churn</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THREE CORE FEATURE HIGHLIGHTS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 space-y-2">
          <span className="folio-tag text-[10px] text-stone-500 dark:text-stone-400">
            ENGINEERING & OPERATIONAL CAPABILITIES
          </span>
          <h2 className="folio-masthead text-3xl sm:text-4xl font-bold text-burgundy dark:text-ivory">
            Built for Discerning Hospitality Operators
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
            Move away from blunt overbooking heuristics. Leverage supervised learning models trained on 119k+ booking behaviors to protect revenue and guest satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="luxury-card rounded-2xl p-7 relative group hover:border-burgundy dark:hover:border-gold transition-colors space-y-4">
            <div className="folio-tag text-[10px] text-stone-400 dark:text-stone-500">
              PILLAR I · CLASSIFICATION
            </div>
            <h3 className="font-display text-xl font-bold text-burgundy dark:text-ivory">
              Machine Learning Cancellation Prediction
            </h3>
            <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
              Instant classification of booking risk across City and Resort inventory. Evaluate 18 multidimensional guest variables from lead time to deposit arrangement in milliseconds.
            </p>
            <div className="pt-2">
              <Link to="/prediction" className="inline-flex items-center gap-1 text-xs font-semibold text-burgundy dark:text-gold hover:underline">
                <span>Prediction Studio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="luxury-card rounded-2xl p-7 relative group hover:border-burgundy dark:hover:border-gold transition-colors space-y-4">
            <div className="folio-tag text-[10px] text-stone-400 dark:text-stone-500">
              PILLAR II · EMPIRICAL DATA
            </div>
            <h3 className="font-display text-xl font-bold text-burgundy dark:text-ivory">
              Intelligent Booking Analytics
            </h3>
            <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
              Unpack structural demand signals. Discover how non-refundable deposits, online travel agencies, and seasonality dictate guest commitment across property portfolios.
            </p>
            <div className="pt-2">
              <Link to="/analytics" className="inline-flex items-center gap-1 text-xs font-semibold text-burgundy dark:text-gold hover:underline">
                <span>Analytics Workspace</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="luxury-card rounded-2xl p-7 relative group hover:border-burgundy dark:hover:border-gold transition-colors space-y-4">
            <div className="folio-tag text-[10px] text-stone-400 dark:text-stone-500">
              PILLAR III · ACTIONABLE INTERVENTION
            </div>
            <h3 className="font-display text-xl font-bold text-burgundy dark:text-ivory">
              Data-Driven Hotel Decisions
            </h3>
            <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
              Translate predictive probabilities into concrete hospitality operations: targeted concierge re-confirmations, dynamic overbooking buffers, and tailored amenity incentives.
            </p>
            <div className="pt-2">
              <Link to="/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-burgundy dark:text-gold hover:underline">
                <span>Operational Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OPERATIONAL WORKFLOW TIMELINE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200/80 dark:border-stone-800">
        <div className="max-w-2xl mb-10 space-y-1">
          <span className="folio-tag text-[10px] text-stone-500 dark:text-stone-400">
            HOW IT WORKS · 4-STAGE PIPELINE
          </span>
          <h2 className="folio-masthead text-2xl sm:text-3xl font-bold text-burgundy dark:text-ivory">
            From Booking Request to Revenue Protection
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Ingest & Preprocess",
              desc: "Extracts 18 primary reservation attributes and normalizes continuous scales.",
            },
            {
              step: "02",
              title: "Ensemble Evaluation",
              desc: "Applies 100 decorrelated decision trees with verified 69.48% benchmark F1.",
            },
            {
              step: "03",
              title: "Risk Profiling",
              desc: "Classifies cancellation risk and calculates immediate revenue-at-risk.",
            },
            {
              step: "04",
              title: "Operational Action",
              desc: "Issues targeted front-desk playbooks: card re-authorization and overbooking buffers.",
            },
          ].map((item) => (
            <div key={item.step} className="p-6 rounded-2xl luxury-card border border-stone-200/80 dark:border-stone-800 space-y-2">
              <span className="font-mono text-xl font-bold text-gold">{item.step}</span>
              <h4 className="font-serif font-bold text-base text-burgundy dark:text-ivory">
                {item.title}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EXECUTIVE TESTIMONIAL PULL-QUOTE */}
      <section className="py-16 bg-stone-100/70 dark:bg-[#160E12] border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="font-serif text-lg sm:text-2xl text-burgundy dark:text-ivory italic leading-relaxed">
            "STAYWISE AI transformed our revenue management from reactive guessing into a precise science. Identifying long lead-time non-refundable churn early saved us over $180,000 in unfulfilled room nights in our first quarter."
          </p>
          <div className="space-y-0.5">
            <span className="font-display font-bold text-sm text-burgundy dark:text-gold block">
              Julian Montgomery
            </span>
            <span className="folio-tag text-[9px] text-stone-500">
              Director of Revenue Optimization · The Grand Belmond Hotel & Residences
            </span>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="folio-masthead text-3xl sm:text-5xl font-bold text-burgundy dark:text-ivory">
          Protect Your Property's Occupancy Today.
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-sm max-w-xl mx-auto leading-relaxed">
          Start predicting booking cancellations before they happen. Connect your property or explore the historical dataset benchmarks.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/prediction"
            className="px-8 py-3 rounded-lg btn-primary text-xs uppercase tracking-wider font-semibold"
          >
            Predict Booking &rarr;
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-3 rounded-lg btn-secondary text-xs uppercase tracking-wider font-semibold"
          >
            View AI Dashboard
          </Link>
        </div>
      </section>

    </div>
  );
}
