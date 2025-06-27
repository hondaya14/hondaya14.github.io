"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, Rss } from "lucide-react"
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
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className={`min-h-screen transition-all duration-1000`}>
      <div className="bg-gradient-to-br from-gray-50 via-gray-100/30 to-gray-200/30 dark:from-gray-900 dark:via-gray-800/20 dark:to-gray-700/20 text-foreground min-h-screen overflow-hidden">
        {/* Liquid Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Flowing liquid shapes */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-liquid-float"></div>
          <div className="absolute top-20 -right-40 w-80 h-80 bg-gradient-to-br from-gray-300/20 to-gray-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-liquid-drift animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-gradient-to-br from-gray-500/20 to-gray-700/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-liquid-pulse animation-delay-4000"></div>
          <div className="absolute bottom-20 -right-20 w-72 h-72 bg-gradient-to-br from-gray-200/20 to-gray-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-liquid-wave"></div>

          {/* Dynamic mouse-following liquid */}
          {isClient && (
            <div
              className="absolute w-64 h-64 bg-gradient-to-br from-gray-400/10 to-gray-600/10 rounded-full mix-blend-multiply filter blur-2xl opacity-50 transition-all duration-1000 ease-out pointer-events-none"
              style={{
                left: mousePosition.x - 128,
                top: mousePosition.y - 128,
                transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`,
              }}
            ></div>
          )}

          {/* Flowing wave overlay */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
              <defs>
                <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(107, 114, 128, 0.1)" />
                  <stop offset="50%" stopColor="rgba(75, 85, 99, 0.1)" />
                  <stop offset="100%" stopColor="rgba(55, 65, 81, 0.1)" />
                </linearGradient>
              </defs>
              <path
                d="M0,400 C300,300 600,500 900,400 C1050,350 1200,400 1200,400 L1200,800 L0,800 Z"
                fill="url(#wave-gradient)"
                className="animate-liquid-wave-slow"
              />
              <path
                d="M0,500 C300,400 600,600 900,500 C1050,450 1200,500 1200,500 L1200,800 L0,800 Z"
                fill="url(#wave-gradient)"
                className="animate-liquid-wave-slower"
                opacity="0.5"
              />
            </svg>
          </div>
        </div>

        {/* Simplified Header */}
        <header
          className={`sticky top-0 z-50 w-full transition-all duration-500 ${
            scrolled
              ? "bg-white/20 dark:bg-gray-900/20 backdrop-blur-2xl shadow-liquid border-b border-white/10 dark:border-gray-700/20"
              : "bg-transparent"
          }`}
          style={{
            borderRadius: scrolled ? "0 0 2rem 2rem" : "0",
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-2 transition-all duration-300"
                >
                 <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
                </Link>
              </div>
              <div>
                <Link
                  href="/blog/feed.xml"
                  className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-2 transition-all duration-300 bg-white/20 dark:bg-gray-800/20 hover:bg-white/30 dark:hover:bg-gray-800/30"
                  title="RSS Feed"
                >
                  <Rss className="h-4 w-4" />
                  <span>Subscribe to RSS</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden" aria-labelledby="hero-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-2xl rounded-[3rem] p-6 sm:p-10 shadow-liquid border border-white/20 dark:border-gray-700/20 relative overflow-hidden group hover:shadow-liquid-hover transition-all duration-700">
                {/* Liquid ripple effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400/5 via-transparent to-gray-600/5 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="text-center relative z-10">
                  <h1
                    id="hero-heading"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 animate-liquid-text"
                  >
                    Yasuhisa Honda&apos;s Blog
                  </h1>
                  <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto px-2 animate-liquid-fade-in gray-700 dark:text-gray-400">
                    Tech, work, indie hack, life, poem, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16" aria-labelledby="articles-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="articles-heading"
              className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center animate-liquid-text"
            >
              Recent Articles
            </h2>

            <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
              {articles.map((article, index) => (
                <article
                  key={article.id}
                  className="group animate-liquid-card border-b border-gray-200/30 dark:border-gray-700/30 pb-8 sm:pb-12 last:border-b-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                  aria-labelledby={`article-${article.id}-title`}
                >
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 group-hover:translate-x-2 transition-transform duration-500">
                    <div className="sm:w-1/3">
                      <div className="relative h-48 sm:h-40 overflow-hidden rounded-xl">
                        <Link
                          href={`/blog/${article.id}`}
                          className="focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md decoration-none"
                        > 
                          <Image
                            src={article.eyecatch?.url || "/vercel.svg"}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale"
                            unoptimized={true}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </Link>
                      </div>
                    </div>
                    <div className="sm:w-2/3">
                      <div className="flex flex-wrap items-center gap-3">
                        {article.category && (
                          <Badge
                            variant="secondary"
                            className="text-xs font-medium bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border-0 rounded-full backdrop-blur-sm"
                          >
                            {article.category.name}
                          </Badge>
                        )}
                        <div className="flex items-center text-xs text-foreground/60 gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" aria-hidden="true" />
                            <time dateTime={article.publishedAt}>
                              {(() => {
                                const date = new Date(article.publishedAt);
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                const day = String(date.getDate()).padStart(2, '0');
                                return `${year}/${month}/${day}`;
                              })()}
                            </time>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" aria-hidden="true" />
                            {readTime(article.content)}
                          </span>
                        </div>
                      </div>
                      <Link
                          href={`/blog/${article.id}`}
                          className="focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md no-underline decoration-none"
                      > 
                        <h3 id={`article-${article.id}-title`}
                          className="text-xl sm:text-2xl lg:text-3xl font-bold sm:mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 no-underline"
                        >
                            {article.title}
                        </h3>
                        <p className="text-sm sm:text-base text-foreground/80 mb-4 sm:mb-6 leading-relaxed no-underline">
                          {excerpt(article.content)}
                        </p>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Simple Footer */}
        <footer className="py-8 mt-16" role="contentinfo">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-lg font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                  hondaya&apos;s blog
                </span>
              </div>
              <p className="text-sm text-foreground/60">
                &copy; {isClient ? new Date().getFullYear() : '2024'} Yasuhisa Honda. All rights reserved. {' '}
                <Link href="/privacy" className="underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
