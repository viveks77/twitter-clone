/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    IMAGE_URL: "http://127.0.0.1:4000/images/"
  }
}

module.exports = nextConfig
