import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }, { key: "Service-Worker-Allowed", value: "/" }] }];
  },
  // Tránh Turbopack nhận nhầm package-lock.json ở thư mục cha
  turbopack: {
    root: path.join(import.meta.dirname),
  },
};

export default nextConfig;
