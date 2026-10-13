"use client";
import { LEVELS } from "@/lib/curriculum";
import type { LearningLevel } from "@/lib/types";
export default function LevelPicker({ level, onChange }: { level: LearningLevel; onChange: (value: LearningLevel) => void }) {
  return <div className="track-picker">{["general", "exam"].map(kind => <fieldset key={kind}><legend className="mini-label mb-3">{kind === "general" ? "TIẾNG ANH THEO TRÌNH ĐỘ" : "LUYỆN THI · KHÔNG PHẢI MỨC CEFR"}</legend><div className="level-picker" role="group" aria-label={kind === "general" ? "Chọn trình độ học" : "Chọn lộ trình luyện thi"}>{LEVELS.filter(item => item.kind === kind).map(item => <button key={item.id} type="button" onClick={() => onChange(item.id)} aria-pressed={level === item.id} className={level === item.id ? "level-option selected" : "level-option"}><span>{item.short}</span><small>{item.tagline}</small></button>)}</div></fieldset>)}</div>;
}
