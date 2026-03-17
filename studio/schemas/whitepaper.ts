import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'whitepaper',
  title: 'Whitepaper',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'details', title: 'Details'},
    {name: 'publishing', title: 'Publishing'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Publishing controls
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Toggle to show/hide this whitepaper on the website',
      initialValue: true,
      group: 'publishing',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'published',
      group: 'publishing',
    }),
    defineField({
      name: 'scheduledPublishAt',
      title: 'Scheduled Publish Date',
      type: 'datetime',
      description: 'Set a future date to automatically publish this content',
      group: 'publishing',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Industry Report', value: 'industry-report'},
          {title: 'Technology', value: 'technology'},
          {title: 'Best Practices', value: 'best-practices'},
          {title: 'Compliance', value: 'compliance'},
          {title: 'Industry Guide', value: 'industry-guide'},
          {title: 'Analytics', value: 'analytics'},
          {title: 'Research', value: 'research'},
        ],
      },
      group: 'details',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'content',
    }),
    defineField({
      name: 'pages',
      title: 'Number of Pages',
      type: 'number',
      group: 'details',
    }),
    defineField({
      name: 'downloads',
      title: 'Downloads Count',
      type: 'string',
      description: 'e.g., "5.2K+"',
      group: 'details',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'string',
      description: 'e.g., "Nov 2025"',
      group: 'publishing',
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{type: 'string'}],
      group: 'details',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      group: 'details',
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download URL',
      type: 'url',
      group: 'details',
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      group: 'content',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'publishing',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Search engine optimization settings',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Featured First',
      name: 'featuredDesc',
      by: [{field: 'featured', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      publishDate: 'publishDate',
      media: 'image',
      isPublished: 'isPublished',
      status: 'status',
    },
    prepare(selection) {
      const {title, category, publishDate, media, isPublished, status} = selection
      return {
        title: title,
        subtitle: `${category || 'No category'} - ${publishDate || ''}`,
        media,
      }
    },
  },
})
