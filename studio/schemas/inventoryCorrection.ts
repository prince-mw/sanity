import { defineField, defineType } from 'sanity'

// A staff correction to one field of one Inventory API site (Rif, 14 Nov 2026).
// Written by /staff/inventory on the website, never edited by hand: the website
// applies it over the API's value on every pull, retires it when the API agrees,
// and flags it when the API changes again. See src/lib/inventory/correctionsCore.ts.
export default defineType({
  name: 'inventoryCorrection',
  title: 'Inventory correction',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({ name: 'siteId', title: 'Site id (Inventory API)', type: 'string' }),
    defineField({ name: 'country', title: 'Country slug', type: 'string' }),
    defineField({ name: 'field', title: 'Field', type: 'string', options: { list: ['name', 'address', 'state', 'district', 'area', 'point', 'size', 'facing', 'hidden'] } }),
    defineField({ name: 'value', title: 'Corrected value', type: 'string' }),
    defineField({ name: 'apiValue', title: 'API value when corrected', type: 'string' }),
    defineField({ name: 'reason', title: 'Why', type: 'text', rows: 2 }),
    defineField({ name: 'by', title: 'Corrected by (email)', type: 'string' }),
    defineField({ name: 'byName', title: 'Corrected by', type: 'string' }),
    defineField({ name: 'at', title: 'Corrected at', type: 'datetime' }),
    defineField({
      name: 'resolved', title: 'Where the corrected map point resolves', type: 'object',
      fields: ['adminLevel0Name', 'adminLevel1Name', 'adminLevel2Name', 'adminLevel3Name'].map(n => defineField({ name: n, type: 'string' })),
    }),
  ],
  preview: { select: { title: 'field', subtitle: 'value', description: 'reason' } },
})
