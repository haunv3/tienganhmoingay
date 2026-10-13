import Link from "next/link";
import { CATEGORIES } from "@/lib/library";
export const metadata = { title: "Thư viện tiếng Anh — Tiếng Anh Mỗi Ngày" };
export default function LibraryPage() {
  return <div className="mx-auto max-w-5xl px-5 py-12 reference-page"><div className="page-intro"><p className="eyebrow">TRA CỨU THEO ĐIỀU BẠN CẦN</p><h1 className="font-bold">Thư viện tiếng Anh</h1><p className="mt-3 text-slate-600">Một nơi để xem lại công thức, nghe từ mới và tìm câu phù hợp. Bạn có thể mở bất kỳ mục nào, không cần học theo thứ tự.</p></div><div className="library-category-grid">{CATEGORIES.map(category => <Link href={`/thu-vien/${category.slug}`} key={category.slug} className="learning-panel library-category"><span className="library-icon" aria-hidden="true">{category.icon}</span><h2 className="text-xl mt-5">{category.title}</h2><p className="text-sm text-slate-600 mt-2">{category.desc}</p><span className="text-button mt-5 inline-block">Mở tra cứu ↗</span></Link>)}</div><p className="text-sm text-slate-500 mt-8">Nội dung được biên soạn riêng cho app và sẽ được bổ sung theo từng bài học.</p></div>;
}
