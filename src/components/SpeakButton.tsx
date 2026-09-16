"use client";

import { speak } from "@/lib/speech";

interface Props {
  text: string;
  size?: "md" | "lg";
  className?: string;
}

export default function SpeakButton({ text, size = "md", className = "" }: Props) {
  const dims = size === "lg" ? "h-14 w-14 text-2xl" : "h-10 w-10 text-lg";
  return (
    <button
      type="button"
      aria-label={`Nghe phát âm: ${text}`}
      onClick={() => speak(text)}
      className={`flex shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm transition hover:bg-emerald-700 active:scale-95 ${dims} ${className}`}
    >
      🔊
    </button>
  );
}
