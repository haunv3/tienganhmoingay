import type { Metadata } from "next";
import { LESSONS } from "@/lib/lessons";
import DailyClient from "@/components/DailyClient";

export const metadata: Metadata = {
  title: "Học mỗi ngày — Tiếng Anh Mỗi Ngày",
};

export default function HocNgayPage() {
  const brief = LESSONS.map((l) => ({
    slug: l.slug,
    order: l.order,
    title: l.title,
    goal: l.goal,
  }));

  return <DailyClient lessons={brief} />;
}
