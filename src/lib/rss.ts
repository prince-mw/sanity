// Shared helpers for RSS feed routes (blog, case studies, etc.)

export function normalizeSiteUrl(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function getImageMimeType(url: string) {
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase() || "";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "gif") return "image/gif";
  if (ext === "webp") return "image/webp";
  return "image/jpeg";
}

export interface RssFeedItem {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: string;
}

export function buildRssFeed(options: {
  channelTitle: string;
  channelUrl: string;
  channelDescription: string;
  itemBaseUrl: string;
  items: RssFeedItem[];
}) {
  const { channelTitle, channelUrl, channelDescription, itemBaseUrl, items } = options;

  const itemXml = items
    .map((item) => {
      const url = `${itemBaseUrl}/${item.slug}`;
      const pubDate = new Date(item.date).toUTCString();
      const imageUrl = item.featuredImage || "";
      const enclosure = imageUrl
        ? `<enclosure url="${escapeXml(imageUrl)}" length="0" type="${getImageMimeType(imageUrl)}" />`
        : "";
      const mediaContent = imageUrl
        ? `<media:content url="${escapeXml(imageUrl)}" medium="image" type="${getImageMimeType(imageUrl)}" />`
        : "";

      return `
      <item>
        <title>${escapeXml(item.title)}</title>
        <link>${escapeXml(url)}</link>
        <guid isPermaLink="true">${escapeXml(url)}</guid>
        <pubDate>${escapeXml(pubDate)}</pubDate>
        <description>${escapeXml(item.excerpt || "")}</description>
        ${enclosure}
        ${mediaContent}
      </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${escapeXml(channelUrl)}</link>
    <description>${escapeXml(channelDescription)}</description>
    <language>en-US</language>
    ${itemXml}
  </channel>
</rss>`;
}
