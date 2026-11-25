import { EmartClient } from './_components/EmartClient';
import { getSlotStatusFromSheet } from './_slotSheet';

// Slot statuses come from the "eMart24 Slot Board" Google Sheet (see _data.ts).
// The page re-reads it at most every 5 minutes.
export const revalidate = 300;

export default async function EmartFoundingBrandsPage() {
  const slotStatus = await getSlotStatusFromSheet();
  return <EmartClient slotStatus={slotStatus} />;
}
