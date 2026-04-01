import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['static.usernames.app-backend.toolsforhumanity.com'],
  },
  allowedDevOrigins: ['https://9d19-2806-2a0-a28-848b-6ccb-d80b-eedb-f3df.ngrok-free.app'],
  reactStrictMode: false,
};

export default nextConfig;
