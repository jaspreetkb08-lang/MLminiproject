import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-[#150F12] border-t border-stone-200/80 dark:border-stone-800 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-200/80 dark:border-stone-800">
          
          {/* Brand Info */}
          <div className="space-y-3.5 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-burgundy dark:bg-gold text-ivory dark:text-wine flex items-center justify-center font-display font-bold text-base shadow-sm">
                S
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-burgundy dark:text-ivory">
                STAYWISE<span className="font-sans font-light text-xs text-stone-400 ml-1">AI</span>
              </span>
            </Link>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
              Intelligent hotel booking cancellation prediction platform engineered for modern hospitality management and machine learning research.
            </p>
            <div className="pt-1">
              <span className="folio-tag text-[9px] px-2 py-0.5 rounded border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400">
                RANDOM FOREST BENCHMARK · 69.48% F1
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2.5">
            <h4 className="folio-tag text-[10px] text-stone-900 dark:text-stone-100 font-bold">
              PLATFORM WORKSPACES
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400 font-sans">
              <li>
                <Link to="/dashboard" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  AI Overview Dashboard
                </Link>
              </li>
              <li>
                <Link to="/prediction" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Prediction Studio (18-Param)
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Behavioral Analytics & EDA
                </Link>
              </li>
              <li>
                <Link to="/model-insights" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Algorithm Comparisons
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Prediction Log & Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Machine Learning Specs */}
          <div className="space-y-2.5">
            <h4 className="folio-tag text-[10px] text-stone-900 dark:text-stone-100 font-bold">
              ML METHODOLOGY
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400 font-mono">
              <li className="flex items-center justify-between">
                <span>Evaluated Models</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">3 Algorithms</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Raw Dataset</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">119,390 Rows</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Deduplicated</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">87,396 Rows</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Top Model F1</span>
                <span className="font-semibold text-burgundy dark:text-gold">69.48% (RF)</span>
              </li>
            </ul>
          </div>

          {/* Hospitality Architecture */}
          <div className="space-y-2.5">
            <h4 className="folio-tag text-[10px] text-stone-900 dark:text-stone-100 font-bold">
              SPECIFICATIONS
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
              Calibrated on City and Resort hotel booking records. Built with React, Vite, Tailwind CSS, and Python FastAPI.
            </p>
            <div className="pt-1">
              <Link
                to="/settings"
                className="inline-flex items-center gap-1 text-xs font-mono text-stone-700 dark:text-stone-300 hover:text-burgundy dark:hover:text-gold underline underline-offset-4"
              >
                System Configuration <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500 font-mono">
          <div>
            © {new Date().getFullYear()} STAYWISE AI · FOLIO ISSUE 01 · ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-4">
            <span>City & Resort Hotel Demand Modeling</span>
            <span>·</span>
            <span>Standalone In-App Execution</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
