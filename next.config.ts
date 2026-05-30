import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "ecommerce";

const nextConfig: NextConfig = {
  output: "export",
  
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  
  images: {
    unoptimized: true,
    qualities: [75, 85, 90],
  },
  
  // GitHub Pages routing
  trailingSlash: true,
  
  // Disable server components
  distDir: "out",
};

export default nextConfig;