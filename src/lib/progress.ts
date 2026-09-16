"use client";

import { useSyncExternalStore } from "react";

// Tiến độ học lưu trong localStorage — không cần đăng nhập.
// Đọc qua useSyncExternalStore để an toàn với SSR và tự cập nhật khi dữ liệu đổi.

const PROGRESS_KEY = "tam_progress_v1";
const SRS_KEY = "tam_srs_v1";

export interface Progress {
  completed: string[];
  lastDate: string | null;
  streak: number;
}

export interface SrsCard {
  box: number; // 1..5, hộp càng cao nhớ càng lâu
  due: string; // YYYY-MM-DD
}

// ---- store chung cho progress + SRS ----

let listeners: Array<() => void> = [];

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function today(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${mm}-${dd}`;
}

// ---- Progress ----

const SERVER_PROGRESS: Progress = { completed: [], lastDate: null, streak: 0 };
let progressCache: Progress | null = null;

function readProgress(): Progress {
  if (typeof window === "undefined") return SERVER_PROGRESS;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) {
      const p = JSON.parse(raw) as Progress;
      if (Array.isArray(p.completed)) return p;
    }
  } catch {
    // dữ liệu hỏng thì bắt đầu lại từ đầu
  }
  return SERVER_PROGRESS;
}

export function getProgress(): Progress {
  if (progressCache === null) progressCache = readProgress();
  return progressCache;
}

function saveProgress(p: Progress) {
  progressCache = p;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  emit();
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, getProgress, () => SERVER_PROGRESS);
}

export function completeLesson(slug: string) {
  const p = { ...getProgress() };
  if (!p.completed.includes(slug)) {
    p.completed = [...p.completed, slug];
  }
  const t = today();
  if (p.lastDate !== t) {
    const yesterday = addDays(t, -1);
    p.streak = p.lastDate === yesterday ? p.streak + 1 : 1;
    p.lastDate = t;
  }
  saveProgress(p);
}

export function hasStudiedToday(): boolean {
  return getProgress().lastDate === today();
}

export function resetProgress() {
  progressCache = null;
  srsCache = null;
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(SRS_KEY);
  emit();
}

// ---- Flashcards: lặp lại ngắt quãng (Leitner) ----
// Khoảng cách ôn lại theo hộp: 1 → 1 ngày, 2 → 2 ngày, ... 5 → 16 ngày
const BOX_INTERVALS = [1, 2, 4, 8, 16];

const EMPTY_SRS: Record<string, SrsCard> = {};
let srsCache: Record<string, SrsCard> | null = null;

function readSrs(): Record<string, SrsCard> {
  if (typeof window === "undefined") return EMPTY_SRS;
  try {
    const raw = localStorage.getItem(SRS_KEY);
    if (raw) return JSON.parse(raw) as Record<string, SrsCard>;
  } catch {
    // bỏ qua, bắt đầu lại
  }
  return EMPTY_SRS;
}

export function getSrs(): Record<string, SrsCard> {
  if (srsCache === null) srsCache = readSrs();
  return srsCache;
}

function saveSrs(srs: Record<string, SrsCard>) {
  srsCache = srs;
  localStorage.setItem(SRS_KEY, JSON.stringify(srs));
  emit();
}

export function useSrs(): Record<string, SrsCard> {
  return useSyncExternalStore(subscribe, getSrs, () => EMPTY_SRS);
}

export function reviewWord(word: string, remembered: boolean) {
  const srs = { ...getSrs() };
  const t = today();
  const current = srs[word];
  if (remembered) {
    const box = Math.min(5, (current?.box ?? 0) + 1);
    srs[word] = { box, due: addDays(t, BOX_INTERVALS[box - 1]) };
  } else {
    srs[word] = { box: 1, due: addDays(t, 1) };
  }
  saveSrs(srs);
}

export function isDue(card: SrsCard | undefined): boolean {
  if (!card) return true;
  return card.due <= today();
}
