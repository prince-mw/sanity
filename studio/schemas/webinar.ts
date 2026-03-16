import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'webinar',
  title: 'Webinar',
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
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'For upcoming webinars',
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'e.g., "2:00 PM EST"',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "60 min"',
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
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
    }),
    defineField({
      name: 'watchLink',
      title: 'Watch Link',
      type: 'url',
      description: 'For on-demand webinars',
    }),
    defineField({
      name: 'content',
      title: 'Full Content',
      type: 'blockContent',
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
    },
    prepare(selection) {
      const {title, type, date} = selection
      return {
        ...selection,
        subtitle: type === 'upcoming' && date 
          ? `Upcoming: ${new Date(date).toLocaleDateString()}` 
          : 'On-Demand',
      }
    },
  },
})
