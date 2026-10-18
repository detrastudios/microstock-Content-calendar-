import { EventItem } from "../types";

// Synonym and alias dictionary for popular Indonesian and Global microstock calendar events
const ALIASES: Record<string, string[]> = {
  ramadan: ["ramadhan", "ramazan", "puasa", "bulan puasa", "iftar", "tarawih", "sahur"],
  "idul fitri": ["lebaran", "eid al-fitr", "eid al fitr", "ied fitri", "hari raya idul fitri", "mudik", "ketupat"],
  "idul adha": ["qurban", "kurban", "eid al-adha", "eid al adha", "ied adha", "haji"],
  "tahun baru imlek": ["imlek", "cny", "chinese new year", "lunar new year", "sincia", "angpao", "barongsai"],
  "tahun baru": ["new year", "tahun baru 2026", "happy new year", "countdown", "malam tahun baru", "terompet"],
  natal: ["christmas", "xmas", "hari raya natal", "santa", "pohon natal", "desember 25"],
  "hari kemerdekaan": ["kemerdekaan", "17 agustus", "tujuh belas agustus", "hut ri", "independence day", "proklamasi", "merdeka"],
  paskah: ["easter", "easter sunday", "telur paskah", "jumat agung", "good friday"],
  nyepi: ["tahun baru saka", "catur brata", "ogoh ogoh", "bali"],
  waisak: ["vesak", "vesak day", "borobudur", "lampion"],
  kartini: ["hari kartini", "kebaya", "emansipasi"],
  "hari ibu": ["mothers day", "mother's day", "hari ibu nasional"],
  "hari guru": ["teachers day", "teacher's day", "pgri"],
  valentine: ["valentines day", "hari kasih sayang", "cokelat", "romantis", "love"],
  halloween: ["spooky", "labu", "pumpkin", "trick or treat", "kostum"],
  "black friday": ["cyber monday", "harbolnas", "belanja", "diskon", "sale", "shopping", "11.11", "12.12"],
  "hari bumi": ["earth day", "lingkungan", "eco", "sustainability", "pohon"],
  isra: ["isra miraj", "isra mi'raj", "rajab"],
  maulid: ["maulid nabi", "mulud", "rabiul awal"],
  pancasila: ["hari lahir pancasila", "1 juni", "garuda"],
  sumpah: ["sumpah pemuda", "28 oktober"],
  pahlawan: ["hari pahlawan", "10 november", "surabaya"],
};

const MONTH_NAMES_MAP: Record<string, number> = {
  januari: 1,
  january: 1,
  jan: 1,
  februari: 2,
  february: 2,
  feb: 2,
  maret: 3,
  march: 3,
  mar: 3,
  april: 4,
  apr: 4,
  mei: 5,
  may: 5,
  juni: 6,
  june: 6,
  jun: 6,
  juli: 7,
  july: 7,
  jul: 7,
  agustus: 8,
  august: 8,
  aug: 8,
  september: 9,
  sep: 9,
  oktober: 10,
  october: 10,
  oct: 10,
  november: 11,
  nov: 11,
  desember: 12,
  december: 12,
  dec: 12,
};

/**
 * Clean & normalize string for search matching:
 * - lowercase
 * - normalize unicode characters
 * - strip apostrophes and special punctuation
 * - remove redundant whitespace
 */
export function normalizeSearchString(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/['’`"]/g, "") // remove apostrophes: mi'raj -> miraj
    .replace(/[^a-z0-9\s]/g, " ") // replace non-alphanumeric with space
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Check if event matches a search query using multi-field, synonym, and month matching
 */
export function matchesSearchQuery(event: EventItem, rawQuery: string): boolean {
  const query = normalizeSearchString(rawQuery);
  if (!query) return true;

  // 1. Build a searchable text representation of the event
  const title = normalizeSearchString(event.title);
  const category = normalizeSearchString(event.category);
  const region = normalizeSearchString(event.region === "ID" ? "indonesia id" : "global internasional");
  const tips = normalizeSearchString(event.tips || "");
  const notes = normalizeSearchString(event.notes || "");
  const visualTheme = normalizeSearchString(event.visualTheme || "");
  const holidayType = normalizeSearchString(event.holidayType || "");
  const uploadWindow = normalizeSearchString(event.uploadWindow?.label || "");
  
  const keywordsEn = (event.keywords?.en || []).map(normalizeSearchString).join(" ");
  const keywordsId = (event.keywords?.id || []).map(normalizeSearchString).join(" ");
  const assetPhoto = (event.assets?.photo || []).map(normalizeSearchString).join(" ");
  const assetVector = (event.assets?.vector || []).map(normalizeSearchString).join(" ");

  // Extract date components
  // Format: "2026-12-25" -> year=2026, month=12, day=25
  const dateParts = event.date.split("-");
  const monthNum = parseInt(dateParts[1], 10);
  const dayNum = parseInt(dateParts[2], 10);
  const dateExact = `${event.date} ${dayNum} ${monthNum}`;

  // Find month names associated with event date
  let eventMonthNames = "";
  for (const [mName, mIdx] of Object.entries(MONTH_NAMES_MAP)) {
    if (mIdx === monthNum) {
      eventMonthNames += ` ${mName}`;
    }
  }

  const combinedSearchTarget = `${title} ${category} ${region} ${dateExact} ${eventMonthNames} ${keywordsId} ${keywordsEn} ${tips} ${notes} ${visualTheme} ${holidayType} ${uploadWindow} ${assetPhoto} ${assetVector}`;

  // Direct substring check
  if (combinedSearchTarget.includes(query)) {
    return true;
  }

  // Token-based matching: all words in query must match something in the target or its aliases
  const queryTokens = query.split(" ").filter((t) => t.length > 0);

  // Check aliases: if query word has aliases, see if any alias is in target or vice versa
  const matchesToken = (token: string): boolean => {
    if (combinedSearchTarget.includes(token)) return true;

    // Check alias dictionary
    for (const [key, aliases] of Object.entries(ALIASES)) {
      const normKey = normalizeSearchString(key);
      const isTokenInAliases = normKey.includes(token) || aliases.some((a) => a.includes(token));
      if (isTokenInAliases) {
        if (combinedSearchTarget.includes(normKey) || aliases.some((a) => combinedSearchTarget.includes(a))) {
          return true;
        }
      }
    }

    // Check month mapping: query token might be month name
    if (MONTH_NAMES_MAP[token] !== undefined) {
      return MONTH_NAMES_MAP[token] === monthNum;
    }

    return false;
  };

  return queryTokens.every((token) => matchesToken(token));
}

/**
 * Format date for search dropdown and cards: e.g. "25 Des 2026"
 */
export function formatDisplayDate(dateStr: string, endDateStr?: string): string {
  try {
    const MONTHS_SHORT = [
      "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
      "Jul", "Agt", "Sep", "Okt", "Nov", "Des"
    ];
    const parts = dateStr.split("-");
    const y = parts[0];
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);

    if (endDateStr && endDateStr !== dateStr) {
      const endParts = endDateStr.split("-");
      const endM = parseInt(endParts[1], 10) - 1;
      const endD = parseInt(endParts[2], 10);
      if (m === endM) {
        return `${d} - ${endD} ${MONTHS_SHORT[m]} ${y}`;
      }
      return `${d} ${MONTHS_SHORT[m]} - ${endD} ${MONTHS_SHORT[endM]} ${y}`;
    }

    return `${d} ${MONTHS_SHORT[m]} ${y}`;
  } catch {
    return dateStr;
  }
}
