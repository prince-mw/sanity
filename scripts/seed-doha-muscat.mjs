// Creates DRAFT city pages for Doha (/locations/qatar/doha) and Muscat (/locations/oman/muscat) from the
// "Digital OOH Advertising in Doha" and "Digital OOH Advertising in Muscat" Google Docs (5 Nov 2026).
// Page shell like the UAE city pages (hero, logos, closing banner, FAQs, MENA contact form); the doc sections
// are one custom HTML block styled like the live Qatar country page (icon cards, navy stat band), so the
// sections follow the doc order. The docs have no FAQs, card text or SEO, so those were written from the
// page copy. Hero photos: Desktop digital-ooh-advertising-in-<city>.webp (Dg, 5 Nov 2026).
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const FORM = 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MENAContact/formperma/rohUC6TSLJoVVWAQlZib80kjyCuLMyQsdAlSvClkitc'
const QATAR = 'a2e4b742-ef32-4d65-8849-2ed943e4d607'
const OMAN = 'location-oman'
const up = async (file, alt) => ({ _type: 'image', alt, asset: { _type: 'reference', _ref: (await c.assets.upload('image', fs.createReadStream('C:/Users/admin/Desktop/' + file), { filename: file }))._id } })

let n = 0
const k = () => `dm${String(++n).padStart(4, '0')}`

// Logo carousel exactly as on the UAE city pages
const sharjah = await c.getDocument('7dd2cf4c-d8e0-4bcd-a44e-06d99c31edfb')
const logoSection = sharjah.sections.find((s) => s._type === 'logoCarousel')
const logos = () => ({ ...logoSection, _key: k() })

// ---- Custom HTML (same tokens and card style as the Qatar country page embed) ----
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// '[text](url)' -> external link
const rich = (s) => esc(s).replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
const svg = (inner) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`
const ICON = {
  building: '<rect x="3" y="10" width="5" height="11"/><rect x="10" y="6" width="5" height="15"/><rect x="17" y="13" width="4" height="8"/><line x1="2" y1="21" x2="22" y2="21"/>',
  landmark: '<line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
  store: '<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/><path d="M3 9h18"/>',
  bag: '<path d="M6 8V6a6 6 0 0 1 12 0v2"/><rect x="3" y="8" width="18" height="13" rx="2"/><line x1="3" y1="13" x2="21" y2="13"/>',
  waves: '<path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M8 7l4-4 4 4"/>',
  trend: '<path d="M3 17l6-6 4 4 8-8"/><polyline points="15 7 21 7 21 13"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15 20c0-2.5 1.5-4.5 4-5"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  screen: '<rect x="3" y="4" width="18" height="12" rx="2"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/><circle cx="12" cy="10" r="2"/>',
  road: '<path d="M4 21 9 3h6l5 18"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="15" x2="12" y2="17"/>',
  pin: '<path d="M12 21s7-7.58 7-12a7 7 0 1 0-14 0c0 4.42 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
}
const MEDIA_ICON = { 'Digital Billboards': 'screen', 'Airport Advertising': 'plane', 'Mall Advertising': 'bag', 'Roadside Advertising': 'road', 'Place-Based Media': 'pin' }
const ic = (name) => `<span class="mw-gc__icon" aria-hidden="true">${svg(ICON[name])}</span>`

const CSS = `<style>
  .mw-gc{ --ink:#101828; --muted:#5B6472; --navy:#12296B; --blue:#2F5FE0; --blue-tint:#EAF0FE; --line:#E2E6ED;
    --radius:16px; --shadow:0 4px 20px rgba(16,24,40,.06); --shadow-hover:0 16px 36px rgba(16,24,40,.12); }
  .mw-gc *{ box-sizing:border-box; }
  .mw-gc section{ padding:clamp(40px,6vw,72px) 16px; }
  @media (min-width:640px){ .mw-gc section{ padding-left:24px; padding-right:24px; } }
  @media (min-width:1024px){ .mw-gc section{ padding-left:32px; padding-right:32px; } }
  .mw-gc .mw-gc__wrap{ max-width:1280px; margin:0 auto; }
  .mw-gc .mw-gc__white{ background:#fff; } .mw-gc .mw-gc__tint{ background:#F6F8FC; }
  .mw-gc h2{ font-size:clamp(28px,4vw,38px); font-weight:800; line-height:1.15; color:var(--ink); margin:0 0 16px; }
  .mw-gc .mw-gc__head{ max-width:860px; margin:0 auto 40px; text-align:center; }
  .mw-gc .mw-gc__eyebrow{ display:inline-block; font-size:12.5px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--blue); margin-bottom:12px; }
  .custom-embed .mw-gc p a{ color:var(--blue); font-weight:600; text-decoration:underline; text-underline-offset:3px; }

  /* Intro */
  .mw-gc .mw-gc__intro{ max-width:1000px; margin:0 auto; text-align:center; }
  .mw-gc .mw-gc__intro p{ font-size:17px; line-height:1.75; color:var(--muted); margin:0 0 16px; }

  /* At a glance band */
  .mw-gc .mw-gc__band{ background:linear-gradient(135deg,#12296B 0%,#1E40AF 55%,#2F5FE0 100%); }
  .mw-gc .mw-gc__band h2{ color:#fff; text-align:center; margin-bottom:36px; }
  .mw-gc .mw-gc__stats{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
  .mw-gc .mw-gc__stat{ background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.18); border-radius:var(--radius); padding:26px 22px; text-align:center; }
  .custom-embed .mw-gc .mw-gc__num{ font-size:clamp(36px,4vw,48px) !important; font-weight:800; color:#fff !important; line-height:1.05 !important; margin:4px 0 12px !important; }
  .mw-gc .mw-gc__stat .mw-gc__icon{ background:rgba(255,255,255,.14); color:#fff; margin:0 auto 14px; }
  .mw-gc .mw-gc__stat h3{ font-size:17px; font-weight:700; color:#fff; margin:0 0 8px; line-height:1.3; }
  .mw-gc .mw-gc__stat p{ font-size:14px; line-height:1.55; color:rgba(255,255,255,.8); margin:0; }

  /* Icon cards (areas, media types) */
  .mw-gc .mw-gc__cards{ display:flex; flex-wrap:wrap; justify-content:center; gap:22px; }
  .mw-gc .mw-gc__card{ flex:0 1 calc((100% - 44px) / 3); background:#fff; border:1px solid var(--line); border-radius:var(--radius); padding:26px; box-shadow:var(--shadow);
    transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
  .mw-gc .mw-gc__card:hover{ transform:translateY(-4px); box-shadow:var(--shadow-hover); border-color:var(--blue); }
  .mw-gc .mw-gc__icon{ width:48px; height:48px; border-radius:50%; background:var(--blue-tint); color:var(--blue); display:flex; align-items:center; justify-content:center; margin-bottom:18px; }
  .mw-gc .mw-gc__icon svg{ width:22px; height:22px; }
  .mw-gc .mw-gc__card h3{ font-size:17px; font-weight:700; color:var(--ink); line-height:1.35; margin:0 0 8px; }
  .mw-gc .mw-gc__card p{ font-size:14.5px; line-height:1.6; color:var(--muted); margin:0; }

  /* Billboard cards */
  .mw-gc .mw-gc__boards{ display:grid; grid-template-columns:repeat(4,1fr); gap:22px; }
  .mw-gc .mw-gc__board{ background:#fff; border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; box-shadow:var(--shadow);
    transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
  .mw-gc .mw-gc__board:hover{ transform:translateY(-4px); box-shadow:var(--shadow-hover); border-color:var(--blue); }
  .mw-gc .mw-gc__board-top{ position:relative; height:120px; background:linear-gradient(135deg,#12296B,#2F5FE0); display:flex; align-items:flex-end; padding:18px 20px; overflow:hidden; }
  .mw-gc .mw-gc__board-top svg{ position:absolute; right:-14px; top:-10px; width:120px; height:120px; color:rgba(255,255,255,.16); }
  .mw-gc .mw-gc__board-top h3{ position:relative; font-size:18px; font-weight:800; color:#fff; margin:0; line-height:1.25; }
  .mw-gc .mw-gc__chip{ position:absolute; top:16px; left:20px; font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:#fff; background:rgba(255,255,255,.18); padding:4px 10px; border-radius:999px; }
  .mw-gc .mw-gc__board p{ font-size:14.5px; line-height:1.6; color:var(--muted); margin:0; padding:20px; }

  /* Opportunity */
  .mw-gc .mw-gc__split{ display:grid; grid-template-columns:1.25fr 1fr; gap:48px; align-items:start; }
  .mw-gc .mw-gc__split-text p{ font-size:16.5px; line-height:1.7; color:var(--muted); margin:0 0 16px; }
  .mw-gc .mw-gc__panel{ background:#F6F8FC; border:1px solid var(--line); border-radius:var(--radius); padding:28px; }
  .mw-gc .mw-gc__panel-title{ font-size:13px !important; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--blue) !important; margin:0 0 18px !important; }
  .mw-gc .mw-gc__fit{ display:flex; gap:16px; align-items:flex-start; padding:16px 0; border-top:1px solid var(--line); }
  .mw-gc .mw-gc__panel-title + .mw-gc__fit{ border-top:0; padding-top:0; }
  .mw-gc .mw-gc__fit .mw-gc__icon{ flex:0 0 44px; width:44px; height:44px; margin:0; background:#fff; border:1px solid var(--line); }
  .mw-gc .mw-gc__fit h3{ font-size:16px; font-weight:700; color:var(--ink); margin:0 0 4px; }
  .mw-gc .mw-gc__fit p{ font-size:14px; line-height:1.55; color:var(--muted); margin:0; }
  .custom-embed .mw-gc__btn{ display:inline-flex; align-items:center; gap:8px; font-weight:700; font-size:15px; padding:15px 30px; border-radius:10px;
    color:#fff !important; text-decoration:none !important; background:var(--blue); transition:transform .2s ease, background .2s ease; margin-top:8px; }
  .custom-embed .mw-gc__btn:hover{ background:#2450C4; transform:translateY(-2px); }
  .mw-gc .mw-gc__btn svg{ width:16px; height:16px; }
  .mw-gc .mw-gc__center{ text-align:center; margin-top:36px; }

  @media (max-width:1024px){ .mw-gc .mw-gc__stats, .mw-gc .mw-gc__boards{ grid-template-columns:1fr 1fr; } }
  @media (max-width:900px){ .mw-gc .mw-gc__card{ flex-basis:calc((100% - 22px) / 2); } }
  @media (max-width:860px){ .mw-gc .mw-gc__split{ grid-template-columns:1fr; gap:28px; } }
  @media (max-width:600px){ .mw-gc .mw-gc__card{ flex-basis:100%; } }
  @media (max-width:560px){ .mw-gc .mw-gc__stats, .mw-gc .mw-gc__boards{ grid-template-columns:1fr; } }
  @media (prefers-reduced-motion: reduce){ .mw-gc *{ transition:none!important; } }
</style>`

const btn = (text) => `<a class="mw-gc__btn" href="${FORM}">${esc(text)} ${svg(ICON.arrow)}</a>`

const embed = (o) => `${CSS}
<div class="mw-gc">
<section class="mw-gc__white"><div class="mw-gc__wrap"><div class="mw-gc__intro">
  <h2>${esc(o.aboutTitle)}</h2>
  ${o.about.map((p) => `<p>${rich(p)}</p>`).join('\n  ')}
</div></div></section>

<section class="mw-gc__band"><div class="mw-gc__wrap">
  <h2>${esc(o.name)} OOH Advertising at a Glance</h2>
  <div class="mw-gc__stats">
  ${o.glance.map(([v, label, icon]) => icon
    ? `<div class="mw-gc__stat">${ic(icon)}<h3>${esc(v)}</h3><p>${esc(label)}</p></div>`
    : `<div class="mw-gc__stat"><div class="mw-gc__num">${esc(v)}</div><p>${esc(label)}</p></div>`).join('\n  ')}
  </div>
</div></section>

<section class="mw-gc__tint"><div class="mw-gc__wrap">
  <div class="mw-gc__head"><span class="mw-gc__eyebrow">Key Areas</span><h2>Explore Digital OOH Advertising Across ${esc(o.name)}</h2></div>
  <div class="mw-gc__cards">
  ${o.areas.map(([t, d, icon]) => `<div class="mw-gc__card">${ic(icon)}<h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('\n  ')}
  </div>
</div></section>

<section class="mw-gc__white"><div class="mw-gc__wrap">
  <div class="mw-gc__head"><span class="mw-gc__eyebrow">Digital Billboards</span><h2>High-Visibility Digital Billboards Across ${esc(o.name)}</h2></div>
  <div class="mw-gc__boards">
  ${o.billboards.map(([t, d]) => `<div class="mw-gc__board"><div class="mw-gc__board-top">${svg(ICON.screen)}<span class="mw-gc__chip">${esc(o.name)}</span><h3>${esc(t)}</h3></div><p>${esc(d)}</p></div>`).join('\n  ')}
  </div>
  <div class="mw-gc__center">${btn(`Request ${o.name} Campaign Options`)}</div>
</div></section>

<section class="mw-gc__tint"><div class="mw-gc__wrap">
  <div class="mw-gc__head"><span class="mw-gc__eyebrow">Formats</span><h2>Media Types Available in ${esc(o.name)}</h2></div>
  <div class="mw-gc__cards">
  ${o.media.map(([t, d]) => `<div class="mw-gc__card">${ic(MEDIA_ICON[t])}<h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('\n  ')}
  </div>
</div></section>

<section class="mw-gc__white"><div class="mw-gc__wrap"><div class="mw-gc__split">
  <div class="mw-gc__split-text">
    <h2>The OOH Opportunity in ${esc(o.name)}</h2>
    ${o.opportunity.map((p) => `<p>${rich(p)}</p>`).join('\n    ')}
    ${btn(`Talk to Our ${o.countryName} Team`)}
  </div>
  <div class="mw-gc__panel">
    <p class="mw-gc__panel-title">Where brands fit in ${esc(o.name)}</p>
    ${o.fit.map(([t, d, icon]) => `<div class="mw-gc__fit">${ic(icon)}<div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`).join('\n    ')}
  </div>
</div></div></section>
</div>`

const page = (o) => ({
  _id: `drafts.${o.id}`,
  _type: 'locationCity',
  country: { _type: 'reference', _ref: o.country },
  city: o.name,
  slug: { _type: 'slug', current: o.slug },
  isActive: true,
  heroTitle: o.h1,
  heroImage: o.hero,
  fullDescription: o.intro,
  description: o.card,
  ctaButtonText: 'Get Started',
  showAllLocationsButton: true,
  contactFormUrl: FORM,
  sectionsPosition: 'before-faqs',
  sections: [
    { _type: 'customEmbed', _key: k(), backgroundColor: 'transparent', maxWidth: 'full', code: embed(o) },
    logos(),
    {
      _type: 'ctaBanner', _key: k(), backgroundColor: 'blue',
      heading: `Plan Your ${o.name} OOH Campaign with Moving Walls`,
      subheading: o.plan.join(' ') + ' Plan. Activate. Measure.',
      ctaText: `Request ${o.name} Campaign Options`, ctaLink: FORM,
    },
  ],
  faqsHeading: `FAQs on DOOH Advertising in ${o.name}`,
  faqs: o.faqs.map(([question, answer]) => ({ _key: k(), question, answer })),
  seo: { _type: 'seo', metaTitle: o.seo[0], metaDescription: o.seo[1], enableKeywords: false, noIndex: false, ogImage: o.hero },
})

const MEDIA_COMMON_FAQ = (city, country) => [
  [`Can I choose specific billboard locations in ${city}?`, 'Yes. Campaigns can be planned around selected locations depending on your target audience, campaign objectives, dates and inventory availability.'],
  ['Can campaigns be planned for different budgets and durations?', 'Yes. Campaign options can be tailored based on selected locations, campaign dates, audience requirements and overall campaign budget.'],
  [`Can I run campaigns beyond ${city}?`, `Yes. Moving Walls can help you extend campaigns to other locations across ${country} and to international markets, building broader coverage across connected audiences.`],
  [`How do I get started with DOOH advertising in ${city}?`, `Share your target audience, preferred locations, campaign dates and budget, and our team will recommend suitable ${city} campaign options.`],
]

const doha = page({
  id: 'city-qatar-doha', slug: 'doha', name: 'Doha', country: QATAR, countryName: 'Qatar',
  hero: await up('digital-ooh-advertising-in-doha.webp', 'Digital OOH advertising in Doha, Qatar'),
  h1: 'Digital OOH Advertising in Doha',
  intro: "Doha is at the centre of Qatar's business, tourism, retail and entertainment landscape. As the country's capital and largest urban hub, the city brings together a diverse population of residents, professionals, commuters, shoppers and international visitors.\n\nMoving Walls helps brands and agencies plan, activate and measure OOH campaigns across relevant locations, using audience and location intelligence to make media planning more effective.",
  card: "Reach residents, professionals, shoppers and international visitors across West Bay, Msheireb, The Pearl, Lusail and Hamad International Airport with digital OOH.",
  aboutTitle: "Reach Audiences Across Qatar's Capital with Digital Out-of-Home Advertising",
  about: [
    "With Qatar's national population reaching approximately [3.37 million in March 2026](https://marhaba.qa/qatar-population-hits-3-37-mn-in-march-2026/), Doha remains a key market for brands looking to connect with audiences across the country. The city also benefits from Qatar's growing international tourism sector, which welcomed [5.1 million international visitors in 2025](https://www.qatartourism.com/en/news-and-media/press-releases/qatar-tourism-marks-2025-as-a-year-of-global-milestones-and-resi) according to Qatar Tourism.",
    'From the commercial districts of West Bay to the retail destinations of Msheireb and The Pearl, Doha offers a range of high-value environments for Digital Out-of-Home (DOOH) advertising.',
  ],
  glance: [
    ['3.37M+', "Qatar's national population (March 2026)"],
    ['5.1M', 'International visitors to Qatar in 2025'],
    ['Multiple Audience Environments', 'Business, retail, residential, tourism and entertainment destinations', 'layers'],
    ['Connected OOH', 'Audience-led planning, activation and measurement', 'link'],
  ],
  areas: [
    ['West Bay', "Doha's prominent business and commercial district, West Bay is home to corporate offices, hotels, financial institutions and major commercial developments. Digital billboards and screens in this environment can help brands reach professionals, business travellers, residents and visitors throughout the working day.", 'building'],
    ['Msheireb Downtown Doha', 'A modern urban destination combining commercial spaces, retail, hospitality and cultural attractions. Its mix of residents, workers and visitors offers opportunities for brands seeking visibility in a premium city environment.', 'store'],
    ['The Pearl-Qatar', 'A major residential, retail and leisure destination, The Pearl attracts residents, shoppers, diners and international visitors. It offers opportunities for lifestyle, automotive, luxury, hospitality and consumer brands.', 'waves'],
    ['Lusail', "One of Qatar's most prominent urban development destinations, Lusail combines residential communities, commercial districts, entertainment venues and major event spaces. Its growing activity creates opportunities for brands looking to connect with audiences in a modern, evolving city environment.", 'trend'],
    ['Hamad International Airport', 'As a major international travel gateway, the airport provides opportunities to reach arriving and departing passengers, business travellers and international visitors in a high-attention environment.', 'plane'],
  ],
  fit: [
    ['Business districts', 'B2B, financial services, technology and professional brands', 'briefcase'],
    ['Retail and lifestyle destinations', 'Consumer, fashion, automotive and hospitality campaigns', 'bag'],
    ['Tourism and major events', 'International visitors and audiences with changing travel patterns', 'globe'],
  ],
  billboards: [
    ['West Bay', "Reach professionals, business travellers and visitors across Doha's commercial district."],
    ['Msheireb Downtown Doha', 'Connect with shoppers, residents and visitors in a vibrant mixed-use destination.'],
    ['The Pearl-Qatar', 'Engage premium residential, retail, dining and leisure audiences.'],
    ['Lusail', 'Reach audiences across an expanding residential, commercial and entertainment destination.'],
  ],
  media: [
    ['Digital Billboards', 'High-impact digital formats across major roads and commercial locations.'],
    ['Airport Advertising', 'Reach international and domestic travellers.'],
    ['Mall Advertising', 'Connect with shoppers close to purchase decisions.'],
    ['Roadside Advertising', 'Build awareness along major roads and commuter routes.'],
    ['Place-Based Media', 'Reach audiences in retail, hospitality, entertainment and lifestyle environments.'],
  ],
  opportunity: [
    "Doha's combination of commercial activity, population concentration, international connectivity and tourism creates a compelling environment for outdoor advertising.",
    "The city's business districts provide opportunities for B2B, financial services, technology and professional brands. Retail and lifestyle destinations offer relevant environments for consumer, fashion, automotive and hospitality campaigns. Meanwhile, tourism and major events create opportunities to reach international visitors and audiences with changing travel patterns.",
    'For media agencies, Doha offers the opportunity to build campaigns around specific audience environments rather than relying solely on broad city-wide exposure. Brands can use digital OOH to strengthen awareness, complement digital campaigns and maintain visibility across key consumer journeys.',
  ],
  plan: [
    'Moving Walls connects audience intelligence, location planning, media activation and measurement to help brands make better OOH decisions.',
    "Whether you're targeting business professionals in West Bay, shoppers at The Pearl, residents in Lusail or international visitors, our platform helps you plan campaigns around the locations and audiences that matter.",
  ],
  faqs: [
    ['What audiences can I reach with outdoor advertising in Doha?', 'Doha brings together residents, professionals, commuters, shoppers and international visitors. Campaigns can be planned around business districts such as West Bay, retail and lifestyle destinations such as Msheireb and The Pearl-Qatar, residential communities in Lusail and travellers at Hamad International Airport.'],
    ['Which areas of Doha are best for DOOH advertising?', 'It depends on your audience. West Bay suits B2B, financial services and professional brands; Msheireb Downtown Doha and The Pearl-Qatar suit lifestyle, luxury, retail and hospitality brands; Lusail reaches residential, commercial and event audiences; and Hamad International Airport reaches arriving and departing passengers.'],
    ['What DOOH formats are available in Doha?', 'Options include digital billboards, airport advertising, mall advertising, roadside advertising and place-based media across retail, hospitality, entertainment and lifestyle environments.'],
    ['Can I reach tourists and international visitors in Doha?', 'Yes. Qatar welcomed 5.1 million international visitors in 2025. Airport, hospitality, retail and leisure locations help brands reach visitors throughout their stay.'],
    ...MEDIA_COMMON_FAQ('Doha', 'Qatar'),
  ],
  seo: ['Digital Billboards & DOOH Advertising in Doha', 'Reach audiences across Doha with digital OOH: West Bay, Msheireb, The Pearl, Lusail and Hamad International Airport. Plan, activate and measure with Moving Walls.'],
})

const muscat = page({
  id: 'city-oman-muscat', slug: 'muscat', name: 'Muscat', country: OMAN, countryName: 'Oman',
  hero: await up('digital-ooh-advertising-in-muscat.webp', 'Digital OOH advertising in Muscat, Oman'),
  h1: 'Digital OOH Advertising in Muscat',
  intro: "Muscat is the commercial, administrative and cultural centre of Oman. Stretching along the Gulf of Oman, the city combines established residential communities, business districts, retail destinations, hospitality developments and important transport corridors.\n\nMoving Walls helps brands and agencies plan, activate and measure connected OOH campaigns using audience and location intelligence.",
  card: "Reach professionals, families, commuters and visitors across Al Khuwair, Ruwi, Qurum, Al Mouj and Muscat International Airport with digital OOH.",
  aboutTitle: "Reach Audiences Across Oman's Capital with Digital Out-of-Home Advertising",
  about: [
    "With approximately [1.56 million residents across Muscat Governorate](https://timesofoman.com/article/174356-omans-total-population-crosses-5-million-muscat-remains-most-populous-governorate), the capital represents one of Oman's most significant advertising markets. Its diverse audience includes Omani residents, expatriate communities, professionals, commuters and visitors.",
    "Muscat's growing tourism sector adds another dimension to its OOH potential. Oman welcomed approximately [3.97 million visitors in 2025](https://www.omanobserver.om/article/1197213/business/tourism/oman-tourism-growth-puts-service-in-focus), creating opportunities for brands to connect with domestic and international travellers across the capital's hotels, shopping destinations, attractions and transport environments.",
    'From the commercial districts of Al Khuwair and Ruwi to the retail and lifestyle destinations of Qurum and Al Mouj, Muscat offers a variety of environments for Digital Out-of-Home (DOOH) campaigns.',
  ],
  glance: [
    ['1.56M+', 'Population across Muscat Governorate'],
    ['3.97M', 'Visitors to Oman in 2025'],
    ['Key Audience Environments', 'Business, residential, retail, tourism and leisure destinations', 'layers'],
    ['Connected OOH', 'Audience-led planning, activation and measurement', 'link'],
  ],
  areas: [
    ['Al Khuwair', 'A key commercial and administrative district, Al Khuwair combines offices, government institutions, retail outlets, hotels and residential communities. It offers opportunities for brands targeting professionals, residents and daily commuters.', 'landmark'],
    ['Ruwi', "One of Muscat's established commercial centres, Ruwi is known for its business activity, retail outlets and transport connections. Its concentration of commercial and everyday consumer activity makes it relevant for brands seeking broad urban visibility.", 'briefcase'],
    ['Qurum', 'A popular residential, retail and leisure destination, Qurum attracts families, shoppers, professionals and visitors. Its mix of shopping, dining, hospitality and lifestyle activity provides opportunities for consumer-facing campaigns.', 'users'],
    ['Al Mouj Muscat', 'A prominent waterfront lifestyle and residential destination, Al Mouj combines residential communities, hospitality, retail, dining and leisure. It offers an attractive environment for premium, automotive, travel, property and lifestyle brands.', 'waves'],
    ['Muscat International Airport', "Oman's main international aviation gateway connects the capital with regional and global destinations. Airport advertising provides opportunities to reach arriving and departing passengers, business travellers and international visitors.", 'plane'],
  ],
  fit: [
    ['Business and administrative districts', 'Financial services, telecommunications, automotive, technology and B2B brands', 'briefcase'],
    ['Retail and lifestyle locations', 'Fashion, FMCG, hospitality and consumer campaigns', 'bag'],
    ['Tourism destinations and the airport', 'Visitors throughout their journeys', 'plane'],
  ],
  billboards: [
    ['Al Khuwair', 'Reach professionals, residents and commuters across a major commercial district.'],
    ['Ruwi', 'Connect with consumers and workers across established retail and business environments.'],
    ['Qurum', 'Engage residential, shopping, dining and leisure audiences.'],
    ['Al Mouj Muscat', 'Target premium residential, hospitality and lifestyle audiences.'],
  ],
  media: [
    ['Digital Billboards', 'High-impact digital formats along major roads, commercial districts and high-traffic corridors.'],
    ['Airport Advertising', 'Connect with domestic and international travellers at key points in their journeys.'],
    ['Mall Advertising', 'Reach shoppers and consumers in prominent retail destinations.'],
    ['Roadside Advertising', 'Build brand visibility across busy urban roads and commuter routes.'],
    ['Place-Based Media', 'Engage audiences across hospitality, leisure, retail and entertainment environments.'],
  ],
  opportunity: [
    "Muscat's advertising potential comes from the combination of a substantial resident population, concentrated commercial activity and a growing tourism economy.",
    'Business and administrative districts create opportunities for financial services, telecommunications, automotive, technology and B2B brands. Retail and lifestyle locations provide relevant environments for fashion, FMCG, hospitality and consumer campaigns. Tourism destinations and the airport offer additional opportunities to reach visitors throughout their journeys.',
    'For media agencies, Muscat offers the ability to plan campaigns across different audience environments within a single metropolitan market. Rather than treating the city as one advertising space, campaigns can be tailored to specific locations, audience profiles and campaign objectives.',
    'Digital OOH also gives brands greater flexibility through multiple creative executions, scheduling and campaign optimisation. When supported by audience intelligence and measurement, it can complement digital and social campaigns while extending brand visibility into the physical world.',
  ],
  plan: [
    'Moving Walls brings together audience intelligence, location planning, activation and measurement to help advertisers make more informed OOH decisions.',
    'Whether your objective is to reach professionals in Al Khuwair, consumers in Ruwi, families in Qurum or premium audiences around Al Mouj, Moving Walls can help you identify relevant locations and plan campaigns around your business goals.',
  ],
  faqs: [
    ['What audiences can I reach with outdoor advertising in Muscat?', 'Muscat brings together Omani residents, expatriate communities, professionals, commuters and visitors. Campaigns can be planned around business districts such as Al Khuwair and Ruwi, lifestyle destinations such as Qurum and Al Mouj, and travellers at Muscat International Airport.'],
    ['Which areas of Muscat are best for DOOH advertising?', 'It depends on your audience. Al Khuwair reaches professionals and daily commuters; Ruwi offers broad urban visibility among consumers and workers; Qurum suits family, shopping and leisure audiences; Al Mouj Muscat suits premium, property and lifestyle brands; and Muscat International Airport reaches arriving and departing passengers.'],
    ['What DOOH formats are available in Muscat?', 'Options include digital billboards, airport advertising, mall advertising, roadside advertising and place-based media across hospitality, leisure, retail and entertainment environments.'],
    ['Can I reach tourists and visitors in Muscat?', "Yes. Oman welcomed approximately 3.97 million visitors in 2025. Hotels, shopping destinations, attractions, the airport and transport environments help brands reach domestic and international travellers across the capital."],
    ...MEDIA_COMMON_FAQ('Muscat', 'Oman'),
  ],
  seo: ['Digital Billboards & Outdoor Advertising in Muscat', 'Reach audiences across Muscat with digital OOH: Al Khuwair, Ruwi, Qurum, Al Mouj and Muscat International Airport. Plan, activate and measure with Moving Walls.'],
})

const docs = [doha, muscat]
for (const d of docs) {
  if (await c.fetch('count(*[_type=="locationCity" && slug.current==$s && country._ref==$cn && !(_id in [$id, $d])])', { s: d.slug.current, cn: d.country._ref, id: d._id.replace('drafts.', ''), d: d._id })) throw new Error('Slug in use: ' + d.slug.current)
}
const tx = c.transaction()
docs.forEach((d) => tx.createOrReplace(d))
await tx.commit()
console.log('Drafts created: /locations/qatar/doha, /locations/oman/muscat')
