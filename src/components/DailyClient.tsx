"use client";
import Link from "next/link";
import type { Lesson } from "@/lib/types";
import { useProgress } from "@/lib/progress";
import StreakBadge from "@/components/StreakBadge";
interface Props { lessons: Pick<Lesson, "slug" | "order" | "title" | "goal">[]; }
export default function DailyClient({ lessons }: Props) {
  const progress = useProgress();
  const next = lessons.find(l => !progress.completed.includes(l.slug));
  const finished = lessons.filter(l => progress.completed.includes(l.slug)).length;
  const percent = Math.round(finished / lessons.length * 100);
  return <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
    <div className="page-intro"><p className="eyebrow">GÓC HỌC TẬP CỦA BẠN</p><h1 className="font-bold">Một ngày mới, một bước tiến.</h1><p className="mt-3 text-slate-600">Không cần vội. Chỉ cần dành một chút thời gian cho tiếng Anh hôm nay.</p></div>
    <div className="daily-grid"><section className="daily-card"><span className="mini-label">{next ? "ĐÃ CHỌN SẴN CHO HÔM NAY" : "MỘT CỘT MỐC ĐÁNG TỰ HÀO"}</span><div className="daily-meta"><span>{next ? `Bài ${String(next.order).padStart(2, "0")}` : "15/15 bài"}</span><span>Khoảng 5 phút</span></div><h2>{next ? next.title : "Bạn đã hoàn thành lộ trình!"}</h2><p className="mt-3">{next ? next.goal : "Tiếp tục ôn từ mỗi ngày để những điều đã học trở thành phản xạ nhé."}</p><Link href={next ? `/bai-hoc/${next.slug}` : "/on-tap"} className="primary-button">{next ? "Vào bài học" : "Ôn lại từ vựng"} <span>→</span></Link><p className="mt-6 text-xs">Nghe & đọc · Ghi nhớ · Kiểm tra nhanh</p></section>
    <aside className="learning-panel"><p className="mini-label">HÀNH TRÌNH CỦA BẠN</p><p className="progress-number mt-5">{finished}<small> / {lessons.length} bài</small></p><div role="progressbar" aria-label="Tiến độ học" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} className="my-5 h-2 overflow-hidden rounded-full bg-emerald-100"><div className="h-full rounded-full bg-emerald-600" style={{ width: `${percent}%` }} /></div><StreakBadge /><p className="study-tip">Mỗi lần quay lại là một lần bạn tiến gần hơn đến mục tiêu.</p><Link href="/lo-trinh" className="text-button mt-4 inline-block">Xem lộ trình của tôi →</Link></aside></div>
    <Link href="/on-tap" className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-white p-6"><div><h3 className="font-bold">Dành một phút ôn lại?</h3><p className="mt-1 text-sm text-slate-500">Lật thẻ từ, nghe phát âm và kiểm tra trí nhớ của bạn.</p></div><span aria-hidden="true">↗</span></Link>
  </div>;
}
