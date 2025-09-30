import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts'
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? process.env.ASSET_PREFIX : '',
  basePath: process.env.NODE_ENV === 'production' ? process.env.BASE_PATH || '' : '',
  experimental: {
    // Optimize for static export
    optimizeCss: true,
  }
};

export default nextConfig;
