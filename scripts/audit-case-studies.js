const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function main() {
  const data = await client.fetch(`{
    "total": count(*[_type == "caseStudy"]),
    "published": count(*[_type == "caseStudy" && isPublished == true && status == "published"]),
    "industries": *[_type == "caseStudy" && isPublished == true && status == "published"].industry,
    "latest": *[_type == "caseStudy" && isPublished == true && status == "published"] | order(publishedAt desc) [0..9] {
      title,
      industry,
      client,
      "slug": slug.current,
      "hasImage": defined(featuredImage.asset),
      publishedAt,
      excerpt
    }
  }`);

  console.log('Total case studies:', data.total);
  console.log('Published:', data.published);
  
  const uniqueIndustries = [...new Set(data.industries)];
  console.log('Industries:', uniqueIndustries.join(', '));
  console.log('');
  
  console.log('Latest 10 published:');
  data.latest.forEach((cs, i) => {
    console.log(`  [${i + 1}] ${cs.title}`);
    console.log(`      Client: ${cs.client} | Industry: ${cs.industry} | Image: ${cs.hasImage ? 'YES' : 'NO'}`);
    console.log(`      Slug: ${cs.slug} | Date: ${cs.publishedAt}`);
  });
}

main().catch(e => console.error('Error:', e.message));
