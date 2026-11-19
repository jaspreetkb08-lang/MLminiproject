import React, { useState } from "react";
import MonthlyTrendsChart from "../charts/MonthlyTrendsChart";
import HotelTypeComparisonChart from "../charts/HotelTypeComparisonChart";
import DepositTypeChart from "../charts/DepositTypeChart";
import LeadTimeAnalysisChart from "../charts/LeadTimeAnalysisChart";
import CustomerTypeChart from "../charts/CustomerTypeChart";
import CancellationDistributionChart from "../charts/CancellationDistributionChart";
import MetricCard from "../components/common/MetricCard";
import { DATASET_STATS, CANCELLATION_BY_CUSTOMER_TYPE } from "../data/datasetStats";
import {
  Layers,
  Filter,
  Calendar,
  Building,
  CreditCard,
  Users,
  TrendingDown,
  Clock,
  Compass,
  ArrowUpRight,
  Info,
  RotateCcw,
  Award,
  Database,
  BarChart2,
} from "lucide-react";

export default function AnalyticsPage() {
  // Interactive Filters
  const [hotelFilter, setHotelFilter] = useState("all");
  const [seasonFilter, setSeasonFilter] = useState("all");
  const [customerFilter, setCustomerFilter] = useState("all");
  const [depositFilter, setDepositFilter] = useState("all");

  const resetFilters = () => {
    setHotelFilter("all");
    setSeasonFilter("all");
    setCustomerFilter("all");
    setDepositFilter("all");
  };

  const isFiltered =
    hotelFilter !== "all" ||
    seasonFilter !== "all" ||
    customerFilter !== "all" ||
    depositFilter !== "all";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/90 dark:border-stone-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="folio-tag">FOLIO N° 04 · DESCRIPTIVE ANALYTICS</span>
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              119,390 Empirical Observations
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-burgundy dark:text-ivory">
            Advanced Hospitality Analytics & EDA
          </h1>
          <p className="text-sm font-serif text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
            Multidimensional exploratory analysis from <code className="font-mono text-xs text-burgundy dark:text-gold">hotel_bookings.csv</code> evaluating demand patterns, lead time horizons, and deposit commitment.
          </p>
        </div>

        {/* Filter Indicator / Reset */}
        {isFiltered && (
          <button
            onClick={resetFilters}
            className="px-3 py-1.5 rounded border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 font-mono text-xs flex items-center gap-1.5 self-start md:self-end hover:bg-rose-100"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Active Filters</span>
          </button>
        )}
      </div>

      {/* STRATEGIC RATIO HIGHLIGHTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Avg Lead Time (Cancelled)"
          value="144.8 Days"
          subtitle="Long-horizon cancellations"
          badge="+81% vs Kept"
          badgeType="rose"
          icon={Clock}
        />
        <MetricCard
          title="Avg Lead Time (Fulfilled)"
          value="79.9 Days"
          subtitle="Stays that checked in"
          badge="High Fidelity"
          badgeType="emerald"
          icon={Calendar}
        />
        <MetricCard
          title="City Hotel ADR"
          value="$105.30"
          subtitle="Avg Daily Rate (City)"
          badge="Urban RevPAR"
          badgeType="gold"
          icon={Building}
        />
        <MetricCard
          title="Resort Hotel ADR"
          value="$94.90"
          subtitle="Avg Daily Rate (Resort)"
          badge="Leisure RevPAR"
          badgeType="gold"
          icon={Compass}
        />
      </div>

      {/* FILTER CONTROL BAR */}
      <div className="folio-card p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400">
            <Filter className="w-3.5 h-3.5 text-burgundy dark:text-gold" />
            <span>Multidimensional Dataset Segment Filters</span>
          </div>
          {isFiltered && (
            <span className="text-[11px] font-mono text-burgundy dark:text-gold font-semibold">
              Filter Active
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Hotel Filter */}
          <div>
            <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
              Hotel Type
            </label>
            <select
              value={hotelFilter}
              onChange={(e) => setHotelFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100"
            >
              <option value="all">All Properties (119,390)</option>
              <option value="city">City Hotel (79,330)</option>
              <option value="resort">Resort Hotel (40,060)</option>
            </select>
          </div>

          {/* Season Filter */}
          <div>
            <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
              Season / Range
            </label>
            <select
              value={seasonFilter}
              onChange={(e) => setSeasonFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100"
            >
              <option value="all">Full Annual Range</option>
              <option value="summer">Peak Summer (Jun — Aug)</option>
              <option value="shoulder">Shoulder Season (Sep — Nov)</option>
              <option value="winter">Low Winter (Dec — Feb)</option>
              <option value="spring">Spring Shoulder (Mar — May)</option>
            </select>
          </div>

          {/* Customer Filter */}
          <div>
            <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
              Customer Segment
            </label>
            <select
              value={customerFilter}
              onChange={(e) => setCustomerFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100"
            >
              <option value="all">All Segments (100%)</option>
              <option value="transient">Transient Independent (75.1%)</option>
              <option value="transient-party">Transient-Party (21.0%)</option>
              <option value="contract">Corporate Contract (3.4%)</option>
              <option value="group">Group Blocks (0.5%)</option>
            </select>
          </div>

          {/* Deposit Filter */}
          <div>
            <label className="block text-[11px] font-mono text-stone-600 dark:text-stone-400 mb-1">
              Deposit Terms
            </label>
            <select
              value={depositFilter}
              onChange={(e) => setDepositFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-100"
            >
              <option value="all">All Deposit Policies</option>
              <option value="no-deposit">No Deposit (87.6%)</option>
              <option value="non-refund">Non-Refundable (12.2%)</option>
              <option value="refundable">Refundable (0.2%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* THE FIVE COLAB EDA VISUALIZATIONS SECTION */}
      <div className="space-y-6">
        <div className="border-b border-stone-200/90 dark:border-stone-800 pb-3">
          <span className="folio-tag block mb-1">
            FIG. 08 — FIG. 13 · COMPARATIVE EDA PANELS
          </span>
          <h2 className="font-display text-2xl font-medium text-burgundy dark:text-ivory">
            The Five Project Visualizations
          </h2>
        </div>

        {/* ROW 1: Distribution & Hotel Type */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 folio-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
              <div>
                <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block">
                  FIG. 08 · Cancellation Distribution
                </span>
                <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
                  Hotel Booking Cancellation Distribution
                </h3>
              </div>
              <span className="font-mono text-xs text-stone-600 dark:text-stone-400">119.4k Stays</span>
            </div>
            <CancellationDistributionChart />
            <div className="p-3 rounded border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 text-xs text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
              <strong>Observation:</strong> 75,166 fulfilled (62.96%) vs 44,224 cancelled (37.04%).
            </div>
          </div>

          <div className="lg:col-span-6 folio-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
              <div>
                <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block">
                  FIG. 09 · Hotel Type Segment
                </span>
                <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
                  Booking Cancellation by Hotel Type
                </h3>
              </div>
              <span className="font-mono text-xs text-stone-600 dark:text-stone-400">City vs Resort</span>
            </div>
            <HotelTypeComparisonChart />
            <div className="p-3 rounded border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 text-xs text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
              <strong>Observation:</strong> City Hotels experience 41.73% cancellation vs Resort Hotels at 27.76%.
            </div>
          </div>
        </div>

        {/* ROW 2: Lead Time & Customer Type */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 folio-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
              <div>
                <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block">
                  FIG. 10 · Lead Time Horizon
                </span>
                <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
                  Cancellation vs Lead Time
                </h3>
              </div>
              <span className="font-mono text-xs text-stone-600 dark:text-stone-400">Horizon Impact</span>
            </div>
            <LeadTimeAnalysisChart />
            <div className="p-3 rounded border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 text-xs text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
              <strong>Observation:</strong> Lead time escalates from 12.88% (sub-14d) to 67.66% (365d+).
            </div>
          </div>

          <div className="lg:col-span-6 folio-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
              <div>
                <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block">
                  FIG. 11 · Customer Demographics
                </span>
                <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
                  Booking Cancellation by Customer Type
                </h3>
              </div>
              <span className="font-mono text-xs text-stone-600 dark:text-stone-400">Guest Segment</span>
            </div>
            <CustomerTypeChart />
            <div className="p-3 rounded border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 text-xs text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
              <strong>Observation:</strong> Transient guests exhibit 40.75% cancellation; groups exhibit only 10.23%.
            </div>
          </div>
        </div>

        {/* ROW 3: Deposit Type & Monthly Seasonality */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 folio-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
              <div>
                <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block">
                  FIG. 12 · Financial Policy
                </span>
                <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
                  Booking Cancellation by Deposit Type
                </h3>
              </div>
              <span className="font-mono text-xs text-rose-800 dark:text-rose-400">Non-Refund 99.4%</span>
            </div>
            <DepositTypeChart />
            <div className="p-3 rounded border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 text-xs text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
              <strong>Observation:</strong> Non-refundable bookings exhibit a 99.36% cancellation rate in this dataset.
            </div>
          </div>

          <div className="lg:col-span-6 folio-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
              <div>
                <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 block">
                  FIG. 13 · Temporal Horizon
                </span>
                <h3 className="font-display text-xl font-medium text-burgundy dark:text-ivory">
                  Monthly Seasonality Trends
                </h3>
              </div>
              <span className="font-mono text-xs text-stone-600 dark:text-stone-400">City vs Resort</span>
            </div>
            <MonthlyTrendsChart />
            <div className="p-3 rounded border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 text-xs text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
              <strong>Observation:</strong> Peak cancellation volume occurs in July and August corresponding to European vacation peaks.
            </div>
          </div>
        </div>
      </div>

      {/* STRATEGIC BOOKING PATTERN INSIGHTS */}
      <div className="space-y-4">
        <h3 className="font-display text-2xl font-medium text-burgundy dark:text-ivory">
          Key Strategic Booking Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded folio-card space-y-2">
            <span className="font-mono text-xs text-burgundy dark:text-gold block">
              01 · The Lead Time Horizon
            </span>
            <h4 className="font-display text-lg font-medium text-burgundy dark:text-ivory">
              The 90-Day Cliff
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
              Bookings made more than 90 days in advance cross the 45% cancellation threshold. Implement automated engagement milestones at Day 60 and Day 30 to lock in guests.
            </p>
          </div>

          <div className="p-6 rounded folio-card space-y-2">
            <span className="font-mono text-xs text-burgundy dark:text-gold block">
              02 · Special Request Engagement
            </span>
            <h4 className="font-display text-lg font-medium text-burgundy dark:text-ivory">
              Engagement Protects Stays
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
              Guests who submit special requests cancel at a rate under 20%. Personalized room preparation and proactive amenity outreach reinforce psychological commitment.
            </p>
          </div>

          <div className="p-6 rounded folio-card space-y-2">
            <span className="font-mono text-xs text-burgundy dark:text-gold block">
              03 · Direct Channel Loyalty
            </span>
            <h4 className="font-display text-lg font-medium text-burgundy dark:text-ivory">
              OTA Churn vs Brand Loyalty
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
              Reservations made through direct website or phone channels exhibit significantly higher fulfillment rates than Online Travel Agencies (OTAs), where travelers actively rate-shop.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}