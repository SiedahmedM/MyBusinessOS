/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://CustomSoftwarePro.com',
  },
  images: {
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1440, 1600, 1920],
    imageSizes: [320, 480, 640, 750, 828, 1080, 1200, 1600],
    qualities: [60, 75, 85, 90, 95, 100],
    formats: ['image/webp'],
  },
}

module.exports = nextConfig