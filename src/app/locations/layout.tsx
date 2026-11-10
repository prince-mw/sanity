import { ProposalBar } from '@/components/proposal/ProposalBar'

// Location pages carry the floating proposal bar (the shortlist provider sits
// in the root layout so the bar and /proposals share one state).
export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ProposalBar />
    </>
  )
}
