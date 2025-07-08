"use client"

import { ArrowLeft, Rss } from "lucide-react"
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
    <div className="min-h-screen bg-[#EFEEDF] text-[#4C4948]">
      <header className="sticky top-0 z-50 border-b border-[#4C4948] bg-[#EFEEDF]/90 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-[#4C4948]">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <Link href="/blog/feed.xml" className="flex items-center space-x-2 text-[#4C4948]">
            <Rss className="h-4 w-4" />
            <span>Subscribe</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#4C4948]">Yasuhisa Honda&apos;s Blog</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#EFEEDF] rounded-lg p-6 shadow-sm border border-[#4C4948]">
                <h3 className="font-semibold mb-3 text-[#4C4948]">Advertisement</h3>
                <div className="h-64 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                  Ad Space
                </div>
              </div>
              <div className="bg-[#EFEEDF] rounded-lg p-6 shadow-sm border border-[#4C4948]">
                <h3 className="font-semibold mb-3 text-[#4C4948]">Links</h3>
                <div className="space-y-2">
                  <div className="h-12 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                    Link Space
                  </div>
                  <div className="h-12 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                    Link Space
                  </div>
                  <div className="h-12 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                    Link Space
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <div className="space-y-12">
              {articles.map((article) => (
                <article key={article.id} className="border-b border-[#4C4948] pb-8 last:border-b-0">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="sm:w-1/3">
                      <Link href={`/blog/${article.id}`} className="block relative h-40 rounded overflow-hidden">
                        <Image
                          src={article.eyecatch?.url || "/vercel.svg"}
                          alt=""
                          fill
                          className="object-cover"
                          unoptimized={true}
                        />
                      </Link>
                    </div>
                    <div className="sm:w-2/3 space-y-2">
                      <div className="flex items-center gap-4 text-sm text-[#4C4948]">
                        <time dateTime={article.publishedAt}>
                          {(() => {
                            const date = new Date(article.publishedAt);
                            return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
                          })()}
                        </time>
                        <span>{readTime(article.content)}</span>
                      </div>
                      <Link href={`/blog/${article.id}`} className="no-underline space-y-1 block">
                        <h3 className="text-xl font-semibold text-[#4C4948]">{article.title}</h3>
                        <p className="text-sm text-[#4C4948]">{excerpt(article.content)}</p>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#EFEEDF] rounded-lg p-6 shadow-sm border border-[#4C4948]">
                <h3 className="font-semibold mb-3 text-[#4C4948]">Popular Posts</h3>
                <div className="space-y-2">
                  <div className="h-16 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                    Popular Post
                  </div>
                  <div className="h-16 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                    Popular Post
                  </div>
                  <div className="h-16 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                    Popular Post
                  </div>
                </div>
              </div>
              <div className="bg-[#EFEEDF] rounded-lg p-6 shadow-sm border border-[#4C4948]">
                <h3 className="font-semibold mb-3 text-[#4C4948]">Categories</h3>
                <div className="space-y-2">
                  <div className="h-8 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                    Category
                  </div>
                  <div className="h-8 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                    Category
                  </div>
                  <div className="h-8 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                    Category
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="py-8 border-t border-[#4C4948] text-center">
        <p className="text-sm text-[#4C4948]">
          &copy; {new Date().getFullYear()} Yasuhisa Honda. All rights reserved.{' '}
          <Link href="/privacy" className="underline text-[#4C4948]">Privacy Policy</Link>
        </p>
      </footer>
    </div>
  )
}
