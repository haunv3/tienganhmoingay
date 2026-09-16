# Kế hoạch thiết kế: "Tiếng Anh Mỗi Ngày"

Website giúp người Việt **mất gốc tiếng Anh** học lại từ con số 0 — đơn giản, 100% tiếng Việt cho phần giao diện/hướng dẫn, mỗi ngày một ít, không áp lực.

## 1. Công nghệ & kiến trúc

- **Next.js (App Router) + TypeScript + Tailwind CSS** — chưa cần backend, deploy dễ (Vercel/Netlify).
- **Nội dung bài học dạng JSON trong repo** (`content/`) — tôi soạn sẵn, bạn dễ chỉnh sửa, sau này có thể nâng cấp thành CMS/backend.
- **Tiến độ học lưu ở localStorage** (bài đã hoàn thành, streak, từ cần ôn) — không cần đăng nhập cho MVP.
- **Âm thanh phát âm dùng Web Speech API** của trình duyệt (TTS miễn phí, không cần file audio).

## 2. Triết lý thiết kế cho người "mất gốc"

- Giao diện **toàn bộ tiếng Việt**, chữ to, câu ngắn, không dùng thuật ngữ.
- Mỗi bài chỉ dạy **vài từ/cấu trúc**, học xong có kiểm tra ngay để thấy mình "làm được".
- **Mọi từ vựng đều có nút nghe** phát âm mẫu.
- Hiệu ứng tích cực: chúc mừng khi xong bài, hiển thị chuỗi ngày học liên tiếp (streak).

## 3. Cấu trúc trang

| Trang | Đường dẫn | Mô tả |
|---|---|---|
| Trang chủ | `/` | Giới thiệu, giải thích cách học, nút "Bắt đầu từ đầu" |
| Lộ trình | `/lo-trinh` | Các chặng học theo thứ tự, đánh dấu bài đã xong/khóa |
| Bài học | `/bai-hoc/[slug]` | Mục tiêu → từ vựng + nghe → giải thích → ví dụ → kiểm tra nhanh |
| Học mỗi ngày | `/hoc-ngay` | 1 bài ngắn mỗi ngày theo lịch, có streak |
| Ôn tập | `/on-tap` | Flashcards lặp lại ngắt quãng (thẻ nhớ, tự đánh giá nhớ/chưa nhớ) |

## 4. Lộ trình nội dung (tôi soạn sẵn MVP)

- **Chặng 1 — Khởi động:** bảng chữ cái, 5-6 nguyên âm đặc biệt, chào hỏi cơ bản (~4 bài)
- **Chặng 2 — Từ vựng sống còn:** số đếm, gia đình, đồ ăn, thời gian (~6 bài, mỗi bài 6-8 từ)
- **Chặng 3 — Câu đầu tiên:** I am / You are, câu hỏi What/Where, câu chào đơn giản (~5 bài)

Mỗi bài học JSON gồm: tiêu đề, mục tiêu, danh sách từ vựng (từ, phiên âm, nghĩa, câu ví dụ), phần giải thích tiếng Việt, và 3-5 câu kiểm tra (trắc nghiệm / điền từ / nghe-chọn).

## 5. Tính năng kỹ thuật chính

- **Component kiểm tra tương tác:** trắc nghiệm, điền từ, nghe-chọn ảnh/từ — có phản hồi đúng/sai ngay và giải thích.
- **Flashcards lặp lại ngắt quãng:** thuật toán Leitner đơn giản (hộp 1-5, từ sai quay lại sớm hơn), dữ liệu trong localStorage.
- **Streak + tiến độ:** tính ngày học liên tiếp, mở khóa bài theo thứ tự.
- **Responsive mobile-first** vì người học chủ yếu dùng điện thoại.

## 6. Các bước thực hiện

1. Khởi tạo dự án Next.js + TypeScript + Tailwind, cấu trúc thư mục `content/`
2. Xây design system: font (Be Vietnam Pro), màu sắc thân thiện, component cơ bản
3. Soạn nội dung ~15 bài học JSON (3 chặng như trên)
4. Xây trang chủ + trang lộ trình
5. Xây trang bài học + các dạng kiểm tra tương tác
6. Xây flashcards ôn tập + logic lặp lại ngắt quãng
7. Xây trang "học mỗi ngày" + streak
8. Kiểm tra giao diện trên mobile/desktop, hướng dẫn chạy và deploy

## 7. Ngoài MVP (để sau, không làm bây giờ)

Đăng nhập & lưu đám mây, cộng đồng/hỏi đáp, bài kiểm tra trình độ đầu vào, dashboard giáo viên.