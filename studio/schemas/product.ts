import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    {name: 'basic', title: 'Basic Info', default: true},
    {name: 'features', title: 'Features'},
    {name: 'social', title: 'Social Proof'},
    {name: 'publishing', title: 'Publishing'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Publishing controls
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Toggle to show/hide this product on the website',
      initialValue: true,
      group: 'publishing',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: '📝 Draft', value: 'draft'},
          {title: '✅ Published', value: 'published'},
          {title: '📦 Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'published',
      group: 'publishing',
    }),
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'basic',
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
      group: 'basic',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short marketing tagline for the product',
      group: 'basic',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief product description for hero section',
      group: 'basic',
    }),
    defineField({
      name: 'icon',
      title: 'Product Icon',
      type: 'string',
      description: 'Icon name or identifier',
      group: 'basic',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'basic',
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
      group: 'basic',
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
      group: 'features',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of product benefits',
      group: 'features',
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
      group: 'features',
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
      group: 'social',
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
      group: 'social',
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
      group: 'features',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Get Started',
      group: 'basic',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      initialValue: '/contact',
      group: 'basic',
    }),
    defineField({
      name: 'demoVideo',
      title: 'Demo Video URL',
      type: 'url',
      group: 'features',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Search engine optimization settings',
      group: 'seo',
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
      group: 'publishing',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active (Legacy)',
      type: 'boolean',
      initialValue: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'heroImage',
      isPublished: 'isPublished',
      status: 'status',
    },
    prepare(selection) {
      const {title, subtitle, media, isPublished, status} = selection
      const statusBadge = status === 'archived' ? '📦' : (status === 'draft' || isPublished === false) ? '📝' : '✅'
      return {
        title: `${statusBadge} ${title}`,
        subtitle,
        media,
      }
    },
  },
})
