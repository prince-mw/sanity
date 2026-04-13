# MW Planner Page - CMS Sync Status

## CMS Fields Status

| CMS Field | Has Data | Used in Code | Status |
|-----------|----------|--------------|--------|
| heroTitle | YES | YES | SYNCED |
| heroSubtitle | YES | YES | SYNCED |
| heroBadge | YES | YES | SYNCED |
| description | YES | YES | SYNCED |
| ctaText | YES | YES | SYNCED |
| ctaLink | YES | YES | SYNCED |
| features | YES | YES | SYNCED |
| heroGradient | YES | NO | NOT USED |
| tagline | YES | NO | NOT USED |
| testimonials | YES | NO | NOT USED |

---

## Static/Hardcoded Content

### Value Proposition Section
| Item | Static Value |
|------|--------------|
| Title | `"Stop Guessing. Start Predicting."` |
| Description | `"Traditional campaign planning relies on historical data and gut instinct..."` |
| Checklist Item 1 | `"94% accurate performance predictions before launch"` |
| Checklist Item 2 | `"Automated budget optimization across all channels"` |
| Checklist Item 3 | `"Real-time alerts for underperforming campaigns"` |
| Checklist Item 4 | `"Stakeholder-ready reports generated automatically"` |

### Transformation Section (Before/After)
| Before State | After State | Metric |
|--------------|-------------|--------|
| Hours on manual reporting | Reports in 2 minutes | 75% Time Saved |
| Guesswork budgeting | AI-driven allocation | 94% Accuracy |
| Reactive adjustments | Predictive optimization | 3x Faster |
| Siloed channel data | Unified dashboard | 100% Visibility |

### ROI Banner
- `"Average ROI improvement: 156% within 90 days"`

### Features Section
| Item | Static Value |
|------|--------------|
| Title | `"Everything You Need to Win"` |
| Subtitle | `"Powerful tools that transform how you plan, execute, and optimize campaigns"` |

### Default Features (Fallback)
1. AI-Powered Forecasting - Predict campaign performance with 94% accuracy
2. Cross-Channel Optimization - Automatically allocate budgets across channels
3. Audience Intelligence - Discover high-value segments using ML
4. Real-Time Dashboards - Monitor live performance metrics
5. Automated Reporting - Generate stakeholder-ready reports
6. Budget Optimizer - Maximize every dollar with AI recommendations

### Integrations Section
| Item | Static Value |
|------|--------------|
| Title | `"Don't Replace. Integrate."` |
| Description | `"MW Planner connects seamlessly with your existing tech stack..."` |
| Categories | SSP Partners, DSP Partners, Programmatic, Real-Time Bidding |

### Dashboard Mock Stats
| Stat | Value | Change |
|------|-------|--------|
| ROAS | 4.2x | +18% |
| CPA | $12.40 | -24% |
| CTR | 3.8% | +12% |
| Performance | - | +23.4% |

### AI Insight Text
- `"Shift 15% budget from Display to Social for projected +$24K revenue uplift this week."`

### Resources Section
| Item | Static Value |
|------|--------------|
| Title | `"Learn & Grow"` |
| Subtitle | `"Expert insights to level up your campaign strategy"` |

---

## Dynamic/CMS Content

| Item | Source | Has Fallback |
|------|--------|--------------|
| Hero Badge | `product?.heroBadge` | Yes |
| Hero Title | `product?.heroTitle` | Yes |
| Hero Subtitle | `product?.heroSubtitle` | Yes |
| Hero Description | `product?.description` | Yes |
| CTA Text | `product?.ctaText` | Yes |
| CTA Link | `product?.ctaLink` | Yes |
| Features | `product?.features` | Yes (6 defaults) |
| Integrations | `product?.integrations` + partnerLogos | Yes |
| Resources/Blog | `latestBlogPosts` from Sanity | Yes (1 default) |

---

## Summary

| Category | Count |
|----------|-------|
| CMS Synced | 9 fields |
| CMS Not Used | 3 fields |
| Static Sections | 15+ |

---

## Recommended Actions

1. **Use unused CMS fields:**
   - `heroGradient` - Apply to hero section background
   - `tagline` - Display as badge or subtitle
   - `testimonials` - Add testimonials section

2. **Move static content to CMS:**
   - Value Proposition title/description
   - Transformation metrics (75%, 94%, 3x, 100%)
   - ROI banner text (156%)
   - Features section title/subtitle
   - Integrations section title/description
   - Dashboard mock stats
   - Resources section title/subtitle

3. **Remove hardcoded fallbacks (optional):**
   - Default features array
   - Default resources array
   - Integration categories list

---

## File Location
- Component: `src/components/MWPlannerPageClient.tsx`
- Page: `src/app/mw-planner/page.tsx`
- Lines: 726 total
