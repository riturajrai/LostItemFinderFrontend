/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export', // Static export ko comment ya remove rakho, dynamic SSR ke liye
  images: {
    unoptimized: true, // disables Next.js Image Optimization
    domains: ['qr-application.s3.eu-north-1.amazonaws.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mov)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[hash].[ext]',
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;
