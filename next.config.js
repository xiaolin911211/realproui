/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: ['picsum.photos','repro.nyc3.digitaloceanspaces.com','flowbite.com','res.cloudinary.com'],
  },
  experimental: { images: { layoutRaw: true } }
}

module.exports = nextConfig
