# MW Market Page - CMS Sync Status

## CMS Fields Status

| CMS Field | Has Data | Used in Code | Status |
|-----------|----------|--------------|--------|
| heroTitle | YES | YES | SYNCED |
| heroSubtitle | YES | YES | SYNCED |
| heroGradient | YES | NO | NOT USED |
| description | YES | YES | SYNCED |
| tagline | YES | NO | NOT USED |
| ctaText | YES | YES | SYNCED |
| ctaLink | YES | YES | SYNCED |
| secondaryCta | YES | NO | NOT USED |
| features | YES | NO | NOT USED |
| integrations | YES | YES | SYNCED |
| detailPageSections | YES | NO | NOT USED |

---

## Static/Hardcoded Content

### Currency List
- 30 currencies with exchange rates (USD, EUR, GBP, JPY, etc.)
- All rates are static/hardcoded

### Continents Data
| Continent | Billboards | Avg Price | Top Cities |
|-----------|------------|-----------|------------|
| North America | 78,000 | $8,500 | New York, Los Angeles, Toronto, Mexico City |
| South America | 12,000 | $3,200 | São Paulo, Buenos Aires, Rio de Janeiro, Lima |
| Europe | 92,000 | $7,800 | London, Paris, Berlin, Madrid |
| Asia | 156,000 | $4,200 | Tokyo, Shanghai, Singapore, Mumbai |
| Africa | 8,000 | $2,100 | Johannesburg, Lagos, Cairo, Nairobi |
| Oceania | 15,000 | $6,400 | Sydney, Melbourne, Auckland, Brisbane |

### Live Purchase Simulation
- Simulated billboard purchases with random data
- Not connected to real data

### Features Grid
- 9 hardcoded features (Explore Markets, Compare Locations, etc.)

### Market Stats
| Stat | Value |
|------|-------|
| Active Markets | 180+ Countries |
| Total Billboards | 361,000 |
| Daily Impressions | 2.8B+ |
| Avg CPM Savings | 34% |

---

## Dynamic/CMS Content

| Item | Source | Has Fallback |
|------|--------|--------------|
| Hero Title | `product?.heroTitle` | Yes ("MW Market") |
| Hero Subtitle | `product?.heroSubtitle` | Yes ("Global OOH Billboard Market") |
| Hero Description | `product?.description` | Yes |
| Integrations | `product?.integrations` + partnerLogos | Yes |

---

## Summary

| Category | Count |
|----------|-------|
| CMS Synced | 6 fields |
| CMS Not Used | 5 fields |
| Static Content | 90%+ of page |

---

## Recommended Actions

1. **Use unused CMS fields:**
   - `heroGradient` - Apply to hero section
   - `tagline` - Display as badge
   - `secondaryCta` - Add secondary button
   - `features` - Replace hardcoded features
   - `detailPageSections` - For dynamic sections

2. **Move to CMS:**
   - Continents data
   - Market stats
   - Features grid
   - Currency rates (or use API)

---

## File Location
- Component: `src/app/mw-market/MWMarketClient.tsx`
