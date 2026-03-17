import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {Iframe} from 'sanity-plugin-iframe-pane'
import {schemaTypes} from './schemas'

// Preview configuration
const PREVIEW_SECRET = process.env.SANITY_STUDIO_PREVIEW_SECRET || 'preview-secret-key'
const PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// Content types that support preview
const previewTypes = ['blogPost', 'caseStudy', 'pressRelease', 'event', 'webinar', 'ebook', 'whitepaper', 'product', 'landingPage']

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
const singletonTypes = ['analyticsConfig', 'megaMenu']

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

// Custom structure for singletons
const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // All other document types (excluding singletons)
      ...S.documentTypeListItems().filter(
        (listItem: any) => !singletonTypes.includes(listItem.getId())
      ),
      S.divider(),
      // Singleton: Analytics & Tracking
      S.listItem()
        .title('Analytics & Tracking')
        .id('analyticsConfig')
        .child(
          S.document()
            .schemaType('analyticsConfig')
            .documentId('analyticsConfig')
            .title('Analytics & Tracking')
        ),
      // Mega Menu at the bottom
      S.listItem()
        .title('Mega Menu')
        .id('megaMenu')
        .child(
          S.document()
            .schemaType('megaMenu')
            .documentId('megaMenu')
            .title('Mega Menu Configuration')
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
  ],

  // Document actions configuration
  document: {
    actions: (prev, context) => {
      // For singleton types, remove delete action
      if (singletonTypes.includes(context.schemaType)) {
        return prev.filter(
          (action) => action.action !== 'delete' && action.action !== 'duplicate'
        )
      }
      
      // For all other types, return all default actions (including delete, archive, duplicate)
      return prev
    },
  },

  schema: {
    types: schemaTypes,
  },
})
