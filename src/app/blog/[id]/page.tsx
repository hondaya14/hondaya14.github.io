import { getArticle, getArticles } from '@/lib/microcms'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  const data = await getArticles()
  return data.contents.map((article) => ({ id: article.id }))
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  try {
    const article = await getArticle(params.id)
    return (
      <article className="prose mx-auto p-4">
        <h1>{article.title}</h1>
        {article.eyecatch?.url && (
          <Image
            src={article.eyecatch.url}
            alt=""
            width={article.eyecatch.width}
            height={article.eyecatch.height}
            className="mb-4"
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    )
  } catch (e) {
    notFound()
  }
}
