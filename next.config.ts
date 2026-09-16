import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Tránh Turbopack nhận nhầm package-lock.json ở thư mục cha
  turbopack: {
    root: path.join(import.meta.dirname),
  },
};

export default nextConfig;
