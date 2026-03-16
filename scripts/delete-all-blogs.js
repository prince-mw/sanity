/**
 * Delete all blog posts from Sanity
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
});

async function deleteAllBlogPosts() {
  console.log('🗑️  Deleting ALL blog posts...');
  
  try {
    const existingPosts = await client.fetch(`*[_type == "blogPost"]._id`);
    console.log(`  Found ${existingPosts.length} posts to delete`);
    
    if (existingPosts.length > 0) {
      const batchSize = 100;
      for (let i = 0; i < existingPosts.length; i += batchSize) {
        const batch = existingPosts.slice(i, i + batchSize);
        const transaction = client.transaction();
        batch.forEach(id => transaction.delete(id));
        await transaction.commit();
        console.log(`  Deleted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(existingPosts.length / batchSize)}`);
      }
    }
    
    console.log('✅ All blog posts deleted');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

deleteAllBlogPosts();
