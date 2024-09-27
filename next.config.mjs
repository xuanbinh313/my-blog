console.log("ENV: ", process.env.NODE_ENV);
/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NODE_ENV === 'production' ? '.build' : '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },  
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ]
  },
};
export default nextConfig;
