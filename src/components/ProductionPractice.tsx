"use client";
import { countWords } from "@/lib/quiz";
import LessonMaterials from "./LessonMaterials";
import { useState, useSyncExternalStore } from "react";
import type { Lesson } from "@/lib/types";
import SpeakButton from "./SpeakButton";
const drafts = new Map<string,string>();
const subscribe = (notify: () => void) => { window.addEventListener("writing-draft", notify); return () => window.removeEventListener("writing-draft", notify); };
export default function ProductionPractice({ lesson }: { lesson: Lesson }) {
  const [spoken, setSpoken] = useState(false);
  const [storageBlocked, setStorageBlocked] = useState(false);
  const key = `tam_writing_${lesson.slug}`;
  const text = useSyncExternalStore(subscribe, () => {
    if (drafts.has(key)) return drafts.get(key)!;
    try { return localStorage.getItem(key) ?? ""; } catch { return ""; }
  }, () => "");
  const task = lesson.practice;
  if (!task) return null;
  const wordCount = countWords(text);
  const partialModel = task.minWords && countWords(task.model) < task.minWords;
  function save(value: string) {
    drafts.set(key,value);
    try { localStorage.setItem(key,value); setStorageBlocked(false); } catch { setStorageBlocked(true); }
    window.dispatchEvent(new Event("writing-draft"));
  }
  return <div className="grid gap-5"><section className="learning-panel"><p className="eyebrow">THỬ NÓI BẰNG CÂU CỦA BẠN</p><h2 className="text-xl">Luyện nói</h2><p className="mt-3 text-slate-600">{task.speaking}</p><p className="reference-tip">Nghe mẫu, đọc theo một lần, rồi che mẫu và tự nói. App chưa thu âm hoặc chấm phát âm; hãy tự kiểm tra xem bạn có nói được ý muốn nói không.</p><button type="button" aria-pressed={spoken} onClick={() => setSpoken(!spoken)} className="text-button mt-4">{spoken ? "✓ Tôi đã thử nói — luyện lại nếu cần" : "Đánh dấu: Tôi đã thử nói"}</button></section><section className="learning-panel"><h2 className="text-xl">Luyện viết</h2><div className="mt-4"><LessonMaterials lesson={lesson} /></div>{lesson.level === "IELTS" && lesson.slug.startsWith("ielts-writing") && lesson.reading && <div className="reference-formula"><p className="text-sm font-bold">Đề bài</p><p className="mt-2 font-normal text-sm">{lesson.reading.en}</p></div>}<p className="mt-3 text-slate-600">{task.writing}</p><label className="block mt-4"><span className="text-sm font-semibold">Câu trả lời của bạn</span><textarea value={text} onChange={e => save(e.target.value)} maxLength={12000} rows={5} className="reference-search mt-2" placeholder="Viết bằng tiếng Anh. Có thể dùng tên và tình huống giả định." /></label><p role="status" className="text-xs text-slate-500 mt-2">{text.trim() ? `${wordCount} từ (ước tính) · ` : ""}{storageBlocked ? "Bản nháp chỉ giữ trong phiên này vì trình duyệt chặn lưu." : "Bản nháp được lưu trên thiết bị nếu trình duyệt cho phép."}</p>{task.minWords && <p className="reference-tip">Mục tiêu ít nhất {task.minWords} từ{task.writingMinutes ? ` · khoảng ${task.writingMinutes} phút` : ""}. Hiện có {wordCount} từ (ước tính){wordCount < task.minWords ? `, cần thêm khoảng ${task.minWords - wordCount} từ` : ", đã đủ số từ; vẫn cần kiểm tra nội dung và ngôn ngữ"}. Đây không phải điểm chất lượng hoặc band.</p>}<details className="practice-model mt-5"><summary className="text-button cursor-pointer">{partialModel ? "Xem đoạn gợi ý để phát triển thêm" : "Xem một câu trả lời tham khảo"}</summary><div className="reference-example"><SpeakButton text={task.model} /><p>{task.model}</p></div><p className="reference-tip">{partialModel ? "Đây là đoạn gợi ý ngắn, chưa phải bài đủ độ dài; hãy phát triển thêm theo đề." : "Có nhiều cách trả lời đúng. Mẫu dùng để đối chiếu, không phải đáp án bắt buộc."} App chưa tự chấm ngữ pháp hoặc band bài viết.</p></details><fieldset className="mt-5"><legend className="font-semibold text-sm">Tự kiểm tra trước khi tiếp tục</legend>{task.checklist.map(item => <label key={item} className="flex items-start gap-3 mt-3 text-sm text-slate-600"><input type="checkbox" className="mt-1 h-4 w-4 shrink-0" />{item}</label>)}</fieldset></section></div>;
}
