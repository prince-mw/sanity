import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pressRelease',
  title: 'News',
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
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'source',
      title: 'Source/Publication',
      type: 'string',
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Link to the original article if published elsewhere',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Product News', value: 'product-news'},
          {title: 'Media Spotlight', value: 'media-spotlight'},
          {title: 'Company News', value: 'company-news'},
          {title: 'Partnership', value: 'partnership'},
          {title: 'Award', value: 'award'},
          {title: 'Industry News', value: 'industry-news'},
          {title: 'Funding', value: 'funding'},
          {title: 'Product Launch', value: 'product-launch'},
          {title: 'Recognition', value: 'recognition'},
          {title: 'Product Update', value: 'product-update'},
          {title: 'Expansion', value: 'expansion'},
        ],
      },
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g., "3 min read"',
    }),
    defineField({
      name: 'isMediaFeature',
      title: 'Media Feature',
      type: 'boolean',
      description: 'Mark as a media feature rather than press release',
      initialValue: false,
    }),
    defineField({
      name: 'hasFullArticle',
      title: 'Has Full Article',
      type: 'boolean',
      description: 'If true, this press item has a dedicated full article page. If false, it links externally.',
      initialValue: false,
    }),
    defineField({
      name: 'articleSlug',
      title: 'Article Slug',
      type: 'slug',
      description: 'Custom slug for the full article page (e.g., "series-c-funding")',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
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
      title: 'title',
      date: 'publishedAt',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {date} = selection
      return {
        ...selection,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
      }
    },
  },
})
