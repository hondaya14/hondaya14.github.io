import type { Article } from "@/lib/type/article";
import type { Frontmatter } from "@/lib/type/frontmatter";
import fs from "fs/promises";
import path from "path";

type ArticlesResponse = {
  articles: Article[];
};

/**
 * Parse a markdown file string with frontmatter into Frontmatter + body.
 */
function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  if (!raw.startsWith("---")) return { data: { title: "", date: "", tags: [] }, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: { title: "", date: "", tags: [] }, body: raw };
  const header = raw.slice(3, end + 1).trim();
  const body = raw.slice(end + 4).replace(/^\n+/, "");
  const interim: Record<string, unknown> = {};
  for (const line of header.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_\-]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1].trim();
    let value = m[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value.startsWith("[") && value.endsWith("]")) {
      const arr = value.slice(1, -1).trim();
      interim[key] = arr ? arr.split(/\s*,\s*/).map(v => v.replace(/^['\"]|['\"]$/g, "")) : [];
    } else {
      interim[key] = value;
    }
  }
  const data: Frontmatter = {
    title: typeof interim.title === "string" ? interim.title : "",
    date: typeof interim.date === "string" ? interim.date : "",
    tags: Array.isArray(interim.tags)
      ? (interim.tags as unknown[]).map(String)
      : typeof interim.tags === "string" && interim.tags
        ? [String(interim.tags)]
        : [],
  };
  return { data, body };
}

/**
 * Read local markdown posts and build Article objects.
 */
export async function getContentMasterArticles(): Promise<ArticlesResponse> {
  const rootDir = path.join(process.cwd(), "content-master", "blogs");
  let slugs: string[] = [];
  try {
    const entries = await fs.readdir(rootDir, { withFileTypes: true });
    slugs = entries.filter(e => e.isDirectory()).map(e => e.name);
  } catch {
    slugs = [];
  }

  const articles: Article[] = [];
  for (const slug of slugs) {
    const mdPath = path.join(rootDir, slug, `${slug}.md`);
    try {
      const raw = await fs.readFile(mdPath, "utf8");
      const { data, body } = parseFrontmatter(raw);
      const nowIso = new Date().toISOString();
      const parsed = data.date ? new Date(data.date) : new Date();
      const dateIso = isNaN(parsed.getTime()) ? nowIso : parsed.toISOString();

      const thumbPublicUrl = `/blogs/${slug}/thumbnail.png`;
      const contentThumb = path.join(rootDir, slug, "thumbnail.png");
      let eyecatchUrl: string | null = null;
      try {
        await fs.access(contentThumb);
        eyecatchUrl = thumbPublicUrl;
      } catch {
          eyecatchUrl = null;
      }

      articles.push({
        id: slug,
        publishedAt: dateIso,
        title: data.title || slug,
        content: body,
        eyecatch: eyecatchUrl ? { url: eyecatchUrl, width: 800, height: 450 } : null,
        category: null,
      });
    } catch {
      continue;
    }
  }
  articles.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  return { articles: articles };
}

/** Load a single article by slug from content-master. */
export async function getContentMasterArticle(slug: string): Promise<Article | null> {
  const rootDir = path.join(process.cwd(), "content-master", "blogs");
  const mdPath = path.join(rootDir, slug, `${slug}.md`);
  try {
    const raw = await fs.readFile(mdPath, "utf8");
    const { data, body } = parseFrontmatter(raw);
    const nowIso = new Date().toISOString();
    const parsed = data.date ? new Date(data.date) : new Date();
    const dateIso = isNaN(parsed.getTime()) ? nowIso : parsed.toISOString();

    const thumbPublicUrl = `/blogs/${slug}/thumbnail.png`;
    const thumbPublicUrlTypo = `/blogs/${slug}/thumnbnail.png`;
    const contentThumb = path.join(rootDir, slug, "thumbnail.png");
    const contentThumbTypo = path.join(rootDir, slug, "thumnbnail.png");
    let eyecatchUrl: string | null = null;
    try {
      await fs.access(contentThumb);
      eyecatchUrl = thumbPublicUrl;
    } catch {
      try {
        await fs.access(contentThumbTypo);
        eyecatchUrl = thumbPublicUrlTypo;
      } catch {
        eyecatchUrl = null;
      }
    }

    return {
      id: slug,
      createdAt: dateIso,
      updatedAt: dateIso,
      publishedAt: dateIso,
      title: data.title || slug,
      content: body,
      eyecatch: eyecatchUrl ? { url: eyecatchUrl, width: 800, height: 450 } : null,
      category: null,
    };
  } catch {
    return null;
  }
}
