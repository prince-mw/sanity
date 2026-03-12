import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'whitepaper',
  title: 'Whitepaper',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
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
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'pages',
      title: 'Number of Pages',
      type: 'number',
    }),
    defineField({
      name: 'downloads',
      title: 'Downloads Count',
      type: 'string',
      description: 'e.g., "5.2K+"',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'string',
      description: 'e.g., "Nov 2025"',
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download URL',
      type: 'url',
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
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
    },
    prepare(selection) {
      const {title, category, publishDate} = selection
      return {
        ...selection,
        subtitle: `${category || 'No category'} • ${publishDate || ''}`,
      }
    },
  },
})
