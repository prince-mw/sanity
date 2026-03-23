import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'audiencePage',
  title: 'Audience Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section', default: true },
    { name: 'platform', title: 'Platform Features' },
    { name: 'trustBar', title: 'Trust Bar / Logos' },
    { name: 'journey', title: 'Journey Section' },
    { name: 'caseStudies', title: 'Case Studies' },
    { name: 'featureGrid', title: 'Feature Grid' },
    { name: 'statsAndBenefits', title: 'Stats & Benefits' },
    { name: 'faqsAndSeo', title: 'FAQs & SEO' },
  ],
  fields: [
    // ── Hero Section ──
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      group: 'hero',
      options: {
        list: [
          { title: 'Agencies', value: 'agencies' },
          { title: 'Brands', value: 'brands' },
          { title: 'Media Owners', value: 'media-owners' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight Text',
      type: 'string',
      group: 'hero',
      description: 'The highlighted part of the title (gradient text)',
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'text',
      group: 'hero',
      rows: 3,
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Primary CTA Text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'ctaPrimaryLink',
      title: 'Primary CTA Link',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'Secondary CTA Text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'ctaSecondaryLink',
      title: 'Secondary CTA Link',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),

    // ── Platform Features ──
    defineField({
      name: 'platformSectionTitle',
      title: 'Platform Section Title',
      type: 'string',
      group: 'platform',
      description: 'e.g. "Plan. Activate. Measure. All in One Place."',
    }),
    defineField({
      name: 'platformSectionSubtitle',
      title: 'Platform Section Subtitle',
      type: 'text',
      group: 'platform',
      rows: 2,
    }),
    defineField({
      name: 'platformFeatures',
      title: 'Platform Features (Tabs)',
      type: 'array',
      group: 'platform',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'Feature ID (unique key)' },
            { name: 'tabLabel', type: 'string', title: 'Tab Label', description: 'Short label shown on the tab button' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
            { name: 'image', type: 'image', title: 'Feature Image', options: { hotspot: true } },
            { name: 'features', type: 'array', of: [{ type: 'string' }], title: 'Feature Bullet Points' },
            { name: 'linkHref', type: 'string', title: 'Link URL' },
            { name: 'linkText', type: 'string', title: 'Link Text' },
          ],
          preview: {
            select: { title: 'tabLabel', subtitle: 'title' },
          },
        },
      ],
    }),

    // ── Trust Bar / Logos ──
    defineField({
      name: 'trustBarTitle',
      title: 'Trust Bar Title',
      type: 'string',
      group: 'trustBar',
      description: 'e.g. "Trusted by leading brands worldwide"',
    }),
    defineField({
      name: 'customerLogos',
      title: 'Customer/Partner Logos',
      type: 'array',
      group: 'trustBar',
      description: 'Logos displayed in the scrolling marquee',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Company Name' },
            { name: 'logo', type: 'image', title: 'Logo Image', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'name', media: 'logo' },
          },
        },
      ],
    }),

    // ── Journey Section ──
    defineField({
      name: 'journeyTitle',
      title: 'Journey Section Title',
      type: 'string',
      group: 'journey',
      description: 'e.g. "Your Journey with Moving Walls"',
    }),
    defineField({
      name: 'journeySubtitle',
      title: 'Journey Section Subtitle',
      type: 'text',
      group: 'journey',
      rows: 2,
    }),
    defineField({
      name: 'journeySteps',
      title: 'Journey Steps',
      type: 'array',
      group: 'journey',
      description: 'Typically 3 steps (e.g. Create → Execute → Measure)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stepLabel', type: 'string', title: 'Step Label (e.g. "Step 1")' },
            { name: 'stepName', type: 'string', title: 'Step Name (e.g. "Create")' },
            { name: 'description', type: 'text', title: 'Step Description' },
            { name: 'items', type: 'array', of: [{ type: 'string' }], title: 'Step Items / Bullet Points' },
          ],
          preview: {
            select: { title: 'stepName', subtitle: 'stepLabel' },
          },
        },
      ],
    }),

    // ── Case Studies (Brands primarily) ──
    defineField({
      name: 'caseStudySectionTitle',
      title: 'Case Study Section Title',
      type: 'string',
      group: 'caseStudies',
      description: 'e.g. "Our Case Studies"',
    }),
    defineField({
      name: 'caseStudySectionSubtitle',
      title: 'Case Study Section Subtitle',
      type: 'text',
      group: 'caseStudies',
      rows: 2,
    }),
    defineField({
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      group: 'caseStudies',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'client', type: 'string', title: 'Client Name' },
            { name: 'category', type: 'string', title: 'Category (e.g. Automotive)' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'duration', type: 'string', title: 'Duration (e.g. "90 days")' },
            { name: 'budget', type: 'string', title: 'Budget (e.g. "$250K")' },
            {
              name: 'metrics',
              type: 'array',
              title: 'Metrics',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Label' },
                    { name: 'value', type: 'string', title: 'Value' },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { title: 'client', subtitle: 'title' },
          },
        },
      ],
    }),

    // ── Feature Grid (Media Owners & Agencies) ──
    defineField({
      name: 'featureGridTitle',
      title: 'Feature Grid Section Title',
      type: 'string',
      group: 'featureGrid',
      description: 'e.g. "Everything Media Owners Need to Succeed"',
    }),
    defineField({
      name: 'featureGridSubtitle',
      title: 'Feature Grid Section Subtitle',
      type: 'text',
      group: 'featureGrid',
      rows: 2,
    }),
    defineField({
      name: 'featureGrid',
      title: 'Feature Grid Items',
      type: 'array',
      group: 'featureGrid',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'iconName', type: 'string', title: 'Icon Name (e.g. "ssp", "inventory", "yield")' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
    }),

    // ── Stats & Benefits ──
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      group: 'statsAndBenefits',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'label', type: 'string', title: 'Label' },
          ],
        },
      ],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      group: 'statsAndBenefits',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
            { name: 'image', type: 'image', title: 'Benefit Image', options: { hotspot: true } },
          ],
        },
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services/Solutions',
      type: 'array',
      group: 'statsAndBenefits',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
            { name: 'image', type: 'image', title: 'Service Image', options: { hotspot: true } },
            { name: 'offerings', type: 'array', of: [{ type: 'string' }], title: 'Offerings' },
          ],
        },
      ],
    }),

    // ── FAQs & SEO ──
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'faqsAndSeo',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer' },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'faqsAndSeo',
      description: 'Search engine optimization settings',
    }),
  ],
  preview: {
    select: {
      title: 'pageType',
      subtitle: 'title',
    },
    prepare({ title, subtitle }) {
      const pageNames: Record<string, string> = {
        agencies: 'Agencies',
        brands: 'Brands',
        'media-owners': 'Media Owners',
      }
      return {
        title: pageNames[title] || title,
        subtitle: subtitle,
      }
    },
  },
})
