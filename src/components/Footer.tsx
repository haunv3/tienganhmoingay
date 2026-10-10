import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-transparent">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-6 text-center text-sm text-slate-500">
        <p className="font-semibold text-emerald-800">
          ✳ Tiếng Anh Mỗi Ngày
        </p>
        <p>
          Mỗi ngày 5 phút, 100% tiếng Việt, không cần đăng nhập. Bắt đầu tại{" "}
          <Link href="/lo-trinh" className="font-semibold text-emerald-600 hover:underline">
            Lộ trình
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
