import BlogClient from "./blog";
import { getContentMasterArticles } from "@/lib/article";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "blogs | hondaya",
};

export default async function BlogPage() {
  const data = await getContentMasterArticles();
  return <BlogClient articles={data.articles} />;
}
