import { EventItem, RegionFilter, VerificationLevel } from "../types";
import { getLayer1RulesForYear } from "./layer1Rules";
import { getLayer2OfficialEventsForYear } from "./layer2Official";
import { SPREADSHEET_EVENTS_2026_2027 } from "./spreadsheetEvents";
import { getDetailedAssetRecommendation } from "./eventAssetRepository";

export function enrichEventAssets(item: EventItem): EventItem {
  const rec = getDetailedAssetRecommendation(item.eventKey || item.id || "", item.title || "", item.category || "Global");
  
  const isGenericPhoto = !item.assets?.photo || item.assets.photo.length <= 1 || item.assets.photo.some(p => p.includes("Foto bertema") || p.includes("Foto kegiatan") || p.includes("Foto transaksi"));
  const isGenericVector = !item.assets?.vector || item.assets.vector.length <= 1 || item.assets.vector.some(v => v.includes("Vektor &") || v.includes("Template poster"));
  const isGenericVideo = !item.assets?.video || item.assets.video.length <= 1 || item.assets.video.some(v => v.includes("Motion graphics"));

  const photo = isGenericPhoto ? rec.photo : (item.assets?.photo || rec.photo);
  const vector = isGenericVector ? rec.vector : (item.assets?.vector || rec.vector);
  const video = isGenericVideo ? rec.video : (item.assets?.video || rec.video);
  const palette = (item.palette && item.palette.length >= 3) ? item.palette : (rec.palette || item.palette || []);
  const keywords = (item.keywords?.en && item.keywords.en.length >= 4) ? item.keywords : (rec.keywords || item.keywords || { en: [], id: [] });
  const tips = (item.tips && item.tips.length > 35) ? item.tips : (rec.tips || item.tips || "");
  const ipNote = (item.ipNote && item.ipNote.length > 15) ? item.ipNote : (rec.ipNote || item.ipNote || "");
  const visualTheme = item.visualTheme || rec.visualTheme;

  return {
    ...item,
    assets: { photo, vector, video },
    palette,
    keywords,
    tips,
    ipNote,
    visualTheme
  };
}

export interface DataHealthSummary {
  year: number;
  totalEvents: number;
  verificationBreakdown: Record<VerificationLevel, number>;
  monthlyCounts: {
    month: number;
    monthName: string;
    globalCount: number;
    idCount: number;
    meetsTarget: boolean;
  }[];
  isAllTargetsMet: boolean;
  warnings: string[];
  lastVerifiedAt: string;
}

function getCanonicalConcept(e: EventItem): string {
  const t = `${e.eventKey || ""} ${e.id || ""} ${e.title || ""}`.toLowerCase();

  if (t.includes("tahun-baru-masehi") || t.includes("new-year") || t.includes("tahun-baru-2027") || t.includes("tahun-baru-2026")) {
    if (t.includes("imlek") || t.includes("chinese") || t.includes("lunar")) return "imlek";
    if (t.includes("islam") || t.includes("hijriah") || t.includes("muharram")) return "tahun-baru-islam";
    return "tahun-baru-masehi";
  }
  if (t.includes("imlek") || t.includes("chinese-new-year") || t.includes("lunar-new-year")) return "imlek";
  if (t.includes("isra-miraj") || t.includes("isra-mikraj")) return `isra-mikraj_${e.date}`;
  if (t.includes("idul-fitri") || t.includes("eid-al-fitr") || t.includes("lebaran")) return `idul-fitri_${e.date}`;
  if (t.includes("idul-adha") || t.includes("eid-al-adha")) return `idul-adha_${e.date}`;
  if (t.includes("ramadan") || t.includes("ramadhan") || t.includes("puasa")) return `ramadan_${e.date ? e.date.substring(0, 7) : ""}`;
  if (t.includes("nyepi")) return `nyepi_${e.date}`;
  if (t.includes("waisak")) return `waisak_${e.date}`;
  if (t.includes("natal") || t.includes("christmas")) {
    if (t.includes("cuti")) return `cuti-natal_${e.date}`;
    if (t.includes("eve")) return `christmas-eve_${e.date}`;
    return `hari-natal_${e.date}`;
  }
  if (t.includes("paskah") || t.includes("easter")) return `paskah_${e.date}`;
  if (t.includes("wafat") || t.includes("jumat-agung") || t.includes("good-friday")) return `wafat-yesus_${e.date}`;
  if (t.includes("buruh") || t.includes("may-day") || t.includes("labour-day")) return `hari-buruh_${e.date}`;
  if (t.includes("pancasila")) return `hari-pancasila_${e.date}`;
  if (t.includes("kemerdekaan") || t.includes("hut-ri") || t.includes("independence")) return `kemerdekaan_${e.date}`;
  if (t.includes("maulid")) return `maulid-nabi_${e.date}`;
  if (t.includes("batik")) return `hari-batik_${e.date}`;
  if (t.includes("santri")) return `hari-santri_${e.date}`;
  if (t.includes("sumpah-pemuda")) return `sumpah-pemuda_${e.date}`;
  if (t.includes("pahlawan")) return `hari-pahlawan_${e.date}`;
  if (t.includes("guru")) {
    if (t.includes("sedunia") || t.includes("world")) return `hari-guru-sedunia_${e.date}`;
    return `hari-guru-nasional_${e.date}`;
  }
  if (t.includes("kopi") || t.includes("coffee")) return `hari-kopi_${e.date}`;
  if (t.includes("jantung") || t.includes("heart")) return `hari-jantung_${e.date}`;
  if (t.includes("1010") || t.includes("10-10") || t.includes("10.10")) return `1010-sale_${e.date}`;
  if (t.includes("1111") || t.includes("11-11") || t.includes("11.11") || t.includes("singles-day")) return `1111-sale_${e.date}`;
  if (t.includes("1212") || t.includes("12-12") || t.includes("12.12") || t.includes("harbolnas")) return `1212-sale_${e.date}`;
  if (t.includes("payday") || t.includes("gajian")) return `payday-sale_${e.date}`;
  if (t.includes("halloween")) return `halloween_${e.date}`;
  if (t.includes("thanksgiving")) return `thanksgiving_${e.date}`;
  if (t.includes("black-friday")) return `black-friday_${e.date}`;
  if (t.includes("cyber-monday")) return `cyber-monday_${e.date}`;
  if (t.includes("disabilitas") || t.includes("disabilities")) return `disabilitas_${e.date}`;
  if (t.includes("women") || t.includes("perempuan")) return `womens-day_${e.date}`;

  const slug = (e.eventKey || e.id || e.title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-");
  return `${slug}_${e.date}`;
}

function makeDedupeKey(e: EventItem): string {
  const y = e.date ? e.date.substring(0, 4) : "2026";
  const concept = getCanonicalConcept(e);
  return `${concept}_${y}`;
}

export function buildUnifiedEventsForYear(year: number, regionFilter: RegionFilter, aiEvents: EventItem[] = []): EventItem[] {
  const map = new Map<string, EventItem>();

  // Priority 1: L2 Official / Verified Dataset
  const l2Events = getLayer2OfficialEventsForYear(year);
  for (const item of l2Events) {
    const key = makeDedupeKey(item);
    map.set(key, item);
  }

  // Priority 2: L1 Rule Engine (Deterministic)
  const l1Events = getLayer1RulesForYear(year);
  for (const item of l1Events) {
    const key = makeDedupeKey(item);
    if (!map.has(key)) {
      map.set(key, item);
    }
  }

  // Priority 3: Curated Microstock Calendar Spreadsheet Data (Overrides or adds rich stock metadata)
  for (const item of SPREADSHEET_EVENTS_2026_2027) {
    if (!item.date || !item.date.startsWith(String(year))) continue;
    const key = makeDedupeKey(item);
    const existing = map.get(key);
    if (existing) {
      map.set(key, {
        ...existing,
        ...item,
        // preserve verification if existing is official
        verification: existing.verification === "official" ? "official" : item.verification || existing.verification,
      });
    } else {
      map.set(key, item);
    }
  }

  // Priority 4: L3 AI Findings (Must have valid source link & valid date)
  for (const item of aiEvents) {
    if (!item.date || isNaN(Date.parse(item.date))) continue;
    if (!item.sources || item.sources.length === 0) continue; // Discard AI items without valid sources

    const key = makeDedupeKey(item);
    if (!map.has(key)) {
      map.set(key, {
        ...item,
        verification: "ai-found",
      });
    }
  }

  const allMerged = Array.from(map.values()).map(enrichEventAssets);

  // Filter by region if requested
  if (regionFilter === "ID") {
    return allMerged.filter((e) => e.region === "ID" || e.region === "BOTH");
  } else if (regionFilter === "GLOBAL") {
    return allMerged.filter((e) => e.region === "GLOBAL" || e.region === "BOTH");
  }

  return allMerged;
}

export function computeDataHealthSummary(year: number, aiEvents: EventItem[] = []): DataHealthSummary {
  const allEvents = buildUnifiedEventsForYear(year, "BOTH", aiEvents);

  const breakdown: Record<VerificationLevel, number> = {
    official: 0,
    verified: 0,
    rule: 0,
    estimated: 0,
    "ai-found": 0,
    calculated: 0,
  };

  const monthlyData: {
    month: number;
    monthName: string;
    globalCount: number;
    idCount: number;
    meetsTarget: boolean;
  }[] = [];

  const warnings: string[] = [];
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  for (let m = 0; m < 12; m++) {
    const mStr = String(m + 1).padStart(2, "0");
    const monthEvents = allEvents.filter((e) => e.date.startsWith(`${year}-${mStr}`));

    const globalCount = monthEvents.filter((e) => e.region === "GLOBAL" || e.region === "BOTH").length;
    const idCount = monthEvents.filter((e) => e.region === "ID" || e.region === "BOTH").length;

    // Targets: Global >= 12, ID >= 6
    const meetsTarget = globalCount >= 12 && idCount >= 6;
    if (!meetsTarget) {
      if (globalCount < 12) {
        warnings.push(`${monthNames[m]} ${year}: Density Global (${globalCount}/12) di bawah target.`);
      }
      if (idCount < 6) {
        warnings.push(`${monthNames[m]} ${year}: Density Indonesia (${idCount}/6) di bawah target.`);
      }
    }

    monthlyData.push({
      month: m + 1,
      monthName: monthNames[m],
      globalCount,
      idCount,
      meetsTarget,
    });
  }

  for (const e of allEvents) {
    const v = e.verification || "rule";
    breakdown[v] = (breakdown[v] || 0) + 1;
  }

  if (breakdown.estimated > 0) {
    warnings.push(`Tahun ${year} memiliki ${breakdown.estimated} event berstatus Estimasi (menunggu SKB 3 Menteri resmi).`);
  }

  const isAllTargetsMet = warnings.length === 0;

  return {
    year,
    totalEvents: allEvents.length,
    verificationBreakdown: breakdown,
    monthlyCounts: monthlyData,
    isAllTargetsMet,
    warnings,
    lastVerifiedAt: new Date().toISOString(),
  };
}

// AUTOMATED TEST SUITE (Section 9 Kriteria Selesai)
export interface TestResult {
  name: string;
  passed: boolean;
  detail: string;
}

export function runEngineUnitTests(): TestResult[] {
  const results: TestResult[] = [];

  // Helper assertions
  const assert = (name: string, condition: boolean, detail: string) => {
    results.push({ name, passed: condition, detail });
  };

  try {
    // 1. Easter Tests
    const easter2026 = getLayer1RulesForYear(2026).find((e) => e.eventKey === "easter-sunday")?.date;
    assert("Easter 2026 (2026-04-05)", easter2026 === "2026-04-05", `Got: ${easter2026}`);

    const easter2027 = getLayer1RulesForYear(2027).find((e) => e.eventKey === "easter-sunday")?.date;
    assert("Easter 2027 (2027-03-28)", easter2027 === "2027-03-28", `Got: ${easter2027}`);

    const easter2028 = getLayer1RulesForYear(2028).find((e) => e.eventKey === "easter-sunday")?.date;
    assert("Easter 2028 (2028-04-16)", easter2028 === "2028-04-16", `Got: ${easter2028}`);

    const mardiGras2027 = getLayer1RulesForYear(2027).find((e) => e.eventKey === "mardi-gras")?.date;
    assert("Mardi Gras 2027 (2027-02-09)", mardiGras2027 === "2027-02-09", `Got: ${mardiGras2027}`);

    const ashWed2027 = getLayer1RulesForYear(2027).find((e) => e.eventKey === "ash-wednesday")?.date;
    assert("Ash Wednesday 2027 (2027-02-10)", ashWed2027 === "2027-02-10", `Got: ${ashWed2027}`);

    // 2. Floating Holiday Tests
    const mothersDay2026 = getLayer1RulesForYear(2026).find((e) => e.eventKey === "mothers-day-us")?.date;
    assert("Mother's Day 2026 (2026-05-10)", mothersDay2026 === "2026-05-10", `Got: ${mothersDay2026}`);

    const mothersDay2027 = getLayer1RulesForYear(2027).find((e) => e.eventKey === "mothers-day-us")?.date;
    assert("Mother's Day 2027 (2027-05-09)", mothersDay2027 === "2027-05-09", `Got: ${mothersDay2027}`);

    const fathersDay2026 = getLayer1RulesForYear(2026).find((e) => e.eventKey === "fathers-day-us")?.date;
    assert("Father's Day 2026 (2026-06-21)", fathersDay2026 === "2026-06-21", `Got: ${fathersDay2026}`);

    const fathersDay2027 = getLayer1RulesForYear(2027).find((e) => e.eventKey === "fathers-day-us")?.date;
    assert("Father's Day 2027 (2027-06-20)", fathersDay2027 === "2027-06-20", `Got: ${fathersDay2027}`);

    const tg2026 = getLayer1RulesForYear(2026).find((e) => e.eventKey === "thanksgiving-us")?.date;
    assert("Thanksgiving 2026 (2026-11-26)", tg2026 === "2026-11-26", `Got: ${tg2026}`);

    const tg2027 = getLayer1RulesForYear(2027).find((e) => e.eventKey === "thanksgiving-us")?.date;
    assert("Thanksgiving 2027 (2027-11-25)", tg2027 === "2027-11-25", `Got: ${tg2027}`);

    const blackFri2027 = getLayer1RulesForYear(2027).find((e) => e.eventKey === "black-friday")?.date;
    assert("Black Friday 2027 (2027-11-26)", blackFri2027 === "2027-11-26", `Got: ${blackFri2027}`);

    const cyberMon2027 = getLayer1RulesForYear(2027).find((e) => e.eventKey === "cyber-monday")?.date;
    assert("Cyber Monday 2027 (2027-11-29)", cyberMon2027 === "2027-11-29", `Got: ${cyberMon2027}`);

    // 3. Indonesia 2027 SKB 3 Menteri Tests
    const events2027ID = buildUnifiedEventsForYear(2027, "ID");
    const skb2027LiburCount = events2027ID.filter((e) => e.holidayType === "libur-nasional").length;
    assert("Indonesia 2027 SKB Libur Nasional (18 items)", skb2027LiburCount === 18, `Got: ${skb2027LiburCount}`);

    const skb2027CutiCount = events2027ID.filter((e) => e.holidayType === "cuti-bersama").length;
    assert("Indonesia 2027 SKB Cuti Bersama (8 items)", skb2027CutiCount === 8, `Got: ${skb2027CutiCount}`);

    const israMiraj2027Entries = events2027ID.filter((e) => e.title.includes("Isra Mikraj"));
    assert("Indonesia 2027 Dual Isra Mikraj (Jan 5 & Dec 26)", israMiraj2027Entries.length === 2, `Got: ${israMiraj2027Entries.length} entries (${israMiraj2027Entries.map(e => e.date).join(", ")})`);

    // 4. Indonesia 2026 SKB 3 Menteri Tests
    const events2026ID = buildUnifiedEventsForYear(2026, "ID");
    const skb2026LiburCount = events2026ID.filter((e) => e.holidayType === "libur-nasional").length;
    assert("Indonesia 2026 SKB Libur Nasional (17 items)", skb2026LiburCount === 17, `Got: ${skb2026LiburCount}`);

    const skb2026CutiCount = events2026ID.filter((e) => e.holidayType === "cuti-bersama").length;
    assert("Indonesia 2026 SKB Cuti Bersama (8 items)", skb2026CutiCount === 8, `Got: ${skb2026CutiCount}`);

    // 5. Global Jan 2026 Density Test
    const events2026Jan = buildUnifiedEventsForYear(2026, "GLOBAL").filter((e) => e.date.startsWith("2026-01-"));
    const requiredJanDays = ["2026-01-01", "2026-01-04", "2026-01-13", "2026-01-24", "2026-01-26", "2026-01-27"];
    const containsAllRequiredJan = requiredJanDays.every((d) => events2026Jan.some((e) => e.date === d));
    assert("Januari 2026 Global contains 1, 4, 13, 24, 26, 27 Jan", containsAllRequiredJan, `Jan 2026 count: ${events2026Jan.length}`);

    // 6. Multi-year Non-empty calendar test (2027 and 2028)
    const events2028 = buildUnifiedEventsForYear(2028, "BOTH");
    assert("Multi-year 2028 contains non-empty events", events2028.length > 50, `Got: ${events2028.length} events for 2028`);

  } catch (err: any) {
    assert("Test Engine Execution", false, `Error during testing: ${err.message}`);
  }

  return results;
}
