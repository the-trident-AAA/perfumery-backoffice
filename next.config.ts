import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "66.55.75.130",
        port: "9000",
        pathname: "/perfumery/**",
      },
    ],
  },
};

export default nextConfig;
