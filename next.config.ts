// next.config.js

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable PWA in dev so it doesn’t interfere locally
  disable: process.env.NODE_ENV === "development",
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
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
    ],
  },

  // Only add the CSP allowing unsafe-eval in production
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return []
    }
    return [
      {
        // apply this to every route in production
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "script-src 'self' 'unsafe-eval'; object-src 'none';",
          },
        ],
      },
    ]
  },
}

module.exports = withPWA(nextConfig)
