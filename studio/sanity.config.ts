import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

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

  schema: {
    types: schemaTypes,
  },
})
