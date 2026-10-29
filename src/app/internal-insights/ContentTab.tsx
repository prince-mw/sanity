'use client'

// Content effectiveness tab: website content (GA4 + Sanity) and LinkedIn / Facebook / Instagram (Zoho Analytics).
import type { ContentDashboard, ContentPage, SocialChannel } from '@/lib/insights/content'
import { ActionList, Delta, Details, FindingList, Kpi, TH, THR, fmtDate, nf, pct, type StatusMap } from './ui'

const secs = (s: number) => (s >= 60 ? `${Math.floor(s / 60)}m ${String(Math.round(s % 60)).padStart(2, '0')}s` : `${Math.round(s)}s`)
const fmtFormat = (f: string) => f.toLowerCase().replace(/_/g, ' ')

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

function SocialCard({ c }: { c: SocialChannel }) {
  const rateLabel = c.name === 'LinkedIn' ? 'engagement rate' : c.name === 'Instagram' ? 'of reach' : 'of impressions'
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col">
      <h3 className="text-base font-bold text-[#062068] mb-3">{c.name}</h3>
      <dl className="grid grid-cols-2 gap-3 mb-4">
        <div><dt className="text-xs text-gray-500">Posts</dt><dd className="font-semibold text-gray-900">{nf(c.posts)} <Delta cur={c.posts} prev={c.prevPosts} /></dd></div>
        <div><dt className="text-xs text-gray-500 capitalize">{c.impressionsLabel}</dt><dd className="font-semibold text-gray-900">{nf(c.impressions)} <Delta cur={c.impressions} prev={c.prevImpressions} /></dd></div>
        <div><dt className="text-xs text-gray-500">Engagements</dt><dd className="font-semibold text-gray-900">{nf(c.engagements)} <Delta cur={c.engagements} prev={c.prevEngagements} /></dd></div>
        {c.followers !== null && <div><dt className="text-xs text-gray-500 capitalize">{c.followersLabel}</dt><dd className="font-semibold text-gray-900">{nf(c.followers)}</dd></div>}
      </dl>
      {c.byFormat.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Engagements per post by format</p>
          <ul className="space-y-1 text-sm">
            {c.byFormat.map((f) => (
              <li key={f.format} className="flex justify-between gap-2"><span className="capitalize text-gray-700">{fmtFormat(f.format)} <span className="text-gray-400">({f.posts})</span></span><span className="font-semibold">{nf(f.engagementsPerPost)}</span></li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Top posts</p>
      {c.top.length === 0 ? (
        <p className="text-sm text-gray-500">No posts in this period.</p>
      ) : (
        <ol className="space-y-3">
          {c.top.map((t, i) => (
            <li key={`${t.date}-${i}`} className="text-sm">
              <p className="text-gray-800 leading-snug">{t.url ? <a href={t.url} target="_blank" rel="noreferrer" className="hover:text-mw-blue-600">{t.text || '(no text)'}</a> : t.text || '(no text)'}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.date && fmtDate(t.date)} · <span className="capitalize">{fmtFormat(t.format)}</span> · {nf(t.engagements)} engagements · {nf(t.impressions)} {c.impressionsLabel}
                {t.rate > 0 && <> · {pct(t.rate)} {rateLabel}</>}
              </p>
            </li>
          ))}
        </ol>
      )}
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
        <Kpi label="Ebook downloads" value={nf(c.ebookDownloads)} cur={c.ebookDownloads} prev={p.ebookDownloads}
          info="Ebook and whitepaper downloads (Google Analytics download_ events)." />
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
        <h2 className="text-lg font-bold text-[#062068] mb-3">Social media</h2>
        <div className="grid lg:grid-cols-3 gap-4">
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
      <Details title="Ebook downloads" summary="Downloads per ebook, this period vs previous">
        {data.ebooks.length === 0 ? (
          <p className="text-sm text-gray-500">No ebook downloads recorded.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr><th scope="col" className={TH}>Ebook</th><th scope="col" className={THR}>Downloads</th><th scope="col" className={THR}>Previous period</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.ebooks.map((e) => (
                  <tr key={e.name}><td className="px-3 py-2 text-gray-900">{e.name}</td><td className="px-3 py-2 text-right font-semibold">{nf(e.downloads)}</td><td className="px-3 py-2 text-right text-gray-500">{nf(e.prev)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Details>

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-900 mb-2">How the numbers work</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
          <li><strong>Website content</strong> (readers, visit time, ebook downloads) comes live from Google Analytics. Avg visit time = Google Analytics average session duration for visits to that page (Zoho calls it “Dwell Time”).</li>
          <li><strong>Enquiries from content</strong> = form submissions in visits that started on that blog or case study.</li>
          <li><strong>Content published</strong> comes from the website&apos;s Sanity CMS (English versions only, so translations aren&apos;t double-counted).</li>
          <li><strong>Social</strong> comes from the Zoho Analytics LinkedIn, Facebook and Instagram connectors, the same as the &ldquo;05 Content Effectiveness&rdquo; tab. Numbers are for posts published in the period. Instagram uses reach (accounts reached) instead of impressions.</li>
          <li>Refreshes every 6 hours · last refreshed {new Date(data.generatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}.</li>
        </ul>
      </section>
    </>
  )
}
