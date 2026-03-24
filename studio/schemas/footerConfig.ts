import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footerConfig',
  title: 'Footer Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Footer Configuration',
      readOnly: true,
    }),

    // Company Info
    defineField({
      name: 'companyDescription',
      title: 'Company Description',
      type: 'text',
      rows: 3,
      group: 'companyInfo',
    }),

    // Navigation Categories
    defineField({
      name: 'navCategories',
      title: 'Navigation Categories',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Category Title', type: 'string' }),
            defineField({
              name: 'showLocationIcon',
              title: 'Show Location Icon',
              type: 'boolean',
              description: 'Show a map pin icon next to links (for Billboard Locations)',
              initialValue: false,
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'name', title: 'Link Text', type: 'string' }),
                    defineField({ name: 'href', title: 'URL', type: 'string' }),
                  ],
                  preview: {
                    select: { title: 'name', subtitle: 'href' },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'title', links: 'links' },
            prepare({ title, links }) {
              return {
                title: title || 'Untitled Category',
                subtitle: `${links?.length || 0} links`,
              }
            },
          },
        },
      ],
    }),

    // Social Links
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'X (Twitter)', value: 'x' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'TikTok', value: 'tiktok' },
                ],
              },
            }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),

    // Moving Hearts Section
    defineField({
      name: 'movingHeartsTitle',
      title: 'Title',
      type: 'string',
      group: 'movingHearts',
    }),
    defineField({
      name: 'movingHeartsStatsValue',
      title: 'Stats Value',
      type: 'string',
      description: 'e.g. "3M+"',
      group: 'movingHearts',
    }),
    defineField({
      name: 'movingHeartsStatsLabel',
      title: 'Stats Label',
      type: 'string',
      description: 'e.g. "Hearts Touched"',
      group: 'movingHearts',
    }),
    defineField({
      name: 'movingHeartsTagline',
      title: 'Tagline',
      type: 'string',
      group: 'movingHearts',
    }),
    defineField({
      name: 'movingHeartsUrl',
      title: 'CTA URL',
      type: 'url',
      group: 'movingHearts',
    }),
    defineField({
      name: 'movingHeartsCtaText',
      title: 'CTA Button Text',
      type: 'string',
      group: 'movingHearts',
    }),

    // Legal Links
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      group: 'legal',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'URL', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'Use {year} as placeholder for the current year. e.g. "© {year} Moving Walls. All rights reserved."',
      group: 'legal',
    }),
  ],
  groups: [
    { name: 'companyInfo', title: 'Company Info', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'social', title: 'Social Media' },
    { name: 'movingHearts', title: 'Moving Hearts' },
    { name: 'legal', title: 'Legal' },
  ],
  preview: {
    prepare() {
      return { title: 'Footer Configuration' }
    },
  },
})
