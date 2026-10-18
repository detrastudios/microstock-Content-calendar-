import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { INITIAL_SEED_TRENDS } from "./src/data/seedData";
import { EventItem, TrendItem } from "./src/types";
import { buildUnifiedEventsForYear } from "./src/data/eventEngine";

const app = express();
const PORT = 3000;

app.use(express.json());

// Circuit breaker for Gemini API quota rate limits
let geminiQuotaCooldownUntil = 0;

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. Operating with local deterministic engine.");
    return null;
  }
  if (Date.now() < geminiQuotaCooldownUntil) {
    console.log("[Gemini Client] Rate limit / quota cooldown active. Serving local dataset.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Helper: Safely parse JSON from Gemini response
function cleanAndParseJSON<T>(rawText: string): T | null {
  try {
    let cleaned = rawText.trim();
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }
    return JSON.parse(cleaned) as T;
  } catch (err) {
    console.error("JSON parse error:", err, "Raw text was:", rawText.slice(0, 300));
    return null;
  }
}

// Validation helpers
function isValidHexColor(hex: string): boolean {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
}

function sanitizeEvent(item: any): EventItem | null {
  if (!item || !item.title || !item.date) return null;

  // Section 6: AI-found events MUST have at least 1 valid source URL starting with http
  const sources = Array.isArray(item.sources) && item.sources.length > 0
    ? item.sources.filter((s: any) => s && s.title && s.url && typeof s.url === "string" && s.url.startsWith("http"))
    : [];

  if (sources.length === 0) {
    // Discard AI-found items that lack credible source link
    return null;
  }

  // Ensure palette hex colors are valid
  const palette = Array.isArray(item.palette)
    ? item.palette.map((p: any) => ({
        name: p?.name || "Accent",
        hex: isValidHexColor(p?.hex) ? p.hex : "#3B82F6",
      }))
    : [{ name: "Primary", hex: "#3B82F6" }];

  const slugKey = (item.eventKey || item.title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-");

  return {
    id: item.id || `${slugKey}-${item.date}`,
    eventKey: slugKey,
    verification: "ai-found",
    title: item.title,
    date: item.date,
    endDate: item.endDate || undefined,
    dateAlt: Array.isArray(item.dateAlt) ? item.dateAlt : undefined,
    holidayType: ["libur-nasional", "cuti-bersama", "hari-besar", "observance"].includes(item.holidayType)
      ? item.holidayType
      : undefined,
    region: item.region === "ID" ? "ID" : "GLOBAL",
    category: ["Global", "Cultural", "Awareness", "Fun", "Sports", "Religious", "Commerce"].includes(item.category)
      ? item.category
      : "Global",
    uploadWindow: {
      startMonth: item.uploadWindow?.startMonth || "2 Bulan",
      endMonth: item.uploadWindow?.endMonth || "Sebelum Event",
      label: item.uploadWindow?.label || "2-3 bulan sebelum event",
    },
    assets: {
      photo: Array.isArray(item.assets?.photo) ? item.assets.photo : ["Konsep foto spesifik"],
      vector: Array.isArray(item.assets?.vector) ? item.assets.vector : ["Ilustrasi vektor & pattern"],
      video: Array.isArray(item.assets?.video) ? item.assets.video : ["Animasi loop 5-10 detik"],
    },
    palette,
    keywords: {
      en: Array.isArray(item.keywords?.en) ? item.keywords.en : ["stock photo", "vector illustration"],
      id: Array.isArray(item.keywords?.id) ? item.keywords.id : undefined,
    },
    tips: item.tips || "Upload 2-3 bulan lebih awal untuk mendapatkan peringkat awal di mesin pencari microstock.",
    ipNote: item.ipNote || "Aman. Gunakan simbol generik tanpa merek dagang.",
    sources,
    verifiedAt: new Date().toISOString(),
  };
}


function sanitizeTrend(item: any): TrendItem | null {
  if (!item || !item.title) return null;

  const defaultSources = [
    { title: "Adobe Stock Visual Trends", url: "https://stock.adobe.com/blog" },
    { title: "Etsy Design & Market Trends", url: "https://www.etsy.com/blog/trends" },
    { title: "Google Trends & Microstock Insights", url: "https://trends.google.com" },
  ];

  let sources = Array.isArray(item.sources) && item.sources.length > 0
    ? item.sources.filter((s: any) => s && s.title && s.url && typeof s.url === "string" && s.url.startsWith("http"))
    : defaultSources;

  if (sources.length === 0) {
    sources = defaultSources;
  }

  // Ensure Adobe Stock Trends & Etsy are represented in sources
  if (!sources.some((s: any) => s.title.toLowerCase().includes("adobe"))) {
    sources.push({ title: "Adobe Stock Trends", url: "https://stock.adobe.com/blog" });
  }
  if (!sources.some((s: any) => s.title.toLowerCase().includes("etsy"))) {
    sources.push({ title: "Etsy Market Trends", url: "https://www.etsy.com/blog/trends" });
  }

  const palette = Array.isArray(item.palette)
    ? item.palette.map((p: any) => ({
        name: p?.name || "Accent",
        hex: isValidHexColor(p?.hex) ? p.hex : "#EF4444",
      }))
    : [{ name: "Hot Red", hex: "#EF4444" }];

  return {
    id: item.id || `trend-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: item.title,
    region: item.region === "ID" ? "ID" : "GLOBAL",
    whyTrending: item.whyTrending || "Topik ini sedang ramai dicari di mesin pencarian dan media sosial.",
    status: ["Hot", "Rising", "Fading"].includes(item.status) ? item.status : "Hot",
    peakWindow: item.peakWindow || "7-14 hari ke depan",
    assets: {
      photo: Array.isArray(item.assets?.photo) ? item.assets.photo : ["Konsep foto tren"],
      vector: Array.isArray(item.assets?.vector) ? item.assets.vector : ["Gaya vektor tren"],
      video: Array.isArray(item.assets?.video) ? item.assets.video : ["Motion graphics loop"],
    },
    palette,
    keywords: {
      en: Array.isArray(item.keywords?.en) ? item.keywords.en : ["trending topic", "microstock trend"],
      id: Array.isArray(item.keywords?.id) ? item.keywords.id : undefined,
    },
    ipNote: item.ipNote || "Aman: Gunakan bentuk generik tanpa logo atau wujud berhak cipta.",
    sources,
    fetchedAt: new Date().toISOString(),
  };
}

// Deduplicate helper
function mergeEvents(primary: EventItem[], secondary: EventItem[]): EventItem[] {
  const map = new Map<string, EventItem>();
  const makeKey = (e: EventItem) => `${e.title.toLowerCase().trim()}_${e.date}`;

  for (const item of primary) {
    map.set(makeKey(item), item);
  }
  for (const item of secondary) {
    const key = makeKey(item);
    if (!map.has(key)) {
      map.set(key, item);
    }
  }
  return Array.from(map.values());
}

// API Routes
app.post("/api/events", async (req, res) => {
  const { year = 2026, region = "BOTH" } = req.body;
  const numYear = Number(year);
  console.log(`[API /api/events] Requesting events for year ${numYear}, region: ${region}`);

  // Base deterministic data (Layer 1 Rule Engine + Layer 2 Official Dataset)
  const baseDeterministicEvents = buildUnifiedEventsForYear(numYear, region as any, []);

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({
      success: true,
      events: baseDeterministicEvents,
      source: "deterministic_engine",
    });
  }

  try {
    // Stage 1: Research with Google Search Grounding for EXTRA/NEW events
    const researchPrompt = `Anda adalah peneliti kalender microstock profesional.
Fokus: Tambahkan event-event baru, festival budaya lokal, festival seni/film, hari peringatan PBB/WHO tambahan, dan event olahraga untuk tahun ${numYear} wilayah: ${region}.
PENTING: Jangan ubah atau tebak tanggal libur nasional Indonesia atau event besar yang sudah pasti.
Cari event tambahan yang belum populer tetapi bernilai komersial tinggi untuk pasar microstock (photo, vector, video loop).
Sertakan tanggal pasti (YYYY-MM-DD), sumber link valid (mis. un.org, timeanddate.com, kemenag.go.id, wikipedia.org), analisis aset, palet warna, keyword, dan catatan IP.`;

    console.log("[API /api/events] Stage 1: Researching extra events with Google Search grounding...");
    const researchRes = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: researchPrompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const researchText = researchRes.text || "";

    // Stage 2: Structurization into JSON
    const structurizePrompt = `Berdasarkan data riset event tambahan berikut untuk tahun ${numYear} dan wilayah ${region}:
---
${researchText}
---

Ubah menjadi JSON array murni tanpa format tambahan, berisi list object event tambahan sesuai skema TypeScript berikut:
[
  {
    "id": "slug-unik-${numYear}",
    "eventKey": "slug-tetap-lintas-tahun",
    "verification": "ai-found",
    "title": "Nama Event",
    "date": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD",
    "region": "ID" | "GLOBAL",
    "category": "Global" | "Cultural" | "Awareness" | "Fun" | "Sports" | "Religious" | "Commerce",
    "uploadWindow": { "startMonth": "Bulan Awal", "endMonth": "Bulan Akhir", "label": "Label 2-3 bulan sebelum" },
    "assets": {
      "photo": ["konsep foto spesifik"],
      "vector": ["konsep vektor & pattern"],
      "video": ["konsep animasi loop 5-10 detik"]
    },
    "palette": [{ "name": "Nama Warna", "hex": "#HEXCLR" }],
    "keywords": { "en": ["kw1", "kw2"], "id": ["kw1", "kw2"] },
    "tips": "Tips insight pasar 1-3 kalimat",
    "ipNote": "Catatan legal IP / Aman",
    "sources": [{ "title": "Nama Sumber", "url": "https://domain-resmi.com" }]
  }
]
WAJIB menyertakan minimal 1 sumber URL valid (dimulai dengan http) untuk tiap event.
Jika tidak ada sumber URL kredibel, jangan masukkan event tersebut.`;

    console.log("[API /api/events] Stage 2: Structurizing extra AI events into JSON...");
    const structRes = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: structurizePrompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const rawJsonText = structRes.text || "[]";
    const parsedArray = cleanAndParseJSON<any[]>(rawJsonText) || [];

    const sanitizedAiEvents = parsedArray
      .map(sanitizeEvent)
      .filter((e): e is EventItem => e !== null);

    console.log(`[API /api/events] Gemini returned ${sanitizedAiEvents.length} extra valid events with sources.`);

    // Enforce priority: L2 Official > L1 Rule > L3 AI-Found
    const finalEvents = buildUnifiedEventsForYear(numYear, region as any, sanitizedAiEvents);

    return res.json({
      success: true,
      events: finalEvents,
      source: "engine_plus_ai",
      fetchedCount: sanitizedAiEvents.length,
    });
  } catch (error: any) {
    const errStr = String(error?.message || error || "");
    const isQuota = errStr.includes("429") || errStr.includes("RESOURCE_EXHAUSTED") || errStr.includes("quota");
    if (isQuota) {
      geminiQuotaCooldownUntil = Date.now() + 60000;
      console.warn("[API /api/events] Gemini API quota limit (429) reached. Cooldown activated for 60s; serving local 3-layer deterministic engine dataset.");
    } else {
      console.warn(`[API /api/events] Gemini request failed: ${errStr.slice(0, 150)}`);
    }

    return res.json({
      success: true,
      events: baseDeterministicEvents,
      source: "engine_fallback",
      error: isQuota ? "API quota limit reached. Serving local deterministic engine data." : "Serving local deterministic engine data.",
    });
  }
});

app.post("/api/trends", async (req, res) => {
  const { region = "BOTH" } = req.body;
  console.log(`[API /api/trends] Requesting viral trends for region: ${region}`);

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({ success: true, trends: INITIAL_SEED_TRENDS, source: "seed" });
  }

  try {
    // Stage 1: Research with Google Search Grounding for current rising trends
    const researchPrompt = `Cari topik dan tren visual viral terbaru dari Adobe Stock Trends (stock.adobe.com/blog), Etsy Trend Reports & Marketplace Insights (etsy.com/blog/trends), Google Trends (${region === "ID" ? "Indonesia" : region === "GLOBAL" ? "Global" : "Indonesia dan Global"}), dan media sosial dalam 7-14 hari terakhir yang berpotensi meningkatkan pencarian aset stok microstock (photo, vector, animasi/motion graphics, printable, craft templates).
Fokus pada: tren gaya desain 3D, estetika visual baru, isu lingkungan/sustainabilitas, gaya hidup/kesehatan, teknologi AI/workspace, cuaca/musim, dan budaya populer.
PENTING: Jangan sarankan konten sensitif, politik partisan, atau merek/tokoh berhak cipta. Jika berbasis merek/tokoh/film viral, ubah menjadi tema generik yang aman untuk microstock dan jelaskan di ipNote.
WAJIB sertakan rujukan sumber terpercaya seperti Adobe Stock Trends (https://stock.adobe.com/blog), Etsy Trends (https://www.etsy.com/blog/trends), Shutterstock Blog, atau Google Trends.`;

    console.log("[API /api/trends] Stage 1: Researching trends with Google Search grounding...");
    const researchRes = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: researchPrompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const researchText = researchRes.text || "";

    // Stage 2: Structurization into JSON (Max 8 trends)
    const structurizePrompt = `Berdasarkan data riset tren berikut untuk wilayah ${region}:
---
${researchText}
---

Ubah menjadi JSON array murni berisi MAKSIMAL 8 tren terbaik, sesuai skema TypeScript berikut:
[
  {
    "id": "trend-slug-1",
    "title": "Nama Tren Generik & Menarik",
    "region": "ID" | "GLOBAL",
    "whyTrending": "1-2 kalimat penyebab tren",
    "status": "Hot" | "Rising" | "Fading",
    "peakWindow": "estimasi puncak, mis. 7-14 hari ke depan",
    "assets": {
      "photo": ["ide konsep foto"],
      "vector": ["ide konsep vektor"],
      "video": ["ide konsep animasi loop 5-10s"]
    },
    "palette": [{ "name": "Nama Warna", "hex": "#HEXCLR" }],
    "keywords": { "en": ["kw1", "kw2"], "id": ["kw1", "kw2"] },
    "ipNote": "Wajib: Penjelasan keamanan IP / Pengubahan nama spesifik menjadi tema generik yang aman",
    "sources": [{ "title": "Judul Sumber", "url": "https://domain.com" }]
  }
]
Pastikan JSON valid!`;

    console.log("[API /api/trends] Stage 2: Structurizing trends into JSON...");
    const structRes = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: structurizePrompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const rawJsonText = structRes.text || "[]";
    const parsedArray = cleanAndParseJSON<any[]>(rawJsonText) || [];

    const sanitizedTrends = parsedArray
      .map(sanitizeTrend)
      .filter((t): t is TrendItem => t !== null)
      .slice(0, 8);

    if (sanitizedTrends.length === 0) {
      return res.json({ success: true, trends: INITIAL_SEED_TRENDS, source: "seed_fallback" });
    }

    return res.json({
      success: true,
      trends: sanitizedTrends,
      source: "gemini",
      fetchedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    const errStr = String(error?.message || error || "");
    const isQuota = errStr.includes("429") || errStr.includes("RESOURCE_EXHAUSTED") || errStr.includes("quota");
    if (isQuota) {
      geminiQuotaCooldownUntil = Date.now() + 60000;
      console.warn("[API /api/trends] Gemini API quota limit (429) reached. Cooldown activated for 60s; serving local seed trends.");
    } else {
      console.warn(`[API /api/trends] Gemini request failed: ${errStr.slice(0, 150)}`);
    }

    return res.json({
      success: true,
      trends: INITIAL_SEED_TRENDS,
      source: "seed_fallback",
      error: isQuota ? "API quota limit reached. Serving seed trends." : "Serving seed trends.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
