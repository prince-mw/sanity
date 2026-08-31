---
name: mw-website
description: Deep architectural knowledge of the Moving Walls marketing website (Next.js 15 + Sanity CMS, monorepo at repo root + studio/). Use whenever working on this repo — adding/editing pages, wiring Sanity content, touching i18n, forms, redirects, or product pages.
---

# Moving Walls Website (MWWST)

Marketing website for **Moving Walls** (an OOH/DOOH — Out-of-Home advertising — adtech company). Content-managed by **Sanity**, deployed on **AWS Amplify** (production `movingwalls.com` + staging `stg.movingwalls.com`).

Two npm projects live in this one repo:
- **Root** (`/`) — the Next.js website. `npm run dev` / `build` / `start` / `lint`. No test suite exists.
- **`studio/`** — the Sanity Studio (CMS admin UI). `cd studio && npm run dev` / `build` / `deploy`.

> `README.md` at repo root is stale (describes Next 14 and a tiny component list) — trust this file and the code, not that README.

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript strict**, path alias `@/*` → `./src/*`
- **Tailwind CSS v3** ([tailwind.config.ts](../../tailwind.config.ts)): custom `mw-blue` / `mw-gray` color scales, Poppins font, `mw-*` shadow tokens, and a **safelist** array — required for any Tailwind class that only appears inside CMS-authored HTML (see Conventions below)
- **Sanity v3**: `@sanity/client`, `@sanity/image-url`, `@portabletext/react`. Project ID `u10im6di`, dataset `production`. Studio config/schemas live in `studio/`
- **Framer Motion** for animation; `isomorphic-dompurify` for sanitizing CMS-sourced HTML
- `next-intl` is installed but **unused** — i18n is entirely custom (see below)
- `styled-components` present but Tailwind is the dominant styling approach

## Content architecture: the "Sanity → Page" pattern

This is the single most important pattern in the codebase. Canonical example: [src/app/blog/page.tsx](../../src/app/blog/page.tsx).

1. **GROQ queries** live in [src/sanity/lib/queries.ts](../../src/sanity/lib/queries.ts) and [src/sanity/lib/fetch.ts](../../src/sanity/lib/fetch.ts) (the latter is a ~4000-line file with typed fetch helpers + transform functions for nearly every content type — blog, case studies, events, press releases, team members, webinars, jobs, ebooks, whitepapers, locations, etc.)
2. Every fetch goes through `safeFetch<T>(query, params, fallback)` in `fetch.ts`, which:
   - Deduplicates identical query+params within one render tree via React's `cache()` (so `generateMetadata` + the page body calling the same query don't double-fetch)
   - Catches errors and returns the fallback instead of throwing (never crashes the page on a Sanity outage)
   - Tags every request `['sanity']` for `revalidateTag('sanity')` support
3. Content queries filter on a **publishing workflow** — either:
   - `publishedFilter`: `isPublished == true && status == "published" && (scheduledPublishAt == null || scheduledPublishAt <= now())` — strict, for types with full workflow support (blog, case studies)
   - `safePublishedFilter`: `isPublished != false && status != "archived" && (scheduledPublishAt == null || scheduledPublishAt <= now())` — lenient, for types where older seeded/migrated docs may not have workflow fields set
4. **Server** `page.tsx` per route: fetch data + `generateMetadata` (SEO) + `export const revalidate = 60` (or 30 on some pages — check the specific file, don't assume)
5. Server component renders a **client** shell component. Naming convention:
   - `*PageClient.tsx` — full page client component (e.g. `BlogListClient`)
   - `*DetailClient.tsx` — single-item detail page (e.g. `CaseStudyDetailClient`)
   - `*ListClient.tsx` — listing page
   - All live flat in `src/components/` (PascalCase, no subfolders except `landing/`, `product-sections/`, `animations/`)
6. **Always fall back to static data** in `src/data/*.ts` when Sanity returns empty or errors — this fallback is load-bearing (keeps the site up during a Sanity outage or empty dataset) and must never be removed when editing a page
7. Portable Text (Sanity's rich-text format) is converted to HTML via `portableTextToHtml()` in `fetch.ts`, which hand-renders block types: headings, blockquote, lists, code blocks, HTML embeds, videos (uploaded file or YouTube/Vimeo URL), images, callouts, stat blocks, CTA buttons, tables, testimonial blocks, accordions. The output is always run through `sanitizeHtml()` ([src/lib/sanitize.ts](../../src/lib/sanitize.ts)) before being set as `dangerouslySetInnerHTML`.
8. On-demand cache invalidation via `/api/sanity-webhook` (see below) — don't rely solely on the `revalidate` timer when debugging "why isn't my CMS edit showing up."

### Sanity client setup ([src/sanity/lib/client.ts](../../src/sanity/lib/client.ts))

Three clients, pick the right one:
- `client` — public reads, `useCdn: true` (fast, cached, used by nearly all page fetches)
- `previewClient` — draft content, `useCdn: false`, `perspective: 'previewDrafts'`, uses `SANITY_API_READ_TOKEN`
- `writeClient` — authenticated mutations, `useCdn: false`, uses `SANITY_API_TOKEN` (used by `scripts/*.js` migration/seed scripts, not by page rendering)

### Sanity Studio schemas (`studio/schemas/`)

~45 document types + shared objects. Notable ones:
- **Singletons** (one document per dataset): `megaMenu`, `footerConfig`, `redirectSettings`, `analyticsConfig`, `platformConfig`, `careersPage`, `contactPage`
- **Content collections**: `blogPost`, `caseStudy`, `pressRelease`, `event`, `webinar`, `ebook`, `whitepaper`, `jobPosition`, `teamMember`, `testimonial`, `location`, `office`, `integration`, `oohFormat`, `product`, `landingPage`, `industryPage`, `audiencePage`, `companyPage`, `timelineEvent`, `apiReferencePage`, `communityPage`, `helpCenterFaq`, `legalPage`, `category`, `author`, `zohoForm`, `clientPartners`, `partnerIntegrationLogo`, `trustBar`, `reusableCTA`, `reusableStatBlock`, `reusableTestimonial`, `pageSeo`
- **Shared objects** (`studio/schemas/objects/`): `accordionBlock`, `callout`, `ctaButton`, `featuredContent`, `formField`, `htmlEmbed`, `localeBlockContent`/`localeString`/`localeText` (CMS-side i18n fields, distinct from the frontend's locale system), `menuColumn`/`menuItem`/`menuLink` (mega menu), `publishingWorkflow`/`workflow` (the `isPublished`/`status`/`scheduledPublishAt` fields referenced above), `statBlock`, `tableBlock`, `testimonialBlock`

## Routing map (`src/app/`)

App Router, ~65 route segments. Key groups:
- **Marketing/company pages**: `about`, `our-story`, `our-journey`, `careers`, `contact`, `community`, `help-center`, `documentation`, `api-reference`, `integrations`, `leadership[/slug]`, `locations[/slug]`, `london-headquarters`, `movinghearts` (CSR), `privacy`, `terms`, `cookies`
- **Content collections with `[slug]` detail pages**: `blog`, `case-studies`, `events`, `press-news`, `webinars`, `ebooks`
- **Products** (each has a `page.tsx` + `layout.tsx` + a `*Client.tsx`): `mw-planner`, `mw-market`, `mw-activate`, `mw-influence`, `mw-measure`, `mw-science`, `mw-studio`, plus a general `products/` index and `products/mw-activate` (a distinct product-focused variant — check both when editing MW Activate content)
- **Audience pages**: `agencies`, `brands`, `media-owners` (uses `audiencePage` schema)
- **Industry pages**: `finance`, `healthcare`, `retail` (uses `industryPage` schema)
- **Dynamic content-driven pages**: `[slug]/page.tsx` (catch-all, likely for `landingPage` documents at root level), `lp/[slug]/page.tsx` (dedicated landing page route — see below)
- **One-off campaign/press pages**: `adtech-company-of-year`, `ai-powered-audience-targeting`, `privacy-first-measurement`, `series-c-funding`, `transit-partnership` — these look like dedicated pages backed by `pressRelease.hasFullArticle`/`articleSlug` or standalone content
- **Utility**: `search` (+ `/api/search`), `sitemap`, `newsletter`, `not-found.tsx`, `error.tsx`

### Landing page builder (`src/app/lp/[slug]/page.tsx` + `src/components/landing/`)

A section-based page builder distinct from the fixed marketing pages: `landingPage` Sanity documents hold an ordered `sections[]` array, rendered by `<LandingPageRenderer>` ([src/components/landing/index.tsx](../../src/components/landing/index.tsx)). Section components: `HeroSection`, `FeatureGridSection`, `StatsSection`, `TestimonialsSection`, `LogoCarouselSection`, `PricingSection`, `FAQSection`, `CTABannerSection`, `TwoColumnSection`, `TextBlockSection`, `ImageGallerySection`, `VideoEmbedSection`, `ContactFormSection`, `CustomEmbedSection`, `SpacerSection`. Supports `draftMode()` preview banner. Note the webhook revalidates **both** `/lp/{slug}` and `/{slug}` for `landingPage` docs — the same content may be reachable from the catch-all `[slug]` route too.

## i18n — unconventional, read carefully

- **No locale routing.** All 5 locales (`en`, `ja`, `ko`, `id`, `zh`; default `en`) share identical URLs — there is no `/ja/...` prefix.
- Locale is stored in `localStorage` via [src/i18n/LocaleContext.tsx](../../src/i18n/LocaleContext.tsx) — **client-only**, meaning SSR-rendered HTML is always English; the correct locale strings swap in after hydration.
- All `messages/{en,ja,ko,id,zh}.json` files are statically imported and bundled (not lazy-loaded per locale).
- Client components consume translations via `const { t } = useLocale()`. `t('dot.path')` can return a string, an array (map it in JSX), or a nested object. A missing key returns the key itself (silent failure — watch for literal dotted strings rendering in the UI, that means a missing translation key).
- **When adding any translated UI string, add the key to all 5 `messages/*.json` files with matching nesting.** See [BRANDS-PAGE-TRANSLATION-FIX.md](../../BRANDS-PAGE-TRANSLATION-FIX.md) for a past bug caused by mismatched nesting (note: that doc references an obsolete 14-locale/`/solutions/*` setup — trust the "5 locales, no locale routing" description here instead).
- Separately, some Sanity schemas have `localeString`/`localeText`/`localeBlockContent` object types for CMS-side per-locale content — this is a different mechanism from the frontend `LocaleContext` and only applies to specific CMS fields that use those object types.

## Middleware ([src/middleware.ts](../../src/middleware.ts)) — NOT i18n

Despite `next-intl` being installed, middleware does **not** handle locale routing. It does two things:
1. **CMS-driven redirects**: fetches `redirectSettings._id == "redirectSettings"` from Sanity directly via REST (not the SDK client), cached in-memory for 60s, matches request path against `redirects[isActive == true]` (case-insensitive, trailing-slash normalized), issues 301/302
2. **Trailing-slash normalization**: `next.config.ts` sets `skipTrailingSlashRedirect: true` specifically so this middleware can own that logic (needed so CMS redirects and slash normalization don't fight each other)

Skips `/_next`, `/api`, `/studio`, and any path containing a `.` (static files).

## Preview mode & webhook revalidation

- **Preview**: `previewClient` + `/api/preview` (enters `draftMode()`) + `/api/exit-preview` + `<PreviewBanner>` component. The Studio's iframe preview pane resolves preview URLs against this flow.
- **Webhook**: `/api/sanity-webhook` ([route.ts](../../src/app/api/sanity-webhook/route.ts)) — verifies Sanity's HMAC-SHA256 signature (`t=<ts>,v1=<hex>` format, 5-minute replay window, `crypto.timingSafeEqual`; falls back to plain-secret comparison for legacy configs), then calls `revalidatePath()` for a hardcoded `typeToPath` map (every Sanity document type → the frontend paths it affects) plus `revalidateTag(_type)` and `revalidateTag('sanity')`. **When adding a new Sanity schema type that backs a page, add an entry to `typeToPath` in this file** or edits won't invalidate the cache until the timed `revalidate` fires.

## Product pages — check the sync-status docs first

Before editing `mw-planner`, `mw-market`, `mw-activate`, `mw-measure`, `mw-studio`, `mw-science`, or `mw-influence`, read the matching `docs/data-sync/MW-*-SYNC-STATUS.md`. Each documents, per CMS field: whether Sanity has data, whether the frontend code actually reads it, and a table of what's still hardcoded (value props, transformation before/after stats, ROI banners, integration lists, etc.) — these pages are a mix of CMS-wired and hand-written content and it's easy to edit the wrong layer.

## Forms

- **Zoho CRM forms**: `<DynamicZohoForm>` / `<ZohoFormEmbed>` components + `/api/zoho-form` route + Sanity `zohoForm` documents. Two render modes on the schema: `iframe` (embeds Zoho's own hosted form) vs `native` (renders fields from the `fields[]` array using `<FormFieldRenderer>`, submits through the Next.js API route). `displayMode` on top of that controls `iframe` / `modal` / `newtab` presentation.
- **Newsletter**: `<ZohoCampaignsEmbed>` — a Zoho Campaigns iframe embed, replaced a previous fake/static subscribe form (see recent git history — `feat: replace all fake subscribe forms with Zoho Campaigns iframe`).
- **Contact**: `<ContactForm>` + `contactPage` Sanity singleton + `<FormPopupProvider>` for popup-triggered forms + `<ZohoUTMTracker>` for UTM capture.

## SEO

- Helpers in [src/lib/metadata.ts](../../src/lib/metadata.ts).
- Per-page SEO comes from Sanity `pageSeo` documents (fetched via `getPageSeo(pageKey)`), or an inline `seo` object on content documents (`SanitySEO` interface: `metaTitle`, `metaDescription`, `ogImage`, `keywords`, `enableKeywords`, `noIndex`).
- Global cache headers and security headers (CSP, X-Frame-Options, etc.) are set in [next.config.ts](../../next.config.ts) `headers()` — HTML pages use `no-cache, must-revalidate` (always revalidate, rely on 304s), static assets get 1-year immutable caching.

## Static data fallback (`src/data/*.ts`)

`audience-pages.ts`, `blog-posts.ts` / `blog-posts-generated.ts`, `case-studies.ts`, `default-integrations.ts`, `industry-pages.ts`, `integrations.ts`, `ooh-formats.ts`, `staticLocationData.ts`, `fetch-page-data.ts`. These are the safety net described in the content pattern above — treat them as production fallback content, not dead code, even though most traffic is served from Sanity.

## Content scripts (`scripts/*.js`)

Run with `SANITY_API_TOKEN=... node scripts/<name>.js` (uses `writeClient`, so these mutate the live dataset — be careful). Naming tells you intent:
- `seed-*` — initial/one-time content creation
- `migrate-*` / `import-wordpress-*` / `parse-wordpress-*` / `convert-*-to-json` — historical WordPress → Sanity migration (mostly one-time, kept for reference)
- `audit-*` / `check-*` / `verify-*` / `full-sync-check` — data QA, read-only checks of CMS vs code sync
- `fix-*` / `patch-*` / `cleanup-*` / `remigrate-*-with-formatting` / `delete-all-blogs` — targeted data repairs (destructive — read the script before running)

## Deployment

- [amplify.yml](../../amplify.yml) writes environment variables into `.env.production` before `npm run build` on AWS Amplify.
- [next.config.ts](../../next.config.ts) also forwards select server env vars via its `env:` block (`SANITY_WEBHOOK_SECRET`, `SANITY_API_TOKEN`, `SANITY_API_READ_TOKEN`, `SANITY_PREVIEW_SECRET`) — **keep both files in sync** when adding a new server-side env var, Amplify builds fail silently otherwise (var present in one but not the other).
- Env vars: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (public, client-safe), `SANITY_API_TOKEN` (write), `SANITY_API_READ_TOKEN` (preview/draft reads), `SANITY_PREVIEW_SECRET`, `SANITY_WEBHOOK_SECRET`.

## Conventions & pitfalls checklist

- CMS-sourced HTML must go through [src/lib/sanitize.ts](../../src/lib/sanitize.ts) before rendering — never `dangerouslySetInnerHTML` raw Sanity content.
- If sanitized CMS HTML uses Tailwind utility classes, they must be added to the **safelist** in [tailwind.config.ts](../../tailwind.config.ts) or Tailwind's production build will purge them (classes only appearing in database content, not in JSX, are invisible to Tailwind's scanner).
- Manual QA checklist before shipping UI changes: [BROWSER-TESTING.md](../../BROWSER-TESTING.md).
- No automated test suite — verification is manual browser testing + `npm run lint` + `npm run build`.
- When a Sanity document type gains a new page or the existing page's route changes, update `typeToPath` in `src/app/api/sanity-webhook/route.ts` so on-demand revalidation keeps working.
- Always preserve the static-data fallback when touching a `page.tsx` that follows the Sanity → Page pattern — removing it turns a graceful degradation into a full outage if Sanity is unreachable or a dataset is emptied.
