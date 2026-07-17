import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  allowedDevOrigins: ["127.0.0.1"],
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["@saju/ui", "@saju/design-tokens"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openmoji.org",
        pathname: "/data/**",
      },
    ],
  },
};

export default withMDX(nextConfig);
