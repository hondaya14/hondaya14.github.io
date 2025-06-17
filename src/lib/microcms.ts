export type Article = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  } | null;
  category?: {
    id: string;
    name: string;
  } | null;
};

export type ArticleListResponse = {
  contents: Article[];
  totalCount: number;
  offset: number;
  limit: number;
};

const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;

async function fetchFromMicroCMS(endpoint: string) {
  if (!SERVICE_DOMAIN || !API_KEY) {
    throw new Error('MicroCMS environment variables are not set');
  }
  const res = await fetch(`https://${SERVICE_DOMAIN}.microcms.io/api/v1${endpoint}`, {
    headers: {
      'X-MICROCMS-API-KEY': API_KEY,
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return res.json();
}

export async function getArticles(): Promise<ArticleListResponse> {
  return fetchFromMicroCMS('/blog');
}

export async function getArticle(id: string): Promise<Article> {
  return fetchFromMicroCMS(`/blog/${id}`);
}
