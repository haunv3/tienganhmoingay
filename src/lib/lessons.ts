import type { Lesson, Stage } from "./types";

import l01 from "../../content/lessons/01-bang-chu-cai.json";
import l02 from "../../content/lessons/02-phat-am-co-ban.json";
import l03 from "../../content/lessons/03-chao-hoi.json";
import l04 from "../../content/lessons/04-cam-on-xin-loi.json";
import l05 from "../../content/lessons/05-so-dem.json";
import l06 from "../../content/lessons/06-gia-dinh.json";
import l07 from "../../content/lessons/07-do-an-uong.json";
import l08 from "../../content/lessons/08-mau-sac.json";
import l09 from "../../content/lessons/09-thu-trong-tuan.json";
import l10 from "../../content/lessons/10-trong-nha.json";
import l11 from "../../content/lessons/11-i-am.json";
import l12 from "../../content/lessons/12-cau-hoi-what.json";
import l13 from "../../content/lessons/13-cau-hoi-where.json";
import l14 from "../../content/lessons/14-my-your.json";
import l15 from "../../content/lessons/15-tong-ket.json";

export const STAGES: Stage[] = [
  {
    id: 1,
    icon: "🌱",
    title: "Chặng 1 — Khởi động",
    desc: "Làm quen chữ cái, phát âm và những câu chào đầu tiên. Không cần biết gì trước cả!",
  },
  {
    id: 2,
    icon: "🧺",
    title: "Chặng 2 — Từ vựng sống còn",
    desc: "Những từ bạn cần nhất mỗi ngày: số, gia đình, đồ ăn, màu sắc, đồ vật.",
  },
  {
    id: 3,
    icon: "🚀",
    title: "Chặng 3 — Câu đầu tiên",
    desc: "Ghép từ thành câu: giới thiệu bản thân, hỏi và trả lời câu hỏi đơn giản.",
  },
];

const raw = [
  l01, l02, l03, l04, l05, l06, l07, l08, l09,
  l10, l11, l12, l13, l14, l15,
];

export const LESSONS: Lesson[] = (raw as unknown as Lesson[]).sort(
  (a, b) => a.order - b.order,
);

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function getStage(stageId: number): Stage | undefined {
  return STAGES.find((s) => s.id === stageId);
}
