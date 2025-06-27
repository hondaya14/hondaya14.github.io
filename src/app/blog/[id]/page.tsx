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
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <header className="sticky top-0 z-50 w-full  backdrop-blur-xs border-b border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  href="/blog"
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to blog</span>
                </Link>
              </div>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <article className="prose dark:prose-invert max-w-3xl mx-auto">
            <div className="mb-6 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-1" />
              Published:&nbsp;<time dateTime={article.publishedAt}>{formattedDate}</time>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">{article.title}</h1>
            
            {article.eyecatch?.url && (
              <div className="my-6 flex justify-center">
                <div className="w-full max-w-lg mx-auto">
                  <Image
                    src={article.eyecatch.url}
                    alt=""
                    width={500}
                    height={300}
                    style={{ 
                      maxWidth: '100%',
                      height: 'auto',
                      objectFit: 'contain'
                    }}
                    className="rounded-lg mx-auto"
                    unoptimized={true}
                  />
                </div>
              </div>
            )}
            <div className="prose-a:underline">
              <HTMLContent content={article.content || ''} />
            </div>
          </article>
          <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
        </main>
        
        <footer className="mt-12 py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                &copy; 2024 Yasuhisa Honda. All rights reserved. {' '}
                <Link href="/privacy" className="underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  } catch (e) {
    console.log(e)
    notFound()
  }
}
