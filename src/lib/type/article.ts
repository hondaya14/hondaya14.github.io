export type Article = {
  id: string;
  publishedAt: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  } | null;
  tags: string[];
};
