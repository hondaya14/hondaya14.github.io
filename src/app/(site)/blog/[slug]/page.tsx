import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";
import { ExpandableImage } from "@/components/ExpandableImage";
import { getContentMasterArticle } from "@/lib/article";
import { mdxCodeComponents } from "@/components/MdxCode";
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs";

export async function generateStaticParams() {
  // Build static params from content-master/blog
  const slugs = fs
    .readdirSync("content-master/blog", { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map(({ name }) => ({ slug: name }));
  return slugs;
}

function calculateOGPDimensions(originalWidth: number, originalHeight: number) {
  const targetRatio = 16 / 9;
  const originalRatio = originalWidth / originalHeight;

  if (originalRatio > targetRatio) {
    // 横長画像：横幅基準で16:9枠を作成
    const width = originalWidth;
    const height = Math.round(width / targetRatio);
    return { width, height };
  } else {
    // 縦長画像：縦幅基準で16:9枠を作成
    const height = originalHeight;
    const width = Math.round(height * targetRatio);
    return { width, height };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await getContentMasterArticle(slug);
    if (!article) return { title: "Article Not Found" };
    const ogpDimensions =
      article.eyecatch?.width && article.eyecatch?.height
        ? calculateOGPDimensions(article.eyecatch.width, article.eyecatch.height)
        : undefined;

    return {
      title: `${article.title} | hondaya's blog`,
      description: article.content
        ? article.content.slice(0, 20).replace(/<[^>]*>/g, "")
        : undefined,
      openGraph: {
        title: article.title,
        description: article.content
          ? article.content.slice(0, 20).replace(/<[^>]*>/g, "")
          : undefined,
        images:
          article.eyecatch?.url && ogpDimensions
            ? [
                {
                  url: article.eyecatch.url,
                  width: ogpDimensions.width,
                  height: ogpDimensions.height,
                  alt: article.title,
                },
              ]
            : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.content
          ? article.content.slice(0, 100).replace(/<[^>]*>/g, "")
          : undefined,
        images: article.eyecatch?.url ? [article.eyecatch.url] : undefined,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      title: "Article Not Found",
    };
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const article = await getContentMasterArticle(slug);
    if (!article) return notFound();
    const publishDate = new Date(article.publishedAt);
    const formattedDate = `${publishDate.getFullYear()}/${String(publishDate.getMonth() + 1).padStart(2, "0")}/${String(publishDate.getDate()).padStart(2, "0")}`;

    return (
      <div className="article-detail-page">
        <article aria-labelledby="article-title">
          <header className="article-detail-header">
            <h1 id="article-title" className="article-heading">
              {article.title}
            </h1>
            <div className="article-detail-meta">
              <time dateTime={article.publishedAt}>{formattedDate}</time>
              {article.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </header>
          {article.eyecatch?.url && (
            <div className="article-eyecatch">
              <ExpandableImage
                src={article.eyecatch.url}
                alt={article.title}
                width={article.eyecatch.width}
                height={article.eyecatch.height}
              />
            </div>
          )}
          <div className="blog-content">
            <MDXRemote source={article.content} components={mdxCodeComponents} />
          </div>
        </article>
        <nav className="article-detail-navigation" aria-label="Article navigation">
          <Link href="/blog">← Blog</Link>
        </nav>
        <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
      </div>
    );
  } catch (e) {
    console.log(e);
    notFound();
  }
}
