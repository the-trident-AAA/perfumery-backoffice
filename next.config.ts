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
        hostname: "31.97.43.136",
        port: "9000",
        pathname: "/perfumery/**",
      },
    ],
  },
};

export default nextConfig;
