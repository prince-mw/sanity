const {createClient} = require("@sanity/client");

const client = createClient({
  projectId: "u10im6di",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skzWqNrd9gVclCzZ5lCqkB7001eELcKxoGqcrdEcnptysBG2llbIRIYsaSZFpkdXHhjIltR4tsxEJlGrlvviDRkVQuT7JozlQ8Cm3SLbbWgqzZtiiNqMftcrRXzKABCWrJdymtgakhSwDBqk23lCxEu3cATa2AayhCsHZyDbRFPseSIBq9UM",
  useCdn: false,
});

// ============================================
// WHITEPAPERS (6 documents)
// ============================================
async function seedWhitepapers() {
  console.log("\n📄 Seeding Whitepapers...");

  const whitepapers = [
    {
      _id: "whitepaper-dooh-state-2025",
      _type: "whitepaper",
      isPublished: true,
      status: "published",
      title: "The State of Digital Out-of-Home Advertising 2025",
      slug: { _type: "slug", current: "state-of-dooh-2025" },
      description: "Comprehensive analysis of DOOH trends, market dynamics, consumer behavior, and ROI metrics across industries.",
      category: "industry-report",
      pages: 45,
      downloads: "12.5K+",
      publishDate: "Nov 2025",
      topics: ["Market Analysis", "Consumer Insights", "ROI Metrics", "Future Trends"],
      featured: true,
      order: 1,
    },
    {
      _id: "whitepaper-ai-advertising",
      _type: "whitepaper",
      isPublished: true,
      status: "published",
      title: "AI-Powered Advertising: The Complete Guide",
      slug: { _type: "slug", current: "ai-powered-advertising-guide" },
      description: "How machine learning and artificial intelligence are transforming campaign optimization and audience targeting.",
      category: "technology",
      pages: 38,
      downloads: "8.2K+",
      publishDate: "Oct 2025",
      topics: ["Machine Learning", "Optimization", "Targeting", "Automation"],
      featured: false,
      order: 2,
    },
    {
      _id: "whitepaper-programmatic-dooh",
      _type: "whitepaper",
      isPublished: true,
      status: "published",
      title: "Programmatic DOOH: Best Practices for 2025",
      slug: { _type: "slug", current: "programmatic-dooh-best-practices" },
      description: "Strategic framework for implementing and optimizing programmatic digital out-of-home advertising campaigns.",
      category: "best-practices",
      pages: 32,
      downloads: "9.7K+",
      publishDate: "Sep 2025",
      topics: ["Programmatic", "Strategy", "Implementation", "Optimization"],
      featured: false,
      order: 3,
    },
    {
      _id: "whitepaper-healthcare-compliance",
      _type: "whitepaper",
      isPublished: true,
      status: "published",
      title: "Healthcare Marketing Compliance Guide",
      slug: { _type: "slug", current: "healthcare-marketing-compliance" },
      description: "Navigate HIPAA regulations and healthcare advertising compliance while maximizing campaign effectiveness.",
      category: "compliance",
      pages: 28,
      downloads: "5.4K+",
      publishDate: "Aug 2025",
      topics: ["HIPAA", "Compliance", "Healthcare", "Best Practices"],
      featured: false,
      order: 4,
    },
    {
      _id: "whitepaper-retail-omnichannel",
      _type: "whitepaper",
      isPublished: true,
      status: "published",
      title: "Retail Advertising in the Omnichannel Era",
      slug: { _type: "slug", current: "retail-omnichannel-advertising" },
      description: "Strategies for connecting online and offline experiences to drive foot traffic and sales.",
      category: "industry-guide",
      pages: 35,
      downloads: "7.8K+",
      publishDate: "Jul 2025",
      topics: ["Retail", "Omnichannel", "Foot Traffic", "Sales"],
      featured: false,
      order: 5,
    },
    {
      _id: "whitepaper-location-intelligence",
      _type: "whitepaper",
      isPublished: true,
      status: "published",
      title: "Location Intelligence: Advanced Geo-Targeting",
      slug: { _type: "slug", current: "location-intelligence-geo-targeting" },
      description: "Leveraging location data and geographic insights for precision advertising and audience targeting.",
      category: "technology",
      pages: 42,
      downloads: "6.3K+",
      publishDate: "Jun 2025",
      topics: ["Geo-Targeting", "Location Data", "Audience", "Analytics"],
      featured: false,
      order: 6,
    },
  ];

  let tx = client.transaction();
  for (const wp of whitepapers) {
    tx = tx.createOrReplace(wp);
  }
  await tx.commit();
  console.log(`  ✅ Seeded ${whitepapers.length} whitepapers`);
}

// ============================================
// MEDIA FEATURES (4 documents — pressRelease with isMediaFeature=true)
// ============================================
async function seedMediaFeatures() {
  console.log("\n📰 Seeding Media Features...");

  const mediaFeatures = [
    {
      _id: "media-feature-adweek",
      _type: "pressRelease",
      isPublished: true,
      status: "published",
      title: "How MovingWalls is Revolutionizing Out-of-Home Advertising",
      slug: { _type: "slug", current: "adweek-revolutionizing-ooh" },
      publishedAt: "2024-11-08T00:00:00Z",
      source: "AdWeek",
      category: "media-spotlight",
      isMediaFeature: true,
      hasFullArticle: false,
      readTime: "5 min read",
    },
    {
      _id: "media-feature-techcrunch",
      _type: "pressRelease",
      isPublished: true,
      status: "published",
      title: "The Future of Programmatic Advertising Technology",
      slug: { _type: "slug", current: "techcrunch-programmatic-future" },
      publishedAt: "2024-10-15T00:00:00Z",
      source: "TechCrunch",
      category: "industry-news",
      isMediaFeature: true,
      hasFullArticle: false,
      readTime: "7 min read",
    },
    {
      _id: "media-feature-marketing-land",
      _type: "pressRelease",
      isPublished: true,
      status: "published",
      title: "CEO Interview: Building the Next Generation Ad Platform",
      slug: { _type: "slug", current: "marketing-land-ceo-interview" },
      publishedAt: "2024-09-30T00:00:00Z",
      source: "Marketing Land",
      category: "media-spotlight",
      isMediaFeature: true,
      hasFullArticle: false,
      readTime: "6 min read",
    },
    {
      _id: "media-feature-forbes",
      _type: "pressRelease",
      isPublished: true,
      status: "published",
      title: "MovingWalls Among Top 50 Most Innovative Companies",
      slug: { _type: "slug", current: "forbes-top-50-innovative" },
      publishedAt: "2024-09-01T00:00:00Z",
      source: "Forbes",
      category: "recognition",
      isMediaFeature: true,
      hasFullArticle: false,
      readTime: "4 min read",
    },
  ];

  let tx = client.transaction();
  for (const mf of mediaFeatures) {
    tx = tx.createOrReplace(mf);
  }
  await tx.commit();
  console.log(`  ✅ Seeded ${mediaFeatures.length} media features`);
}

// ============================================
// MAIN
// ============================================
async function main() {
  console.log("🚀 Seeding P2 missing CMS data...\n");

  await seedWhitepapers();
  await seedMediaFeatures();

  console.log("\n✅ All P2 data seeded successfully!");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
