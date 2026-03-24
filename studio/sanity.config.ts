import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {Iframe} from 'sanity-plugin-iframe-pane'
import {schemaTypes} from './schemas'
import {seoDashboardTool} from './components/seo-dashboard'

// Preview configuration
const PREVIEW_SECRET = process.env.SANITY_STUDIO_PREVIEW_SECRET || 'preview-secret-key'
const PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// Content types that support preview
const previewTypes = ['blogPost', 'caseStudy', 'pressRelease', 'event', 'webinar', 'ebook', 'whitepaper', 'product', 'landingPage', 'location']

// Type to URL path mapping
const typeToPath: Record<string, string> = {
  blogPost: '/blog',
  caseStudy: '/case-studies',
  pressRelease: '/press-news',
  event: '/events',
  webinar: '/webinars',
  ebook: '/ebooks',
  whitepaper: '/whitepapers',
  product: '/products',
  landingPage: '',
  location: '/locations',
}

// URL resolver for preview
function resolvePreviewUrl(doc: any): string | null {
  const basePath = typeToPath[doc._type]
  if (basePath === undefined) return null

  const slug = doc.slug?.current
  if (!slug && basePath !== '') return null

  return `${PREVIEW_URL}/api/preview?secret=${PREVIEW_SECRET}&type=${doc._type}&slug=${slug || ''}`
}

// Singleton document types - only one document should exist
const singletonTypes = ['analyticsConfig', 'megaMenu', 'redirectSettings', 'careersPage', 'footerConfig', 'contactPage']

// Supported languages for i18n
const supportedLanguages = [
  {id: 'en', title: 'English', isDefault: true},
  {id: 'zh', title: '中文 (Chinese)'},
  {id: 'ja', title: '日本語 (Japanese)'},
  {id: 'ko', title: '한국어 (Korean)'},
  {id: 'id', title: 'Bahasa Indonesia'},
]

// Content types that support workflow
const workflowTypes = ['blogPost', 'caseStudy', 'pressRelease', 'event', 'webinar', 'ebook', 'whitepaper']

// Default document node with preview pane
const defaultDocumentNode = (S: any, {schemaType}: {schemaType: string}) => {
  // Only add preview pane for content types that support it
  if (previewTypes.includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: (doc: any) => resolvePreviewUrl(doc),
          reload: {
            button: true,
          },
        })
        .title('Preview'),
    ])
  }
  return S.document().views([S.view.form()])
}

// Custom structure for better organization
const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // Content section
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items([
              S.documentTypeListItem('blogPost').title('Blog Posts'),
              S.documentTypeListItem('caseStudy').title('Case Studies'),
              S.documentTypeListItem('pressRelease').title('Press & News'),
              S.documentTypeListItem('event').title('Events'),
              S.documentTypeListItem('webinar').title('Webinars'),
              S.documentTypeListItem('ebook').title('E-books'),
              S.documentTypeListItem('whitepaper').title('Whitepapers'),
            ])
        ),
      // Products & Pages
      S.listItem()
        .title('Products & Pages')
        .child(
          S.list()
            .title('Products & Pages')
            .items([
              S.documentTypeListItem('product').title('Products'),
              S.documentTypeListItem('landingPage').title('Landing Pages'),
              S.documentTypeListItem('companyPage').title('Company Pages'),
              S.documentTypeListItem('industryPage').title('Industry Pages'),
              S.documentTypeListItem('audiencePage').title('Audience Pages'),
            ])
        ),
      // Team & Organization
      S.listItem()
        .title('Team & Organization')
        .child(
          S.list()
            .title('Team & Organization')
            .items([
              S.documentTypeListItem('teamMember').title('Team Members'),
              S.documentTypeListItem('jobPosition').title('Job Positions'),
              S.documentTypeListItem('office').title('Offices'),
              S.listItem()
                .title('Locations')
                .schemaType('location')
                .child(
                  S.documentTypeList('location')
                    .title('Locations')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                    .filter('_type == "location"')
                    .menuItems([
                      S.orderingMenuItem({ title: 'Display Order', by: [{ field: 'order', direction: 'asc' }] }),
                      S.orderingMenuItem({ title: 'Country (A-Z)', by: [{ field: 'country', direction: 'asc' }] }),
                    ])
                ),
            ])
        ),
      // Reusable Blocks
      S.listItem()
        .title('Reusable Blocks')
        .child(
          S.list()
            .title('Reusable Blocks')
            .items([
              S.documentTypeListItem('reusableTestimonial').title('Testimonials'),
              S.documentTypeListItem('reusableStatBlock').title('Statistics Blocks'),
              S.documentTypeListItem('reusableCTA').title('Call-to-Action Blocks'),
            ])
        ),
      // Taxonomies
      S.listItem()
        .title('Taxonomies')
        .child(
          S.list()
            .title('Taxonomies')
            .items([
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
              S.documentTypeListItem('integration').title('Integrations'),
              S.documentTypeListItem('oohFormat').title('OOH Formats'),
            ])
        ),
      S.divider(),
      // Settings section
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Analytics & Tracking')
                .id('analyticsConfig')
                .child(
                  S.document()
                    .schemaType('analyticsConfig')
                    .documentId('analyticsConfig')
                    .title('Analytics & Tracking')
                ),
              S.listItem()
                .title('Mega Menu')
                .id('megaMenu')
                .child(
                  S.document()
                    .schemaType('megaMenu')
                    .documentId('megaMenu')
                    .title('Mega Menu Configuration')
                ),
              S.listItem()
                .title('URL Redirects')
                .id('redirectSettings')
                .child(
                  S.document()
                    .schemaType('redirectSettings')
                    .documentId('redirectSettings')
                    .title('URL Redirects')
                ),
              S.documentTypeListItem('pageSeo').title('Page SEO Settings'),
              S.documentTypeListItem('zohoForm').title('Zoho Forms'),
              S.listItem()
                .title('Careers Page')
                .id('careersPage')
                .child(
                  S.document()
                    .schemaType('careersPage')
                    .documentId('careersPage')
                    .title('Careers Page Content')
                ),
              S.listItem()
                .title('Footer')
                .id('footerConfig')
                .child(
                  S.document()
                    .schemaType('footerConfig')
                    .documentId('footerConfig')
                    .title('Footer Configuration')
                ),
              S.listItem()
                .title('Contact Page')
                .id('contactPage')
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('contactPage')
                    .title('Contact Page Content')
                ),
            ])
        ),
    ])

export default defineConfig({
  name: 'movingwalls-website',
  title: 'Moving Walls Website',

  projectId: 'u10im6di',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    visionTool(),
    media(),
    seoDashboardTool(),
  ],

  // Form configuration for media asset source
  form: {
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
          .concat(mediaAssetSource)
      },
    },
  },

  // Document actions configuration
  document: {
    actions: (prev, context) => {
      // For singleton types, remove delete action
      if (singletonTypes.includes(context.schemaType)) {
        return prev.filter(
          (action) => action.action !== 'delete' && action.action !== 'duplicate'
        )
      }
      
      // For all other types, return all default actions
      return prev
    },
  },

  schema: {
    types: schemaTypes,
  },
})
