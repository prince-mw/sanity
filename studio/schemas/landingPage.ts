import {defineField, defineType} from 'sanity'
import {pageSections} from './sections'

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
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle to make this page live',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      description: 'Set to Archived to hide this page from the site',
    }),
    defineField({
      name: 'scheduledPublishAt',
      title: 'Scheduled Publish Date',
      type: 'datetime',
      description: 'Set a future date to automatically publish this page',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Search engine optimization settings',
    }),
    defineField({
      name: 'zohoForm',
      title: 'Page Form',
      type: 'reference',
      to: [{type: 'zohoForm'}],
      description: 'Attach a Zoho form to this landing page (e.g., lead capture, demo request)',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add and arrange sections to build your page. Drag to reorder.',
      of: pageSections,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      isPublished: 'isPublished',
      status: 'status',
    },
    prepare({title, slug, isPublished, status}) {
      return {
        title: title || 'Untitled',
        subtitle: `/${slug || 'no-slug'}`,
      }
    },
  },
})
