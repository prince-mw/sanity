const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function main() {
  // Get the latest blog post with ALL image data expanded
  const post = await client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) [0] {
      _id,
      title,
      "slug": slug.current,
      featuredImage {
        ...,
        "assetDetails": asset->{
          _id,
          url,
          originalFilename,
          metadata {
            dimensions,
            lqip
          }
        }
      },
      "bodyImages": content[_type == "image"] {
        ...,
        "assetDetails": asset->{
          _id,
          url,
          originalFilename,
          metadata {
            dimensions
          }
        }
      },
      "author": author->{
        name,
        image {
          ...,
          "assetDetails": asset->{
            _id,
            url,
            originalFilename
          }
        }
      }
    }
  `);

  console.log('=== BLOG POST: ' + post.title + ' ===');
  console.log('Slug:', post.slug);
  console.log('');

  // Featured Image
  console.log('--- FEATURED IMAGE ---');
  if (post.featuredImage) {
    console.log('  _type:', post.featuredImage._type);
    console.log('  asset._ref:', post.featuredImage.asset?._ref);
    if (post.featuredImage.assetDetails) {
      const d = post.featuredImage.assetDetails;
      console.log('  Asset ID:', d._id);
      console.log('  Original Filename:', d.originalFilename);
      console.log('  URL:', d.url);
      console.log('  Dimensions:', d.metadata?.dimensions?.width + 'x' + d.metadata?.dimensions?.height);
    } else {
      console.log('  ⚠ No asset details resolved (asset reference may be broken)');
    }
    if (post.featuredImage.hotspot) {
      console.log('  Hotspot:', JSON.stringify(post.featuredImage.hotspot));
    }
    if (post.featuredImage.crop) {
      console.log('  Crop:', JSON.stringify(post.featuredImage.crop));
    }
  } else {
    console.log('  ⚠ NO FEATURED IMAGE SET');
  }
  console.log('');

  // Body Images
  console.log('--- BODY/CONTENT IMAGES ---');
  if (post.bodyImages && post.bodyImages.length > 0) {
    post.bodyImages.forEach((img, i) => {
      console.log(`  [${i + 1}] _type: ${img._type}`);
      console.log(`      asset._ref: ${img.asset?._ref}`);
      if (img.assetDetails) {
        console.log(`      Original Filename: ${img.assetDetails.originalFilename}`);
        console.log(`      URL: ${img.assetDetails.url}`);
        console.log(`      Dimensions: ${img.assetDetails.metadata?.dimensions?.width}x${img.assetDetails.metadata?.dimensions?.height}`);
      }
      if (img.alt) console.log(`      Alt text: ${img.alt}`);
      if (img.caption) console.log(`      Caption: ${img.caption}`);
    });
  } else {
    console.log('  No inline images in body content');
  }
  console.log('');

  // Author Image
  console.log('--- AUTHOR IMAGE ---');
  console.log('  Author:', post.author?.name);
  if (post.author?.image) {
    console.log('  _type:', post.author.image._type);
    console.log('  asset._ref:', post.author.image.asset?._ref);
    if (post.author.image.assetDetails) {
      console.log('  Original Filename:', post.author.image.assetDetails.originalFilename);
      console.log('  URL:', post.author.image.assetDetails.url);
    }
  } else {
    console.log('  ⚠ No author image');
  }

  // Summary
  console.log('');
  console.log('=== SUMMARY ===');
  const totalImages = 
    (post.featuredImage ? 1 : 0) + 
    (post.bodyImages?.length || 0) + 
    (post.author?.image ? 1 : 0);
  console.log('Total images in this post:', totalImages);
  console.log('  Featured Image:', post.featuredImage ? '✅ Present' : '❌ Missing');
  console.log('  Body Images:', (post.bodyImages?.length || 0));
  console.log('  Author Image:', post.author?.image ? '✅ Present' : '❌ Missing');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
