/**
 * Find all Sanity CMS documents containing staging URLs (stg.movingwalls.com)
 * Run with: node scripts/find-staging-urls.js
 */
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
});

async function findStagingUrls() {
  console.log('🔍 Searching Sanity CMS for staging URLs...\n');

  // 1. Search in Portable Text content fields (blogs, case studies, press, etc.)
  const ptResults = await client.fetch(`
    *[
      _type in ["blogPost", "caseStudy", "pressRelease", "ebook", "event", "webinar", "landingPage", "product", "staticPage", "whitepaper"] &&
      (pt::text(content) match "stg.movingwalls*" || pt::text(body) match "stg.movingwalls*" || pt::text(challenge) match "stg.movingwalls*" || pt::text(solution) match "stg.movingwalls*" || pt::text(results) match "stg.movingwalls*")
    ]{_type, _id, title, "slug": slug.current}
  `);

  if (ptResults.length > 0) {
    console.log(`📝 Found ${ptResults.length} documents with staging URLs in body text:`);
    ptResults.forEach(d => console.log(`   - [${d._type}] ${d.title} (/${d.slug})`));
  }

  // 2. Search for staging URLs in string fields (links, URLs, etc.)
  const linkResults = await client.fetch(`
    *[
      defined(slug) &&
      (
        heroImage match "stg.movingwalls*" ||
        featuredImage match "stg.movingwalls*" ||
        viewUrl match "stg.movingwalls*" ||
        pdfFileUrl match "stg.movingwalls*" ||
        ctaLink match "stg.movingwalls*" ||
        formUrl match "stg.movingwalls*" ||
        contactFormUrl match "stg.movingwalls*" ||
        applicationFormUrl match "stg.movingwalls*"
      )
    ]{_type, _id, title, "slug": slug.current, heroImage, viewUrl, pdfFileUrl, ctaLink, formUrl, contactFormUrl, applicationFormUrl}
  `);

  if (linkResults.length > 0) {
    console.log(`\n🔗 Found ${linkResults.length} documents with staging URLs in link/URL fields:`);
    linkResults.forEach(d => {
      console.log(`   - [${d._type}] ${d.title || d._id} (/${d.slug})`);
      for (const [key, val] of Object.entries(d)) {
        if (typeof val === 'string' && val.includes('stg.movingwalls')) {
          console.log(`     ${key}: ${val}`);
        }
      }
    });
  }

  // 3. Search for internal links pointing to staging in portable text mark defs
  const markResults = await client.fetch(`
    *[
      _type in ["blogPost", "caseStudy", "pressRelease", "ebook", "event", "webinar", "staticPage", "whitepaper"]
    ]{
      _type, _id, title, "slug": slug.current,
      "stagingLinks": content[].markDefs[href match "stg.movingwalls*"].href
    }[count(stagingLinks) > 0]
  `);

  if (markResults.length > 0) {
    console.log(`\n🌐 Found ${markResults.length} documents with staging hyperlinks in content:`);
    markResults.forEach(d => {
      console.log(`   - [${d._type}] ${d.title} (/${d.slug})`);
      d.stagingLinks.forEach(link => console.log(`     → ${link}`));
    });
  }

  // 4. Also check body field (some types use body instead of content)
  const bodyMarkResults = await client.fetch(`
    *[
      _type in ["blogPost", "caseStudy", "pressRelease", "ebook", "event", "webinar", "staticPage", "whitepaper"]
    ]{
      _type, _id, title, "slug": slug.current,
      "stagingLinks": body[].markDefs[href match "stg.movingwalls*"].href
    }[count(stagingLinks) > 0]
  `);

  if (bodyMarkResults.length > 0) {
    console.log(`\n🌐 Found ${bodyMarkResults.length} documents with staging hyperlinks in body:`);
    bodyMarkResults.forEach(d => {
      console.log(`   - [${d._type}] ${d.title} (/${d.slug})`);
      d.stagingLinks.forEach(link => console.log(`     → ${link}`));
    });
  }

  // 5. Check challenge/solution/results fields (case studies)
  const csMarkResults = await client.fetch(`
    *[_type == "caseStudy"]{
      _type, _id, title, "slug": slug.current,
      "challengeLinks": challenge[].markDefs[href match "stg.movingwalls*"].href,
      "solutionLinks": solution[].markDefs[href match "stg.movingwalls*"].href,
      "resultsLinks": results[].markDefs[href match "stg.movingwalls*"].href
    }[count(challengeLinks) > 0 || count(solutionLinks) > 0 || count(resultsLinks) > 0]
  `);

  if (csMarkResults.length > 0) {
    console.log(`\n📊 Found ${csMarkResults.length} case studies with staging hyperlinks:`);
    csMarkResults.forEach(d => {
      console.log(`   - ${d.title} (/${d.slug})`);
      [...(d.challengeLinks || []), ...(d.solutionLinks || []), ...(d.resultsLinks || [])].forEach(link => console.log(`     → ${link}`));
    });
  }

  // 6. Check image URLs in portable text (embedded images with staging src)
  const imgResults = await client.fetch(`
    *[
      _type in ["blogPost", "caseStudy", "pressRelease"]
    ]{
      _type, _id, title, "slug": slug.current,
      "stagingImages": content[_type == "image" && asset._ref match "stg.movingwalls*"].asset._ref
    }[count(stagingImages) > 0]
  `);

  if (imgResults.length > 0) {
    console.log(`\n🖼️  Found ${imgResults.length} documents with staging image references:`);
    imgResults.forEach(d => console.log(`   - [${d._type}] ${d.title} (/${d.slug})`));
  }

  // Summary
  const total = ptResults.length + linkResults.length + markResults.length + bodyMarkResults.length + csMarkResults.length + imgResults.length;
  if (total === 0) {
    console.log('✅ No staging URLs found in Sanity CMS content!');
  } else {
    console.log(`\n📊 Total documents with staging URLs: ${total}`);
  }
}

findStagingUrls().catch(console.error);
