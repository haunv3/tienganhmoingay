"use client";

import Link from "next/link";
import type { Lesson, Stage } from "@/lib/types";
import { useProgress } from "@/lib/progress";

interface Props {
  stages: Stage[];
  lessons: Pick<Lesson, "slug" | "stage" | "order" | "title" | "goal">[];
}

// Danh sách bài theo chặng. Bài mở khi là bài đầu hoặc bài trước đã hoàn thành.
export default function RoadmapList({ stages, lessons }: Props) {
  const progress = useProgress();
  const completed = progress.completed;

  const done = (slug: string) => completed.includes(slug);
  const unlocked = (i: number) => i === 0 || done(lessons[i - 1].slug);

  const finishedCount = lessons.filter((l) => done(l.slug)).length;
  const percent = Math.round((finishedCount / lessons.length) * 100);

  return (
    <div>
      <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between font-bold">
          <span>
            Bạn đã học <span className="text-emerald-600">{finishedCount}</span>/
            {lessons.length} bài
          </span>
          <span className="text-emerald-600">{percent}%</span>
        </div>
        <div className="mt-3 h-3 rounded-full bg-emerald-100">
          <div
            className="h-3 rounded-full bg-emerald-500 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="grid gap-10">
        {stages.map((stage) => (
          <section key={stage.id}>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-3xl">{stage.icon}</span>
              <h2 className="text-2xl font-extrabold text-slate-900">{stage.title}</h2>
            </div>
            <p className="mb-4 text-slate-600">{stage.desc}</p>

            <ol className="grid gap-3">
              {lessons
                .filter((l) => l.stage === stage.id)
                .map((lesson) => {
                  const index = lessons.findIndex((l) => l.slug === lesson.slug);
                  const isOpen = unlocked(index);
                  const isDone = done(lesson.slug);

                  const inner = (
                    <div
                      className={`flex items-center gap-4 rounded-2xl border p-4 shadow-sm transition ${
                        isDone
                          ? "border-emerald-300 bg-emerald-50"
                          : isOpen
                            ? "border-emerald-100 bg-white hover:border-emerald-400"
                            : "border-slate-200 bg-slate-50 opacity-70"
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-extrabold ${
                          isDone
                            ? "bg-emerald-500 text-white"
                            : isOpen
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-200 text-slate-400"
                        }`}
                      >
                        {isDone ? "✓" : isOpen ? lesson.order : "🔒"}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900">{lesson.title}</p>
                        <p className="truncate text-sm text-slate-500">{lesson.goal}</p>
                      </div>
                    </div>
                  );

                  return (
                    <li key={lesson.slug}>
                      {isOpen ? (
                        <Link href={`/bai-hoc/${lesson.slug}`}>{inner}</Link>
                      ) : (
                        <div title="Hoàn thành bài trước để mở khóa">{inner}</div>
                      )}
                    </li>
                  );
                })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
