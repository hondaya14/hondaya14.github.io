"use client"

import { Rss } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Article } from "@/lib/type/article"

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '')
}

function excerpt(html: string, length = 120) {
  const text = stripHtml(html)
  return text.length > length ? text.slice(0, length) + '...' : text
}

function readTime(html: string) {
  const words = stripHtml(html).split(/\s+/).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

function RssButton() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
            <Link href="/" className="text-white font-bold no-underline">
                <span>hondaya&apos;s blog</span>
            </Link>
            <div className="flex items-center space-x-4">
                <Link
                    href="/blog/feed.xml"
                    className="flex items-center space-x-2 text-white font-bold no-underline"
                >
                    <Rss className="h-4 w-4" />
                    <span>Subscribe</span>
                </Link>
            </div>
        </div>
    );
}

function Thumbnail(article: Article): React.JSX.Element {
    return (
        <article key={article.id} className="border-b border-gray-600 last:border-b-0">
            {/*hover:from-blue-400 hover:via-black-500 hover:to-blue-600*/}
            <Link href={`/blog/${article.id}`} className="no-underline">
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="sm:w-1/3">
                        <div className="aspect-video bg-[#15171a] rounded overflow-hidden flex items-center justify-center">
                            {article.eyecatch?.url ? (
                                <Image
                                    src={article.eyecatch.url}
                                    alt=""
                                    width={article.eyecatch.width || 400}
                                    height={article.eyecatch.height || 225}
                                    className="max-w-full max-h-full object-contain"
                                    unoptimized={true}
                                />
                            ) : (
                                <div className="flex items-center justify-center">
                                    <span className="text-4xl">🫠</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="sm:w-2/3 space-y-2">
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                            <time dateTime={article.publishedAt} className="font-bold">
                                {(() => {
                                    const date = new Date(article.publishedAt);
                                    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
                                })()}
                            </time>
                            <span className="px-4 py-1 bg-gray-800/30  text-xs rounded-full">{readTime(article.content)}</span>
                            {article.tags.map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-[#222222] text-xs rounded">{tag}</span>
                            ))}
                        </div>
                        <div className=" space-y-1 block">
                            <h3 className="text-xl font-semibold text-white">{article.title}</h3>
                            <p className="text-sm text-gray-300">{excerpt(article.content)}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}

export default function BlogClient({ articles }: { articles: Article[] }) {
  return (
    <div className="min-h-screen bg-[#101114] text-white">
      <header className="sticky top-0 z-50 border-b border-gray-600 bg-[#101114]/90 backdrop-blur">
        <RssButton/>
      </header>
      <main className="py-12">
          {/* Left Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
              {/*<p>Access Ranking</p>*/}
          </aside>

          {/* Main Content */}
          <div className="ml-auto mr-auto flex-1 flex flex-col lg:max-w-4xl">
            <div className="bg-[#15171a] rounded-lg p-5">
                {articles.map((article) => (
                    <Thumbnail key={article.id} {...article} />
                ))}
            </div><ZennExternalLinkBar/>
          </div>

          {/* Right Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
          </aside>
      </main>

      <footer className="py-8 border-t border-gray-600 text-center">
        <p className="text-sm text-white">
          &copy; {new Date().getFullYear()} hondaya.co. All rights reserved.{' '}
          <Link href="/privacy" className="underline text-white">Privacy Policy</Link>
        </p>
      </footer>
    </div>
  )
}

export function ZennExternalLinkBar() {
  return (
    // full witdh animation bar, hover to highlight blue
    <Link
      href="https://zenn.dev/hondaya14"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center"
    >
      <div className=" w-full p-4 mb-8 bg-gradient-to-r from-white-400 via-black-500 to-white-600 rounded-lg flex animate-gradient-x underline hover:from-blue-400 hover:via-black-500 hover:to-blue-600">
        <Image
          src="/zenn-logo-only.svg"
          alt="Zenn"
          width={24}
          height={24}
          className="h-6 w-6"
        />
        <span className="mx-2"> | </span>
        zenn.dev/hondaya14
      </div>
    </Link>
  );
}
