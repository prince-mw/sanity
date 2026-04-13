'use client';

import { useEffect } from 'react';

/**
 * PolyfillLoader Component
 * 
 * Loads cross-browser polyfills on the client side.
 * This component renders nothing but ensures polyfills
 * are loaded for older browsers.
 */
export default function PolyfillLoader() {
  useEffect(() => {
    // Dynamically import polyfills on client side
    import('@/lib/polyfills').catch((err) => {
      console.warn('Failed to load polyfills:', err);
    });
  }, []);

  return null;
}
