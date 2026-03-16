import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

// Singleton document types - only one document should exist
const singletonTypes = ['analyticsConfig']

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
      // Singleton: Analytics & Tracking (at bottom)
      S.listItem()
        .title('Analytics & Tracking')
        .id('analyticsConfig')
        .icon(() => '📊')
        .child(
          S.document()
            .schemaType('analyticsConfig')
            .documentId('analyticsConfig')
            .title('Analytics & Tracking')
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
