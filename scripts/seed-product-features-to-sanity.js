/**
 * Seed product features, pain points, workflow steps, and detail page sections into Sanity CMS.
 * Patches existing product documents with structured content data.
 *
 * Run with: node scripts/seed-product-features-to-sanity.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
});

// ==================== MW PLANNER ====================
const mwPlanner = {
  slug: 'mw-planner',
  features: [
    { icon: 'target', title: 'AI-Powered Forecasting', description: 'Predict campaign performance with machine learning models trained on billions of OOH impressions.', metric: '94% accuracy' },
    { icon: 'sliders', title: 'Cross-Channel Optimization', description: 'Unified planning across DOOH, static, transit, and retail media with real-time budget allocation.', metric: '35% efficiency gain' },
    { icon: 'users', title: 'Audience Intelligence', description: 'Advanced audience segmentation with behavioral, demographic, and location-based targeting.', metric: '250M+ profiles' },
    { icon: 'chart-bar', title: 'Real-Time Dashboards', description: 'Live campaign monitoring with automated alerts and performance benchmarking across all channels.', metric: 'Sub-second refresh' },
    { icon: 'document-chart', title: 'Automated Reporting', description: 'Generate presentation-ready reports with AI-powered insights and recommendations.', metric: '10x faster' },
    { icon: 'currency', title: 'Budget Optimizer', description: 'AI-driven budget allocation that maximizes ROI across your entire media mix.', metric: '28% ROI boost' },
  ],
};

// ==================== MW SCIENCE ====================
const mwScience = {
  slug: 'mw-science',
  features: [
    { icon: 'beaker', title: 'Research & Testing', description: 'Advanced A/B testing and multivariate analysis with statistical significance modeling.' },
    { icon: 'cpu-chip', title: 'AI-Powered Insights', description: 'Machine learning algorithms that surface actionable insights from complex data patterns.' },
    { icon: 'brain', title: 'Predictive Modeling', description: 'Forecast audience behavior, market trends, and campaign performance with precision.' },
    { icon: 'chart-pie', title: 'Advanced Segmentation', description: 'Dynamic audience segmentation based on behavioral, demographic, and psychographic data.' },
  ],
  detailPageSections: [
    {
      _type: 'contentSection',
      _key: 'research-capabilities',
      sectionKey: 'research-capabilities',
      sectionTitle: 'Research Capabilities',
      items: [
        { _key: 'rc1', title: 'Audience Research', description: 'Behavioral Analysis, Psychographic Profiling, Journey Mapping, Intent Prediction, Lookalike Modeling, Churn Analysis' },
        { _key: 'rc2', title: 'Market Intelligence', description: 'Competitive Analysis, Market Trends, Category Insights, Opportunity Identification, Brand Positioning, Share of Voice' },
        { _key: 'rc3', title: 'Performance Science', description: 'Attribution Modeling, Incrementality Testing, Media Mix Modeling, Geo-Testing, Holdout Analysis, Lift Studies' },
        { _key: 'rc4', title: 'Creative Science', description: 'Creative Testing, Message Optimization, Visual Analysis, Emotional Response, Brand Safety, Content Performance' },
      ],
    },
    {
      _type: 'contentSection',
      _key: 'ai-models',
      sectionKey: 'ai-models',
      sectionTitle: 'AI Models',
      items: [
        { _key: 'am1', title: 'Audience Prediction', description: 'Predicts audience behavior and preferences', metric: '94.2%' },
        { _key: 'am2', title: 'Conversion Forecasting', description: 'Forecasts conversion probability and timing', metric: '89.7%' },
        { _key: 'am3', title: 'Churn Prevention', description: 'Identifies at-risk customers before they churn', metric: '91.5%' },
        { _key: 'am4', title: 'Content Optimization', description: 'Optimizes creative elements for performance', metric: '86.3%' },
        { _key: 'am5', title: 'Budget Allocation', description: 'Recommends optimal budget distribution', metric: '92.8%' },
        { _key: 'am6', title: 'Trend Detection', description: 'Identifies emerging market trends and opportunities', metric: '88.9%' },
      ],
    },
  ],
};

// ==================== MW ACTIVATE ====================
const mwActivate = {
  slug: 'mw-activate',
  detailPageSections: [
    {
      _type: 'contentSection',
      _key: 'owners',
      sectionKey: 'owners',
      sectionTitle: 'For Media Owners',
      items: [
        { _key: 'o1', title: 'Inventory Management System', description: 'Manage your entire OOH network with real-time availability, pricing, and performance tracking.' },
        { _key: 'o2', title: 'Yield Optimization Engine', description: 'AI-powered dynamic pricing that maximizes revenue across all inventory slots automatically.' },
        { _key: 'o3', title: 'Analytics Command Center', description: 'Deep insights into network performance, audience reach, and revenue optimization opportunities.' },
        { _key: 'o4', title: 'Automated Booking Portal', description: 'Instant booking system with real-time availability, automated contracts, and payment processing.' },
      ],
    },
    {
      _type: 'contentSection',
      _key: 'buyers',
      sectionKey: 'buyers',
      sectionTitle: 'For Media Buyers',
      items: [
        { _key: 'b1', title: 'Campaign Launch System', description: 'Deploy OOH campaigns across multiple locations instantly with one-click activation and optimization.' },
        { _key: 'b2', title: 'Audience Targeting AI', description: 'Advanced targeting based on location data, demographics, traffic patterns, and behavioral insights.' },
        { _key: 'b3', title: 'Performance Predictor', description: 'Predictive analytics showing expected reach, impressions, and ROI before campaign launch.' },
        { _key: 'b4', title: 'Instant Booking Hub', description: 'Browse available inventory, compare locations, and book premium OOH spots in real-time.' },
      ],
    },
  ],
};

// ==================== MW INFLUENCE ====================
const mwInfluence = {
  slug: 'mw-influence',
  painPoints: [
    { icon: 'clipboard', title: 'Manual Inefficiency', description: 'Still creating playlists in spreadsheets? Manual scheduling wastes hours and leaves money on the table.', beforeState: 'Manual spreadsheet scheduling', afterState: 'MW Influence automates spot-based scheduling with precision, eliminating manual playlist creation entirely.' },
    { icon: 'puzzle', title: 'Fragmented Demand', description: 'Running separate systems for direct IO and programmatic deals creates revenue cannibalization and missed opportunities.', beforeState: 'Separate direct/programmatic systems', afterState: 'Our unified decision engine evaluates all demand sources fairly in real-time, maximizing yield from every spot.' },
    { icon: 'eye', title: 'Lack of Trust', description: 'Advertisers question estimated screenshots. You need auditable proof that ads actually ran.', beforeState: 'Estimated screenshots', afterState: 'Event-level proof-of-play provides immutable, timestamped logs for every ad impression.' },
    { icon: 'tag', title: 'Pricing Rigidity', description: 'Fixed rate cards can\'t adapt to demand shifts, leaving revenue on the table during peak periods.', beforeState: 'Fixed rate cards', afterState: 'Dynamic rule-based pricing adjusts rates based on daypart, channel, and demand signals automatically.' },
  ],
  features: [
    { icon: 'merge', title: 'Unified Ad Serving', description: 'Real-time decision engine evaluates Direct IO and Programmatic demand together. No more waterfalls or cannibalization—just fair competition for every spot based on your rules.' },
    { icon: 'building', title: 'Advanced Inventory Module', description: 'Manage complex screen setups including multi-panel displays, dynamic networks, and custom packages. Support for Digital, Static, and Transit inventory in one system.' },
    { icon: 'image', title: 'Creative Hub', description: 'Multi-tier approval workflows keep landlords and compliance teams happy. Auto-transcoding ensures creatives meet technical specs for every screen format.' },
    { icon: 'calculator', title: 'Dynamic Pricing Engine', description: 'Rule-based pricing adapts to daypart, channel, and demand signals. Set margins, fees, and custom pricing logic without touching code.' },
    { icon: 'bolt', title: 'Sub-100ms Decision Engine', description: 'Real-time ad selection evaluates eligibility, constraints, and yield in under 100 milliseconds. Guaranteed delivery meets pacing goals automatically.' },
    { icon: 'puzzle', title: 'Composable Architecture', description: 'API-first design means you can use our ad server without replacing your existing CMS, billing system, or planning tools. Integrate what you need, when you need it.' },
    { icon: 'shield-check', title: 'Immutable Proof of Play', description: 'Event-level logs create an auditable trail for every impression. Timestamps, screen location, and play confirmation stored permanently for reconciliation and compliance.' },
    { icon: 'user-shield', title: 'Enterprise User Management', description: 'Role-based access control (RBAC) and single sign-on (SSO) give teams secure, appropriate access. API keys for external integrations keep systems connected safely.' },
  ],
  howItWorksSteps: [
    { stepNumber: 1, icon: 'search', title: 'Planning & Discovery', description: 'Sales planners use MW Planner to search inventory, check availability via the Booking Engine API, and generate proposals with accurate pricing from the Pricing Module.' },
    { stepNumber: 2, icon: 'calendar', title: 'Booking & Configuration', description: 'When deals close, the Booking Engine creates hard reservations. AdOps specialists configure campaigns in MW Influence with delivery goals, pacing rules, and targeting parameters.' },
    { stepNumber: 3, icon: 'image', title: 'Creative Management', description: 'Upload creatives to the Creative Hub for auto-validation and transcoding. Multi-tier approval workflows ensure brand safety and landlord compliance before assets go live.' },
    { stepNumber: 4, icon: 'gear', title: 'Real-Time Execution', description: 'When screens request ads, the Decision Engine evaluates all eligible campaigns in under 100ms, selecting the best ad based on priority, pacing, and yield optimization rules.' },
    { stepNumber: 5, icon: 'chart', title: 'Measurement & Proof', description: 'Every impression generates an immutable proof-of-play log sent to MW Measure. Compare planned vs actual delivery, reconcile invoices, and demonstrate ROI to advertisers.' },
  ],
  detailPageSections: [
    {
      _type: 'contentSection',
      _key: 'personas',
      sectionKey: 'personas',
      sectionTitle: 'Built for Your Team',
      items: [
        { _key: 'p1', title: 'AdOps Specialists', description: 'Configure campaigns, manage creative workflows, monitor delivery pacing, and troubleshoot ad serving issues through the intuitive dashboard.', detail: 'Traffic & Delivery Management' },
        { _key: 'p2', title: 'Sales Planners', description: 'Check real-time inventory availability, generate accurate pricing quotes, and hand off confirmed deals seamlessly to AdOps for execution.', detail: 'Availability & Proposals' },
        { _key: 'p3', title: 'Revenue Managers', description: 'Configure dynamic pricing rules, monitor yield performance across direct and programmatic channels, and optimize inventory packaging strategies.', detail: 'Yield & Pricing Optimization' },
      ],
    },
    {
      _type: 'contentSection',
      _key: 'faqs',
      sectionKey: 'faqs',
      sectionTitle: 'Frequently Asked Questions',
      items: [
        { _key: 'f1', title: 'What is a DOOH ad server?', description: 'A DOOH (Digital Out-of-Home) ad server is a technology platform that manages, delivers, and optimizes advertising campaigns across digital out-of-home screens such as billboards, transit displays, and retail networks. MW Influence goes beyond basic ad serving to provide unified yield optimization, composable architecture, and enterprise-grade inventory management.' },
        { _key: 'f2', title: 'How does MW Influence integrate with my existing CMS?', description: 'MW Influence is built API-first with composable architecture. Our Decision Engine integrates with third-party CMS players via RESTful APIs, allowing you to keep your existing content management system while adding intelligent ad serving and yield optimization capabilities.' },
        { _key: 'f3', title: 'Can MW Influence handle both direct and programmatic campaigns?', description: 'Yes. Unlike legacy systems that separate direct IO and programmatic into different waterfalls, MW Influence uses a unified decision engine that evaluates all demand sources fairly in real-time, maximizing revenue from every available spot.' },
        { _key: 'f4', title: 'What makes MW Influence different from other DOOH ad servers?', description: 'MW Influence is built for media owners, not advertisers. Unlike monolithic loop-based systems or demand-side black boxes, we provide transparent, composable technology that optimizes for your yield. You maintain full control over pricing, decisioning logic, and inventory management.' },
        { _key: 'f5', title: 'How long does implementation take?', description: 'Implementation timelines vary based on network complexity, but our API-first architecture and bulk CSV/JSON import capabilities enable faster onboarding than legacy systems. Many enterprise deployments are live within weeks, not months.' },
        { _key: 'f6', title: 'What size networks does MW Influence support?', description: 'MW Influence is built for enterprise scale, supporting networks from hundreds to thousands of screens across global markets. Our horizontal scaling architecture grows with your network size.' },
      ],
    },
  ],
};

// ==================== MW MEASURE ====================
const mwMeasure = {
  slug: 'mw-measure',
  features: [
    { icon: 'map', title: 'Location Intelligence', description: 'Advanced geospatial analytics with traffic patterns, demographic profiling, and competitor proximity mapping.' },
    { icon: 'users', title: 'Audience Measurement', description: 'Real-time foot traffic analysis, dwell time tracking, and audience demographics powered by mobile location data.' },
    { icon: 'eye', title: 'Attention Metrics', description: 'Computer vision-powered viewability tracking, engagement scoring, and creative performance optimization.' },
    { icon: 'chart-bar', title: 'Attribution Analytics', description: 'Store visit lift measurement, mobile attribution, and cross-channel impact analysis for complete ROI visibility.' },
  ],
};

// ==================== MW STUDIO ====================
const mwStudio = {
  slug: 'mw-studio',
  features: [
    { icon: 'globe', title: 'Instant Site Launch', description: 'Create and publish a full marketplace website without developers. Get online in minutes.', metric: '5 Minutes' },
    { icon: 'puzzle', title: 'Customizable Themes', description: 'Choose from 6 professional templates that match your brand - Elegant, Master, Creative & more.', metric: '6 Templates' },
    { icon: 'cube', title: 'Inventory Integration', description: 'Sync directly with your Reach dashboard and sell your OOH inventory in real-time.', metric: 'Live Sync' },
    { icon: 'chart-bar', title: 'Analytics & Insights', description: 'Track visitor activity, campaign interest, and performance metrics effortlessly.', metric: 'Real-time' },
  ],
  detailPageSections: [
    {
      _type: 'contentSection',
      _key: 'campaign',
      sectionKey: 'campaign',
      sectionTitle: 'Campaign Builder Features',
      items: [
        { _key: 'c1', title: 'Visual Campaign Builder', description: 'Design OOH content with drag-and-drop tools. No design skills required.', metric: '10x Faster' },
        { _key: 'c2', title: 'Smart Layouts', description: 'Auto-adjust designs for any screen size - billboards, transit, digital displays.', metric: 'Auto-resize' },
        { _key: 'c3', title: 'One-Click Deploy', description: 'Publish campaigns across your entire OOH network instantly.', metric: '< 2 minutes' },
        { _key: 'c4', title: 'Component Library', description: '200+ reusable design blocks for faster campaign creation.', metric: '200+ Assets' },
      ],
    },
    {
      _type: 'contentSection',
      _key: 'builder',
      sectionKey: 'builder',
      sectionTitle: 'Builder Features',
      items: [
        { _key: 'b1', title: 'Visual Canvas', description: 'Design in real-time with live preview' },
        { _key: 'b2', title: 'Smart Layouts', description: 'Auto-adjust for any screen size' },
        { _key: 'b3', title: 'Asset Manager', description: 'Organize media files effortlessly' },
        { _key: 'b4', title: 'Version Control', description: 'Track changes and rollback anytime' },
      ],
    },
  ],
};

// ==================== MW MARKET ====================
const mwMarket = {
  slug: 'mw-market',
  detailPageSections: [
    {
      _type: 'contentSection',
      _key: 'continents',
      sectionKey: 'continents',
      sectionTitle: 'Global Coverage',
      items: [
        { _key: 'cn1', title: 'North America', description: 'New York, Los Angeles, Toronto, Mexico City', metric: '78,000', metricLabel: 'Billboards' },
        { _key: 'cn2', title: 'South America', description: 'São Paulo, Buenos Aires, Rio de Janeiro, Lima', metric: '12,000', metricLabel: 'Billboards' },
        { _key: 'cn3', title: 'Europe', description: 'London, Paris, Berlin, Madrid', metric: '92,000', metricLabel: 'Billboards' },
        { _key: 'cn4', title: 'Asia', description: 'Tokyo, Shanghai, Singapore, Dubai', metric: '85,000', metricLabel: 'Billboards' },
        { _key: 'cn5', title: 'Africa', description: 'Lagos, Cairo, Johannesburg, Nairobi', metric: '8,500', metricLabel: 'Billboards' },
        { _key: 'cn6', title: 'Oceania', description: 'Sydney, Melbourne, Auckland, Brisbane', metric: '6,500', metricLabel: 'Billboards' },
      ],
    },
  ],
};

// ==================== SEED FUNCTION ====================

const allProducts = [mwPlanner, mwScience, mwActivate, mwInfluence, mwMeasure, mwStudio, mwMarket];

function addKeys(arr) {
  return arr.map((item, i) => ({ _key: `item_${i}`, ...item }));
}

async function seedProductFeatures() {
  console.log('Seeding product features, pain points, workflow steps, and detail sections...\n');

  for (const productData of allProducts) {
    const { slug, ...fields } = productData;

    try {
      const existing = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]{ _id, features, painPoints, howItWorksSteps, detailPageSections }`,
        { slug }
      );

      if (!existing) {
        console.log(`⚠️  ${slug}: product not found in Sanity, skipping`);
        continue;
      }

      const updates = {};

      // Only seed arrays that don't already have CMS content
      if (fields.features && (!existing.features || existing.features.length === 0)) {
        updates.features = addKeys(fields.features);
      }

      if (fields.painPoints && (!existing.painPoints || existing.painPoints.length === 0)) {
        updates.painPoints = addKeys(fields.painPoints);
      }

      if (fields.howItWorksSteps && (!existing.howItWorksSteps || existing.howItWorksSteps.length === 0)) {
        updates.howItWorksSteps = addKeys(fields.howItWorksSteps);
      }

      if (fields.detailPageSections && (!existing.detailPageSections || existing.detailPageSections.length === 0)) {
        updates.detailPageSections = fields.detailPageSections;
      }

      if (Object.keys(updates).length > 0) {
        await client.patch(existing._id).set(updates).commit();
        const seeded = Object.entries(updates).map(([k, v]) => `${k}(${Array.isArray(v) ? v.length : 1})`).join(', ');
        console.log(`✅ ${slug}: seeded ${seeded}`);
      } else {
        console.log(`⏭️  ${slug}: all arrays already populated, skipping`);
      }
    } catch (error) {
      console.error(`❌ ${slug}: ${error.message}`);
    }
  }

  console.log('\n✅ Done seeding product features!');
}

seedProductFeatures();
