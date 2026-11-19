import React from "react";

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  badgeType = "gold",
  trend,
  className = "",
}) {
  const badgeColors = {
    gold: "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700",
    burgundy: "bg-burgundy/10 text-burgundy dark:text-rose-light border-burgundy/20",
    emerald: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/25",
    rose: "bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/25",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl p-5 luxury-card border border-stone-200/90 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 transition-colors ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="folio-tag text-[9px] text-stone-500 dark:text-stone-400">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-burgundy dark:text-ivory">
              {value}
            </h3>
            {trend && (
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                {trend}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className="w-9 h-9 rounded-lg bg-stone-50 dark:bg-stone-800/60 flex items-center justify-center text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700/60">
            <Icon className="w-4 h-4 stroke-[1.8]" />
          </div>
        )}
      </div>

      <div className="mt-3.5 pt-2.5 border-t border-stone-200/70 dark:border-stone-800/80 flex items-center justify-between text-xs">
        <span className="text-stone-500 dark:text-stone-400 text-[11px] font-sans">{subtitle}</span>
        {badge && (
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${
              badgeColors[badgeType] || badgeColors.gold
            }`}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
