import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pressRelease',
  title: 'News',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'details', title: 'Details'},
    {name: 'publishing', title: 'Publishing'},
    {name: 'workflow', title: 'Workflow'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Publishing controls
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Toggle to show/hide this news item on the website',
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
          {title: 'In Review', value: 'review'},
          {title: 'Approved', value: 'approved'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
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
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'content',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
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
      name: 'source',
      title: 'Source/Publication',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Link to the original article if published elsewhere',
      group: 'details',
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
      group: 'details',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g., "3 min read"',
      group: 'details',
    }),
    defineField({
      name: 'isMediaFeature',
      title: 'Media Feature',
      type: 'boolean',
      description: 'Mark as a media feature rather than press release',
      initialValue: false,
      group: 'details',
    }),
    defineField({
      name: 'hasFullArticle',
      title: 'Has Full Article',
      type: 'boolean',
      description: 'If true, this press item has a dedicated full article page. If false, it links externally.',
      initialValue: false,
      group: 'details',
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
      group: 'content',
    }),
    // Workflow fields
    defineField({
      name: 'assignedTo',
      title: 'Assigned To',
      type: 'reference',
      to: [{type: 'teamMember'}],
      description: 'Team member responsible for this content',
      group: 'workflow',
    }),
    defineField({
      name: 'reviewNotes',
      title: 'Review Notes',
      type: 'text',
      rows: 3,
      description: 'Notes for reviewers or collaborators',
      group: 'workflow',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Search engine optimization settings',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      media: 'featuredImage',
      isPublished: 'isPublished',
      status: 'status',
    },
    prepare(selection) {
      const {date, isPublished, status, title, media} = selection
      return {
        title: title,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
        media,
      }
    },
  },
})
