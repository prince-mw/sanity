const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  apiVersion: '2024-01-01',
});

// Page SEO data for all pages
const pageSeoData = [
  // Main Pages
  {
    pageId: 'home',
    pageName: 'Home Page',
    seo: {
      metaTitle: 'Moving Walls | Global Out-of-Home Advertising Technology Platform',
      metaDescription: 'Moving Walls is the global leader in OOH advertising technology, enabling brands, agencies, and media owners to plan, buy, and measure outdoor advertising.',
      keywords: ['OOH advertising', 'out-of-home', 'programmatic DOOH', 'digital advertising', 'outdoor advertising platform'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'about',
    pageName: 'About Us',
    seo: {
      metaTitle: 'About Moving Walls | Our Mission & Vision',
      metaDescription: 'Learn about Moving Walls, the company revolutionizing out-of-home advertising with data-driven technology and programmatic solutions.',
      keywords: ['about Moving Walls', 'OOH company', 'advertising technology company', 'adtech startup'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'contact',
    pageName: 'Contact Us',
    seo: {
      metaTitle: 'Contact Moving Walls | Get in Touch',
      metaDescription: 'Contact Moving Walls for inquiries about our OOH advertising platform, partnerships, or support. Offices worldwide in Singapore, Malaysia, India, and more.',
      keywords: ['contact Moving Walls', 'OOH support', 'advertising platform contact'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'platform',
    pageName: 'Platform Overview',
    seo: {
      metaTitle: 'OOH Advertising Platform | Moving Walls Technology Suite',
      metaDescription: 'Discover the Moving Walls platform suite - comprehensive tools for planning, activating, and measuring out-of-home advertising campaigns.',
      keywords: ['OOH platform', 'advertising technology', 'DOOH platform', 'programmatic advertising'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'our-story',
    pageName: 'Our Story',
    seo: {
      metaTitle: 'Our Story | Moving Walls Journey in AdTech',
      metaDescription: 'Discover the Moving Walls story - how we became the global leader in out-of-home advertising technology, transforming the industry since our founding.',
      keywords: ['Moving Walls story', 'OOH history', 'adtech journey', 'company history'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'our-journey',
    pageName: 'Our Journey',
    seo: {
      metaTitle: 'Moving Walls Journey | Milestones & Achievements',
      metaDescription: 'Explore the Moving Walls journey through key milestones, achievements, and innovations that shaped the future of out-of-home advertising.',
      keywords: ['Moving Walls milestones', 'company timeline', 'achievements', 'OOH innovation'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  
  // Solutions
  {
    pageId: 'brands',
    pageName: 'Solutions for Brands',
    seo: {
      metaTitle: 'OOH Advertising for Brands | Moving Walls',
      metaDescription: 'Reach your target audience with precision OOH advertising. Moving Walls helps brands plan, execute, and measure impactful outdoor campaigns.',
      keywords: ['brand advertising', 'OOH for brands', 'outdoor brand campaigns', 'programmatic brand advertising'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'agencies',
    pageName: 'Solutions for Agencies',
    seo: {
      metaTitle: 'OOH Solutions for Advertising Agencies | Moving Walls',
      metaDescription: 'Empower your agency with Moving Walls OOH tools. Plan smarter campaigns, access premium inventory, and deliver measurable results for clients.',
      keywords: ['agency advertising platform', 'OOH for agencies', 'media buying tools', 'programmatic agency solutions'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'media-owners',
    pageName: 'Solutions for Media Owners',
    seo: {
      metaTitle: 'OOH Media Owner Platform | Moving Walls',
      metaDescription: 'Monetize your OOH inventory with Moving Walls. Connect with advertisers, automate sales, and maximize revenue from your outdoor media assets.',
      keywords: ['media owner platform', 'OOH inventory management', 'DOOH monetization', 'outdoor media sales'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  
  // Products
  {
    pageId: 'mw-planner',
    pageName: 'MW Planner',
    seo: {
      metaTitle: 'MW Planner | OOH Campaign Planning Tool',
      metaDescription: 'Plan smarter OOH campaigns with MW Planner. Data-driven audience insights, location intelligence, and media planning tools for effective outdoor advertising.',
      keywords: ['OOH planning tool', 'media planning software', 'audience planning', 'campaign planner'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'mw-activate',
    pageName: 'MW Activate',
    seo: {
      metaTitle: 'MW Activate | Programmatic OOH Campaign Execution',
      metaDescription: 'Execute programmatic OOH campaigns seamlessly with MW Activate. Real-time bidding, dynamic creative, and automated campaign management.',
      keywords: ['programmatic OOH', 'campaign execution', 'DOOH activation', 'real-time bidding'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'mw-measure',
    pageName: 'MW Measure',
    seo: {
      metaTitle: 'MW Measure | OOH Campaign Measurement & Analytics',
      metaDescription: 'Measure OOH campaign performance with MW Measure. Attribution, footfall analytics, brand lift studies, and ROI measurement for outdoor advertising.',
      keywords: ['OOH measurement', 'campaign analytics', 'attribution', 'footfall measurement', 'brand lift'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'mw-market',
    pageName: 'MW Market',
    seo: {
      metaTitle: 'MW Market | OOH Media Marketplace',
      metaDescription: 'Access premium OOH inventory through MW Market. Browse, compare, and book outdoor advertising spaces from media owners worldwide.',
      keywords: ['OOH marketplace', 'media marketplace', 'outdoor inventory', 'billboard marketplace'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'mw-influence',
    pageName: 'MW Influence',
    seo: {
      metaTitle: 'MW Influence | Influencer & OOH Integration',
      metaDescription: 'Combine influencer marketing with OOH advertising using MW Influence. Amplify your campaigns across physical and digital touchpoints.',
      keywords: ['influencer OOH', 'integrated marketing', 'social OOH', 'amplification'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'mw-studio',
    pageName: 'MW Studio',
    seo: {
      metaTitle: 'MW Studio | Dynamic Creative for OOH',
      metaDescription: 'Create dynamic OOH creatives with MW Studio. Contextual triggers, data-driven content, and real-time creative optimization for outdoor ads.',
      keywords: ['dynamic creative', 'OOH creative', 'DOOH content', 'creative optimization'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'mw-science',
    pageName: 'MW Science',
    seo: {
      metaTitle: 'MW Science | Audience Intelligence & Data',
      metaDescription: 'Unlock audience insights with MW Science. Location intelligence, movement data, and audience analytics for smarter OOH advertising decisions.',
      keywords: ['audience intelligence', 'location data', 'OOH analytics', 'movement data'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  
  // Resources
  {
    pageId: 'blog',
    pageName: 'Blog',
    seo: {
      metaTitle: 'Moving Walls Blog | OOH Advertising Insights & Trends',
      metaDescription: 'Expert insights on out-of-home advertising, programmatic DOOH, audience measurement, and marketing technology from the Moving Walls team.',
      keywords: ['OOH blog', 'advertising insights', 'DOOH trends', 'marketing technology blog'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'case-studies',
    pageName: 'Case Studies',
    seo: {
      metaTitle: 'OOH Advertising Case Studies | Moving Walls Success Stories',
      metaDescription: 'Explore successful OOH advertising campaigns from global brands. See how Moving Walls technology delivers measurable results.',
      keywords: ['OOH case studies', 'advertising success stories', 'campaign results', 'DOOH examples'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'webinars',
    pageName: 'Webinars',
    seo: {
      metaTitle: 'OOH Advertising Webinars | Moving Walls Events',
      metaDescription: 'Join Moving Walls webinars to learn about OOH advertising best practices, industry trends, and platform features from industry experts.',
      keywords: ['OOH webinars', 'advertising webinars', 'DOOH events', 'marketing webinars'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'ebooks',
    pageName: 'Ebooks',
    seo: {
      metaTitle: 'OOH Advertising Ebooks & Guides | Moving Walls Resources',
      metaDescription: 'Download free ebooks and guides on out-of-home advertising, programmatic DOOH, and marketing strategies from Moving Walls.',
      keywords: ['OOH ebooks', 'advertising guides', 'DOOH resources', 'marketing ebooks'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'whitepapers',
    pageName: 'Whitepapers',
    seo: {
      metaTitle: 'OOH Industry Whitepapers & Research | Moving Walls',
      metaDescription: 'Access in-depth whitepapers and research on OOH advertising trends, measurement methodologies, and industry best practices.',
      keywords: ['OOH whitepapers', 'advertising research', 'DOOH studies', 'industry reports'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'events',
    pageName: 'Events',
    seo: {
      metaTitle: 'OOH Industry Events & Conferences | Moving Walls',
      metaDescription: 'Discover upcoming OOH advertising events, conferences, and meetups where Moving Walls will be presenting or exhibiting.',
      keywords: ['OOH events', 'advertising conferences', 'DOOH events', 'industry meetups'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'press-news',
    pageName: 'Press & News',
    seo: {
      metaTitle: 'Moving Walls News & Press Releases',
      metaDescription: 'Latest news, press releases, and media coverage about Moving Walls, our products, partnerships, and industry recognition.',
      keywords: ['Moving Walls news', 'press releases', 'company announcements', 'media coverage'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  
  // Other Pages
  {
    pageId: 'careers',
    pageName: 'Careers',
    seo: {
      metaTitle: 'Careers at Moving Walls | Join Our Team',
      metaDescription: 'Explore career opportunities at Moving Walls. Join our global team building the future of out-of-home advertising technology.',
      keywords: ['Moving Walls careers', 'adtech jobs', 'advertising jobs', 'tech careers'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'leadership',
    pageName: 'Leadership Team',
    seo: {
      metaTitle: 'Moving Walls Leadership Team | Executive Management',
      metaDescription: 'Meet the leadership team at Moving Walls. Experienced executives driving innovation in out-of-home advertising technology.',
      keywords: ['Moving Walls leadership', 'executive team', 'management team', 'company leaders'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'locations',
    pageName: 'Global Locations',
    seo: {
      metaTitle: 'Moving Walls Global Offices | Locations Worldwide',
      metaDescription: 'Find Moving Walls offices around the world. We have presence in Singapore, Malaysia, India, Philippines, Thailand, Indonesia, and more.',
      keywords: ['Moving Walls offices', 'global locations', 'company offices', 'international presence'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'integrations',
    pageName: 'Integrations',
    seo: {
      metaTitle: 'Moving Walls Platform Integrations | API & Partners',
      metaDescription: 'Explore Moving Walls integrations with DSPs, DMPs, CRMs, and other advertising technology platforms for seamless campaign management.',
      keywords: ['OOH integrations', 'API integrations', 'advertising partners', 'platform connections'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'ooh-formats',
    pageName: 'OOH Formats',
    seo: {
      metaTitle: 'OOH Advertising Formats | Billboard, Digital & More',
      metaDescription: 'Discover various OOH advertising formats including billboards, digital screens, transit ads, street furniture, and innovative outdoor media.',
      keywords: ['OOH formats', 'billboard advertising', 'digital OOH', 'transit advertising', 'street furniture'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  
  // Industries
  {
    pageId: 'retail',
    pageName: 'Retail Industry',
    seo: {
      metaTitle: 'OOH Advertising for Retail | Moving Walls',
      metaDescription: 'Drive foot traffic and sales with OOH advertising for retail. Location-based targeting, proximity marketing, and footfall attribution.',
      keywords: ['retail advertising', 'retail OOH', 'store traffic', 'retail marketing'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'finance',
    pageName: 'Finance Industry',
    seo: {
      metaTitle: 'OOH Advertising for Finance & Banking | Moving Walls',
      metaDescription: 'Build trust and awareness with OOH advertising for financial services. Reach affluent audiences in premium locations.',
      keywords: ['finance advertising', 'banking OOH', 'financial services marketing', 'wealth management ads'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'healthcare',
    pageName: 'Healthcare Industry',
    seo: {
      metaTitle: 'OOH Advertising for Healthcare | Moving Walls',
      metaDescription: 'Reach patients and healthcare professionals with compliant OOH advertising. Location targeting near hospitals, clinics, and pharmacies.',
      keywords: ['healthcare advertising', 'hospital OOH', 'pharma marketing', 'healthcare campaigns'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  
  // Legal Pages
  {
    pageId: 'privacy',
    pageName: 'Privacy Policy',
    seo: {
      metaTitle: 'Privacy Policy | Moving Walls',
      metaDescription: 'Read the Moving Walls privacy policy. Learn how we collect, use, and protect your personal information.',
      keywords: ['privacy policy', 'data protection', 'personal information'],
      enableKeywords: false,
      noIndex: false,
    },
  },
  {
    pageId: 'terms',
    pageName: 'Terms of Service',
    seo: {
      metaTitle: 'Terms of Service | Moving Walls',
      metaDescription: 'Review the Moving Walls terms of service and conditions of use for our platform and services.',
      keywords: ['terms of service', 'terms and conditions', 'user agreement'],
      enableKeywords: false,
      noIndex: false,
    },
  },
  {
    pageId: 'cookies',
    pageName: 'Cookie Policy',
    seo: {
      metaTitle: 'Cookie Policy | Moving Walls',
      metaDescription: 'Learn about how Moving Walls uses cookies and similar technologies on our website.',
      keywords: ['cookie policy', 'cookies', 'tracking'],
      enableKeywords: false,
      noIndex: false,
    },
  },
  
  // Landing/Campaign Pages
  {
    pageId: 'adtech-company-of-year',
    pageName: 'AdTech Company of the Year',
    seo: {
      metaTitle: 'Moving Walls - AdTech Company of the Year',
      metaDescription: 'Moving Walls recognized as AdTech Company of the Year for innovation in out-of-home advertising technology.',
      keywords: ['adtech award', 'company of the year', 'advertising technology', 'industry recognition'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'ai-powered-audience-targeting',
    pageName: 'AI-Powered Audience Targeting',
    seo: {
      metaTitle: 'AI-Powered Audience Targeting for OOH | Moving Walls',
      metaDescription: 'Leverage AI and machine learning for precise audience targeting in OOH advertising. Reach the right people at the right time and place.',
      keywords: ['AI targeting', 'audience targeting', 'machine learning advertising', 'smart OOH'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'series-c-funding',
    pageName: 'Series C Funding',
    seo: {
      metaTitle: 'Moving Walls Series C Funding Announcement',
      metaDescription: 'Moving Walls announces Series C funding to accelerate global expansion and product innovation in OOH advertising technology.',
      keywords: ['series C funding', 'startup funding', 'adtech investment', 'Moving Walls funding'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'transit-partnership',
    pageName: 'Transit Partnership',
    seo: {
      metaTitle: 'Transit Advertising Partnership | Moving Walls',
      metaDescription: 'Partner with Moving Walls for transit advertising solutions. Reach commuters across buses, trains, airports, and transit hubs.',
      keywords: ['transit advertising', 'transport ads', 'commuter advertising', 'transit partnership'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'privacy-first-measurement',
    pageName: 'Privacy-First Measurement',
    seo: {
      metaTitle: 'Privacy-First OOH Measurement | Moving Walls',
      metaDescription: 'Measure OOH campaign effectiveness with privacy-compliant solutions. Cookieless attribution and GDPR-compliant analytics.',
      keywords: ['privacy-first measurement', 'cookieless attribution', 'GDPR compliant', 'privacy analytics'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'london-headquarters',
    pageName: 'London Headquarters',
    seo: {
      metaTitle: 'Moving Walls London Headquarters | UK Office',
      metaDescription: 'Visit Moving Walls London headquarters. Our UK office serves clients across Europe with cutting-edge OOH advertising solutions.',
      keywords: ['London office', 'UK headquarters', 'Moving Walls London', 'European office'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'movinghearts',
    pageName: 'Moving Hearts',
    seo: {
      metaTitle: 'Moving Hearts | CSR & Community Initiatives',
      metaDescription: 'Discover Moving Hearts, our corporate social responsibility initiative supporting communities through OOH advertising for good causes.',
      keywords: ['CSR', 'corporate responsibility', 'community initiatives', 'advertising for good'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  
  // Support/Documentation
  {
    pageId: 'documentation',
    pageName: 'Documentation',
    seo: {
      metaTitle: 'Moving Walls Platform Documentation',
      metaDescription: 'Access comprehensive documentation for the Moving Walls platform. User guides, tutorials, and best practices for OOH advertising.',
      keywords: ['documentation', 'user guide', 'platform help', 'tutorials'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'api-reference',
    pageName: 'API Reference',
    seo: {
      metaTitle: 'Moving Walls API Reference & Documentation',
      metaDescription: 'Technical documentation for the Moving Walls API. Integration guides, endpoints, and developer resources for OOH advertising.',
      keywords: ['API documentation', 'developer API', 'integration guide', 'technical docs'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'help-center',
    pageName: 'Help Center',
    seo: {
      metaTitle: 'Help Center | Moving Walls Support',
      metaDescription: 'Get help with Moving Walls platform. FAQs, troubleshooting guides, and customer support for OOH advertising solutions.',
      keywords: ['help center', 'support', 'FAQs', 'customer service'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'community',
    pageName: 'Community',
    seo: {
      metaTitle: 'Moving Walls Community | OOH Advertising Network',
      metaDescription: 'Join the Moving Walls community. Connect with OOH professionals, share insights, and learn from industry experts.',
      keywords: ['OOH community', 'advertising network', 'industry community', 'professional network'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'products',
    pageName: 'Products Overview',
    seo: {
      metaTitle: 'OOH Advertising Products & Solutions | Moving Walls',
      metaDescription: 'Explore the full suite of Moving Walls OOH advertising products — planning, activation, measurement, marketplace, creative studio, and audience intelligence.',
      keywords: ['OOH products', 'advertising solutions', 'DOOH tools', 'Moving Walls products'],
      enableKeywords: true,
      noIndex: false,
    },
  },
  {
    pageId: 'search',
    pageName: 'Search',
    seo: {
      metaTitle: 'Search | Moving Walls',
      metaDescription: 'Search across Moving Walls content — blogs, case studies, resources, and documentation.',
      keywords: ['search', 'find content'],
      enableKeywords: false,
      noIndex: true,
    },
  },
  {
    pageId: 'sitemap',
    pageName: 'Sitemap',
    seo: {
      metaTitle: 'Sitemap | Moving Walls',
      metaDescription: 'Browse the complete sitemap of Moving Walls website. Find all pages, resources, and content easily.',
      keywords: ['sitemap', 'site navigation', 'all pages'],
      enableKeywords: false,
      noIndex: false,
    },
  },
];

async function seedPageSeo() {
  console.log('Starting Page SEO seeding...\n');
  
  let created = 0;
  let updated = 0;
  let errors = 0;
  
  for (const page of pageSeoData) {
    try {
      // Check if page SEO already exists
      const existing = await client.fetch(
        `*[_type == "pageSeo" && pageId == $pageId][0]`,
        { pageId: page.pageId }
      );
      
      const doc = {
        _type: 'pageSeo',
        pageId: page.pageId,
        pageName: page.pageName,
        seo: page.seo,
      };
      
      if (existing) {
        // Update existing
        await client.patch(existing._id).set(doc).commit();
        console.log(`✓ Updated: ${page.pageName} (${page.pageId})`);
        updated++;
      } else {
        // Create new with deterministic ID
        await client.createOrReplace({
          _id: `pageSeo-${page.pageId}`,
          ...doc,
        });
        console.log(`✓ Created: ${page.pageName} (${page.pageId})`);
        created++;
      }
    } catch (error) {
      console.error(`✗ Error with ${page.pageId}:`, error.message);
      errors++;
    }
  }
  
  console.log('\n=== Page SEO Seeding Complete ===');
  console.log(`Created: ${created}`);
  console.log(`Updated: ${updated}`);
  console.log(`Errors: ${errors}`);
  console.log(`Total: ${pageSeoData.length}`);
}

seedPageSeo().catch(console.error);
