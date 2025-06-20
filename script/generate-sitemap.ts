import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Article, getArticles } from '../src/lib/microcms';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generateSitemap() {
  try {
    console.log('\uD83C\uDFC3\u200D\u2640\uFE0F Start generate sitemap...');

    if (!process.env.MICROCMS_API_KEY) {
      throw new Error('Not setted MICROCMS_API_KEY.');
    }

    const { contents } = await getArticles();
    console.log(`\u2705 Got ${contents.length} articles`);

    const siteURL = 'https://hondaya.co';
    const staticPaths = ['', '/blog', '/privacy'];

    const urls = [
      ...staticPaths.map((p) => ({ loc: `${siteURL}${p}`, lastmod: new Date().toISOString() })),
      ...contents.map((post: Article) => ({ loc: `${siteURL}/blog/${post.id}`, lastmod: post.publishedAt })),
    ];

    const xml =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n') +
      '\n</urlset>';

    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, xml);

    console.log(`\uD83C\uDD97 Generated sitemap: ${outputPath}`);
    return true;
  } catch (error) {
    console.error('\u274C Error occurred while generating sitemap:', error);
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateSitemap();
}

export default generateSitemap;
