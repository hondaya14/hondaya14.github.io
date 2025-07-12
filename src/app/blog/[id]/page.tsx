import { getArticle, getArticles } from '@/lib/microcms'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import Script from 'next/script'
import { HTMLContent } from '@/components/HTMLContent'
import { ExpandableImage } from '@/components/ExpandableImage'

export const revalidate = 60

export async function generateStaticParams() {
  const data = await getArticles()
  return data.contents.map((article) => ({ id: article.id }))
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const resolvedParams = await props.params;
    const article = await getArticle(resolvedParams.id)
    
    return {
      title: article.title,
      description: article.content ? article.content.slice(0, 20).replace(/<[^>]*>/g, '') : undefined,
      openGraph: {
        title: article.title,
        description: article.content ? article.content.slice(0, 20).replace(/<[^>]*>/g, '') : undefined,
        images: article.eyecatch?.url ? [
          {
            url: article.eyecatch.url,
            width: article.eyecatch.width,
            height: article.eyecatch.height,
            alt: article.title,
          }
        ] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.content ? article.content.slice(0, 100).replace(/<[^>]*>/g, '') : undefined,
        images: article.eyecatch?.url ? [article.eyecatch.url] : undefined,
      },
    }
  } catch (e) {
    console.log(e)
    return {
      title: 'Article Not Found',
    }
  }
}

export default async function BlogDetailPage(props: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await props.params;
    const article = await getArticle(resolvedParams.id)
    const publishDate = new Date(article.publishedAt)
    const formattedDate = `${publishDate.getFullYear()}/${String(publishDate.getMonth() + 1).padStart(2, '0')}/${String(publishDate.getDate()).padStart(2, '0')}`

    return (
      <div className="min-h-screen bg-[#EFEEDF] text-[#4C4948] font-sans">
        <header className="sticky top-0 z-50 border-b border-[#4C4948] bg-[#EFEEDF]/90 backdrop-blur">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center">
            <Link href="/blog" className="flex items-center space-x-2 text-[#4C4948]">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to blog</span>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="bg-[#EFEEDF] rounded-lg p-6 shadow-sm border border-[#4C4948]">
                  <h3 className="font-semibold mb-3 text-[#4C4948]">Advertisement</h3>
                  <div className="h-64 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">

                  </div>
                </div>
                <div className="bg-[#EFEEDF] rounded-lg p-6 shadow-sm border border-[#4C4948]">
                  <h3 className="font-semibold mb-3 text-[#4C4948]">Related Posts</h3>
                  <div className="space-y-2">
                    <div className="h-16 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                      Related Post
                    </div>
                    <div className="h-16 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                      Related Post
                    </div>
                    <div className="h-16 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                      Related Post
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <article className="prose mx-auto">
                <div className="mb-4 text-sm text-[#4C4948] flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={article.publishedAt}>{formattedDate}</time>
                </div>
                <h1 className="text-3xl font-bold mb-6 text-[#4C4948]">{article.title}</h1>

                {article.eyecatch?.url && (
                  <div className="flex justify-center mb-6">
                    <ExpandableImage
                      src={article.eyecatch.url}
                      alt=""
                      width={400}
                      height={200}
                      className="rounded"
                    />
                  </div>
                )}

                <HTMLContent content={article.content || ''} />
              </article>
            </div>

            {/* Right Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="bg-[#EFEEDF] rounded-lg p-6 shadow-sm border border-[#4C4948]">
                  <h3 className="font-semibold mb-3 text-[#4C4948]">Table of Contents</h3>
                  <div className="space-y-2">
                    <div className="h-8 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                      TOC Item
                    </div>
                    <div className="h-8 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                      TOC Item
                    </div>
                    <div className="h-8 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                      TOC Item
                    </div>
                  </div>
                </div>
                <div className="bg-[#EFEEDF] rounded-lg p-6 shadow-sm border border-[#4C4948]">
                  <h3 className="font-semibold mb-3 text-[#4C4948]">Share</h3>
                  <div className="space-y-2">
                    <div className="h-10 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                      Share Button
                    </div>
                    <div className="h-10 bg-[#EFEEDF] border border-[#4C4948] rounded flex items-center justify-center text-[#4C4948]">
                      Share Button
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
        </main>

        <footer className="py-8 border-t border-[#4C4948] text-center">
          <p className="text-sm text-[#4C4948]">
            &copy; 2024 Yasuhisa Honda. All rights reserved.{' '}
            <Link href="/privacy" className="underline text-[#4C4948]">Privacy Policy</Link>
          </p>
        </footer>
      </div>
    )
  } catch (e) {
    console.log(e)
    notFound()
  }
}
