// Email campaign performance (Zoho Campaigns). Placeholder until the Zoho API connection is set up.

const COMING = [
  'Campaigns sent, emails delivered, open rate, click rate, click-to-open rate and bounce rate',
  'Results by market and regional owner',
  'Every campaign in one table, with issue flags (high bounce, low opens, market not mapped)',
  'Website visits and leads from each campaign (Google Analytics)',
  'Action items with shared Not started / WIP / Done status',
]

export default function CampaignsTab() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
      <p className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 mb-4">Waiting for Zoho Campaigns connection</p>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Email campaign results will appear here</h2>
      <p className="text-sm text-gray-600 mb-4">Once read-only access to Zoho Campaigns is connected, this tab will show:</p>
      <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
        {COMING.map((c) => <li key={c}>{c}</li>)}
      </ul>
    </section>
  )
}
