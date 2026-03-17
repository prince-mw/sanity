import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'oohFormat',
  title: 'OOH Format',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Format Name',
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
          { title: 'Digital Out-of-Home (DOOH)', value: 'dooh' },
          { title: 'Traditional OOH', value: 'traditional' },
          { title: 'Transit Advertising', value: 'transit' },
          { title: 'Mobile Advertising', value: 'mobile' },
          { title: 'Place-Based', value: 'place-based' },
          { title: 'Street Furniture', value: 'street-furniture' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon identifier (e.g., billboard, digital, transit)',
      options: {
        list: [
          { title: 'Billboard', value: 'billboard' },
          { title: 'Digital', value: 'digital' },
          { title: 'Transit', value: 'transit' },
          { title: 'Street', value: 'street' },
          { title: 'Mall', value: 'mall' },
          { title: 'Airport', value: 'airport' },
          { title: 'LED', value: 'led' },
          { title: 'Spectacular', value: 'spectacular' },
        ],
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for listing view',
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'text',
      rows: 5,
      description: 'Detailed description for detail view',
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Technical specifications',
    }),
    defineField({
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      title: 'Format Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL (fallback)',
      type: 'string',
      description: 'External image URL if not using Sanity image',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'string',
      description: 'Optional video showcasing the format',
    }),
    defineField({
      name: 'averageCpm',
      title: 'Average CPM Range',
      type: 'string',
      description: 'e.g., "$5-15"',
    }),
    defineField({
      name: 'typicalReach',
      title: 'Typical Daily Reach',
      type: 'string',
      description: 'e.g., "50,000-200,000"',
    }),
    defineField({
      name: 'bestFor',
      title: 'Best For',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Use cases this format excels at',
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
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Search engine optimization settings',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
    prepare({ title, subtitle }) {
      const categoryLabels: Record<string, string> = {
        dooh: 'DOOH',
        traditional: 'Traditional',
        transit: 'Transit',
        mobile: 'Mobile',
        'place-based': 'Place-Based',
        'street-furniture': 'Street Furniture',
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
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})
