"use client";

import { matchesFill } from "@/lib/quiz";
import { useState } from "react";
import type { QuizQuestion, QuizMistake } from "@/lib/types";
import { speak } from "@/lib/speech";

interface Props {
  quiz: QuizQuestion[];
  onFinish: (correct: number, total: number, mistakes: QuizMistake[]) => void;
}

// Chạy lần lượt các câu hỏi: đúng/sai hiện ngay, hết bài trả kết quả.
export default function QuizRunner({ quiz, onFinish }: Props) {
  const [mistakes, setMistakes] = useState<QuizMistake[]>([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answerState, setAnswerState] = useState<"answering" | "answered">("answering");
  const [isRight, setIsRight] = useState(false);
  const [fillValue, setFillValue] = useState("");
  const [picked, setPicked] = useState<number | null>(null);

  const q = quiz[index];
  const questionText = "question" in q ? q.question : q.prompt;
  const isLast = index === quiz.length - 1;

  function accept(right: boolean, given = fillValue) {
    if (answerState !== "answering") return;
    if (!right) setMistakes(items => [...items, {question: q.type === "listen" ? `${questionText} Bạn đã nghe: ${q.word}` : questionText, given, expected: q.type === "fill" ? q.answer : q.options[q.answer], explain: q.explain ?? "Hãy xem lại ví dụ trong bài."}]);
    setAnswerState("answered");
    setIsRight(right);
    if (right) setCorrect((c) => c + 1);
  }

  function next() {
    if (isLast) {
      onFinish(correct, quiz.length, mistakes);
      return;
    }
    setIndex((i) => i + 1);
    setAnswerState("answering");
    setFillValue("");
    setPicked(null);
  }

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between text-sm font-semibold text-slate-500">
        <span>
          Câu {index + 1}/{quiz.length}
        </span>
        <span>✅ Đúng: {correct}</span>
      </div>

      <div className="mb-5 whitespace-pre-line text-lg font-bold text-slate-800">{questionText}</div>

      {q.type === "fill" && q.audio && <button type="button" onClick={() => speak(q.audio!)} aria-label="Nghe đoạn dùng cho câu điền" className="text-button mb-4">🔊 Nghe đoạn dùng cho câu này</button>}
      {q.type === "fill" && q.maxWords && <p className="mb-3 text-sm text-slate-500">Tối đa {q.maxWords} từ hoặc số theo yêu cầu câu hỏi. Thừa giới hạn không được tính đúng.</p>}
      {q.type === "fill" ? (
        <div>
          <input
            aria-label="Câu trả lời của bạn"
            autoComplete="off"
            value={fillValue}
            onChange={(e) => setFillValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && answerState === "answering" && fillValue.trim()) {
                accept(matchesFill(q, fillValue));
              }
            }}
            disabled={answerState === "answered"}
            placeholder="Gõ câu trả lời…"
            className="w-full rounded-xl border-2 border-emerald-200 px-4 py-3 text-lg focus:border-emerald-500 focus:outline-none disabled:opacity-60"
          />
          {answerState === "answering" && (
            <button
              type="button"
              onClick={() => accept(matchesFill(q, fillValue))}
              disabled={!fillValue.trim()}
              className="mt-4 w-full rounded-xl bg-emerald-600 py-3 font-bold text-white transition hover:bg-emerald-700 disabled:opacity-40"
            >
              Kiểm tra
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-3">
          {q.options.map((opt, i) => {
            let style =
              "border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50";
            if (answerState === "answered") {
              if (i === q.answer) style = "border-emerald-500 bg-emerald-50 font-bold";
              else if (i === picked) style = "border-rose-400 bg-rose-50 line-through";
              else style = "border-slate-200 bg-white opacity-60";
            }
            return (
              <button
                key={i}
                type="button"
                disabled={answerState === "answered"}
                onClick={() => {
                  setPicked(i);
                  accept(i === q.answer, opt);
                }}
                className={`rounded-xl border-2 px-4 py-3 text-left text-lg transition ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {q.type === "listen" && (
        <button
          type="button"
          onClick={() => speak(q.word)}
          className="mx-auto mb-4 mt-2 flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 text-3xl shadow-md transition hover:bg-amber-500 active:scale-95"
          aria-label="Nghe lại"
        >
          🔊
        </button>
      )}

      {answerState === "answered" && (
        <div
          role="status"
          className={`mt-5 rounded-xl p-4 ${
            isRight ? "bg-emerald-50" : "bg-rose-50"
          }`}
        >
          <p className={`font-bold ${isRight ? "text-emerald-700" : "text-rose-700"}`}>
            {isRight ? "🎉 Chính xác!" : "😅 Chưa đúng, đừng lo!"}
          </p>
          {!isRight && q.type === "fill" && (
            <p className="mt-1 text-slate-700">
              Đáp án đúng:{" "}
              <button
                type="button"
                onClick={() => speak(q.answer)}
                className="font-bold text-emerald-700 underline decoration-dotted"
              >
                {q.answer} 🔊
              </button>
            </p>
          )}
          {!isRight && q.type !== "fill" && (
            <p className="mt-1 text-slate-700">
              Đáp án đúng: <b>{q.options[q.answer]}</b>
            </p>
          )}
          {q.explain && <p className="mt-2 text-sm text-slate-600">💡 {q.explain}</p>}
          <button
            type="button"
            onClick={next}
            className="mt-4 w-full rounded-xl bg-emerald-600 py-3 font-bold text-white transition hover:bg-emerald-700"
          >
            {isLast ? "Xem kết quả" : "Câu tiếp theo →"}
          </button>
        </div>
      )}
    </div>
  );
}
