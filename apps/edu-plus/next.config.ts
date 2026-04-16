import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/epi/:path*',
        destination: `${process.env.EDUCORE_URL || 'http://localhost:3001'}/epi/:path*`,
      },
    ];
  },
};

export default nextConfig;
