import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ebook',
  title: 'E-Book',
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
          {title: 'Guide', value: 'guide'},
          {title: 'Whitepaper', value: 'whitepaper'},
          {title: 'Playbook', value: 'playbook'},
          {title: 'Market Report', value: 'market-report'},
          {title: 'Case Study', value: 'case-study'},
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
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isNew',
      title: 'New',
      type: 'boolean',
      description: 'Show "New" badge',
      initialValue: false,
    }),
    defineField({
      name: 'viewUrl',
      title: 'View/Download URL',
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
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Search engine optimization settings',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Year (Newest)',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      year: 'year',
      media: 'image',
    },
    prepare(selection) {
      const {title, category, year} = selection
      return {
        ...selection,
        subtitle: `${category || 'No category'} • ${year || ''}`,
      }
    },
  },
})
