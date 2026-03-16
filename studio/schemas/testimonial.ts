import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(10).max(500),
      description: 'The testimonial quote from the client',
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
      description: 'Job title of the author',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Company name',
    }),
    defineField({
      name: 'image',
      title: 'Author Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Profile photo of the author (optional)',
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Logo of the company (optional)',
    }),
    defineField({
      name: 'metric',
      title: 'Key Metric',
      type: 'string',
      description: 'A key achievement or metric (e.g., "Japan\'s Largest OOH Marketplace")',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'Advertising', value: 'advertising' },
          { title: 'Media', value: 'media' },
          { title: 'Retail', value: 'retail' },
          { title: 'Finance', value: 'finance' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Technology', value: 'technology' },
          { title: 'Agency', value: 'agency' },
          { title: 'Brand', value: 'brand' },
          { title: 'Media Owner', value: 'media-owner' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'Show this testimonial on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Only published testimonials will be displayed',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'company',
      media: 'image',
      isFeatured: 'isFeatured',
      status: 'status',
    },
    prepare(selection) {
      const { title, subtitle, media, isFeatured, status } = selection
      const statusIcon = status === 'published' ? '✅' : status === 'archived' ? '📦' : '📝'
      const featuredIcon = isFeatured ? '⭐' : ''
      return {
        title: `${statusIcon} ${featuredIcon} ${title}`,
        subtitle: subtitle,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Author A-Z',
      name: 'authorAsc',
      by: [{ field: 'author', direction: 'asc' }],
    },
  ],
})
