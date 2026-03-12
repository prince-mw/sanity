/**
 * Convert TypeScript case studies to JSON for migration
 * 
 * Usage: node scripts/convert-casestudies-to-json.js
 */

const fs = require('fs');
const path = require('path');

// Read the TypeScript file
const tsFilePath = path.join(__dirname, '../src/data/case-studies.ts');
const tsContent = fs.readFileSync(tsFilePath, 'utf-8');

// Find the start of the caseStudies array
const startMarker = 'export const caseStudies: CaseStudy[] = [';
const markerIndex = tsContent.indexOf(startMarker);
if (markerIndex === -1) {
  console.error('Could not find caseStudies array');
  process.exit(1);
}

// The array starts at the '[' character
const arrayStartIndex = markerIndex + 'export const caseStudies: CaseStudy[] = '.length;

// Extract from the array start
let arrayContent = tsContent.substring(arrayStartIndex).trim();

// Find where the array ends - look for "];" followed by comments or helper functions or EOF
const endPattern = /\];\s*(\n\s*\/\/|$)/;
const endMatch = arrayContent.match(endPattern);
if (endMatch) {
  arrayContent = arrayContent.substring(0, endMatch.index + 1); // Include the ]
} else {
  // If no match, try to find the last ];
  const lastBracket = arrayContent.lastIndexOf('];');
  if (lastBracket !== -1) {
    arrayContent = arrayContent.substring(0, lastBracket + 1);
  }
}

console.log(`Extracted array content (${arrayContent.length} characters)`);
console.log(`First 100 chars: ${arrayContent.substring(0, 100)}`);
console.log(`Last 100 chars: ${arrayContent.substring(arrayContent.length - 100)}`);

// Parse as JSON
try {
  const caseStudies = JSON.parse(arrayContent);
  
  // Write as JSON
  const jsonFilePath = path.join(__dirname, 'case-studies.json');
  fs.writeFileSync(jsonFilePath, JSON.stringify(caseStudies, null, 2));
  
  console.log(`Converted ${caseStudies.length} case studies to JSON`);
  console.log(`JSON file: ${jsonFilePath}`);
  
} catch (e) {
  console.error('Error parsing JSON:', e.message);
  const errorMatch = e.message.match(/position (\d+)/);
  if (errorMatch) {
    const pos = parseInt(errorMatch[1]);
    console.log('Context around error:');
    console.log(arrayContent.substring(Math.max(0, pos - 100), pos + 100));
  }
  process.exit(1);
}
