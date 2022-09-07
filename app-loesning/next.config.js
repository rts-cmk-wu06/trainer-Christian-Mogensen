/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost", "svendeproeve-christian.herokuapp.com"],
  },
};
const withpwa = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "https-calls",
        networkTimeoutSeconds: 15,
        expiration: {
          maxEntries: 150,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});
module.exports = withpwa(nextConfig);
