import BlogClient from "./blog";
import { getContentMasterArticles } from "@/lib/article";

export default async function BlogPage() {
  const data = await getContentMasterArticles();
  return <BlogClient articles={data.articles} />;
}
