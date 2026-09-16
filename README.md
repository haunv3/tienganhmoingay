# 🌞 Tiếng Anh Mỗi Ngày

Website học tiếng Anh cho **người mất gốc**: đơn giản, mỗi ngày 5 phút, 100% tiếng Việt, không cần đăng nhập.

## Tính năng

- **Lộ trình 3 chặng, 15 bài học** (khởi động → từ vựng sống còn → câu đầu tiên), bài sau mở khi xong bài trước.
- **Mỗi bài 4 bước**: mục tiêu → từ vựng (nghe phát âm từng từ) → ghi nhớ → kiểm tra tương tác.
- **3 dạng kiểm tra**: trắc nghiệm, điền từ, nghe-chọn — phản hồi đúng/sai ngay kèm giải thích.
- **Học mỗi ngày**: hệ thống tự chọn bài hôm nay, tính chuỗi ngày học liên tiếp (streak 🔥).
- **Ôn tập flashcards**: thuật toán lặp lại ngắt quãng (Leitner) — từ "chưa nhớ" quay lại sớm hơn.
- **Phát âm miễn phí** bằng Web Speech API của trình duyệt, không cần file audio.
- **Tiến độ lưu trên máy** (localStorage), không cần tài khoản.

## Chạy dự án

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

Build production:

```bash
npm run build && npm start
```

## Cấu trúc

```
content/lessons/     Nội dung 15 bài học (JSON) — soạn/chỉnh sửa bài học ở đây
src/app/             Các trang: /, /lo-trinh, /bai-hoc/[slug], /hoc-ngay, /on-tap
src/components/      LessonView, QuizRunner, FlashcardsClient, Header…
src/lib/             types, lessons (nạp nội dung), progress (localStorage), speech (TTS)
```

### Thêm bài học mới

1. Tạo file `content/lessons/16-ten-bai.json` theo cấu trúc của các bài hiện có.
2. Thêm `import` và đưa vào mảng `raw` trong `src/lib/lessons.ts`.
3. Đặt `order` tăng dần, `stage` thuộc 1–3. Xong!

## Deploy

Push lên GitHub rồi import repo vào [Vercel](https://vercel.com/new) (hoặc Netlify) — không cần cấu hình gì thêm vì toàn bộ trang đều là tĩnh.
