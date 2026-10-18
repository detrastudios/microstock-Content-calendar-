import React, { useState, useEffect } from "react";
import { X, CheckCircle2, AlertTriangle, RefreshCw, TestTube2, ShieldCheck, Database, Cpu } from "lucide-react";
import { computeDataHealthSummary, runEngineUnitTests, TestResult, DataHealthSummary } from "../data/eventEngine";
import { EventItem } from "../types";

interface DataHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedYear: number;
  currentEvents: EventItem[];
  onRefreshYear: () => void;
  isRefreshing: boolean;
}

export const DataHealthModal: React.FC<DataHealthModalProps> = ({
  isOpen,
  onClose,
  selectedYear,
  currentEvents,
  onRefreshYear,
  isRefreshing,
}) => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [hasRunTests, setHasRunTests] = useState(false);
  const [summary, setSummary] = useState<DataHealthSummary | null>(null);

  useEffect(() => {
    if (isOpen) {
      const sum = computeDataHealthSummary(selectedYear, currentEvents);
      setSummary(sum);
    }
  }, [isOpen, selectedYear, currentEvents]);

  if (!isOpen || !summary) return null;

  const handleRunTests = () => {
    const res = runEngineUnitTests();
    setTestResults(res);
    setHasRunTests(true);
  };

  const passCount = testResults.filter((r) => r.passed).length;
  const failCount = testResults.length - passCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Kesehatan Data Kalender ({selectedYear})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                L1 Rule Engine (Deterministik) • L2 Seed SKB Resmi • L3 AI Findings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Event {selectedYear}</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{summary.totalEvents}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Semua wilayah</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
              <div className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Resmi (SKB / Govt)</div>
              <div className="text-2xl font-black text-emerald-800 dark:text-emerald-200 mt-1">
                {summary.verificationBreakdown.official || 0}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">Status: official</div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60">
              <div className="text-xs text-blue-700 dark:text-blue-300 font-medium">Rumus Engine (L1)</div>
              <div className="text-2xl font-black text-blue-800 dark:text-blue-200 mt-1">
                {summary.verificationBreakdown.rule || 0}
              </div>
              <div className="text-[11px] text-blue-600 dark:text-blue-400 mt-0.5">Computus & Rumus</div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60">
              <div className="text-xs text-purple-700 dark:text-purple-300 font-medium">Verified & AI</div>
              <div className="text-2xl font-black text-purple-800 dark:text-purple-200 mt-1">
                {(summary.verificationBreakdown.verified || 0) + (summary.verificationBreakdown["ai-found"] || 0)}
              </div>
              <div className="text-[11px] text-purple-600 dark:text-purple-400 mt-0.5">Dengan sumber URL</div>
            </div>
          </div>

          {/* Warnings Section if any */}
          {summary.warnings.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/70 text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-2 font-semibold text-sm mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Peringatan Kesehatan Data Tahun {selectedYear}:</span>
              </div>
              <ul className="list-disc list-inside text-xs space-y-1 opacity-90 pl-1">
                {summary.warnings.map((w, idx) => (
                  <li key={idx}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Density Table */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-500" />
              <span>Density Check Per Bulan ({selectedYear})</span>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ml-auto">
                Target: Global ≥ 12, Indonesia ≥ 6
              </span>
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-4 py-3">Bulan</th>
                    <th className="px-4 py-3 text-center">Global Count</th>
                    <th className="px-4 py-3 text-center">Indonesia Count</th>
                    <th className="px-4 py-3 text-center">Status Density</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {summary.monthlyCounts.map((m) => (
                    <tr
                      key={m.month}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-4 py-2.5 font-medium text-slate-900 dark:text-white">
                        {m.monthName}
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono font-semibold text-slate-800 dark:text-slate-200">
                        {m.globalCount} {m.globalCount >= 12 ? "✅" : "⚠️"}
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono font-semibold text-slate-800 dark:text-slate-200">
                        {m.idCount} {m.idCount >= 6 ? "✅" : "⚠️"}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {m.meetsTarget ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Memenuhi
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200">
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            Di Bawah Target
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Unit Testing Suite Section (Section 9) */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-500" />
                <span>Pengujian Otomatis Engine (Section 9)</span>
              </h3>
              <button
                onClick={handleRunTests}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-xs transition-all"
              >
                <TestTube2 className="w-3.5 h-3.5" />
                <span>Jalankan Test Suite</span>
              </button>
            </div>

            {hasRunTests && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Hasil Pengujian Engine:</span>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-600 dark:text-emerald-400">PASSED: {passCount}</span>
                    {failCount > 0 && <span className="text-red-600 dark:text-red-400">FAILED: {failCount}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {testResults.map((t, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
                        t.passed
                          ? "bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200"
                          : "bg-red-50/50 dark:bg-red-950/30 border-red-200 dark:border-red-800/50 text-red-900 dark:text-red-200"
                      }`}
                    >
                      <div className="truncate font-medium">{t.name}</div>
                      <span className="shrink-0 font-bold">{t.passed ? "PASSED" : "FAILED"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onRefreshYear}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium text-xs transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isRefreshing ? "Verifikasi..." : `Verifikasi Ulang Tahun ${selectedYear}`}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs transition-all hover:bg-slate-800 dark:hover:bg-white"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
