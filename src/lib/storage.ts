import { EventItem, RegionFilter, TrendItem } from "../types";

const STORAGE_KEYS = {
  REGION: "microstock_cal_region",
  FAVORITES: "microstock_cal_favorites",
  THEME: "microstock_cal_theme",
  EVENTS_CACHE: "microstock_cal_events_cache_", // + year_region
  TRENDS_CACHE: "microstock_cal_trends_cache",
};

export function getStoredRegion(): RegionFilter {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.REGION);
    if (val === "ID" || val === "GLOBAL" || val === "BOTH") {
      return val;
    }
  } catch (e) {
    console.error("Storage error:", e);
  }
  return "BOTH"; // Default: Keduanya
}

export function setStoredRegion(region: RegionFilter): void {
  try {
    localStorage.setItem(STORAGE_KEYS.REGION, region);
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export function getStoredFavorites(): string[] {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (val) {
      return JSON.parse(val);
    }
  } catch (e) {
    console.error("Storage error:", e);
  }
  return [];
}

export function toggleFavoriteId(id: string): string[] {
  const current = getStoredFavorites();
  const exists = current.includes(id);
  const updated = exists ? current.filter((item) => item !== id) : [...current, id];
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
  } catch (e) {
    console.error("Storage error:", e);
  }
  return updated;
}

export function getStoredTheme(): "light" | "dark" {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.THEME);
    if (val === "light" || val === "dark") {
      return val;
    }
  } catch (e) {
    console.error("Storage error:", e);
  }
  // Default to light
  return "light";
}

export function setStoredTheme(theme: "light" | "dark"): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (e) {
    console.error("Storage error:", e);
  }
}

// Events Cache with 7 days TTL
export interface CachedEventsData {
  events: EventItem[];
  timestamp: number;
}

export function getCachedEvents(year: number, region: RegionFilter): EventItem[] | null {
  try {
    const key = `${STORAGE_KEYS.EVENTS_CACHE}${year}_${region}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed: CachedEventsData = JSON.parse(raw);
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - parsed.timestamp > SEVEN_DAYS_MS) {
      return null; // Stale cache
    }
    return parsed.events;
  } catch (e) {
    return null;
  }
}

export function setCachedEvents(year: number, region: RegionFilter, events: EventItem[]): void {
  try {
    const key = `${STORAGE_KEYS.EVENTS_CACHE}${year}_${region}`;
    const data: CachedEventsData = {
      events,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

// Trends Cache
export interface CachedTrendsData {
  trends: TrendItem[];
  timestamp: number;
}

export function getCachedTrends(): CachedTrendsData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRENDS_CACHE);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function setCachedTrends(trends: TrendItem[]): void {
  try {
    const data: CachedTrendsData = {
      trends,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.TRENDS_CACHE, JSON.stringify(data));
  } catch (e) {
    console.error("Storage error:", e);
  }
}
