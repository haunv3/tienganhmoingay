import type { Metadata } from "next";
import { LESSONS, STAGES } from "@/lib/lessons";
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
      <h1 className="text-3xl font-extrabold text-slate-900">🗺️ Lộ trình học</h1>
      <p className="mt-2 text-lg text-slate-600">
        Học theo thứ tự từ trên xuống. Bài sau sẽ mở khi bạn xong bài trước — chậm
        mà chắc!
      </p>
      <div className="mt-8">
        <RoadmapList stages={STAGES} lessons={brief} />
      </div>
    </div>
  );
}
