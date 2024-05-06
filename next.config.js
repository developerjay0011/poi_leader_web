/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.politicianofindia.com', 'images.unsplash.com', 'wpkixx.com'],
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
