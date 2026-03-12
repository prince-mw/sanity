import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
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
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
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
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'blockContent',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'blockContent',
    }),
    defineField({
      name: 'results',
      title: 'The Results',
      type: 'blockContent',
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
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {client} = selection
      return {...selection, subtitle: client}
    },
  },
})
