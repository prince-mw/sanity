import {defineArrayMember, defineField, defineType} from 'sanity'

// Singapore landing page (/locations/singapore, singleton `singaporePage`) and its venue
// pages (/locations/singapore/{slug}, one `singaporeVenuePage` doc each). Every field is
// optional on the frontend: anything left empty falls back to src/data/singapore.ts.
// The Singapore form URL and logo strip still come from the Singapore Location document.

// ---------------------------------------------------------------------------
// Shared field builders
// ---------------------------------------------------------------------------

const imageField = (name: string, title: string, group?: string, description?: string) =>
  defineField({
    name,
    title,
    type: 'image',
    group,
    description,
    options: {hotspot: true},
    fields: [
      defineField({name: 'alt', title: 'Alt text', type: 'string', description: 'Describe the image for screen readers and Google Images'}),
      defineField({name: 'title', title: 'Title (tooltip)', type: 'string'}),
    ],
  })

const stat = defineArrayMember({
  type: 'object',
  name: 'sgStat',
  fields: [
    defineField({name: 'value', title: 'Value', type: 'string', description: 'e.g. "322" or "173M+"'}),
    defineField({name: 'label', title: 'Label', type: 'string'}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}},
})

const statsField = (name: string, title: string, group?: string, max?: number) =>
  defineField({
    name,
    title,
    type: 'array',
    group,
    of: [stat],
    validation: max ? (rule) => rule.max(max) : undefined,
  })

const titledItem = defineArrayMember({
  type: 'object',
  name: 'sgTitledItem',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
  ],
  preview: {select: {title: 'title', subtitle: 'description'}},
})

const paragraphsField = (name: string, title: string, group?: string) =>
  defineField({
    name,
    title,
    type: 'array',
    group,
    description: 'Each item is shown as its own paragraph',
    of: [defineArrayMember({type: 'text', rows: 4})],
  })

const stringListField = (name: string, title: string, group?: string) =>
  defineField({name, title, type: 'array', group, of: [defineArrayMember({type: 'string'})]})

const landmarksField = (group: string) =>
  defineField({
    name: 'landmarks',
    title: 'Landmark Cards',
    type: 'array',
    group,
    of: [
      defineArrayMember({
        type: 'object',
        name: 'sgLandmark',
        fields: [
          defineField({name: 'name', title: 'Site Name', type: 'string'}),
          defineField({name: 'location', title: 'Location', type: 'string'}),
          defineField({name: 'format', title: 'Format', type: 'string', description: 'e.g. "LED, 7680 × 1200 px"'}),
          defineField({name: 'reach', title: 'Monthly Reach', type: 'string'}),
          defineField({name: 'impressions', title: 'Monthly Impressions', type: 'string'}),
          imageField('image', 'Image'),
        ],
        preview: {select: {title: 'name', subtitle: 'location', media: 'image'}},
      }),
    ],
  })

const faqsField = (group: string) =>
  defineField({
    name: 'faqs',
    title: 'FAQs',
    type: 'array',
    group,
    description: 'Also published to Google as FAQ structured data. Separate paragraphs in an answer with a blank line.',
    of: [
      defineArrayMember({
        type: 'object',
        name: 'sgFaq',
        fields: [
          defineField({name: 'question', title: 'Question', type: 'string'}),
          defineField({name: 'answer', title: 'Answer', type: 'text', rows: 5}),
        ],
        preview: {select: {title: 'question'}},
      }),
    ],
  })

const seoFields = (group: string) => [
  defineField({name: 'metaTitle', title: 'Meta Title', type: 'string', group, validation: (rule) => rule.max(70).warning('Aim for 60 characters or fewer')}),
  defineField({name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, group, validation: (rule) => rule.max(170).warning('Aim for 155 characters or fewer')}),
]

// ---------------------------------------------------------------------------
// Main page (singleton)
// ---------------------------------------------------------------------------

export const singaporePage = defineType({
  name: 'singaporePage',
  title: 'Singapore Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'landscape', title: 'OOH Landscape'},
    {name: 'venues', title: 'Venue Tabs'},
    {name: 'landmarks', title: 'Landmark Billboards'},
    {name: 'media', title: 'Media Types'},
    {name: 'billboard', title: 'Billboard Advertising'},
    {name: 'measurement', title: 'Measurement'},
    {name: 'potential', title: 'Market Potential'},
    {name: 'stories', title: 'Success Stories'},
    {name: 'cta', title: 'Final CTA'},
    {name: 'faq', title: 'FAQ'},
    {name: 'science', title: 'MW Science (venue pages)'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', initialValue: 'Singapore Page', readOnly: true, hidden: true}),
    ...seoFields('seo'),

    // Hero
    defineField({name: 'h1', title: 'Headline (H1)', type: 'string', group: 'hero'}),
    paragraphsField('heroParagraphs', 'Intro Paragraphs', 'hero'),
    defineField({name: 'heroPrimaryCta', title: 'Primary Button Text', type: 'string', group: 'hero', description: 'Opens the Singapore form popup'}),
    defineField({name: 'heroSecondaryCta', title: 'Secondary Button Text', type: 'string', group: 'hero', description: 'Scrolls down to the venue tabs'}),
    statsField('heroStats', 'Hero Stats', 'hero', 4),

    // Landscape
    defineField({name: 'landscapeHeading', title: 'Heading', type: 'string', group: 'landscape'}),
    defineField({name: 'landscapeIntro', title: 'Intro', type: 'text', rows: 3, group: 'landscape'}),
    defineField({name: 'landscapeCards', title: 'Cards', type: 'array', group: 'landscape', of: [titledItem]}),

    // Venue tabs (the tabs themselves come from the Singapore Venue Pages)
    defineField({name: 'venuesHeading', title: 'Heading', type: 'string', group: 'venues', description: 'One tab is shown per published Singapore Venue Page, in display order'}),
    defineField({name: 'venuesIntro', title: 'Intro', type: 'text', rows: 3, group: 'venues'}),

    // Landmarks
    defineField({name: 'landmarksHeading', title: 'Heading', type: 'string', group: 'landmarks'}),
    defineField({name: 'landmarksIntro', title: 'Intro', type: 'text', rows: 2, group: 'landmarks'}),
    landmarksField('landmarks'),

    // Media types
    defineField({name: 'mediaTypesHeading', title: 'Heading', type: 'string', group: 'media'}),
    defineField({
      name: 'mediaTypes',
      title: 'Media Type Cards',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'sgMediaType',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Train', value: 'train'},
                  {title: 'Bus', value: 'bus'},
                  {title: 'Billboard', value: 'billboard'},
                  {title: 'Store', value: 'store'},
                  {title: 'Plane', value: 'plane'},
                ],
              },
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
    }),

    // Billboard advertising
    defineField({name: 'billboardHeading', title: 'Heading', type: 'string', group: 'billboard'}),
    paragraphsField('billboardParagraphs', 'Paragraphs', 'billboard'),
    defineField({name: 'billboardCta', title: 'Button Text', type: 'string', group: 'billboard', description: 'Opens the Singapore form popup'}),
    imageField('billboardImage', 'Image', 'billboard'),

    // Measurement
    defineField({name: 'measurementHeading', title: 'Heading', type: 'string', group: 'measurement'}),
    paragraphsField('measurementParagraphs', 'Paragraphs', 'measurement'),
    defineField({
      name: 'measurementRows',
      title: 'Table Rows',
      type: 'array',
      group: 'measurement',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'sgMeasurementRow',
          fields: [
            defineField({name: 'what', title: 'What you get', type: 'string'}),
            defineField({name: 'tells', title: 'What it tells you', type: 'string'}),
          ],
          preview: {select: {title: 'what', subtitle: 'tells'}},
        }),
      ],
    }),
    defineField({name: 'measurementCta', title: 'Button Text', type: 'string', group: 'measurement', description: 'Opens the Singapore form popup'}),

    // Market potential
    defineField({name: 'potentialHeading', title: 'Heading', type: 'string', group: 'potential'}),
    paragraphsField('potentialParagraphs', 'Paragraphs', 'potential'),

    // Success stories
    defineField({name: 'storiesHeading', title: 'Heading', type: 'string', group: 'stories'}),
    defineField({name: 'storiesIntro', title: 'Intro', type: 'text', rows: 2, group: 'stories'}),
    defineField({
      name: 'stories',
      title: 'Stories',
      type: 'array',
      group: 'stories',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'sgStory',
          fields: [
            defineField({name: 'tag', title: 'Tag', type: 'string', description: 'e.g. "Case Study" or "Guide"'}),
            defineField({name: 'headline', title: 'Headline', type: 'string'}),
            defineField({name: 'button', title: 'Link Text', type: 'string'}),
            defineField({name: 'href', title: 'Link URL', type: 'string', description: 'e.g. /case-studies/your-case-study'}),
            imageField('image', 'Image'),
          ],
          preview: {select: {title: 'headline', subtitle: 'tag', media: 'image'}},
        }),
      ],
    }),

    // Final CTA
    defineField({name: 'ctaHeading', title: 'Heading', type: 'string', group: 'cta'}),
    defineField({name: 'ctaBody', title: 'Body', type: 'text', rows: 3, group: 'cta'}),
    defineField({name: 'ctaButton', title: 'Button Text', type: 'string', group: 'cta', description: 'Opens the Singapore form popup'}),

    // FAQ
    faqsField('faq'),

    // MW Science block shown on every venue page
    defineField({name: 'scienceHeading', title: 'Heading', type: 'string', group: 'science'}),
    defineField({name: 'scienceBody', title: 'Body', type: 'text', rows: 4, group: 'science'}),
    defineField({name: 'scienceLinkText', title: 'Link Text', type: 'string', group: 'science'}),
    defineField({name: 'scienceHref', title: 'Link URL', type: 'string', group: 'science'}),
    defineField({
      name: 'scienceGroups',
      title: 'Columns',
      type: 'array',
      group: 'science',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'sgScienceGroup',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'items', title: 'Items', type: 'array', of: [defineArrayMember({type: 'string'})]}),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Singapore Page', subtitle: '/locations/singapore'})},
})

// ---------------------------------------------------------------------------
// Venue pages
// ---------------------------------------------------------------------------

export const singaporeVenuePage = defineType({
  name: 'singaporeVenuePage',
  title: 'Singapore Venue Page',
  type: 'document',
  groups: [
    {name: 'basic', title: 'Basic', default: true},
    {name: 'tab', title: 'Main Page Tab'},
    {name: 'hero', title: 'Hero'},
    {name: 'why', title: 'Why Advertise'},
    {name: 'premium', title: 'Premium Locations'},
    {name: 'locations', title: 'Locations & Formats'},
    {name: 'whyChoose', title: 'Why Moving Walls'},
    {name: 'faq', title: 'FAQ'},
    {name: 'cta', title: 'Final CTA'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Basic
    defineField({name: 'breadcrumbLabel', title: 'Venue Name', type: 'string', group: 'basic', description: 'e.g. "MRT Station Advertising". Used for the tab heading, links and breadcrumbs.', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'URL Slug', type: 'slug', group: 'basic', description: 'The page lives at /locations/singapore/<slug>', options: {source: 'breadcrumbLabel', maxLength: 80}, validation: (rule) => rule.required()}),
    defineField({name: 'isPublished', title: 'Show on Website', type: 'boolean', group: 'basic', initialValue: true}),
    defineField({name: 'order', title: 'Display Order', type: 'number', group: 'basic', description: 'Lower numbers appear first in the tabs and link cards'}),
    imageField('image', 'Venue Image', 'basic', 'Used in the main page tab and as this page’s hero image'),

    // Tab on the main page
    defineField({name: 'tabLabel', title: 'Tab Label', type: 'string', group: 'tab', description: 'e.g. "Train Stations"'}),
    defineField({name: 'badge', title: 'Badge', type: 'string', group: 'tab', options: {list: ['Programmatic', 'Direct'], layout: 'radio'}}),
    defineField({name: 'tabBestFor', title: 'Best For', type: 'string', group: 'tab'}),
    defineField({name: 'tabDescription', title: 'Description', type: 'text', rows: 3, group: 'tab'}),
    statsField('tabStats', 'Stats', 'tab', 3),
    defineField({name: 'tabNote', title: 'Note (instead of stats)', type: 'string', group: 'tab', description: 'Shown when there are no stats yet, e.g. "Booked direct · site list to follow"'}),

    // Hero
    defineField({name: 'h1', title: 'Headline (H1)', type: 'string', group: 'hero'}),
    defineField({name: 'tagline', title: 'Tagline', type: 'string', group: 'hero'}),
    defineField({name: 'leadQuestion', title: 'Lead Question', type: 'string', group: 'hero'}),
    paragraphsField('intro', 'Intro Paragraphs', 'hero'),
    defineField({name: 'heroCta', title: 'Button Text', type: 'string', group: 'hero', description: 'Opens the Singapore form popup'}),
    statsField('heroStats', 'Hero Stats', 'hero', 3),

    // Why advertise
    defineField({name: 'whyHeading', title: 'Heading', type: 'string', group: 'why'}),
    defineField({name: 'why', title: 'Cards', type: 'array', group: 'why', of: [titledItem]}),

    // Premium locations
    defineField({name: 'premiumHeading', title: 'Heading', type: 'string', group: 'premium'}),
    defineField({name: 'premiumIntro', title: 'Intro', type: 'string', group: 'premium'}),
    landmarksField('premium'),
    defineField({name: 'landmarksNote', title: 'Note under cards', type: 'string', group: 'premium'}),
    defineField({name: 'landmarksImageOnly', title: 'Show images only', type: 'boolean', group: 'premium', description: 'Hide the card details (name, format, reach) until the data is ready', initialValue: false}),

    // Locations & formats
    defineField({name: 'locationsHeading', title: 'Locations Heading', type: 'string', group: 'locations'}),
    defineField({
      name: 'sites',
      title: 'Sites',
      type: 'array',
      group: 'locations',
      description: 'Shown as one tab per Area, in the order the areas first appear',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'sgSite',
          fields: [
            defineField({name: 'name', title: 'Site Name', type: 'string'}),
            defineField({name: 'group', title: 'Area / Region', type: 'string', description: 'e.g. "CBD", "North East"'}),
            defineField({name: 'note', title: 'Note (optional)', type: 'string', description: 'e.g. operating hours'}),
          ],
          preview: {select: {title: 'name', subtitle: 'group'}},
        }),
      ],
    }),
    defineField({name: 'locationGroups', title: 'Location Types (instead of sites)', type: 'array', group: 'locations', description: 'Used when there is no site list yet, e.g. the airport', of: [titledItem]}),
    defineField({name: 'formatsHeading', title: 'Formats Heading', type: 'string', group: 'locations'}),
    stringListField('formats', 'Formats', 'locations'),

    // Why Moving Walls
    paragraphsField('whyChooseLead', 'Intro Paragraphs', 'whyChoose'),
    stringListField('whyChooseList', '"With Moving Walls, you can" list', 'whyChoose'),

    // FAQ
    faqsField('faq'),

    // Final CTA
    defineField({name: 'ctaHeading', title: 'Heading', type: 'string', group: 'cta'}),
    defineField({name: 'ctaBody', title: 'Body', type: 'text', rows: 3, group: 'cta'}),
    defineField({name: 'ctaButton', title: 'Button Text', type: 'string', group: 'cta', description: 'Opens the Singapore form popup'}),

    ...seoFields('seo'),
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'breadcrumbLabel', slug: 'slug.current', media: 'image'},
    prepare: ({title, slug, media}) => ({title, subtitle: slug ? `/locations/singapore/${slug}` : '', media}),
  },
})
