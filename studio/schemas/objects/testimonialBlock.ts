import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonialBlock',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
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
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'author',
      company: 'company',
      avatar: 'avatar',
    },
    prepare({quote, author, company, avatar}) {
      return {
        title: `"${quote?.substring(0, 40)}..."`,
        subtitle: `— ${author}${company ? `, ${company}` : ''}`,
        media: avatar,
      }
    },
  },
})
