import { CATEGORIES, SLOTS, SLOT_SHEET_CSV_URL } from './_data';

type Status = 'talks' | 'taken';

// Minimal CSV parser (handles quoted cells, commas and quotes inside them).
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') {
      row.push(cell);
      cell = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else cell += ch;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

const norm = (s: string) => s.toLowerCase().replace(/[–—-]/g, '-').replace(/\s+/g, ' ').trim();

/** Reads the "Website feed" tab of the eMart24 Slot Board Google Sheet (published to the
 *  web as CSV) and returns { "category:slot": status }. Any problem returns {} so the page
 *  still renders with every slot open. */
export async function getSlotStatusFromSheet(): Promise<Record<string, Status>> {
  if (!SLOT_SHEET_CSV_URL) return {};
  try {
    const res = await fetch(SLOT_SHEET_CSV_URL, { next: { revalidate: 300 } });
    if (!res.ok) {
      console.error('[emart24] slot sheet fetch failed', res.status);
      return {};
    }
    const rows = parseCsv(await res.text());
    const out: Record<string, Status> = {};
    for (const [catName = '', slotName = '', statusName = ''] of rows.slice(1)) {
      const cat = CATEGORIES.find((c) => norm(c.name) === norm(catName));
      // Sheet values look like "14–16 Afternoon"; match on the leading hours label.
      const slot = SLOTS.find((s) => norm(slotName).startsWith(norm(s.label)));
      const st = norm(statusName);
      const status: Status | null = st === 'taken' ? 'taken' : st === 'in talks' ? 'talks' : null;
      if (cat && slot && status) out[`${cat.id}:${slot.id}`] = status;
    }
    return out;
  } catch (e) {
    console.error('[emart24] slot sheet error', e);
    return {};
  }
}
