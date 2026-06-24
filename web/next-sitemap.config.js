/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://ai-konsulenterne.dk",
  // robots.txt vedligeholdes manuelt i public/robots.txt — next-sitemap
  // tilføjer ellers en ikke-understøttet "Host:"-linje, som Google flagger.
  generateRobotsTxt: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
};
