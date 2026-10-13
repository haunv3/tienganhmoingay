"use client";

import { vocabularyId } from "@/lib/vocabulary";
import Link from "next/link";
import { useState } from "react";
import type { Vocab } from "@/lib/types";
import { isDue, reviewWord, useSrs, useProgress } from "@/lib/progress";
import SpeakButton from "@/components/SpeakButton";

interface Card extends Vocab {
  lessonTitle: string;
  lessonSlug: string;
}

interface Props {
  cards: Card[];
}

// Flashcards lặp lại ngắt quãng: từ "chưa nhớ" quay lại sớm, từ "nhớ" quay lại muộn hơn.
export default function FlashcardsClient({ cards }: Props) {
  const srs = useSrs();
  const progress = useProgress();
  const [allWords, setAllWords] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  // Thẻ đến hạn: chưa từng ôn hoặc ngày ôn đã tới.
  const eligible = cards.filter(c => allWords || progress.completed.includes(c.lessonSlug));
  const unique = [...new Map(eligible.map(c => [vocabularyId(c), c])).values()];
  const dueCards = unique.filter((c) => isDue(srs[vocabularyId(c)] ?? srs[c.en]));

  function grade(remembered: boolean) {
    reviewWord(vocabularyId(dueCards[0]), remembered);
    setRevealed(false);
    setReviewed((n) => n + 1);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <fieldset className="flex flex-wrap gap-4 mb-6 text-sm"><legend className="sr-only">Phạm vi ôn từ</legend><label className="flex gap-2 items-center"><input type="radio" name="review-scope" checked={!allWords} onChange={() => {setAllWords(false);setRevealed(false);}} />Từ đã học</label><label className="flex gap-2 items-center"><input type="radio" name="review-scope" checked={allWords} onChange={() => {setAllWords(true);setRevealed(false);}} />Khám phá toàn bộ</label></fieldset>
      {dueCards.length > 0 ? (
        <>
          <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-500">
            <span>
              Còn <b className="text-emerald-700">{dueCards.length}</b> thẻ
            </span>
            <span>Đã ôn: {reviewed}</span>
          </div>

          <div className="flashcard rounded-3xl border border-emerald-100 bg-white p-6 sm:p-10 text-center shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {dueCards[0].lessonTitle}
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <p className="break-words text-3xl sm:text-5xl font-extrabold text-slate-900">{dueCards[0].en}</p>
              <SpeakButton text={dueCards[0].en} size="lg" />
            </div>
            <p className="mt-2 text-slate-400">{dueCards[0].ipa}</p>

            {revealed ? (
              <div aria-live="polite" className="mt-6 border-t border-emerald-100 pt-6">
                <p className="text-2xl font-bold text-emerald-700">{dueCards[0].vi}</p>
                {dueCards[0].example && (
                  <p className="mt-3 text-slate-600">
                    “{dueCards[0].example}”
                    {dueCards[0].exampleVi && (
                      <span className="text-slate-400"> — {dueCards[0].exampleVi}</span>
                    )}
                  </p>
                )}
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => grade(false)}
                    className="rounded-xl border-2 border-rose-300 py-3 font-bold text-rose-600 transition hover:bg-rose-50"
                  >
                    😕 Chưa nhớ
                  </button>
                  <button
                    type="button"
                    onClick={() => grade(true)}
                    className="rounded-xl bg-emerald-600 py-3 font-bold text-white transition hover:bg-emerald-700"
                  >
                    😊 Nhớ rồi!
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="mt-8 w-full rounded-xl bg-amber-400 py-4 text-lg font-bold text-amber-950 transition hover:bg-amber-500"
              >
                👀 Lật thẻ để xem nghĩa
              </button>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Hãy thử tự nhớ nghĩa trước khi lật thẻ — nhớ như vậy sẽ lâu quên hơn nhiều!
          </p>
        </>
      ) : (
        <div className="py-8 text-center">
          <div className="text-7xl">🌟</div>
          <h1 className="mt-4 text-2xl font-extrabold">
            {reviewed > 0 ? "Ôn xong hôm nay rồi!" : !eligible.length ? "Học một bài để bắt đầu bộ từ của bạn." : "Hôm nay không có thẻ nào cần ôn!"}
          </h1>
          <p className="mt-2 text-slate-600">
            {reviewed > 0
              ? `Bạn vừa ôn ${reviewed} thẻ. Nghỉ ngơi đi, mai quay lại nhé!`
              : "Hãy học thêm bài mới để có từ để ôn, hoặc quay lại vào ngày mai."}
          </p>
          <Link href="/hoc-ngay" className="primary-button mt-6">Tiếp tục học →</Link>
        </div>
      )}
    </div>
  );
}
