"use client";
import Link from "next/link";
import { COURSE_LESSONS, LEVELS } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";
import { useLearningLevel } from "@/lib/learning-level";
import LevelPicker from "./LevelPicker";
export default function CourseRoadmap() {
  const progress = useProgress();
  const [level, setLevel] = useLearningLevel();
  const selected = LEVELS.find(l => l.id === level)!;
  const lessons = COURSE_LESSONS.filter(l => l.level === level);
  const done = lessons.filter(l => progress.completed.includes(l.slug)).length;
  const percent = Math.round(done / lessons.length * 100);
  const next = lessons.find(l => !progress.completed.includes(l.slug));
  return <div><LevelPicker level={level} onChange={setLevel} /><section className="learning-panel my-6"><p className="eyebrow">{selected.short} · {lessons.length} BÀI CÓ THỂ HỌC</p><h2 className="text-2xl">{selected.title}</h2><p className="text-sm text-slate-600 mt-3">{selected.outcome}</p><div className="flex justify-between text-sm font-semibold mt-5"><span>{done}/{lessons.length} bài hoàn thành</span><span>{percent}%</span></div><div role="progressbar" aria-label={`Tiến độ ${selected.short}`} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} className="h-2 rounded-full bg-emerald-100 mt-3"><div className="h-2 rounded-full bg-emerald-600" style={{width:`${percent}%`}} /></div>{next && <Link href={`/bai-hoc/${next.slug}`} className="primary-button mt-5">{done ? "Tiếp tục học" : "Bắt đầu lộ trình"} →</Link>}<p className="reference-tip">{selected.kind === "exam" ? "Bài luyện tự biên soạn, rút gọn; không phải đề chính thức. Điểm đúng/sai không quy đổi điểm TOEIC hoặc band IELTS. Nói/viết cần đánh giá riêng." : "Nhãn mức định hướng nội dung theo CEFR; hoàn thành bài không xác nhận năng lực ở mức đó."}</p></section><ol className="grid gap-3">{lessons.map(lesson => <li key={lesson.slug}><Link className={`course-row ${lesson.checkpoint ? "checkpoint-row" : ""}`} href={`/bai-hoc/${lesson.slug}`}><span className="course-number">{progress.completed.includes(lesson.slug) ? "✓" : String(lesson.order).padStart(2,"0")}</span><div><p className="font-bold">{lesson.title}</p><p className="text-sm text-slate-500">{lesson.checkpoint ? "Ôn tổng hợp" : `${lesson.minutes} phút · có nghe, đọc, luyện nói/viết`}{progress.completed.includes(lesson.slug) ? " · đã hoàn thành" : ""}</p></div><span className="ml-auto" aria-hidden="true">→</span></Link></li>)}</ol><p className="text-sm text-slate-500 mt-6">Chưa biết chọn mức nào? Bắt đầu từ Nền tảng. Nếu bài đã quen, bạn có thể chọn A1–B2 và học bài ôn cuối mức để tìm phần cần củng cố.</p></div>;
}
