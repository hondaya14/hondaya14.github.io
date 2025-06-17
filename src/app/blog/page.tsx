import { getArticles } from '@/lib/microcms'
import BlogClient from './BlogClient'

export const revalidate = 60

export default async function BlogPage() {
  const data = await getArticles()
  return <BlogClient articles={data.contents} />
}
