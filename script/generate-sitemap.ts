import { getContentMasterArticles } from "@/lib/article";
import { writeFileSync } from "fs";
import { join } from "path";

const DOMAIN = "https://hondaya.co";

async function generateSitemap() {
  try {
    const contents = await getContentMasterArticles();

    const staticPages = [
      {
        url: DOMAIN,
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "monthly",
        priority: "1.0",
      },
      {
        url: `${DOMAIN}/blog`,
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "weekly",
        priority: "0.8",
      },
      {
        url: `${DOMAIN}/blog/feed.xml`,
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "weekly",
        priority: "0.6",
      },
      {
        url: `${DOMAIN}/profile`,
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "monthly",
        priority: "0.7",
      },
      {
        url: `${DOMAIN}/profile/resume`,
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "monthly",
        priority: "0.5",
      },
    ];

    const blogPages = contents.articles.map((article) => ({
      url: `${DOMAIN}/blog/${article.id}`,
      lastmod: article.publishedAt.split("T")[0],
      changefreq: "monthly",
      priority: "0.7",
    }));

    const allPages = [...staticPages, ...blogPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

    const publicDir = join(process.cwd(), "public");
    writeFileSync(join(publicDir, "sitemap.xml"), sitemap);

    console.log("✅ Sitemap generated successfully");
    console.log(`📄 Generated ${allPages.length} URLs`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
  }
}

generateSitemap();
