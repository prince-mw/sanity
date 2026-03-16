import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

// Preview configuration
const PREVIEW_SECRET = process.env.SANITY_STUDIO_PREVIEW_SECRET || 'preview-secret-key'
const PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// URL resolver for preview
function resolvePreviewUrl(doc: any): string | null {
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

  const basePath = typeToPath[doc._type]
  if (basePath === undefined) return null

  const slug = doc.slug?.current
  if (!slug && basePath !== '') return null

  const previewPath = basePath ? `${basePath}/${slug}` : `/${slug}`
  return `${PREVIEW_URL}/api/preview?secret=${PREVIEW_SECRET}&type=${doc._type}&slug=${slug || ''}`
}

// Singleton document types - only one document should exist
const singletonTypes = ['analyticsConfig', 'megaMenu']

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
  title: 'MovingWalls Website',

  projectId: 'u10im6di',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
  ],

  // Add document actions for preview
  document: {
    actions: (prev, context) => {
      // Add preview action for content types that support preview
      const previewTypes = ['blogPost', 'caseStudy', 'pressRelease', 'event', 'webinar', 'ebook', 'whitepaper', 'product', 'landingPage']
      
      if (previewTypes.includes(context.schemaType)) {
        return [
          ...prev,
          // Custom preview action
          (props: any) => {
            const {draft, published} = props
            const doc = draft || published
            
            if (!doc?.slug?.current) {
              return null
            }
            
            return {
              label: 'Open Preview',
              icon: () => '👁️',
              onHandle: () => {
                const url = resolvePreviewUrl(doc)
                if (url) {
                  window.open(url, '_blank')
                }
              },
            }
          },
        ]
      }
      
      return prev
    },
  },

  schema: {
    types: schemaTypes,
  },
})
