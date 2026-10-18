import { EventItem, TrendItem } from "../types";

export function exportToJSON(events: EventItem[], trends: TrendItem[], filename = "microstock-calendar-data.json") {
  const data = {
    exportedAt: new Date().toISOString(),
    eventsCount: events.length,
    trendsCount: trends.length,
    events,
    trends,
  };

  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", jsonString);
  downloadAnchor.setAttribute("download", filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportToCSV(events: EventItem[], filename = "microstock-events.csv") {
  if (events.length === 0) return;

  const headers = [
    "ID",
    "Judul Event",
    "Tanggal",
    "Tanggal Selesai",
    "Wilayah",
    "Kategori",
    "Jendela Upload Ideal",
    "Ide Foto",
    "Ide Vektor",
    "Ide Video/Animasi",
    "Keywords EN",
    "Keywords ID",
    "Tips & Strategi",
    "Catatan IP/Legal",
    "Sumber"
  ];

  const escapeCSV = (field: string | undefined | null) => {
    if (!field) return '""';
    const clean = String(field).replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = events.map((event) => [
    escapeCSV(event.id),
    escapeCSV(event.title),
    escapeCSV(event.date),
    escapeCSV(event.endDate || ""),
    escapeCSV(event.region === "ID" ? "Indonesia" : "Global"),
    escapeCSV(event.category),
    escapeCSV(event.uploadWindow?.label || ""),
    escapeCSV((event.assets?.photo || []).join(" | ")),
    escapeCSV((event.assets?.vector || []).join(" | ")),
    escapeCSV((event.assets?.video || []).join(" | ")),
    escapeCSV((event.keywords?.en || []).join(", ")),
    escapeCSV((event.keywords?.id || []).join(", ")),
    escapeCSV(event.tips || ""),
    escapeCSV(event.ipNote || ""),
    escapeCSV((event.sources || []).map((s) => `${s.title} (${s.url})`).join(" ; "))
  ]);

  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
