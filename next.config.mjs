/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
      resolveExtensions: [
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
        ".css",
      ],
    },
  },
  reactStrictMode: false,
  images: {
    domains: ["t3xyzgvkkyktkixg.public.blob.vercel-storage.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: "/maintenance",
        destination: "/maintenance",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
