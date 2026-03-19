import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'webinar',
  title: 'Webinar',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'speakers', title: 'Speakers'},
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
      description: 'Toggle to show/hide this webinar on the website',
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
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'content',
    }),
    defineField({
      name: 'webinarType',
      title: 'Webinar Type',
      type: 'string',
      options: {
        list: [
          {title: 'Upcoming', value: 'upcoming'},
          {title: 'Past', value: 'past'},
        ],
      },
      initialValue: 'upcoming',
      group: 'details',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'For upcoming webinars',
      group: 'details',
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'e.g., "2:00 PM EST"',
      group: 'details',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "60 min"',
      group: 'details',
    }),
    // Legacy single speaker fields (for backward compatibility)
    defineField({
      name: 'speaker',
      title: 'Speaker Name (Legacy)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'speakerRole',
      title: 'Speaker Role (Legacy)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'speakerImage',
      title: 'Speaker Image (Legacy)',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: true,
    }),
    // New multiple speakers array
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'speakerInfo',
          title: 'Speaker',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role/Title',
              type: 'string',
            }),
            defineField({
              name: 'company',
              title: 'Company',
              type: 'string',
            }),
            defineField({
              name: 'bio',
              title: 'Bio',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'linkedin',
              title: 'LinkedIn URL',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'image',
            },
          },
        },
      ],
      description: 'Add one or more speakers for this webinar',
      group: 'speakers',
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      group: 'details',
    }),
    defineField({
      name: 'watchLink',
      title: 'Watch Link',
      type: 'url',
      description: 'For on-demand webinars',
      group: 'details',
    }),
    defineField({
      name: 'content',
      title: 'Full Content',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'htmlContent',
      title: 'Custom HTML Page',
      type: 'text',
      description: 'Paste complete HTML code here. When filled, this replaces the entire webinar detail page content.',
      rows: 20,
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
  orderings: [
    {
      title: 'Date (Newest)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'webinarType',
      date: 'date',
      media: 'featuredImage',
      isPublished: 'isPublished',
      status: 'status',
    },
    prepare(selection) {
      const {title, type, date, media, isPublished, status} = selection
      return {
        title: title,
        subtitle: type === 'upcoming' && date 
          ? `Upcoming: ${new Date(date).toLocaleDateString()}` 
          : 'On-Demand',
        media,
      }
    },
  },
})
