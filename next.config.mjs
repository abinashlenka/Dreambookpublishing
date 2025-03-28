/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'dreambookcoverbucket.s3.ap-south-1.amazonaws.com',
      'm.media-amazon.com' // ✅ Add this line
    ],
  },
};

export default nextConfig;
