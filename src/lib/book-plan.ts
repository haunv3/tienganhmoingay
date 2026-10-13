import type { Stage } from "./types";

export interface BookUnit { id: number; stage: number; title: string; slug: string; status: "ready" | "planned"; }
export const BOOK_STAGES: Stage[] = [
  { id: 1, icon: "🌱", title: "Chặng 1 — Nền tảng câu", desc: "Đại từ, to be, câu hỏi và động từ thường." },
  { id: 2, icon: "⌛", title: "Chặng 2 — Thì và phát âm", desc: "Thời gian trong câu, ngữ âm và trọng âm." },
  { id: 3, icon: "🔗", title: "Chặng 3 — Nối ý và luyện nghe", desc: "Câu hỏi, liên từ, điều kiện và nghe thông tin." },
  { id: 4, icon: "💬", title: "Chặng 4 — Giao tiếp thực tế", desc: "Nghe theo chủ đề, diễn đạt và giới thiệu bản thân." },
];
const titles = [
  "To be: khẳng định và phủ định", "Đặt câu hỏi với to be", "Hỏi với who và what", "Hỏi với where và when", "Động từ thường ở hiện tại", "Phủ định với động từ thường", "Câu hỏi với động từ thường", "Hiện tại đơn", "Nhận diện từ loại", "Hiện tại tiếp diễn", "Hiện tại đơn hay tiếp diễn?", "Quá khứ đơn: câu khẳng định", "Quá khứ đơn: phủ định và câu hỏi", "Quá khứ tiếp diễn", "Hiện tại hoàn thành", "Tương lai đơn", "Tương lai hoàn thành", "Ngữ âm và bảng IPA", "Trọng âm của từ", "Các từ để hỏi", "Nghe số và tên", "Động từ khuyết thiếu", "Nối ý với and, but, or, so, because", "Liên từ chỉ thời gian", "Liên từ chỉ sự đối lập", "Điều kiện loại 1", "Điều kiện loại 2", "Điều kiện loại 3", "Nghe và điền từ", "Nghe chép chính tả", "Nói và nghe giờ", "Nghe ngày tháng", "Nghe địa điểm", "Nghe tiền bạc", "Đại từ phản thân", "Sự hòa hợp về thì", "Giao tiếp: những tình huống đầu tiên", "Liên từ tương hỗ", "Quốc gia và châu lục", "Sở thích", "Phương tiện giao thông", "Thể thao", "Nghề nghiệp", "Công nghệ", "Giao tiếp: mở rộng hội thoại", "Ghi chú khi nghe", "Diễn đạt lại ý", "Giới thiệu bản thân và thuyết trình",
];
export const BOOK_UNITS: BookUnit[] = titles.map((title, i) => ({id: i + 1, stage: i < 9 ? 1 : i < 19 ? 2 : i < 36 ? 3 : 4, title, slug: i === 0 ? "unit-01-to-be" : `unit-${String(i + 1).padStart(2, "0")}`, status: i === 0 ? "ready" : "planned"}));
