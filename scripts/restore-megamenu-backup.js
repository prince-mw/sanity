/**
 * Emergency rollback: restore the megaMenu document to its pre-migration,
 * plain-string shape from the backup saved by migrate-mega-menu-locale.js.
 *
 * Used when the locale-object schema migration has been applied to the live
 * dataset but the corresponding frontend code hasn't been deployed yet,
 * causing the currently-deployed (old) code to crash on the new object shape.
 *
 * Usage: node scripts/restore-megamenu-backup.js
 * Requires SANITY_API_TOKEN in the environment.
 */

const { createClient } = require('@sanity/client');

if (!process.env.SANITY_API_TOKEN) {
  console.error('SANITY_API_TOKEN is not set.');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const backup = require('./megaMenu-backup-1784285217642.json');

async function main() {
  console.log('Restoring megaMenu document from pre-migration backup...');
  await client
    .patch('megaMenu')
    .set({ mainNavItems: backup.mainNavItems, ctaButton: backup.ctaButton })
    .commit();
  console.log('Restored. mainNavItems and ctaButton are back to plain-string shape.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
