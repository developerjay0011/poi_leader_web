/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.politicianofindia.com'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'wpkixx.com'
      },
      {
        protocol: 'http',
        hostname: '203.92.43.166'
      }
    ],
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
