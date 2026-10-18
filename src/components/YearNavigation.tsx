import React from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface YearNavigationProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const AVAILABLE_YEARS = [2025, 2026, 2027, 2028, 2029, 2030];

export const YearNavigation: React.FC<YearNavigationProps> = ({
  selectedYear,
  onYearChange,
}) => {
  const minYear = 2025;
  const maxYear = 2030;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-2 px-1">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Kalender Content {selectedYear}
          </h2>
          <p className="text-xs text-slate-5-0 dark:text-slate-400">
            {selectedYear === 2026 || selectedYear === 2027
              ? "SKB 3 Menteri Resmi & Event Global"
              : "Rule Engine & Estimasi Resmi"}
          </p>
        </div>
      </div>

      {/* Year Selector Pills & Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
          {AVAILABLE_YEARS.map((y) => (
            <button
              key={y}
              onClick={() => onYearChange(y)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                selectedYear === y
                  ? "bg-indigo-600 text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
              }`}
            >
              {y}
            </button>
          ))}
        </div>

        <div className="inline-flex items-center bg-white dark:bg-slate-900 rounded-2xl p-1 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <button
            onClick={() => onYearChange(Math.max(minYear, selectedYear - 1))}
            disabled={selectedYear <= minYear}
            className="p-1.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
            aria-label="Tahun sebelumnya"
            title="Tahun sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="px-3 text-base font-bold text-slate-900 dark:text-white tracking-wide">
            {selectedYear}
          </span>

          <button
            onClick={() => onYearChange(Math.min(maxYear, selectedYear + 1))}
            disabled={selectedYear >= maxYear}
            className="p-1.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
            aria-label="Tahun berikutnya"
            title="Tahun berikutnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

