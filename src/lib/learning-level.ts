"use client";
import { useSyncExternalStore } from "react";
import type { LearningLevel } from "./types";
const KEY = "tam_learning_level";
let memory: LearningLevel | null = null;
const valid = (value: string | null): value is LearningLevel => ["foundation", "A1", "A2", "B1", "B2", "TOEIC", "IELTS"].includes(value ?? "");
const subscribe = (notify: () => void) => {
  window.addEventListener("level-change", notify);
  const onStorage = (event: StorageEvent) => { if (event.key === KEY || event.key === null) { memory = null; notify(); } };
  window.addEventListener("storage", onStorage);
  return () => { window.removeEventListener("level-change", notify); window.removeEventListener("storage", onStorage); };
};
export function useLearningLevel(): [LearningLevel, (level: LearningLevel) => void] {
  const level = useSyncExternalStore(subscribe, () => {
    if (memory) return memory;
    try { const stored = localStorage.getItem(KEY); return valid(stored) ? stored : "foundation"; } catch { return "foundation"; }
  }, () => "foundation" as LearningLevel);
  return [level, value => {
    memory = value;
    try { localStorage.setItem(KEY, value); } catch { /* Keep the selection in this session. */ }
    window.dispatchEvent(new Event("level-change"));
  }];
}
