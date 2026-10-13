import type { Metadata } from "next";
import { COURSE_LESSONS } from "@/lib/curriculum";
import { LESSONS } from "@/lib/lessons";
import FlashcardsClient from "@/components/FlashcardsClient";

export const metadata: Metadata = {
  title: "Ôn tập flashcards — Tiếng Anh Mỗi Ngày",
};

export default function OnTapPage() {
  // Gom toàn bộ từ vựng của các bài học thành bộ thẻ ôn tập
  const cards = [...COURSE_LESSONS, ...LESSONS].flatMap((lesson) =>
    lesson.vocab
      .filter((v) => v.vi && v.vi !== "chữ cái")
      .map((v) => ({ ...v, lessonTitle: `${lesson.level === "foundation" ? "Nền tảng" : lesson.level ?? "Khởi động"} · Bài ${lesson.order}: ${lesson.title}`, lessonSlug: lesson.slug })),
  );

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 pt-10 text-center">
        <p className="eyebrow justify-center">GÓC ÔN TẬP CỦA BẠN</p>
        <h1 className="text-3xl font-extrabold text-slate-900">Nhớ thêm một chút, mỗi ngày.</h1>
        <p className="mt-2 text-slate-600">
          Lật thẻ, tự nhớ nghĩa rồi chọn “Nhớ” hoặc “Chưa nhớ”. Từ nào chưa nhớ sẽ
          quay lại sớm hơn để bạn học kỹ.
        </p>
      </div>
      <FlashcardsClient cards={cards} />
    </div>
  );
}
