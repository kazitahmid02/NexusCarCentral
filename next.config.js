/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
      domains: ['cdn.imagin.studio'], // Add any other allowed domains here
    },
    typescript: {
      ignoreBuildErrors: true,
    }
  };
