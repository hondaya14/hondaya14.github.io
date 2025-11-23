# Repository Guidelines

## Project Structure & Module Organization

- `src/app` — Next.js App Router. Blog at `src/app/blog`, shared layout in `src/app/layout.tsx`.
- `src/components` — Reusable UI (PascalCase `.tsx`), e.g., `ServerHTMLContent.tsx`.
- `src/lib` — Utilities and integrations (e.g., `article.ts`, `fonts.ts`).
- `public` — Static assets; generated files: `sitemap.xml`, `blog/feed.xml`.
- `script` — Build-time scripts: `generate-rss.ts`, `generate-sitemap.ts`.
- `out` — Static export output (deployed to GitHub Pages).

## Build, Test, and Development Commands

- `bun install` — Install dependencies.
- `bun run dev` — Start Next.js dev server at `http://localhost:3000`.
- `bun run build` — Generate RSS and sitemap, then static export to `out/`.
- `bun run lint` — Run ESLint (Next.js config).
- Preview production export locally: `bunx serve out` (or any static server).

## Coding Style & Naming Conventions

- Language: TypeScript (strict). Paths alias `@/*` map to `src/*`.
- Components: PascalCase files in `src/components`. Routes/pages: lower-case in `src/app`.
- Indentation: 2 spaces; prefer early returns and small, pure functions.
- Styling: Tailwind CSS (via `src/app/globals.css`). Avoid ad‑hoc inline styles.
- Linting: `eslint.config.mjs` extends `next/core-web-vitals` and `next/typescript`.

## Testing Guidelines

- No formal test suite currently. Validate features via `bun run dev` and exported build.
- If adding tests, colocate `*.test.ts(x)` next to source; prefer lightweight unit tests for lib and component behavior tests with React Testing Library.

## Commit & Pull Request Guidelines

- Use Conventional Commits: `feat:`, `fix:`, `chore:`, etc. Keep messages imperative and scoped.
- PRs should include: clear description, linked issues, and screenshots/GIFs for UI changes.
- CI/CD: GitHub Actions builds with Bun and deploys `out/` to Pages.
- Pre-submit checklist: `bun run lint` clean, `bun run build` succeeds, no changes to generated files unless intentional.

## Security & Configuration Tips

- Required env: `MICROCMS_API_KEY` (see `.env.example`). Do not commit `.env`.
- For CI, set `MICROCMS_API_KEY` in repo Secrets. Never hardcode secrets in code or logs.
