const {createClient} = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01'
});

async function checkAllContent() {
  console.log('=== Sanity Content Check ===\n');
  
  // Blog Posts
  const blogCount = await client.fetch('count(*[_type == "blogPost"])');
  const blogs = await client.fetch('*[_type == "blogPost"] | order(_createdAt desc) { title }[0...3]');
  console.log(`📰 Blog Posts: ${blogCount}`);
  if (blogs.length) console.log(`   Sample: ${blogs.map(b => b.title).join(', ')}`);
  
  // Case Studies
  const caseCount = await client.fetch('count(*[_type == "caseStudy"])');
  const cases = await client.fetch('*[_type == "caseStudy"] | order(_createdAt desc) { title }[0...3]');
  console.log(`📊 Case Studies: ${caseCount}`);
  if (cases.length) console.log(`   Sample: ${cases.map(c => c.title).join(', ')}`);
  
  // Press Releases
  const pressCount = await client.fetch('count(*[_type == "pressRelease"])');
  const press = await client.fetch('*[_type == "pressRelease"] | order(_createdAt desc) { title }[0...3]');
  console.log(`📢 Press Releases: ${pressCount}`);
  if (press.length) console.log(`   Sample: ${press.map(p => p.title).join(', ')}`);
  
  // Events
  const eventCount = await client.fetch('count(*[_type == "event"])');
  const events = await client.fetch('*[_type == "event"] | order(_createdAt desc) { title }[0...3]');
  console.log(`📅 Events: ${eventCount}`);
  if (events.length) console.log(`   Sample: ${events.map(e => e.title).join(', ')}`);
  
  // Webinars
  const webinarCount = await client.fetch('count(*[_type == "webinar"])');
  const webinars = await client.fetch('*[_type == "webinar"] | order(_createdAt desc) { title }[0...3]');
  console.log(`🎥 Webinars: ${webinarCount}`);
  if (webinars.length) console.log(`   Sample: ${webinars.map(w => w.title).join(', ')}`);
  
  // Ebooks
  const ebookCount = await client.fetch('count(*[_type == "ebook"])');
  const ebooks = await client.fetch('*[_type == "ebook"] | order(_createdAt desc) { title }[0...3]');
  console.log(`📚 Ebooks: ${ebookCount}`);
  if (ebooks.length) console.log(`   Sample: ${ebooks.map(e => e.title).join(', ')}`);
  
  // Whitepapers
  const wpCount = await client.fetch('count(*[_type == "whitepaper"])');
  const whitepapers = await client.fetch('*[_type == "whitepaper"] | order(_createdAt desc) { title }[0...3]');
  console.log(`📄 Whitepapers: ${wpCount}`);
  if (whitepapers.length) console.log(`   Sample: ${whitepapers.map(w => w.title).join(', ')}`);
  
  // Products
  const productCount = await client.fetch('count(*[_type == "product"])');
  const products = await client.fetch('*[_type == "product"] | order(_createdAt desc) { title }[0...3]');
  console.log(`🛠️ Products: ${productCount}`);
  if (products.length) console.log(`   Sample: ${products.map(p => p.title).join(', ')}`);
  
  // Team Members
  const teamCount = await client.fetch('count(*[_type == "teamMember"])');
  const team = await client.fetch('*[_type == "teamMember"] | order(_createdAt desc) { name }[0...3]');
  console.log(`👥 Team Members: ${teamCount}`);
  if (team.length) console.log(`   Sample: ${team.map(t => t.name).join(', ')}`);
  
  // Jobs
  const jobCount = await client.fetch('count(*[_type == "job"])');
  const jobs = await client.fetch('*[_type == "job"] | order(_createdAt desc) { title }[0...3]');
  console.log(`💼 Jobs: ${jobCount}`);
  if (jobs.length) console.log(`   Sample: ${jobs.map(j => j.title).join(', ')}`);
  
  // Landing Pages
  const lpCount = await client.fetch('count(*[_type == "landingPage"])');
  const lps = await client.fetch('*[_type == "landingPage"] { title, isPublished }');
  console.log(`🚀 Landing Pages: ${lpCount}`);
  if (lps.length) console.log(`   Sample: ${lps.map(l => `${l.title} (${l.isPublished ? 'published' : 'draft'})`).join(', ')}`);
  
  // Mega Menu
  const megaMenu = await client.fetch('*[_type == "megaMenu"][0] { _id, title, "itemCount": count(mainNavItems) }');
  console.log(`🍔 Mega Menu: ${megaMenu ? `Configured (${megaMenu.itemCount} items)` : 'Not configured'}`);
  
  // Page SEO
  const seoCount = await client.fetch('count(*[_type == "pageSeo"])');
  const pageSeo = await client.fetch('*[_type == "pageSeo"] { pageId }');
  console.log(`🔍 Page SEO: ${seoCount}`);
  if (pageSeo.length) console.log(`   Pages: ${pageSeo.map(p => p.pageId).join(', ')}`);
  
  // Categories
  const catCount = await client.fetch('count(*[_type == "category"])');
  console.log(`🏷️ Categories: ${catCount}`);
  
  // Authors
  const authorCount = await client.fetch('count(*[_type == "author"])');
  console.log(`✍️ Authors: ${authorCount}`);
  
  console.log('\n=== Integration Status ===\n');
}

checkAllContent().catch(console.error);
