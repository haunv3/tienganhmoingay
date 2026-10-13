# Tiếng Anh Mỗi Ngày

Ứng dụng học tiếng Anh cho người mất gốc và cơ bản: hướng dẫn tiếng Việt, học theo từng phiên nhỏ, không cần tài khoản.

## Chương trình hiện có

**72 bài đã có nội dung**, gồm 8 bài Nền tảng, 14 bài A1, 14 bài A2, 10 bài B1, 10 bài B2, 8 bài TOEIC Listening & Reading và 8 bài IELTS Academic. Mỗi lộ trình kết thúc bằng một bài ôn tổng hợp. Ngoài ra giữ lại 15 bài khởi động cũ và tiến độ đã lưu.

| Lộ trình | Trọng tâm |
| --- | --- |
| Nền tảng | Chào hỏi, bảng chữ cái, IPA, số 0–20, từ loại, đại từ, a/an và số nhiều |
| A1 | To be, hỏi đáp, gia đình, nhà ở, thói quen, hiện tại tiếp diễn, khả năng, gọi món, mua sắm và hỏi đường |
| A2 | Quá khứ, kế hoạch, so sánh, số lượng, lời khuyên, trải nghiệm, đặt phòng, lời mời và tin nhắn có liên kết ý |
| B1 | Quá khứ hoàn thành, used to, điều kiện 1/2, bị động, mệnh đề quan hệ, tường thuật và email nêu lý do |
| B2 | Góc nhìn quá trình/kết quả, suy đoán, giả định quá khứ, nhượng bộ, thương lượng và đọc phản biện |
| TOEIC L&R | Bảy dạng bài Listening & Reading và bài ôn ngắn; chưa có đề thi thử 200 câu |
| IELTS Academic | Nghe điền thông tin, Reading TFNG/headings, Writing Task 1/2, Speaking Parts 1–3 |

Chương trình được biên soạn riêng theo mục tiêu giao tiếp cơ bản, tham khảo mô tả năng lực CEFR và các nhóm ngữ pháp A1–A2. Không sao chép PDF hoặc audio khóa học vào app. Khung sách 48 unit được giữ riêng trong `src/lib/book-plan.ts`; đây không còn là danh sách bài học chính.

Tham khảo chuyên môn:

- [CEFR: mô tả năng lực](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors)
- [British Council: A1–A2 grammar](https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2)

Các nhãn A1–B2 định hướng nội dung. **Hoàn thành khóa trong app không xác nhận hoặc cấp chứng chỉ CEFR.** Bài kiểm tra chủ yếu đánh giá nhận biết và dùng mẫu; nói/viết cần đánh giá trực tiếp để kết luận năng lực.

## Cách học

1. Chọn Nền tảng–B2 hoặc TOEIC/IELTS Academic; lựa chọn được nhớ trên thiết bị.
2. Ôn một phút bài trước, nghe từ mới và đọc ví dụ theo tình huống.
3. Thử nói và viết bằng thông tin của mình hoặc tình huống giả định. Bản nháp viết lưu trên thiết bị; tự đối chiếu với mẫu và checklist.
4. Làm kiểm tra, đọc giải thích từng câu và xem lại câu sai ở màn hình kết quả. Cần ít nhất 80% đúng để đánh dấu hoàn thành bài mới; bài cũ giữ ngưỡng 60%.
5. Ôn từ đã học bằng flashcards. Có thể đổi sang “Khám phá toàn bộ”; các từ trùng nhưng khác nghĩa được tách riêng.

Bước học được ghi nhớ; câu trả lời kiểm tra chưa lưu giữa các phiên. Bài viết và phát âm chưa được tự chấm. Phát âm dùng Web Speech của trình duyệt, ưu tiên giọng Anh-Anh nếu có; chất lượng và khả năng chạy ngoại tuyến tùy thiết bị.

## Các trang

- `/hoc-ngay`: bài tiếp theo theo mức đã chọn.
- `/lo-trinh`: chọn mức, xem tiến độ và mở từng bài; 15 bài cũ nằm trong mục mở rộng.
- `/thu-vien`: IPA, thì, cấu trúc, cụm từ, từ vựng và câu theo chủ đề; tìm không dấu và lọc theo nhóm/mức.
- `/giao-tiep`: câu theo tình huống quen thuộc.
- `/luyen-thi`: thông tin cấu trúc chính thức, giới hạn bài luyện và chọn mục tiêu TOEIC/IELTS Academic.
- `/on-tap`: flashcards, mặc định chỉ lấy từ của bài đã hoàn thành.

Thư viện giữ một số công thức mở rộng, được gắn nhãn “Mở rộng · học sau” để không nhầm với nội dung chính của từng lộ trình.

## PWA và giao diện

Nút mặt trăng/mặt trời chuyển sáng/tối, mặc định theo thiết bị rồi nhớ lựa chọn. Chọn “Cài ứng dụng” ở cuối trang; Safari trên iPhone/iPad dùng Chia sẻ → Thêm vào Màn hình chính.

Service worker chỉ đăng ký trong bản production. Triển khai cần HTTPS; localhost dùng kiểm tra. Trang mở bằng điều hướng đầy đủ và tài nguyên đã tải sau khi worker hoạt động có thể xem lại ngoại tuyến. Trang chưa lưu hiển thị thông báo mất kết nối; chưa có bộ tải toàn bộ bài xuống máy. Tăng `VERSION` trong `public/sw.js` khi phát hành. Nút cập nhật tải lại trang; hoàn thành bài đang làm trước khi cập nhật.

## Chạy và kiểm tra

```bash
npm install
npm run dev
npm run lint
node --test tests/*.test.mjs
npm run build
npm start
```

Nếu môi trường không hỗ trợ Turbopack, dùng `npx next build --webpack` để kiểm tra production. Font tải từ Google lúc build, nên cần mạng hoặc chuyển sang font lưu trong dự án.

## Chỉnh nội dung

- `content/course/levels.json`: 35 bài Nền tảng–A2; `advanced.json`: 36 bài B1/B2 và luyện thi; `unit-01-to-be.json`: bài to be có slug ổn định để giữ tiến độ trước đó.
- `src/lib/curriculum.ts`: mức, thứ tự, danh sách bài và quy tắc điểm đạt.
- `src/lib/types.ts`: cấu trúc nội dung gồm từ, lý thuyết, đoạn đọc, luyện nói/viết và quiz.
- `src/lib/library.ts`: nội dung tra cứu và nhãn mức gợi ý.
- `src/lib/progress.ts`: tiến độ và lịch ôn; `learning-level.ts`: mức đang chọn; `lesson-session.ts`: bước học.

Giữ slug ổn định khi biên tập. Khi thêm bài, kiểm tra đủ mục tiêu, lý thuyết tiếng Việt, ví dụ song ngữ, đoạn đọc/nghe, yêu cầu nói/viết, lỗi thường gặp và đáp án có giải thích. Không dùng điểm trắc nghiệm để tự cấp mức CEFR cho người học.

## Luyện thi và kiểm chứng nội dung

- [ETS: TOEIC Listening & Reading](https://www.ets.org/toeic/about/listening-reading.html)
- [IELTS Academic Writing](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing)
- [IELTS Speaking](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking)
- [IELTS Academic Reading](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading)

Bài TOEIC/IELTS rút gọn do app tự biên soạn, không trích đề thi hoặc được tổ chức thi chứng thực. TOEIC hiện tập trung Listening & Reading; IELTS hiện là Academic, chưa có lộ trình General Training riêng. Minh họa Part 1 là vector tự dựng, audio là TTS, không phải ảnh/thu âm của đề thật.

Điểm hiển thị là số câu đúng, không quy đổi TOEIC/IELTS. Các câu điền có thể có đáp án tương đương và giới hạn từ. IELTS Writing Task 1/2 có bảng/đề, mục tiêu 150/250 từ, đếm từ ước tính và mẫu tự biên soạn đủ số từ; chưa chấm band. Một số bài B1/B2 có đoạn gợi ý ngắn, được ghi rõ cần phát triển thêm thay vì coi là bài hoàn chỉnh.

Tổng cộng 604 câu có đáp án trong 72 bài. Hoàn thành B2 không tự chuyển sang một kỳ thi: các lộ trình thi có tiến độ và điểm dừng riêng.
