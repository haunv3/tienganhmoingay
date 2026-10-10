# Review UI/UX và source

## Thay đổi đã thực hiện

- Xây dựng hệ màu kem, xanh lá dịu, cùng quy tắc chữ, khoảng cách, thẻ và trạng thái focus.
- Thiết kế lại trang chủ với mục tiêu rõ ràng, minh họa thẻ từ bằng HTML/CSS, ba chặng học và hướng dẫn bắt đầu.
- Thiết kế lại màn hình học mỗi ngày: bài tiếp theo, tiến độ, chuỗi ngày học và đường dẫn ôn tập.
- Đồng bộ menu, chân trang, lộ trình, bài học, kiểm tra và flashcards; bổ sung bố cục điện thoại và giảm chuyển động theo thiết lập của người dùng.
- Bổ sung nhãn điều hướng, trang hiện tại, bước hiện tại, thanh tiến độ và phản hồi kiểm tra cho công nghệ hỗ trợ.
- Cho phép quay về bước trước để đọc lại nội dung bài học.
- Hiển thị lý do bài bị khóa; bỏ cắt ngắn mục tiêu bài học.
- Khi localStorage bị chặn, hoàn thành bài và ôn từ vẫn cập nhật trong phiên; màn hình kết quả báo đúng tình trạng lưu tiến độ.

## Nhận xét source và việc cần cân nhắc trước khi mở rộng

Kiến trúc hiện tại phù hợp ứng dụng nhỏ: nội dung JSON, các màn hình Next.js, trạng thái cục bộ và bộ đọc phát âm của trình duyệt. Chưa cần thêm thư viện giao diện hoặc quản lý trạng thái.

1. Khóa bài hiện là quy tắc hiển thị của lộ trình. Truy cập URL vẫn mở được bài sau. Cần quyết định có cho phép học tự do trước khi triển khai khóa bài bắt buộc.
2. Ôn tập đang lấy từ của mọi bài, kể cả bài chưa học. Nên bổ sung chế độ “từ đã học” và “khám phá tất cả” khi phát triển tiếp.
3. Dữ liệu tiến độ/SRS chỉ kiểm tra cấu trúc tối thiểu khi đọc. Nên bổ sung xác thực dữ liệu và xử lý thay đổi phiên bản trước khi thêm đồng bộ tài khoản.
4. Chuỗi ngày hiển thị giá trị đã lưu; nếu bỏ học nhiều ngày, số chuỗi cũ vẫn xuất hiện cho đến lần hoàn thành bài tiếp theo. Cần quy tắc riêng cho chuỗi hiện tại và kỷ lục.
5. Phát âm phụ thuộc giọng đọc có sẵn trên thiết bị. Nên có phản hồi khi thiết bị không hỗ trợ trước khi coi đây là chức năng trọng tâm.
6. Font được tải từ Google lúc build; CI cần mạng hoặc chuyển sang font lưu trong dự án.

## Kiểm tra

ESLint và TypeScript được chạy. Việc xác nhận trực quan trên desktop/điện thoại chưa hoàn tất vì trình duyệt xem trước không kết nối được máy chủ của môi trường thực thi. Không coi bố cục là đã qua kiểm tra trực quan.
