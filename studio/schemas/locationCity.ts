import { defineField, defineType } from 'sanity'
import { pageSections } from './sections'

export default defineType({
  name: 'locationCity',
  title: 'Location City',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'content', title: 'Content' },
    { name: 'market', title: 'Market Stats' },
    { name: 'billboards', title: 'Billboards' },
    { name: 'sections', title: 'Page Sections' },
    { name: 'meta', title: 'Settings & SEO' },
  ],
  fields: [
    // Basic Info Group
    defineField({
      name: 'country',
      title: 'Country',
      type: 'reference',
      to: [{ type: 'location' }],
      group: 'basic',
      description: 'The country this city belongs to. Determines the URL: /locations/{country-slug}/{city-slug}',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City Name',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      description: 'City segment of the URL only, e.g. "bangalore" for /locations/india/bangalore',
      options: {
        source: 'city',
        maxLength: 96,
        isUnique: () => true, // uniqueness enforced per-country by the custom validation below
      },
      validation: Rule => Rule.required().custom(async (slug, context) => {
        if (!slug?.current) return true
        const { document, getClient } = context
        const client = getClient({ apiVersion: '2023-01-01' })
        const countryRef = (document as any)?.country?._ref
        if (!countryRef) return true

        // Documents in Studio are edited as drafts (_id: "drafts.<id>") until published, so both
        // the draft and published IDs of the current document must be excluded — otherwise the
        // in-progress draft matches itself as a "duplicate" on every save.
        const rawId = document?._id || ''
        const publishedId = rawId.replace(/^drafts\./, '')
        const draftId = `drafts.${publishedId}`

        const duplicates = await client.fetch(
          `count(*[_type == "locationCity" && country._ref == $countryRef && slug.current == $slug && !(_id in [$draftId, $publishedId])])`,
          {
            countryRef,
            slug: slug.current,
            draftId,
            publishedId,
          }
        )
        return duplicates > 0 ? 'This slug is already used by another city in the same country' : true
      }),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'basic',
      description: 'Custom H1 heading for the hero section. Leave empty to use the default "OOH Advertising in {City}" template.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'basic',
      options: { hotspot: true },
    }),

    // Content Group
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      group: 'content',
      rows: 2,
      description: 'Brief description for city cards',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      group: 'content',
      rows: 4,
      description: 'Detailed description for the city page hero',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' },
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),

    // Market Stats Group
    defineField({
      name: 'mediaTypes',
      title: 'Media Types',
      type: 'array',
      group: 'market',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'icon', title: 'Icon Key', type: 'string', description: 'Icon identifier: digital, transit, bus, mall, highway, airport, static' },
            { name: 'description', title: 'Description', type: 'string' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'description' },
          },
        },
      ],
    }),

    // Billboards Group
    defineField({
      name: 'highVisibilityBillboards',
      title: 'High Visibility Billboards',
      type: 'array',
      group: 'billboards',
      description: 'Featured billboards with high visibility',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'location', title: 'Location', type: 'string' },
            { name: 'reach', title: 'Reach', type: 'string', description: 'e.g., "132,145"' },
            { name: 'impressions', title: 'Impressions', type: 'string', description: 'e.g., "1,075,680"' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'name', subtitle: 'location', media: 'image' },
          },
        },
      ],
    }),

    // Page Sections Group
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'sections',
      description: 'Add and arrange custom sections for this city page. Drag to reorder.',
      of: pageSections,
    }),
    defineField({
      name: 'sectionsPosition',
      title: 'Sections Position',
      type: 'string',
      group: 'sections',
      description: 'Where to display custom sections relative to the default city content',
      options: {
        list: [
          { title: 'After All Content (before FAQs)', value: 'before-faqs' },
          { title: 'After FAQs (end of page)', value: 'after-faqs' },
          { title: 'Before All Content (after hero)', value: 'after-hero' },
        ],
        layout: 'radio',
      },
      initialValue: 'after-faqs',
    }),

    // Settings & SEO Group
    defineField({
      name: 'contactFormUrl',
      title: 'Contact Form URL',
      type: 'url',
      group: 'meta',
      description: 'City-specific Zoho contact form URL. Used by the hero "Get Started" button and the navbar CTA while a visitor is on this city\'s page.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'meta',
      description: 'Order in which this city appears on the country page',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      group: 'meta',
      description: 'Whether this city page is published',
      initialValue: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'meta',
      description: 'Search engine optimization settings',
    }),
  ],
  preview: {
    select: {
      title: 'city',
      country: 'country.country',
      media: 'heroImage',
      isActive: 'isActive',
      order: 'order',
    },
    prepare({ title, country, media, isActive, order }) {
      return {
        title: title || 'Untitled',
        subtitle: `${country || ''} ${!isActive ? '(Draft)' : ''} ${order ? `#${order}` : ''}`.trim(),
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'City Name (A-Z)',
      name: 'cityAsc',
      by: [{ field: 'city', direction: 'asc' }],
    },
  ],
})
