# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `bun run dev` - Start development server
- `bun run build` - Build the application (includes RSS and sitemap generation)
- `bun run lint` - Run ESLint
- `bun run gen-rss` - Generate RSS feed only
- `bun run gen-sitemap` - Generate sitemap only

## Build Process

The build process is sequential:
1. `bun run gen-rss` - Creates RSS feed at `public/blog/feed.xml`
2. `bun run gen-sitemap` - Creates sitemap at `public/sitemap.xml`
3. `next build` - Builds the Next.js app with static export

## Architecture

This is a **static export Next.js blog** for Yasuhisa Honda's personal website that deploys to GitHub Pages.

### Content Management
- **MicroCMS**: Headless CMS for blog content
- **API Integration**: `src/lib/microcms.ts` handles all MicroCMS API calls
- **Environment**: Requires `MICROCMS_API_KEY` environment variable

### Key Components
- **Blog List**: `src/app/blog/blog.tsx` - Client component for blog listing
- **Blog Detail**: `src/app/blog/[id]/page.tsx` - Server component for individual posts
- **HTML Content**: `src/components/HTMLContent.tsx` - Renders sanitized HTML from MicroCMS

### Static Generation
- **RSS Feed**: `script/generate-rss.ts` - Generates RSS feed from MicroCMS articles
- **Sitemap**: `script/generate-sitemap.ts` - Generates sitemap including static pages and blog posts
- **Export Mode**: Configured for GitHub Pages deployment with `output: "export"`

### Styling
- **Tailwind CSS**: Used for styling
- **Custom Font**: LINE Seed Sans loaded as local font
- **Responsive Design**: Mobile-first approach with breakpoints

### Key Features
- Progressive Web App (PWA) setup
- Google Analytics integration
- Image optimization for MicroCMS assets
- Twitter widget support for embedded tweets
- SEO optimization with metadata generation

## Important Patterns

### Image Handling
- **Aspect Ratio**: All blog images (list and detail) use 16:9 aspect ratio containers with `object-contain` to preserve image content
- **Background Colors**: Image padding uses `bg-[#15171a]` to match page theme
- **OGP Images**: Dynamic OGP dimensions calculated based on original image aspect ratio for social sharing

### Content Processing
- **HTML Sanitization**: All MicroCMS content processed through HTMLContent component with DOMPurify
- **Syntax Highlighting**: Code blocks automatically highlighted with highlight.js
- **Table Handling**: Tables wrapped in scrollable containers for mobile responsiveness

### API Integration
- **Caching**: 60-second revalidation (`revalidate = 60`) for blog content
- **Error Handling**: Proper fallbacks for missing images and content
- **Static Generation**: Uses `generateStaticParams` for pre-rendering all blog posts

### Dark Theme Architecture
- **Primary Background**: `bg-[#101114]` for main page areas
- **Content Background**: `bg-[#15171a]` for content containers
- **Text Colors**: White primary text with `text-gray-300` for secondary content