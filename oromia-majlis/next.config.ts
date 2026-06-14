import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

let strapiHostname = "localhost";
try {
  strapiHostname = new URL(strapiUrl).hostname;
} catch {
  // keep default
}

const nextConfig: NextConfig = {
  output: process.env.CPANEL_DEPLOY === "true" ? "standalone" : undefined,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oromia-mejlis-website.onrender.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "oriasc-api.oriasc.org",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: strapiHostname,
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];

    if (isProduction) {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains",
      });
    }

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
