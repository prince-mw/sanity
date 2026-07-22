import { defineField, defineType } from 'sanity'
import { pageSections } from './sections'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'content', title: 'Content' },
    { name: 'markets', title: 'Markets & Stats' },
    { name: 'billboards', title: 'Billboards' },
    { name: 'sections', title: 'Page Sections' },
    { name: 'meta', title: 'Settings & SEO' },
  ],
  fields: [
    // Basic Info Group
    defineField({
      name: 'country',
      title: 'Country Name',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'country',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'Main City',
      type: 'string',
      group: 'basic',
      description: 'Primary city for this location',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'basic',
      description: 'Custom H1 heading for the hero section. Leave empty to use the default "OOH Advertising in {Country}" template.',
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
      description: 'Brief description for location cards',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      group: 'content',
      rows: 4,
      description: 'Detailed description for the location page hero',
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
    
    // Markets & Stats Group
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      group: 'markets',
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
      group: 'markets',
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
      description: 'Add and arrange custom sections for this location page. Drag to reorder.',
      of: pageSections,
    }),
    defineField({
      name: 'sectionsPosition',
      title: 'Sections Position',
      type: 'string',
      group: 'sections',
      description: 'Where to display custom sections relative to the default location content',
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
      description: 'Country-specific Zoho contact form URL',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'meta',
      description: 'Order in which locations appear on the listing page',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      group: 'meta',
      description: 'Whether this location is published',
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
      title: 'country',
      subtitle: 'city',
      media: 'heroImage',
      isActive: 'isActive',
      order: 'order',
    },
    prepare({ title, subtitle, media, isActive, order }) {
      return {
        title: title || 'Untitled',
        subtitle: `${subtitle || ''} ${!isActive ? '(Draft)' : ''} ${order ? `#${order}` : ''}`.trim(),
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
      title: 'Country Name (A-Z)',
      name: 'countryAsc',
      by: [{ field: 'country', direction: 'asc' }],
    },
  ],
})
