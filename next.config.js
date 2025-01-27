/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.politicianofindia.com', 'images.unsplash.com', 'wpkixx.com', '203.92.43.166'],
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['src'],
  },

  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },

  // Compression and performance
  compress: true,
}

process.env.NODE_NO_WARNINGS = '1';

module.exports = nextConfig
