import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'The URL path for this page (e.g., "summer-campaign" = /summer-campaign)',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Search engine optimization settings',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'hero',
          title: 'Hero Section',
          fields: [
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
            {name: 'backgroundImage', type: 'image', title: 'Background Image', options: {hotspot: true}},
            {name: 'ctaText', type: 'string', title: 'CTA Button Text'},
            {name: 'ctaLink', type: 'string', title: 'CTA Button Link'},
          ],
          preview: {
            select: {title: 'heading'},
            prepare: ({title}) => ({title: title || 'Hero Section', subtitle: 'Hero'}),
          },
        },
        {
          type: 'object',
          name: 'textBlock',
          title: 'Text Block',
          fields: [
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'content', type: 'blockContent', title: 'Content'},
            {name: 'alignment', type: 'string', title: 'Alignment', options: {list: ['left', 'center', 'right']}},
          ],
          preview: {
            select: {title: 'heading'},
            prepare: ({title}) => ({title: title || 'Text Block', subtitle: 'Text'}),
          },
        },
        {
          type: 'object',
          name: 'imageGallery',
          title: 'Image Gallery',
          fields: [
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'images', type: 'array', title: 'Images', of: [{type: 'image', options: {hotspot: true}}]},
            {name: 'layout', type: 'string', title: 'Layout', options: {list: ['grid', 'carousel', 'masonry']}},
          ],
          preview: {
            select: {title: 'heading'},
            prepare: ({title}) => ({title: title || 'Image Gallery', subtitle: 'Gallery'}),
          },
        },
        {
          type: 'object',
          name: 'featureGrid',
          title: 'Feature Grid',
          fields: [
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
            {
              name: 'features',
              type: 'array',
              title: 'Features',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'icon', type: 'string', title: 'Icon Name'},
                    {name: 'title', type: 'string', title: 'Title'},
                    {name: 'description', type: 'text', title: 'Description'},
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {title: 'heading'},
            prepare: ({title}) => ({title: title || 'Feature Grid', subtitle: 'Features'}),
          },
        },
        {
          type: 'object',
          name: 'ctaBanner',
          title: 'CTA Banner',
          fields: [
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
            {name: 'ctaText', type: 'string', title: 'Button Text'},
            {name: 'ctaLink', type: 'string', title: 'Button Link'},
            {name: 'backgroundColor', type: 'string', title: 'Background Color'},
          ],
          preview: {
            select: {title: 'heading'},
            prepare: ({title}) => ({title: title || 'CTA Banner', subtitle: 'CTA'}),
          },
        },
        {
          type: 'object',
          name: 'testimonials',
          title: 'Testimonials',
          fields: [
            {name: 'heading', type: 'string', title: 'Heading'},
            {
              name: 'items',
              type: 'array',
              title: 'Testimonials',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'quote', type: 'text', title: 'Quote'},
                    {name: 'name', type: 'string', title: 'Name'},
                    {name: 'role', type: 'string', title: 'Role'},
                    {name: 'company', type: 'string', title: 'Company'},
                    {name: 'image', type: 'image', title: 'Photo', options: {hotspot: true}},
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {title: 'heading'},
            prepare: ({title}) => ({title: title || 'Testimonials', subtitle: 'Testimonials'}),
          },
        },
        {
          type: 'object',
          name: 'contactForm',
          title: 'Contact Form',
          fields: [
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
            {name: 'formId', type: 'string', title: 'Form ID', description: 'Custom form identifier'},
          ],
          preview: {
            select: {title: 'heading'},
            prepare: ({title}) => ({title: title || 'Contact Form', subtitle: 'Form'}),
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare(selection) {
      const {slug} = selection
      return {...selection, subtitle: slug ? `/${slug}` : 'No slug'}
    },
  },
})
