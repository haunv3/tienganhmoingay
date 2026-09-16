import type { Metadata } from "next";
import { LESSONS } from "@/lib/lessons";
import FlashcardsClient from "@/components/FlashcardsClient";

export const metadata: Metadata = {
  title: "Ôn tập flashcards — Tiếng Anh Mỗi Ngày",
};

export default function OnTapPage() {
  // Gom toàn bộ từ vựng của các bài học thành bộ thẻ ôn tập
  const cards = LESSONS.flatMap((lesson) =>
    lesson.vocab
      .filter((v) => v.vi && v.vi !== "chữ cái")
      .map((v) => ({ ...v, lessonTitle: `Bài ${lesson.order}: ${lesson.title}` })),
  );

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 pt-10 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">🃏 Ôn tập</h1>
        <p className="mt-2 text-slate-600">
          Lật thẻ, tự nhớ nghĩa rồi chọn “Nhớ” hoặc “Chưa nhớ”. Từ nào chưa nhớ sẽ
          quay lại sớm hơn để bạn học kỹ.
        </p>
      </div>
      <FlashcardsClient cards={cards} />
    </div>
  );
}
