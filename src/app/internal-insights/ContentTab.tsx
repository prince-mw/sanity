'use client'

// Content effectiveness tab: website content (GA4 + Sanity) and LinkedIn / Facebook / Instagram (Zoho Analytics).
import type { ContentDashboard, ContentPage, SocialChannel } from '@/lib/insights/content'
import { ActionList, Delta, Details, FindingList, Kpi, TH, THR, fmtDate, nf, pct, type StatusMap } from './ui'

const secs = (s: number) => (s >= 60 ? `${Math.floor(s / 60)}m ${String(Math.round(s % 60)).padStart(2, '0')}s` : `${Math.round(s)}s`)
const fmtFormat = (f: string) => (/^none$/i.test(f) ? 'text only' : f.toLowerCase().replace(/_/g, ' '))

function PageTable({ rows }: { rows: ContentPage[] }) {
  if (!rows.length) return <p className="text-sm text-gray-500">No readers in this period.</p>
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
          <tr>
            <th scope="col" className={TH}>Title</th>
            <th scope="col" className={THR}>Readers</th>
            <th scope="col" className={THR}>Avg visit time</th>
            <th scope="col" className={THR}>Enquiries</th>
            <th scope="col" className={TH}>Published</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 align-top">
          {rows.map((r) => (
            <tr key={r.path} className="hover:bg-gray-50">
              <td className="px-3 py-2.5 min-w-[260px]">
                <a href={r.path} target="_blank" rel="noreferrer" className="font-semibold text-gray-900 hover:text-mw-blue-600">{r.title}</a>
                {r.author && <div className="text-xs text-gray-400">{r.author}</div>}
              </td>
              <td className="px-3 py-2.5 text-right">{nf(r.readers)}</td>
              <td className="px-3 py-2.5 text-right whitespace-nowrap">{secs(r.readSeconds)}</td>
              <td className={`px-3 py-2.5 text-right ${r.leads ? 'font-semibold text-emerald-700' : 'text-gray-400'}`}>{r.leads || '–'}</td>
              <td className="px-3 py-2.5 whitespace-nowrap text-xs text-gray-500">{r.publishedAt ? fmtDate(r.publishedAt) : '–'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Each network's own brand colour marks its card (identity only; numbers stay in text colours)
const SOCIAL_STYLE: Record<SocialChannel['name'], { accent: string; badge: string; icon: React.ReactNode }> = {
  LinkedIn: {
    accent: '#0A66C2',
    badge: 'bg-[#0A66C2]',
    icon: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.06c.53-1 1.84-2.06 3.78-2.06 4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4V9.5Z" />,
  },
  Facebook: {
    accent: '#1877F2',
    badge: 'bg-[#1877F2]',
    icon: <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63A21 21 0 0 0 14.25 4.5c-2.25 0-3.79 1.37-3.79 3.9v2.16H7.92v2.94h2.54V21h3.04Z" />,
  },
  Instagram: {
    accent: '#D62976',
    badge: 'bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5]',
    icon: <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.75a3.05 3.05 0 1 1 0-6.1 3.05 3.05 0 0 1 0 6.1Zm4.9-8.95a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 4.6c2.4 0 2.69 0 3.64.05 2.44.11 3.58 1.27 3.69 3.69.05.95.05 1.23.05 3.64s0 2.69-.05 3.64c-.11 2.42-1.25 3.58-3.69 3.69-.95.05-1.23.05-3.64.05s-2.69 0-3.64-.05c-2.45-.11-3.58-1.27-3.69-3.69C4.62 14.69 4.6 14.4 4.6 12s0-2.69.05-3.64c.11-2.42 1.25-3.58 3.69-3.69.95-.05 1.24-.05 3.66-.05ZM12 3c-2.44 0-2.75 0-3.71.05-3.27.15-5.09 1.96-5.24 5.24C3 9.25 3 9.56 3 12s0 2.75.05 3.71c.15 3.27 1.96 5.09 5.24 5.24.96.05 1.27.05 3.71.05s2.75 0 3.71-.05c3.27-.15 5.09-1.96 5.24-5.24.05-.96.05-1.27.05-3.71s0-2.75-.05-3.71c-.15-3.27-1.96-5.09-5.24-5.24C14.75 3 14.44 3 12 3Z" />,
  },
}

function SocialStat({ label, value, cur, prev }: { label: string; value: number; cur: number; prev: number }) {
  return (
    <div className="rounded-xl bg-gray-50 px-3 py-2.5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 capitalize">{label}</p>
      <p className="mt-0.5 text-xl font-bold text-[#062068]">{nf(value)}</p>
      <Delta cur={cur} prev={prev} />
    </div>
  )
}

function SocialCard({ c }: { c: SocialChannel }) {
  const st = SOCIAL_STYLE[c.name]
  const rateLabel = c.name === 'LinkedIn' ? 'engagement rate' : c.name === 'Instagram' ? 'of reach' : 'of impressions'
  const rate = c.impressions ? c.engagements / c.impressions : 0
  const maxFormat = Math.max(1, ...c.byFormat.map((f) => f.engagementsPerPost))
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden flex flex-col">
      <div className="h-1.5" style={{ background: st.accent }} />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${st.badge}`}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">{st.icon}</svg>
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-[#062068] leading-tight">{c.name}</h3>
            <p className="text-xs text-gray-500">
              {c.followers !== null ? <>{nf(c.followers)} {c.followersLabel}</> : 'Page posts'}
              {rate > 0 && <> · <b className="text-gray-700">{pct(rate, 1)}</b> {rateLabel}</>}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-5">
          <SocialStat label="Posts" value={c.posts} cur={c.posts} prev={c.prevPosts} />
          <SocialStat label={c.impressionsLabel} value={c.impressions} cur={c.impressions} prev={c.prevImpressions} />
          <SocialStat label="Engagements" value={c.engagements} cur={c.engagements} prev={c.prevEngagements} />
        </div>

        {c.byFormat.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Engagements per post, by format</p>
            <ul className="space-y-2 text-sm">
              {c.byFormat.map((f) => (
                <li key={f.format} title={`${fmtFormat(f.format)}: ${nf(f.engagementsPerPost)} engagements per post across ${f.posts} posts`}>
                  <div className="flex justify-between gap-2 mb-0.5">
                    <span className="capitalize text-gray-700">{fmtFormat(f.format)} <span className="text-xs text-gray-400 normal-case">{f.posts} post{f.posts === 1 ? '' : 's'}</span></span>
                    <span className="font-semibold text-gray-900">{nf(f.engagementsPerPost)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-2 rounded-full" style={{ width: `${Math.max(2, (f.engagementsPerPost / maxFormat) * 100)}%`, background: st.accent }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Top posts</p>
        {c.top.length === 0 ? (
          <p className="text-sm text-gray-500">No posts in this period.</p>
        ) : (
          <ol className="space-y-2.5">
            {c.top.map((t, i) => (
              <li key={`${t.date}-${i}`} className="flex gap-3 rounded-xl border border-gray-100 p-3 hover:border-gray-200 hover:bg-gray-50 transition-colors">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: st.accent }}>{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-sm text-gray-800 leading-snug line-clamp-3">{t.url ? <a href={t.url} target="_blank" rel="noreferrer" className="hover:text-mw-blue-600">{t.text || '(no text)'}</a> : t.text || '(no text)'}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px]">
                    {t.date && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">{fmtDate(t.date)}</span>}
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 capitalize">{fmtFormat(t.format)}</span>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-800 font-semibold">{nf(t.engagements)} engagements</span>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">{nf(t.impressions)} {c.impressionsLabel}</span>
                    {t.rate > 0 && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">{pct(t.rate)} {rateLabel}</span>}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}

export default function ContentTab({ data, statuses }: { data: ContentDashboard; statuses: StatusMap }) {
  const c = data.current
  const p = data.previous
  const li = data.social.find((s) => s.name === 'LinkedIn')!
  const fb = data.social.find((s) => s.name === 'Facebook')!
  const ig = data.social.find((s) => s.name === 'Instagram')!
  const socialEng = data.social.reduce((n, s) => n + s.engagements, 0)
  const prevSocialEng = data.social.reduce((n, s) => n + s.prevEngagements, 0)

  return (
    <>
      {/* Headline numbers */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6" aria-label="Headline numbers for content">
        <Kpi label="Content readers" value={nf(c.readers)} cur={c.readers} prev={p.readers} note={c.botReaders ? `${nf(c.botReaders)} bot visits removed` : 'blogs + case studies'}
          info="People who read a blog or case study on movingwalls.com in this period (Google Analytics users, added up per page). Bot bursts from data-centre cities are removed, as on the Location pages tab." />
        <Kpi label="Enquiries from content" value={nf(c.leads)} cur={c.leads} prev={p.leads}
          info="Website form submissions in visits that started on a blog or case study." />
        <Kpi label="Content published" value={nf(c.published)} cur={c.published} prev={p.published} note="blogs + case studies"
          info="New English blogs and case studies published on the website in this period (from the Sanity CMS)." />
        <Kpi label="Ebook forms opened" value={nf(c.ebookOpens)} cur={c.ebookOpens} prev={p.ebookOpens} note={`${nf(c.ebookDownloads)} downloaded`}
          info="How many times an ebook or whitepaper download form was opened, and how many were submitted (downloaded). Downloads count only for forms that show Zoho's thank-you page after submitting." />
        <Kpi label="LinkedIn impressions" value={nf(li.impressions)} cur={li.impressions} prev={li.prevImpressions} note={`${li.posts} posts`}
          info="How many times LinkedIn company page posts published in this period were seen." />
        <Kpi label="Facebook impressions" value={nf(fb.impressions)} cur={fb.impressions} prev={fb.prevImpressions} note={`${fb.posts} posts`}
          info="How many times Facebook page posts published in this period were seen." />
        <Kpi label="Instagram reach" value={nf(ig.impressions)} cur={ig.impressions} prev={ig.prevImpressions} note={`${ig.posts} posts`}
          info="How many accounts saw Instagram posts published in this period." />
        <Kpi label="Social engagements" value={nf(socialEng)} cur={socialEng} prev={prevSocialEng} note="all 3 channels"
          info="Likes/reactions, comments, shares and clicks (LinkedIn), saves (Instagram) on posts published in this period, across LinkedIn, Facebook and Instagram." />
      </section>

      <section className="grid md:grid-cols-2 gap-4 mb-8">
        <FindingList title="✓ What's going well" items={data.working} tone="good" />
        <FindingList title="⚠ What needs attention" items={data.notWorking} tone="bad" />
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 mb-8">
        <h2 className="text-lg font-bold text-[#062068]">→ Action items</h2>
        <p className="text-sm text-gray-500 mb-4">Based on readers, enquiries and social engagement in this period.</p>
        <ActionList actions={data.actions} initial={statuses} />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-[#062068] mb-3">Top blogs</h2>
        <PageTable rows={data.blogs} />
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[#062068] mb-3">Top case studies</h2>
        <PageTable rows={data.caseStudies} />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-[#062068] mb-1">Social media</h2>
        <p className="text-sm text-gray-500 mb-3">Posts published in this period on each company page, with their reach and engagement vs the previous period.</p>
        <div className="grid lg:grid-cols-3 gap-4 items-start">
          {data.social.map((s) => <SocialCard key={s.name} c={s} />)}
        </div>
      </section>

      <h2 className="text-lg font-bold text-[#062068] mb-3">Details</h2>
      <Details title="Where readers come from" summary="Readers of blogs and case studies by channel">
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr><th scope="col" className={TH}>Channel</th><th scope="col" className={THR}>Blog readers</th><th scope="col" className={THR}>Case study readers</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.channels.map((ch) => (
                <tr key={ch.channel}><td className="px-3 py-2 text-gray-900">{ch.channel}</td><td className="px-3 py-2 text-right">{nf(ch.blog)}</td><td className="px-3 py-2 text-right">{nf(ch.caseStudy)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Details>
      <Details title="Published in this period" summary={`${data.published.length} new blog${data.published.length === 1 ? '' : 's'} and case studies`}>
        {data.published.length === 0 ? (
          <p className="text-sm text-gray-500">Nothing published in this period.</p>
        ) : (
          <ul className="divide-y divide-gray-100 text-sm">
            {data.published.map((x) => (
              <li key={x.path} className="py-2 flex flex-wrap justify-between gap-2">
                <a href={x.path} target="_blank" rel="noreferrer" className="font-semibold text-gray-900 hover:text-mw-blue-600">{x.title}</a>
                <span className="text-xs text-gray-500">{x.type} · {x.author || 'No author'} · {fmtDate(x.publishedAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </Details>
      <Details title="Ebook downloads" summary="Each ebook's download form: times opened and downloaded, this period vs previous">
        {data.ebooks.length === 0 ? (
          <p className="text-sm text-gray-500">No ebook forms opened in this period.</p>
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                  <tr><th scope="col" className={TH}>Ebook</th><th scope="col" className={THR}>Opened</th><th scope="col" className={THR}>Downloaded</th><th scope="col" className={THR}>Download rate</th><th scope="col" className={THR}>Previous period</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.ebooks.map((e) => (
                    <tr key={e.name} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-900">{e.path ? <a href={e.path} target="_blank" rel="noreferrer" className="hover:text-mw-blue-600">{e.name}</a> : e.name}</td>
                      <td className="px-3 py-2 text-right">{e.opened ? nf(e.opened) : '–'} {e.opened > 0 && <Delta cur={e.opened} prev={e.prevOpened} />}</td>
                      <td className="px-3 py-2 text-right font-semibold">{e.downloaded ? nf(e.downloaded) : '–'}</td>
                      <td className="px-3 py-2 text-right text-gray-600">{e.opened && e.downloaded ? pct(e.downloaded / e.opened) : '–'}</td>
                      <td className="px-3 py-2 text-right text-xs text-gray-500 whitespace-nowrap">{nf(e.prevOpened)} opened · {nf(e.prevDownloaded)} downloaded</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-gray-500">&ldquo;Downloaded&rdquo; needs the ebook&apos;s Zoho form to show Zoho&apos;s thank-you page after submitting (as the Contact Us form does). Forms that go straight to the PDF can&apos;t be counted, so they show &ndash;.</p>
          </>
        )}
      </Details>

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-900 mb-2">How the numbers work</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
          <li><strong>Website content</strong> (readers, visit time, ebook forms) comes live from Google Analytics. Ebook forms are counted from the Zoho form&apos;s own page views (opened) and its thank-you page (downloaded), so no custom download events are needed. Avg visit time = Google Analytics average session duration for visits to that page (Zoho calls it “Dwell Time”).</li>
          <li><strong>Enquiries from content</strong> = form submissions in visits that started on that blog or case study.</li>
          <li><strong>Content published</strong> comes from the website&apos;s Sanity CMS (English versions only, so translations aren&apos;t double-counted).</li>
          <li><strong>Social</strong> comes from the Zoho Analytics LinkedIn, Facebook and Instagram connectors, the same as the &ldquo;05 Content Effectiveness&rdquo; tab. Numbers are for posts published in the period. Instagram uses reach (accounts reached) instead of impressions.</li>
          <li>Refreshes every 6 hours · last refreshed {new Date(data.generatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}.</li>
        </ul>
      </section>
    </>
  )
}
