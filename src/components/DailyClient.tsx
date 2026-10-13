"use client";
import Link from "next/link";
import { COURSE_LESSONS, LEVELS, GENERAL_LEVELS } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";
import { useLearningLevel } from "@/lib/learning-level";
import StreakBadge from "./StreakBadge";
import LevelPicker from "./LevelPicker";
export default function DailyClient() {
  const progress = useProgress();
  const [level, setLevel] = useLearningLevel();
  const lessons = COURSE_LESSONS.filter(l => l.level === level);
  const next = lessons.find(l => !progress.completed.includes(l.slug));
  const finished = lessons.filter(l => progress.completed.includes(l.slug)).length;
  const percent = Math.round(finished / lessons.length * 100);
  const selected = LEVELS.find(l => l.id === level)!;
  const nextLevel = selected.kind === "general" ? GENERAL_LEVELS[GENERAL_LEVELS.findIndex(l => l.id === level) + 1] : undefined;
  return <div className="mx-auto max-w-5xl px-5 py-12"><div className="page-intro"><p className="eyebrow">HỌC THEO NHỊP CỦA BẠN</p><h1 className="font-bold">Một ngày mới, một bước tiến.</h1><p className="mt-3 text-slate-600">Ôn một phút bài trước, học một phần mới, rồi thử dùng một câu. Chọn lộ trình phù hợp để bắt đầu.</p></div><LevelPicker level={level} onChange={setLevel} /><div className="daily-grid mt-6"><section className="daily-card"><span className="mini-label">{next ? "BÀI TIẾP THEO TRONG LỘ TRÌNH" : "BẠN ĐÃ HOÀN THÀNH CÁC BÀI Ở MỨC NÀY"}</span><div className="daily-meta"><span>{selected.short} · {next ? `Bài ${next.order}` : `${finished}/${lessons.length} bài`}</span><span>{next ? `Khoảng ${next.minutes} phút · có thể chia nhỏ` : "Tiếp tục luyện nói và ôn từ"}</span></div><h2>{next ? next.title : "Giữ lại những điều đã học."}</h2><p className="mt-3">{next ? next.goal : "Hãy ôn lại những câu còn nhầm và tự thử nói, viết trước khi chuyển mức. Hoàn thành lộ trình không tự động xác nhận trình độ CEFR hoặc điểm thi."}</p>{next ? <Link href={`/bai-hoc/${next.slug}`} className="primary-button mt-6">Vào bài học →</Link> : nextLevel ? <button type="button" onClick={() => setLevel(nextLevel.id)} className="primary-button mt-6">Khám phá {nextLevel.short} →</button> : <Link href={selected.kind === "exam" ? "/luyen-thi" : "/giao-tiep"} className="primary-button mt-6">{selected.kind === "exam" ? "Chọn mục tiêu luyện tiếp →" : "Luyện giao tiếp →"}</Link>}<p className="mt-6 text-xs">Nghe từ · Hiểu mẫu · Dùng câu · Kiểm tra</p></section><aside className="learning-panel"><p className="mini-label">TIẾN ĐỘ {selected.short}</p><p className="progress-number mt-5">{finished}<small> / {lessons.length} bài</small></p><div role="progressbar" aria-label={`Tiến độ ${selected.short}`} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} className="my-5 h-2 rounded-full bg-emerald-100"><div className="h-full rounded-full bg-emerald-600" style={{width:`${percent}%`}} /></div><StreakBadge /><p className="study-tip">{selected.outcome}</p><Link href="/lo-trinh" className="text-button mt-4 inline-block">Chọn bài hoặc xem lộ trình →</Link></aside></div><Link href="/on-tap" className="course-row mt-6"><div><h3 className="font-bold">Ôn những từ đã học</h3><p className="text-sm text-slate-500">Chỉ ôn từ từ các bài bạn đã hoàn thành, hoặc chọn khám phá toàn bộ.</p></div><span className="ml-auto">↗</span></Link></div>;
}
