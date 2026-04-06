import DOMPurify from 'isomorphic-dompurify'

// Allow safe HTML tags and attributes used in CMS content
const PURIFY_CONFIG = {
  ADD_TAGS: ['iframe'],
  ADD_ATTR: [
    'allow', 'allowfullscreen', 'frameborder', 'scrolling',
    'target', 'rel', 'style', 'class', 'playsInline', 'controls',
    'preload', 'poster', 'autoplay', 'loop', 'muted',
  ],
  ALLOW_DATA_ATTR: false,
}

/**
 * Sanitize HTML string to prevent XSS while preserving trusted CMS content.
 * Allows iframes (for YouTube/Vimeo embeds), inline styles, and media attributes.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ''
  return DOMPurify.sanitize(html, PURIFY_CONFIG)
}
