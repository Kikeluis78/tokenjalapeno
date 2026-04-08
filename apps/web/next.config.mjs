/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  turbopack: {
    root: "/home/garcia/Escritorio/Loteria Mexicana",
  },
}

export default nextConfig
