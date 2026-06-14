"use client";

import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/type/article";
import { getTagColor } from "@/lib/tagColor";

function Thumbnail(article: Article): React.JSX.Element {
  return (
    <article key={article.id}>
      <Link href={`/blog/${article.id}`} className="no-underline">
        <div className="flex flex-col sm:flex-row gap-4 py-3 items-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0">
            <div className="w-full h-full bg-[#101114] rounded overflow-hidden flex justify-center">
              {article.eyecatch?.url ? (
                <Image
                  src={article.eyecatch.url}
                  alt=""
                  width={article.eyecatch.width || 400}
                  height={article.eyecatch.height || 225}
                  className="max-w-full max-h-full object-contain flex items-center justify-center"
                  unoptimized={true}
                />
              ) : (
                <div className="flex items-center justify-center">
                  <span className="text-2xl">🫠</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-4 text-xs text-gray-300">
              <time dateTime={article.publishedAt}>
                {(() => {
                  const date = new Date(article.publishedAt);
                  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
                })()}
              </time>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-2 py-0.5 bg-gray-800/50 rounded ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xs font-medium text-gray-300">{article.title}</h3>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function BlogClient({ articles }: { articles: Article[] }) {
  return (
    <div className="py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">{/*<p>Access Ranking</p>*/}</aside>

        {/* Main Content */}
        <div className="ml-auto mr-auto flex-1 flex flex-col lg:max-w-4xl">
          <div className="mb-6 flex items-center gap-4">
            <ZennExternalLinkBar />
            <QiitaExternalLink />
          </div>
          <div className="space-y-4">
            {articles.map((article) => (
              <Thumbnail key={article.id} {...article} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0"></aside>
      </div>
    </div>
  );
}

export function ZennExternalLinkBar() {
  return (
    <Link
      href="https://zenn.dev/hondaya14"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-base text-gray-400 hover:text-blue-400 transition-colors no-underline"
      title="Zenn (外部サイト)"
    >
      <img src="/zenn-logo-only.svg" alt="Zenn" width={20} height={20} className="w-5 h-5" />
      <span>zenn</span>
    </Link>
  );
}

function QiitaExternalLink() {
  return (
    <Link
      href="https://qiita.com/hondaya14"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-base text-gray-400 hover:text-green-400 transition-colors no-underline"
      title="Qiita (外部サイト)"
    >
      <img src="/qiita-icon.png" alt="Qiita" width={20} height={20} className="w-5 h-5" />
      <span>qiita</span>
    </Link>
  );
}
