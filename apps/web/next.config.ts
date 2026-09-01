import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@cea/ui', '@cea/validators', '@cea/db', '@cea/config'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cea.academy' },
      { protocol: 'https', hostname: 'pub-*.r2.dev' },
    ],
  },
  // Proxy API calls same-origin so the browser never talks to a hardcoded
  // host (works in local dev, the sandbox preview, and on Vercel). In
  // production, point NEXT_PUBLIC_API_URL at the Cloudflare Worker.
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
    return [
      { source: '/api/v1/:path*', destination: `${apiBase}/v1/:path*` },
    ];
  },
};

export default nextConfig;
