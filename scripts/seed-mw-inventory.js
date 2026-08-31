const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // set this before running
})

async function run() {
  const product = await client.createIfNotExists({
    _id: 'product-mw-inventory',
    _type: 'product',
    name: 'MW Inventory',
    slug: { _type: 'slug', current: 'mw-inventory' },
    tagline: 'Turn Every Screen Into Revenue',
    description: 'Capture more revenue from your OOH inventory through streamlined management, real-time availability, and faster selling opportunities.',
    category: 'inventory',
    order: 8,
    isActive: true,
    isPublished: true,
    status: 'published',
    heroBadge: 'MW Inventory',
    heroTitle: 'Turn Every Screen Into Revenue',
    heroSubtitle: 'Capture more revenue from your OOH inventory through streamlined management, real-time availability, and faster selling opportunities.',
    ctaText: 'Get in Touch',
    ctaLink: '/contact',
  })
  console.log('product:', product._id)

  const pageSeo = await client.createIfNotExists({
    _id: 'pageSeo-mw-inventory',
    _type: 'pageSeo',
    pageId: 'mw-inventory',
    pageName: 'MW Inventory',
    seo: {
      _type: 'seo',
      metaTitle: 'MW Inventory - OOH Inventory Management | Moving Walls',
      metaDescription: 'Capture more revenue from your OOH inventory through streamlined management, real-time availability, and faster selling opportunities.',
    },
  })
  console.log('pageSeo:', pageSeo._id)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
