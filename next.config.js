/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  turbopack: { root: __dirname },
  ...(!isGithubPages && {
    async rewrites() {
      return [{ source: '/api/contact', destination: `${process.env.CONTACT_API_ORIGIN || 'http://127.0.0.1:4000'}/api/contact` }];
    },
  }),
  ...(isGithubPages && {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

module.exports = nextConfig;
