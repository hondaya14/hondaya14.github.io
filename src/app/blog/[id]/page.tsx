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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100/30 to-gray-200/30 dark:from-gray-900 dark:via-gray-800/20 dark:to-gray-700/20 overflow-hidden">
        {/* Liquid Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
          <div className="absolute top-20 -right-40 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-bounce" style={{animationDuration: '8s'}}></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-red-700/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-ping" style={{animationDuration: '6s'}}></div>
          <div className="absolute bottom-20 -right-20 w-72 h-72 bg-gradient-to-br from-indigo-200/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{animationDuration: '4s'}}></div>
        </div>

        <header className="sticky top-0 z-50 w-full bg-white/20 dark:bg-gray-900/20 backdrop-blur-2xl border-b border-white/10 dark:border-gray-700/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  href="/blog"
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full p-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to blog</span>
                </Link>
              </div>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-2xl rounded-[3rem] p-8 sm:p-12 shadow-2xl border border-white/20 dark:border-gray-700/20 relative overflow-hidden group">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              
              <article className="prose dark:prose-invert max-w-none relative z-10">
                <div className="mb-8 flex items-center justify-center">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 bg-white/20 dark:bg-gray-700/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 dark:border-gray-600/20">
                    <Calendar className="h-4 w-4 mr-2" />
                    <time dateTime={article.publishedAt} className="font-medium">{formattedDate}</time>
                  </div>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-gray-100 dark:via-gray-300 dark:to-gray-100 bg-clip-text text-transparent leading-tight">
                  {article.title}
                </h1>
                
                {article.eyecatch?.url && (
                  <div className="my-12 flex justify-center">
                    <div className="relative group/image max-w-2xl mx-auto">
                      <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover/image:opacity-50 transition-opacity duration-500"></div>
                      <Image
                        src={article.eyecatch.url}
                        alt=""
                        width={800}
                        height={400}
                        style={{ 
                          maxWidth: '100%',
                          height: 'auto',
                          objectFit: 'cover'
                        }}
                        className="relative rounded-2xl shadow-2xl group-hover/image:scale-105 transition-transform duration-500"
                        unoptimized={true}
                      />
                    </div>
                  </div>
                )}
                
                <div className="prose-lg dark:prose-lg prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline prose-a:break-words prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:break-words prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-pre:overflow-x-auto prose-blockquote:border-l-purple-500 prose-blockquote:bg-purple-50/50 dark:prose-blockquote:bg-purple-900/20 break-words overflow-wrap-anywhere">
                  <HTMLContent content={article.content || ''} />
                </div>
              </article>
            </div>
          </div>
          <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
        </main>
        
        <footer className="mt-16 py-12 border-t border-white/10 dark:border-gray-700/20 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; 2024 Yasuhisa Honda. All rights reserved. {' '}
                <Link href="/privacy" className="text-purple-600 dark:text-purple-400 hover:underline transition-all duration-300">Privacy Policy</Link>
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
