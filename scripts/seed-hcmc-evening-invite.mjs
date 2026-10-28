// Creates a DRAFT invitation landing page for "An Evening in Ho Chi Minh City" (Hilton Saigon, 12 Nov 2026),
// same email-style layout and 900px width as /woo-warsaw-2026 and /networking-session (artwork header, details box,
// RSVP popup, footer artwork, no site header/footer).
// RSVP_FORM is a placeholder until the Zoho form exists: set it and re-run to switch the button to the popup.
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const SLUG = 'evening-ho-chi-minh-city-2026'
const ID = 'landing-evening-ho-chi-minh-city-2026'
const RSVP_FORM = 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/EventRegistration7/formperma/inn8_kEAl_Xs4UiCNQYh4CFaaeDrHL7D7ao8QxIvGvI'
const MAP = 'https://www.google.com/maps/search/?api=1&query=Hilton+Saigon+Ho+Chi+Minh+City'

if (await c.fetch('count(*[slug.current==$s && !(_id in [$id, "drafts." + $id])])', { s: SLUG, id: ID })) { console.error('Slug already in use:', SLUG); process.exit(1) }

const upload = async (file) => c.assets.upload('image', fs.createReadStream('C:/Users/admin/Desktop/' + file), { filename: file })
const top = await upload('e-invite-top.webp')
const bottom = await upload('invite-bottom.webp')

const rsvpButton = RSVP_FORM
  ? `<a class="sgn-btn" href="${RSVP_FORM}" target="_blank" rel="noopener" data-modal-open="rsvp-modal">RSVP</a>`
  : `<a class="sgn-btn sgn-btn--pending" href="#rsvp" aria-disabled="true">RSVP</a><p class="sgn-pending">[RSVP form link to be added]</p>`

// Styles follow the Lagos / WOO Warsaw invitations so all event invites look alike.
const html = `<!-- Moving Walls — An Evening in Ho Chi Minh City (12 Nov 2026). Layout follows /woo-warsaw-2026. -->
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
  .sgn-wrap *{margin:0;padding:0;box-sizing:border-box}
  .sgn-page{background:#f4f1ec;padding:0 0 48px}
  .sgn-wrap{max-width:900px;margin:0 auto;background:#fff;border:1px solid #e0d9d0;font-family:'Poppins',sans-serif;-webkit-font-smoothing:antialiased}
  .sgn-wrap .sgn-header{width:100%;display:block;border-bottom:2px solid #e8e2d8}
  .sgn-wrap .sgn-footer{width:100%;display:block;margin-top:4px}
  .sgn-wrap .sgn-rule{height:1px;background:linear-gradient(90deg,transparent,#c9a96e 30%,#c9a96e 70%,transparent);margin:0 48px}
  .sgn-wrap .sgn-body{padding:52px 110px 48px}
  .sgn-wrap .sgn-hello{font-weight:500;font-size:19px;color:#222!important;margin-bottom:28px}
  .sgn-wrap .sgn-body p{font-size:18px;line-height:1.85;color:#2e2b27!important;margin-bottom:22px}
  .sgn-wrap .sgn-body p strong{font-weight:600;color:#1a1714!important}
  .sgn-wrap .sgn-details{margin:36px 0 30px;background:#005cc512;border-left:3px solid #07a;padding:24px 28px}
  .sgn-wrap .sgn-line{display:flex;align-items:flex-start;gap:14px;margin-bottom:14px}
  .sgn-wrap .sgn-line:last-child{margin-bottom:0}
  .sgn-wrap .sgn-line svg{flex-shrink:0;width:20px;height:20px;margin-top:2px;opacity:.8}
  .sgn-wrap .sgn-text{font-size:14.5px;color:#333!important;line-height:1.55;letter-spacing:.02em}
  .sgn-wrap .sgn-text strong{display:block;font-weight:600;color:#1a1714!important;font-size:15px}
  .sgn-wrap .sgn-text a{color:#1a1714!important;text-decoration:underline!important}
  .sgn-wrap .sgn-note{font-size:14px;font-weight:500;color:#203f8e!important;letter-spacing:.04em;text-align:center;margin:0 0 8px!important}
  .sgn-wrap .sgn-cta{text-align:center;margin:26px 0 8px}
  .sgn-wrap a.sgn-btn{display:inline-block;background:#2563ea;color:#fff!important;text-decoration:none!important;font-size:13px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:16px 52px;border-radius:5px;transition:background .25s}
  .sgn-wrap a.sgn-btn:hover{background:#203f8e}
  .sgn-wrap a.sgn-btn--pending{opacity:.55;pointer-events:none}
  .sgn-wrap .sgn-pending{font-size:13px!important;color:#b45309!important;margin:10px 0 0!important}
  @media (max-width:900px){.sgn-wrap .sgn-body{padding:52px 56px 48px}}
  @media (max-width:600px){.sgn-wrap .sgn-body{padding:36px 26px 32px}.sgn-wrap .sgn-body p{font-size:16.5px}.sgn-wrap .sgn-rule{margin:0 26px}}
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
<div class="sgn-page">
<div class="sgn-wrap">
  <img class="sgn-header" src="${top.url}" alt="An Evening in Ho Chi Minh City: an exclusive gathering for Asia's OOH leaders, 12 November 2026" width="${top.metadata.dimensions.width}" height="${top.metadata.dimensions.height}" style="width:100%;height:auto;display:block;" />
  <div class="sgn-rule"></div>
  <div class="sgn-body">
    <div class="sgn-hello">Hi,</div>
    <p><strong>Greetings from Moving Walls!</strong></p>
    <p>We are delighted to invite you to an exclusive evening at <strong>Hilton Saigon</strong>, as Asia's Out of Home community comes together in Ho Chi Minh City this November.</p>
    <p>An invitation-only reception bringing together senior industry leaders shaping OOH across the region, in a relaxed setting for good company, conversations and meaningful new connections.</p>
    <p>Join us for drinks and light refreshments.</p>
    <div class="sgn-details">
      <div class="sgn-line">
        <svg viewBox="0 0 24 24" fill="none" stroke="#203f8e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <div class="sgn-text"><strong>Thursday, 12 November 2026</strong></div>
      </div>
      <div class="sgn-line">
        <svg viewBox="0 0 24 24" fill="none" stroke="#203f8e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <div class="sgn-text">5:00 – 7:00 PM (Ho Chi Minh City time)</div>
      </div>
      <div class="sgn-line">
        <svg viewBox="0 0 24 24" fill="none" stroke="#203f8e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <div class="sgn-text">40th Floor, Song Bar<br/><a href="${MAP}" target="_blank" rel="noopener">Hilton Saigon, Ho Chi Minh City, Vietnam</a></div>
      </div>
    </div>
    <p>We look forward to welcoming you.</p>
    <p class="sgn-note">By invitation only. Seats are limited.</p>
    <div class="sgn-cta">${rsvpButton}</div>
  </div>
  <img class="sgn-footer" src="${bottom.url}" alt="12 November 2026, 5:00–7:00 PM, 40th Floor, Song Bar, Hilton Saigon. Brought to you by Moving Walls" width="${bottom.metadata.dimensions.width}" height="${bottom.metadata.dimensions.height}" loading="lazy" style="width:100%;height:auto;display:block;" />
</div>
</div>
<div id="rsvp-modal" class="rsvp-modal-overlay" data-modal-root>
  <div class="rsvp-modal-box" role="dialog" aria-modal="true" aria-label="RSVP — An Evening in Ho Chi Minh City">
    <button type="button" class="rsvp-modal-close" aria-label="Close" data-modal-close>&times;</button>
    <iframe id="rsvp-modal-frame" class="rsvp-modal-frame" title="An Evening in Ho Chi Minh City RSVP form" loading="lazy"></iframe>
  </div>
</div>`

await c.createOrReplace({
  _id: `drafts.${ID}`,
  _type: 'landingPage',
  title: 'An Evening in Ho Chi Minh City 2026',
  slug: { _type: 'slug', current: SLUG },
  isPublished: true,
  status: 'published',
  sections: [{ _key: 'sgnhtml', _type: 'customEmbed', backgroundColor: 'transparent', maxWidth: 'full', code: html }],
  seo: {
    _type: 'seo',
    metaTitle: 'An Evening in Ho Chi Minh City | Moving Walls, 12 Nov 2026',
    metaDescription: "Moving Walls invites Asia's OOH leaders to an exclusive evening reception at Song Bar, Hilton Saigon, Ho Chi Minh City, on 12 November 2026, 5–7 PM. By invitation only.",
    enableKeywords: false,
    // Invitation-only event: keep it out of Google; the shared link still works.
    noIndex: true,
    ogImage: { _type: 'image', asset: { _type: 'reference', _ref: top._id } },
  },
})
console.log('Draft created: drafts.' + ID, '->', '/' + SLUG, RSVP_FORM ? '(RSVP live)' : '(RSVP placeholder)')
