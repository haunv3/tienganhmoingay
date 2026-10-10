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

## PWA và giao diện sáng/tối

- Nút mặt trăng/mặt trời ở đầu trang chuyển chế độ và ghi nhớ lựa chọn trên thiết bị. Khi chưa chọn, giao diện theo thiết lập của hệ điều hành; script chạy trước khi nội dung được hiển thị để tránh nháy màu.
- Chọn **Cài ứng dụng** ở cuối trang. Trình duyệt hỗ trợ sẽ mở hộp thoại cài đặt khi ứng dụng đủ điều kiện; Safari trên iPhone/iPad dùng **Chia sẻ → Thêm vào Màn hình chính**.
- Service worker chỉ đăng ký trong bản production để tránh cache source trong lúc phát triển. Cần HTTPS khi triển khai; localhost dùng để kiểm tra cục bộ.
- Các trang mở bằng điều hướng đầy đủ sau khi worker hoạt động và tài nguyên đã tải được lưu để mở lại ngoại tuyến. Bài chưa lưu sẽ hiện trang thông báo ngoại tuyến. Đây chưa phải bộ tải toàn bộ bài học xuống thiết bị. Giọng phát âm ngoại tuyến tùy thiết bị.
- Khi có worker mới, nút **Cập nhật phiên bản mới** xuất hiện ở cuối trang. Chọn cập nhật sẽ tải lại trang, nên hoàn thành bài kiểm tra đang làm trước.
- Khi phát hành, tăng `VERSION` trong `public/sw.js` để loại cache của phiên bản trước. Cache HTML và tài nguyên được tách riêng; dữ liệu RSC của Next.js và API không lưu chung với HTML.

Kiểm tra logic PWA và khởi tạo theme:

```bash
node --test tests/pwa.test.cjs
```

Kiểm tra thủ công trên bản production: cài ứng dụng, đổi sáng/tối và tải lại trang, mở một trang bằng URL trực tiếp sau khi worker hoạt động, chuyển sang offline rồi tải lại trang đó, thử URL chưa lưu và kiểm tra nút cập nhật khi thay phiên bản worker.
