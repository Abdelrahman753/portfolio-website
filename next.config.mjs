/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  // Export pages as folders with index.html so they work with static hosts like S3
  trailingSlash: true,
  assetPrefix: '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
