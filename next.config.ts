import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/interviewer",
  assetPrefix: "/interviewer/",

  reactStrictMode: true,
  swcMinify: true,

  rewrites: async () => {
    return [
      {
        source: "/interviewer/:path*",
        destination: "/:path*"
      },
    ];
  },
};

export default nextConfig;
