import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    {name: 'basic', title: 'Basic Info', default: true},
    {name: 'hero', title: 'Hero Section'},
    {name: 'painPoints', title: 'Pain Points'},
    {name: 'features', title: 'Features'},
    {name: 'howItWorks', title: 'How It Works'},
    {name: 'social', title: 'Social Proof'},
    {name: 'resources', title: 'Resources'},
    {name: 'publishing', title: 'Publishing'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Publishing controls
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Toggle to show/hide this product on the website',
      initialValue: true,
      group: 'publishing',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: '📝 Draft', value: 'draft'},
          {title: '✅ Published', value: 'published'},
          {title: '📦 Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'published',
      group: 'publishing',
    }),
    defineField({
      name: 'scheduledPublishAt',
      title: 'Scheduled Publish Date',
      type: 'datetime',
      description: 'Set a future date to automatically publish this content',
      group: 'publishing',
    }),
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short marketing tagline for the product',
      group: 'basic',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief product description for hero section',
      group: 'basic',
    }),
    defineField({
      name: 'icon',
      title: 'Product Icon',
      type: 'string',
      description: 'Icon name or identifier',
      group: 'basic',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'hero',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Planning', value: 'planning' },
          { title: 'Activation', value: 'activation' },
          { title: 'Measurement', value: 'measurement' },
          { title: 'Intelligence', value: 'intelligence' },
          { title: 'Creative', value: 'creative' },
        ],
      },
      group: 'basic',
    }),
    // ============== HERO SECTION ==============
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'string',
      description: 'Small badge/label above the title (e.g., "AI-Powered", "New Feature")',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main headline for the hero section (defaults to product name if empty)',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'Supporting text under the headline',
      group: 'hero',
    }),
    defineField({
      name: 'heroGradient',
      title: 'Hero Background Gradient',
      type: 'string',
      options: {
        list: [
          { title: 'Blue to Indigo (Default)', value: 'blue-indigo' },
          { title: 'Green to Teal', value: 'green-teal' },
          { title: 'Purple to Pink', value: 'purple-pink' },
          { title: 'Orange to Red', value: 'orange-red' },
          { title: 'Dark Slate', value: 'dark-slate' },
        ],
      },
      initialValue: 'blue-indigo',
      group: 'hero',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video URL',
      type: 'url',
      description: 'YouTube or Vimeo URL for hero video',
      group: 'hero',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text', initialValue: 'Watch Demo' },
        { name: 'link', type: 'string', title: 'Link URL' },
        { name: 'isVideo', type: 'boolean', title: 'Opens Video Modal', initialValue: false },
      ],
      group: 'hero',
    }),
    defineField({
      name: 'heroStats',
      title: 'Hero Stats',
      type: 'array',
      description: 'Quick stats displayed in the hero section',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value', description: 'e.g., 500M+, 94%' },
            { name: 'label', type: 'string', title: 'Label', description: 'e.g., Impressions Tracked' },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
      group: 'hero',
    }),
    // ============== PAIN POINTS SECTION ==============
    defineField({
      name: 'painPointsTitle',
      title: 'Pain Points Section Title',
      type: 'string',
      initialValue: 'The Problem We Solve',
      group: 'painPoints',
    }),
    defineField({
      name: 'painPointsSubtitle',
      title: 'Pain Points Section Subtitle',
      type: 'text',
      rows: 2,
      group: 'painPoints',
    }),
    defineField({
      name: 'painPoints',
      title: 'Pain Points',
      type: 'array',
      description: 'Customer challenges this product solves',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string', title: 'Icon Name', description: 'Icon identifier (e.g., chart-bar, clock, currency)' },
            { name: 'title', type: 'string', title: 'Pain Point Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'beforeState', type: 'string', title: 'Before (Without Product)', description: 'e.g., "Manual planning takes 2 weeks"' },
            { name: 'afterState', type: 'string', title: 'After (With Product)', description: 'e.g., "AI planning in 2 hours"' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
      group: 'painPoints',
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string', title: 'Icon' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'metric', type: 'string', title: 'Metric/Stat', description: 'Optional performance metric' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
      group: 'features',
    }),
    defineField({
      name: 'featuresTitle',
      title: 'Features Section Title',
      type: 'string',
      initialValue: 'Powerful Features',
      group: 'features',
    }),
    defineField({
      name: 'featuresSubtitle',
      title: 'Features Section Subtitle',
      type: 'text',
      rows: 2,
      group: 'features',
    }),
    defineField({
      name: 'featuresLayout',
      title: 'Features Layout',
      type: 'string',
      options: {
        list: [
          { title: '2 Columns', value: '2-col' },
          { title: '3 Columns', value: '3-col' },
          { title: 'Alternating', value: 'alternating' },
        ],
      },
      initialValue: '3-col',
      group: 'features',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of product benefits',
      group: 'features',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value', description: 'e.g., 99.9%, 500M+' },
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'growth', type: 'number', title: 'Growth %', description: 'Optional YoY growth' },
          ],
        },
      ],
      group: 'features',
    }),
    defineField({
      name: 'integrations',
      title: 'Integration Partners',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Partner Name' },
            { name: 'logo', type: 'image', title: 'Partner Logo' },
            { name: 'category', type: 'string', title: 'Category', options: { list: ['SSP', 'DSP', 'Data', 'Measurement', 'Creative', 'CMS', 'Analytics'] } },
          ],
          preview: {
            select: { title: 'name', subtitle: 'category', media: 'logo' },
          },
        },
      ],
      group: 'social',
    }),
    defineField({
      name: 'integrationsTitle',
      title: 'Integrations Section Title',
      type: 'string',
      initialValue: "Don't Replace. Integrate.",
      group: 'social',
    }),
    defineField({
      name: 'integrationsSubtitle',
      title: 'Integrations Section Subtitle',
      type: 'text',
      rows: 2,
      group: 'social',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote', type: 'text', title: 'Quote' },
            { name: 'author', type: 'string', title: 'Author Name' },
            { name: 'role', type: 'string', title: 'Role' },
            { name: 'company', type: 'string', title: 'Company' },
            { name: 'avatar', type: 'image', title: 'Author Photo', options: { hotspot: true } },
            { name: 'metric', type: 'string', title: 'Success Metric', description: 'e.g., 45% ROI increase' },
          ],
          preview: {
            select: { title: 'author', subtitle: 'company', media: 'avatar' },
          },
        },
      ],
      group: 'social',
    }),
    defineField({
      name: 'testimonialsTitle',
      title: 'Testimonials Section Title',
      type: 'string',
      initialValue: 'What Our Customers Say',
      group: 'social',
    }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'industry', type: 'string', title: 'Industry' },
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'title', subtitle: 'industry', media: 'image' },
          },
        },
      ],
      group: 'features',
    }),
    // ============== HOW IT WORKS SECTION ==============
    defineField({
      name: 'howItWorksTitle',
      title: 'How It Works Section Title',
      type: 'string',
      initialValue: 'How It Works',
      group: 'howItWorks',
    }),
    defineField({
      name: 'howItWorksSubtitle',
      title: 'How It Works Subtitle',
      type: 'text',
      rows: 2,
      group: 'howItWorks',
    }),
    defineField({
      name: 'howItWorksSteps',
      title: 'How It Works Steps',
      type: 'array',
      description: 'Step-by-step process for using the product',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stepNumber', type: 'number', title: 'Step Number' },
            { name: 'title', type: 'string', title: 'Step Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
            { name: 'image', type: 'image', title: 'Step Image', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description', stepNumber: 'stepNumber' },
            prepare({ title, subtitle, stepNumber }) {
              return {
                title: `Step ${stepNumber || '?'}: ${title}`,
                subtitle,
              }
            },
          },
        },
      ],
      group: 'howItWorks',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Get Started',
      group: 'basic',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      initialValue: '/contact',
      group: 'basic',
    }),
    defineField({
      name: 'demoVideo',
      title: 'Demo Video URL',
      type: 'url',
      group: 'hero',
    }),
    // ============== RESOURCES SECTION ==============
    defineField({
      name: 'resourcesTitle',
      title: 'Resources Section Title',
      type: 'string',
      initialValue: 'Resources',
      group: 'resources',
    }),
    defineField({
      name: 'relatedCaseStudies',
      title: 'Related Case Studies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
      description: 'Select related case studies to display',
      group: 'resources',
    }),
    defineField({
      name: 'relatedBlogPosts',
      title: 'Related Blog Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      description: 'Select related blog posts to display',
      group: 'resources',
    }),
    defineField({
      name: 'relatedWhitepapers',
      title: 'Related Whitepapers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'whitepaper' }] }],
      description: 'Select related whitepapers/ebooks to display',
      group: 'resources',
    }),
    defineField({
      name: 'externalResources',
      title: 'External Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'string', title: 'Description' },
            { name: 'url', type: 'url', title: 'URL' },
            { name: 'type', type: 'string', title: 'Type', options: { list: ['Documentation', 'API Reference', 'Video Tutorial', 'Webinar', 'Guide'] } },
          ],
          preview: {
            select: { title: 'title', subtitle: 'type' },
          },
        },
      ],
      group: 'resources',
    }),
    // ============== FINAL CTA SECTION ==============
    defineField({
      name: 'finalCtaTitle',
      title: 'Final CTA Title',
      type: 'string',
      description: 'Headline for the bottom CTA section',
      initialValue: 'Ready to Get Started?',
      group: 'resources',
    }),
    defineField({
      name: 'finalCtaSubtitle',
      title: 'Final CTA Subtitle',
      type: 'text',
      rows: 2,
      group: 'resources',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Search engine optimization settings',
      group: 'seo',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Legacy)',
      type: 'string',
      description: 'Legacy SEO title field - use the SEO object above instead',
      hidden: true,
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (Legacy)',
      type: 'text',
      description: 'Legacy SEO description field - use the SEO object above instead',
      hidden: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'publishing',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active (Legacy)',
      type: 'boolean',
      initialValue: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'heroImage',
      isPublished: 'isPublished',
      status: 'status',
    },
    prepare(selection) {
      const {title, subtitle, media, isPublished, status} = selection
      const statusBadge = status === 'archived' ? '📦' : (status === 'draft' || isPublished === false) ? '📝' : '✅'
      return {
        title: `${statusBadge} ${title}`,
        subtitle,
        media,
      }
    },
  },
})
