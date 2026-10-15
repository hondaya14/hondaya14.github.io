import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/type/article";
import { PageHero } from "@/components/PageHero";

function Thumbnail({ article }: { article: Article }) {
  const date = new Date(article.publishedAt);
  const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
  return (
    <article>
      <Link href={`/blog/${article.id}`} className="article-link">
        {article.eyecatch?.url ? (
          <Image
            src={article.eyecatch.url}
            alt=""
            width={article.eyecatch.width || 400}
            height={article.eyecatch.height || 225}
            className="article-thumbnail"
            unoptimized
          />
        ) : (
          <span className="article-placeholder" aria-hidden="true">
            Blog
          </span>
        )}
        <div>
          <div className="article-meta">
            <time dateTime={article.publishedAt}>{formattedDate}</time>
            {article.tags.map((tag) => (
              <span key={tag} className="article-tag">
                {tag}
              </span>
            ))}
          </div>
          <h2 className="article-title">{article.title}</h2>
        </div>
      </Link>
    </article>
  );
}

export default function BlogClient({ articles }: { articles: Article[] }) {
  return (
    <>
      <PageHero title="Blog" photo="cherry-river" />
      <div className="reading-page page-hero-body">
        <nav className="blog-list-toolbar" aria-label="Blog resources">
          <div className="blog-external-links">
            <ZennExternalLinkBar />
            <QiitaExternalLink />
          </div>
          <Link href="/blog/feed.xml" className="blog-subscribe">
            Subscribe
          </Link>
        </nav>
        <div className="article-list">
          {articles.map((article) => (
            <Thumbnail key={article.id} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}

export function ZennExternalLinkBar() {
  return (
    <Link
      href="https://zenn.dev/hondaya14"
      target="_blank"
      rel="noopener noreferrer"
      title="Zenn (外部サイト)"
    >
      <Image src="/zenn-logo-only.svg" alt="" width={16} height={16} unoptimized />
      <span>Zenn</span>
    </Link>
  );
}

function QiitaExternalLink() {
  return (
    <Link
      href="https://qiita.com/hondaya14"
      target="_blank"
      rel="noopener noreferrer"
      title="Qiita (外部サイト)"
    >
      <Image src="/qiita-icon.png" alt="" width={16} height={16} unoptimized />
      <span>Qiita</span>
    </Link>
  );
}
