'use client';

import { useEffect, useState } from 'react';

interface ZohoResponsiveFormProps {
  formUrl: string;
  title: string;
  defaultHeight?: number;
  className?: string;
}

// Zoho's hosted form page broadcasts its real content height via postMessage once
// `zf_rszfm=1` is present on the iframe src, formatted as "<id>|<heightPx>". We stay
// defensive here (origin + shape check only) since the exact id prefix isn't documented
// anywhere we can verify — worst case a malformed message is just ignored.
export function ZohoResponsiveForm({ formUrl, title, defaultHeight = 650, className }: ZohoResponsiveFormProps) {
  const [height, setHeight] = useState(defaultHeight);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (!event.origin.includes('zoho')) return;
      if (typeof event.data !== 'string' || !event.data.includes('|')) return;
      const parsedHeight = parseInt(event.data.split('|').pop() || '', 10);
      if (!Number.isNaN(parsedHeight) && parsedHeight > 100 && parsedHeight < 3000) {
        setHeight(parsedHeight);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const src = `${formUrl}${formUrl.includes('?') ? '&' : '?'}zf_rszfm=1`;

  return (
    <iframe
      src={src}
      title={title}
      width="100%"
      height={height}
      scrolling="no"
      loading="lazy"
      style={{ border: 'none', display: 'block', transition: 'height 0.25s ease' }}
      className={className}
    />
  );
}

export default ZohoResponsiveForm;
