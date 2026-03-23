/**
 * Phase 2: Seed content for NEW schema types
 * Seeds: helpCenterFaq, apiReferencePage, communityPage, legalPage, platformConfig
 * 
 * Run: node scripts/seed-phase2-to-sanity.js
 */

const { createClient } = require('@sanity/client')
const crypto = require('crypto')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
})

function generateKey() {
  return crypto.randomBytes(6).toString('hex')
}

function textBlock(text) {
  return {
    _type: 'block',
    _key: generateKey(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: generateKey(), text, marks: [] }],
  }
}

// ============================================
// HELP CENTER FAQs (10 items)
// ============================================

const helpCenterFaqs = [
  { category: 'Getting Started', question: 'How do I create my first campaign?', answer: 'Navigate to the MW Planner dashboard, click \'New Campaign\', and follow the step-by-step wizard to set up your campaign objectives, budget, targeting, and creative assets.', order: 1 },
  { category: 'Getting Started', question: 'What are the system requirements?', answer: 'Moving Walls platform works on all modern browsers (Chrome, Firefox, Safari, Edge). We recommend using the latest browser version for optimal performance.', order: 2 },
  { category: 'Account & Billing', question: 'How does billing work?', answer: 'Billing is based on your campaign spend and platform usage. You\'ll receive monthly invoices with detailed breakdowns of all charges. Payment methods include credit card, wire transfer, and ACH.', order: 3 },
  { category: 'Account & Billing', question: 'Can I change my subscription plan?', answer: 'Yes, you can upgrade or downgrade your plan at any time from the Account Settings page. Changes take effect at the start of your next billing cycle.', order: 4 },
  { category: 'Platform Features', question: 'How do I set up geo-targeting?', answer: 'In MW Reach, select the \'Location Targeting\' option and either draw custom shapes on the map, upload location lists, or use predefined market areas (DMAs). You can also set radius targeting around specific addresses.', order: 5 },
  { category: 'Platform Features', question: 'What analytics are available?', answer: 'MW Measure provides real-time analytics including impressions, reach, frequency, CTR, conversions, and ROI. You can create custom dashboards and schedule automated reports.', order: 6 },
  { category: 'Troubleshooting', question: 'Why isn\'t my campaign delivering?', answer: 'Check your campaign status, budget availability, targeting settings, and creative approvals. Ensure your bid strategy is competitive and your audience isn\'t too narrow.', order: 7 },
  { category: 'Troubleshooting', question: 'How do I reset my password?', answer: 'Click \'Forgot Password\' on the login page, enter your email address, and follow the instructions sent to your inbox to reset your password.', order: 8 },
  { category: 'Integrations', question: 'What third-party integrations are supported?', answer: 'We integrate with major platforms including Google Analytics, Adobe Analytics, Salesforce, HubSpot, and various DSPs. Visit our Documentation page for the complete list and setup guides.', order: 9 },
  { category: 'Integrations', question: 'How do I connect my CRM?', answer: 'Go to Settings > Integrations, select your CRM provider, and follow the OAuth authentication flow. Once connected, you can sync lead data automatically.', order: 10 },
]

async function seedHelpCenterFaqs() {
  console.log('\n❓ Seeding Help Center FAQs...')
  for (const faq of helpCenterFaqs) {
    const existing = await client.fetch(
      `*[_type == "helpCenterFaq" && question == $question][0]`,
      { question: faq.question }
    )
    if (existing) {
      console.log(`  ⏭️  Skipping "${faq.question.substring(0, 40)}..." - already exists`)
      continue
    }
    await client.create({
      _type: 'helpCenterFaq',
      ...faq,
      isPublished: true,
    })
    console.log(`  ✅ Created FAQ: "${faq.question.substring(0, 40)}..."`)
  }
}

// ============================================
// API REFERENCE PAGE (singleton)
// ============================================

const apiReferenceData = {
  title: 'API Reference & Developer Resources',
  subtitle: 'Build powerful integrations with the Moving Walls API. Full REST API documentation and SDKs.',
  endpoints: [
    { _key: generateKey(), method: 'POST', endpoint: '/api/v1/campaigns', description: 'Create a new advertising campaign', params: ['name', 'budget', 'start_date', 'end_date', 'targeting'] },
    { _key: generateKey(), method: 'GET', endpoint: '/api/v1/campaigns/{id}', description: 'Retrieve campaign details', params: ['id'] },
    { _key: generateKey(), method: 'PUT', endpoint: '/api/v1/campaigns/{id}', description: 'Update campaign settings', params: ['id', 'budget', 'targeting', 'status'] },
    { _key: generateKey(), method: 'GET', endpoint: '/api/v1/analytics', description: 'Get campaign analytics', params: ['campaign_id', 'start_date', 'end_date', 'metrics'] },
  ],
  sdks: [
    { _key: generateKey(), name: 'Node.js', language: 'JavaScript', installCommand: 'npm install @movingwalls/node-sdk' },
    { _key: generateKey(), name: 'Python', language: 'Python', installCommand: 'pip install movingwalls-python' },
    { _key: generateKey(), name: 'PHP', language: 'PHP', installCommand: 'composer require movingwalls/php-sdk' },
  ],
  ctaTitle: 'Need Developer Support?',
  ctaDescription: 'Join our developer community or reach out to our technical team for assistance.',
}

async function seedApiReferencePage() {
  console.log('\n🔌 Seeding API Reference Page...')
  const existing = await client.fetch(`*[_type == "apiReferencePage"][0]`)
  if (existing) {
    console.log('  ⏭️  API Reference Page already exists')
    return
  }
  await client.create({ _type: 'apiReferencePage', ...apiReferenceData })
  console.log('  ✅ Created API Reference Page')
}

// ============================================
// COMMUNITY PAGE (singleton)
// ============================================

const communityData = {
  title: 'Join Our Community',
  subtitle: 'Connect with advertising professionals, share insights, and learn from industry experts.',
  stats: [
    { _key: generateKey(), number: '5,000+', label: 'Members' },
    { _key: generateKey(), number: '1,200+', label: 'Discussions' },
    { _key: generateKey(), number: '150+', label: 'Events/Year' },
  ],
  discussions: [
    { _key: generateKey(), title: 'Best practices for automotive campaigns', author: 'Sarah M.', replies: 24, views: 342 },
    { _key: generateKey(), title: 'How to optimize DOOH for retail', author: 'Mike T.', replies: 18, views: 256 },
    { _key: generateKey(), title: 'Programmatic buying strategies', author: 'Lisa K.', replies: 31, views: 489 },
    { _key: generateKey(), title: 'Healthcare advertising compliance tips', author: 'Dr. Chen', replies: 15, views: 198 },
  ],
  ctaTitle: 'Start Contributing Today',
  ctaDescription: 'Share your knowledge and learn from the best in the industry.',
}

async function seedCommunityPage() {
  console.log('\n🤝 Seeding Community Page...')
  const existing = await client.fetch(`*[_type == "communityPage"][0]`)
  if (existing) {
    console.log('  ⏭️  Community Page already exists')
    return
  }
  await client.create({ _type: 'communityPage', ...communityData })
  console.log('  ✅ Created Community Page')
}

// ============================================
// LEGAL PAGES (3 documents)
// ============================================

const legalPages = [
  {
    pageType: 'privacy',
    title: 'Privacy Policy',
    slug: { _type: 'slug', current: 'privacy' },
    lastUpdated: 'February 2, 2026',
    tableOfContents: [
      { _key: generateKey(), id: 'introduction', title: '1. Introduction' },
      { _key: generateKey(), id: 'advertising', title: '2. Moving Walls Pte Ltd Advertising' },
      { _key: generateKey(), id: 'international-transfers', title: '3. International Transfers' },
      { _key: generateKey(), id: 'third-party-info', title: '4. Information Collected on Behalf of Third Parties' },
      { _key: generateKey(), id: 'cookies', title: '5. Cookies' },
      { _key: generateKey(), id: 'children', title: '6. What About Children?' },
      { _key: generateKey(), id: 'other-websites', title: '7. What About Other Websites?' },
      { _key: generateKey(), id: 'changes', title: '8. Changes to This Privacy Policy' },
      { _key: generateKey(), id: 'your-rights', title: '9. Your Rights' },
      { _key: generateKey(), id: 'website-interaction', title: '10. Your Interaction with Moving Walls Pte Ltd Website' },
      { _key: generateKey(), id: 'contact', title: '11. Contacting Us' },
    ],
    sections: [
      {
        _key: generateKey(), id: 'introduction', title: '1. Introduction',
        content: [
          textBlock('Moving Walls Pte Ltd is committed to respecting and protecting individuals\' privacy rights. This Privacy Policy explains how Moving Walls Pte Ltd, its subsidiaries and affiliated companies (collectively, "Moving Walls Pte Ltd" or "we", "us", "our") collect, use, secure, and/or disclose end-users\' ("you" or "your") device-related information when you view ads served by Moving Walls Pte Ltd on Digital Out-of-Home (DOOH) assets, third party websites or mobile apps, or when you visit the Moving Walls Pte Ltd website at www.movingwalls.com.'),
        ],
      },
      {
        _key: generateKey(), id: 'advertising', title: '2. Moving Walls Pte Ltd Advertising',
        content: [
          textBlock('Moving Walls Pte Ltd is a global media solutions provider with a suite of ad tech products. We partner with DOOH site owners, third-party mobile website publishers, and mobile app developers to serve ads on their sites and in their apps. These ads may be customised to their users\' interests and geographic locations, which we may derive or infer from information that we collect about how those users interact with such sites and apps. This type of advertising is often called "interest-based advertising" or "targeted advertising."'),
          textBlock('We may collect information about your device including device type, operating system, network provider, platform, SDK version, timestamp, API key, application version, model, manufacturer, OS version, session timing, locale, time zone, network status, geo-location (GPS), and Advertising ID (IDFA/AAID).'),
          textBlock('Moving Walls Pte Ltd uses the information that we collect to display advertising on DOOH media sites or your device, which may include interest-based advertising customised to individuals\' inferred interests, preferences and locations, and to perform analysis aimed at improving our services.'),
          textBlock('We may share information with publishers, developers, advertisers, data partners, measurement companies, Moving Walls Pte Ltd affiliates, and third parties such as advisors and law enforcement authorities where necessary.'),
          textBlock('Moving Walls Pte Ltd uses reasonable technical and organisational measures to protect the information it collects. We may retain information for up to thirteen (13) months unless otherwise required by law.'),
          textBlock('If you prefer not to receive interest-based advertising from Moving Walls Pte Ltd, you can opt out at any time by going to the Moving Walls Pte Ltd Opt Out page and submitting your device ID.'),
        ],
      },
      {
        _key: generateKey(), id: 'international-transfers', title: '3. International Transfers',
        content: [
          textBlock('Moving Walls Pte Ltd may transfer, process and store information about you in connection with the Platform in countries other than the country in which the information is collected, including for example to the United States an/or Japan. The data protection laws in such countries may be different from those of the country in which you are located, and your information may be subject to access requests from governments, courts, or law enforcement in those countries.'),
        ],
      },
      {
        _key: generateKey(), id: 'third-party-info', title: '4. Information Collected on Behalf of Third Parties',
        content: [
          textBlock('Moving Walls Pte Ltd may collect and/or receive data on behalf of third parties such as publishers and advertisers through the Moving Walls PTE Ltd Platform, and such data may be governed by a separate privacy policy of such third party.'),
        ],
      },
      {
        _key: generateKey(), id: 'cookies', title: '5. Cookies',
        content: [
          textBlock('Where Moving Walls Pte Ltd uses cookies in connection with the services described above, they are used primarily to uniquely identify web browsers for the purpose of enhancing, targeting and measuring digital advertising. For more detailed information about the cookies we use, please visit our Cookie Policy page.'),
        ],
      },
      {
        _key: generateKey(), id: 'children', title: '6. What About Children?',
        content: [
          textBlock('Moving Walls Pte Ltd does not create segments that are specifically designed to target children under the age of 13 for interest-based advertising without verifiable parental consent, and we do not intentionally collect information from children.'),
        ],
      },
      {
        _key: generateKey(), id: 'other-websites', title: '7. What About Other Websites?',
        content: [
          textBlock('This Privacy Policy does not apply to any website owned or operated by third parties, even if there is a link to it from a website operated by Moving Walls Pte Ltd. We recommend that you review the privacy policies of all third party websites you visit.'),
        ],
      },
      {
        _key: generateKey(), id: 'changes', title: '8. Changes to This Privacy Policy',
        content: [
          textBlock('Moving Walls Pte Ltd may from time to time update this Privacy Policy to reflect changes in our practices and service offerings. If we modify our Privacy Policy, we will update the "Last Modified" date and such changes will be effective upon posting.'),
        ],
      },
      {
        _key: generateKey(), id: 'your-rights', title: '9. Your Rights',
        content: [
          textBlock('Subject to applicable law, you may have various rights including the right to access your data, request deletion, opt out of data processing, and lodge a complaint with a supervisory authority. To exercise any of these rights, please contact us at privacy@movingwalls.com.'),
        ],
      },
      {
        _key: generateKey(), id: 'website-interaction', title: '10. Your Interaction with Moving Walls Pte Ltd Website',
        content: [
          textBlock('When you visit the Moving Walls Pte Ltd website, we may collect information about your visit including your IP address, the type of browser you use, the pages you access, and the date and time of your visit. We use this information to improve the performance and content of our website.'),
        ],
      },
      {
        _key: generateKey(), id: 'contact', title: '11. Contacting Us',
        content: [
          textBlock('If you have any questions about this Privacy Policy, please contact us at: Moving Walls Pte. Ltd., Far East Finance Building, #8-02, 14 Robinson Road, Singapore 048545. Email: privacy@movingwalls.com'),
        ],
      },
    ],
  },
  {
    pageType: 'cookies',
    title: 'Cookie Policy',
    slug: { _type: 'slug', current: 'cookies' },
    lastUpdated: 'January 31, 2026',
    tableOfContents: [
      { _key: generateKey(), id: 'what-are-cookies', title: '1. What Are Cookies?' },
      { _key: generateKey(), id: 'how-we-use', title: '2. How We Use Cookies' },
      { _key: generateKey(), id: 'types', title: '3. Types of Cookies We Use' },
      { _key: generateKey(), id: 'managing', title: '4. Managing Your Cookie Preferences' },
      { _key: generateKey(), id: 'changes', title: '5. Changes to This Cookie Policy' },
      { _key: generateKey(), id: 'contact', title: '6. Contact Us' },
    ],
    sections: [
      {
        _key: generateKey(), id: 'what-are-cookies', title: '1. What Are Cookies?',
        content: [
          textBlock('Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners useful information about how their site is being used.'),
          textBlock('Cookies can be "persistent" (remaining on your device until deleted) or "session" (deleted when you close your browser). They can be set by the website you\'re visiting ("first-party cookies") or by third parties ("third-party cookies").'),
        ],
      },
      {
        _key: generateKey(), id: 'how-we-use', title: '2. How We Use Cookies',
        content: [
          textBlock('Moving Walls uses cookies and similar technologies for several purposes: to ensure our website functions properly, to remember your preferences and settings, to understand how you use our website, to improve our services and user experience, and to deliver relevant advertising (with your consent).'),
        ],
      },
      {
        _key: generateKey(), id: 'types', title: '3. Types of Cookies We Use',
        content: [
          textBlock('Essential Cookies (Required): These cookies are necessary for the website to function and cannot be switched off. Examples include mw_cookie_consent (stores cookie consent preferences, 1 year), mw_session (maintains session state, session), and csrf_token (security token for form submissions, session).'),
          textBlock('Functional Cookies (Optional): These enable enhanced functionality and personalization. Examples include mw_language (language preference, 1 year), mw_region (regional preferences, 1 year), and mw_theme (display preferences, 1 year).'),
          textBlock('Analytics Cookies (Optional): These allow us to count visits and traffic sources. Examples include _ga (Google Analytics, 2 years), _ga_* (Google Analytics 4, 2 years), and _gid (Google Analytics, 24 hours).'),
          textBlock('Marketing Cookies (Optional): These may be used to build a profile of your interests. Examples include _fbp (Meta Pixel, 90 days), li_fat_id (LinkedIn Ads, 30 days), and IDE (Google Ads, 1 year).'),
        ],
      },
      {
        _key: generateKey(), id: 'managing', title: '4. Managing Your Cookie Preferences',
        content: [
          textBlock('When you first visit our website, you will see a cookie consent banner that allows you to accept or customize your cookie preferences. You can change your preferences at any time by clicking the "Cookie Settings" link in the footer of our website.'),
          textBlock('Most web browsers allow you to control cookies through their settings. You can typically find these settings in the "Options" or "Preferences" menu of your browser.'),
        ],
      },
      {
        _key: generateKey(), id: 'changes', title: '5. Changes to This Cookie Policy',
        content: [
          textBlock('We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. When we make changes, we will update the "Last Updated" date at the top of this page.'),
        ],
      },
      {
        _key: generateKey(), id: 'contact', title: '6. Contact Us',
        content: [
          textBlock('If you have any questions about our use of cookies or this Cookie Policy, please contact us at: Moving Walls Pte. Ltd., Far East Finance Building, #8-02, 14 Robinson Road, Singapore 048545. Email: privacy@movingwalls.com'),
        ],
      },
    ],
  },
  {
    pageType: 'terms',
    title: 'Terms & Conditions',
    slug: { _type: 'slug', current: 'terms' },
    lastUpdated: 'February 2, 2026',
    tableOfContents: [
      { _key: generateKey(), id: 'introduction', title: 'Introduction' },
      { _key: generateKey(), id: 'agreement', title: '1. Agreement' },
      { _key: generateKey(), id: 'definitions', title: '2. Definitions' },
      { _key: generateKey(), id: 'grant-of-license', title: '3. Grant of License; Limitations' },
      { _key: generateKey(), id: 'inventory-supply', title: '4. Inventory Supply' },
      { _key: generateKey(), id: 'payment-terms', title: '5. Payment Terms; Publisher Expenses' },
      { _key: generateKey(), id: 'privacy', title: '6. Privacy' },
      { _key: generateKey(), id: 'confidentiality', title: '7. Confidentiality' },
      { _key: generateKey(), id: 'company-obligations', title: '8. Company Obligations' },
      { _key: generateKey(), id: 'technical-support', title: '9. Technical Support' },
      { _key: generateKey(), id: 'publicity', title: '10. Publicity; Press Releases' },
      { _key: generateKey(), id: 'term-termination', title: '11. Term; Termination' },
      { _key: generateKey(), id: 'disclaimer', title: '12. Disclaimer' },
      { _key: generateKey(), id: 'indemnification', title: '13. Indemnification' },
      { _key: generateKey(), id: 'general-provisions', title: '14. General Provisions' },
    ],
    sections: [
      {
        _key: generateKey(), id: 'introduction', title: 'Introduction',
        content: [
          textBlock('The following terms and conditions (the "Master Terms and Conditions") shall govern the use of Moving Walls Pte Ltd ("MovingWalls") products and services (the "Services") described in any Moving Audiences Media Booking Agreement, the Moving Audiences Order Form, or Moving Audiences Statement of Work (collectively the "Agreement") entered into between You (the "Company") and MovingWalls.'),
          textBlock('If You are entering into these Master Terms and Conditions on behalf of a company or other legal entity, You represent that You have the legal authority to bind the legal entity to these Standard Terms, in which case "You" or "Your" shall mean such entity.'),
        ],
      },
      {
        _key: generateKey(), id: 'agreement', title: '1. Agreement',
        content: [
          textBlock('These Master Terms and Conditions, together with the Moving Audiences Platform "Order Form" (collectively, the "Agreement") govern the relationship between Company and MovingWalls. MovingWalls reserves the right to modify these Standard Terms and Conditions with effect for the future at any time.'),
        ],
      },
      {
        _key: generateKey(), id: 'definitions', title: '2. Definitions',
        content: [
          textBlock('"Inventory" means digital out-of-home advertising or mobile advertising inventory displayed and sold through MovingWalls\' Moving Audiences Platform service. This includes "Partner Inventory" (procured from Supply Side Platforms with direct MovingWalls relationships) and "Company Inventory" (procured from Publishers with direct Company relationships).'),
          textBlock('"Creatives" means any visual material provided by company for delivery on digital out-of-home media sites or mobile advertising inventory. "Delivery Reports" refers to the record of ad plays or slots played on DOOH inventory or impressions delivered on mobile advertising.'),
          textBlock('"Intellectual Property Rights" means patent rights, copyright rights, trade secret rights, and any other intellectual property rights recognized by the law of each applicable jurisdiction.'),
          textBlock('"Client Licence" refers to the subscribed licenses that the Company will get access to for planning, buying, verifying, and analysis. "Platform Fee" is the fee payable by Company for MovingWalls\' Moving Audiences Platform Service.'),
        ],
      },
      {
        _key: generateKey(), id: 'grant-of-license', title: '3. Grant of License; Limitations',
        content: [
          textBlock('Subject to the terms and conditions of the Agreement, MovingWalls grants Company a non-exclusive, non-transferable, limited license to use the Services. Company shall not sublicense, distribute, sell, resell, or otherwise transfer the Services to any third party.'),
        ],
      },
      {
        _key: generateKey(), id: 'inventory-supply', title: '4. Inventory Supply',
        content: [
          textBlock('MovingWalls will use commercially reasonable efforts to make Inventory available to Company through the Platform. Inventory availability is subject to change based on market conditions and Publisher agreements.'),
        ],
      },
      {
        _key: generateKey(), id: 'payment-terms', title: '5. Payment Terms; Publisher Expenses',
        content: [
          textBlock('Company shall pay MovingWalls the applicable fees as set forth in the Order Form. Payment is due within thirty (30) days of the invoice date. Late payments may accrue interest at 1.5% per month or the maximum rate permitted by law.'),
        ],
      },
      {
        _key: generateKey(), id: 'privacy', title: '6. Privacy',
        content: [
          textBlock('Each Party shall comply with all applicable data protection and privacy laws and regulations. Company acknowledges that MovingWalls collects and processes data as described in the Moving Walls Privacy Policy.'),
        ],
      },
      {
        _key: generateKey(), id: 'confidentiality', title: '7. Confidentiality',
        content: [
          textBlock('Each Party agrees to keep confidential all Confidential Information received from the other Party. Confidential Information shall not be disclosed to any third party without the prior written consent of the disclosing Party.'),
        ],
      },
      {
        _key: generateKey(), id: 'company-obligations', title: '8. Company Obligations',
        content: [
          textBlock('Company shall ensure that all Creatives comply with applicable laws and regulations. Company is responsible for obtaining all necessary rights and permissions for any content used in campaigns.'),
        ],
      },
      {
        _key: generateKey(), id: 'technical-support', title: '9. Technical Support',
        content: [
          textBlock('MovingWalls shall provide technical support to Company during normal business hours. Support requests can be submitted through the Platform or via email to support@movingwalls.com.'),
        ],
      },
      {
        _key: generateKey(), id: 'publicity', title: '10. Publicity; Press Releases',
        content: [
          textBlock('Neither Party shall issue any press release or public statement regarding the Agreement without the prior written consent of the other Party. Each Party may include the other Party\'s name and logo in its customer or partner lists.'),
        ],
      },
      {
        _key: generateKey(), id: 'term-termination', title: '11. Term; Termination',
        content: [
          textBlock('The Agreement shall commence on the Effective Date and continue for the Initial Term specified in the Order Form. Either Party may terminate the Agreement upon thirty (30) days written notice if the other Party materially breaches any term of the Agreement.'),
        ],
      },
      {
        _key: generateKey(), id: 'disclaimer', title: '12. Disclaimer',
        content: [
          textBlock('THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. MOVINGWALLS DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.'),
        ],
      },
      {
        _key: generateKey(), id: 'indemnification', title: '13. Indemnification',
        content: [
          textBlock('Each Party shall indemnify, defend, and hold harmless the other Party from and against any claims, damages, losses, and expenses arising from the indemnifying Party\'s breach of the Agreement or violation of applicable law.'),
        ],
      },
      {
        _key: generateKey(), id: 'general-provisions', title: '14. General Provisions',
        content: [
          textBlock('This Agreement shall be governed by and construed in accordance with the laws of Singapore. Any dispute arising from this Agreement shall be subject to the exclusive jurisdiction of the courts of Singapore. This Agreement constitutes the entire agreement between the Parties and supersedes all prior agreements and understandings.'),
        ],
      },
    ],
  },
]

async function seedLegalPages() {
  console.log('\n📜 Seeding Legal Pages...')
  for (const page of legalPages) {
    const existing = await client.fetch(
      `*[_type == "legalPage" && slug.current == $slug][0]`,
      { slug: page.slug.current }
    )
    if (existing) {
      console.log(`  ⏭️  Skipping "${page.title}" - already exists`)
      continue
    }
    await client.create({ _type: 'legalPage', ...page })
    console.log(`  ✅ Created "${page.title}"`)
  }
}

// ============================================
// PLATFORM CONFIG (singleton)
// ============================================

const platformConfigData = {
  title: 'MW Platform Ecosystem',
  subtitle: 'Our AI-powered platform processes diverse data sources to deliver actionable advertising intelligence across our product suite.',
  dataSources: [
    { _key: generateKey(), label: 'Audience Data', iconType: 'users' },
    { _key: generateKey(), label: 'Location', iconType: 'map-pin' },
    { _key: generateKey(), label: 'Traffic Patterns', iconType: 'chart' },
    { _key: generateKey(), label: 'Weather Data', iconType: 'cloud' },
    { _key: generateKey(), label: 'Demographics', iconType: 'user-group' },
    { _key: generateKey(), label: 'POI Data', iconType: 'building' },
    { _key: generateKey(), label: 'Mobile Signals', iconType: 'device' },
    { _key: generateKey(), label: 'Event Calendars', iconType: 'calendar' },
    { _key: generateKey(), label: 'Any Data Source', iconType: 'database' },
  ],
  aiSteps: [
    { _key: generateKey(), label: 'Planning', iconType: 'plan' },
    { _key: generateKey(), label: 'Optimization', iconType: 'optimize' },
    { _key: generateKey(), label: 'Targeting', iconType: 'target' },
    { _key: generateKey(), label: 'Attribution', iconType: 'measure' },
    { _key: generateKey(), label: 'Measure', iconType: 'measure' },
  ],
  outputs: [
    { _key: generateKey(), label: 'Integrations', iconType: 'integration' },
    { _key: generateKey(), label: 'Analytics', iconType: 'analytics' },
    { _key: generateKey(), label: 'Reporting', iconType: 'report' },
    { _key: generateKey(), label: 'API Access', iconType: 'api' },
    { _key: generateKey(), label: 'Insights', iconType: 'insights' },
    { _key: generateKey(), label: 'Audience', iconType: 'audience' },
    { _key: generateKey(), label: 'Performance', iconType: 'performance' },
    { _key: generateKey(), label: 'Media Plans', iconType: 'media-plan' },
    { _key: generateKey(), label: 'Forecasting', iconType: 'forecast' },
  ],
  products: [
    { _key: generateKey(), label: 'MW Planner', href: '/mw-planner', iconType: 'planner' },
    { _key: generateKey(), label: 'MW Measure', href: '/mw-measure', iconType: 'measure' },
    { _key: generateKey(), label: 'MW Influence', href: '/mw-influence', iconType: 'influence' },
    { _key: generateKey(), label: 'MW Activate', href: '/mw-activate', iconType: 'activate' },
    { _key: generateKey(), label: 'MW Science', href: '/mw-science', iconType: 'science' },
    { _key: generateKey(), label: 'MW Studio', href: '/mw-studio', iconType: 'studio' },
    { _key: generateKey(), label: 'MW Market', href: '/mw-market', iconType: 'marketplace' },
  ],
}

async function seedPlatformConfig() {
  console.log('\n🏗️  Seeding Platform Config...')
  const existing = await client.fetch(`*[_type == "platformConfig"][0]`)
  if (existing) {
    console.log('  ⏭️  Platform Config already exists')
    return
  }
  await client.create({ _type: 'platformConfig', ...platformConfigData })
  console.log('  ✅ Created Platform Config')
}

// ============================================
// MAIN
// ============================================

async function seedAll() {
  console.log('🚀 Starting Phase 2: Seed content for NEW schema types...\n')
  console.log('='.repeat(50))

  if (!process.env.SANITY_API_TOKEN && !client.config().token) {
    console.error('❌ SANITY_API_TOKEN environment variable is required')
    process.exit(1)
  }

  await seedHelpCenterFaqs()
  await seedApiReferencePage()
  await seedCommunityPage()
  await seedLegalPages()
  await seedPlatformConfig()

  console.log('\n' + '='.repeat(50))
  console.log('✨ Phase 2 seeding complete!')
  console.log('\nSeeded content types:')
  console.log('  - Help Center FAQs: 10 items')
  console.log('  - API Reference Page: 1 singleton (4 endpoints, 3 SDKs)')
  console.log('  - Community Page: 1 singleton (3 stats, 4 discussions)')
  console.log('  - Legal Pages: 3 documents (privacy, cookies, terms)')
  console.log('  - Platform Config: 1 singleton (9 sources, 5 AI steps, 9 outputs, 7 products)')
}

seedAll().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
