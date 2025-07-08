import { getArticle, getArticles } from '@/lib/microcms'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import Script from 'next/script'
import { HTMLContent } from '@/components/HTMLContent'

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
      <div className="min-h-screen bg-[#f7f7f7] text-[#222] font-sans">
        <header className="sticky top-0 z-50 border-b bg-[#f7f7f7]/90 backdrop-blur">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center">
            <Link href="/blog" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to blog</span>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="prose mx-auto">
            <div className="mb-4 text-sm text-gray-600 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={article.publishedAt}>{formattedDate}</time>
            </div>
            <h1 className="text-3xl font-bold mb-6">{article.title}</h1>

            {article.eyecatch?.url && (
              <Image
                src={article.eyecatch.url}
                alt=""
                width={800}
                height={400}
                className="rounded mb-6"
                unoptimized={true}
              />
            )}

            <HTMLContent content={article.content || ''} />
          </article>
          <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
        </main>

        <footer className="py-8 border-t text-center">
          <p className="text-sm">
            &copy; 2024 Yasuhisa Honda. All rights reserved.{' '}
            <Link href="/privacy" className="underline">Privacy Policy</Link>
          </p>
        </footer>
      </div>
    )
  } catch (e) {
    console.log(e)
    notFound()
  }
}
