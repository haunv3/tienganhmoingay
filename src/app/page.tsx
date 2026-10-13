import LevelLink from "@/components/LevelLink";
import Link from "next/link";
import { COURSE_UNITS as LESSONS, COURSE_STAGES as STAGES, GENERAL_LEVELS, EXAM_TRACKS } from "@/lib/curriculum";

export default function Home() {
  return (
    <div className="home-shell">
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> MỘT KHỞI ĐẦU NHỎ, MỖI NGÀY</p>
          <h1>Tiếng Anh dễ hơn<br />khi bạn học <span>từng chút một.</span></h1>
          <p className="hero-description">Bắt đầu từ con số 0, với hướng dẫn bằng tiếng Việt và những bài học vừa sức. Dành một phiên học nhỏ hôm nay cho một phiên bản tự tin hơn của bạn.</p>
          <div className="hero-actions"><Link href="/hoc-ngay" className="primary-button">Bắt đầu học hôm nay <span>↗</span></Link><Link href="/lo-trinh" className="text-button">Khám phá lộ trình →</Link></div>
          <p className="hero-note"><span>✓ Không cần đăng ký</span><span>✓ Học theo nhịp của bạn</span></p>
        </div>
        <div className="hero-visual">
          <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
          <div className="floating-note note-top">✦ Một chút cho chính mình</div>
          <div className="preview-card">
            <div className="preview-top"><span className="mini-label">TỪ ĐẦU TIÊN CỦA BẠN</span><span className="preview-speaker" aria-hidden="true">♪</span></div>
            <div className="hello-word">Hello<span>!</span></div><p className="phonetic">/həˈləʊ/</p>
            <div className="preview-meaning"><span>Xin chào</span><span className="wave" aria-hidden="true">👋</span></div>
            <p className="preview-example">“Hello! Nice to meet you.”</p><p className="preview-translation">Xin chào! Rất vui được gặp bạn.</p>
            <div className="preview-bottom"><span><i /> Một từ mới, một bước tiến.</span><span>Nền tảng → B2</span></div>
          </div>
          <div className="floating-note note-bottom"><span className="note-check">✓</span> Bạn làm được mà!</div>
        </div>
      </section>
      <section className="trust-strip" aria-label="Điểm nổi bật"><div><strong>Từng phiên nhỏ</strong><span>mỗi ngày là đủ để bắt đầu</span></div><div><strong>{LESSONS.length} bài học</strong><span>5 mức · TOEIC · IELTS Academic</span></div><div><strong>100% tiếng Việt</strong><span>giải thích dễ hiểu, dễ nhớ</span></div><div><strong>0 áp lực</strong><span>không tài khoản, không vội vàng</span></div></section>
      <section className="home-section"><div className="section-heading"><div><p className="eyebrow">ĐƯỜNG ĐI ĐÃ CÓ SẴN</p><h2>Từ “chưa biết” đến “mình làm được”.</h2></div><Link href="/lo-trinh" className="text-button">Xem tất cả bài học ↗</Link></div>
        <div className="stage-grid">{STAGES.map((stage, i) => <LevelLink level={GENERAL_LEVELS[i].id} key={stage.id} className={`stage-card stage-${i + 1}`}><div className="stage-card-top"><span className="stage-symbol">{stage.icon}</span><span className="mini-label">{GENERAL_LEVELS[i].short}</span></div><h3>{stage.title.split(" — ")[1]}</h3><p>{stage.desc}</p><div className="stage-card-bottom"><span>{LESSONS.filter(l => l.stage === stage.id).length} bài học · từng bước nhỏ</span><span>↗</span></div></LevelLink>)}</div>
      </section>
      <section className="home-section pt-0"><div className="section-heading"><div><p className="eyebrow">LUYỆN THEO MỤC TIÊU THI</p><h2>TOEIC và IELTS Academic</h2></div><Link href="/luyen-thi" className="text-button">Xem cách luyện và cấu trúc thi ↗</Link></div><div className="reference-grid">{EXAM_TRACKS.map(track => <LevelLink level={track.id} key={track.id} className="learning-panel library-category"><p className="eyebrow">{track.short}</p><h3 className="text-xl font-bold">{track.title}</h3><p className="mt-3 text-sm text-slate-600">{track.desc}</p><span className="text-button mt-5 inline-block">{LESSONS.filter(l => l.level === track.id).length} bài luyện rút gọn →</span></LevelLink>)}</div></section>
      <section className="method-section"><div><p className="eyebrow">MỘT THÓI QUEN THẬT ĐƠN GIẢN</p><h2>Nghe. Thử. Nhớ.<br />Rồi tiến thêm một chút.</h2><p>Bạn không cần học thật nhiều một lúc. Chỉ cần quay lại, mỗi ngày.</p><Link href="/hoc-ngay" className="primary-button">Thử bài học đầu tiên →</Link></div><ol className="method-list">{[{ title: "Học một bài ngắn", desc: "Bài tiếp theo đã được chọn sẵn. Mở lên là có thể bắt đầu." }, { title: "Nghe và đọc thành tiếng", desc: "Nghe phát âm, xem nghĩa tiếng Việt và thử nói theo." }, { title: "Kiểm tra, rồi ôn lại", desc: "Vài câu hỏi nhỏ và thẻ từ giúp bạn nhớ lâu hơn." }].map((item, i) => <li key={item.title}><span>0{i + 1}</span><div><h3>{item.title}</h3><p>{item.desc}</p></div></li>)}</ol></section>
    </div>
  );
}
