# MW Activate Page - CMS Sync Status

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
| features | YES | NO | NOT USED |
| stats | YES | NO | NOT USED |
| detailPageSections | YES | YES | PARTIAL |

---

## Static/Hardcoded Content

### System Status Display
| Stat | Value |
|------|-------|
| Status | Online |
| Active Connections | 1,247 |
| Data Processed | 2.4TB |
| Uptime | 99.97% |

### Mode Toggle
- Screen Owners / Ad Buyers tabs

### Owners Features (Fallback)
| Feature | Metrics |
|---------|---------|
| Inventory Management System | locations: 847, fill: 92%, revenue: $2.4M |
| Yield Optimization Engine | yield: +34%, efficiency: 97%, saved: $847K |
| Analytics Command Center | impressions: 12.4M, reach: 3.2M, growth: +28% |
| Automated Booking Portal | bookings: 247, speed: <2min, satisfaction: 4.9/5 |

### Buyers Features (Fallback)
| Feature | Metrics |
|---------|---------|
| Campaign Launch System | speed: 95% faster, success: 98%, campaigns: 1.2K |
| Audience Targeting AI | precision: 94%, reach: 3.2M, conversion: +31% |
| Performance Predictor | accuracy: 91%, roi: +167%, saved: $240K |
| Instant Booking Hub | inventory: 8.4K, response: <15ms, savings: 23% |

### Terminal Animation
- Hardcoded terminal commands and responses

### Command Highlights
| Command | Description |
|---------|-------------|
| ai.target.audience | Target audience analysis |
| bidding.execute | Execute programmatic bidding |
| metrics.analyze | Real-time performance analysis |
| inventory.sync | Sync OOH inventory |
| campaign.launch | Launch campaign across networks |

---

## Dynamic/CMS Content

| Item | Source | Has Fallback |
|------|--------|--------------|
| Hero Title | `product?.heroTitle` | Yes |
| Hero Subtitle | `product?.heroSubtitle` | Yes |
| Hero Description | `product?.description` | Yes |
| CTA Text | `product?.ctaText` | Yes |
| CTA Link | `product?.ctaLink` | Yes |
| Owners Features | `product?.detailPageSections['owners']` | Yes |
| Buyers Features | `product?.detailPageSections['buyers']` | Yes |
| Integrations | `product?.integrations` + partnerLogos | Yes |

---

## Summary

| Category | Count |
|----------|-------|
| CMS Synced | 7 fields |
| CMS Not Used | 4 fields |
| Static Content | ~70% of page |

---

## Recommended Actions

1. **Use unused CMS fields:**
   - `heroGradient` - Dynamic hero background
   - `tagline` - Display as badge
   - `features` - Main features list
   - `stats` - Replace system status

2. **Move to CMS:**
   - System status data
   - Feature metrics
   - Terminal commands
   - Command highlights

---

## File Location
- Component: `src/app/mw-activate/MWActivateClient.tsx`
