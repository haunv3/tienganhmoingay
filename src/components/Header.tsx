"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
        ? "bg-emerald-600 text-white"
        : "text-emerald-900 hover:bg-emerald-100"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold text-emerald-800">
          <span aria-hidden>🌞</span>
          <span>
            Tiếng Anh <span className="text-emerald-600">Mỗi Ngày</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Mở menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-2xl leading-none text-emerald-800 sm:hidden"
        >
          ☰
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-emerald-100 px-4 py-3 sm:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
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
