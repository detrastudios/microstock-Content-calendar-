import React from "react";
import { EventItem, TrendItem } from "../types";
import { Star } from "lucide-react";

interface CalendarGridProps {
  year: number;
  events: EventItem[];
  trends: TrendItem[];
  favoriteIds: string[];
  onSelectDate: (dateStr: string, dateEvents: EventItem[]) => void;
  isLoading: boolean;
  searchQuery?: string;
}

const MONTH_NAMES_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const WEEKDAYS_ID = ["M", "T", "W", "T", "F", "S", "S"]; // Monday start

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  year,
  events,
  trends,
  favoriteIds,
  onSelectDate,
  isLoading,
  searchQuery = "",
}) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  const isSearching = searchQuery.trim().length > 0;

  // Helper to format YYYY-MM-DD
  const formatDateString = (y: number, m: number, d: number) => {
    const monthStr = String(m + 1).padStart(2, "0");
    const dayStr = String(d).padStart(2, "0");
    return `${y}-${monthStr}-${dayStr}`;
  };

  // Helper to check if a date is within an event range
  const getEventsForDate = (dateStr: string) => {
    return events.filter((e) => {
      if (e.date === dateStr) return true;
      if (e.endDate && dateStr >= e.date && dateStr <= e.endDate) return true;
      return false;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {MONTH_NAMES_ID.map((monthName, monthIndex) => {
        // Calculation for month
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const firstDayOfWeek = new Date(year, monthIndex, 1).getDay(); // 0 = Sun
        // Convert to Monday start (0 = Mon, 6 = Sun)
        const mondayOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

        // Check how many events exist in this month
        const monthEventsCount = events.filter((e) => {
          const parts = e.date.split("-");
          return parseInt(parts[1], 10) === monthIndex + 1;
        }).length;

        const hasSearchMatchInMonth = isSearching && monthEventsCount > 0;
        const isDimmedBySearch = isSearching && monthEventsCount === 0;

        return (
          <div
            key={monthIndex}
            className={`bg-white dark:bg-slate-900 rounded-2xl p-4 border transition-all flex flex-col justify-between ${
              hasSearchMatchInMonth
                ? "border-blue-400 dark:border-blue-600 ring-2 ring-blue-500/20 shadow-md"
                : isDimmedBySearch
                ? "border-slate-200/50 dark:border-slate-800/50 opacity-40 hover:opacity-100"
                : "border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-sm"
            }`}
          >
            {/* Month Title */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <span>{monthName}</span>
                <span className="text-xs font-semibold text-slate-400">{year}</span>
              </h3>
              {hasSearchMatchInMonth && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                  {monthEventsCount} event
                </span>
              )}
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {WEEKDAYS_ID.map((day, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase"
                >
                  {day}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center flex-1">
              {/* Offset empty days */}
              {Array.from({ length: mondayOffset }).map((_, i) => (
                <div key={`offset-${i}`} className="h-8 sm:h-9" />
              ))}

              {/* Month Days */}
              {Array.from({ length: daysInMonth }).map((_, dayIdx) => {
                const dayNum = dayIdx + 1;
                const dateStr = formatDateString(year, monthIndex, dayNum);
                const dayEvents = getEventsForDate(dateStr);
                const hasEvents = dayEvents.length > 0;
                const isSearchHit = isSearching && hasEvents;

                const isToday =
                  year === currentYear &&
                  monthIndex === currentMonth &&
                  dayNum === currentDate;

                // Regions on this date
                const hasID = dayEvents.some((e) => e.region === "ID");
                const hasGlobal = dayEvents.some((e) => e.region === "GLOBAL");
                const hasFavorite = dayEvents.some((e) => favoriteIds.includes(e.id));

                return (
                  <button
                    key={dayNum}
                    onClick={() => onSelectDate(dateStr, dayEvents)}
                    className={`h-8 sm:h-9 relative rounded-xl flex flex-col items-center justify-center transition-all text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isSearchHit
                        ? "ring-2 ring-blue-600 dark:ring-blue-400 bg-blue-100 dark:bg-blue-900/70 text-blue-800 dark:text-blue-200 font-black scale-105 shadow-sm z-10 animate-pulse"
                        : hasEvents
                        ? "font-extrabold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 cursor-pointer"
                        : "font-normal text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    } ${
                      isToday && !isSearchHit
                        ? "ring-2 ring-blue-600 dark:ring-blue-400 font-black text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/40"
                        : ""
                    }`}
                    title={
                      hasEvents
                        ? `${dayEvents.map((e) => e.title).join(", ")} (Klik untuk detail)`
                        : dateStr
                    }
                  >
                    {/* Day Number */}
                    <span className="leading-none">{dayNum}</span>

                    {/* Indicators */}
                    {hasEvents && (
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {/* Blue dot = Global */}
                        {hasGlobal && (
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"
                            title="Event Global"
                          />
                        )}
                        {/* Red dot = Indonesia */}
                        {hasID && (
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"
                            title="Event Indonesia"
                          />
                        )}
                        {/* Star icon if favorite */}
                        {hasFavorite && (
                          <Star className="w-2 h-2 fill-amber-400 text-amber-500 shrink-0" />
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
