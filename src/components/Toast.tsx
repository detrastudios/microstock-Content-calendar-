import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "info" | "error";
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: "bg-emerald-800 text-emerald-100 border border-emerald-600 dark:bg-emerald-950 dark:text-emerald-200",
    info: "bg-blue-800 text-blue-100 border border-blue-600 dark:bg-blue-950 dark:text-blue-200",
    error: "bg-rose-800 text-rose-100 border border-rose-600 dark:bg-rose-950 dark:text-rose-200",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl transition-all duration-200 animate-slide-up text-sm font-medium border text-slate-100 bg-slate-900 border-slate-700 dark:bg-slate-800 dark:border-slate-700">
      {type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
      {type === "error" && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
      {type === "info" && <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />}
      <span className="leading-snug">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-slate-200 focus:outline-none p-1 rounded-lg hover:bg-slate-800"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
