import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Preparado para i18n futuro
  // i18n: { locales: ['es', 'en', 'ca'], defaultLocale: 'es' },
}

export default nextConfig
