import { defineField, defineType } from 'sanity'

// Machine-written copy for one inventory site (a billboard or screen). One
// document per Inventory API site id. A daily job writes these; editors may
// correct any of them in Studio — tick "Locked" so the job keeps the edit.
export default defineType({
  name: 'siteContent',
  title: 'Site Content (inventory)',
  type: 'document',
  fields: [
    defineField({ name: 'siteId', title: 'Inventory site id', type: 'string', validation: Rule => Rule.required(), readOnly: true }),
    defineField({ name: 'siteName', title: 'Site name (for the list)', type: 'string', readOnly: true }),
    defineField({ name: 'locked', title: 'Locked (edited by a person — the job must not overwrite)', type: 'boolean', initialValue: false }),
    defineField({ name: 'hidden', title: 'Hide this copy on the website', type: 'boolean', initialValue: false }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 5, description: '90–140 words. Only facts from the site record and its surroundings.' }),
    defineField({
      name: 'personas', title: 'Who you reach here', type: 'array',
      of: [{
        type: 'object', name: 'persona',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() }),
          defineField({ name: 'icon', title: 'Icon', type: 'string', options: { list: ['commuter', 'shopper', 'tourist', 'office', 'family', 'student', 'nightlife', 'traveller', 'driver', 'resident'] } }),
          defineField({ name: 'who', title: 'Who they are', type: 'string' }),
          defineField({ name: 'when', title: 'When they pass', type: 'string' }),
          defineField({ name: 'why', title: 'Why this site works for them', type: 'string' }),
        ],
        preview: { select: { title: 'name', subtitle: 'who' } },
      }],
    }),
    defineField({
      name: 'faceCorners', title: 'Billboard face on photo 1 (4 corners, 0–1)', type: 'array',
      of: [{ type: 'object', name: 'pt', fields: [{ name: 'x', type: 'number' }, { name: 'y', type: 'number' }] }],
      description: 'Top-left, top-right, bottom-right, bottom-left as fractions of the photo width/height. Used by the ad mock-up.',
      validation: Rule => Rule.max(4),
    }),
    defineField({
      name: 'faceEdges', title: 'Edge midpoints (top, right, bottom, left; 0–1) for curved screens', type: 'array',
      of: [{ type: 'object', name: 'pt', fields: [{ name: 'x', type: 'number' }, { name: 'y', type: 'number' }] }],
      validation: Rule => Rule.max(4),
    }),
    defineField({ name: 'faceKind', title: 'Surface', type: 'string', options: { list: ['led', 'print'] }, description: 'LED/digital screens glow; printed faces catch the light.' }),
    defineField({
      name: 'relatedPosts', title: 'Related articles', type: 'array',
      of: [{
        type: 'object', name: 'relatedPost',
        fields: [
          defineField({ name: 'post', type: 'reference', to: [{ type: 'blogPost' }] }),
          defineField({ name: 'score', type: 'number' }),
          defineField({ name: 'reason', type: 'string' }),
        ],
        preview: { select: { title: 'post.title', subtitle: 'reason' } },
      }],
    }),
    defineField({
      name: 'relatedCaseStudies', title: 'Related case studies', type: 'array',
      of: [{
        type: 'object', name: 'relatedCase',
        fields: [
          defineField({ name: 'caseStudy', type: 'reference', to: [{ type: 'caseStudy' }] }),
          defineField({ name: 'score', type: 'number' }),
          defineField({ name: 'reason', type: 'string' }),
        ],
        preview: { select: { title: 'caseStudy.title', subtitle: 'reason' } },
      }],
    }),
    defineField({
      name: 'sources', title: 'Sources used', type: 'array',
      of: [{ type: 'object', name: 'source', fields: [{ name: 'label', type: 'string' }, { name: 'url', type: 'url' }] }],
    }),
    defineField({ name: 'generatedAt', title: 'Generated at', type: 'datetime', readOnly: true }),
  ],
  preview: { select: { title: 'siteName', subtitle: 'siteId' } },
})
