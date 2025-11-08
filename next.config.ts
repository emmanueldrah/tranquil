import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: '/api/images/:path*',
      },
    ];
  },
  serverExternalPackages: ['@prisma/client', 'prisma'],
};

export default nextConfig;
