# MW Inventory Page - CMS Sync Status

Source: content and design by Kritika (Product Marketer), exported from Google AI Studio as `mw-inventory.zip` and ported into `src/app/mw-inventory/`. Only the marketing/landing sections were built — the mockup's separate "Interactive Command Center" (4-tab dashboard demo with modals and CSV export) was intentionally dropped; every CTA that would have opened it now routes to `/contact` (via `<CTAButton>`, which prefers the popup contact form when one is assigned to this page in Studio).

## CMS Fields Status

| CMS Field | Has Data | Used in Code | Status |
|-----------|----------|--------------|--------|
| heroBadge | YES | YES | SYNCED |
| heroTitle | YES | YES | SYNCED |
| heroSubtitle | YES | YES | SYNCED |
| name / tagline / description | YES | NO | NOT USED |
| ctaText / ctaLink | YES | NO | NOT USED (page uses a fixed `/contact` CTA everywhere) |
| features / painPoints / testimonials / howItWorksSteps | NO | NO | NOT USED |

---

## Static/Hardcoded Content

### Comparison Section
- Headline: `"Your Screens Haven't Changed. Your Potential Has."`
- Without-MW-Inventory pain points: `"Scattered supply"`, `"Manual effort"`, `"Missed opportunities"`
- With-MW-Inventory outcomes: `"Structured supply"`, `"Clearer decisions"`, `"More ways to sell"`

### Features Section
| Feature | Title | Copy |
|---------|-------|------|
| 1 | Manage Your Supply With Confidence | Keep your inventory organised in one place... |
| 2 | Turn Assets Into Opportunities | Group inventory into relevant commercial networks... |
| 3 | Control How Inventory Gets Sold | Set selling terms and booking constraints... |
| 4 | Know What You Can Sell | Move beyond static inventory lists... |

Each feature card also carries illustrative sample data (one asset, one bundle, one set of selling rules, one hardcoded weekly availability grid) — all fictional, defined in `_components/mockData.ts` and inline in `FeatureCalendarAvailability.tsx`. Not read from Sanity.

### MW Science Cross-Sell Strip
- Copy: `"Powered by MW Science, the Cognitive Compass behind Moving Walls..."`
- CTA: `"Explore MW Science"` → links directly to `/mw-science` (a real internal page, not a contact popup).

### Final CTA Banner
- Headline: `"Turn What You Own Into What You Can Sell."`
- Subtext: `"Your network is already full of opportunities..."`
- CTA: `"Get in Touch"` → `/contact`

---

## Dynamic/CMS Content

| Item | Source | Has Fallback |
|------|--------|---------------|
| Hero badge | `product?.heroBadge` | Yes — `"MW Inventory"` |
| Hero title | `product?.heroTitle` | Yes — `"Turn Every Screen Into Revenue"` |
| Hero subtitle | `product?.heroSubtitle` | Yes — full fallback copy in `HeroSection.tsx` |
| Page `<title>`/meta description | `getPageSeo('mw-inventory')` | Yes — hardcoded `defaultMeta` in `layout.tsx` |

---

## Summary

- CMS Synced: 3 hero fields + SEO
- CMS Not Used: `name`, `tagline`, `description`, `ctaText`, `ctaLink`, `features`, `painPoints`, `testimonials` (schema fields exist on the shared `product` doc but this page doesn't read them)
- Static Sections: Comparison, all 4 feature cards, MW Science strip, final CTA — 100% hardcoded from Kritika's mockup

## Recommended Actions

1. Assign a Zoho popup form to `/mw-inventory` in Studio (`zohoForm.assignedPages`) — until one exists, every CTA on this page falls through to a full-page `/contact` navigation instead of the inline popup used on other product pages.
2. If the page later needs edior-manageable features/pain points, wire `product.features`/`product.painPoints` into `FeatureSupplyConfidence`/etc., following the pattern already used on `mw-market`.
3. Decide whether the dropped "Interactive Command Center" demo should ever be rebuilt as a real feature (it was fake data only in the original mockup).
