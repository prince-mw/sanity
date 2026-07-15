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

        const duplicates = await client.fetch(
          `count(*[_type == "locationCity" && country._ref == $countryRef && slug.current == $slug && _id != $id])`,
          {
            countryRef,
            slug: slug.current,
            id: document?._id?.replace('drafts.', '') || '',
          }
        )
        return duplicates > 0 ? 'This slug is already used by another city in the same country' : true
      }),
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
      name: 'whyInvest',
      title: 'Why Invest List',
      type: 'array',
      group: 'content',
      description: 'List of reasons to invest in OOH in this city',
      of: [{ type: 'string' }],
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

    // Market Stats Group (mirrors location.keyMarkets entry shape)
    defineField({
      name: 'code',
      title: 'City Code',
      type: 'string',
      group: 'market',
      description: 'e.g., "BLR"',
    }),
    defineField({
      name: 'billboards',
      title: 'Billboard Count',
      type: 'string',
      group: 'market',
      description: 'e.g., "5,000+"',
    }),
    defineField({
      name: 'population',
      title: 'Population',
      type: 'string',
      group: 'market',
    }),
    defineField({
      name: 'screens',
      title: 'Screens Count',
      type: 'number',
      group: 'market',
    }),
    defineField({
      name: 'screensGrowth',
      title: 'Screens Growth %',
      type: 'number',
      group: 'market',
    }),
    defineField({
      name: 'dailyReach',
      title: 'Daily Reach',
      type: 'string',
      group: 'market',
    }),
    defineField({
      name: 'dailyReachGrowth',
      title: 'Daily Reach Growth %',
      type: 'number',
      group: 'market',
    }),
    defineField({
      name: 'monthlyImpressions',
      title: 'Monthly Impressions',
      type: 'string',
      group: 'market',
    }),
    defineField({
      name: 'monthlyImpressionsGrowth',
      title: 'Monthly Impressions Growth %',
      type: 'number',
      group: 'market',
    }),
    defineField({
      name: 'yoyGrowth',
      title: 'Year-over-Year Growth %',
      type: 'number',
      group: 'market',
    }),
    defineField({
      name: 'avgDwell',
      title: 'Average Dwell Time',
      type: 'string',
      group: 'market',
    }),
    defineField({
      name: 'peakHours',
      title: 'Peak Hours',
      type: 'string',
      group: 'market',
    }),
    defineField({
      name: 'topCategory',
      title: 'Top Category',
      type: 'string',
      group: 'market',
    }),
    defineField({
      name: 'viewability',
      title: 'Viewability %',
      type: 'number',
      group: 'market',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      group: 'market',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    }),
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
    defineField({
      name: 'locations',
      title: 'Notable Locations',
      type: 'array',
      group: 'market',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'desc', title: 'Description', type: 'string' },
            { name: 'traffic', title: 'Traffic', type: 'number' },
            { name: 'screens', title: 'Screens', type: 'number' },
            { name: 'score', title: 'Score', type: 'number' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'desc' },
          },
        },
      ],
    }),
    defineField({
      name: 'audience',
      title: 'Audience',
      type: 'array',
      group: 'market',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'percentage', title: 'Percentage', type: 'number' },
            { name: 'color', title: 'Color Class', type: 'string' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'percentage' },
            prepare({ title, subtitle }) {
              return { title, subtitle: subtitle ? `${subtitle}%` : '' }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'mediaFormats',
      title: 'Media Formats',
      type: 'array',
      group: 'market',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'percentage', title: 'Percentage', type: 'number' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'percentage' },
            prepare({ title, subtitle }) {
              return { title, subtitle: subtitle ? `${subtitle}%` : '' }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'hourlyData',
      title: 'Hourly Data (24 values)',
      type: 'array',
      group: 'market',
      of: [{ type: 'number' }],
    }),
    defineField({
      name: 'caseStudies',
      title: 'Featured Case Studies',
      type: 'array',
      group: 'market',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'client', title: 'Client', type: 'string' },
            { name: 'results', title: 'Results', type: 'string' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'client' },
          },
        },
      ],
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      group: 'market',
      of: [{ type: 'string' }],
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
      description: 'City-specific Zoho contact form URL (falls back to the country form if empty)',
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
