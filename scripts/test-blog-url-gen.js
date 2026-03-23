const { createClient } = require('@sanity/client');
const { createImageUrlBuilder } = require('@sanity/image-url');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = createImageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

function getSanityImageUrl(image, options) {
  if (!image || !image.asset) return '';
  try {
    let b = urlFor(image);
    if (options?.width) b = b.width(options.width);
    if (options?.height) b = b.height(options.height);
    b = b.quality(options?.quality || 85);
    return b.auto('format').url();
  } catch (error) {
    console.error('Error generating URL:', error.message);
    return '';
  }
}

async function main() {
  const posts = await client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) [0..4] { title, featuredImage }`
  );

  console.log('=== Testing URL Generation for 5 Blog Posts ===\n');
  
  posts.forEach((p, i) => {
    const url = getSanityImageUrl(p.featuredImage, { width: 1200 });
    console.log(`[${i + 1}] ${p.title}`);
    console.log(`    Raw: ${JSON.stringify(p.featuredImage)}`);
    console.log(`    URL: ${url}`);
    console.log(`    Valid: ${url.startsWith('https://') ? 'YES' : 'NO - PROBLEM!'}`);
    console.log('');
  });
}

main().catch(e => console.error('Error:', e.message));
