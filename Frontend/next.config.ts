import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
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

export default nextConfig;
