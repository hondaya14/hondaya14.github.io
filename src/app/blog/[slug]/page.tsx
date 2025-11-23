import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import type { Metadata } from "next";
import Script from "next/script";
import { ExpandableImage } from "@/components/ExpandableImage";
import { LINE_SEED } from "@/lib/fonts";
import { getContentMasterArticle } from "@/lib/article";
import { mdxCodeComponents } from "@/components/MdxCode";
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs";

export async function generateStaticParams() {
  // Build static params from content-master/blogs
  const slugs = fs
    .readdirSync("content-master/blogs", { withFileTypes: true })
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
      <div className="min-h-screen bg-[#101114] text-white font-sans">
        <main className="py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0"></aside>

            {/* Main Content */}
            <div className="ml-auto mr-auto bg-[#15171a] rounded-lg p-6">
              <article className="ml-auto mr-auto">
                <div className="mb-4 text-sm text-gray-300 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={article.publishedAt}>{formattedDate}</time>
                  {article.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-[#222222] text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className={`text-3xl font-semibold mb-6 text-white ${LINE_SEED.className}`}>
                  {article.title}
                </h1>

                {article.eyecatch?.url && (
                  <div className="flex justify-center mb-6">
                    <div className="w-1/2 max-w-2xl aspect-video bg-[#15171a] rounded overflow-hidden flex items-center justify-center">
                      <ExpandableImage
                        src={article.eyecatch.url}
                        alt=""
                        width={article.eyecatch.width}
                        height={article.eyecatch.height}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                <div className="text-gray-300 leading-loose">
                  <MDXRemote source={article.content} components={mdxCodeComponents} />
                </div>
              </article>
            </div>

            {/* Right Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0"></aside>
          </div>
          <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
        </main>

        <footer className="py-8 border-t border-gray-600 text-center">
          <p className="text-sm text-white">
            &copy; 2024 hondaya.co. All rights reserved.{" "}
            <Link href="/privacy" className="underline text-white">
              Privacy Policy
            </Link>
          </p>
        </footer>
      </div>
    );
  } catch (e) {
    console.log(e);
    notFound();
  }
}
