import {defineArrayMember, defineField, defineType} from 'sanity'

// One document per partner, rendered at /partners/{slug} and listed on /partners.
// The page body is a flexible list of sections so each partner can follow its own copy.

const ICONS = [
  {title: 'Store', value: 'store'},
  {title: 'Screen / LCD', value: 'screen'},
  {title: 'Megaphone / Advertising', value: 'megaphone'},
  {title: 'E-paper / Label', value: 'epaper'},
  {title: 'Chart / Reporting', value: 'chart'},
  {title: 'Network', value: 'network'},
  {title: 'People / Audience', value: 'users'},
  {title: 'Settings / Integration', value: 'settings'},
  {title: 'Target', value: 'target'},
  {title: 'Layers / Formats', value: 'layers'},
  {title: 'Clock / Scheduling', value: 'clock'},
  {title: 'Lightning / Fast', value: 'bolt'},
]

const iconField = defineField({
  name: 'icon',
  title: 'Icon',
  type: 'string',
  options: {list: ICONS},
})

const paragraphs = defineField({
  name: 'paragraphs',
  title: 'Paragraphs',
  type: 'array',
  description: 'Each item is shown as its own paragraph',
  of: [defineArrayMember({type: 'text', rows: 3})],
})

export default defineType({
  name: 'partnerPage',
  title: 'Partner Page',
  type: 'document',
  groups: [
    {name: 'basic', title: 'Basic', default: true},
    {name: 'hero', title: 'Hero'},
    {name: 'sections', title: 'Page Sections'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Basic
    defineField({
      name: 'name',
      title: 'Partner Name',
      type: 'string',
      group: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'basic',
      description: 'The page lives at /partners/<slug>',
      options: {source: 'name', maxLength: 64},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isPublished',
      title: 'Show on Website',
      type: 'boolean',
      group: 'basic',
      initialValue: true,
      description: 'Turn off to hide this partner page and remove it from the /partners listing',
    }),
    defineField({
      name: 'logo',
      title: 'Partner Logo',
      type: 'image',
      group: 'basic',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'logoBackground',
      title: 'Logo Tile Colour',
      type: 'string',
      group: 'basic',
      description: 'Hex colour behind the logo, e.g. #2F006D. Leave empty for white.',
    }),
    defineField({
      name: 'category',
      title: 'Partner Type',
      type: 'string',
      group: 'basic',
      description: 'Shown on the /partners card, e.g. "Retail display technology"',
    }),
    defineField({
      name: 'summary',
      title: 'Card Summary',
      type: 'text',
      rows: 3,
      group: 'basic',
      description: 'One or two sentences for the partner card on /partners',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'basic',
      description: 'Lower numbers appear first on /partners',
    }),

    // Hero
    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'hero',
      description: 'Small uppercase line above the headline, e.g. "SOLUM × Moving Walls". Part of the H1.',
    }),
    defineField({name: 'heroTitle', title: 'Headline', type: 'string', group: 'hero'}),
    defineField({
      name: 'heroParagraphs',
      title: 'Intro Paragraphs',
      type: 'array',
      group: 'hero',
      of: [defineArrayMember({type: 'text', rows: 3})],
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Button Text',
      type: 'string',
      group: 'hero',
      description: 'Opens the "Let\'s Connect" form popup',
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero Image (optional)',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      description: 'A product or in-store photo. Leave empty to show the built-in illustration below.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'heroIllustration',
      title: 'Built-in Illustration',
      type: 'string',
      group: 'hero',
      description: 'Shown when no hero image is uploaded',
      initialValue: 'screen-network',
      options: {
        layout: 'radio',
        list: [
          {title: 'Screen network (landscape + portrait screens)', value: 'screen-network'},
          {title: 'Retail displays (LCD screen + e-paper label)', value: 'retail-displays'},
          {title: 'Media player (screen connected to a player)', value: 'media-player'},
        ],
      },
    }),
    defineField({
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      group: 'hero',
      description: 'Up to 4 short points shown in a strip under the hero',
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'partnerHighlight',
          fields: [iconField, defineField({name: 'text', title: 'Text', type: 'string'})],
          preview: {select: {title: 'text'}},
        }),
      ],
    }),

    // Sections
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'sections',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'partnerTextSection',
          title: 'Text Section',
          fields: [
            iconField,
            defineField({name: 'heading', title: 'Heading', type: 'string'}),
            defineField({name: 'intro', title: 'Intro (emphasised)', type: 'text', rows: 2}),
            paragraphs,
            defineField({
              name: 'callout',
              title: 'Highlight Box (optional)',
              type: 'text',
              rows: 2,
              description: 'A key point shown in a highlighted box',
            }),
          ],
          preview: {select: {title: 'heading'}, prepare: ({title}) => ({title, subtitle: 'Text section'})},
        }),
        defineArrayMember({
          type: 'object',
          name: 'partnerCardsSection',
          title: 'Cards Section',
          fields: [
            defineField({name: 'heading', title: 'Heading', type: 'string'}),
            defineField({name: 'intro', title: 'Intro', type: 'text', rows: 2}),
            defineField({
              name: 'cards',
              title: 'Cards',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'partnerCard',
                  fields: [
                    iconField,
                    defineField({name: 'title', title: 'Title', type: 'string'}),
                    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
                  ],
                  preview: {select: {title: 'title', subtitle: 'description'}},
                }),
              ],
            }),
          ],
          preview: {select: {title: 'heading'}, prepare: ({title}) => ({title, subtitle: 'Cards section'})},
        }),
        defineArrayMember({
          type: 'object',
          name: 'partnerCtaSection',
          title: 'Call-to-Action Banner',
          fields: [
            defineField({name: 'heading', title: 'Heading', type: 'string'}),
            paragraphs,
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              description: 'Opens the "Let\'s Connect" form popup',
            }),
          ],
          preview: {select: {title: 'heading'}, prepare: ({title}) => ({title, subtitle: 'CTA banner'})},
        }),
      ],
    }),

    // SEO
    defineField({name: 'metaTitle', title: 'Meta Title', type: 'string', group: 'seo'}),
    defineField({name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, group: 'seo'}),
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', subtitle: 'slug.current', media: 'logo'},
    prepare: ({title, subtitle, media}) => ({title, subtitle: subtitle ? `/partners/${subtitle}` : '', media}),
  },
})
