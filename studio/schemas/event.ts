import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
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
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          {title: 'Conference', value: 'conference'},
          {title: 'Webinar', value: 'webinar'},
          {title: 'Workshop', value: 'workshop'},
          {title: 'Meetup', value: 'meetup'},
          {title: 'Trade Show', value: 'trade-show'},
          {title: 'Launch Event', value: 'launch-event'},
        ],
      },
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {name: 'venue', type: 'string', title: 'Venue Name'},
        {name: 'address', type: 'string', title: 'Address'},
        {name: 'city', type: 'string', title: 'City'},
        {name: 'country', type: 'string', title: 'Country'},
        {name: 'isVirtual', type: 'boolean', title: 'Virtual Event'},
        {name: 'virtualLink', type: 'url', title: 'Virtual Event Link'},
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., "Free", "$199", "Starting at $99"',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'string',
      description: 'e.g., "500 attendees", "Unlimited"',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Industry', value: 'industry'},
          {title: 'Product', value: 'product'},
          {title: 'Learning', value: 'learning'},
          {title: 'Networking', value: 'networking'},
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      description: 'Highlight this event on the events page',
      initialValue: false,
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'role', type: 'string', title: 'Role/Title'},
            {name: 'company', type: 'string', title: 'Company'},
            {name: 'image', type: 'image', title: 'Photo', options: {hotspot: true}},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'startDate',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {date} = selection
      return {
        ...selection,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date set',
      }
    },
  },
})
