import type { NextConfig } from "next";

const canonicalOrigin = "https://veldform.co.za";

// Only takes effect once a host points at this worker. workers.dev stays out until the domain is live.
const aliasHosts = ["www.veldform.co.za", "veldform.com", "www.veldform.com"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...aliasHosts.map((value) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value }],
        destination: `${canonicalOrigin}/:path*`,
        permanent: true,
      })),
      { source: "/enquiries", destination: "/process", permanent: true },
    ];
  },
};

export default nextConfig;
