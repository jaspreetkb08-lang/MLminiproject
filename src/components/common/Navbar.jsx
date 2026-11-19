import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { usePredictions } from "../../context/PredictionContext";
import {
  Sun,
  Moon,
  BarChart3,
  Layers,
  History,
  Settings,
  BrainCircuit,
  Menu,
  X,
  ArrowRight,
  Sliders,
} from "lucide-react";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { backendStatus } = usePredictions();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Prediction Studio", path: "/prediction" },
    { label: "Analytics", path: "/analytics" },
    { label: "Model Insights", path: "/model-insights" },
    { label: "History", path: "/history" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-[#150F12]/95 border-b border-stone-200/70 dark:border-stone-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand — Clean Architectural Logotype */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-md bg-burgundy dark:bg-gold text-ivory dark:text-wine flex items-center justify-center font-display font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight text-burgundy dark:text-ivory group-hover:text-gold transition-colors">
                STAYWISE<span className="font-sans font-light text-xs text-stone-400 dark:text-stone-500 ml-1.5 uppercase tracking-widest">AI</span>
              </span>
              <span className="folio-tag text-[8.5px] text-stone-500 dark:text-stone-400 -mt-0.5">
                Hospitality ML Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links — Editorial Typographic Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-1.5 rounded-lg text-xs tracking-wide transition-all duration-150 ${
                    isActive
                      ? "text-burgundy dark:text-ivory font-bold bg-stone-100 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60"
                      : "text-stone-600 dark:text-stone-400 hover:text-burgundy dark:hover:text-ivory hover:bg-stone-50 dark:hover:bg-stone-800/30"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Benchmark Pill */}
            <div
              title="Verified Random Forest F1 Benchmark: 69.48%"
              className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 text-stone-600 dark:text-stone-300"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 align-middle" />
              <span>RF 69.48% F1</span>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:text-burgundy dark:hover:text-ivory hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200/80 dark:border-stone-800 transition-colors"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-gold" />
              ) : (
                <Moon className="w-4 h-4 text-stone-600" />
              )}
            </button>

            {/* Settings Link */}
            <Link
              to="/settings"
              className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:text-burgundy dark:hover:text-ivory hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200/80 dark:border-stone-800 transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>

            {/* Clean Solid Editorial CTA Button */}
            <Link
              to="/prediction"
              className="ml-1 px-4 py-2 rounded-lg btn-primary text-xs font-semibold tracking-wider flex items-center gap-1.5 shadow-sm"
            >
              <span>Predict Booking</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-md text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800"
            >
              {isDark ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4 text-stone-700" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1A1115] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-stone-100 dark:bg-stone-800 text-burgundy dark:text-gold font-bold"
                    : "text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/40"
                }`}
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </Link>
            );
          })}
          <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2">
            <Link
              to="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2 text-xs text-stone-600 dark:text-stone-400 hover:text-burgundy dark:hover:text-ivory"
            >
              System Preferences & Config
            </Link>
            <Link
              to="/prediction"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg btn-primary text-xs font-semibold"
            >
              Predict a Booking
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
