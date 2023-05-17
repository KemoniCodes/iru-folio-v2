/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media3.giphy.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'media2.giphy.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'media0.giphy.com',
        port: '',
      },
    ],
  }
}

module.exports = nextConfig
