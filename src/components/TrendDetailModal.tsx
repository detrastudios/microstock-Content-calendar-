import React, { useState, useEffect } from "react";
import {
  X,
  Flame,
  Palette,
  Key,
  ShieldAlert,
  ExternalLink,
  Copy,
  Check,
  Camera,
  Sparkles,
  Video,
  Clock,
  Layers,
} from "lucide-react";
import { TrendItem } from "../types";

interface TrendDetailModalProps {
  trend: TrendItem;
  onClose: () => void;
  onShowToast: (msg: string, type?: "success" | "info" | "error") => void;
}

export const TrendDetailModal: React.FC<TrendDetailModalProps> = ({
  trend,
  onClose,
  onShowToast,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedKeywords, setCopiedKeywords] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleCopyHex = (hex: string, name: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    onShowToast(`Disalin: ${name} (${hex})`, "success");
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleCopyAllKeywords = () => {
    const allKw = [
      ...trend.keywords.en,
      ...(trend.keywords.id || []),
    ].join(", ");
    navigator.clipboard.writeText(allKw);
    setCopiedKeywords(true);
    onShowToast("Semua keyword disalin", "success");
    setTimeout(() => setCopiedKeywords(false), 2000);
  };

  const handleCopySummary = () => {
    const summaryText = `🔥 TREN VIRAL MICROSTOCK: ${trend.title}
📈 Status: ${trend.status} | Estimasi Puncak: ${trend.peakWindow}
💡 Mengapa Trending: ${trend.whyTrending}
🌐 Wilayah: ${trend.region === "ID" ? "Indonesia" : "Global"}
🔑 Keywords EN: ${trend.keywords.en.join(", ")}
${trend.keywords.id ? `🔑 Keywords ID: ${trend.keywords.id.join(", ")}` : ""}
⚠️ Catatan IP Safe: ${trend.ipNote}`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    onShowToast("Ringkasan tren disalin ke clipboard!", "success");
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-rose-500/10 dark:from-orange-950/40 dark:via-amber-950/40 dark:to-rose-950/40 border-b border-orange-200 dark:border-orange-900/60 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400">
                Detail Tren Viral
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {trend.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto scrollbar-thin flex-1 text-slate-900 dark:text-slate-100">
          {/* Status & Region Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="px-3 py-1 rounded-xl bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border border-orange-300 dark:border-orange-800">
              🔥 Status: {trend.status}
            </span>

            <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              {trend.region === "ID" ? "🇮🇩 Indonesia" : "🌍 Global"}
            </span>

            <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300 dark:border-blue-800 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Estimasi Puncak: {trend.peakWindow}</span>
            </span>
          </div>

          {/* Why Trending Explanation */}
          <div className="p-4 rounded-2xl bg-orange-50/80 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/60 space-y-1">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-orange-800 dark:text-orange-300">
              💡 Mengapa Topik Ini Sedang Trending?
            </h4>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
              {trend.whyTrending}
            </p>
          </div>

          {/* Asset Analysis */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>Rekomendasi Produksi Aset</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                  <Camera className="w-4 h-4" />
                  <span>📸 Ide Foto</span>
                </div>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                  {trend.assets.photo.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400">
                  <Sparkles className="w-4 h-4" />
                  <span>🎨 Ide Vektor</span>
                </div>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                  {trend.assets.vector.map((v, idx) => (
                    <li key={idx}>{v}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
                  <Video className="w-4 h-4" />
                  <span>🎬 Ide Video/Animasi</span>
                </div>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                  {trend.assets.video.map((vi, idx) => (
                    <li key={idx}>{vi}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-500" />
              <span>Color Palette Tren</span>
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              {trend.palette.map((chip, idx) => (
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

          {/* Keywords */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-500" />
                <span>Keywords Tren</span>
              </h3>

              <button
                onClick={handleCopyAllKeywords}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {copiedKeywords ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKeywords ? "Tersalin!" : "Copy Semua Keywords"}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {trend.keywords.en.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/80 dark:border-slate-700"
                >
                  {kw}
                </span>
              ))}
              {trend.keywords.id?.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-medium border border-rose-200/80 dark:border-rose-800"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* IP Note */}
          <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-1">
            <div className="flex items-center gap-2 text-xs font-extrabold text-rose-800 dark:text-rose-300 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>⚠️ Petunjuk Keamanan IP (Strict Filter)</span>
            </div>
            <p className="text-xs text-rose-900 dark:text-rose-200 leading-relaxed font-medium">
              {trend.ipNote}
            </p>
          </div>

          {/* Sources */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Sumber Data Rujukan:
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {trend.sources.map((src, idx) => (
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
            <span>{copiedSummary ? "Ringkasan Tersalin!" : "Salin Ringkasan Tren"}</span>
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
