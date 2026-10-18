import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Header } from "./components/Header";
import { ControlPanel } from "./components/ControlPanel";
import { TrendingPanel } from "./components/TrendingPanel";
import { YearNavigation } from "./components/YearNavigation";
import { CalendarGrid } from "./components/CalendarGrid";
import { EventDetailModal } from "./components/EventDetailModal";
import { TrendDetailModal } from "./components/TrendDetailModal";
import { DataHealthModal } from "./components/DataHealthModal";
import { Footer } from "./components/Footer";
import { Toast } from "./components/Toast";

import { Category, EventItem, RegionFilter, TrendItem } from "./types";
import { INITIAL_SEED_EVENTS, INITIAL_SEED_TRENDS } from "./data/seedData";
import {
  getStoredRegion,
  setStoredRegion,
  getStoredFavorites,
  toggleFavoriteId,
  getStoredTheme,
  setStoredTheme,
  getCachedEvents,
  setCachedEvents,
  getCachedTrends,
  setCachedTrends,
} from "./lib/storage";
import { saveEventsToDb, getEventsFromDb } from "./lib/indexedDbStorage";
import { matchesSearchQuery, formatDisplayDate } from "./lib/searchUtils";
import { AlertCircle, RefreshCw, Search, ArrowRight, X } from "lucide-react";

const ALL_CATEGORIES: Category[] = [
  "Global",
  "Cultural",
  "Awareness",
  "Fun",
  "Sports",
  "Religious",
  "Commerce",
];

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<"light" | "dark">(getStoredTheme());

  // Region filter state
  const [region, setRegion] = useState<RegionFilter>(getStoredRegion());

  // Search & Category filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(ALL_CATEGORIES);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Year state
  const [selectedYear, setSelectedYear] = useState(2026);

  // Favorites state
  const [favoriteIds, setFavoriteIds] = useState<string[]>(getStoredFavorites());

  // Data states
  const [events, setEvents] = useState<EventItem[]>(INITIAL_SEED_EVENTS);
  const [trends, setTrends] = useState<TrendItem[]>(INITIAL_SEED_TRENDS);

  // Loading & Error states
  const [isEventsLoading, setIsEventsLoading] = useState(false);
  const [isTrendsLoading, setIsTrendsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Cooldown timer for refresh button (30s)
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  // Modal selection states
  const [selectedDateModal, setSelectedDateModal] = useState<{
    dateStr: string;
    events: EventItem[];
  } | null>(null);

  const [selectedTrendModal, setSelectedTrendModal] = useState<TrendItem | null>(null);
  const [isDataHealthOpen, setIsDataHealthOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "info" | "error";
  } | null>(null);

  // Apply Theme Class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setStoredTheme(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const showToastMsg = useCallback((msg: string, type: "success" | "info" | "error" = "info") => {
    setToast({ message: msg, type });
  }, []);

  // Cooldown Countdown Effect
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const interval = setInterval(() => {
      setCooldownSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownSeconds]);

  // Handle Region Change
  const handleRegionChange = (newRegion: RegionFilter) => {
    setRegion(newRegion);
    setStoredRegion(newRegion);
  };

  // Fetch Events from API with Cache Fallback
  const fetchEventsData = useCallback(
    async (year: number, reg: RegionFilter) => {
      setIsEventsLoading(true);
      setErrorMessage(null);

      // Check Local Storage Cache first
      const cached = getCachedEvents(year, reg);
      if (cached && cached.length > 0) {
        setEvents(cached);
      } else {
        // Fallback to IndexedDB
        getEventsFromDb(year, reg).then((dbEvents) => {
          if (dbEvents && dbEvents.length > 0) {
            setEvents(dbEvents);
          }
        });
      }

      try {
        const response = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ year, region: reg }),
        });

        const data = await response.json();
        if (data.success && Array.isArray(data.events)) {
          setEvents(data.events);
          setCachedEvents(year, reg, data.events);
          saveEventsToDb(data.events).catch((e) => console.warn("IndexedDB save error:", e));
        } else {
          console.warn("Failed to fetch fresh events, using current data.");
          setErrorMessage("Gagal memperbarui data event dari server, menampilkan data terakhir.");
        }
      } catch (err: any) {
        console.error("Events fetch error:", err);
        setErrorMessage("Koneksi bermasalah, menampilkan data terakhir.");
      } finally {
        setIsEventsLoading(false);
      }
    },
    []
  );

  // Fetch Trends from API
  const fetchTrendsData = useCallback(
    async (reg: RegionFilter) => {
      setIsTrendsLoading(true);

      // Check Cache first
      const cached = getCachedTrends();
      if (cached && cached.trends.length > 0) {
        setTrends(cached.trends);
        setLastUpdated(new Date(cached.timestamp).toISOString());
      }

      try {
        const response = await fetch("/api/trends", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ region: reg }),
        });

        const data = await response.json();
        if (data.success && Array.isArray(data.trends)) {
          setTrends(data.trends);
          setCachedTrends(data.trends);
          setLastUpdated(data.fetchedAt || new Date().toISOString());
        }
      } catch (err: any) {
        console.error("Trends fetch error:", err);
      } finally {
        setIsTrendsLoading(false);
      }
    },
    []
  );

  // Initial Load & Refetch when Year or Region changes
  useEffect(() => {
    fetchEventsData(selectedYear, region);
    fetchTrendsData(region);
  }, [selectedYear, region, fetchEventsData, fetchTrendsData]);

  // Manual Refresh Handler with 30s Cooldown
  const handleManualRefresh = () => {
    if (cooldownSeconds > 0) return;
    setCooldownSeconds(30);
    showToastMsg("Memperbarui data event dan tren viral...", "info");
    fetchEventsData(selectedYear, region);
    fetchTrendsData(region);
  };

  // Toggle Favorite Action
  const handleToggleFavorite = (id: string) => {
    const updated = toggleFavoriteId(id);
    setFavoriteIds(updated);
    const isNowFav = updated.includes(id);
    showToastMsg(
      isNowFav ? "Ditambahkan ke Favorit" : "Dihapus dari Favorit",
      isNowFav ? "success" : "info"
    );
  };

  // Filter Categories Toggles
  const handleToggleCategory = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSelectAllCategories = () => {
    if (selectedCategories.length === ALL_CATEGORIES.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(ALL_CATEGORIES);
    }
  };

  // Filtered Events Calculation using intelligent search matching
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      // 1. Region Filter
      if (region === "ID" && e.region !== "ID") return false;
      if (region === "GLOBAL" && e.region !== "GLOBAL") return false;

      // 2. Category Filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(e.category)) {
        return false;
      }

      // 3. Favorites Only Filter
      if (showFavoritesOnly && !favoriteIds.includes(e.id)) {
        return false;
      }

      // 4. Search Query Filter (Title, Category, Keywords, Aliases, Month)
      if (searchQuery.trim()) {
        if (!matchesSearchQuery(e, searchQuery)) {
          return false;
        }
      }

      return true;
    });
  }, [events, region, selectedCategories, showFavoritesOnly, favoriteIds, searchQuery]);

  // All events matching the query across all categories and regions
  const allSearchMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return events.filter((e) => matchesSearchQuery(e, searchQuery));
  }, [events, searchQuery]);

  const otherMatchesCount = Math.max(0, allSearchMatches.length - filteredEvents.length);

  // Reset filters handler
  const handleResetFilters = () => {
    setSelectedCategories(ALL_CATEGORIES);
    setRegion("BOTH");
    setShowFavoritesOnly(false);
    showToastMsg("Filter wilayah & kategori direset ke Semua", "info");
  };

  // Open event detail directly from search
  const handleOpenEventDetail = (evt: EventItem) => {
    setSelectedDateModal({ dateStr: evt.date, events: [evt] });
  };

  // Date Click Handler
  const handleSelectDate = (dateStr: string, dateEvents: EventItem[]) => {
    // Filter dateEvents according to currently active filters (region, categories, search, etc.)
    const activeFiltered = dateEvents.filter((e) => filteredEvents.some((fe) => fe.id === e.id));
    setSelectedDateModal({ dateStr, events: activeFiltered });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        filteredEvents={filteredEvents}
        filteredTrends={trends}
        onShowToast={showToastMsg}
        onOpenDataHealth={() => setIsDataHealthOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Error Banner if API fails */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-3 text-xs sm:text-sm text-amber-800 dark:text-amber-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={handleManualRefresh}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 font-bold hover:bg-amber-300 transition-colors shrink-0 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Coba Lagi</span>
            </button>
          </div>
        )}

        {/* Control Panel */}
        <ControlPanel
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          onSelectAllCategories={handleSelectAllCategories}
          region={region}
          onRegionChange={handleRegionChange}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
          totalFilteredCount={filteredEvents.length}
          totalFavoritesCount={favoriteIds.length}
          matchingEvents={filteredEvents}
          otherMatchesCount={otherMatchesCount}
          onSelectEvent={handleOpenEventDetail}
          onResetFilters={handleResetFilters}
        />

        {/* Dedicated Search Results Banner / Shelf when searching */}
        {searchQuery.trim().length > 0 && (
          <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/70 rounded-2xl p-4 sm:p-5 space-y-3.5 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="p-1.5 rounded-lg bg-blue-600 text-white shrink-0">
                  <Search className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Hasil Pencarian Event: &ldquo;{searchQuery}&rdquo;
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-200/80 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {filteredEvents.length} event ditemukan
                </span>
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer self-start sm:self-auto"
              >
                <X className="w-3.5 h-3.5" />
                <span>Hapus Pencarian</span>
              </button>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {filteredEvents.map((evt) => (
                  <button
                    key={evt.id}
                    onClick={() => handleOpenEventDetail(evt)}
                    className="flex items-start justify-between p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all text-left group cursor-pointer"
                  >
                    <div className="space-y-1 pr-2 min-w-0">
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
                      <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {evt.title}
                      </p>
                      {evt.uploadWindow && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          🎯 Upload: {evt.uploadWindow.label}
                        </p>
                      )}
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white text-slate-400 transition-colors shrink-0 mt-0.5">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 text-center space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Tidak ditemukan event yang cocok dengan &ldquo;{searchQuery}&rdquo; dengan filter kategori dan wilayah saat ini.
                </p>
                {otherMatchesCount > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      Ada {otherMatchesCount} event cocok yang tersembunyi oleh filter wilayah/kategori saat ini.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Buka Filter (Tampilkan Semua {otherMatchesCount} Event)
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-slate-500">
                    <span>Saran pencarian:</span>
                    {["Ramadan", "Idul Fitri", "Natal", "Halloween", "Imlek", "HUT RI"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900 dark:hover:text-blue-300 font-medium transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Trending Panel */}
        <TrendingPanel
          trends={trends}
          isLoading={isTrendsLoading}
          onRefresh={handleManualRefresh}
          lastUpdated={lastUpdated}
          regionFilter={region}
          onSelectTrend={(trend) => setSelectedTrendModal(trend)}
          cooldownSeconds={cooldownSeconds}
        />

        {/* Year Navigation */}
        <YearNavigation
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />

        {/* Calendar Grid 12 Months */}
        <CalendarGrid
          year={selectedYear}
          events={filteredEvents}
          trends={trends}
          favoriteIds={favoriteIds}
          onSelectDate={handleSelectDate}
          isLoading={isEventsLoading}
          searchQuery={searchQuery}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Event Detail Modal */}
      {selectedDateModal && (
        <EventDetailModal
          dateStr={selectedDateModal.dateStr}
          events={selectedDateModal.events}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setSelectedDateModal(null)}
          onShowToast={showToastMsg}
        />
      )}

      {/* Trend Detail Modal */}
      {selectedTrendModal && (
        <TrendDetailModal
          trend={selectedTrendModal}
          onClose={() => setSelectedTrendModal(null)}
          onShowToast={showToastMsg}
        />
      )}

      {/* Data Health Modal */}
      <DataHealthModal
        isOpen={isDataHealthOpen}
        onClose={() => setIsDataHealthOpen(false)}
        selectedYear={selectedYear}
        currentEvents={events}
        onRefreshYear={() => {
          showToastMsg(`Memperbarui data tahun ${selectedYear}...`, "info");
          fetchEventsData(selectedYear, region);
        }}
        isRefreshing={isEventsLoading}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
