import { COURSE_LESSONS } from "@/lib/curriculum";
import type { Metadata } from "next";
import { LESSONS, STAGES } from "@/lib/lessons";
import CourseRoadmap from "@/components/CourseRoadmap";
import RoadmapList from "@/components/RoadmapList";

export const metadata: Metadata = {
  title: "Lộ trình học — Tiếng Anh Mỗi Ngày",
};

export default function LoTrinhPage() {
  const brief = LESSONS.map((l) => ({
    slug: l.slug,
    stage: l.stage,
    order: l.order,
    title: l.title,
    goal: l.goal,
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="eyebrow">{COURSE_LESSONS.length} BÀI · NỀN TẢNG → B2 · TOEIC · IELTS</p>
      <h1 className="text-3xl font-extrabold text-slate-900">Lộ trình của bạn</h1>
      <p className="mt-2 text-lg text-slate-600">
        Chọn mức phù hợp, học câu ngắn trước rồi nối ý. Mỗi bài có ví dụ nghe, luyện nói/viết và kiểm tra với lời giải.
      </p>
      <div className="mt-8">
        <CourseRoadmap />
        <details className="mt-10 learning-panel"><summary className="cursor-pointer font-bold">15 bài khởi động trước đây</summary><p className="my-4 text-sm text-slate-500">Tiến độ cũ vẫn được giữ. Bạn có thể tiếp tục học hoặc ôn lại các bài này.</p><RoadmapList stages={STAGES} lessons={brief} /></details>
      </div>
    </div>
  );
}
