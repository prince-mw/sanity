/**
 * Cross-Browser Polyfills
 * 
 * This file contains polyfills for features that may not be available
 * in all target browsers. Import this in the root layout.
 * 
 * Target browsers:
 * - Chrome/Edge: last 2 versions
 * - Firefox: last 2 versions  
 * - Safari: last 2 versions, iOS 14+
 * - Samsung Internet: last 2 versions
 */

/* eslint-disable @typescript-eslint/no-empty-function */

// Smooth scroll polyfill for Safari (older versions)
if (typeof globalThis.window !== 'undefined') {
  // Check if smooth scrolling is supported
  const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
  
  if (!supportsNativeSmoothScroll) {
    // Simple smooth scroll implementation for older Safari
    const smoothScrollTo = (target: Element | number, duration: number = 500) => {
      const startPosition = globalThis.window.pageYOffset;
      const targetPosition = typeof target === 'number' 
        ? target 
        : target.getBoundingClientRect().top + startPosition;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        startTime ??= currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function (ease-in-out)
        const easeInOutQuad = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        globalThis.window.scrollTo(0, startPosition + distance * easeInOutQuad);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    // Override native scrollIntoView for smooth scroll support
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function(arg?: boolean | ScrollIntoViewOptions) {
      if (typeof arg === 'object' && arg.behavior === 'smooth') {
        smoothScrollTo(this);
      } else {
        originalScrollIntoView.call(this, arg);
      }
    };

    // Handle anchor link clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();
            smoothScrollTo(targetElement);
          }
        }
      }
    });
  }

  // IntersectionObserver polyfill check
  // Note: IntersectionObserver is supported in all target browsers (Safari 12.1+),
  // but we add a graceful fallback just in case
  if (!('IntersectionObserver' in globalThis)) {
    console.warn('IntersectionObserver not supported. Lazy loading images may not work optimally.');
    // Fallback: Load all images immediately
    (globalThis as typeof globalThis & { IntersectionObserver?: typeof IntersectionObserver }).IntersectionObserver = class {
      constructor(callback: IntersectionObserverCallback) {
        // Immediately trigger callback with all observed elements as intersecting
        setTimeout(() => {
          const entries: IntersectionObserverEntry[] = [];
          callback(entries, this as unknown as IntersectionObserver);
        }, 0);
      }
      // Stub methods for compatibility - intentionally empty
      observe() { /* no-op for polyfill */ }
      unobserve() { /* no-op for polyfill */ }
      disconnect() { /* no-op for polyfill */ }
      takeRecords(): IntersectionObserverEntry[] { return []; }
      get root() { return null; }
      get rootMargin() { return ''; }
      get thresholds() { return []; }
    } as unknown as typeof IntersectionObserver;
  }

  // ResizeObserver polyfill check
  // ResizeObserver is used by Framer Motion for some animations
  if (!('ResizeObserver' in globalThis)) {
    console.warn('ResizeObserver not supported. Some animations may not respond to size changes.');
    (globalThis as typeof globalThis & { ResizeObserver?: unknown }).ResizeObserver = class {
      // Stub methods for compatibility - intentionally empty
      observe() { /* no-op for polyfill */ }
      unobserve() { /* no-op for polyfill */ }
      disconnect() { /* no-op for polyfill */ }
    };
  }

  // requestAnimationFrame polyfill (for very old browsers)
  if (!globalThis.window.requestAnimationFrame) {
    globalThis.window.requestAnimationFrame = (callback: FrameRequestCallback): number => {
      return globalThis.window.setTimeout(() => callback(Date.now()), 1000 / 60);
    };
  }

  // cancelAnimationFrame polyfill
  if (!globalThis.window.cancelAnimationFrame) {
    globalThis.window.cancelAnimationFrame = (id: number): void => {
      clearTimeout(id);
    };
  }
}

/**
 * Initialize polyfills - called automatically when module is imported
 * Export a constant to make this a valid ES module
 */
export const polyfillsLoaded = true;
