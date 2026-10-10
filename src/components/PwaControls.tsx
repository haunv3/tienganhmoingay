"use client";

import { useEffect, useState } from "react";

interface InstallPrompt extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PwaControls() {
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(false);
  const [notice, setNotice] = useState("");
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)");
    const detectInstalled = () => setInstalled(standalone.matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    detectInstalled();
    standalone.addEventListener("change", detectInstalled);
    const onPrompt = (event: Event) => { event.preventDefault(); setPrompt(event as InstallPrompt); };
    const onInstalled = () => { setInstalled(true); setPrompt(null); setNotice(""); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    let disposed = false;
    let refreshing = false;
    const onController = () => { if (refreshing) window.location.reload(); };
    const onUpdate = (event: Event) => { refreshing = true; (event as CustomEvent<ServiceWorker>).detail.postMessage({ type: "SKIP_WAITING" }); };
    window.addEventListener("pwa-update", onUpdate);
    navigator.serviceWorker?.addEventListener("controllerchange", onController);
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" }).then(registration => {
        if (disposed) return;
        if (registration.waiting) setWaiting(registration.waiting);
        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          worker?.addEventListener("statechange", () => {
            if (!disposed && worker.state === "installed" && navigator.serviceWorker.controller) setWaiting(worker);
          });
        });
      }).catch(() => { /* Installation remains available without offline caching. */ });
    }
    return () => {
      disposed = true;
      standalone.removeEventListener("change", detectInstalled);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener("pwa-update", onUpdate);
      navigator.serviceWorker?.removeEventListener("controllerchange", onController);
    };
  }, []);

  async function install() {
    if (prompt) {
      await prompt.prompt();
      await prompt.userChoice;
      setPrompt(null);
    } else {
      setNotice("Trên iPhone/iPad: mở bằng Safari, chọn Chia sẻ → Thêm vào Màn hình chính. Trên trình duyệt khác: tìm “Cài ứng dụng” trong menu. Nếu chưa thấy, hãy thử lại sau khi trang tải xong.");
    }
  }

  return <div className="pwa-controls">
    {!installed && <button type="button" onClick={install} className="text-button">↧ Cài ứng dụng</button>}
    {waiting && <button type="button" className="text-button" onClick={() => window.dispatchEvent(new CustomEvent("pwa-update", { detail: waiting }))}>↻ Cập nhật phiên bản mới</button>}
    {notice && <div className="install-notice" role="status"><p>{notice}</p><button type="button" onClick={() => setNotice("")} aria-label="Đóng hướng dẫn cài đặt">×</button></div>}
  </div>;
}
