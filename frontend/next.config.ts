import fs from "node:fs";
import type { NextConfig } from "next";

const defaultDistDir = fs.existsSync("/.dockerenv") ? ".next-docker" : ".next-local";

const nextConfig: NextConfig = {
  typedRoutes: false,
  distDir: process.env.NEXT_DIST_DIR || defaultDistDir,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;
