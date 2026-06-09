import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  experimental: {
    // Tree-shake barrel-export packages — only bundles icons/components actually imported
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default nextConfig
