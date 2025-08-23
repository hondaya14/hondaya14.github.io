import { getArticles } from '@/lib/microcms'
import BlogClient from '../blog'

export const revalidate = 60

export default async function PostsPage() {
  const data = await getArticles()
  return <BlogClient articles={data.contents} />
}
