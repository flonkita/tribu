import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pkbiewnupwlgyrvvihjc.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**", // Autorise tout le bucket public
      },
    ],
  },
};

export default nextConfig;
