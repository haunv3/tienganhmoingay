"use client";

import LessonMaterials from "@/components/LessonMaterials";
import ProductionPractice from "@/components/ProductionPractice";
import { lessonPassed, nextLesson } from "@/lib/curriculum";
import { useLearningLevel } from "@/lib/learning-level";
import { useLessonStep } from "@/lib/lesson-session";
import { useState } from "react";
import Link from "next/link";
import type { Lesson, QuizMistake } from "@/lib/types";
import { speak } from "@/lib/speech";
import SpeakButton from "@/components/SpeakButton";
import QuizRunner from "@/components/QuizRunner";
import { completeLesson } from "@/lib/progress";

interface Props {
  lesson: Lesson;
  nextSlug: string | null;
}

const BASIC_STEPS = ["Mục tiêu", "Từ vựng", "Lý thuyết", "Kiểm tra"];

// Luồng học 4 bước: mục tiêu → từ vựng (nghe từng từ) → ghi nhớ → kiểm tra.
export default function LessonView({ lesson, nextSlug }: Props) {
  const STEPS = lesson.practice ? ["Mục tiêu", "Từ vựng", "Hiểu mẫu", "Thử dùng", "Kiểm tra"] : BASIC_STEPS;
  const quizStep = STEPS.length - 1;
  const [step, setStep] = useLessonStep(lesson.slug, quizStep);
  const [, setLevel] = useLearningLevel();
  const isExam = lesson.level === "TOEIC" || lesson.level === "IELTS";
  const passMark = lesson.passMark ?? 0.6;
  const [result, setResult] = useState<{ correct: number; total: number; mistakes: QuizMistake[] } | null>(null);
  const [saved, setSaved] = useState(false);

  function finishQuiz(correct: number, total: number, mistakes: QuizMistake[]) {
    setResult({ correct, total, mistakes });
    if (lessonPassed(correct, total, passMark)) {
      setSaved(completeLesson(lesson.slug));
    }
  }

  // ---- Màn hình kết quả ----
  if (result) {
    const passed = lessonPassed(result.correct, result.total, passMark);
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

        {result.mistakes.length > 0 && <section className="mt-6 text-left"><h2 className="text-xl mb-4">Những câu cần ôn lại</h2><div className="grid gap-3">{result.mistakes.map((mistake, i) => <div className="learning-panel" key={i}><p className="font-semibold">{mistake.question}</p><p className="text-sm text-slate-500 mt-2">Bạn chọn: {mistake.given || "Chưa trả lời"}</p><p className="text-emerald-700 text-sm mt-1">Đáp án: {mistake.expected}</p><p className="reference-tip">{mistake.explain}</p></div>)}</div></section>}
        {(lesson.checkpoint || isExam) && <p className="reference-tip">{isExam ? "Đây là điểm đúng/sai của bài luyện rút gọn, không quy đổi thành điểm TOEIC hoặc band IELTS. Nói/viết cần đánh giá riêng." : "Đây là bài ôn của lộ trình, không phải bài thi xác nhận trình độ CEFR. Hãy tự đối chiếu cả phần nói và viết."}</p>}
        <p className="mt-3 text-sm text-slate-500">Cần ít nhất {Math.ceil(result.total * passMark)}/{result.total} câu đúng ({Math.round(passMark * 100)}%).</p>
        <button type="button" onClick={() => { setResult(null); setStep(2); }} className="text-button mt-5">Xem lại lý thuyết và luyện tập →</button>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {!passed && (
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setStep(quizStep);
              }}
              className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
            >
              🔁 Làm lại bài kiểm tra
            </button>
          )}
          {passed && nextSlug && (
            <Link
              href={`/bai-hoc/${nextSlug}`}
              onClick={() => { const next = nextLesson(lesson.slug); if (next?.level) setLevel(next.level); }}
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
    <div className="lesson-view mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <Link href="/lo-trinh" className="text-button">← Về lộ trình</Link>
      <p className="eyebrow mt-6">{lesson.level === "foundation" ? "NỀN TẢNG" : lesson.level} {lesson.checkpoint ? "· ÔN TỔNG HỢP" : ""} · BÀI {String(lesson.order).padStart(2, "0")} · {lesson.minutes} PHÚT</p>
      <h1 className="text-3xl font-extrabold text-slate-900">{lesson.title}</h1>

      {/* Thanh tiến trình 4 bước */}
      <ol className="mt-6 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${STEPS.length}, minmax(0, 1fr))` }} aria-label="Tiến trình bài học">
        {STEPS.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined}>
            <div
              className={`h-2 rounded-full ${i <= step ? "bg-emerald-500" : "bg-emerald-100"}`}
            />
            <button
              type="button"
              disabled={i > step}
              onClick={() => setStep(i)}
              className={`mt-1 text-center text-xs font-semibold ${
                i === step ? "text-emerald-700" : "text-slate-400"
              }`}
            >
              {label}
            </button>
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
            {isExam && <Link href="/luyen-thi" className="text-button mt-4 inline-block">Cấu trúc thi và giới hạn bài luyện →</Link>}
            {lesson.level && <p className="reference-tip">Mục tiêu kiểm tra: {Math.round(passMark * 100)}% câu đúng. Luyện nói và viết được tự đối chiếu với mẫu.</p>}
            <p className="mt-4 text-sm text-slate-500">Bước học được ghi nhớ trên thiết bị nếu trình duyệt cho phép lưu. Khi quay lại phần kiểm tra, bạn sẽ làm lại từ câu đầu.</p>
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
            <LessonMaterials lesson={lesson} />
            <div className="grid gap-4 mb-6">
              {lesson.sections?.map(section => <section className="learning-panel" key={section.title}><h3 className="font-bold text-lg">{section.title}</h3><p className="mt-2 text-sm text-slate-600">{section.body}</p>{section.formula && <p className="reference-formula">{section.formula}</p>}<div className="grid gap-3 mt-4">{section.examples.map(example => <div className="flex items-center gap-3" key={example.en}><SpeakButton text={example.en} /><div><p className="font-semibold">{example.en}</p><p className="text-sm text-slate-500">{example.vi}</p></div></div>)}</div></section>)}
            </div>
            {lesson.reading && <section className="learning-panel mb-6"><p className="eyebrow">ĐỌC VÀ NGHE TRONG NGỮ CẢNH</p><h3 className="font-bold text-lg">{lesson.reading.title}</h3><div className="reference-example"><SpeakButton text={lesson.reading.en} /><p>{lesson.reading.en}</p></div><details className="mt-4"><summary className="text-button cursor-pointer">Xem nghĩa tiếng Việt sau khi thử hiểu</summary><p className="mt-3 text-sm text-slate-500">{lesson.reading.vi}</p></details></section>}
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
        {lesson.practice && step === 3 && <ProductionPractice key={lesson.slug} lesson={lesson} />}
        {step === quizStep && (
          <div>
            <h2 className="mb-4 text-xl font-bold text-slate-800">
              ✏️ Kiểm tra — đọc lời giải sau mỗi câu
            </h2>
            <LessonMaterials lesson={lesson} />
            {lesson.quizContext && lesson.reading && <section className="learning-panel mb-5"><h3 className="font-bold">Văn bản dùng cho bài luyện</h3><p className="mt-3 whitespace-pre-line text-sm">{lesson.reading.en}</p></section>}
            <QuizRunner quiz={lesson.quiz} onFinish={finishQuiz} />
          </div>
        )}
      </div>

      {lesson.references && <nav aria-label="Tra cứu cho bài học" className="flex flex-wrap gap-4 mt-6">{lesson.references.map(ref => <Link href={ref.href} key={ref.href} className="text-button">{ref.label} ↗</Link>)}</nav>}
      {step > 0 && (
        <button type="button" onClick={() => setStep(step - 1)} className="text-button mt-6">← Xem lại bước trước</button>
      )}
      {result === null && step < quizStep && (
        <button
          type="button"
          onClick={() => setStep(step + 1)}
          className="mt-8 w-full rounded-xl bg-emerald-600 py-4 text-lg font-bold text-white shadow-sm transition hover:bg-emerald-700"
        >
          {step === quizStep - 1 ? "Làm kiểm tra →" : step === 2 && lesson.practice ? "Thử nói và viết →" : "Tiếp tục →"}
        </button>
      )}
    </div>
  );
}
