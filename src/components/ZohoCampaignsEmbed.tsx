'use client'

// Canonical Zoho Campaigns newsletter signup embed.
// Used on the homepage, blog posts, and /newsletter page.
// URL can be overridden via prop (e.g. from Sanity) — falls back to the static URL.

const ZOHO_CAMPAIGNS_URL =
  'https://xjwif-zgpm.maillist-manage.com/ua/Optin?od=11287ecbeb72cd&zx=13089112c&tD=1d17ccf5180e2411&sD=1d17ccf51ad46835'

interface ZohoCampaignsEmbedProps {
  /** Override the default Zoho Campaigns URL (e.g. from Sanity) */
  src?: string | null
  /** Height of the iframe in px — default 340 */
  height?: number
  /** Additional wrapper className */
  className?: string
}

export default function ZohoCampaignsEmbed({
  src,
  height = 340,
  className = '',
}: ZohoCampaignsEmbedProps) {
  const embedUrl = src || ZOHO_CAMPAIGNS_URL

  return (
    <div
      // On narrow screens the Zoho form's fields stack vertically and need more
      // room than the desktop layout — a single fixed height clips it and the
      // iframe grows its own internal scrollbar. Give mobile/tablet more height
      // and only use the caller-provided height once there's room for it (lg+).
      className={`w-full overflow-hidden bg-white rounded-md h-[460px] sm:h-[400px] lg:h-[var(--zoho-embed-height)] ${className}`}
      style={{ '--zoho-embed-height': `${height}px` } as React.CSSProperties}
    >
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        className="w-full h-full border-0"
        title="Newsletter Signup"
      />
    </div>
  )
}
