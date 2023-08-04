/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
  },
  async redirects() {
    return [{ source: "/home", destination: "/", permanent: true }];
  },
};

module.exports = nextConfig;
