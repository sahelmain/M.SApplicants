/** @type {import('next').NextConfig} */
// Use dynamic basePath and assetPrefix in production, none in dev for local preview
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/M.SApplicants' : '';
const assetPrefix = isProd ? '/M.SApplicants' : '';

const nextConfig = {
  // Force static-only output for app directory
  output: 'export',
  basePath,
  assetPrefix,
  // Add trailing slash for all routes (helps on static exports)
  trailingSlash: true,
  // expose basePath for client fetches
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // Skip ESLint during build to avoid removed option errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
