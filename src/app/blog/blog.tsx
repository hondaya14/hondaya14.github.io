"use client"

import { Rss } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Article } from "@/lib/microcms"

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

export default function BlogClient({ articles }: { articles: Article[] }) {
  return (
    <div className="min-h-screen bg-[#101114] text-white">
      <header className="sticky top-0 z-50 border-b border-gray-600 bg-[#101114]/90 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="text-white font-bold no-underline">
            <span>hondaya.co</span>
          </Link>
          <Link href="/blog/feed.xml" className="flex items-center space-x-2 text-white font-bold no-underline">
            <Rss className="h-4 w-4" />
            <span>Subscribe</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
          </aside>

          {/* Main Content */}
          <div className="flex-1 lg:max-w-4xl bg-[#15171a] rounded-lg p-6">
            <div className="space-y-12">
              {articles.map((article) => (
                <article key={article.id} className="border-b border-gray-600 pb-8 last:border-b-0">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="sm:w-1/3">
                      <Link href={`/blog/${article.id}`} className="block aspect-video bg-[#15171a] rounded overflow-hidden flex items-center justify-center">
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
                      </Link>
                    </div>
                    <div className="sm:w-2/3 space-y-2">
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <time dateTime={article.publishedAt} className="font-bold">
                          {(() => {
                            const date = new Date(article.publishedAt);
                            return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
                          })()}
                        </time>
                        {article.category && (
                          <span className="px-2 py-1 bg-gray-800/30 backdrop-blur-sm border border-gray-600/40 text-gray-200 text-xs rounded-full">
                            {article.category.name}
                          </span>
                        )}
                        <span className="px-2 py-1 bg-gray-800/30 backdrop-blur-sm border border-gray-600/40 text-gray-200 text-xs rounded-full">
                          {readTime(article.content)}
                        </span>
                      </div>
                      <Link href={`/blog/${article.id}`} className="no-underline space-y-1 block">
                        <h3 className="text-xl font-semibold text-white">{article.title}</h3>
                        <p className="text-sm text-gray-300">{excerpt(article.content)}</p>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
          </aside>
        </div>
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
