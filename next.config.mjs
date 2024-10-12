/** @type {import('next').NextConfig} */
const nextConfig = {
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
