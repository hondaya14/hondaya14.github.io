import type { Article } from "@/lib/type/article";

type ArticlesResponse = {
  contents: Article[];
  totalCount?: number;
  offset?: number;
  limit?: number;
};

/**
 * Fetch list of articles from microCMS.
 * - Requires env: `MICROCMS_SERVICE_DOMAIN`, `MICROCMS_API_KEY`
 * - Endpoint: `/api/v1/blog` (customize via `MICROCMS_ENDPOINT` if needed)
 */
export async function getArticles(): Promise<ArticlesResponse> {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  const endpoint = process.env.MICROCMS_ENDPOINT || "blog";

  if (!serviceDomain || !apiKey) {
    // Return empty response rather than throwing to keep build scripts resilient.
    return { contents: [] };
  }

  const url = `https://${serviceDomain}.microcms.io/api/v1/${endpoint}?limit=100`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-MICROCMS-API-KEY": apiKey,
      },
      // Avoid caching during script runs
      cache: "no-store",
    });

    if (!res.ok) {
      // Gracefully degrade to empty contents if API errors out
      return { contents: [] };
    }

    const data = (await res.json()) as ArticlesResponse;
    // Ensure shape
    return { contents: Array.isArray(data.contents) ? data.contents : [] };
  } catch {
    // Network or parse error — return empty contents for robustness
    return { contents: [] };
  }
}

