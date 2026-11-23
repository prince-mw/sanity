// Metadata lives in each page (mw-science/page.tsx and mw-science/lab/page.tsx), so the
// MW Science Lab child page doesn't inherit the MW Science canonical URL.
export default function MWScienceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
