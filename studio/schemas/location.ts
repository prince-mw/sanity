import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'content', title: 'Content' },
    { name: 'markets', title: 'Markets & Stats' },
    { name: 'billboards', title: 'Billboards' },
    { name: 'meta', title: 'Settings & SEO' },
  ],
  fields: [
    // Basic Info Group
    defineField({
      name: 'country',
      title: 'Country Name',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'country',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'Main City',
      type: 'string',
      group: 'basic',
      description: 'Primary city for this location',
    }),
    defineField({
      name: 'flag',
      title: 'Flag Emoji',
      type: 'string',
      group: 'basic',
      description: 'Country flag emoji (e.g., 🇸🇬)',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'basic',
      options: { hotspot: true },
    }),
    
    // Content Group
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      group: 'content',
      rows: 2,
      description: 'Brief description for location cards',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      group: 'content',
      rows: 4,
      description: 'Detailed description for the location page hero',
    }),
    defineField({
      name: 'whyInvest',
      title: 'Why Invest List',
      type: 'array',
      group: 'content',
      description: 'List of reasons to invest in OOH in this country',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' },
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),
    
    // Markets & Stats Group
    defineField({
      name: 'billboards',
      title: 'Billboard Count',
      type: 'string',
      group: 'markets',
      description: 'e.g., "50,000+"',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      group: 'markets',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'majorCities',
      title: 'Major Cities',
      type: 'array',
      group: 'markets',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'mediaTypes',
      title: 'Media Types',
      type: 'array',
      group: 'markets',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'icon', title: 'Icon Key', type: 'string', description: 'Icon identifier: digital, transit, bus, mall, highway, airport, static' },
            { name: 'description', title: 'Description', type: 'string' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'description' },
          },
        },
      ],
    }),
    defineField({
      name: 'keyMarkets',
      title: 'Key Markets',
      type: 'array',
      group: 'markets',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'city', title: 'City', type: 'string' },
            { name: 'code', title: 'Code', type: 'string' },
            { name: 'population', title: 'Population', type: 'string' },
            { name: 'screens', title: 'Screens Count', type: 'number' },
            { name: 'screensGrowth', title: 'Screens Growth %', type: 'number' },
            { name: 'dailyReach', title: 'Daily Reach', type: 'string' },
            { name: 'dailyReachGrowth', title: 'Daily Reach Growth %', type: 'number' },
            { name: 'monthlyImpressions', title: 'Monthly Impressions', type: 'string' },
            { name: 'monthlyImpressionsGrowth', title: 'Monthly Impressions Growth %', type: 'number' },
            { name: 'yoyGrowth', title: 'Year-over-Year Growth %', type: 'number' },
            { name: 'avgDwell', title: 'Average Dwell Time', type: 'string' },
            { name: 'peakHours', title: 'Peak Hours', type: 'string' },
            { name: 'topCategory', title: 'Top Category', type: 'string' },
            { name: 'viewability', title: 'Viewability %', type: 'number' },
            { name: 'description', title: 'Description', type: 'text' },
            {
              name: 'locations',
              title: 'Locations',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Name', type: 'string' },
                    { name: 'desc', title: 'Description', type: 'string' },
                    { name: 'traffic', title: 'Traffic', type: 'number' },
                    { name: 'screens', title: 'Screens', type: 'number' },
                    { name: 'score', title: 'Score', type: 'number' },
                  ],
                  preview: {
                    select: { title: 'name', subtitle: 'desc' },
                  },
                },
              ],
            },
            {
              name: 'audience',
              title: 'Audience',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Name', type: 'string' },
                    { name: 'percentage', title: 'Percentage', type: 'number' },
                    { name: 'color', title: 'Color Class', type: 'string' },
                  ],
                  preview: {
                    select: { title: 'name', subtitle: 'percentage' },
                    prepare({ title, subtitle }) {
                      return { title, subtitle: subtitle ? `${subtitle}%` : '' }
                    },
                  },
                },
              ],
            },
            {
              name: 'mediaFormats',
              title: 'Media Formats',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Name', type: 'string' },
                    { name: 'percentage', title: 'Percentage', type: 'number' },
                  ],
                  preview: {
                    select: { title: 'name', subtitle: 'percentage' },
                    prepare({ title, subtitle }) {
                      return { title, subtitle: subtitle ? `${subtitle}%` : '' }
                    },
                  },
                },
              ],
            },
            {
              name: 'hourlyData',
              title: 'Hourly Data (24 values)',
              type: 'array',
              of: [{ type: 'number' }],
            },
          ],
          preview: {
            select: { title: 'city', code: 'code', screens: 'screens' },
            prepare({ title, code, screens }) {
              return {
                title: `${title} ${code ? `(${code})` : ''}`,
                subtitle: screens ? `${screens.toLocaleString()} screens` : '',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'caseStudies',
      title: 'Featured Case Studies',
      type: 'array',
      group: 'markets',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'client', title: 'Client', type: 'string' },
            { name: 'results', title: 'Results', type: 'string' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'client' },
          },
        },
      ],
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      group: 'markets',
      of: [{ type: 'string' }],
    }),
    
    // Billboards Group
    defineField({
      name: 'highVisibilityBillboards',
      title: 'High Visibility Billboards',
      type: 'array',
      group: 'billboards',
      description: 'Featured billboards with high visibility',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'location', title: 'Location', type: 'string' },
            { name: 'reach', title: 'Reach', type: 'string', description: 'e.g., "132,145"' },
            { name: 'impressions', title: 'Impressions', type: 'string', description: 'e.g., "1,075,680"' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'name', subtitle: 'location', media: 'image' },
          },
        },
      ],
    }),
    
    // Settings & SEO Group
    defineField({
      name: 'contactFormUrl',
      title: 'Contact Form URL',
      type: 'url',
      group: 'meta',
      description: 'Country-specific Zoho contact form URL',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'meta',
      description: 'Order in which locations appear on the listing page',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      group: 'meta',
      description: 'Whether this location is published',
      initialValue: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'meta',
      description: 'Search engine optimization settings',
    }),
  ],
  preview: {
    select: {
      title: 'country',
      subtitle: 'city',
      flag: 'flag',
      media: 'heroImage',
      isActive: 'isActive',
      order: 'order',
    },
    prepare({ title, subtitle, flag, media, isActive, order }) {
      return {
        title: `${flag || ''} ${title || 'Untitled'}`.trim(),
        subtitle: `${subtitle || ''} ${!isActive ? '(Draft)' : ''} ${order ? `#${order}` : ''}`.trim(),
        media,
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
      title: 'Country Name (A-Z)',
      name: 'countryAsc',
      by: [{ field: 'country', direction: 'asc' }],
    },
  ],
})
