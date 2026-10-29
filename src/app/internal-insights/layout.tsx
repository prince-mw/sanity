// Minimal header for the internal dashboard; the site header and footer hide themselves on this route.
export default function InternalInsightsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 sm:gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo/MW-logo-web.svg" alt="Moving Walls" className="h-8 sm:h-9 w-auto" />
          <span className="h-7 w-px bg-gray-200" aria-hidden="true" />
          <p className="text-sm sm:text-base font-semibold text-gray-900">
            Marketing Team Insights <span className="font-normal text-gray-400">| Internal &amp; Confidential</span>
          </p>
        </div>
      </header>
      {children}
    </>
  )
}
