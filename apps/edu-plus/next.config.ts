import type { NextConfig } from 'next';

const educoreUrl = process.env.EDUCORE_URL;

const nextConfig: NextConfig = {
  async rewrites() {
    if (!educoreUrl) return [];
    return [
      {
        source: '/epi/:path*',
        destination: `${educoreUrl}/epi/:path*`,
      },
    ];
  },
  logging: {
    browserToTerminal: true,
  },
};
export default nextConfig;
