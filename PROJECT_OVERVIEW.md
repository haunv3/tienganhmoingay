# PROJECT OVERVIEW — Tiếng Anh Mỗi Ngày

> File này dành cho AI/developer mới tham gia: đọc xong hiểu ngay dự án là gì, code ở đâu, sửa thế nào. Giữ file này cập nhật khi kiến trúc thay đổi.

## 1. Dự án là gì?

Website học tiếng Anh cho người Việt **mất gốc**. Triết lý: 100% giao diện tiếng Việt, mỗi bài ~5 phút, không cần đăng nhập, nghe phát âm mọi từ. Tiếng Việt là ngôn ngữ của toàn bộ UI, comment và tài liệu.

- Stack: **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4**, không backend.
- Progress/flashcard state: **localStorage** (keys: `tam_progress_v1`, `tam_srs_v1`).
- Phát âm: **Web Speech API** (`src/lib/speech.ts`), rate 0.85.
- Toàn bộ trang là tĩnh (SSG), deploy Vercel/Netlify không cần config.

## 2. Bản đồ code

```
content/lessons/*.json   ← NỘI DUNG 15 BÀI HỌC (soạn/sửa bài ở đây, KHÔNG hardcode vào component)
src/lib/
  types.ts               Lesson, Vocab, QuizQuestion (union: choice | fill | listen), Stage
  lessons.ts             STAGES metadata + LESSONS[] (import JSON, sort theo order) — THÊM BÀI MỚI Ở ĐÂY
  progress.ts            "use client" — store localStorage qua useSyncExternalStore:
                           useProgress() → { completed: string[], lastDate, streak }
                           useSrs()     → { [word]: { box: 1..5, due: "YYYY-MM-DD" } }
                           completeLesson(), reviewWord(), isDue(), resetProgress()
                           BOX_INTERVALS = [1,2,4,8,16] ngày (Leitner)
  speech.ts              speak(text) — TTS tiếng Anh
src/components/          Tất cả client components
  Header.tsx             Nav + menu mobile (usePathname active state)
  LessonView.tsx         Luồng 4 bước: mục tiêu(0) → từ vựng(1) → ghi nhớ(2) → quiz(3)
                         Đậu ≥60% → completeLesson() + màn kết quả
  QuizRunner.tsx         Chạy lần lượt câu hỏi, phản hồi đúng/sai ngay, trả onFinish(correct, total)
  FlashcardsClient.tsx   Lật thẻ → tự đánh giá "Nhớ/Chưa nhớ" → reviewWord()
  RoadmapList.tsx        Danh sách bài theo chặng, khóa/mở theo thứ tự
  DailyClient.tsx        Bài hôm nay = bài đầu chưa hoàn thành
  StreakBadge.tsx        🔥 streak (đọc useProgress)
  SpeakButton.tsx        Nút 🔊
src/app/
  page.tsx               Trang chủ (server component, tĩnh)
  lo-trinh/page.tsx      → RoadmapList
  bai-hoc/[slug]/page.tsx  Server: getLesson + generateStaticParams → LessonView
  hoc-ngay/page.tsx      → DailyClient (truyền lessons rút gọn qua props)
  on-tap/page.tsx        → FlashcardsClient (gom vocab toàn bộ lessons thành cards)
```

## 3. Quy ước quan trọng (đừng phá vỡ)

1. **Kiến trúc server/client**: các trang là server components đọc `src/lib/lessons.ts` (import JSON trực tiếp, không dùng fs — để deploy không lo thiếu file). Mọi thứ chạm localStorage/TTS phải là client component.
2. **Đọc localStorage chỉ qua `useProgress()`/`useSrs()`** (useSyncExternalStore trong `progress.ts`). KHÔNG gọi setState trong useEffect để đọc localStorage — lint `react-hooks/set-state-in-effect` sẽ báo lỗi. Muốn sửa state → gọi `completeLesson()`/`reviewWord()` (chúng tự `emit()` cho mọi subscriber).
3. **Thêm bài học**: tạo `content/lessons/NN-slug.json` (đúng schema của bài cũ) + thêm import và đẩy vào mảng `raw` trong `src/lib/lessons.ts`. `order` tăng dần, `stage` ∈ 1–3. Quiz: mỗi bài 4–5 câu, trộn 3 dạng.
4. **JSON → type**: JSON import không infer được literal union (`"type": "choice"`), nên `lessons.ts` cast `as unknown as Lesson`. Giữ nguyên cách cast này.
5. **QuizQuestion là union**: câu hỏi có `question` (choice/fill) hoặc `prompt` (listen). Kiểm tra bằng `"question" in q`, không truy cập trực tiếp cả hai.
6. **Styling**: Tailwind utilities, bảng màu emerald (primary) + amber (accent) trên nền cream `#faf7f2` (`@theme` trong `globals.css`). Font Be Vietnam Pro (next/font, subsets latin+vietnamese). Mobile-first, nút/to chữ cho người lớn tuổi.
7. `next.config.ts` set `turbopack.root` để Turbopack không nhầm `package-lock.json` ở thư mục cha `/Users/haunv` — đừng xóa.
8. Hạn chế hydration bug: mọi render phụ thuộc localStorage phải đi qua useSyncExternalStore (server snapshot = dữ liệu rỗng).

## 4. Lệnh

```bash
npm run dev        # dev server (đã thường chạy sẵn ở port 3000)
npm run lint       # phải sạch trước khi xong việc
npm run build      # phải build pass — TS strict, SSG cả 15 bài
```

## 5. Đã kiểm chứng (đừng nghi ngờ, chỉ giữ nguyên khi refactor)

- Luồng học end-to-end: học bài 1 → quiz 5/5 → progress lưu → lộ trình mở bài 2 → streak 1 ngày → flashcards có thẻ do các bài đã học.
- Build pass: 22 trang tĩnh (5 route + 15 bài học).

## 6. Lộ trình tương lai (chưa làm, giữ trong đầu khi thiết kế)

Đăng nhập + lưu đám mây (sẽ thay/nâng lớp localStorage trong `progress.ts`), bài test trình độ đầu vào, chặng 4+, CMS cho nội dung. Thiết kế hiện tại giữ toàn bộ nội dung trong JSON để nâng cấp CMS dễ.
