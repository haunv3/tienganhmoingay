import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PwaControls from "@/components/PwaControls";
import Footer from "@/components/Footer";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  applicationName: "Tiếng Anh Mỗi Ngày",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Anh Mỗi Ngày" },
  icons: { apple: "/icons/apple-touch-icon.png" },
  title: "Tiếng Anh Mỗi Ngày — Học lại từ con số 0",
  description:
    "Học tiếng Anh cho người mất gốc: đơn giản, mỗi ngày 5 phút, 100% tiếng Việt, không cần đăng nhập.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f8f9f5" };

const themeScript = `(() => { let theme; try { theme = localStorage.getItem("tam_theme"); } catch {} if (theme !== "light" && theme !== "dark") theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; document.documentElement.dataset.theme = theme; document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#15231d" : "#f8f9f5"); matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => { try { if (["light", "dark"].includes(localStorage.getItem("tam_theme"))) return; } catch {} document.documentElement.dataset.theme = e.matches ? "dark" : "light"; document.querySelector('meta[name="theme-color"]')?.setAttribute("content", e.matches ? "#15231d" : "#f8f9f5"); window.dispatchEvent(new Event("themechange")); }); })();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={`${beVietnamPro.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <PwaControls />
          <Footer />
        </div>
      </body>
    </html>
  );
}
