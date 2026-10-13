"use client";
import { useSyncExternalStore } from "react";
const memory = new Map<string, number>();
const subscribe = (notify: () => void) => {
  window.addEventListener("lesson-step", notify);
  const onStorage = (event: StorageEvent) => { if (event.key === null) memory.clear(); else memory.delete(event.key); notify(); };
  window.addEventListener("storage", onStorage);
  return () => { window.removeEventListener("lesson-step", notify); window.removeEventListener("storage", onStorage); };
};
export function useLessonStep(slug: string, maxStep = 3): [number, (step: number) => void] {
  const key = `tam_step_${slug}`;
  const step = useSyncExternalStore(subscribe, () => {
    let value = memory.get(key) ?? 0;
    try { const stored = localStorage.getItem(key); if (!memory.has(key) && stored !== null) value = Number(stored); } catch { /* Keep session state in memory. */ }
    return Number.isInteger(value) && value >= 0 && value <= maxStep ? value : 0;
  }, () => 0);
  return [step, (next: number) => {
    memory.set(key, next);
    try { localStorage.setItem(key, String(next)); } catch { /* Continue without persistent storage. */ }
    window.dispatchEvent(new Event("lesson-step"));
  }];
}
