/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.politicianofindia.com', 'images.unsplash.com', 'wpkixx.com', '203.92.43.166'],
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
