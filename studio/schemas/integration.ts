import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'integration',
  title: 'Integration',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Integration Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'SSP Partner', value: 'ssp' },
          { title: 'DSP Partner', value: 'dsp' },
          { title: 'Data Partner', value: 'data' },
          { title: 'Measurement Partner', value: 'measurement' },
          { title: 'Creative Partner', value: 'creative' },
          { title: 'Analytics Partner', value: 'analytics' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Partner Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoUrl',
      title: 'Logo URL (fallback)',
      type: 'string',
      description: 'External logo URL if not using Sanity image',
    }),
    defineField({
      name: 'products',
      title: 'MovingWalls Products',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Which MW products this integration works with',
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'apiDocsUrl',
      title: 'API Documentation URL',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Integration Status',
      type: 'string',
      options: {
        list: [
          { title: 'Live', value: 'live' },
          { title: 'Beta', value: 'beta' },
          { title: 'Coming Soon', value: 'coming-soon' },
          { title: 'Deprecated', value: 'deprecated' },
        ],
      },
      initialValue: 'live',
    }),
    defineField({
      name: 'website',
      title: 'Partner Website',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'logo',
    },
    prepare({ title, subtitle }) {
      const categoryLabels: Record<string, string> = {
        ssp: 'SSP Partner',
        dsp: 'DSP Partner',
        data: 'Data Partner',
        measurement: 'Measurement Partner',
        creative: 'Creative Partner',
        analytics: 'Analytics Partner',
      }
      return {
        title,
        subtitle: categoryLabels[subtitle] || subtitle,
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
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
