import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.microcms-assets.io",
      },
    ],
  },
};

export default nextConfig;
