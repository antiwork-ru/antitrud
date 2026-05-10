import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "antiwork-ru.github.io",
        pathname: "/books/**",
      },
      {
        protocol: "https",
        hostname: "img1.teletype.in",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "img2.teletype.in",
        pathname: "/files/**",
      },
    ],
  },
};

export default nextConfig;
