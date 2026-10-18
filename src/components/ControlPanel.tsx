import React, { useState, useRef, useEffect } from "react";
import { Search, Star, Filter, Globe, Flag, Layers, X, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { Category, EventItem, RegionFilter } from "../types";
import { formatDisplayDate } from "../lib/searchUtils";

interface ControlPanelProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategories: Category[];
  onToggleCategory: (cat: Category) => void;
  onSelectAllCategories: () => void;
  region: RegionFilter;
  onRegionChange: (reg: RegionFilter) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  totalFilteredCount: number;
  totalFavoritesCount: number;
  matchingEvents?: EventItem[];
  otherMatchesCount?: number;
  onSelectEvent?: (event: EventItem) => void;
  onResetFilters?: () => void;
}

const POPULAR_SEARCH_TERMS = [
  "Ramadan",
  "Idul Fitri",
  "Natal",
  "Halloween",
  "Imlek",
  "Hari Kemerdekaan",
  "Tahun Baru",
  "Black Friday",
];

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "Global", label: "Global" },
  { id: "Cultural", label: "Cultural" },
  { id: "Awareness", label: "Awareness" },
  { id: "Fun", label: "Fun" },
  { id: "Sports", label: "Sports" },
  { id: "Religious", label: "Religious" },
  { id: "Commerce", label: "Commerce/Shopping" },
];

export const ControlPanel: React.FC<ControlPanelProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onToggleCategory,
  onSelectAllCategories,
  region,
  onRegionChange,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  totalFilteredCount,
  totalFavoritesCount,
  matchingEvents = [],
  otherMatchesCount = 0,
  onSelectEvent,
  onResetFilters,
}) => {
  const isAllCategoriesSelected = selectedCategories.length === CATEGORIES.length;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSearchResult = (event: EventItem) => {
    if (onSelectEvent) {
      onSelectEvent(event);
    }
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsDropdownOpen(false);
    } else if (e.key === "Enter" && matchingEvents.length > 0) {
      handleSelectSearchResult(matchingEvents[0]);
    }
  };

  return (
    <section className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 transition-all space-y-4">
      {/* Top Row: Search bar & Region Segmented Control */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search Bar with Live Dropdown */}
        <div className="md:col-span-6 relative" ref={searchContainerRef}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Cari event (mis. Natal, Hari Kemerdekaan, Ramadan, Imlek)..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700/80 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  onSearchChange("");
                  setIsDropdownOpen(false);
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Bersihkan pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete / Instant Results Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
              {searchQuery.trim().length > 0 ? (
                <div className="p-2 space-y-1">
                  <div className="px-3 py-1.5 flex items-center justify-between text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    <span>Hasil Pencarian ({matchingEvents.length})</span>
                    <span className="text-[10px] font-normal normal-case text-slate-400">Tekan Enter untuk event pertama</span>
                  </div>

                  {matchingEvents.length > 0 ? (
                    <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
                      {matchingEvents.slice(0, 6).map((evt) => (
                        <button
                          key={evt.id}
                          type="button"
                          onClick={() => handleSelectSearchResult(evt)}
                          className="w-full p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/50 flex items-center justify-between gap-3 text-left transition-colors group cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-900/60"
                        >
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                                {formatDisplayDate(evt.date, evt.endDate)}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                {evt.region === "ID" ? "🇮🇩 ID" : "🌐 Global"}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                                {evt.category}
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                              {evt.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <span>Detail</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center space-y-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Tidak ditemukan event dengan kata kunci &ldquo;{searchQuery}&rdquo; pada filter saat ini.
                      </p>
                      {otherMatchesCount > 0 && onResetFilters && (
                        <button
                          type="button"
                          onClick={() => {
                            onResetFilters();
                            setIsDropdownOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                        >
                          Tampilkan {otherMatchesCount} event di luar filter wilayah/kategori
                        </button>
                      )}
                    </div>
                  )}

                  {otherMatchesCount > 0 && onResetFilters && matchingEvents.length > 0 && (
                    <div className="p-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                      <span className="text-slate-500 dark:text-slate-400">
                        Ada {otherMatchesCount} event lain di luar filter aktif
                      </span>
                      <button
                        type="button"
                        onClick={onResetFilters}
                        className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Reset Filter
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    <span>Pencarian Cepat Populer:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_SEARCH_TERMS.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          onSearchChange(term);
                          setIsDropdownOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Region Segmented Control */}
        <div className="md:col-span-6 flex flex-wrap items-center justify-between sm:justify-end gap-3">
          {/* Segmented Control */}
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm font-medium w-full sm:w-auto">
            <button
              onClick={() => onRegionChange("ID")}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                region === "ID"
                  ? "bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <span className="text-base leading-none">🇮🇩</span>
              <span>Indonesia</span>
            </button>

            <button
              onClick={() => onRegionChange("GLOBAL")}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                region === "GLOBAL"
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>Global</span>
            </button>

            <button
              onClick={() => onRegionChange("BOTH")}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                region === "BOTH"
                  ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-purple-500" />
              <span>Keduanya</span>
            </button>
          </div>

          {/* Toggle Favorites Only */}
          <button
            onClick={onToggleFavoritesOnly}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
              showFavoritesOnly
                ? "bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 font-semibold"
                : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80"
            }`}
          >
            <Star
              className={`w-4 h-4 ${
                showFavoritesOnly
                  ? "fill-amber-400 text-amber-500"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            />
            <span>Favorit</span>
            {totalFavoritesCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                {totalFavoritesCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Categories Checkboxes / Pills */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>Kategori:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 flex-1">
          <button
            onClick={onSelectAllCategories}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
              isAllCategoriesSelected
                ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100 font-semibold"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
            }`}
          >
            Semua
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategories.includes(cat.id);
            return (
              <label
                key={cat.id}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer select-none transition-all ${
                  isSelected
                    ? "bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-semibold"
                    : "bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/80"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleCategory(cat.id)}
                  className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <span>{cat.label}</span>
              </label>
            );
          })}
        </div>

        {/* Counter badge */}
        <div className="text-xs text-slate-400 dark:text-slate-500 shrink-0 self-end sm:self-center font-medium">
          {totalFilteredCount} event ditemukan
        </div>
      </div>
    </section>
  );
};
