const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // Offline support
  // fallbacks: {
  //   image: "/static/images/fallback.png"
  // }
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/cardus-dev.appspot.com/o/images**",
      },
    ],
  },
  experimental: {
    // Required:
    appDir: true,
  },
});

module.exports = nextConfig;
