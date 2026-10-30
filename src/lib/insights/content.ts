import 'server-only'
import { unstable_cache } from 'next/cache'
import { client } from '@/sanity/lib/client'
import { ga4Report } from './google'
import { isBotRow } from './data'
import { zohoTableRows } from './zoho'
import { actionId } from './actions'
import { periods, type RangeKey } from './ranges'

// Content effectiveness for /internal-insights (Content tab), mirroring the "05 Content Effectiveness"
// tab of the "Marketing Command Center - MW" Zoho dashboard:
// - Website content (blogs, case studies, ebook downloads): GA4, live
// - Content published: the website's own Sanity CMS
// - LinkedIn / Facebook / Instagram posts: the Zoho Analytics social connectors (Marketing Team Workspace)

const ZOHO = {
  linkedinPosts: '2553974000068691170', // Post Insights (LinkedIn Pages)
  linkedinFollowers: '2553974000068691139', // Follower Counts By Date (LinkedIn Pages)
  facebookPosts: '2553974000068708911', // Post Insights (Facebook Pages)
  instagramMedia: '2553974000068972018', // Media (Instagram Profile)
  instagramInsights: '2553974000068972110', // Media Insights (Instagram Profile): images and carousels
  instagramReels: '2553974000068972140', // Reels Insights (Instagram Profile): video reach
  instagramProfile: '2553974000068972002', // Profile Information (Instagram Profile)
}

type Priority = 'High' | 'Medium' | 'Low'

export interface ContentPage {
  path: string
  title: string
  type: 'Blog' | 'Case study'
  readers: number
  readSeconds: number
  leads: number
  publishedAt: string
  author: string
}

export interface SocialPost {
  date: string
  text: string
  url: string
  format: string
  impressions: number
  engagements: number
  /** LinkedIn engagement rate, or engagements ÷ reach for Instagram */
  rate: number
}

export interface SocialChannel {
  name: 'LinkedIn' | 'Facebook' | 'Instagram'
  posts: number
  impressions: number
  engagements: number
  prevPosts: number
  prevImpressions: number
  prevEngagements: number
  /** Followers gained (LinkedIn) or current followers (Facebook, Instagram) */
  followers: number | null
  followersLabel: string
  impressionsLabel: string
  top: SocialPost[]
  byFormat: { format: string; posts: number; engagementsPerPost: number }[]
}

export interface ContentTotals { readers: number; botReaders: number; leads: number; published: number; ebookOpens: number; ebookDownloads: number }

export interface EbookRow { name: string; path: string; opened: number; downloaded: number; prevOpened: number; prevDownloaded: number }

export interface ContentDashboard {
  generatedAt: string
  range: RangeKey
  current: ContentTotals
  previous: ContentTotals
  blogs: ContentPage[]
  caseStudies: ContentPage[]
  channels: { channel: string; blog: number; caseStudy: number }[]
  published: { title: string; type: 'Blog' | 'Case study'; author: string; publishedAt: string; path: string }[]
  ebooks: EbookRow[]
  social: SocialChannel[]
  working: { title: string; detail: string }[]
  notWorking: { title: string; detail: string }[]
  actions: { id: string; priority: Priority; category: string; title: string; detail: string; page?: string }[]
}

const num = (s: string | number | undefined) => Number(String(s ?? '').replace(/,/g, '')) || 0
const isoOf = (s: string) => { const t = Date.parse(s); return isNaN(t) ? '' : new Date(t).toISOString().slice(0, 10) }
const snippet = (s: string) => (s || '').replace(/@\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\\_/g, '_').replace(/\s+/g, ' ').trim().slice(0, 140)
const nf = (n: number) => Math.round(n).toLocaleString('en-US')
const typeOf = (path: string): 'Blog' | 'Case study' => (path.startsWith('/case-studies/') ? 'Case study' : 'Blog')
const cleanPath = (p: string) => p.replace(/[?#].*$/, '').replace(/\/+$/, '')

const contentFilter = (field: string) => ({
  orGroup: {
    expressions: ['/blog/', '/case-studies/'].map((value) => ({ filter: { fieldName: field, stringFilter: { matchType: 'BEGINS_WITH', value } } })),
  },
})
const leadFilter = { filter: { fieldName: 'eventName', stringFilter: { matchType: 'BEGINS_WITH', value: 'generate_lead' } } }
// Ebook downloads: the Zoho form opens in a popup and GA4 records its page views, so no custom events are needed.
// Opened = a view of the form; downloaded = a view of its Zoho "thankyou" page after submitting (only for forms set
// to show that page). The old download_* events were removed in Oct 2026 (GA4 event limit) and count only before then.
const zohoPageViews = {
  andGroup: {
    expressions: [
      { filter: { fieldName: 'hostName', stringFilter: { matchType: 'CONTAINS', value: 'zohopublic' } } },
      { filter: { fieldName: 'eventName', stringFilter: { matchType: 'EXACT', value: 'page_view' } } },
    ],
  },
}
const formOf = (path: string) => path.match(/\/form\/([^/?#]+)/)?.[1] || ''
const NOT_EBOOK_FORM = /contact|bookdemo|formula1|airportinventory|doubledelight/i
// Download forms that aren't website ebooks (no Sanity title)
const FORM_NAMES: Record<string, string> = {
  JapaneseWhitePaperTravelTourism: 'Japan whitepaper: Travel & Tourism',
  JapanWhitepaperTechnologyConsumerElectronics: 'Japan whitepaper: Technology & Consumer Electronics',
  JapanWhitepaperLuxuryFashion: 'Japan whitepaper: Luxury & Fashion',
  MWeBookHowtoextenddigitalvideoreachusingOOHmedia: 'How to extend digital video reach using OOH media',
}
const EBOOK_FORM = /ebook|e-book|whitepaper|guide|playbook|report|download|getyourcopy|bestpractices|cms|roadmap|security/i

async function website(start: string, end: string) {
  const dateRanges = [{ startDate: start, endDate: end }]
  const [pages, leads, ebooks, zohoViews] = await Promise.all([
    // Page × city × channel, so data-centre bot bursts can be removed (same rule as the Location pages tab)
    ga4Report({
      dateRanges,
      dimensions: [{ name: 'pagePath' }, { name: 'city' }, { name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'totalUsers' }, { name: 'sessions' }, { name: 'engagedSessions' }, { name: 'averageSessionDuration' }],
      dimensionFilter: contentFilter('pagePath'),
      limit: 100000,
    }),
    // Enquiries in sessions that started on an article (form events fire inside the Zoho iframe, so credit the landing page)
    ga4Report({ dateRanges, dimensions: [{ name: 'landingPage' }], metrics: [{ name: 'eventCount' }], dimensionFilter: { andGroup: { expressions: [contentFilter('landingPage'), leadFilter] } } }),
    ga4Report({ dateRanges, dimensions: [{ name: 'eventName' }], metrics: [{ name: 'eventCount' }], dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { matchType: 'BEGINS_WITH', value: 'download_' } } } }),
    ga4Report({ dateRanges, dimensions: [{ name: 'pagePath' }], metrics: [{ name: 'eventCount' }], dimensionFilter: zohoPageViews, limit: 5000 }),
  ])
  const forms = new Map<string, { opened: number; downloaded: number }>()
  for (const r of zohoViews) {
    const form = formOf(r.dims[0])
    if (!form) continue
    const f = forms.get(form) || forms.set(form, { opened: 0, downloaded: 0 }).get(form)!
    if (/\/thankyou\//i.test(r.dims[0])) f.downloaded += r.mets[0]
    else f.opened += r.mets[0]
  }
  const byPath = new Map<string, { readers: number; sessions: number; seconds: number; leads: number }>()
  const channelMap = new Map<string, { blog: number; caseStudy: number }>()
  let botReaders = 0
  for (const r of pages) {
    const path = cleanPath(r.dims[0])
    if (path === '/blog' || path === '/case-studies') continue
    const [users, sessions, engaged, avgDuration] = r.mets
    if (isBotRow(r.dims[1], r.dims[2], sessions, engaged)) { botReaders += users; continue }
    const e = byPath.get(path) || { readers: 0, sessions: 0, seconds: 0, leads: 0 }
    e.readers += users
    e.sessions += sessions
    e.seconds += sessions * avgDuration
    byPath.set(path, e)
    const c = channelMap.get(r.dims[2]) || { blog: 0, caseStudy: 0 }
    if (typeOf(path) === 'Blog') c.blog += users
    else c.caseStudy += users
    channelMap.set(r.dims[2], c)
  }
  for (const r of leads) {
    const e = byPath.get(cleanPath(r.dims[0]))
    if (e) e.leads += r.mets[0]
  }
  return {
    byPath,
    botReaders,
    legacyDownloads: ebooks.reduce((n, r) => n + r.mets[0], 0),
    forms,
    channels: channelMap,
    readers: [...byPath.values()].reduce((n, x) => n + x.readers, 0),
    leads: [...byPath.values()].reduce((n, x) => n + x.leads, 0),
  }
}

interface SanityDoc { _type: string; title: string; slug: string; publishedAt: string; author?: string; language?: string }

/**
 * All social posts + small lookup tables, fetched once per refresh and shared by every date range
 * (7 Zoho calls per 6 hours). Zoho rate-limits API calls per minute, so per-range queries are avoided.
 */
const getSocialData = unstable_cache(async () => {
  const [li, fb, ig, igInsights, reels, liFollowers, igProfile] = await Promise.all([
    zohoTableRows(ZOHO.linkedinPosts, { columns: ['Date', 'Message', 'Click Count', 'Like Count', 'Comment Count', 'Share Count', 'Impression Count', 'Engagement', 'Media Category', 'Post ID'] }),
    zohoTableRows(ZOHO.facebookPosts, { columns: ['Created Time', 'Type', 'Message', 'Total Reactions', 'Comments', 'Shares', 'Impressions', 'Post URL'] }),
    zohoTableRows(ZOHO.instagramMedia, { columns: ['Media ID', 'Caption', 'Like Count', 'Comments Count', 'Media Type', 'Permalink', 'Timestamp'] }),
    zohoTableRows(ZOHO.instagramInsights, { columns: ['Media ID', 'Engagement', 'Reach', 'Saved'] }),
    zohoTableRows(ZOHO.instagramReels, { columns: ['Reel ID', 'Likes', 'Comments', 'Saved', 'Shares', 'Reach'] }),
    zohoTableRows(ZOHO.linkedinFollowers, { columns: ['Date', 'Total Followers'] }),
    zohoTableRows(ZOHO.instagramProfile, { columns: ['Followers'] }),
  ])
  const insight = new Map(igInsights.map((r) => [r['Media ID'], r]))
  const reel = new Map(reels.map((r) => [r['Reel ID'], r]))

  const linkedin: SocialPost[] = li.map((r) => {
    const engagements = num(r['Click Count']) + num(r['Like Count']) + num(r['Comment Count']) + num(r['Share Count'])
    return {
      date: isoOf(r.Date), text: snippet(r.Message), format: r['Media Category'] || 'Post',
      url: r['Post ID'] ? `https://www.linkedin.com/feed/update/${r['Post ID']}` : '',
      impressions: num(r['Impression Count']), engagements, rate: num(r.Engagement),
    }
  })
  const facebook: SocialPost[] = fb.map((r) => {
    const engagements = num(r['Total Reactions']) + num(r.Comments) + num(r.Shares)
    const impressions = num(r.Impressions)
    return { date: isoOf(r['Created Time']), text: snippet(r.Message), format: r.Type || 'post', url: r['Post URL'] || '', impressions, engagements, rate: impressions ? engagements / impressions : 0 }
  })
  const instagram: SocialPost[] = ig.map((r) => {
    const i = insight.get(r['Media ID'])
    const rl = reel.get(r['Media ID'])
    // Reels report reach in "Reels Insights"; images and carousels in "Media Insights"
    const reach = rl ? num(rl.Reach) : num(i?.Reach)
    const engagements = rl
      ? num(rl.Likes) + num(rl.Comments) + num(rl.Saved) + num(rl.Shares)
      : i ? num(i.Engagement) : num(r['Like Count']) + num(r['Comments Count'])
    return { date: isoOf(r.Timestamp), text: snippet(r.Caption), format: r['Media Type'] || 'POST', url: r.Permalink || '', impressions: reach, engagements, rate: reach ? engagements / reach : 0 }
  })
  return {
    linkedin,
    facebook,
    instagram,
    linkedinFollowers: liFollowers.map((r) => ({ date: isoOf(r.Date), gained: num(r['Total Followers']) })),
    instagramFollowers: igProfile[0] ? num(igProfile[0].Followers) : null,
  }
}, ['internal-insights-social', 's3'], { revalidate: 6 * 60 * 60, tags: ['internal-insights'] })

function channel(name: SocialChannel['name'], cur: SocialPost[], prev: SocialPost[], followers: number | null, followersLabel: string, impressionsLabel: string): SocialChannel {
  const sum = (xs: SocialPost[], f: (x: SocialPost) => number) => xs.reduce((n, x) => n + f(x), 0)
  const formats = new Map<string, SocialPost[]>()
  cur.forEach((p) => formats.set(p.format, [...(formats.get(p.format) || []), p]))
  return {
    name,
    posts: cur.length,
    impressions: sum(cur, (x) => x.impressions),
    engagements: sum(cur, (x) => x.engagements),
    prevPosts: prev.length,
    prevImpressions: sum(prev, (x) => x.impressions),
    prevEngagements: sum(prev, (x) => x.engagements),
    followers,
    followersLabel,
    impressionsLabel,
    top: [...cur].sort((a, b) => b.engagements - a.engagements).slice(0, 5),
    byFormat: [...formats.entries()]
      .map(([format, xs]) => ({ format, posts: xs.length, engagementsPerPost: sum(xs, (x) => x.engagements) / xs.length }))
      .sort((a, b) => b.engagementsPerPost - a.engagementsPerPost),
  }
}

async function build(range: RangeKey): Promise<ContentDashboard> {
  const p = periods(range)
  const [web, prevWeb, ebookDocs, docs, socialData] = await Promise.all([
    website(p.start, p.end),
    website(p.prevStart, p.prevEnd),
    client.fetch<{ title: string; slug: string; viewUrl?: string }[]>(`*[_type == "ebook" && defined(slug.current)]{title, "slug": slug.current, viewUrl}`),
    client.fetch<SanityDoc[]>(`*[_type in ["blogPost", "caseStudy"] && defined(slug.current)]{_type, title, "slug": slug.current, publishedAt, "author": author->name, language}`),
    getSocialData(),
  ])
  const within = (d: string, s: string, e: string) => !!d && d >= s && d <= e
  const postsIn = (xs: SocialPost[], s: string, e: string) => xs.filter((x) => within(x.date, s, e))

  const docByPath = new Map(docs.map((d) => [`/${d._type === 'caseStudy' ? 'case-studies' : 'blog'}/${d.slug}`, d]))
  const pages: ContentPage[] = [...web.byPath.entries()].map(([path, x]) => {
    const d = docByPath.get(path)
    return {
      path,
      title: d?.title || path.split('/').pop()!.replace(/-/g, ' '),
      type: typeOf(path),
      readers: x.readers,
      readSeconds: x.sessions ? x.seconds / x.sessions : 0,
      leads: x.leads,
      publishedAt: d?.publishedAt?.slice(0, 10) || '',
      author: d?.author || '',
    }
  })
  const top = (t: ContentPage['type']) => pages.filter((x) => x.type === t).sort((a, b) => b.readers - a.readers).slice(0, 15)

  const inPeriod = (d: string | undefined, s: string, e: string) => !!d && d.slice(0, 10) >= s && d.slice(0, 10) <= e
  const english = (d: SanityDoc) => !d.language || d.language === 'en'
  const publishedDocs = (s: string, e: string) => docs.filter((d) => english(d) && inPeriod(d.publishedAt, s, e))
  const published = publishedDocs(p.start, p.end)
    .map((d) => ({ title: d.title, type: (d._type === 'caseStudy' ? 'Case study' : 'Blog') as ContentPage['type'], author: d.author || '', publishedAt: d.publishedAt.slice(0, 10), path: `/${d._type === 'caseStudy' ? 'case-studies' : 'blog'}/${d.slug}` }))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

  // Ebook forms: the website's ebooks (by their Zoho form) plus other download forms (Japan whitepapers, playbooks)
  const ebookByForm = new Map(ebookDocs.filter((e) => e.viewUrl).map((e) => [formOf(e.viewUrl!), e]))
  const isEbookForm = (f: string) => ebookByForm.has(f) || (EBOOK_FORM.test(f) && !NOT_EBOOK_FORM.test(f))
  const ebookRows = new Map<string, EbookRow>()
  for (const [period, forms] of [['cur', web.forms], ['prev', prevWeb.forms]] as const) {
    for (const [form, x] of forms) {
      if (!isEbookForm(form)) continue
      const doc = ebookByForm.get(form)
      const name = doc?.title || FORM_NAMES[form] || form.replace(/([a-z])([A-Z0-9])/g, '$1 $2')
      const row = ebookRows.get(name) || ebookRows.set(name, { name, path: doc ? `/ebooks/${doc.slug}` : '', opened: 0, downloaded: 0, prevOpened: 0, prevDownloaded: 0 }).get(name)!
      if (period === 'cur') { row.opened += x.opened; row.downloaded += x.downloaded } else { row.prevOpened += x.opened; row.prevDownloaded += x.downloaded }
    }
  }
  if (web.legacyDownloads || prevWeb.legacyDownloads) {
    ebookRows.set('legacy', { name: 'Older download events (removed Oct 2026)', path: '', opened: 0, downloaded: web.legacyDownloads, prevOpened: 0, prevDownloaded: prevWeb.legacyDownloads })
  }
  const ebooks = [...ebookRows.values()].sort((a, b) => b.opened - a.opened || b.downloaded - a.downloaded || b.prevOpened - a.prevOpened)
  const ebookTotal = (k: 'opened' | 'downloaded' | 'prevOpened' | 'prevDownloaded') => ebooks.reduce((n, e) => n + e[k], 0)

  const current: ContentTotals = { readers: web.readers, botReaders: web.botReaders, leads: web.leads, published: published.length, ebookOpens: ebookTotal('opened'), ebookDownloads: ebookTotal('downloaded') }
  const previous: ContentTotals = { readers: prevWeb.readers, botReaders: prevWeb.botReaders, leads: prevWeb.leads, published: publishedDocs(p.prevStart, p.prevEnd).length, ebookOpens: ebookTotal('prevOpened'), ebookDownloads: ebookTotal('prevDownloaded') }

  const socialChannels: SocialChannel[] = [
    channel('LinkedIn', postsIn(socialData.linkedin, p.start, p.end), postsIn(socialData.linkedin, p.prevStart, p.prevEnd), socialData.linkedinFollowers.filter((r) => within(r.date, p.start, p.end)).reduce((n, r) => n + r.gained, 0), 'new followers', 'impressions'),
    channel('Facebook', postsIn(socialData.facebook, p.start, p.end), postsIn(socialData.facebook, p.prevStart, p.prevEnd), null, '', 'impressions'),
    channel('Instagram', postsIn(socialData.instagram, p.start, p.end), postsIn(socialData.instagram, p.prevStart, p.prevEnd), socialData.instagramFollowers, 'followers', 'reach'),
  ]

  const channels = [...web.channels.entries()]
    .map(([ch, v]) => ({ channel: ch, ...v }))
    .sort((a, b) => b.blog + b.caseStudy - (a.blog + a.caseStudy))

  // ---- Findings ----
  const working: ContentDashboard['working'] = []
  const notWorking: ContentDashboard['notWorking'] = []
  const all = [...pages].sort((a, b) => b.readers - a.readers)
  if (previous.readers && current.readers > previous.readers) working.push({ title: `Content readers up: ${nf(current.readers)} vs ${nf(previous.readers)}`, detail: 'Blogs and case studies together.' })
  else if (previous.readers && current.readers < previous.readers * 0.9) notWorking.push({ title: `Content readers down: ${nf(current.readers)} vs ${nf(previous.readers)}`, detail: 'Blogs and case studies together.' })
  if (all[0]) working.push({ title: `Most read: ${all[0].title}`, detail: `${nf(all[0].readers)} readers, ${Math.round(all[0].readSeconds)}s average visit time.` })
  const converting = pages.filter((x) => x.leads > 0).sort((a, b) => b.leads - a.leads)
  if (converting.length) working.push({ title: `${current.leads} enquir${current.leads === 1 ? 'y' : 'ies'} started on content`, detail: converting.slice(0, 3).map((x) => `${x.title} (${x.leads})`).join('; ') + '.' })
  const bestSocial = socialChannels.flatMap((c) => c.top.slice(0, 1).map((t) => ({ c, t }))).sort((a, b) => b.t.engagements - a.t.engagements)[0]
  if (bestSocial && bestSocial.t.engagements > 0) working.push({ title: `Top social post (${bestSocial.c.name}): ${nf(bestSocial.t.engagements)} engagements`, detail: `“${bestSocial.t.text.slice(0, 90)}…”` })

  const noLeads = all.filter((x) => x.readers >= 50 && x.leads === 0).slice(0, 3)
  if (noLeads.length) notWorking.push({ title: `Popular content with no enquiries: ${noLeads.length} page${noLeads.length > 1 ? 's' : ''}`, detail: noLeads.map((x) => `${x.title} (${nf(x.readers)} readers)`).join('; ') + '.' })
  if (!published.length) notWorking.push({ title: 'No new blogs or case studies published', detail: 'Nothing was published on the website in this period.' })
  for (const c of socialChannels) {
    if (c.prevEngagements >= 20 && c.engagements < c.prevEngagements * 0.7) notWorking.push({ title: `${c.name} engagement down: ${nf(c.engagements)} vs ${nf(c.prevEngagements)}`, detail: `${c.posts} posts this period vs ${c.prevPosts} before.` })
  }

  // ---- Actions ----
  const actions: ContentDashboard['actions'] = []
  for (const x of noLeads.slice(0, 2)) {
    actions.push({ id: actionId(['content', 'cta', x.path]), priority: 'Medium', category: 'Calls to action', title: `Add a clear enquiry CTA to “${x.title}”`, detail: `${nf(x.readers)} readers but no enquiries. Add an inline “Talk to us” block with the regional form near the top and end of the page.`, page: x.path })
  }
  for (const c of socialChannels) {
    const [best, ...rest] = c.byFormat.filter((f) => f.posts >= 2)
    const avgRest = rest.length ? rest.reduce((n, f) => n + f.engagementsPerPost, 0) / rest.length : 0
    if (best && avgRest && best.engagementsPerPost >= avgRest * 1.5) {
      actions.push({ id: actionId(['content', 'format', c.name, best.format]), priority: 'Low', category: 'Social', title: `Post more ${best.format.toLowerCase().replace(/_/g, ' ')} content on ${c.name}`, detail: `${best.format.toLowerCase().replace(/_/g, ' ')} posts averaged ${nf(best.engagementsPerPost)} engagements vs ${nf(avgRest)} for other formats.` })
    }
  }
  if (!published.length) actions.push({ id: actionId(['content', 'publish', range]), priority: 'Medium', category: 'Publishing', title: 'Publish new blogs or case studies', detail: 'Nothing new went live in this period; aim for a steady weekly cadence.' })

  return {
    generatedAt: new Date().toISOString(),
    range,
    current,
    previous,
    blogs: top('Blog'),
    caseStudies: top('Case study'),
    channels,
    published,
    ebooks,
    social: socialChannels,
    working: working.slice(0, 6),
    notWorking: notWorking.slice(0, 6),
    actions,
  }
}

// Bump when the calculation changes so cached results are rebuilt
const CACHE_VERSION = 'k6'

export const getContentDashboard = (range: RangeKey) =>
  unstable_cache(() => build(range), ['internal-insights-content', CACHE_VERSION, range], { revalidate: 6 * 60 * 60, tags: ['internal-insights'] })()

