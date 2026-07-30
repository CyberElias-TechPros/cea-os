import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@cea/ui', '@cea/validators', '@cea/db', '@cea/config'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cea.academy' },
      { protocol: 'https', hostname: 'pub-*.r2.dev' },
    ],
  },
};

export default nextConfig;
