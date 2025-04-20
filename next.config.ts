// next.config.js

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // only enable PWA in production
  disable: process.env.NODE_ENV !== 'production',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      webpackConfig: true,
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
    ],
  },
  async headers() {
    if (process.env.NODE_ENV !== 'production') {
      return []
    }
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-eval'; object-src 'none';",
          },
        ],
      },
    ]
  },
}

module.exports = withPWA(nextConfig)
