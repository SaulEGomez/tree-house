/** @type {import('next').NextConfig} */
const nextConfig = {
    // Re-bundle these ESM deps so they don’t leak “export *” into client boundaries
    transpilePackages: ['sanity', '@sanity/ui', '@sanity/vision', 'framer-motion'],
  };
  
  export default nextConfig;
  