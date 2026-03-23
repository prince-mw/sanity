const { createClient } = require('@sanity/client');
const { createImageUrlBuilder } = require('@sanity/image-url');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = createImageUrlBuilder(client);
function urlFor(source) { return builder.image(source); }

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

function transformBlogPost(post) {
  return {
    slug: post.slug?.current || '',
    title: post.title || '',
    excerpt: post.excerpt || '',
    category: post.categories?.[0]?.title || 'General',
    author: post.author?.name || 'MovingWalls Team',
    date: post.publishedAt || '',
    readTime: post.readTime || '5 min read',
    featuredImage: getSanityImageUrl(post.featuredImage, { width: 1200 }) || '/assets/images/blog-placeholder.svg',
    tags: post.categories?.map(c => c.title) || [],
    featured: false,
  };
}

async function main() {
  // Use the same query as getAllBlogPosts()
  const publishedFilter = `!(_id in path("drafts.**")) && (publishedAt <= now() || !defined(publishedAt))`;
  const posts = await client.fetch(`
    *[_type == "blogPost" && ${publishedFilter}] | order(publishedAt desc) [0..9] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readTime,
      featuredImage,
      "author": author->{name, image, role},
      "categories": categories[]->{title, slug, color}
    }
  `);

  console.log('=== SIMULATED transformBlogPost() OUTPUT (first 10 posts) ===\n');
  
  let withImage = 0;
  let withPlaceholder = 0;
  let withEmpty = 0;

  posts.forEach((post, i) => {
    const transformed = transformBlogPost(post);
    const imgStatus = transformed.featuredImage.startsWith('https://') 
      ? 'CDN URL' 
      : transformed.featuredImage === '/assets/images/blog-placeholder.svg'
        ? 'PLACEHOLDER'
        : 'EMPTY/OTHER';
    
    if (imgStatus === 'CDN URL') withImage++;
    else if (imgStatus === 'PLACEHOLDER') withPlaceholder++;
    else withEmpty++;

    console.log(`[${i + 1}] ${transformed.title}`);
    console.log(`    slug: ${transformed.slug}`);
    console.log(`    featuredImage status: ${imgStatus}`);
    console.log(`    featuredImage value: ${transformed.featuredImage.substring(0, 100)}...`);
    console.log('');
  });

  console.log('=== SUMMARY ===');
  console.log(`CDN URLs (working): ${withImage}`);
  console.log(`Placeholders (no image): ${withPlaceholder}`);
  console.log(`Empty/other: ${withEmpty}`);

  // Also check if placeholder file exists
  const fs = require('fs');
  const placeholderPath = require('path').join(__dirname, '..', 'public', 'assets', 'images', 'blog-placeholder.svg');
  console.log(`\nPlaceholder file exists: ${fs.existsSync(placeholderPath)}`);
}

main().catch(e => console.error('Error:', e.message));
