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
    q("Whitepapers", 'count(*[_type == "whitepaper"])'),
    q("Ebooks", 'count(*[_type == "ebook"])'),
    q("Press Releases", 'count(*[_type == "pressRelease"])'),
    q("Media Features", 'count(*[_type == "mediaFeature"])'),
    q("Webinars", 'count(*[_type == "webinar"])'),
    q("Events", 'count(*[_type == "event"])'),
    q("Jobs", 'count(*[_type == "job"])'),
    q("Offices (contact)", 'count(*[_type == "office"])'),
    // Also check alternate type names
    q("Alt: integrationPartner", 'count(*[_type == "integrationPartner"])'),
    q("Alt: pressArticle", 'count(*[_type == "pressArticle"])'),
    q("Alt: pressNews", 'count(*[_type == "pressNews"])'),
    q("Alt: career", 'count(*[_type == "career"])'),
    q("Alt: jobListing", 'count(*[_type == "jobListing"])'),
    q("Alt: jobPosting", 'count(*[_type == "jobPosting"])'),
  ]);

  console.log("\n=== P2 CMS DATA AUDIT ===\n");
  for (const c of checks) {
    const status = c.result > 0 ? "✅" : "❌";
    console.log(`${status} ${c.label}: ${c.result} documents`);
  }
})();
