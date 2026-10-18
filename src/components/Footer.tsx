import React from "react";
import { Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-12 py-6 border-t border-slate-200/80 dark:border-slate-800 text-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-2">
        <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-500/20">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>✨ Pro Tip: Upload aset 2-3 bulan sebelum event untuk visibilitas maksimal!</span>
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          Microstock Content Calendar &copy; 2026. Dioptimalkan untuk kontributor foto, vektor, dan video animasi.
        </p>
      </div>
    </footer>
  );
};
