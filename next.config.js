const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'localhost',
      's3.ap-northeast-1.amazonaws.com',
      'res.cloudinary.com',
    ],
  },
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
  },
};

module.exports = withMDX(nextConfig);
