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
      className={`w-full overflow-hidden bg-white ${className}`}
      style={{ height, borderRadius: '6px' }}
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
