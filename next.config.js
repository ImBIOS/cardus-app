// @ts-check
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development"
  // Offline support
  // fallbacks: {
  //   image: "/static/images/fallback.png"
  // }
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/**"
      }
    ]
  }
});
