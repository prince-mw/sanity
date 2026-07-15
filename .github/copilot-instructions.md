# Moving Walls Website (MWWST) — Copilot Instructions

Marketing website for Moving Walls (OOH advertising tech), content-managed by Sanity, deployed on AWS Amplify (prod + `stg.movingwalls.com`).

> README.md is outdated (says Next 14 / tiny structure) — trust the code and these instructions.

## Tech Stack

- **Next.js 15 (App Router)** + React 19 + TypeScript strict, `@/*` → `./src/*`
- **Tailwind CSS v3** ([tailwind.config.ts](../tailwind.config.ts)): custom `mw-blue`/`mw-gray` palettes, Poppins, `mw-*` shadows, and a **safelist** for classes used in CMS-embedded HTML
- **Sanity v3**: `@sanity/client`, `@portabletext/react`; Studio lives in `studio/` (project `u10im6di`, dataset `production`)
- Framer Motion for animations; `isomorphic-dompurify` for CMS HTML
- `next-intl` is installed but **unused** — i18n is a custom client-side context (see below)

## Commands

- Root: `npm run dev` / `build` / `start` / `lint` — no test suite exists
- Studio: `cd studio && npm run dev` / `build` / `deploy`
- Content scripts: `SANITY_API_TOKEN=... node scripts/<name>.js` (`seed-*` = initial content, `migrate-*`/`import-wordpress-*` = WP migration, `audit-*`/`check-*`/`fix-*` = data QA)
- Deploy: [amplify.yml](../amplify.yml) writes env vars into `.env.production` before build; [next.config.ts](../next.config.ts) also forwards them via `env:` — keep both in sync when adding server env vars

## Architecture: Sanity → Page Pattern

Follow the canonical pattern in [src/app/blog/page.tsx](../src/app/blog/page.tsx):

1. GROQ queries live in [src/sanity/lib/queries.ts](../src/sanity/lib/queries.ts); typed fetch helpers in [src/sanity/lib/fetch.ts](../src/sanity/lib/fetch.ts) (`safeFetch` catches errors, returns a fallback, tags requests `['sanity']`)
2. **Server** `page.tsx`: fetch + `generateMetadata` + `export const revalidate = 60` (used on nearly every page)
3. Renders a **client** shell component `<XxxPageClient>` (suffix conventions: `*PageClient.tsx`, `*DetailClient.tsx`, `*ListClient.tsx`; flat PascalCase files in `src/components/`)
4. **Always fall back to static data** in `src/data/*` when Sanity returns empty/errors — never break this pattern
5. On-demand revalidation via `/api/sanity-webhook` (HMAC-verified)

Other key pieces:
- [src/middleware.ts](../src/middleware.ts): NOT i18n — CMS-driven redirects from Sanity `redirectSettings` (60s in-memory cache)
- Preview mode: `previewClient` + `/api/preview` + `PreviewBanner`; Studio iframe pane resolves preview URLs
- Sanity schemas: `studio/schemas/` (~45 types incl. singletons `megaMenu`, `footerConfig`, `redirectSettings`, `analyticsConfig`)

## i18n (unconventional — read this)

- **No locale routing.** All 5 locales (`en, ja, ko, id, zh`, default `en`) share the same URLs; locale is stored in `localStorage` via [src/i18n/LocaleContext.tsx](../src/i18n/LocaleContext.tsx) (client-only — SSR HTML is always English)
- All `messages/*.json` files are statically imported/bundled; client components use `const { t } = useLocale()`; `t('dot.path')` can return strings, arrays, or objects (arrays get `.map()`ed in JSX); missing key returns the key itself
- When adding translated UI text, add the key to **all 5** `messages/*.json` files with matching nesting (see [BRANDS-PAGE-TRANSLATION-FIX.md](../BRANDS-PAGE-TRANSLATION-FIX.md) for a past nesting bug — note that doc references obsolete 14-locale/`/solutions/*` routes)

## Conventions & Pitfalls

- CMS-sourced HTML must be sanitized via [src/lib/sanitize.ts](../src/lib/sanitize.ts); if that HTML uses Tailwind classes, add them to the safelist in [tailwind.config.ts](../tailwind.config.ts)
- SEO helpers in [src/lib/metadata.ts](../src/lib/metadata.ts); per-page SEO comes from Sanity `pageSeo` documents
- Before editing product pages (`mw-planner`, `mw-market`, `mw-activate`, `mw-measure`, `mw-studio`, `mw-science`, `mw-influence`), consult the matching `docs/data-sync/MW-*-SYNC-STATUS.md` — they document which fields are CMS-wired vs hardcoded
- Zoho CRM forms: `DynamicZohoForm` / `ZohoFormEmbed` components + `/api/zoho-form` + Sanity `zohoForm` documents
- Env vars: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN` (write), `SANITY_API_READ_TOKEN` (preview), `SANITY_PREVIEW_SECRET`, `SANITY_WEBHOOK_SECRET`
- Manual QA checklist: [BROWSER-TESTING.md](../BROWSER-TESTING.md)
