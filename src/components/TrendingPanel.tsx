import React, { useState, useEffect } from "react";
import { Flame, RefreshCw, ChevronDown, ChevronUp, Clock, Sparkles, AlertCircle } from "lucide-react";
import { TrendItem, RegionFilter } from "../types";

interface TrendingPanelProps {
  trends: TrendItem[];
  isLoading: boolean;
  onRefresh: () => void;
  lastUpdated: string | null;
  regionFilter: RegionFilter;
  onSelectTrend: (trend: TrendItem) => void;
  cooldownSeconds: number;
}

export const TrendingPanel: React.FC<TrendingPanelProps> = ({
  trends,
  isLoading,
  onRefresh,
  lastUpdated,
  regionFilter,
  onSelectTrend,
  cooldownSeconds,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Filter trends based on region
  const filteredTrends = trends.filter((trend) => {
    if (regionFilter === "BOTH") return true;
    return trend.region === regionFilter;
  });

  const formatTimestamp = (ts: string | null) => {
    if (!ts) return "Baru saja";
    try {
      const date = new Date(ts);
      return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return ts;
    }
  };

  return (
    <section className="w-full bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 dark:from-amber-950/30 dark:via-orange-950/30 dark:to-rose-950/30 rounded-2xl p-4 sm:p-5 border border-orange-200/80 dark:border-orange-900/50 shadow-sm transition-all space-y-3">
      {/* Panel Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/30">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Trending Sekarang
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                Adobe Stock & Etsy Grounded
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Riset tren visual 7-14 hari terakhir dari Adobe Stock, Etsy, dan Google Trends untuk aset microstock laris
            </p>
          </div>
        </div>

        {/* Right Info & Actions */}
        <div className="flex items-center gap-3">
          {/* Timestamp Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 dark:bg-slate-800/80 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Terakhir diperbarui: {formatTimestamp(lastUpdated)}</span>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isLoading || cooldownSeconds > 0}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500"
            title={cooldownSeconds > 0 ? `Tunggu ${cooldownSeconds} detik` : "Refresh data tren"}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-orange-500 ${isLoading ? "animate-spin" : ""}`} />
            <span>
              {isLoading
                ? "Memuat..."
                : cooldownSeconds > 0
                ? `${cooldownSeconds}s`
                : "Refresh"}
            </span>
          </button>

          {/* Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
            aria-label={isCollapsed ? "Buka panel tren" : "Lipat panel tren"}
          >
            {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Content Horizontal Scroll */}
      {!isCollapsed && (
        <div className="pt-1">
          {isLoading ? (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="min-w-[280px] max-w-[320px] bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 animate-pulse space-y-3 shrink-0"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16" />
                  </div>
                  <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                  <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                </div>
              ))}
            </div>
          ) : filteredTrends.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              Tidak ada tren aktif untuk wilayah ini. Tekan tombol Refresh untuk mencari tren terkini.
            </div>
          ) : (
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 pt-1 scrollbar-thin scroll-smooth">
              {filteredTrends.map((trend) => {
                const statusColors = {
                  Hot: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
                  Rising: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
                  Fading: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
                };

                return (
                  <div
                    key={trend.id}
                    onClick={() => onSelectTrend(trend)}
                    className="min-w-[270px] sm:min-w-[310px] max-w-[320px] bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0 flex flex-col justify-between group"
                  >
                    <div className="space-y-2.5">
                      {/* Status + Region Header */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              statusColors[trend.status] || statusColors.Hot
                            }`}
                          >
                            🔥 {trend.status}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {trend.peakWindow}
                          </span>
                        </div>

                        <span className="text-sm font-semibold">
                          {trend.region === "ID" ? "🇮🇩" : "🌍"}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                        {trend.title}
                      </h3>

                      {/* Why Trending */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {trend.whyTrending}
                      </p>
                    </div>

                    {/* Bottom palette preview & keyword chips */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {trend.palette.slice(0, 4).map((c, idx) => (
                          <span
                            key={idx}
                            className="w-3.5 h-3.5 rounded-full border border-slate-200 dark:border-slate-600 shadow-2xs"
                            style={{ backgroundColor: c.hex }}
                            title={`${c.name} (${c.hex})`}
                          />
                        ))}
                      </div>

                      <span className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 group-hover:underline">
                        Lihat Ide Aset &rarr;
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
