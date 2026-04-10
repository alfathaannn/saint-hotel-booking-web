import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },

  async headers() {
    return [
      {
        source: "/api/payment/notification/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "POST, GET, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Authorization",
          },
        ]
      },
    ];
  },

  images:{
    remotePatterns:[
     {
      protocol: "https",
      hostname: "lh3.googleusercontent.com",
      port: "",
      pathname: "/**",
     },
     {
      protocol: "https",
      hostname: "bujz2h47zq1syjgq.public.blob.vercel-storage.com",
      port: "",
      pathname: "/**",
     }
    ]
  }
};

export default nextConfig;
