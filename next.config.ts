/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // If you want to ignore ESLint errors during build (not recommended for final prod)
  eslint: {
    ignoreDuringBuilds: false, // change to true to bypass lint errors during build
  },

  // If you plan to use images from remote domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all hosts, or replace with specific ones like "images.unsplash.com"
      },
    ],
  },

  // Optional: Enable experimental features
  experimental: {
    // Enable server actions, if needed
    // serverActions: true,
  },
};

export default nextConfig;
