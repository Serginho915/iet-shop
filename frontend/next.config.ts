import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

const loadRootEnv = () => {
  const envPath = path.join(process.cwd(), "..", ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const envContent = fs.readFileSync(envPath, "utf8");
  for (const rawLine of envContent.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['\"]|['\"]$/g, "");
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
};

loadRootEnv();

const defaultDistDir = fs.existsSync("/.dockerenv") ? ".next-docker" : ".next-local";

const nextConfig: NextConfig = {
  typedRoutes: false,
  distDir: process.env.NEXT_DIST_DIR || defaultDistDir,
  env: {
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || "",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;
