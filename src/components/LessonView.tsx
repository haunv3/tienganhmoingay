"use client";

import { useState } from "react";
import Link from "next/link";
import type { Lesson } from "@/lib/types";
import { speak } from "@/lib/speech";
import SpeakButton from "@/components/SpeakButton";
import QuizRunner from "@/components/QuizRunner";
import { completeLesson } from "@/lib/progress";

interface Props {
  lesson: Lesson;
  nextSlug: string | null;
}

const STEPS = ["Mục tiêu", "Từ vựng", "Ghi nhớ", "Kiểm tra"];

// Luồng học 4 bước: mục tiêu → từ vựng (nghe từng từ) → ghi nhớ → kiểm tra.
export default function LessonView({ lesson, nextSlug }: Props) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<{ correct: number; total: number } | null>(null);
  const [saved, setSaved] = useState(false);

  function finishQuiz(correct: number, total: number) {
    setResult({ correct, total });
    if (correct / total >= 0.6) {
      completeLesson(lesson.slug);
      setSaved(true);
    }
  }

  // ---- Màn hình kết quả ----
  if (result) {
    const passed = result.correct / result.total >= 0.6;
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <div className="text-7xl">{passed ? "🎉" : "💪"}</div>
        <h1 className="mt-4 text-3xl font-extrabold">
          {passed ? "Hoàn thành bài học!" : "Chưa qua — không sao cả!"}
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Bạn trả lời đúng <b className="text-emerald-700">{result.correct}/{result.total}</b> câu.
          {passed
            ? saved
              ? " Tiến độ đã được lưu trên máy bạn."
              : " (Lưu ý: trình duyệt này đang chặn lưu dữ liệu, tiến độ chưa được lưu.)"
            : " Hãy đọc lại phần từ vựng rồi thử lần nữa nhé — học chậm mà chắc!"}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {!passed && (
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setStep(3);
              }}
              className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
            >
              🔁 Làm lại bài kiểm tra
            </button>
          )}
          {passed && nextSlug && (
            <Link
              href={`/bai-hoc/${nextSlug}`}
              className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
            >
              Bài tiếp theo →
            </Link>
          )}
          {passed && !nextSlug && (
            <Link
              href="/on-tap"
              className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
            >
              Đi ôn tập từ vựng →
            </Link>
          )}
          <Link
            href="/lo-trinh"
            className="rounded-xl border-2 border-emerald-200 px-6 py-3 font-bold text-emerald-800 transition hover:bg-emerald-50"
          >
            Về lộ trình
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <p className="text-sm font-semibold text-emerald-600">Bài {lesson.order}</p>
      <h1 className="text-3xl font-extrabold text-slate-900">{lesson.title}</h1>

      {/* Thanh tiến trình 4 bước */}
      <ol className="mt-6 grid grid-cols-4 gap-1.5" aria-label="Tiến trình bài học">
        {STEPS.map((label, i) => (
          <li key={label}>
            <div
              className={`h-2 rounded-full ${i <= step ? "bg-emerald-500" : "bg-emerald-100"}`}
            />
            <p
              className={`mt-1 text-center text-xs font-semibold ${
                i === step ? "text-emerald-700" : "text-slate-400"
              }`}
            >
              {label}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-8">
        {/* Bước 0: mục tiêu */}
        {step === 0 && (
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">🎯 Sau bài này bạn sẽ:</h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">{lesson.goal}</p>
            <p className="mt-4 text-slate-600">{lesson.intro}</p>
          </div>
        )}

        {/* Bước 1: từ vựng */}
        {step === 1 && (
          <div>
            <h2 className="mb-4 text-xl font-bold text-slate-800">
              📚 Từ vựng — bấm 🔊 để nghe cách đọc
            </h2>
            <div className="grid gap-3">
              {lesson.vocab.map((v) => (
                <div
                  key={v.en}
                  className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm"
                >
                  <SpeakButton text={v.en} size="lg" />
                  <div className="min-w-0">
                    <p className="text-xl font-bold text-slate-900">
                      {v.en} <span className="text-sm font-medium text-slate-400">{v.ipa}</span>
                    </p>
                    <p className="text-slate-600">{v.vi}</p>
                    {v.example && (
                      <p className="mt-1 text-sm text-slate-500">
                        <button
                          type="button"
                          onClick={() => speak(v.example!)}
                          className="font-semibold text-emerald-700 underline decoration-dotted"
                        >
                          {v.example}
                        </button>
                        {v.exampleVi && <span> — {v.exampleVi}</span>}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bước 2: ghi nhớ */}
        {step === 2 && (
          <div>
            <h2 className="mb-4 text-xl font-bold text-slate-800">🧠 Ghi nhớ điều này</h2>
            <div className="grid gap-3">
              {lesson.notes.map((note, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-lg leading-relaxed text-slate-700"
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bước 3: kiểm tra */}
        {step === 3 && (
          <div>
            <h2 className="mb-4 text-xl font-bold text-slate-800">
              ✏️ Kiểm tra nhanh — trả lời hết là xong bài!
            </h2>
            <QuizRunner quiz={lesson.quiz} onFinish={finishQuiz} />
          </div>
        )}
      </div>

      {result === null && step < 3 && (
        <button
          type="button"
          onClick={() => setStep((s) => s + 1)}
          className="mt-8 w-full rounded-xl bg-emerald-600 py-4 text-lg font-bold text-white shadow-sm transition hover:bg-emerald-700"
        >
          {step === 2 ? "Làm kiểm tra →" : "Tiếp tục →"}
        </button>
      )}
    </div>
  );
}
