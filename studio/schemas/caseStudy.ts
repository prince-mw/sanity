import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
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
      description: 'Toggle to show/hide this case study on the website',
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
      name: 'client',
      title: 'Client Name',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'details',
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
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          {title: 'Retail', value: 'retail'},
          {title: 'Finance', value: 'finance'},
          {title: 'Healthcare', value: 'healthcare'},
          {title: 'Technology', value: 'technology'},
          {title: 'FMCG', value: 'fmcg'},
          {title: 'Automotive', value: 'automotive'},
          {title: 'Entertainment', value: 'entertainment'},
          {title: 'Travel', value: 'travel'},
          {title: 'Real Estate', value: 'real-estate'},
          {title: 'Other', value: 'other'},
        ],
      },
      group: 'details',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'details',
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
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description: 'Main content of the case study',
      group: 'content',
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'results',
      title: 'The Results',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'value', type: 'string', title: 'Value'},
          ],
        },
      ],
      group: 'details',
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {name: 'quote', type: 'text', title: 'Quote'},
        {name: 'name', type: 'string', title: 'Name'},
        {name: 'role', type: 'string', title: 'Role'},
      ],
      group: 'content',
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
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
      client: 'client',
      media: 'featuredImage',
      isPublished: 'isPublished',
      status: 'status',
    },
    prepare(selection) {
      const {client, isPublished, status, title, media} = selection
      const statusBadge = status === 'archived' ? '📦' : (status === 'draft' || isPublished === false) ? '📝' : '✅'
      return {
        title: `${statusBadge} ${title}`,
        subtitle: client,
        media,
      }
    },
  },
})
