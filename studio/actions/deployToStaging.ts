import {DocumentActionComponent} from 'sanity'

// Staging deployment configuration (from environment)
const STAGING_URL = process.env.SANITY_STUDIO_STAGING_URL || 'https://manage-stg.movingwalls.com/test'
const STAGING_API_KEY = process.env.SANITY_STUDIO_STAGING_API_KEY || ''

// Custom action to deploy content to staging environment
export const deployToStagingAction: DocumentActionComponent = (props) => {
  const {published, draft} = props

  return {
    label: 'Deploy to Staging',
    tone: 'positive',
    onHandle: async () => {
      const doc = published || draft

      if (!doc) {
        return
      }

      try {
        // Build headers
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        }
        
        // Add API key if configured
        if (STAGING_API_KEY) {
          headers['Authorization'] = `Bearer ${STAGING_API_KEY}`
        }

        // Send deployment request to staging
        const response = await fetch(`${STAGING_URL}/api/deploy`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            documentId: doc._id,
            documentType: doc._type,
            slug: doc.slug?.current,
            title: doc.title || doc.name,
            action: 'deploy',
            timestamp: new Date().toISOString(),
          }),
        })

        if (!response.ok) {
          throw new Error(`Deploy failed: ${response.statusText}`)
        }

        // Show success notification
        alert('Successfully deployed to staging!')
      } catch (error) {
        console.error('Deploy to staging failed:', error)
        alert(`Deploy failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    },
  }
}
