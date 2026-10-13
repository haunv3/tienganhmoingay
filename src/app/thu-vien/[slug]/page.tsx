import { vocabularyId } from "@/lib/vocabulary";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, IPA, TENSES, STRUCTURES, PHRASES, TOPICS, type ReferenceEntry } from "@/lib/library";
import { LESSONS } from "@/lib/lessons";
import { COURSE_LESSONS } from "@/lib/curriculum";
import { vocabularyTopics, SITUATION_PHRASES, SITUATION_SENTENCES } from "@/lib/library-topics";
import IpaBrowser from "@/components/IpaBrowser";
import ReferenceBrowser from "@/components/ReferenceBrowser";
const wordMap = new Map<string,ReferenceEntry>();
for (const lesson of [...LESSONS,...COURSE_LESSONS]) {
  for (const word of lesson.vocab.filter(v=>v.vi && v.vi !== "chữ cái")) {
    const id = vocabularyId(word);
    const previous = wordMap.get(id);
    const levels = [...new Set([...(previous?.levels ?? []), ...(lesson.level ? [lesson.level] : [])])];
    const topics = [...new Set([...(previous?.topics ?? []), ...vocabularyTopics(word.en, lesson.slug, word.vi)])];
    wordMap.set(id, {id:`word-${id}`,title:word.en,description:`${word.vi} · ${word.ipa}`,en:word.example || word.en,vi:word.exampleVi,topics,level:levels[0] ?? "foundation",levels});
  }
}
const vocab = [...wordMap.values()].sort((a,b)=>a.title.localeCompare(b.title,"en"));
const data: Record<string,ReferenceEntry[]> = {ipa:IPA,"cac-thi":TENSES,"cau-truc":STRUCTURES,"cum-tu":[...SITUATION_PHRASES,...PHRASES.filter(e=>!SITUATION_PHRASES.some(p=>p.title.replace(/[,.…?]/g, "")===e.title.replace(/[,.…?]/g, ""))).map(e=>({...e,topic:e.level==="B2"?"Học tập & lập luận":"Sinh hoạt & thời gian",context:"Dùng trong trao đổi hằng ngày; xem câu ví dụ để chọn ý phù hợp."}))],"tu-vung":vocab,"chu-de":[...SITUATION_SENTENCES,...TOPICS.filter(e=>!SITUATION_SENTENCES.some(p=>p.en===e.en)).map(e=>({...e,topic:e.topic==="Đi lại"?"Du lịch & đi lại":e.topic==="Làm quen"||e.topic==="Nhờ giúp đỡ"?"Làm quen & giao tiếp":e.topic,context:e.topic==="Công việc"?"Trao đổi nghề nghiệp hoặc thống nhất công việc với đồng nghiệp.":"Dùng khi trao đổi trực tiếp trong tình huống này."}))]};
export function generateStaticParams() { return CATEGORIES.map(c=>({slug:c.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; return {title:`${CATEGORIES.find(c=>c.slug===slug)?.title || "Tra cứu"} — Tiếng Anh Mỗi Ngày`}; }
export default async function ReferencePage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const category=CATEGORIES.find(c=>c.slug===slug);
  if(!category) notFound();
  return <div className={`mx-auto max-w-5xl px-5 py-12 ${slug === "ipa" ? "ipa-page" : "reference-page"}`}><Link href="/thu-vien" className="text-button">← Về thư viện</Link><div className="page-intro mt-6"><p className="eyebrow">MỞ RA, XEM LẠI, THỬ ĐỌC</p><h1 className="font-bold">{category.title}</h1><p className="mt-3 text-slate-600">{category.desc}</p>{slug==="ipa" && <details className="ipa-note"><summary>Lưu ý về giọng đọc</summary><p>Nút nghe đọc từ ví dụ, không đọc riêng từng âm. Bảng theo Anh-Anh; giọng đọc có sẵn trên thiết bị có thể khác. Chọn một giọng để luyện nhất quán.</p></details>}{slug==="cac-thi" && <p className="reference-tip">S: chủ ngữ · V: động từ nguyên mẫu · V2: quá khứ · V3: quá khứ phân từ. Công thức dưới đây là dạng khẳng định; chọn thì theo ý nghĩa và ngữ cảnh. Nhãn mức là gợi ý để tra cứu, không phải quy tắc một thì chỉ thuộc một trình độ. Mục “Mở rộng” có thể học sau khi đã nắm các cấu trúc chính.</p>}</div>{slug === "ipa" ? <IpaBrowser entries={IPA} /> : <ReferenceBrowser entries={data[slug]} />}</div>;
}
