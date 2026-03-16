import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short marketing tagline for the product',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief product description for hero section',
    }),
    defineField({
      name: 'icon',
      title: 'Product Icon',
      type: 'string',
      description: 'Icon name or identifier',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Planning', value: 'planning' },
          { title: 'Activation', value: 'activation' },
          { title: 'Measurement', value: 'measurement' },
          { title: 'Intelligence', value: 'intelligence' },
          { title: 'Creative', value: 'creative' },
        ],
      },
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string', title: 'Icon' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'metric', type: 'string', title: 'Metric/Stat', description: 'Optional performance metric' },
          ],
        },
      ],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of product benefits',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value', description: 'e.g., 99.9%, 500M+' },
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'growth', type: 'number', title: 'Growth %', description: 'Optional YoY growth' },
          ],
        },
      ],
    }),
    defineField({
      name: 'integrations',
      title: 'Integration Partners',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Partner Name' },
            { name: 'logo', type: 'image', title: 'Partner Logo' },
            { name: 'category', type: 'string', title: 'Category', options: { list: ['SSP', 'DSP', 'Data', 'Measurement', 'Creative'] } },
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote', type: 'text', title: 'Quote' },
            { name: 'author', type: 'string', title: 'Author Name' },
            { name: 'role', type: 'string', title: 'Role' },
            { name: 'company', type: 'string', title: 'Company' },
            { name: 'metric', type: 'string', title: 'Success Metric', description: 'e.g., 45% ROI increase' },
          ],
        },
      ],
    }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'industry', type: 'string', title: 'Industry' },
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Get Started',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'demoVideo',
      title: 'Demo Video URL',
      type: 'url',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Search engine optimization settings',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Legacy)',
      type: 'string',
      description: 'Legacy SEO title field - use the SEO object above instead',
      hidden: true,
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (Legacy)',
      type: 'text',
      description: 'Legacy SEO description field - use the SEO object above instead',
      hidden: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
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
      subtitle: 'tagline',
      media: 'heroImage',
    },
  },
})
