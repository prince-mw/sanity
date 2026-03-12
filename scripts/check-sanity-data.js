const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function checkData() {
  console.log('📊 Checking Sanity Data Counts...\n')
  
  const types = [
    'blogPost',
    'caseStudy',
    'pressRelease',
    'event',
    'teamMember',
    'webinar',
    'ebook',
    'whitepaper',
    'jobPosition',
    'product',
    'companyPage',
    'timelineEvent',
    'office',
    'location',
  ]
  
  for (const type of types) {
    try {
      const count = await client.fetch(`count(*[_type == "${type}"])`)
      const status = count > 0 ? '✅' : '❌'
      console.log(`${status} ${type}: ${count} items`)
    } catch (error) {
      console.log(`⚠️  ${type}: Error - ${error.message}`)
    }
  }
}

checkData()
