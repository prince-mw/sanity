import {defineArrayMember, defineField, defineType} from 'sanity'

// Singleton backing the Retail Media landing page at /retail.
// Every field is optional on the frontend — anything left empty falls back to the
// default copy in src/data/retail-media-page.ts.

const stat = defineArrayMember({
  type: 'object',
  name: 'retailStat',
  fields: [
    defineField({name: 'value', title: 'Value', type: 'string', description: 'e.g. "4000+" or "85%"'}),
    defineField({name: 'label', title: 'Label', type: 'string'}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}},
})

const titledItem = defineArrayMember({
  type: 'object',
  name: 'retailTitledItem',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
  ],
  preview: {select: {title: 'title', subtitle: 'description'}},
})

const paragraphs = (name: string, title: string, group: string) =>
  defineField({
    name,
    title,
    type: 'array',
    group,
    description: 'Each item is shown as its own paragraph',
    of: [defineArrayMember({type: 'text', rows: 4})],
  })

const imageField = (name: string, title: string, group: string) =>
  defineField({
    name,
    title,
    type: 'image',
    group,
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt text',
        type: 'string',
        description: 'Describe the image for screen readers and Google Images',
      }),
    ],
  })

export default defineType({
  name: 'retailMediaPage',
  title: 'Retail Media Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'context', title: 'Why In-Store'},
    {name: 'moments', title: 'Shopper Moments'},
    {name: 'approach', title: 'Approach'},
    {name: 'howItWorks', title: 'How It Works'},
    {name: 'creative', title: 'Dynamic Creative'},
    {name: 'measurement', title: 'Measurement'},
    {name: 'caseStudy', title: 'Case Study'},
    {name: 'cta', title: 'Final CTA'},
    {name: 'faq', title: 'FAQ'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Retail Media Page',
      readOnly: true,
      hidden: true,
    }),

    // Hero
    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'hero',
      description: 'Small uppercase line above the headline. Part of the H1, so keep the main keyword here',
    }),
    defineField({name: 'heroTitle', title: 'Headline', type: 'string', group: 'hero'}),
    defineField({name: 'heroSubtitle', title: 'Subheadline', type: 'text', rows: 3, group: 'hero'}),
    defineField({
      name: 'heroStats',
      title: 'Hero Stats',
      type: 'array',
      group: 'hero',
      of: [stat],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Button Text',
      type: 'string',
      group: 'hero',
      description: 'Opens the "Let\'s Connect" form popup',
    }),

    // Why in-store
    defineField({name: 'contextHeading', title: 'Heading', type: 'string', group: 'context'}),
    paragraphs('contextParagraphs', 'Paragraphs', 'context'),
    defineField({
      name: 'contextCallout',
      title: 'Callout Line',
      type: 'string',
      group: 'context',
      description: 'Short emphasised line shown above the stats',
    }),
    defineField({name: 'contextStats', title: 'Stats', type: 'array', group: 'context', of: [stat]}),
    defineField({name: 'contextClosing', title: 'Closing Paragraph', type: 'text', rows: 4, group: 'context'}),
    defineField({name: 'lastMileHeading', title: 'Last Mile: Heading', type: 'string', group: 'context'}),
    paragraphs('lastMileParagraphs', 'Last Mile: Paragraphs', 'context'),

    // Shopper moments table
    defineField({name: 'momentsHeading', title: 'Heading', type: 'string', group: 'moments'}),
    defineField({
      name: 'moments',
      title: 'Table Rows',
      type: 'array',
      group: 'moments',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'retailMoment',
          fields: [
            defineField({name: 'stage', title: 'Stage', type: 'string'}),
            defineField({name: 'where', title: 'Where', type: 'string'}),
            defineField({name: 'whatItDoes', title: 'What it does', type: 'string'}),
            defineField({name: 'whatWeMeasure', title: 'What we measure', type: 'string'}),
          ],
          preview: {select: {title: 'stage', subtitle: 'where'}},
        }),
      ],
    }),

    // Approach
    defineField({name: 'approachEyebrow', title: 'Eyebrow', type: 'string', group: 'approach'}),
    defineField({name: 'approachHeading', title: 'Heading', type: 'string', group: 'approach'}),
    defineField({name: 'approachIntro', title: 'Intro', type: 'text', rows: 3, group: 'approach'}),
    defineField({name: 'approachPillars', title: 'Pillars', type: 'array', group: 'approach', of: [titledItem]}),
    defineField({name: 'categoriesLabel', title: 'Categories Label', type: 'string', group: 'approach'}),
    defineField({
      name: 'categories',
      title: 'Category Audiences',
      type: 'array',
      group: 'approach',
      of: [defineArrayMember({type: 'string'})],
    }),

    // How it works
    defineField({name: 'howItWorksEyebrow', title: 'Eyebrow', type: 'string', group: 'howItWorks'}),
    defineField({name: 'howItWorksHeading', title: 'Heading', type: 'string', group: 'howItWorks'}),
    defineField({
      name: 'howItWorksSteps',
      title: 'Steps',
      type: 'array',
      group: 'howItWorks',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'retailStep',
          fields: [
            defineField({name: 'title', title: 'Step Name', type: 'string', description: 'e.g. "Plan"'}),
            defineField({name: 'subtitle', title: 'Step Subtitle', type: 'string', description: 'e.g. "Audience intelligence"'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'title', subtitle: 'subtitle'}},
        }),
      ],
    }),
    imageField('howItWorksImage', 'Image', 'howItWorks'),

    // Dynamic creative
    defineField({name: 'creativeHeading', title: 'Heading', type: 'string', group: 'creative'}),
    defineField({name: 'creativeIntro', title: 'Intro', type: 'text', rows: 3, group: 'creative'}),
    defineField({name: 'creativeItems', title: 'Triggers', type: 'array', group: 'creative', of: [titledItem]}),

    // Measurement
    defineField({name: 'measurementHeading', title: 'Heading', type: 'string', group: 'measurement'}),
    defineField({name: 'measurementIntro', title: 'Intro', type: 'text', rows: 3, group: 'measurement'}),
    defineField({
      name: 'measurementLayers',
      title: 'Table Rows',
      type: 'array',
      group: 'measurement',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'retailMeasurementLayer',
          fields: [
            defineField({name: 'layer', title: 'Layer', type: 'string'}),
            defineField({name: 'question', title: 'What it answers', type: 'string'}),
            defineField({name: 'method', title: 'How it is measured', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'layer', subtitle: 'question'}},
        }),
      ],
    }),

    // Case study
    defineField({name: 'caseEyebrow', title: 'Eyebrow', type: 'string', group: 'caseStudy'}),
    defineField({name: 'caseHeading', title: 'Heading', type: 'string', group: 'caseStudy'}),
    defineField({name: 'caseBody', title: 'Body', type: 'text', rows: 4, group: 'caseStudy'}),
    defineField({name: 'caseStats', title: 'Stats', type: 'array', group: 'caseStudy', of: [stat]}),
    imageField('caseImage', 'Image', 'caseStudy'),
    defineField({
      name: 'caseLinkText',
      title: 'Link Text (optional)',
      type: 'string',
      group: 'caseStudy',
      description: 'Leave empty to hide the link',
    }),
    defineField({
      name: 'caseLinkUrl',
      title: 'Link URL (optional)',
      type: 'string',
      group: 'caseStudy',
      description: 'e.g. /case-studies/colgate-7-eleven',
    }),

    // Final CTA
    defineField({name: 'ctaHeading', title: 'Heading', type: 'string', group: 'cta'}),
    defineField({name: 'ctaBody', title: 'Body', type: 'text', rows: 3, group: 'cta'}),
    defineField({
      name: 'ctaButtonText',
      title: 'Button Text',
      type: 'string',
      group: 'cta',
      description: 'Opens the "Let\'s Connect" form popup',
    }),

    // FAQ
    defineField({name: 'faqHeading', title: 'Heading', type: 'string', group: 'faq'}),
    defineField({
      name: 'faqs',
      title: 'Questions',
      type: 'array',
      group: 'faq',
      description: 'Also published to Google as FAQ structured data',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'retailFaq',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string'}),
            defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4}),
          ],
          preview: {select: {title: 'question'}},
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Retail Media Page'}),
  },
})
