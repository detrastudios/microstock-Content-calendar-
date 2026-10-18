import React, { useState, useEffect } from "react";
import {
  X,
  Star,
  Calendar,
  Clock,
  Camera,
  Palette,
  Key,
  Lightbulb,
  ShieldAlert,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Video,
  Layers,
  Share2,
} from "lucide-react";
import { EventItem } from "../types";
import { enrichEventAssets } from "../data/eventEngine";

interface EventDetailModalProps {
  dateStr: string;
  events: EventItem[];
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
  onShowToast: (msg: string, type?: "success" | "info" | "error") => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  dateStr,
  events,
  favoriteIds,
  onToggleFavorite,
  onClose,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedKeywords, setCopiedKeywords] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (events.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-4">
          <Calendar className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Tidak Ada Event Terjadwal
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tanggal {dateStr} belum memiliki event khusus. Gunakan waktu ini untuk memproduksi aset stok umum.
          </p>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  }

  const rawEvent = events[activeTab] || events[0];
  const activeEvent = enrichEventAssets(rawEvent);
  const isFavorite = favoriteIds.includes(activeEvent.id);

  // Calculate countdown badge
  const calculateCountdown = (targetDateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return { label: "Hari Ini 🎉", style: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300" };
    if (diffDays > 0) return { label: `Akan datang dalam ${diffDays} hari`, style: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300" };
    return { label: `Sudah lewat ${Math.abs(diffDays)} hari`, style: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-300" };
  };

  const countdown = calculateCountdown(activeEvent.date);

  // Copy Color Hex
  const handleCopyHex = (hex: string, name: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    onShowToast(`Disalin: ${name} (${hex})`, "success");
    setTimeout(() => setCopiedHex(null), 2000);
  };

  // Copy All Keywords
  const handleCopyAllKeywords = () => {
    const allKw = [
      ...(activeEvent.keywords?.en || []),
      ...(activeEvent.keywords?.id || []),
    ].join(", ");
    navigator.clipboard.writeText(allKw);
    setCopiedKeywords(true);
    onShowToast("Semua keyword disalin ke clipboard", "success");
    setTimeout(() => setCopiedKeywords(false), 2000);
  };

  // Copy Single Keyword
  const handleCopySingleKeyword = (kw: string) => {
    navigator.clipboard.writeText(kw);
    onShowToast(`Keyword disalin: "${kw}"`, "success");
  };

  // Copy Summary
  const handleCopySummary = () => {
    const summaryText = `📌 EVENT MICROSTOCK: ${activeEvent.title}
📅 Tanggal Event: ${activeEvent.date} ${activeEvent.endDate ? `s/d ${activeEvent.endDate}` : ""}
⏰ Ideal Upload Window: ${activeEvent.uploadWindow?.label || "-"}
🏷️ Kategori: ${activeEvent.category} (${activeEvent.region === "ID" ? "Indonesia" : "Global"})
💡 Tips: ${activeEvent.tips || "-"}
🔑 Keywords EN: ${activeEvent.keywords?.en?.join(", ") || "-"}
${activeEvent.keywords?.id ? `🔑 Keywords ID: ${activeEvent.keywords.id.join(", ")}` : ""}
⚠️ Catatan IP: ${activeEvent.ipNote || "-"}`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    onShowToast("Ringkasan event disalin ke clipboard!", "success");
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          {/* Multiple Events Tabs */}
          {events.length > 1 ? (
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
              {events.map((ev, idx) => (
                <button
                  key={ev.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeTab === idx
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                  }`}
                >
                  Event {idx + 1}: {ev.title.split("(")[0].trim()}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Detail Event
              </span>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors shrink-0"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto scrollbar-thin flex-1 text-slate-900 dark:text-slate-100">
          {/* Title & Top Badges */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {activeEvent.title}
              </h2>

              {/* Star Favorite Toggle */}
              <button
                onClick={() => onToggleFavorite(activeEvent.id)}
                className={`p-2.5 rounded-2xl border transition-all shrink-0 ${
                  isFavorite
                    ? "bg-amber-50 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 text-amber-500 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600"
                }`}
                title={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
              >
                <Star className={`w-5 h-5 ${isFavorite ? "fill-amber-400 text-amber-500" : ""}`} />
              </button>
            </div>

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              {/* Verification Badge */}
              {activeEvent.verification === "official" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
                  ✅ Resmi (SKB/Govt)
                </span>
              )}
              {activeEvent.verification === "verified" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700">
                  ✔️ Terverifikasi
                </span>
              )}
              {activeEvent.verification === "rule" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700">
                  🧮 Rumus Engine
                </span>
              )}
              {activeEvent.verification === "estimated" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                  ⏳ Estimasi Resmi
                </span>
              )}
              {activeEvent.verification === "ai-found" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-700">
                  🤖 Temuan AI
                </span>
              )}

              {/* Region Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                {activeEvent.region === "ID" ? "🇮🇩 Indonesia" : "🌍 Global"}
              </span>

              {/* Category Badge */}
              <span className="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                {activeEvent.category}
              </span>

              {/* Upload Status Badge */}
              {activeEvent.uploadStatus && (
                <span className={`px-2.5 py-1 rounded-xl border ${
                  activeEvent.uploadStatus === "HINDARI"
                    ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300"
                    : activeEvent.uploadStatus === "EVERGREEN"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300"
                    : activeEvent.uploadStatus === "NOW" || activeEvent.uploadStatus === "MEPET"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 animate-pulse"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300"
                }`}>
                  Status: {activeEvent.uploadStatus}
                </span>
              )}

              {/* Priority Badge */}
              {activeEvent.priority && (
                <span className={`px-2.5 py-1 rounded-xl border ${
                  activeEvent.priority === "Tinggi"
                    ? "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-300"
                    : activeEvent.priority === "Sedang"
                    ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-300"
                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300"
                }`}>
                  Prioritas: {activeEvent.priority}
                </span>
              )}

              {/* Countdown Badge */}
              <span className={`px-2.5 py-1 rounded-xl border ${countdown.style}`}>
                {countdown.label}
              </span>
            </div>
          </div>

          {/* Visual Theme & Gap Guidance Banner */}
          {activeEvent.visualTheme && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 border border-purple-200 dark:border-purple-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-600 text-white shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                  🎨 Tema Visual & Gap Pasar
                </h4>
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {activeEvent.visualTheme}
                </p>
              </div>
            </div>
          )}

          {/* Specific Microstock Notes */}
          {activeEvent.notes && (
            <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                📝 Catatan Khusus Kontributor
              </h4>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                {activeEvent.notes}
              </p>
            </div>
          )}

          {/* Ideal Upload Window Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 border border-blue-200 dark:border-blue-800/80 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0 shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                ⏰ Ideal Upload Window (Lead Time)
              </h4>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {activeEvent.uploadWindow?.label || "Siapkan 2-3 bulan sebelum acara"}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Persiapkan dan upload aset Anda pada periode ini agar terindeks sempurna oleh mesin pencari Shutterstock, Adobe Stock, dan Freepik sebelum pembeli mulai berbelanja.
              </p>
            </div>
          </div>

          {/* Asset Analysis Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Layers className="w-4.5 h-4.5 text-blue-500" />
                <span>Asset Analysis (Rekomendasi Produksi Spesifik)</span>
              </h3>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                Riset Pasar Microstock
              </span>
            </div>

            {/* Target Demand / Format Terlaris yang Paling Dicari Buyer */}
            <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                🎯 Format Aset Paling Dicari Buyer (High Search Volume):
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-2xs">
                  📱 Instagram Feed 1:1 & Story/Reels 9:16
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-2xs">
                  🖥️ Website Hero Banner 16:9 + 40% Copy Space
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-2xs">
                  📦 3D PNG Transparan Set (Isolated No Background)
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-2xs">
                  📄 Spanduk / Baliho Cetak High-Res 300DPI
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-2xs">
                  🎁 Template Hampers, Stiker & Seamless Pattern
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Photo Ideas */}
              <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-800/60 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-extrabold text-blue-700 dark:text-blue-300 pb-1 border-b border-blue-200/60 dark:border-blue-800/60">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>📸 Photo Concept (Detail Specs)</span>
                  </div>
                </div>
                <ul className="text-xs text-slate-800 dark:text-slate-200 space-y-2 leading-relaxed">
                  {(activeEvent.assets?.photo || []).map((idea, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white dark:bg-slate-800/90 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 shadow-2xs">
                      <span className="text-blue-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{idea.replace(/^📸 Photo:\s*/i, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vector Ideas */}
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/60 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-extrabold text-purple-700 dark:text-purple-300 pb-1 border-b border-purple-200/60 dark:border-purple-800/60">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>🎨 Vector & 3D (Detail Specs)</span>
                  </div>
                </div>
                <ul className="text-xs text-slate-800 dark:text-slate-200 space-y-2 leading-relaxed">
                  {(activeEvent.assets?.vector || []).map((idea, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white dark:bg-slate-800/90 p-2.5 rounded-xl border border-purple-100 dark:border-slate-700 shadow-2xs">
                      <span className="text-purple-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{idea.replace(/^🎨 Vector:\s*/i, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Video Ideas */}
              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/60 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-extrabold text-rose-700 dark:text-rose-300 pb-1 border-b border-rose-200/60 dark:border-rose-800/60">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>🎬 Video / Motion (Detail Specs)</span>
                  </div>
                </div>
                <ul className="text-xs text-slate-800 dark:text-slate-200 space-y-2 leading-relaxed">
                  {(activeEvent.assets?.video || []).map((idea, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white dark:bg-slate-800/90 p-2.5 rounded-xl border border-rose-100 dark:border-slate-700 shadow-2xs">
                      <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{idea.replace(/^🎬 Video:\s*/i, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Color Palette Chips */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-500" />
              <span>Color Palette (Klik untuk copy HEX)</span>
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              {(activeEvent.palette || []).map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCopyHex(chip.hex, chip.name)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 transition-all text-xs font-semibold group focus:outline-none"
                  title={`Copy ${chip.hex}`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: chip.hex }}
                  />
                  <span>{chip.name}</span>
                  <span className="text-[11px] font-mono text-slate-400 font-normal">
                    {copiedHex === chip.hex ? "Copied!" : chip.hex}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Top Keywords */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-500" />
                <span>Top Keywords</span>
              </h3>

              <button
                onClick={handleCopyAllKeywords}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {copiedKeywords ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKeywords ? "Tersalin!" : "Copy Semua Keywords"}</span>
              </button>
            </div>

            <div className="space-y-2">
              {/* English Keywords */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Bahasa Inggris (Wajib):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(activeEvent.keywords?.en || []).map((kw, idx) => (
                    <span
                      key={idx}
                      onClick={() => handleCopySingleKeyword(kw)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/80 dark:border-slate-700 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="Klik untuk copy keyword ini"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Indonesian Keywords (if local) */}
              {activeEvent.keywords?.id && activeEvent.keywords.id.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Bahasa Indonesia (Event Lokal):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeEvent.keywords.id.map((kw, idx) => (
                      <span
                        key={idx}
                        onClick={() => handleCopySingleKeyword(kw)}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-medium border border-rose-200/80 dark:border-rose-800 cursor-pointer hover:bg-rose-100 transition-colors"
                        title="Klik untuk copy keyword ini"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tips & Market Insights */}
          <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-1">
            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Tips & Strategi Pasar</span>
            </div>
            <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
              {activeEvent.tips}
            </p>
          </div>

          {/* Legal / IP Note */}
          <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-1">
            <div className="flex items-center gap-2 text-xs font-extrabold text-rose-800 dark:text-rose-300 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>⚠️ Catatan Legal & IP Risk</span>
            </div>
            <p className="text-xs text-rose-900 dark:text-rose-200 leading-relaxed font-medium">
              {activeEvent.ipNote}
            </p>
          </div>

          {/* Sources List */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Sumber Data Verifikasi:
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {(activeEvent.sources || []).map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:underline border border-slate-200 dark:border-slate-700"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{src.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white text-xs font-bold transition-all shadow-sm"
          >
            {copiedSummary ? <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSummary ? "Ringkasan Tersalin!" : "Salin Ringkasan Ringkas"}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
