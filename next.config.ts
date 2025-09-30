import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard Next.js configuration for development
  // Remove static export settings for local development
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Enable when needed for static deployment
  // output: 'export',
  // trailingSlash: true,
  // distDir: 'out',
};

export default nextConfig;
