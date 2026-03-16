import {defineType, defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'featuredContent',
  title: 'Featured Content',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'Optional badge label (e.g., "New", "Featured", "Popular")',
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Custom URL', value: 'custom'},
          {title: 'Product', value: 'product'},
          {title: 'Case Study', value: 'caseStudy'},
          {title: 'Blog Post', value: 'blogPost'},
          {title: 'Event', value: 'event'},
          {title: 'Webinar', value: 'webinar'},
          {title: 'Ebook', value: 'ebook'},
          {title: 'Whitepaper', value: 'whitepaper'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'custom',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Custom URL for the CTA',
      hidden: ({parent}) => parent?.linkType !== 'custom',
    }),
    defineField({
      name: 'productRef',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      hidden: ({parent}) => parent?.linkType !== 'product',
    }),
    defineField({
      name: 'caseStudyRef',
      title: 'Case Study',
      type: 'reference',
      to: [{type: 'caseStudy'}],
      hidden: ({parent}) => parent?.linkType !== 'caseStudy',
    }),
    defineField({
      name: 'blogPostRef',
      title: 'Blog Post',
      type: 'reference',
      to: [{type: 'blogPost'}],
      hidden: ({parent}) => parent?.linkType !== 'blogPost',
    }),
    defineField({
      name: 'eventRef',
      title: 'Event',
      type: 'reference',
      to: [{type: 'event'}],
      hidden: ({parent}) => parent?.linkType !== 'event',
    }),
    defineField({
      name: 'webinarRef',
      title: 'Webinar',
      type: 'reference',
      to: [{type: 'webinar'}],
      hidden: ({parent}) => parent?.linkType !== 'webinar',
    }),
    defineField({
      name: 'ebookRef',
      title: 'Ebook',
      type: 'reference',
      to: [{type: 'ebook'}],
      hidden: ({parent}) => parent?.linkType !== 'ebook',
    }),
    defineField({
      name: 'whitepaperRef',
      title: 'Whitepaper',
      type: 'reference',
      to: [{type: 'whitepaper'}],
      hidden: ({parent}) => parent?.linkType !== 'whitepaper',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text for the call-to-action button',
      initialValue: 'Learn More',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      badge: 'badge',
    },
    prepare({title, media, badge}) {
      return {
        title: title || 'Featured Content',
        subtitle: badge ? `Badge: ${badge}` : 'No badge',
        media,
      }
    },
  },
})
