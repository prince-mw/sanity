import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'onePager', title: 'One-Pager Format (New)'},
    {name: 'details', title: 'Details'},
    {name: 'publishing', title: 'Publishing'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Publishing controls
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Toggle to show/hide this case study on the website',
      initialValue: true,
      group: 'publishing',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'In Review', value: 'review'},
          {title: 'Approved', value: 'approved'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      group: 'publishing',
    }),
    defineField({
      name: 'scheduledPublishAt',
      title: 'Scheduled Publish Date',
      type: 'datetime',
      description: 'Set a future date to automatically publish',
      group: 'publishing',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
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
      group: 'content',
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'details',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'content',
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
      group: 'details',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'publishing',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description: 'Main content of the case study',
      group: 'content',
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
      description: 'Also used as the "THE PROOF" stat cards on the one-pager format below.',
      group: 'details',
    }),
    // One-pager format fields (2026 redesign) — additive, sits alongside the legacy
    // `content` field above. A case study renders with the new one-pager template once
    // `challenge` is filled in; until then it keeps using the long-form `content` field.
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight',
      type: 'string',
      description: 'Exact substring of the Title above to render in blue (e.g. "Measurable Funnel Uplift"). Leave blank for no highlight.',
      group: 'onePager',
    }),
    defineField({
      name: 'categoryBadge',
      title: 'Category Badge',
      type: 'string',
      description: 'Top-left label pill on the one-pager (e.g. "Campaign"). Separate from Industry, which drives the site-wide filter.',
      options: {
        list: [
          {title: 'Measurement & Brand Lift', value: 'measurement-brand-lift'},
          {title: 'Platform Adoption', value: 'platform-adoption'},
          {title: 'Campaign', value: 'campaign'},
          {title: 'Partnership', value: 'partnership'},
          {title: 'Retail Media & Data', value: 'retail-media-data'},
        ],
      },
      group: 'onePager',
    }),
    defineField({
      name: 'metaLine',
      title: 'Meta Line',
      type: 'string',
      description: 'Subhead under the title, e.g. "Bangkok, Thailand · Apr 1–15, 2026 · Brand Lift Study · with a global social platform"',
      group: 'onePager',
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 4,
      group: 'onePager',
    }),
    defineField({
      name: 'whatWeDid',
      title: 'What We Did',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Bullet points',
      group: 'onePager',
    }),
    defineField({
      name: 'whyItWorked',
      title: 'Why It Worked',
      type: 'text',
      rows: 3,
      description: 'Callout box text',
      group: 'onePager',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Search engine optimization settings',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'featuredImage',
      isPublished: 'isPublished',
      status: 'status',
    },
    prepare(selection) {
      const {client, isPublished, status, title, media} = selection
      return {
        title: title,
        subtitle: client,
        media,
      }
    },
  },
})
