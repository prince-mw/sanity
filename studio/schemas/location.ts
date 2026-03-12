import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({
      name: 'country',
      title: 'Country Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
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
      description: 'Primary city for this location',
    }),
    defineField({
      name: 'flag',
      title: 'Flag Emoji',
      type: 'string',
      description: 'Country flag emoji (e.g., 🇸🇬)',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief description for location cards',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      rows: 4,
      description: 'Detailed description for the location page hero',
    }),
    defineField({
      name: 'billboards',
      title: 'Billboard Count',
      type: 'string',
      description: 'e.g., "50,000+"',
    }),
    defineField({
      name: 'highVisibilityBillboards',
      title: 'High Visibility Billboards',
      type: 'array',
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
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'majorCities',
      title: 'Major Cities',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'mediaTypes',
      title: 'Media Types',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'icon', title: 'Icon Key', type: 'string', description: 'Icon identifier: digital, transit, bus, mall, highway, airport, static' },
            { name: 'description', title: 'Description', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'keyMarkets',
      title: 'Key Markets',
      type: 'array',
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
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'caseStudies',
      title: 'Featured Case Studies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'client', title: 'Client', type: 'string' },
            { name: 'results', title: 'Results', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which locations appear on the listing page',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Whether this location is published',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'country',
      subtitle: 'city',
      media: 'heroImage',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
