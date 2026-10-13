import Link from "next/link";
import ReferenceBrowser from "@/components/ReferenceBrowser";
import { TOPICS } from "@/lib/library";
export const metadata = { title: "Giao tiếp theo chủ đề — Tiếng Anh Mỗi Ngày" };
export default function ConversationPage() {
  return <div className="mx-auto max-w-5xl px-5 py-12"><div className="page-intro"><p className="eyebrow">NHỮNG CÂU DÙNG ĐƯỢC HÔM NAY</p><h1 className="font-bold">Giao tiếp theo chủ đề</h1><p className="mt-3 text-slate-600">Chọn tình huống, nghe một câu rồi đọc theo. Thay tên, nơi chốn hoặc món đồ để nói về chính bạn.</p></div><ReferenceBrowser entries={TOPICS} /><Link href="/thu-vien/cum-tu" className="text-button mt-8 inline-block">Khám phá thêm cụm từ & mẫu câu →</Link></div>;
}
