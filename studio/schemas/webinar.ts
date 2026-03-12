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
          {title: 'On-Demand', value: 'on-demand'},
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
    defineField({
      name: 'speaker',
      title: 'Speaker Name',
      type: 'string',
    }),
    defineField({
      name: 'speakerRole',
      title: 'Speaker Role',
      type: 'string',
    }),
    defineField({
      name: 'speakerImage',
      title: 'Speaker Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'attendees',
      title: 'Attendees',
      type: 'number',
      description: 'Number of registrants (for upcoming)',
    }),
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      description: 'Number of views (for on-demand)',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating out of 5 (for on-demand)',
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
          {title: 'All Levels', value: 'all-levels'},
        ],
      },
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
  ],
  orderings: [
    {
      title: 'Date (Newest)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Views',
      name: 'viewsDesc',
      by: [{field: 'views', direction: 'desc'}],
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
