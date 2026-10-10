import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/", name: "Tiếng Anh Mỗi Ngày", short_name: "Anh Mỗi Ngày",
    description: "Học tiếng Anh từng chút một, mỗi ngày 5 phút.",
    lang: "vi", start_url: "/hoc-ngay", scope: "/", display: "standalone",
    background_color: "#f8f9f5", theme_color: "#326b4c",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
