import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Article } from '@/lib/type/article';
import { getArticles } from '@/lib/article';
import { Feed } from 'feed';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generateRssFeed() {
  try {
    console.log('🏃‍♂️ Start generate RSS feed...');
    
    // APIキーの確認
    if (!process.env.MICROCMS_API_KEY) {
      throw new Error('Not setted MICROCMS_API_KEY.');
    }

    // 記事データの取得
    const { articles } = await getArticles();
    console.log(`✅ Got ${articles.length} articles`);

    const siteURL = 'https://hondaya.co';
    const date = new Date();
    
    // フィード作成
    const feed = new Feed({
      title: 'hondaya blog feed',
      description: 'hondaya blog feed',
      id: siteURL,
      link: siteURL,
      language: 'ja',
      image: `${siteURL}/icon.png`,
      favicon: `${siteURL}/favicon.ico`,
      copyright: `All rights reserved ${date.getFullYear()}`,
      updated: date,
      feedLinks: {
        rss2: `${siteURL}/blog/feed.xml`,
      },
      author: {
        name: 'hondaya.co',
        link: siteURL,
      },
    });

    // 記事をフィードに追加
    articles.forEach((post: Article) => {
      const url = `${siteURL}/blog/${post.id}`;
      
      feed.addItem({
        title: post.title,
        id: url,
        link: url,
        description: post.content.substring(0, 100).replace(/<[^>]*>/g, ''),
        content: post.content,
        author: [
          {
            name: 'hondaya.co',
            link: siteURL,
          },
        ],
        date: new Date(post.publishedAt),
      });
    });

    // 出力ディレクトリの作成
    const outputDir = path.join(__dirname, '../public/blog');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // RSSフィードの書き込み
    const outputPath = path.join(outputDir, 'feed.xml');
    fs.writeFileSync(outputPath, feed.rss2());

    console.log(`🆗 Generated RSS feed: ${outputPath}`);
    return true;
  } catch (error) {
    console.error('❌ Error occurred while generating RSS feed:', error);
    process.exit(1);
  }
}

// スクリプトが直接実行された場合に実行
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateRssFeed();
}

export default generateRssFeed;
