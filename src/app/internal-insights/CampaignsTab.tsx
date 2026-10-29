'use client'

// Email campaign performance tab: data from the marketing team's Zoho Analytics report + GA4.
import type { CampaignDashboard, CampaignRow, CampaignTotals } from '@/lib/insights/campaigns'
import { ActionList, Delta, Details, FindingList, Kpi, TH, THR, fmtDate, nf, pct, type StatusMap } from './ui'

const ISSUE_STYLE: Record<string, string> = {
  'High bounce rate': 'bg-red-100 text-red-800',
  'Low open rate': 'bg-amber-100 text-amber-800',
  'Market not mapped': 'bg-gray-100 text-gray-700',
  'Performing normally': 'bg-emerald-100 text-emerald-800',
}

const COLUMNS: { key: keyof CampaignTotals; label: string; fmt: (n: number) => string; lowerIsBetter?: boolean }[] = [
  { key: 'campaigns', label: 'Campaigns', fmt: nf },
  { key: 'sent', label: 'Sent', fmt: nf },
  { key: 'delivered', label: 'Delivered', fmt: nf },
  { key: 'openRate', label: 'Open', fmt: (n) => pct(n) },
  { key: 'clickRate', label: 'Click', fmt: (n) => pct(n, 2) },
  { key: 'ctor', label: 'Click-to-open', fmt: (n) => pct(n) },
  { key: 'bounceRate', label: 'Bounce', fmt: (n) => pct(n), lowerIsBetter: true },
  { key: 'visits', label: 'Visitors', fmt: nf },
  { key: 'leads', label: 'Leads', fmt: nf },
]

function CampaignTable({ rows }: { rows: CampaignRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
          <tr>
            <th scope="col" className={TH}>Campaign</th>
            <th scope="col" className={TH}>Market</th>
            <th scope="col" className={THR}>Sent</th>
            <th scope="col" className={THR}>Open</th>
            <th scope="col" className={THR}>Click</th>
            <th scope="col" className={THR}>CTOR</th>
            <th scope="col" className={THR}>Bounce</th>
            <th scope="col" className={THR}>Visits</th>
            <th scope="col" className={THR}>Leads</th>
            <th scope="col" className={TH}>Feedback</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 align-top">
          {rows.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="px-3 py-2.5 min-w-[220px]">
                <span className="font-semibold text-gray-900">{c.name}</span>
                <div className="text-xs text-gray-400">{fmtDate(c.sentAt)}</div>
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap">
                {c.market}
                <div className="text-xs text-gray-400">{c.owner}</div>
              </td>
              <td className="px-3 py-2.5 text-right">{nf(c.sent)}</td>
              <td className="px-3 py-2.5 text-right">{pct(c.openRate)}</td>
              <td className="px-3 py-2.5 text-right">{pct(c.clickRate, 2)}</td>
              <td className="px-3 py-2.5 text-right">{pct(c.ctor)}</td>
              <td className={`px-3 py-2.5 text-right ${c.issue === 'High bounce rate' ? 'font-semibold text-red-700' : ''}`}>{pct(c.bounceRate)}</td>
              <td className="px-3 py-2.5 text-right">{c.visits ? nf(c.visits) : '–'}</td>
              <td className="px-3 py-2.5 text-right">{c.leads || '–'}</td>
              <td className="px-3 py-2.5 min-w-[220px]">
                {c.issue && <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${ISSUE_STYLE[c.issue] || 'bg-slate-100 text-slate-700'}`}>{c.issue}</span>}
                {c.suggestion && c.issue !== 'Performing normally' && <p className="text-xs text-gray-500 mt-1">{c.suggestion}</p>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function CampaignsTab({ data, statuses }: { data: CampaignDashboard; statuses: StatusMap }) {
  const c = data.current
  const p = data.previous
  const totalRow = { market: 'All campaigns', owner: '', ...c }

  return (
    <>
      {c.campaigns === 0 && (
        <p className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          No campaigns were sent in this period. The Zoho report covers campaigns sent from {fmtDate(data.coverage.first)} to {fmtDate(data.coverage.last)}; try a longer date range.
        </p>
      )}

      {/* Headline numbers */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6" aria-label="Headline numbers for email campaigns">
        <Kpi label="Campaigns sent" value={nf(c.campaigns)} cur={c.campaigns} prev={p.campaigns} note={`${nf(c.sent)} emails`}
          info="Email campaigns sent from Zoho Campaigns in this period, and the total number of emails they sent." />
        <Kpi label="Emails delivered" value={nf(c.delivered)} cur={c.delivered} prev={p.delivered} note="estimated"
          info="Emails sent minus bounced emails: the ones that reached an inbox. Zoho's estimate." />
        <Kpi label="Website visitors" value={nf(c.visits)} cur={c.visits} prev={p.visits} note="from email"
          info="People who came to movingwalls.com from an email in this period (Google Analytics Email channel, counted per day). Includes visits from older newsletters." />
        <Kpi label="Leads from website" value={nf(c.leads)} cur={c.leads} prev={p.leads} note="from email"
          info="Website form submissions (enquiries) by visitors who arrived from an email in this period." />
        <Kpi label="Open rate" value={pct(c.openRate)} cur={c.openRate} prev={p.openRate} points note={`${nf(c.opens)} opened`}
          info="Share of delivered emails that were opened (unique opens ÷ delivered)." />
        <Kpi label="Click rate" value={pct(c.clickRate, 2)} cur={c.clickRate} prev={p.clickRate} points note={`${nf(c.clicks)} clicked`}
          info="Share of delivered emails where someone clicked a link (unique clicks ÷ delivered)." />
        <Kpi label="Bounce rate" value={pct(c.bounceRate)} cur={c.bounceRate} prev={p.bounceRate} points lowerIsBetter note={`${nf(c.bounces)} bounced`}
          info="Share of sent emails that could not be delivered (bounces ÷ sent). Lower is better; above 5% means the contact list needs cleaning." />
        <Kpi label="Click-to-open" value={pct(c.ctor)} cur={c.ctor} prev={p.ctor} points
          info="Of the people who opened, the share who clicked (unique clicks ÷ unique opens). Shows how engaging the email content is." />
      </section>

      {/* By market */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[#062068] mb-3">By market</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th scope="col" className={TH}>Market</th>
                {COLUMNS.map((col) => <th key={col.key} scope="col" className={THR}>{col.label}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.markets.map((m) => (
                <tr key={m.market} className="hover:bg-gray-50">
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <span className={`font-semibold ${m.market === 'Unmapped' ? 'text-gray-500 italic' : 'text-gray-900'}`}>{m.market}</span>
                    {m.owner && m.market !== 'Unmapped' && <div className="text-xs text-gray-400">{m.owner}</div>}
                  </td>
                  {COLUMNS.map((col) => (
                    <td key={col.key} className={`px-3 py-2.5 text-right whitespace-nowrap ${col.key === 'bounceRate' && m.bounceRate >= 0.06 ? 'font-semibold text-red-700' : ''}`}>
                      {/* A market with no sends this period can still have visitors from an earlier newsletter */}
                      {m.campaigns === 0 && col.key !== 'visits' && col.key !== 'leads' ? <span className="text-gray-400">–</span> : col.fmt(m[col.key])}
                    </td>
                  ))}
                </tr>
              ))}
              {(data.unmatched.visits > 0 || data.unmatched.leads > 0) && (
                <tr>
                  <td className="px-3 py-2.5 text-gray-500 italic whitespace-nowrap">Not matched to a campaign</td>
                  {COLUMNS.map((col) => (
                    <td key={col.key} className="px-3 py-2.5 text-right text-gray-500">
                      {col.key === 'visits' ? nf(data.unmatched.visits) : col.key === 'leads' ? nf(data.unmatched.leads) : ''}
                    </td>
                  ))}
                </tr>
              )}
              {data.markets.length > 0 && (
                <tr className="bg-gray-50 font-semibold">
                  <td className="px-3 py-2.5">{totalRow.market}</td>
                  {COLUMNS.map((col) => (
                    <td key={col.key} className="px-3 py-2.5 text-right whitespace-nowrap">
                      {col.fmt(c[col.key])} {p.campaigns > 0 && col.key !== 'campaigns' && <Delta cur={c[col.key]} prev={p[col.key]} lowerIsBetter={col.lowerIsBetter} points={/Rate|ctor/.test(col.key)} />}
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* What's going well / What needs attention */}
      <section className="grid md:grid-cols-2 gap-4 mb-8">
        <FindingList title="✓ What's going well" items={data.working} tone="good" />
        <FindingList title="⚠ What needs attention" items={data.notWorking} tone="bad" />
      </section>

      {/* Actions */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 mb-8">
        <h2 className="text-lg font-bold text-[#062068]">→ Action items</h2>
        <p className="text-sm text-gray-500 mb-4">Based on the issue flags in the Zoho report and website results from Google Analytics.</p>
        <ActionList actions={data.actions} initial={statuses} />
      </section>

      <h2 className="text-lg font-bold text-[#062068] mb-3">Details</h2>
      <Details title="All campaigns" summary={`${data.campaigns.length} campaigns sent in this period, newest first, with the Zoho report's feedback`}>
        {data.campaigns.length ? <CampaignTable rows={data.campaigns} /> : <p className="text-sm text-gray-500">No campaigns in this period.</p>}
      </Details>
      <Details title="Email traffic in Google Analytics" summary="Website visitors from the Email channel, by utm_campaign, and which Zoho campaign each was matched to">
        {data.emailTraffic.length === 0 ? (
          <p className="text-sm text-gray-500">No email traffic recorded in this period.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr><th scope="col" className={TH}>utm_campaign</th><th scope="col" className={TH}>Source / medium</th><th scope="col" className={THR}>Visitors</th><th scope="col" className={THR}>Leads</th><th scope="col" className={TH}>Matched campaign</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.emailTraffic.map((t) => (
                  <tr key={`${t.campaign}|${t.source}|${t.medium}`}>
                    <td className="px-3 py-2 font-mono text-xs text-gray-700">{t.campaign}</td>
                    <td className="px-3 py-2 text-xs text-gray-500">{t.source} / {t.medium}</td>
                    <td className="px-3 py-2 text-right">{nf(t.visitors)}</td>
                    <td className="px-3 py-2 text-right">{t.leads || '–'}</td>
                    <td className={`px-3 py-2 text-xs ${t.matched ? 'text-gray-900' : 'text-gray-400 italic'}`}>{t.matched || (t.beforeReport ? 'older newsletter (before the Zoho report)' : 'not matched')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Details>

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-900 mb-2">How the numbers work</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
          <li><strong>Source:</strong> the campaign list behind the marketing team&apos;s Zoho Analytics report &ldquo;Marketing Command Center - MW&rdquo;: {data.coverage.total} campaigns sent {fmtDate(data.coverage.first)} – {fmtDate(data.coverage.last)}.</li>
          <li><strong>Markets, owners and issue flags</strong> follow the same rules as that report: market from the campaign name; high bounce above 5% (high priority above 10%); low open rate below 10%; no market keyword = &ldquo;Market not mapped&rdquo;.</li>
          <li><strong>Rates</strong> use unique opens and clicks: open rate = opens ÷ delivered, click rate = clicks ÷ delivered, click-to-open = clicks ÷ opens, bounce rate = bounces ÷ sent. Totals are calculated from the summed counts, so they can differ slightly from an average of percentages.</li>
          <li><strong>Delivered</strong> is Zoho&apos;s estimate (sent minus bounces).</li>
          <li><strong>A campaign counts in a period</strong> when it was sent in that period.</li>
          <li><strong>Website visitors and leads</strong> are all Google Analytics traffic in the &ldquo;Email&rdquo; channel during the period, the same as the Zoho &ldquo;04 Channel Performance&rdquo; tab: visitors are counted per day and added up; leads are form submissions (generate_lead). Each visit is credited to the campaign in its utm_campaign, whenever that campaign was sent, so a market can show visitors from an earlier newsletter.</li>
          <li>Zoho Analytics syncs from Zoho Campaigns on its own schedule; this tab refreshes every 6 hours · last refreshed {new Date(data.generatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}.</li>
        </ul>
      </section>
    </>
  )
}
