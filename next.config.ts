import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export as a fully static site
  output: 'export',
  // Deploy under /M.SApplicants on GitHub Pages
  basePath: '/M.SApplicants',
  // Ensure proper asset paths
  assetPrefix: '/M.SApplicants/',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
