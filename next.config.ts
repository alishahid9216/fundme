import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "standalone" is for the Docker image. Vercel does its own packaging and fails
  // ("next-server.js.nft.json not found") if this is set, so skip it there (VERCEL=1 is set by Vercel).
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;
