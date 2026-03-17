import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'reusableTestimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      description: 'Used for identifying this testimonial in the CMS (not shown on website)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'localeText',
      description: 'The testimonial quote',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
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
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this testimonial prominently',
      initialValue: false,
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'General', value: 'general'},
          {title: 'Product - MW Activate', value: 'mw-activate'},
          {title: 'Product - MW Planner', value: 'mw-planner'},
          {title: 'Product - MW Measure', value: 'mw-measure'},
          {title: 'Industry - Retail', value: 'retail'},
          {title: 'Industry - Healthcare', value: 'healthcare'},
          {title: 'Industry - Finance', value: 'finance'},
          {title: 'Audience - Brands', value: 'brands'},
          {title: 'Audience - Agencies', value: 'agencies'},
          {title: 'Audience - Media Owners', value: 'media-owners'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      author: 'author',
      company: 'company',
      quote: 'quote.en',
      avatar: 'avatar',
    },
    prepare({author, company, quote, avatar}) {
      return {
        title: `${author}${company ? ` - ${company}` : ''}`,
        subtitle: quote?.substring(0, 60) + '...',
        media: avatar,
      }
    },
  },
})
