import React, { useState } from "react";
import { Sun, Moon, Download, Calendar, Sparkles, FileText, FileCode, Settings } from "lucide-react";
import { EventItem, TrendItem } from "../types";
import { exportToCSV, exportToJSON } from "../lib/exportUtils";

interface HeaderProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  filteredEvents: EventItem[];
  filteredTrends: TrendItem[];
  onShowToast: (msg: string, type?: "success" | "info" | "error") => void;
  onOpenDataHealth?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  filteredEvents,
  filteredTrends,
  onShowToast,
  onOpenDataHealth,
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExportCSV = () => {
    if (filteredEvents.length === 0) {
      onShowToast("Tidak ada data event untuk diekspor", "error");
      return;
    }
    exportToCSV(filteredEvents);
    onShowToast(`Berhasil mengunduh ${filteredEvents.length} event ke CSV`, "success");
    setShowExportMenu(false);
  };

  const handleExportJSON = () => {
    exportToJSON(filteredEvents, filteredTrends);
    onShowToast(`Berhasil mengunduh data terfilter ke JSON`, "success");
    setShowExportMenu(false);
  };

  return (
    <header className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Title & Subtitle */}
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-2xl shadow-md shadow-blue-500/20 shrink-0 mt-0.5">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Microstock Content Calendar
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60">
                <Sparkles className="w-3 h-3 text-blue-500" />
                3-Layer Engine
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Panduan visual tahunan untuk merencanakan aset digital
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 self-end sm:self-center">
          {/* Data Health Button */}
          {onOpenDataHealth && (
            <button
              onClick={onOpenDataHealth}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Kesehatan Data (Data Health & Test Suite)"
              aria-label="Kesehatan Data"
            >
              <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="hidden sm:inline">Kesehatan Data</span>
            </button>
          )}

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Ekspor data terfilter"
              aria-label="Ekspor data"
            >
              <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Ekspor</span>
            </button>

            {showExportMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowExportMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-20 text-xs sm:text-sm">
                  <button
                    onClick={handleExportCSV}
                    className="w-full text-left px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2.5 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-emerald-500" />
                    <span>Ekspor CSV ({filteredEvents.length} event)</span>
                  </button>
                  <button
                    onClick={handleExportJSON}
                    className="w-full text-left px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2.5 transition-colors"
                  >
                    <FileCode className="w-4 h-4 text-blue-500" />
                    <span>Ekspor JSON Lengkap</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={theme === "light" ? "Ganti ke Dark Mode" : "Ganti ke Light Mode"}
            title={theme === "light" ? "Ganti ke Dark Mode" : "Ganti ke Light Mode"}
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-slate-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

