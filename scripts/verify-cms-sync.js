const token = "skzWqNrd9gVclCzZ5lCqkB7001eELcKxoGqcrdEcnptysBG2llbIRIYsaSZFpkdXHhjIltR4tsxEJlGrlvviDRkVQuT7JozlQ8Cm3SLbbWgqzZtiiNqMftcrRXzKABCWrJdymtgakhSwDBqk23lCxEu3cATa2AayhCsHZyDbRFPseSIBq9UM";
const projectId = "u10im6di";
const dataset = "production";
const base = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}`;

async function q(label, query) {
  const url = `${base}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json();
  return { label, result: data.result };
}

(async () => {
  const checks = await Promise.all([
    q("Footer Config", '*[_type == "footerConfig"][0]{ _id, companyDescription, "navCatCount": count(navCategories), "socialCount": count(socialLinks), "legalCount": count(legalLinks), copyrightText }'),
    q("TrustBar", '*[_type == "trustBar"][0]{ _id, "statsCount": count(stats), stats[]{ value, label } }'),
    q("Client Partners", '*[_type == "clientPartners"][0]{ _id, sectionTitle, "partnerCount": count(partners), partners[]{ name, category } }'),
    q("Offices", '*[_type == "office"]{ _id, city, country, isActive } | order(city asc)'),
    q("Audience - Brands", '*[_type == "audiencePage" && pageType == "brands"][0]{ _id, title, "statsCount": count(stats), "benefitsCount": count(benefits), "featuresCount": count(platformFeatures), "faqsCount": count(faqs), "logosCount": count(customerLogos), "journeyCount": count(journeySteps) }'),
    q("Audience - Agencies", '*[_type == "audiencePage" && pageType == "agencies"][0]{ _id, title, "statsCount": count(stats), "benefitsCount": count(benefits), "featuresCount": count(platformFeatures), "faqsCount": count(faqs), "logosCount": count(customerLogos), "journeyCount": count(journeySteps) }'),
    q("Audience - MediaOwners", '*[_type == "audiencePage" && pageType == "media-owners"][0]{ _id, title, "statsCount": count(stats), "benefitsCount": count(benefits), "featuresCount": count(platformFeatures), "faqsCount": count(faqs), "logosCount": count(customerLogos), "journeyCount": count(journeySteps) }'),
    q("Help Center FAQs", '{ "total": count(*[_type == "helpCenterFaq"]), "published": count(*[_type == "helpCenterFaq" && isPublished == true]), "categories": array::unique(*[_type == "helpCenterFaq"].category) }'),
    q("Documentation", '*[_type == "apiReferencePage"][0]{ _id, title, subtitle, "endpointCount": count(endpoints), "sdkCount": count(sdks), ctaTitle }'),
  ]);

  let allGood = true;

  for (const c of checks) {
    console.log("\n========================================");
    console.log("  " + c.label);
    console.log("========================================");
    if (!c.result || (Array.isArray(c.result) && c.result.length === 0)) {
      console.log("  ❌ NOT FOUND");
      allGood = false;
    } else if (Array.isArray(c.result)) {
      console.log("  ✅ Found " + c.result.length + " documents");
      c.result.forEach(r => {
        const name = r.city || r.name || r._id;
        const extra = r.country ? ` (${r.country})` : "";
        const status = r.isActive !== undefined ? (r.isActive ? " ✅ active" : " ⚠️  inactive") : "";
        console.log("    - " + name + extra + status);
      });
    } else {
      console.log("  ✅ Found");
      console.log(JSON.stringify(c.result, null, 2).split("\n").map(l => "     " + l).join("\n"));
    }
  }

  console.log("\n\n========================================");
  console.log("  SYNC SUMMARY");
  console.log("========================================");
  const missing = checks.filter(c => !c.result || (Array.isArray(c.result) && c.result.length === 0));
  if (missing.length === 0) {
    console.log("  ✅ All 9 data areas synced successfully!");
  } else {
    allGood = false;
    console.log("  ⚠️  Missing: " + missing.map(m => m.label).join(", "));
  }

  process.exit(allGood ? 0 : 1);
})();
