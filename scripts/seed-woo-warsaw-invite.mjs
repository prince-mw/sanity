// Creates a DRAFT invitation landing page for the WOO Warsaw workshop (22 Oct 2026),
// modelled on /networking-session (single custom-embed section, email-style layout, RSVP popup).
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const SLUG = 'woo-warsaw-2026'
const ID = 'landing-woo-warsaw-2026'
const ARTWORK = 'https://cdn.sanity.io/images/u10im6di/production/4fd3cb477487eb2fa35b03096c875ce742761e68-960x501.webp'
const FORM = 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/WOOWarsaw2026/formperma/AYAogHIhbkP5i0IaFLeFDMxoHf16Qpy_o7n7kF6czVs'
const MAP = 'https://www.google.com/maps/search/?api=1&query=Radisson+Collection+Hotel+Warsaw'

if (await c.fetch(`count(*[slug.current==$s])`, { s: SLUG })) { console.error('Slug already in use:', SLUG); process.exit(1) }

// Styles follow the Lagos networking-session page so both invitations look alike.
const html = `<!-- Moving Walls — WOO Warsaw workshop invitation (22 Oct 2026). Layout follows /networking-session. -->
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
  .woo-wrap *{margin:0;padding:0;box-sizing:border-box}
  .woo-page{background:#f4f1ec;padding:0 0 48px}
  .woo-wrap{max-width:680px;margin:0 auto;background:#fff;border:1px solid #e0d9d0;font-family:'Poppins',sans-serif;-webkit-font-smoothing:antialiased}
  .woo-wrap .woo-header{width:100%;display:block;border-bottom:2px solid #e8e2d8}
  .woo-wrap .woo-rule{height:1px;background:linear-gradient(90deg,transparent,#c9a96e 30%,#c9a96e 70%,transparent);margin:0 48px}
  .woo-wrap .woo-body{padding:52px 56px 48px}
  .woo-wrap .woo-hello{font-weight:500;font-size:19px;color:#222!important;margin-bottom:28px}
  .woo-wrap .woo-body p{font-size:18px;line-height:1.85;color:#2e2b27!important;margin-bottom:22px}
  .woo-wrap .woo-body p strong{font-weight:600;color:#1a1714!important}
  .woo-wrap .woo-details{margin:36px 0 30px;background:#005cc512;border-left:3px solid #07a;padding:24px 28px}
  .woo-wrap .woo-line{display:flex;align-items:flex-start;gap:14px;margin-bottom:14px}
  .woo-wrap .woo-line:last-child{margin-bottom:0}
  .woo-wrap .woo-line svg{flex-shrink:0;width:20px;height:20px;margin-top:2px;opacity:.8}
  .woo-wrap .woo-text{font-size:14.5px;color:#333!important;line-height:1.55;letter-spacing:.02em}
  .woo-wrap .woo-text strong{display:block;font-weight:600;color:#1a1714!important;font-size:15px}
  .woo-wrap .woo-text a{color:#1a1714!important;text-decoration:underline!important}
  .woo-wrap .woo-note{font-size:14px;font-weight:500;color:#203f8e!important;letter-spacing:.04em;text-align:center;margin:0 0 8px!important}
  .woo-wrap .woo-cta{text-align:center;margin:26px 0 8px}
  .woo-wrap a.woo-btn{display:inline-block;background:#2563ea;color:#fff!important;text-decoration:none!important;font-size:13px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:16px 52px;border-radius:5px;transition:background .25s}
  .woo-wrap a.woo-btn:hover{background:#203f8e}
  @media (max-width:600px){.woo-wrap .woo-body{padding:36px 26px 32px}.woo-wrap .woo-body p{font-size:16.5px}.woo-wrap .woo-rule{margin:0 26px}}
  /* RSVP popup */
  .rsvp-modal-overlay{display:none;position:fixed;inset:0;background:rgba(26,23,20,.65);align-items:center;justify-content:center;z-index:9999;padding:20px}
  .rsvp-modal-box{position:relative;background:#fff;width:100%;max-width:640px;height:min(760px,90vh);border-radius:10px;box-shadow:0 24px 60px rgba(0,0,0,.35);overflow:hidden}
  .rsvp-modal-close{position:absolute;top:12px;right:12px;width:36px;height:36px;border-radius:50%;background:#fff;border:1px solid #e0d9d0;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:22px;line-height:1;color:#1a1714;z-index:2;box-shadow:0 2px 10px rgba(0,0,0,.15);padding:0}
  .rsvp-modal-frame{width:100%;height:100%;border:0}
  @media (max-width:640px){.rsvp-modal-box{max-width:100%;height:100%;border-radius:0}}
  /* Invitation reads like an email: hide the site header, footer and global CTA band (same as /networking-session) */
  header.fixed{display:none!important}
  footer.bg-mw-gray-900{display:none!important}
  section.bg-gradient-to-br{display:none!important}
  body{padding-top:0!important;background:#f4f1ec}
</style>
<div class="woo-page">
<div class="woo-wrap">
  <img class="woo-header" src="${ARTWORK}" alt="Moving Walls workshop at WOO Warsaw, 22 October 2026" width="960" height="501" style="width:100%;height:auto;display:block;" />
  <div class="woo-rule"></div>
  <div class="woo-body">
    <div class="woo-hello">Hi,</div>
    <p>Have you wondered why search, social and commerce advertising in Europe is roughly <strong>ten times the size of OOH</strong>?</p>
    <p>At <strong>WOO Warsaw</strong>, Moving Walls invites you to a focused workshop exploring where the money sits, what our TikTok Out-of-Phone campaigns show, and how Moving Walls Science's Reindex can help deliver the evidence buyers ask for.</p>
    <p>The session will also explore practical ways to present your inventory to digital and social agencies and build new revenue streams.</p>
    <div class="woo-details">
      <div class="woo-line">
        <svg viewBox="0 0 24 24" fill="none" stroke="#203f8e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <div class="woo-text"><strong>Thursday, 22 October 2026</strong></div>
      </div>
      <div class="woo-line">
        <svg viewBox="0 0 24 24" fill="none" stroke="#203f8e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <div class="woo-text">5:00 – 6:00 PM (Poland time)</div>
      </div>
      <div class="woo-line">
        <svg viewBox="0 0 24 24" fill="none" stroke="#203f8e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <div class="woo-text">Meeting Room C3, First Floor<br/><a href="${MAP}" target="_blank" rel="noopener">Radisson Collection Hotel, Warsaw</a></div>
      </div>
    </div>
    <p class="woo-note">Limited seating available.</p>
    <div class="woo-cta"><a class="woo-btn" href="${FORM}" target="_blank" rel="noopener" data-modal-open="rsvp-modal">RSVP</a></div>
  </div>
</div>
</div>
<div id="rsvp-modal" class="rsvp-modal-overlay" data-modal-root>
  <div class="rsvp-modal-box" role="dialog" aria-modal="true" aria-label="RSVP — Moving Walls workshop at WOO Warsaw">
    <button type="button" class="rsvp-modal-close" aria-label="Close" data-modal-close>&times;</button>
    <iframe id="rsvp-modal-frame" class="rsvp-modal-frame" title="WOO Warsaw workshop RSVP form" loading="lazy"></iframe>
  </div>
</div>`

await c.createOrReplace({
  _id: `drafts.${ID}`,
  _type: 'landingPage',
  title: 'WOO Warsaw Workshop 2026',
  slug: { _type: 'slug', current: SLUG },
  isPublished: true,
  status: 'published',
  sections: [{ _key: 'woohtml', _type: 'customEmbed', backgroundColor: 'transparent', maxWidth: 'full', code: html }],
  seo: {
    _type: 'seo',
    metaTitle: 'Moving Walls Workshop at WOO Warsaw | 22 Oct 2026',
    metaDescription: 'Join Moving Walls at WOO Warsaw on 22 October 2026, 5–6 PM, Radisson Collection Hotel: why digital ad spend dwarfs OOH, TikTok Out-of-Phone results and MW Science Reindex. RSVP now.',
    enableKeywords: false,
    noIndex: false,
    ogImage: { _type: 'image', asset: { _type: 'reference', _ref: 'image-4fd3cb477487eb2fa35b03096c875ce742761e68-960x501-webp' } },
  },
})
console.log('Draft created: drafts.' + ID, '->', '/' + SLUG)
