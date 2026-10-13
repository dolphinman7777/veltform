import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/enquiries", destination: "/process", permanent: true }];
  },
};

export default nextConfig;
