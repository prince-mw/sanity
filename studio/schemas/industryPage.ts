import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'industryPage',
  title: 'Industry Page',
  type: 'document',
  fields: [
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'Finance & Banking', value: 'finance' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Retail & E-commerce', value: 'retail' },
          { title: 'Automotive', value: 'automotive' },
          { title: 'Technology', value: 'technology' },
          { title: 'Travel & Tourism', value: 'travel' },
          { title: 'Entertainment', value: 'entertainment' },
          { title: 'Real Estate', value: 'real-estate' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'industry', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badgeText',
      title: 'Hero Badge Text',
      type: 'string',
      description: 'Small badge text above hero title',
    }),
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight',
      type: 'string',
      description: 'The highlighted part of the title (colored text)',
    }),
    defineField({
      name: 'description',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroStats',
      title: 'Hero Stats Card',
      type: 'object',
      fields: [
        { name: 'cardTitle', type: 'string', title: 'Card Title' },
        {
          name: 'metrics',
          type: 'array',
          title: 'Metrics',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', type: 'string', title: 'Value' },
                { name: 'label', type: 'string', title: 'Label' },
              ],
            },
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
      name: 'benefitsSectionTitle',
      title: 'Benefits Section Title',
      type: 'string',
    }),
    defineField({
      name: 'benefitsSectionSubtitle',
      title: 'Benefits Section Subtitle',
      type: 'text',
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
      name: 'servicesSectionTitle',
      title: 'Services Section Title',
      type: 'string',
    }),
    defineField({
      name: 'servicesSectionSubtitle',
      title: 'Services Section Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'trustFactors',
      title: 'Trust Factors/Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'metric', type: 'string', title: 'Metric/Value' },
            { name: 'description', type: 'string', title: 'Description' },
          ],
        },
      ],
    }),
    defineField({
      name: 'caseStudies',
      title: 'Featured Case Studies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'brand', type: 'string', title: 'Brand Name' },
            { name: 'metric', type: 'string', title: 'Key Metric' },
            { name: 'description', type: 'string', title: 'Description' },
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
      title: 'industry',
      subtitle: 'title',
    },
    prepare({ title, subtitle }) {
      const industryNames: Record<string, string> = {
        finance: 'Finance',
        healthcare: 'Healthcare',
        retail: 'Retail',
        automotive: 'Automotive',
        technology: 'Technology',
        travel: 'Travel',
        entertainment: 'Entertainment',
        'real-estate': 'Real Estate',
      }
      return {
        title: industryNames[title] || title,
        subtitle: subtitle,
      }
    },
  },
})
