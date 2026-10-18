import { EventItem, TrendItem, VerificationLevel } from "../types";

export const DATA_VERSION = "v2.0";
const DB_NAME = "MicrostockCalendarDB";
const DB_VERSION = 2;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB not supported"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: any) => {
      const db = request.result;
      if (!db.objectStoreNames.contains("events")) {
        db.createObjectStore("events");
      }
      if (!db.objectStoreNames.contains("enrichments")) {
        db.createObjectStore("enrichments");
      }
      if (!db.objectStoreNames.contains("trends")) {
        db.createObjectStore("trends");
      }
      if (!db.objectStoreNames.contains("health")) {
        db.createObjectStore("health");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getIDBEvents(year: number, region: string): Promise<EventItem[] | null> {
  try {
    const db = await openDB();
    const key = `${DATA_VERSION}_${year}_${region}`;
    return new Promise((resolve) => {
      const tx = db.transaction("events", "readonly");
      const store = tx.objectStore("events");
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    console.warn("IndexedDB read failed, falling back to null:", e);
    return null;
  }
}

export async function setIDBEvents(year: number, region: string, events: EventItem[]): Promise<void> {
  try {
    const db = await openDB();
    const key = `${DATA_VERSION}_${year}_${region}`;
    const tx = db.transaction("events", "readwrite");
    const store = tx.objectStore("events");
    store.put(events, key);
  } catch (e) {
    console.warn("IndexedDB write failed:", e);
  }
}

export async function getIDBEnrichment(eventKey: string): Promise<Partial<EventItem> | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction("enrichments", "readonly");
      const store = tx.objectStore("enrichments");
      const req = store.get(eventKey);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    return null;
  }
}

export async function setIDBEnrichment(eventKey: string, data: Partial<EventItem>): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction("enrichments", "readwrite");
    const store = tx.objectStore("enrichments");
    store.put(data, eventKey);
  } catch (e) {
    console.warn("IndexedDB write enrichment failed:", e);
  }
}

export async function clearIDBCache(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(["events", "trends"], "readwrite");
    tx.objectStore("events").clear();
    tx.objectStore("trends").clear();
  } catch (e) {
    console.warn("Failed to clear IndexedDB cache:", e);
  }
}

export async function getEventsFromDb(year: number, region: string): Promise<EventItem[] | null> {
  return getIDBEvents(year, region);
}

export async function saveEventsToDb(events: EventItem[]): Promise<void> {
  if (!events || events.length === 0) return;
  const sample = events[0];
  const year = sample.date ? Number(sample.date.substring(0, 4)) : 2026;
  await setIDBEvents(year, "BOTH", events);
}

