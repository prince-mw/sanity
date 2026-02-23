'use client'

import Link from 'next/link'

export default function SitemapPage() {
  const downloadAsExcel = () => {
    // Prepare data for Excel/CSV
    const rows = [
      ['Section', 'Page Name', 'URL', 'Status'],
    ]

    siteStructure.forEach((section) => {
      // Add section header
      if (section.href) {
        rows.push([section.name, section.name + ' (Main)', section.href, 'Active'])
      }
      // Add all pages under this section
      section.pages.forEach((page) => {
        rows.push([section.name, page.name, page.href, 'Active'])
      })
    })

    // Convert to CSV format
    const csvContent = rows.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n')

    // Create blob and download
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'MovingWalls_Sitemap.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const siteStructure = [
    {
      name: "Home",
      href: "/",
      pages: []
    },
    {
      name: "About",
      href: null,
      pages: [
        { name: "Our Story", href: "/about/our-story" },
        { name: "Our Journey", href: "/about/our-journey" },
        { name: "Leadership", href: "/about/leadership" },
        { name: "Careers", href: "/about/careers" },
        { name: "Press & News", href: "/about/press-news" },
      ]
    },
    {
      name: "Products",
      href: null,
      pages: [
        { name: "MW Planner", href: "/products/mw-planner" },
        { name: "MW Activate", href: "/products/mw-activate" },
        { name: "MW Measure", href: "/products/mw-measure" },
        { name: "MW Influence", href: "/products/mw-influence" },
        { name: "MW Market", href: "/products/mw-market" },
        { name: "MW Studio", href: "/products/mw-studio" },
        { name: "MW Science", href: "/products/mw-science" },
      ]
    },
    {
      name: "Solutions",
      href: null,
      pages: [
        { name: "For Brands", href: "/solutions/brands" },
        { name: "For Agencies", href: "/solutions/agencies" },
        { name: "For Media Owners", href: "/solutions/media-owners" },
        { name: "Healthcare", href: "/solutions/healthcare" },
        { name: "Retail", href: "/solutions/retail" },
        { name: "Finance", href: "/solutions/finance" },
      ]
    },
    {
      name: "Resources",
      href: "/resources",
      pages: [
        { name: "Blog", href: "/resources/blog" },
        { name: "Case Studies", href: "/resources/case-studies" },
        { name: "Whitepapers", href: "/resources/whitepapers" },
        { name: "Documentation", href: "/resources/documentation" },
        { name: "Help Center", href: "/resources/help-center" },
      ]
    },
    {
      name: "Press Releases",
      href: null,
      pages: [
        { name: "Series C Funding", href: "/press/series-c-funding" },
        { name: "AdTech Company of the Year", href: "/press/adtech-company-of-year" },
        { name: "AI-Powered Audience Targeting", href: "/press/ai-powered-audience-targeting" },
        { name: "London Headquarters", href: "/press/london-headquarters" },
        { name: "Privacy-First Measurement", href: "/press/privacy-first-measurement" },
        { name: "Transit Partnership", href: "/press/transit-partnership" },
      ]
    },
    {
      name: "Company",
      href: null,
      pages: [
        { name: "Events", href: "/events" },
        { name: "Partners", href: "/partners" },
        { name: "Locations", href: "/locations" },
        { name: "Offices", href: "/offices" },
        { name: "Contact", href: "/contact" },
        { name: "Integrations", href: "/integrations" },
      ]
    },
    {
      name: "Legal",
      href: null,
      pages: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-white border-b border-gray-200 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-mw-blue-50 mb-6">
              <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sitemap
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Explore all pages and sections of the Moving Walls website
            </p>
            
            {/* Download Button */}
            <button
              onClick={downloadAsExcel}
              className="inline-flex items-center gap-2 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download as Excel (CSV)
            </button>
          </div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {siteStructure.map((section) => (
              <div key={section.name} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-mw-blue-600"></div>
                  {section.href ? (
                    <Link 
                      href={section.href}
                      className="text-lg font-semibold text-gray-900 hover:text-mw-blue-600 transition-colors"
                    >
                      {section.name}
                    </Link>
                  ) : (
                    <span className="text-lg font-semibold text-gray-900">
                      {section.name}
                    </span>
                  )}
                </div>

                {/* Section Pages */}
                {section.pages.length > 0 && (
                  <ul className="space-y-2">
                    {section.pages.map((page) => (
                      <li key={page.href}>
                        <Link
                          href={page.href}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-mw-blue-600 py-1.5 px-2 -mx-2 rounded-lg hover:bg-mw-blue-50 transition-all"
                        >
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {page.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-3xl font-bold text-mw-blue-600 mb-2">9</div>
                <div className="text-sm text-gray-600">Main Sections</div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-3xl font-bold text-mw-blue-600 mb-2">7</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-3xl font-bold text-mw-blue-600 mb-2">6</div>
                <div className="text-sm text-gray-600">Solutions</div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-3xl font-bold text-mw-blue-600 mb-2">45+</div>
                <div className="text-sm text-gray-600">Total Pages</div>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-mw-blue-600 hover:text-mw-blue-700 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
