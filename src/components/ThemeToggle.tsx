"use client";

import { useSyncExternalStore } from "react";

const subscribe = (notify: () => void) => {
  window.addEventListener("themechange", notify);
  return () => window.removeEventListener("themechange", notify);
};

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme === "dark", () => false);
  function toggle() {
    const theme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("tam_theme", theme); } catch { /* Use the choice for this session. */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#f8f9f5" : "#15231d");
    window.dispatchEvent(new Event("themechange"));
  }
  return <button type="button" className="theme-toggle" onClick={toggle} aria-label={dark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"} aria-pressed={dark} title={dark ? "Chế độ sáng" : "Chế độ tối"}><span aria-hidden="true">{dark ? "☀" : "☾"}</span><span className="sr-only">Giao diện tối</span></button>;
}
