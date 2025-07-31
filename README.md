# hondaya14.github.io

This repository contains the source code for [hondaya.co](https://hondaya.co), Yasuhisa Honda's personal website and blog. The site is built with **Next.js** and styled with **Tailwind CSS**. Blog articles are managed using **microCMS** and the project is designed to be statically exported for deployment to GitHub Pages.

## Development

Install dependencies with **bun** and start the development server:

```bash
bun install
bun run dev
```

## Build

Generating the production build also creates the RSS feed and sitemap:

```bash
bun run build
```

- `bun run gen-rss` generates `public/blog/feed.xml`.
- `bun run gen-sitemap` generates `public/sitemap.xml` referenced by `public/robots.txt`.

## Environment Variables

Access to microCMS requires the `MICROCMS_API_KEY` environment variable.
Fetching Amazon product data uses the Product Advertising API and requires the
`AMAZON_ACCESS_KEY`, `AMAZON_SECRET_KEY` and `AMAZON_PARTNER_TAG` variables.
See `.env.example` for all required keys.

## Scripts

- `bun run dev` - start Next.js in development mode
- `bun run build` - run RSS and sitemap generation then build
- `bun run lint` - run ESLint
- `bun run gen-rss` - generate RSS feed only
- `bun run gen-sitemap` - generate sitemap only

## License

All content and code in this repository are distributed under the MIT License unless otherwise noted.
