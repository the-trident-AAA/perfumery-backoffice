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
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOST || "localhost",
        port: process.env.NEXT_PUBLIC_IMAGE_PORT || "9000",
        pathname: "/perfumery/**",
      },
    ],
  },
};

export default nextConfig;
