export type Region = "ID" | "GLOBAL" | "BOTH";
export type RegionFilter = "ID" | "GLOBAL" | "BOTH";

export type VerificationLevel = "official" | "verified" | "rule" | "estimated" | "ai-found" | "calculated";
export type HolidayType = "libur-nasional" | "cuti-bersama" | "hari-besar" | "observance";

export type Category = 
  | "Global" 
  | "Cultural" 
  | "Awareness" 
  | "Fun" 
  | "Sports" 
  | "Religious" 
  | "Commerce";

export interface UploadWindow {
  startMonth: string;
  endMonth: string;
  label: string;
}

export interface AssetSuggestions {
  photo: string[];
  vector: string[];
  video: string[];
}

export interface ColorChip {
  name: string;
  hex: string;
}

export interface KeywordList {
  en: string[];
  id?: string[];
}

export interface SourceLink {
  title: string;
  url: string;
}

export interface DateAlt {
  label: string;
  date: string;
  source: string;
}

export interface EventItem {
  id: string;                 // slug unik, mis. "halloween-2026"
  eventKey?: string;          // slug tetap lintas tahun, mis. "idul-fitri", "thanksgiving"
  verification?: VerificationLevel;
  title: string;
  date: string;               // YYYY-MM-DD (tanggal mulai)
  endDate?: string;           // untuk event multi-hari (mis. Ramadan)
  dateAlt?: DateAlt[];        // tanggal alternatif (mis. versi Muhammadiyah vs Kemenag)
  holidayType?: HolidayType;
  region: Region;
  category: Category;
  uploadWindow?: UploadWindow;
  assets?: AssetSuggestions;
  palette?: ColorChip[];
  keywords?: KeywordList;
  tips?: string;
  ipNote?: string;
  uploadStatus?: "INFO" | "HINDARI" | "EVERGREEN" | "LEWAT" | "MEPET" | "NOW";
  priority?: "Tinggi" | "Sedang" | "Rendah";
  visualTheme?: string;
  notes?: string;
  deadlineInfo?: {
    batasUpload3Bln?: string;
    idealUpload4Bln?: string;
    sisaHari?: number;
    sampai?: string;
  };
  sources?: SourceLink[];
  verifiedAt?: string;         // ISO timestamp
}

export interface SeasonalRange {
  id: string;
  eventKey: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  region: Region;
  category: Category;
  description: string;
}

export interface TrendItem {
  id: string;
  title: string;
  region: Region;
  whyTrending: string;        // 1-2 kalimat
  status: "Hot" | "Rising" | "Fading";
  peakWindow: string;         // estimasi puncak, mis. "7-14 hari ke depan"
  assets: AssetSuggestions;
  palette: ColorChip[];
  keywords: KeywordList;
  tips?: string;
  ipNote: string;             // wajib: nama orang/merek/film/tim spesifik = risiko IP, sarankan tema generik
  sources: SourceLink[];
  fetchedAt: string;
}

export interface FilterState {
  searchQuery: string;
  categories: Category[];
  region: RegionFilter;
  showFavoritesOnly: boolean;
  selectedYear: number;
}

