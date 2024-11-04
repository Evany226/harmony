/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eyharmony.nyc3.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig;
