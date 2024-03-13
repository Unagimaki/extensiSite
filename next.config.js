/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      type: "asset",
      resourceQuery: /url/, // *.svg?url
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
      use: ["@svgr/webpack"],
    });
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,

  images: {
    // add project domain for working images and refresh server
    domains: [
      "test.com",
      "localhost",
      "firebasestorage.googleapis.com",
      "cdn.discordapp.com",
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    localeDetection: false,
  },
};

module.exports = nextConfig;
