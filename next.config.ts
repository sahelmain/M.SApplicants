import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/M.SApplicants',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
