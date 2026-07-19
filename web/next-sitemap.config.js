/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://ai-konsulenterne.dk",
  // robots.txt vedligeholdes manuelt i public/robots.txt — next-sitemap
  // tilføjer ellers en ikke-understøttet "Host:"-linje, som Google flagger.
  generateRobotsTxt: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  // Billed-/ikon-ruter er ikke sider — hold dem ude af sitemap'et.
  exclude: [
    "/opengraph-image",
    "/twitter-image",
    "/apple-icon.png",
    "/icon.svg",
    "/*/opengraph-image",
    "/*/twitter-image",
  ],
  transform: async (config, path) => {
    // Prioritér forside og kommercielle sider over juridiske sider.
    let priority = 0.7;
    let changefreq = "weekly";
    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (
      /^\/(skraeddersyede-ai|workshop|visionai|academy|ai-guide|kontakt|cases|ai-analyse|ai-strategi|ai-kundeservice|ai-i-hr|ai-i-e-commerce)/.test(
        path
      )
    ) {
      priority = 0.9;
    } else if (
      /^\/(privatlivspolitik|cookiepolitik|handelsbetingelser)/.test(path)
    ) {
      priority = 0.3;
      changefreq = "yearly";
    } else if (/^\/viden-om-ai/.test(path)) {
      priority = 0.8;
    }
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
