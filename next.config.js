/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.svg'
      }
    ]
  },

}

module.exports = nextConfig
