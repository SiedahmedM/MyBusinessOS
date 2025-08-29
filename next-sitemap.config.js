/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://CustomSoftwarePro.com',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
  },
  changefreq: 'weekly',
  priority: 0.8,
  sitemapSize: 5000,
  generateIndexSitemap: false,
}