# Cross-Browser Testing Checklist

This document provides a comprehensive checklist for testing the Moving Walls website across all supported browsers.

## Supported Browsers

| Browser | Desktop | Mobile | Minimum Version |
|---------|---------|--------|-----------------|
| Chrome | Yes | Yes | Last 2 versions |
| Firefox | Yes | Yes | Last 2 versions |
| Safari | Yes | Yes | Last 2 versions / iOS 14+ |
| Edge | Yes | Yes | Last 2 versions |
| Samsung Internet | - | Yes | Last 2 versions |

## Testing Checklist

### 1. Core Functionality

- [ ] **Navigation**
  - [ ] Header menu opens/closes correctly
  - [ ] Dropdown menus work on hover/click
  - [ ] Mobile hamburger menu works
  - [ ] All navigation links work
  - [ ] Scroll-to-section links work smoothly

- [ ] **Forms**
  - [ ] Contact forms submit correctly
  - [ ] Form validation works
  - [ ] Error messages display properly
  - [ ] Form inputs are styled correctly
  - [ ] File uploads work (if applicable)

- [ ] **Images**
  - [ ] All images load correctly
  - [ ] Lazy loading works
  - [ ] WebP/AVIF fallbacks work
  - [ ] Responsive images scale properly

### 2. Visual Testing

- [ ] **Layout**
  - [ ] No horizontal scrolling on any page
  - [ ] Grid layouts display correctly
  - [ ] Flexbox layouts align properly
  - [ ] Responsive breakpoints work (mobile/tablet/desktop)

- [ ] **Typography**
  - [ ] Fonts load correctly (Poppins)
  - [ ] Text is readable at all sizes
  - [ ] Line heights are consistent

- [ ] **Colors & Styles**
  - [ ] Brand colors display correctly
  - [ ] Shadows render properly
  - [ ] Border radius appears correctly
  - [ ] Backdrop blur effects work (Safari!)

- [ ] **Animations**
  - [ ] Framer Motion animations play smoothly
  - [ ] Hover transitions work
  - [ ] Scroll animations trigger correctly
  - [ ] Timeline scroll animation works

### 3. Interactive Elements

- [ ] **Buttons**
  - [ ] All buttons are clickable
  - [ ] Hover states work
  - [ ] Focus states are visible (accessibility)

- [ ] **Links**
  - [ ] Internal links navigate correctly
  - [ ] External links open in new tab
  - [ ] Anchor links scroll smoothly

- [ ] **Videos**
  - [ ] Videos autoplay where intended
  - [ ] Video controls work
  - [ ] Videos are responsive

### 4. Performance

- [ ] **Loading**
  - [ ] Initial page load is fast (<3s)
  - [ ] No layout shifts (CLS)
  - [ ] Images don't cause reflow

- [ ] **Scrolling**
  - [ ] Smooth scrolling works
  - [ ] No jank during scroll animations
  - [ ] Sticky elements work correctly

### 5. Specific Pages to Test

- [ ] Homepage (`/`)
- [ ] MW Planner (`/mw-planner`)
- [ ] MW Operate (`/mw-operate`)
- [ ] MW Exchange (`/mw-exchange`)
- [ ] MW Measure (`/mw-measure`)
- [ ] MW Audiences (`/mw-audiences`)
- [ ] MW Atlas (`/mw-atlas`)
- [ ] MW Intelligence (`/mw-intelligence`)
- [ ] Contact Page (`/contact`)
- [ ] Blog pages (`/resources/blog/*`)
- [ ] Case Studies (`/resources/case-studies/*`)

## Browser-Specific Known Issues

### Safari
- `backdrop-filter` requires `-webkit-` prefix (handled in CSS)
- Smooth scroll needs polyfill for older versions (handled in polyfills)
- Flexbox gap requires Safari 14.1+ (fallback added)

### Firefox
- Generally excellent compatibility
- May render fonts slightly differently

### Edge (Chromium)
- Near-identical to Chrome
- No specific issues expected

### Samsung Internet
- Based on Chromium, should work like Chrome
- Test touch interactions specifically

## Testing Tools

### Manual Testing
- BrowserStack (https://browserstack.com)
- LambdaTest (https://lambdatest.com)
- Sauce Labs (https://saucelabs.com)

### Automated Testing
```bash
# Run Playwright tests (if configured)
npm run test:e2e

# Run Lighthouse audit
npx lighthouse https://www.movingwalls.com --output html
```

### Browser DevTools
- Chrome DevTools → Device Emulation
- Firefox DevTools → Responsive Design Mode
- Safari → Develop → Responsive Design Mode

## Quick Smoke Test

For rapid verification, test these critical paths:

1. **Homepage Load** - Verify hero, navigation, footer
2. **Product Page** - Test MW Measure with scroll animations
3. **Form Submission** - Test contact form
4. **Mobile View** - Test responsive layout on phone
5. **Search/Filter** - Test any filter components

## Reporting Issues

When reporting browser-specific bugs, include:
- Browser name and version
- Operating system
- Device (desktop/mobile/tablet)
- Screen size
- Steps to reproduce
- Screenshot or video

## Configuration Files

The browser compatibility configuration is managed in:

- `.browserslistrc` - Target browser definitions
- `postcss.config.mjs` - CSS autoprefixer config
- `src/app/globals.css` - CSS compatibility fixes
- `src/lib/polyfills.ts` - JavaScript polyfills
- `src/components/PolyfillLoader.tsx` - Polyfill loader component

## Last Updated

April 2026
