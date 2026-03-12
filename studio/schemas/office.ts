import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'office',
  title: 'Office',
  type: 'document',
  fields: [
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Office Type',
      type: 'string',
      options: {
        list: [
          { title: 'Headquarters', value: 'headquarters' },
          { title: 'Regional Office', value: 'regional' },
          { title: 'Sales Office', value: 'sales' },
          { title: 'Operations Office', value: 'operations' },
        ],
      },
      initialValue: 'regional',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'flag',
      title: 'Country Flag Emoji',
      type: 'string',
      description: 'e.g., 🇸🇬, 🇲🇾',
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      fields: [
        { name: 'lat', type: 'number', title: 'Latitude' },
        { name: 'lng', type: 'number', title: 'Longitude' },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Office Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone',
      type: 'string',
      description: 'e.g., GMT+8',
    }),
    defineField({
      name: 'workingHours',
      title: 'Working Hours',
      type: 'string',
      description: 'e.g., Mon-Fri 9:00 AM - 6:00 PM',
    }),
    defineField({
      name: 'isHeadquarters',
      title: 'Is Headquarters',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'city',
      subtitle: 'country',
      media: 'image',
    },
  },
})
