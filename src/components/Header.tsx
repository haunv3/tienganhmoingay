"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";

const NAV = [
  { href: "/lo-trinh", label: "Lộ trình" },
  { href: "/hoc-ngay", label: "Học mỗi ngày" },
  { href: "/on-tap", label: "Ôn tập" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      pathname?.startsWith(href)
        ? "bg-emerald-100 text-emerald-800"
        : "text-emerald-900 hover:bg-emerald-100"
    }`;

  return (
    <header className="site-header sticky top-0 z-40">
      <div className="header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">✳</span>
          <span>Tiếng Anh Mỗi Ngày<small>MỖI NGÀY MỘT CHÚT TIẾN BỘ</small></span>
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 sm:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname?.startsWith(item.href) ? "page" : undefined}
              className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-tools">
        <ThemeToggle />
        <button
          type="button"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-2xl leading-none text-emerald-800 sm:hidden"
        >
          {open ? "×" : "☰"}
        </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-navigation" aria-label="Điều hướng trên điện thoại" className="flex flex-col gap-1 border-t border-emerald-100 px-4 py-3 sm:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={pathname?.startsWith(item.href) ? "page" : undefined}
              className={linkClass(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
