import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'audiencePage',
  title: 'Audience Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Agencies', value: 'agencies' },
          { title: 'Brands', value: 'brands' },
          { title: 'Media Owners', value: 'media-owners' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight Text',
      type: 'string',
      description: 'The highlighted part of the title (gradient text)',
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Primary CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaPrimaryLink',
      title: 'Primary CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'Secondary CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondaryLink',
      title: 'Secondary CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'platformFeatures',
      title: 'Platform Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'Feature ID' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
            { name: 'features', type: 'array', of: [{ type: 'string' }], title: 'Feature List' },
          ],
        },
      ],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
          ],
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'label', type: 'string', title: 'Label' },
          ],
        },
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services/Solutions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
            { name: 'offerings', type: 'array', of: [{ type: 'string' }], title: 'Offerings' },
          ],
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer' },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Search engine optimization settings',
    }),
  ],
  preview: {
    select: {
      title: 'pageType',
      subtitle: 'title',
    },
    prepare({ title, subtitle }) {
      const pageNames: Record<string, string> = {
        agencies: '🏢 Agencies',
        brands: '🏷️ Brands',
        'media-owners': '📺 Media Owners',
      }
      return {
        title: pageNames[title] || title,
        subtitle: subtitle,
      }
    },
  },
})
