import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  transpilePackages: ["@saju/ui", "@saju/design-tokens"],
};

export default nextConfig;
