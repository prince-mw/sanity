import DOMPurify from 'isomorphic-dompurify'

// Allow safe HTML tags and attributes used in CMS content
const PURIFY_CONFIG = {
  ADD_TAGS: ['iframe', 'style', 'link'],
  ADD_ATTR: [
    'allow', 'allowfullscreen', 'frameborder', 'scrolling',
    'target', 'rel', 'style', 'class', 'playsInline', 'controls',
    'preload', 'poster', 'autoplay', 'loop', 'muted',
    'charset', 'media', 'sizes', 'integrity', 'crossorigin',
  ],
  ALLOW_DATA_ATTR: true,
  FORCE_BODY: true,
}

/**
 * Sanitize HTML string to prevent XSS while preserving trusted CMS content.
 * Allows iframes, style/link tags (for embedded CSS), inline styles,
 * data attributes, and media attributes. Scripts are blocked.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ''
  return DOMPurify.sanitize(html, PURIFY_CONFIG)
}
