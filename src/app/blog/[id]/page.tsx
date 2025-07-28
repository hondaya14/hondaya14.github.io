import { getArticle, getArticles } from '@/lib/microcms'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar } from 'lucide-react'
import { Metadata } from 'next'
import Script from 'next/script'
import { ServerHTMLContent } from '@/components/ServerHTMLContent'
import { ExpandableImage } from '@/components/ExpandableImage'
import { lineSeedFont } from '@/lib/fonts'

export const revalidate = 60

export async function generateStaticParams() {
  const data = await getArticles()
  return data.contents.map((article) => ({ id: article.id }))
}

function calculateOGPDimensions(originalWidth: number, originalHeight: number) {
  const targetRatio = 16 / 9
  const originalRatio = originalWidth / originalHeight
  
  if (originalRatio > targetRatio) {
    // 横長画像：横幅基準で16:9枠を作成
    const width = originalWidth
    const height = Math.round(width / targetRatio)
    return { width, height }
  } else {
    // 縦長画像：縦幅基準で16:9枠を作成
    const height = originalHeight
    const width = Math.round(height * targetRatio)
    return { width, height }
  }
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const resolvedParams = await props.params;
    const article = await getArticle(resolvedParams.id)
    const ogpDimensions = article.eyecatch?.width && article.eyecatch?.height 
      ? calculateOGPDimensions(article.eyecatch.width, article.eyecatch.height)
      : undefined
    
    return {
      title: `${article.title} | hondaya's blog`,
      description: article.content ? article.content.slice(0, 20).replace(/<[^>]*>/g, '') : undefined,
      openGraph: {
        title: article.title,
        description: article.content ? article.content.slice(0, 20).replace(/<[^>]*>/g, '') : undefined,
        images: article.eyecatch?.url && ogpDimensions ? [
          {
            url: article.eyecatch.url,
            width: ogpDimensions.width,
            height: ogpDimensions.height,
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
      <div className="min-h-screen bg-[#101114] text-white font-sans">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:max-w-4xl bg-[#15171a] rounded-lg p-6">
              <article className="prose mx-auto">
                <div className="mb-4 text-sm text-gray-300 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={article.publishedAt}>{formattedDate}</time>
                </div>
                <h1 className={`text-3xl font-semibold mb-6 text-white ${lineSeedFont.className}`}>{article.title}</h1>

                {article.eyecatch?.url && (
                  <div className="flex justify-center mb-6">
                    <div className="w-full max-w-2xl aspect-video bg-[#15171a] rounded overflow-hidden flex items-center justify-center">
                      <ExpandableImage
                        src={article.eyecatch.url}
                        alt=""
                        width={article.eyecatch.width || 800}
                        height={article.eyecatch.height || 450}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                <ServerHTMLContent content={article.content || ''} />
              </article>
            </div>

            {/* Right Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
            </aside>
          </div>
          <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
        </main>

        <footer className="py-8 border-t border-gray-600 text-center">
          <p className="text-sm text-white">
            &copy; 2024 hondaya.co. All rights reserved.{' '}
            <Link href="/privacy" className="underline text-white">Privacy Policy</Link>
          </p>
        </footer>
      </div>
    )
  } catch (e) {
    console.log(e)
    notFound()
  }
}
