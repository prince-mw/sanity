const {createClient} = require("@sanity/client");

const client = createClient({
  projectId: "u10im6di",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skzWqNrd9gVclCzZ5lCqkB7001eELcKxoGqcrdEcnptysBG2llbIRIYsaSZFpkdXHhjIltR4tsxEJlGrlvviDRkVQuT7JozlQ8Cm3SLbbWgqzZtiiNqMftcrRXzKABCWrJdymtgakhSwDBqk23lCxEu3cATa2AayhCsHZyDbRFPseSIBq9UM",
  useCdn: false,
});

// Old random-ID duplicates where our seeded office-* versions exist
const duplicatesToDelete = [
  "dsdzDBKQU3TOwM9o6hB6k9",  // Bangalore (dup of office-bangalore)
  "ca24cbbf-49e8-48c3-84b6-2de5fdab9660",  // Chennai (dup of office-chennai)
  "4WosXPXvlMgq3tPqrTdXur",  // Colombo (dup of office-colombo)
  "NUzgRk9h7jKjntS8pyrlGA",  // Jakarta (dup of office-jakarta)
  "fd1a9b1b-f509-49e7-8f94-86f47385dadd",  // Jakarta (dup of office-jakarta)
  "dsdzDBKQU3TOwM9o6hB6Uz",  // Kuala Lumpur (dup of office-kuala-lumpur)
  "4WosXPXvlMgq3tPqrTdXnd",  // Manila (dup of office-manila)
  "4WosXPXvlMgq3tPqrTdY25",  // Mumbai (dup of office-mumbai)
  "dsdzDBKQU3TOwM9o6hB6Fp",  // Singapore (dup of office-singapore)
];

async function main() {
  let tx = client.transaction();
  for (const id of duplicatesToDelete) {
    tx = tx.delete(id);
    console.log("Deleting duplicate:", id);
  }
  await tx.commit();
  console.log("\nDeleted", duplicatesToDelete.length, "duplicate office documents");

  const remaining = await client.fetch('*[_type == "office"]{ _id, city, country } | order(city asc)');
  console.log("\nRemaining offices (" + remaining.length + "):");
  remaining.forEach(o => console.log("  " + o._id + " | " + o.city + ", " + o.country));
}

main().catch(err => { console.error(err); process.exit(1); });
