/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ko'],
  },
}

module.exports = nextConfig