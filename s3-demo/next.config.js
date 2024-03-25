/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['mys3database.s3.ap-northeast-2.amazonaws.com'],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  }
}

module.exports = nextConfig
