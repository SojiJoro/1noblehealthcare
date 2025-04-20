// next.config.js

// Temporarily disable PWA so it cannot interfere with your live shell
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: true,                   // <- fully disabled for now
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

  // Only add the CSP in production (to allow unsafe-eval for SignaturePad)
  async headers() {
    if (process.env.NODE_ENV !== "production") {
      return []
    }
    return [
      {
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
