import type { LearningLevel, Lesson, Stage } from "./types";
import unitOne from "../../content/course/unit-01-to-be.json";
import advanced from "../../content/course/advanced.json";
import authored from "../../content/course/levels.json";

export const LEVELS: { id: LearningLevel; title: string; short: string; desc: string; outcome: string; kind: "general" | "exam"; tagline: string }[] = [
  { id: "foundation", kind: "general", tagline: "Làm quen từ đầu", title: "Nền tảng — Bắt đầu từ số 0", short: "Nền tảng", desc: "Chào hỏi, chữ và âm, số, từ loại, đại từ và cụm danh từ.", outcome: "Nhận biết từ quen thuộc, đọc theo mẫu và biết nhờ người khác nói chậm." },
  { id: "A1", kind: "general", tagline: "Câu ngắn, việc quen", title: "A1 — Những câu đầu tiên", short: "A1", desc: "Giới thiệu bản thân, thói quen, hỏi đáp và các tình huống đơn giản.", outcome: "Dùng câu ngắn để trao đổi thông tin cá nhân và nhu cầu quen thuộc." },
  { id: "A2", kind: "general", tagline: "Nối ý, kể chuyện", title: "A2 — Giao tiếp hằng ngày", short: "A2", desc: "Kể chuyện đã qua, nói kế hoạch, so sánh, đặt dịch vụ và viết tin nhắn.", outcome: "Trao đổi trong tình huống quen thuộc và kết nối ý bằng những câu đơn giản." },
  { id: "B1", kind: "general", tagline: "Kể chuyện, nêu lý do", title: "B1 — Tự tin trao đổi", short: "B1", desc: "Kể chuyện, giả định, tường thuật và email có lý do.", outcome: "Kết nối ý để kể trải nghiệm, giải thích kế hoạch và nêu quan điểm về việc quen thuộc." },
  { id: "B2", kind: "general", tagline: "Lập luận, phản biện", title: "B2 — Diễn đạt có chiều sâu", short: "B2", desc: "Suy luận, đánh giá bằng chứng, thương lượng và lập luận.", outcome: "Diễn đạt quan điểm rõ, xem xét ý đối lập và nhận biết giới hạn của bằng chứng." },
  { id: "TOEIC", kind: "exam", tagline: "Listening & Reading", title: "TOEIC — Listening & Reading", short: "TOEIC", desc: "Bài luyện ngắn cho 7 dạng Listening & Reading trong ngữ cảnh công việc.", outcome: "Làm quen cách xử lý từng dạng câu hỏi. Không quy đổi điểm luyện thành điểm TOEIC." },
  { id: "IELTS", kind: "exam", tagline: "Academic · 4 kỹ năng", title: "IELTS — Academic", short: "IELTS", desc: "Listening, Reading, Academic Writing Task 1/2 và Speaking Parts 1–3.", outcome: "Luyện chiến lược và tự đối chiếu bài nói/viết. Không tự chấm band IELTS." },
];
export const GENERAL_LEVELS = LEVELS.filter(level => level.kind === "general");
export const EXAM_TRACKS = LEVELS.filter(level => level.kind === "exam");
export const COURSE_STAGES: Stage[] = GENERAL_LEVELS.map((level, i) => ({ id: i + 1, icon: ["🌱", "💬", "🧭", "🗣", "🔎"][i], title: level.title, desc: level.desc }));
export const COURSE_LESSONS: Lesson[] = ([...authored, unitOne, ...advanced] as Lesson[]).sort((a,b) => a.stage - b.stage || a.order - b.order);
export const COURSE_UNITS = COURSE_LESSONS.map(lesson => ({ id: lesson.slug, stage: lesson.stage, level: lesson.level!, order: lesson.order, title: lesson.title, slug: lesson.slug, status: "ready" as const, checkpoint: Boolean(lesson.checkpoint) }));
export function nextLesson(slug: string): Lesson | undefined {
  const index = COURSE_LESSONS.findIndex(l => l.slug === slug);
  if (index < 0) return undefined;
  const current = COURSE_LESSONS[index];
  const next = COURSE_LESSONS[index + 1];
  const track = LEVELS.find(level => level.id === current.level);
  if (!next || (track?.kind === "exam" && next.level !== current.level)) return undefined;
  if (track?.kind === "general" && LEVELS.find(level => level.id === next.level)?.kind !== "general") return undefined;
  return next;
}
export function lessonPassed(correct: number, total: number, passMark = 0.8) {
  return total > 0 && correct / total >= passMark;
}
