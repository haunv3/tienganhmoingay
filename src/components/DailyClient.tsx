"use client";

import Link from "next/link";
import type { Lesson } from "@/lib/types";
import { useProgress } from "@/lib/progress";
import StreakBadge from "@/components/StreakBadge";

interface Props {
  lessons: Pick<Lesson, "slug" | "order" | "title" | "goal">[];
}

// Trang học mỗi ngày: hiện bài đầu tiên chưa hoàn thành + chuỗi ngày học.
export default function DailyClient({ lessons }: Props) {
  const progress = useProgress();
  const next = lessons.find((l) => !progress.completed.includes(l.slug));
  const finished = progress.completed.length;
  const allDone = !next;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-100">
          Học mỗi ngày
        </p>
        {allDone ? (
          <>
            <h1 className="mt-2 text-3xl font-extrabold">🏆 Bạn đã học hết lộ trình!</h1>
            <p className="mt-3 text-emerald-50">
              Quá tuyệt. Hãy tiếp tục ôn tập flashcards mỗi ngày để không quên nhé!
            </p>
            <Link
              href="/on-tap"
              className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-bold text-emerald-700 transition hover:bg-emerald-50"
            >
              Vào ôn tập →
            </Link>
          </>
        ) : (
          <>
            <h1 className="mt-2 text-3xl font-extrabold">Bài của hôm nay</h1>
            <p className="mt-4 text-2xl font-bold">
              Bài {next.order}: {next.title}
            </p>
            <p className="mt-1 text-emerald-50">{next.goal}</p>
            <p className="mt-3 text-sm text-emerald-100">⏱️ Chỉ khoảng 5 phút thôi!</p>
            <Link
              href={`/bai-hoc/${next.slug}`}
              className="mt-6 inline-block rounded-xl bg-white px-8 py-3 text-lg font-bold text-emerald-700 shadow transition hover:bg-emerald-50"
            >
              Học ngay →
            </Link>
          </>
        )}
      </div>

      <div className="mt-6 flex flex-col items-start gap-3">
        <StreakBadge />
        <p className="text-slate-600">
          Tiến độ tổng:{" "}
          <b className="text-emerald-700">
            {finished}/{lessons.length}
          </b>{" "}
          bài ·{" "}
          <Link href="/on-tap" className="font-semibold text-emerald-600 hover:underline">
            ôn tập từ vựng
          </Link>
        </p>
      </div>
    </div>
  );
}
