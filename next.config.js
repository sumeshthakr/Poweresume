/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Poweresume' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Poweresume/' : '',
}

module.exports = nextConfig
