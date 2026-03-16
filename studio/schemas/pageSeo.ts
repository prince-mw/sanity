import {defineField, defineType} from 'sanity'

// Schema for managing SEO of static pages
export default defineType({
  name: 'pageSeo',
  title: 'Page SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'pageId',
      title: 'Page Identifier',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          // Main pages
          {title: 'Home', value: 'home'},
          {title: 'About', value: 'about'},
          {title: 'Contact', value: 'contact'},
          {title: 'Platform', value: 'platform'},
          {title: 'Our Story', value: 'our-story'},
          {title: 'Our Journey', value: 'our-journey'},
          
          // Solutions
          {title: 'Brands', value: 'brands'},
          {title: 'Agencies', value: 'agencies'},
          {title: 'Media Owners', value: 'media-owners'},
          
          // Products
          {title: 'MW Planner', value: 'mw-planner'},
          {title: 'MW Activate', value: 'mw-activate'},
          {title: 'MW Measure', value: 'mw-measure'},
          {title: 'MW Market', value: 'mw-market'},
          {title: 'MW Influence', value: 'mw-influence'},
          {title: 'MW Studio', value: 'mw-studio'},
          {title: 'MW Science', value: 'mw-science'},
          
          // Resources listing pages
          {title: 'Blog', value: 'blog'},
          {title: 'Case Studies', value: 'case-studies'},
          {title: 'Webinars', value: 'webinars'},
          {title: 'Ebooks', value: 'ebooks'},
          {title: 'Whitepapers', value: 'whitepapers'},
          {title: 'Events', value: 'events'},
          {title: 'Press & News', value: 'press-news'},
          
          // Other pages
          {title: 'Careers', value: 'careers'},
          {title: 'Leadership', value: 'leadership'},
          {title: 'Locations', value: 'locations'},
          {title: 'Integrations', value: 'integrations'},
          {title: 'OOH Formats', value: 'ooh-formats'},
          
          // Industries
          {title: 'Retail', value: 'retail'},
          {title: 'Finance', value: 'finance'},
          {title: 'Healthcare', value: 'healthcare'},
          
          // Legal pages
          {title: 'Privacy Policy', value: 'privacy'},
          {title: 'Terms of Service', value: 'terms'},
          {title: 'Cookies Policy', value: 'cookies'},
          
          // Landing/Campaign pages
          {title: 'AdTech Company of Year', value: 'adtech-company-of-year'},
          {title: 'AI Powered Audience Targeting', value: 'ai-powered-audience-targeting'},
          {title: 'Series C Funding', value: 'series-c-funding'},
          {title: 'Transit Partnership', value: 'transit-partnership'},
          {title: 'Privacy First Measurement', value: 'privacy-first-measurement'},
          {title: 'London Headquarters', value: 'london-headquarters'},
          {title: 'Moving Hearts', value: 'movinghearts'},
          
          // Support/Documentation
          {title: 'Documentation', value: 'documentation'},
          {title: 'API Reference', value: 'api-reference'},
          {title: 'Help Center', value: 'help-center'},
          {title: 'Community', value: 'community'},
          {title: 'Sitemap', value: 'sitemap'},
        ],
      },
    }),
    defineField({
      name: 'pageName',
      title: 'Page Name',
      type: 'string',
      description: 'Display name for reference (e.g., "About Us Page")',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'pageName',
      subtitle: 'pageId',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || subtitle,
        subtitle: `/${subtitle}`,
      }
    },
  },
})
