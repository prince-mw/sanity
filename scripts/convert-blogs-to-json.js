/**
 * Convert TypeScript blog posts to JSON for migration
 * 
 * Usage: node scripts/convert-blogs-to-json.js
 */

const fs = require('fs');
const path = require('path');

// Read the TypeScript file
const tsFilePath = path.join(__dirname, '../src/data/blog-posts-generated.ts');
const tsContent = fs.readFileSync(tsFilePath, 'utf-8');

// Find the start of the blogPosts array - look for the actual pattern
const startMarker = 'export const blogPosts: BlogPost[] = [';
const markerIndex = tsContent.indexOf(startMarker);
if (markerIndex === -1) {
  console.error('Could not find blogPosts array');
  process.exit(1);
}

// The array starts at the '[' character
const arrayStartIndex = markerIndex + 'export const blogPosts: BlogPost[] = '.length;

// Extract from the array start
let arrayContent = tsContent.substring(arrayStartIndex).trim();

// Find where the array ends - look for "];" followed by comments or helper functions
const endPattern = /\];\s*\n\s*\/\//;
const endMatch = arrayContent.match(endPattern);
if (endMatch) {
  arrayContent = arrayContent.substring(0, endMatch.index + 1); // Include the ]
}

console.log(`Extracted array content (${arrayContent.length} characters)`);
console.log(`First 100 chars: ${arrayContent.substring(0, 100)}`);
console.log(`Last 100 chars: ${arrayContent.substring(arrayContent.length - 100)}`);

// Parse as JSON (the array is valid JSON)
try {
  const blogPosts = JSON.parse(arrayContent);
  
  // Write as JSON
  const jsonFilePath = path.join(__dirname, 'blog-posts.json');
  fs.writeFileSync(jsonFilePath, JSON.stringify(blogPosts, null, 2));
  
  console.log(`Converted ${blogPosts.length} blog posts to JSON`);
  console.log(`JSON file: ${jsonFilePath}`);
  
} catch (e) {
  console.error('Error parsing JSON:', e.message);
  // Try to show where the error is
  const errorMatch = e.message.match(/position (\d+)/);
  if (errorMatch) {
    const pos = parseInt(errorMatch[1]);
    console.log('Context around error:');
    console.log(arrayContent.substring(Math.max(0, pos - 100), pos + 100));
  }
  process.exit(1);
}
