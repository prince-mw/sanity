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
    q("Integrations", 'count(*[_type == "integration"])'),
    q("OOH Formats", 'count(*[_type == "oohFormat"])'),
    q("Whitepapers", '{ "count": count(*[_type == "whitepaper"]), "titles": *[_type == "whitepaper"] | order(order asc) { title, category, featured } }'),
    q("Ebooks", 'count(*[_type == "ebook"])'),
    q("Press Releases", 'count(*[_type == "pressRelease" && isMediaFeature != true])'),
    q("Media Features", '{ "count": count(*[_type == "pressRelease" && isMediaFeature == true]), "items": *[_type == "pressRelease" && isMediaFeature == true] | order(publishedAt desc) { title, source } }'),
    q("Webinars", 'count(*[_type == "webinar"])'),
    q("Events", 'count(*[_type == "event"])'),
    q("Jobs", 'count(*[_type == "jobPosition"])'),
    q("Offices", 'count(*[_type == "office"])'),
  ]);

  console.log("\n=== P2 FINAL VERIFICATION ===\n");

  let allGood = true;
  for (const c of checks) {
    const count = typeof c.result === "number" ? c.result : c.result?.count;
    const status = count > 0 ? "✅" : "❌";
    if (count === 0) allGood = false;

    console.log(`${status} ${c.label}: ${count} documents`);

    // Show details for newly seeded items
    if (typeof c.result === "object" && c.result.titles) {
      c.result.titles.forEach(t => console.log(`    - ${t.title} [${t.category}]${t.featured ? " ⭐ featured" : ""}`));
    }
    if (typeof c.result === "object" && c.result.items) {
      c.result.items.forEach(t => console.log(`    - ${t.source}: ${t.title}`));
    }
  }

  console.log("\n" + (allGood ? "✅ All 9 P2 data areas have CMS content!" : "⚠️  Some areas still missing data"));
})();
