/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '15.228.199.21',
        port: '',
        pathname: '/imagen/**',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
        port: '',
        pathname: '/image-vector/**',
      },
    ],
  },
};



export default nextConfig;
