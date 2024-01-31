/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.imagur.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "dummyimage.com",
        pathname: "**",
      }
    ],
  },
};

export default nextConfig;
