import {defineField, defineType} from 'sanity'

// Reusable SEO object type for all content schemas
export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines (50-60 characters recommended)',
      validation: (Rule) => Rule.max(70).warning('Meta title should be under 60 characters for best SEO results'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines (150-160 characters recommended)',
      validation: (Rule) => Rule.max(170).warning('Meta description should be under 160 characters for best SEO results'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630px recommended)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Keywords for search engine optimization (comma-separated)',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'enableKeywords',
      title: 'Enable SEO Keywords',
      type: 'boolean',
      description: 'Toggle to enable/disable keywords meta tag for this page',
      initialValue: true,
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'If enabled, this page will not be indexed by search engines',
      initialValue: false,
    }),
  ],
})

// Export SEO fields as array for easy inclusion in other schemas
export const seoFields = [
  defineField({
    name: 'seo',
    title: 'SEO',
    type: 'seo',
    group: 'seo',
  }),
]
