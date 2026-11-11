import { defineField, defineType } from 'sanity'

// An instant OOH proposal built on the website (/proposals/new). Written only
// by the website's API routes (never edited in the Studio): the public page
// /proposals/<shareId> reads it, the creator's edit page appends versions.
// Contains personal data (the creator): keep Studio access to editors only,
// like leadSubmission. Rif, 11 Nov 2026.
export default defineType({
  name: 'proposal',
  title: 'Proposal (instant, website)',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({ name: 'shareId', type: 'string', description: 'The public URL key: /proposals/<shareId>. Unguessable.' }),
    defineField({ name: 'editTokenHash', type: 'string', description: 'SHA-256 of the creator\'s edit token. The token itself is never stored.' }),
    defineField({ name: 'status', type: 'string', description: 'draft | sent | approved | changes-requested' }),
    defineField({ name: 'titleLine', type: 'string' }),
    defineField({ name: 'creator', type: 'object', fields: [
      { name: 'name', type: 'string' }, { name: 'email', type: 'string' }, { name: 'company', type: 'string' }, { name: 'country', type: 'string' },
    ] }),
    defineField({ name: 'leadId', title: 'Zoho CRM lead id', type: 'string' }),
    defineField({ name: 'crmError', type: 'string' }),
    defineField({ name: 'brief', type: 'object', fields: [
      { name: 'countrySlug', type: 'string' }, { name: 'cities', type: 'array', of: [{ type: 'string' }] }, { name: 'countryWide', type: 'boolean' },
      { name: 'citySlug', type: 'string', description: 'The lead city' }, { name: 'cityName', type: 'string' },
      { name: 'startDate', type: 'date' }, { name: 'durationWeeks', type: 'number' },
      { name: 'objective', type: 'string', description: 'launch | awareness | footfall | event' },
      { name: 'audience', type: 'text' }, { name: 'industry', type: 'string' },
      { name: 'budgetBand', type: 'string', description: 'Sizes the site list only. Never shown to the client.' },
      { name: 'formats', type: 'array', of: [{ type: 'string' }] },
      { name: 'targetSites', type: 'number' },
    ] }),
    defineField({ name: 'currentVersion', type: 'number' }),
    defineField({ name: 'versions', type: 'array', of: [{
      type: 'object', name: 'proposalVersion', fields: [
        { name: 'n', type: 'number' }, { name: 'createdAt', type: 'datetime' },
        { name: 'source', type: 'string', description: 'claude | rules | manual | shortlist' },
        { name: 'summary', type: 'text' },
        { name: 'addons', type: 'array', of: [{ type: 'string' }], description: 'measure | creative | dynamic | weeks-8 | weeks-12' },
        { name: 'sites', type: 'array', of: [{ type: 'object', name: 'proposalSite', fields: [
          { name: 'siteId', type: 'string' }, { name: 'siteName', type: 'string' }, { name: 'reason', type: 'text' }, { name: 'order', type: 'number' }, { name: 'citySlug', type: 'string' },
        ] }] },
      ],
      preview: { select: { n: 'n', source: 'source' }, prepare: ({ n, source }: { n?: number; source?: string }) => ({ title: `v${n ?? '?'}`, subtitle: source }) },
    }] }),
    defineField({ name: 'changeRequests', type: 'array', of: [{ type: 'object', name: 'proposalChangeRequest', fields: [
      { name: 'at', type: 'datetime' }, { name: 'message', type: 'text' },
    ] }] }),
    defineField({ name: 'cityRequests', type: 'array', of: [{ type: 'object', name: 'proposalCityRequest', fields: [
      { name: 'at', type: 'datetime' }, { name: 'citySlug', type: 'string' }, { name: 'by', type: 'string' },
    ] }] }),
    defineField({ name: 'participants', type: 'array', description: 'People other than the creator who acted on the link (the second lead)', of: [{ type: 'object', name: 'proposalParticipant', fields: [
      { name: 'name', type: 'string' }, { name: 'email', type: 'string' }, { name: 'at', type: 'datetime' }, { name: 'action', type: 'string' },
    ] }] }),
    defineField({ name: 'approvedAt', type: 'datetime' }),
    defineField({ name: 'createdAt', type: 'datetime' }),
    defineField({ name: 'updatedAt', type: 'datetime' }),
  ],
  preview: { select: { title: 'titleLine', subtitle: 'status' } },
})
