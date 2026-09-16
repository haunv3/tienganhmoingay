import Link from "next/link";
import { LESSONS, STAGES } from "@/lib/lessons";

const BENEFITS = [
  {
    icon: "🇻🇳",
    title: "100% tiếng Việt",
    desc: "Mọi hướng dẫn, giải thích đều bằng tiếng Việt. Chỉ cần biết đọc là học được.",
  },
  {
    icon: "⏱️",
    title: "Mỗi ngày 5 phút",
    desc: "Mỗi bài rất ngắn. Học ít nhưng đều đặn thì chắc hơn học nhiều một lúc.",
  },
  {
    icon: "🔊",
    title: "Nghe mọi từ",
    desc: "Bấm nút là nghe được cách đọc của từng từ và từng câu. Không sợ đọc sai.",
  },
  {
    icon: "🚪",
    title: "Không cần đăng ký",
    desc: "Vào là học luôn. Không tài khoản, không email, không phiền phức.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* Hero */}
      <section className="py-16 text-center sm:py-24">
        <p className="text-lg font-semibold text-emerald-600">
          Dành cho người mất gốc tiếng Anh
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-6xl">
          Học lại tiếng Anh{" "}
          <span className="text-emerald-600">từ con số 0</span>, đơn giản đến từng chữ
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
          Không chuẩn ngữ pháp, không từ điển dày. Chỉ có lộ trình từng bước,
          giải thích tiếng Việt và 5 phút mỗi ngày.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/hoc-ngay"
            className="rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-md transition hover:bg-emerald-700"
          >
            🌞 Học ngay hôm nay
          </Link>
          <Link
            href="/lo-trinh"
            className="rounded-2xl border-2 border-emerald-300 bg-white px-8 py-4 text-lg font-bold text-emerald-800 transition hover:bg-emerald-50"
          >
            🗺️ Xem lộ trình ({LESSONS.length} bài)
          </Link>
        </div>
      </section>

      {/* Vì sao dễ tiếp cận */}
      <section className="py-10">
        <h2 className="text-center text-3xl font-extrabold text-slate-900">
          Vì sao trang này dễ với người mất gốc?
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm"
            >
              <div className="text-4xl">{b.icon}</div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cách học */}
      <section className="py-10">
        <h2 className="text-center text-3xl font-extrabold text-slate-900">
          Cách học rất đơn giản
        </h2>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Vào học bài hôm nay",
              desc: "Mở mục “Học mỗi ngày”, hệ thống chọn sẵn bài tiếp theo cho bạn.",
            },
            {
              step: "2",
              title: "Nghe, đọc, ghi nhớ",
              desc: "Bấm 🔊 nghe từng từ, đọc lại to, xem phần ghi nhớ bằng tiếng Việt.",
            },
            {
              step: "3",
              title: "Kiểm tra & ôn tập",
              desc: "Làm vài câu kiểm tra ngay, rồi ôn lại bằng flashcards để không quên.",
            },
          ].map((s) => (
            <div key={s.step} className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-lg font-extrabold text-white">
                {s.step}
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lộ trình 3 chặng */}
      <section className="py-10">
        <h2 className="text-center text-3xl font-extrabold text-slate-900">
          Lộ trình của bạn
        </h2>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4">
          {STAGES.map((stage) => {
            const count = LESSONS.filter((l) => l.stage === stage.id).length;
            return (
              <div
                key={stage.id}
                className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm"
              >
                <span className="text-4xl">{stage.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{stage.title}</h3>
                  <p className="text-slate-600">
                    {stage.desc} <b className="text-emerald-700">({count} bài)</b>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/lo-trinh"
            className="inline-block rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-md transition hover:bg-emerald-700"
          >
            Bắt đầu từ bài đầu tiên →
          </Link>
        </div>
      </section>
    </div>
  );
}
