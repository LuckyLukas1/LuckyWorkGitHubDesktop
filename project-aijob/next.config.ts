import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "m097qqkacv.ufs.sh",
        port: "",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
