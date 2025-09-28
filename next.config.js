/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  experimental: {
    // Configuración experimental si es necesaria
  },
  // Configuración para Vercel
  output: 'standalone',
}

module.exports = nextConfig
