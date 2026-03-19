/**
 * Seed Zoho Forms to Sanity CMS
 * Run with: node scripts/seed-zoho-forms-to-sanity.js
 */

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// E-book download forms data
const zohoForms = [
  {
    name: 'Traffic Insights E-book Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/DownloadoureBookSingaporeMobilityReport/formperma/434CW-fcXjXe9D79LMsxr61WP9ATilfqBD1eUUEpKIg',
    formType: 'ebook',
    ebookSlug: 'traffic-insights',
    description: 'How are your audience moving? Traffic Insights',
  },
  {
    name: 'Video Outside Playbook Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MSAPxMWvideooutsideplaybook/formperma/mysKm2rrSu5i-hXdl-Yj3_sEjGCYyHCRUAolIUkEQ3s',
    formType: 'ebook',
    ebookSlug: 'video-outside-playbook',
    description: 'MSAP x MW Video Outside Playbook',
  },
  {
    name: 'Ultimate Guide to DOOH 2019 Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/TourUltimateguideforDOOH2019/formperma/6EQA9DMhhs9YUjaes9vw3cgzRjO-DA6MSVscWtXpWuk',
    formType: 'ebook',
    ebookSlug: 'digital-out-of-home',
    description: 'Your Ultimate Guide to Digital Out-Of-Home',
  },
  {
    name: 'Outernet DOOH Impression Multiplier Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/DOOHImpressionMultiplierBestPractices/formperma/sDt2s6iE16h1qr0DGF0EfoAVXOFm0DwiFXLV3_RGhiM',
    formType: 'ebook',
    ebookSlug: 'outernet-dooh-impression-multiplier-ebook',
    description: 'Unlocking the Power of the Outernet 2023',
  },
  {
    name: 'India Playbook 2023 Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MWOOHinIndiaGuideBook/formperma/G7l3pD-gZvrFcHYKS7cHVAfyU4sGDluBPeOpXD9t1_4',
    formType: 'ebook',
    ebookSlug: 'india-playbook-2023',
    description: 'Sustainable, Inclusive, Innovation is Fueling India',
  },
  {
    name: 'Foodpanda Playbook Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/DownloadnowFoodpanda/formperma/l6r1fTuE60W95cuqyRDebRX2xrJQopuRuzsBAbPTsZg',
    formType: 'ebook',
    ebookSlug: 'foodpandas-playbook',
    description: 'Optimising DOOH: Foodpanda\'s Playbook for OOH Media',
  },
  {
    name: 'ICC Coffee Table Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/GetyourCopy1/formperma/uTCJUx-ZnNx2CY4KcFu7857hXhJJU-6a0cOsyuXMQC0',
    formType: 'ebook',
    ebookSlug: 'icc-coffee-table-ebook',
    description: 'ICC Coffee Table: Activate Your Fans, Grow Your Viewership',
  },
  {
    name: 'Enhanced Customer Experience CMS Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MWCMSdownloadform/formperma/zRHQWcoroMDJtb7FYeYedbw7tpL2BGcZNaiLLfuHuQw',
    formType: 'ebook',
    ebookSlug: 'enhanced-customer-experience',
    description: 'Enhanced Customer Experience with CMS',
  },
  {
    name: 'Always On DOOH Advertising Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/GetyourCopy/formperma/Ykc5x3Gjs9hR0ptPlzia5nBOW7BajsW7XH9Un3pqDRk',
    formType: 'ebook',
    ebookSlug: 'dooh-advertising',
    description: 'Always On DOOH Advertising',
  },
  {
    name: 'Mastering DOOH Malaysia Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MasteringDOOHMalaysiaGuideBook/formperma/7OTZisxT-Kt20caV32XeRnSLaA_1dJ3ZVg9QA8Mua8k',
    formType: 'ebook',
    ebookSlug: 'mastering-digital-out-of-home-in-malaysia',
    description: 'Mastering Digital Out-of-Home in Malaysia',
  },
  {
    name: 'Outernet Playbook Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MWEbookTheOuternetPlaybook/formperma/FnJwRwTBnj452YH5Twnzp8q0Jx_eM8UBnK2SCf79jlo',
    formType: 'ebook',
    ebookSlug: 'navigating-outside-the-home-media-using-data-and-emerging-technology',
    description: 'Navigating Outside the Home Media Using Data and Emerging Technology',
  },
  {
    name: 'Cyber Security Guide Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MWCyberSecurity/formperma/50l2LdDm2iPT6gzop7rT5j4S7_UnB93IrtvvxNa8oIk',
    formType: 'ebook',
    ebookSlug: 'your-guide-to-digital-signage-and-dooh-screens',
    description: 'Your Guide to Cyber Security for Digital Signage and OOH Screens',
  },
  {
    name: 'Ultimate Guide to DOOH 2024 Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/UltimateGuide2024/formperma/B7fTxWA7vcEy8yH2vTu_PKOyvbQGvpAZaLlywS2zlyw',
    formType: 'ebook',
    ebookSlug: 'ultimate-guide-to-dooh-2024',
    description: 'Ultimate Guide to DOOH 2024',
  },
  {
    name: 'Why OOH Marketing Plan Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MWWhitepaperPDF/formperma/5mWq9qw4Yv43tqlKaO36Izdy2qWpcWR10BN5jFWlI-0',
    formType: 'ebook',
    ebookSlug: 'why-out-of-home-ooh-must-be-part-of-your-marketing-plan',
    description: 'Why Out-of-Home (OOH) Must Be Part of Your Marketing Plan',
  },
  {
    name: 'Vietnam DOOH Future 2025 Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/VietnamWhitepaper2025/formperma/ZNHcU_lXQbVIk-ryZgoFEyX9VH__C3Rs5QoLJ_p425E',
    formType: 'ebook',
    ebookSlug: 'the-future-of-ooh-dooh-in-vietnam',
    description: 'The Future of OOH & DOOH in Vietnam: Trends, Innovation, and Market Predictions for 2025',
  },
  {
    name: 'Malaysia DOOH Future 2025 Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MalaysianWhitePaper2024/formperma/xkvZpPCjK8hDr7QkTjv3QUEhgcPwHim1SM9k5_e53A4',
    formType: 'ebook',
    ebookSlug: 'download-future-ooh-dooh-malaysia-trends-2025',
    description: 'The Future of OOH & DOOH in Malaysia: Trends, Innovation, and Market Predictions for 2025',
  },
  {
    name: 'Japan DOOH Future 2025 Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/JapaneseWhitePaper2025/formperma/pzKl8bexgAwKqLu6io0X9O_O0GfJGfyOkdJDRU0g3I8',
    formType: 'ebook',
    ebookSlug: 'download-the-future-of-ooh-dooh-in-japan',
    description: 'The Future of OOH & DOOH in Japan: Trends, Innovation, and Market Predictions for 2025',
  },
  {
    name: 'Sustainability in OOH Media Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/SustainabilityinOOHMedia/formperma/MdsP9HtbIKOw4Y3y7kAASuVZQ7EK3BIHaaHZshRVPW8',
    formType: 'ebook',
    ebookSlug: 'sustainability-in-out-of-home-media-an-open-source-industry-guide',
    description: 'Sustainability in Out-of-Home Media: An Open-Source Industry Roadmap',
  },
  {
    name: 'Last Mile Advertising Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/NRFEbook/formperma/zVx3pAuj9JXqLquZtYTBXDzJh0Lt5oWtmdfc7zUMDY8',
    formType: 'ebook',
    ebookSlug: 'solutions-by-moving-walls-unlocking-the-power-of-last-mile-advertising',
    description: 'Solutions by MovingWalls: Unlocking the Power of Last Mile Advertising',
  },
  {
    name: 'Ultimate Guide to pDOOH 2026 Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/UltimateguidetopDOOH2026/formperma/lh-RJZpwgG7umkisEu66RuW4E5jaRdbetrS2CiNAbxc',
    formType: 'ebook',
    ebookSlug: 'ultimate-guide-to-programmatic-out-of-home-advertising',
    description: 'The Ultimate Guide to Programmatic Out-of-Home Advertising',
  },
  {
    name: 'RMS for Media Owners Form',
    formUrl: 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/RMSeBook/formperma/5CQiRh7u0fQDI_eUbi7CkZHODUaOZKcgUpl7_g7XALE',
    formType: 'ebook',
    ebookSlug: 'unlock-rms-power-for-media-owners',
    description: 'Unlock the Power of Revenue Management Systems (RMS) for Media Owners',
  },
]

async function seedZohoForms() {
  console.log('🚀 Starting Zoho Forms seeding...')
  console.log(`📝 Processing ${zohoForms.length} forms...\n`)

  const results = { created: 0, updated: 0, errors: 0, linked: 0 }

  for (const form of zohoForms) {
    const documentId = `zoho-form-${form.ebookSlug}`
    
    try {
      // Check if form already exists
      const existing = await client.fetch(
        `*[_type == "zohoForm" && _id == $id][0]`,
        { id: documentId }
      )

      const document = {
        _id: documentId,
        _type: 'zohoForm',
        name: form.name,
        formUrl: form.formUrl,
        formType: form.formType,
        description: form.description,
        isActive: true,
        embedSettings: {
          displayMode: 'modal',
          height: 600,
          width: '100%',
        },
      }

      if (existing) {
        await client.createOrReplace(document)
        console.log(`✅ Updated: ${form.name}`)
        results.updated++
      } else {
        await client.create(document)
        console.log(`✅ Created: ${form.name}`)
        results.created++
      }

      // Try to link form to corresponding e-book
      const ebook = await client.fetch(
        `*[_type == "ebook" && slug.current == $slug][0]`,
        { slug: form.ebookSlug }
      )

      if (ebook) {
        await client
          .patch(ebook._id)
          .set({
            zohoForm: {
              _type: 'reference',
              _ref: documentId,
            },
          })
          .commit()
        console.log(`  🔗 Linked to e-book: ${form.ebookSlug}`)
        results.linked++
      } else {
        console.log(`  ⚠️  E-book not found: ${form.ebookSlug}`)
      }

    } catch (error) {
      console.error(`❌ Error with ${form.name}:`, error.message)
      results.errors++
    }
  }

  console.log('\n📊 Summary:')
  console.log(`   Created: ${results.created}`)
  console.log(`   Updated: ${results.updated}`)
  console.log(`   Linked to e-books: ${results.linked}`)
  console.log(`   Errors: ${results.errors}`)
  console.log('\n✨ Zoho Forms seeding complete!')
}

// Run if called directly
seedZohoForms().catch(console.error)
