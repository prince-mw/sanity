import { defineField, defineType } from 'sanity'

// A website form submission (the site's own lead form, not Zoho Forms).
// Written by /api/leads as the durable copy; the same request creates the
// lead in Zoho CRM. "crmId" is set once the CRM has it, so unsent ones can be
// retried. Contains personal data: keep Studio access to editors only.
export default defineType({
  name: 'leadSubmission',
  title: 'Lead submission (website form)',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({ name: 'submittedAt', type: 'datetime' }),
    defineField({ name: 'purpose', type: 'string', description: 'enquiry | mockup-download | price-unlock' }),
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'company', type: 'string' }),
    defineField({ name: 'country', type: 'string' }),
    defineField({ name: 'message', type: 'text' }),
    defineField({ name: 'siteId', type: 'string' }),
    defineField({ name: 'siteName', type: 'string' }),
    defineField({ name: 'pageUrl', type: 'url' }),
    defineField({ name: 'utm', type: 'object', fields: [
      { name: 'source', type: 'string' }, { name: 'medium', type: 'string' }, { name: 'campaign', type: 'string' },
      { name: 'term', type: 'string' }, { name: 'content', type: 'string' }, { name: 'gclid', type: 'string' },
    ] }),
    defineField({ name: 'mockup', type: 'image', description: 'The clean ad mock-up they downloaded, if any.' }),
    defineField({ name: 'crmId', title: 'Zoho CRM lead id', type: 'string' }),
    defineField({ name: 'crmError', type: 'string' }),
  ],
  preview: { select: { title: 'email', subtitle: 'purpose' } },
})
