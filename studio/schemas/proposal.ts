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
        { name: 'addons', type: 'array', of: [{ type: 'string' }], description: 'measure | planner | creative | dynamic | market | weeks-8 | weeks-12' },
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
    defineField({ name: 'shown', type: 'object', description: 'What the client sees: at most 2 options before approval, 2 offers after', fields: [
      { name: 'options', type: 'array', of: [{ type: 'string' }] }, { name: 'postApproval', type: 'array', of: [{ type: 'string' }] },
    ] }),
    defineField({ name: 'derivedFrom', type: 'string', description: 'The shareId this proposal was started from' }),
    defineField({ name: 'creative', type: 'object', description: 'The client\'s creative for the mock-ups: our layout from logo + tagline, or their own file', fields: [
      { name: 'mode', type: 'string', description: 'make | own' },
      { name: 'brand', type: 'string' }, { name: 'tagline', type: 'string' }, { name: 'accent', type: 'string' }, { name: 'template', type: 'string', description: 'band | split | poster' },
      { name: 'logoUrl', type: 'url' },
      { name: 'own', type: 'object', fields: [
        { name: 'url', type: 'url' }, { name: 'kind', type: 'string', description: 'image | video' }, { name: 'width', type: 'number' }, { name: 'height', type: 'number' }, { name: 'name', type: 'string' },
      ] },
      { name: 'fit', type: 'string', description: 'letterbox | fill' },
      { name: 'by', type: 'string', description: 'staff | client' }, { name: 'byName', type: 'string' }, { name: 'at', type: 'datetime' },
      { name: 'screens', type: 'array', description: 'Per-screen changes after approval: the fit on that photo and/or a file just for that screen', of: [{ type: 'object', name: 'proposalScreen', fields: [
        { name: 'siteId', type: 'string' }, { name: 'faceJson', type: 'text', description: 'Corners (and curved edges or the 6-point seam) as JSON, fractions of the photo' },
        { name: 'own', type: 'object', fields: [{ name: 'url', type: 'url' }, { name: 'kind', type: 'string' }, { name: 'width', type: 'number' }, { name: 'height', type: 'number' }, { name: 'name', type: 'string' }] },
        { name: 'fit', type: 'string', description: 'letterbox | fill' },
        { name: 'by', type: 'string' }, { name: 'byName', type: 'string' }, { name: 'at', type: 'datetime' },
      ] }] },
    ] }),
    defineField({ name: 'owner', type: 'object', description: 'The market lead for the country, stamped at creation', fields: [
      { name: 'name', type: 'string' }, { name: 'email', type: 'string' }, { name: 'market', type: 'string' }, { name: 'fallback', type: 'boolean' },
    ] }),
    defineField({ name: 'approvedAt', type: 'datetime' }),
    defineField({ name: 'createdAt', type: 'datetime' }),
    defineField({ name: 'updatedAt', type: 'datetime' }),
  ],
  preview: { select: { title: 'titleLine', subtitle: 'status' } },
})
