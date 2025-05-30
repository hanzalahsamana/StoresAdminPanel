/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["img.icons8.com"],
  },
  turbopack: {
    resolveAlias: {
      "@": "./src",
    },
    resolveExtensions: [".tsx", ".ts", ".js", ".json"],
  },
};

export default nextConfig;
