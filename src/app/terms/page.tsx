import Link from 'next/link'
import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Terms & Conditions | Moving Walls',
  description: 'Read the terms and conditions for using Moving Walls platform and services. Legal agreement for programmatic OOH advertising.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('terms');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || defaultMeta.description,
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function TermsAndConditionsPage() {
  const lastUpdated = "February 2, 2026"

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'agreement', title: '1. Agreement' },
    { id: 'definitions', title: '2. Definitions' },
    { id: 'grant-of-license', title: '3. Grant of License; Limitations' },
    { id: 'inventory-supply', title: '4. Inventory Supply' },
    { id: 'payment-terms', title: '5. Payment Terms; Publisher Expenses' },
    { id: 'privacy', title: '6. Privacy' },
    { id: 'confidentiality', title: '7. Confidentiality' },
    { id: 'company-obligations', title: '8. Company Obligations' },
    { id: 'technical-support', title: '9. Technical Support' },
    { id: 'publicity', title: '10. Publicity; Press Releases' },
    { id: 'term-termination', title: '11. Term; Termination' },
    { id: 'disclaimer', title: '12. Disclaimer' },
    { id: 'indemnification', title: '13. Indemnification' },
    { id: 'general-provisions', title: '14. General Provisions' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Document Header Style */}
      <section className="relative bg-white border-b border-gray-200 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Document Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-mw-blue-50 mb-6">
              <svg className="w-8 h-8 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms &amp; Conditions
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Last updated: {lastUpdated}
              </span>
              <span className="text-gray-300">|</span>
              <span>MovingWalls Pte. Ltd.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar TOC */}
      <section className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:flex lg:gap-12">
            
            {/* Table of Contents - Sidebar */}
            <aside className="hidden lg:block lg:w-72 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-gray-600 hover:text-mw-blue-600 hover:bg-mw-blue-50 px-3 py-2 rounded-lg transition-colors duration-200"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Document Content */}
            <main className="flex-1 min-w-0">
              {/* Mobile TOC */}
              <div className="lg:hidden mb-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Table of Contents
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <nav className="mt-4 space-y-1">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-gray-600 hover:text-mw-blue-600 px-3 py-2 rounded-lg transition-colors"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </details>
              </div>

              {/* Document Content */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-8 md:px-12 py-10 md:py-12">
                  
                  {/* Introduction */}
                  <section id="introduction" className="mb-12 scroll-mt-24">
                    <div className="space-y-4">
                      <p className="text-gray-600 leading-relaxed">
                        The following terms and conditions (the &quot;Master Terms and Conditions&quot;) shall govern the use of MovingWalls Pte Ltd (&quot;MovingWalls&quot;) products and services (the &quot;Services&quot;) described in any Moving Audiences Media Booking Agreement, the Moving Audiences Order Form, or Moving Audiences Statement of Work, as the case may be, (collectively referred to herein as the &quot;Agreement&quot;) entered into between You (the &quot;Company&quot;) and MovingWalls.
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        If You are entering into these Master Terms and Conditions on behalf of a company or other legal entity, You represent that You have the legal authority to bind the legal entity to these Standard Terms, in which case &quot;You&quot; or &quot;Your&quot; shall mean such entity. If You do not have such authority or if You disagree with any of the terms in these Standard Terms, MovingWalls does not grant You a license to use the Services.
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        In the event of any inconsistency between these Standard Terms and the applicable Agreement, the applicable Agreement shall govern and control.
                      </p>
                      <div className="bg-mw-blue-50 rounded-xl p-5 border border-mw-blue-100">
                        <p className="text-gray-700 leading-relaxed">
                          You can always find the most recent version of these Master Terms and Conditions at <Link href="/terms" className="text-mw-blue-600 hover:underline font-medium">movingwalls.com/terms</Link>. MovingWalls may change these Master Terms and Conditions by posting a new version without notice to You. Use of the Services after such change constitutes acceptance of such changes.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 1: Agreement */}
                  <section id="agreement" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">1</span>
                      <h2 className="text-2xl font-bold text-gray-900">Agreement</h2>
                    </div>
                    <div className="pl-11 space-y-4">
                      <p className="text-gray-600 leading-relaxed">
                        These Master Terms and Conditions, together with the Moving Audiences Platform &quot;Order Form&quot; (collectively, the &quot;Agreement&quot;) govern the relationship between Company – and any advertisers or agencies that have authorized Company to act on their behalf – and MovingWalls (each a &quot;Party&quot; and together, the &quot;Parties&quot;).
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        MovingWalls reserves the right to modify these Standard Terms and Conditions with effect for the future at any time. In this case, MovingWalls will notify the Company of these changes. The changes shall be deemed to be accepted if the Company does not object in written form within three weeks of receipt of the amendment notification. MovingWalls will inform the Company in its amendment notification about the Company&apos;s right to object and the effects of a lack of objection. If the Company rejects the changes, MovingWalls has the right to terminate the Agreement.
                      </p>
                    </div>
                  </section>

                  {/* Section 2: Definitions */}
                  <section id="definitions" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">2</span>
                      <h2 className="text-2xl font-bold text-gray-900">Definitions</h2>
                    </div>
                    <div className="pl-11 space-y-4">
                      <p className="text-gray-600 leading-relaxed">
                        The following terms shall be defined in this Agreement as follows:
                      </p>
                      
                      <div className="space-y-4">
                        {/* Inventory */}
                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">&quot;Inventory&quot;</h3>
                          <p className="text-gray-600 leading-relaxed mb-4">
                            Means digital out-of-home advertising or mobile advertising inventory, which may be displayed and sold through MovingWalls&apos; Moving Audiences Platform service. The inventory may be one of the following:
                          </p>
                          <div className="space-y-3 ml-4">
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <h4 className="font-semibold text-gray-800 mb-2">&quot;Partner Inventory&quot;</h4>
                              <p className="text-gray-600 text-sm">
                                Refers to inventory procured from Supply Side Platforms that MovingWalls has a direct relationship with. The pricing of such inventory will be determined by MovingWalls and its Publishers.
                              </p>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <h4 className="font-semibold text-gray-800 mb-2">&quot;Company Inventory&quot;</h4>
                              <p className="text-gray-600 text-sm">
                                Refers to inventory procured from Publishers that the Company has a direct relationship with. The pricing of such inventory will be determined by the Company and its Publishers. The inventory is made available to MovingWalls&apos; Moving Audiences Platform Service via any of its Partner Supply-Side Platforms. It is the responsibility of the Company to make sure the Company Inventory is plugged into MovingWalls&apos; Partner Supply-Side Platform and that the Publishers use the platform to maintain inventory, accept bookings, approve creatives, and update play logs.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Other Definitions */}
                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">&quot;Creatives&quot;</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Means any visual material provided by company for delivery on digital out-of-home media sites or mobile advertising inventory as part of their inventory purchase.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">&quot;Delivery Reports&quot;</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Refers to the record of ad plays or slots played on DOOH inventory or impressions delivered on mobile advertising. This information is passed automatically to MovingWalls&apos; Moving Audiences Platform Service by MovingWalls&apos; supply side platform partners.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">&quot;Intellectual Property Rights&quot;</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Means patent rights, copyright rights (including, but not limited to, rights in visual works and moral rights), trade secret rights, and any other intellectual property rights recognized by the law of each applicable jurisdiction.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">&quot;Client Licence&quot;</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Refers to the subscribed license&apos;s that the Company will get access to for planning, buying, verifying, and analysis. Company will only be able to plan for Active Client License&apos;s. The client license fee is an annual recurring fee billed upfront.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">&quot;Pitch Proposal&quot;</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Refers to a proposal created for a non-licensed client through the Moving Audiences platform. Company must declare the pitch Closed Lost or Closed Won and will at any time get access to create up to 10 such Pitch Proposals. When a Pitch Proposal is marked as Closed Won, an additional Client License will be activated for the specified client from the date when the Pitch Proposal was first created.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">&quot;Ad Hoc Proposal&quot;</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Refers to a proposal created for a non-licenced client that will not be turned into an annual licence. Company can create any number of these and a per campaign proposal fee will be charged.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">&quot;Platform Fee&quot;</h3>
                          <p className="text-gray-600 leading-relaxed mb-4">
                            Is the fee payable by Company for MovingWalls&apos; Moving Audiences Platform Service. The Platform Fee will be calculated as a certain percentage of the Media Spendings of the Company as set forth in the MovingWalls Order Form based on the services accessed. The &quot;Platform Fee&quot; costs cover the following services:
                          </p>
                          <div className="space-y-2">
                            {[
                              { title: 'Buying and Ad-Serving', desc: 'Setting up, managing, and optimising bought DOOH or Mobile campaigns, centralised storage, tracking, and delivery of media campaign assets to DOOH or mobile inventory.' },
                              { title: 'Verification', desc: 'Reporting delivery of campaign assets at an ad-play level or audience impression level for DOOH or Mobile inventory, including, where applicable and available, third-party verification services.' },
                              { title: 'Analytics', desc: 'Campaign-level reporting dashboard for any booked OOH or DOOH and/or mobile inventory.' }
                            ].map((item, i) => (
                              <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-200">
                                <svg className="w-5 h-5 text-mw-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <div>
                                  <span className="font-medium text-gray-800">{item.title}:</span>
                                  <span className="text-gray-600 text-sm ml-1">{item.desc}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">&quot;Marks&quot;</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Means a party&apos;s trademarks, trade names, service marks and service names.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">&quot;Media Spendings&quot;</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Means the selling prices for out-of-home advertising inventory booked and delivered by Company via MovingWalls&apos; proprietary platform. The exact amount of the Media Spendings depends on the amount of inventory bought by Company. This includes both Platform Inventory and Company Inventory.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">&quot;Publisher&quot;</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Means provider of OOH and/or DOOH inventory.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">&quot;Service&quot;</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Means each MovingWalls product, platform, or service provided or made accessible to Customer in accordance with an Order Form.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">&quot;Service Policies&quot;</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Means, collectively, all applicable rules, terms, conditions, requirements, technical standards and policies of MovingWalls that are set forth in the MovingWalls&apos; Moving Audiences Platform Service user interface and/or provided by MovingWalls to the Company from time to time.
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">&quot;Order Form&quot;</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Means an order form, schedule, or other document entered into or accepted by Customer that incorporates these Master Terms and Conditions and that sets forth one or more Service(s) being provided by MovingWalls to Customer and specific terms applicable to each such Service.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 3: Grant of License */}
                  <section id="grant-of-license" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">3</span>
                      <h2 className="text-2xl font-bold text-gray-900">Grant of License; Limitations</h2>
                    </div>
                    <div className="pl-11 space-y-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">3.1 Grant of License</h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>
                            Subject to Company&apos;s payment of the Platform Fee when due and compliance with the Service Policies and with the Agreement, MovingWalls grants to Company – and Company accepts – the non-exclusive, non-transferable, non-sublicensable right and license to access and use the MovingWalls Service during the term of this Agreement.
                          </p>
                          <p>
                            The MovingWalls Service is provided by MovingWalls over the Internet, and the foregoing does not grant any right to Company to receive or use copies of any MovingWalls software code other than through the web interfaces provided by MovingWalls.
                          </p>
                          <p>
                            Company hereby expressly grants to MovingWalls – and MovingWalls accepts – all rights necessary to enable MovingWalls to store, audit, optimize, deliver and serve Creatives on the purchased Inventory and otherwise provide the MovingWalls Service to Company.
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">3.2 Limitations</h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>
                            Company hereby explicitly agrees that it will not and will not enable any third party to:
                          </p>
                          <ul className="space-y-2 ml-4">
                            {[
                              'Reproduce or distribute or make available the MovingWalls Service or any portion thereof to any third party',
                              'Use or authorize use of the MovingWalls Service for any purpose not specified in this Agreement',
                              'Copy, transfer, sell, lease, syndicate, sub-syndicate, lend, or use for co-branding, timesharing or any other unauthorized purposes the MovingWalls Service or access thereto',
                              'Modify, translate, reverse engineer, reverse compile, disassemble the MovingWalls Service or any portion thereof, or attempt to do any of the foregoing'
                            ].map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs font-bold">{String.fromCharCode(97 + i)}</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                          <p>
                            For the avoidance of doubt, MovingWalls expressly reserves all Intellectual Property Rights not expressly granted under this Agreement. Except as explicitly set forth herein, MovingWalls does not grant any other license (express or implied) to MovingWalls&apos;s Intellectual Property Rights. The Parties acknowledge and agree that nothing in this Agreement or the performance hereof will operate to or shall be construed to grant either Party any right, title or interest, implied or otherwise, in or to the Intellectual Property Rights of the other Party.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 4: Inventory Supply */}
                  <section id="inventory-supply" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">4</span>
                      <h2 className="text-2xl font-bold text-gray-900">Inventory Supply</h2>
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-600 leading-relaxed">
                        MovingWalls has agreements in place to access Inventory from various Supply Side Platforms. It will then sell it to Company in its own name and on its own account at a price that takes into account the Media Spendings entered by the Company on MovingWalls&apos;s proprietary platform. The prices for the Media Spendings will be indicated to the Company on MovingWalls&apos;s proprietary platform.
                      </p>
                    </div>
                  </section>

                  {/* Section 5: Payment Terms */}
                  <section id="payment-terms" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">5</span>
                      <h2 className="text-2xl font-bold text-gray-900">Payment Terms; Publisher Expenses</h2>
                    </div>
                    <div className="pl-11 space-y-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">5.1 Client Licence Fee, Platform Fee and Media Spendings Payment, Auction Supply</h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>
                            MovingWalls will Invoice Company for Annual Client License Fees, where applicable, due whenever a client license is activated. MovingWalls will also invoice Company during the first week of each month for the Media Spendings and Platform Fees due to MovingWalls for the previous month pursuant to this Agreement and the MovingWalls Order Form in connection with inventory booked via the MovingWalls Service.
                          </p>
                          <p>
                            MovingWalls&apos;s inventory count and MovingWalls&apos;s record of the price per inventory will be controlling and final. Any complaints relating to an invoice must be submitted to MovingWalls in writing or by email to <span className="text-mw-blue-600 font-medium">finance@movingwalls.com</span> within two weeks upon receipt of the invoice. If no such complaint has been made within two weeks upon receipt of invoice, the invoice is deemed to be accepted.
                          </p>
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <p className="text-amber-800 font-medium">
                              Payment is due within 30 days after the date of the invoice and in indicated currency.
                            </p>
                          </div>
                          <p>
                            The company acknowledges and agrees that the use of the MovingWalls Service may be subject to credit limits, as determined by MovingWalls in its sole discretion from time to time. The company will promptly provide MovingWalls with information MovingWalls reasonably requires to complete its payment review process. MovingWalls&apos;s invoices shall be due regardless of whether the Company has collected payments from its clients.
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">5.2 Late Payments</h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>
                            Late payments will be subject to the interest rate of <strong>1.5% per month</strong>. If Company fails to make any payment due and payable, Company shall pay all late payment expenses and damages (including attorney&apos;s fees) incurred by MovingWalls in collecting such payments.
                          </p>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-800">
                              In addition, MovingWalls shall be entitled to suspend Company&apos;s access to and use of the MovingWalls Service upon giving the Company <strong>48-hours prior notice</strong> via email.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">5.3 Taxation</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Except for taxes on MovingWalls&apos;s income, Company shall also be responsible for and shall pay any and all applicable taxes or duties, tariffs or the like applicable to the provision or use of the MovingWalls Service.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">5.4 Inventory Expenses</h3>
                        <p className="text-gray-600 leading-relaxed">
                          It is MovingWalls&apos;s sole responsibility to arrange for and settle payment obligations with any Third Party Platform inventory suppliers. It is the Company&apos;s sole responsibility to arrange for and settle payment obligations with any Third Party Company Inventory Suppliers.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 6: Privacy */}
                  <section id="privacy" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">6</span>
                      <h2 className="text-2xl font-bold text-gray-900">Privacy</h2>
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-600 leading-relaxed">
                        The company will use the MovingWalls Service under this Agreement in compliance with all applicable privacy laws, rules and regulations. For more information, please see our <Link href="/privacy" className="text-mw-blue-600 hover:underline font-medium">Privacy Policy</Link>.
                      </p>
                    </div>
                  </section>

                  {/* Section 7: Confidentiality */}
                  <section id="confidentiality" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">7</span>
                      <h2 className="text-2xl font-bold text-gray-900">Confidentiality</h2>
                    </div>
                    <div className="pl-11 space-y-4">
                      <p className="text-gray-600 leading-relaxed">
                        Confidential Information means any non-public information relating to the MovingWalls Service or disclosed to Company by MovingWalls in the course of this Agreement. Company shall use reasonable care to protect Confidential Information of MovingWalls, and shall use Confidential Information only for the purposes of using the MovingWalls Service as permitted by this Agreement.
                      </p>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-800 mb-3">Confidential Information does not include any information that:</h4>
                        <ul className="space-y-2">
                          {[
                            'Has been made public',
                            'Becomes public through no fault of Company',
                            'Was already in the possession of Company without confidentiality obligations',
                            'Independently developed by Company'
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-mw-blue-100 flex items-center justify-center text-mw-blue-700 text-xs font-bold">{String.fromCharCode(97 + i)}</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        If Company must disclose Confidential Information in response to the judicial or governmental order, Company will promptly notify MovingWalls and provide reasonable assistance to seek confidential treatment. The company will not disclose or provide any confidential information of Company or any third party to MovingWalls.
                      </p>
                    </div>
                  </section>

                  {/* Section 8: Company Obligations */}
                  <section id="company-obligations" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">8</span>
                      <h2 className="text-2xl font-bold text-gray-900">Company Obligations</h2>
                    </div>
                    <div className="pl-11 space-y-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">8.1 Authority</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          Company hereby represents and warrants that:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-mw-blue-100 flex items-center justify-center text-mw-blue-700 text-xs font-bold">i</span>
                            <span>It has and will have all necessary rights and authority to enter into this Agreement and to perform its obligations hereunder and thereunder</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-mw-blue-100 flex items-center justify-center text-mw-blue-700 text-xs font-bold">ii</span>
                            <span>It is and will be authorized to act on behalf of each of its advertisers and agencies in order to deliver advertising campaigns via the MovingWalls Service, its performance under this contract will not breach any Agreement or other obligation that it has with or to any such advertisers and agencies</span>
                          </li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-4">
                          The company will be responsible for its advertisers&apos; and agency&apos;s acts and omissions in connection with the MovingWalls Services provided under this Agreement.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">8.2 Compliance</h3>
                        <p className="text-gray-600 leading-relaxed">
                          The company will comply with any terms and conditions of this Agreement and additional restrictions and/or specifications that may be provided from time to time. The company represents and warrants that its use of the MovingWalls Service will not violate or cause Company to breach any other agreements it may have with third parties. Company shall be solely responsible for its use of the MovingWalls Service hereunder.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">8.3 Acceptable Use</h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>
                            The company will comply with all applicable laws and regulations. Company will not, will not attempt to, and will not assist or knowingly permit any third party to:
                          </p>
                          <ul className="space-y-2 ml-4">
                            {[
                              'Deliver any malware, spyware, viruses, worms or other harmful or malicious code into the MovingWalls Service and/or onto any creative made available through the MovingWalls Service',
                              'Breach, disable, tamper with, or develop or use (or attempt) any workaround for, or otherwise damage any MovingWalls Service or any security measure thereof',
                              'Interfere or attempt to interfere (whether through a device, software, mechanism, routine or otherwise) with the proper working of any MovingWalls Service or any activity conducted on any MovingWalls server',
                              'Alter or tamper with any information or materials on or associated with any MovingWalls Service',
                              'Disclose Inventory availability, volume, or pricing data obtained through the MovingWalls Service'
                            ].map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 9: Technical Support */}
                  <section id="technical-support" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">9</span>
                      <h2 className="text-2xl font-bold text-gray-900">Technical Support</h2>
                    </div>
                    <div className="pl-11 space-y-4">
                      <p className="text-gray-600 leading-relaxed">
                        MovingWalls will provide the following technical support to Company in connection with its use of the MovingWalls Service:
                      </p>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3 text-gray-600">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-mw-blue-100 flex items-center justify-center text-mw-blue-700 text-xs font-bold">a</span>
                            <span>MovingWalls will provide technical support to Company at no additional charge to resolve technical issues with the MovingWalls Service, provided that Company designates no more than <strong>2 employees</strong> to submit such support issues</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-600">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-mw-blue-100 flex items-center justify-center text-mw-blue-700 text-xs font-bold">b</span>
                            <span>MovingWalls will use commercially reasonable efforts to ensure that the MovingWalls Service is available at least <strong>99%</strong> of the time calculated on a monthly basis (&quot;Uptime&quot;)</span>
                          </li>
                        </ul>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        This calculation excludes downtime required for routine maintenance, as notified at least two business days in advance and downtime resulting from technical malfunctions in the systems of Company or any other circumstances beyond MovingWalls&apos;s reasonable control (including, without limitation, Internet delays, network congestion and ISP malfunctions). For clarity, Uptime calculation is separate from and does not include the delivery or non-delivery of campaigns.
                      </p>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800 text-sm">
                          <strong>Termination Right:</strong> In the event that Uptime is lower than 99% in any three consecutive months or in any four months in any 12-month consecutive period, Company will have a one-time right to terminate the agreement upon 30 days prior written notice to MovingWalls, subject to such notice being received by MovingWalls within 30 days of the downtime period.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 10: Publicity */}
                  <section id="publicity" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">10</span>
                      <h2 className="text-2xl font-bold text-gray-900">Publicity; Press Releases</h2>
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-600 leading-relaxed">
                        Company agrees to grant to MovingWalls the limited right to use Company&apos;s name and logo on customer lists and informational materials. Except as set forth above, neither Party will issue any publicity or general marketing communications concerning this relationship without the prior written consent of the other Party, which will not be unreasonably withheld or delayed.
                      </p>
                    </div>
                  </section>

                  {/* Section 11: Term; Termination */}
                  <section id="term-termination" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">11</span>
                      <h2 className="text-2xl font-bold text-gray-900">Term; Termination</h2>
                    </div>
                    <div className="pl-11 space-y-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">11.1 Term</h3>
                        <p className="text-gray-600 leading-relaxed">
                          This Agreement will begin on the agreed Effective Date and, will renew for additional terms as indicated in the &quot;Order Form&quot; unless either Party provides the other Party with written notice of its intent not to renew the Agreement at least <strong>60 days</strong> prior to the end of the then-current term. Any subscribed Annual Client Licences will also be automatically renewed unless either Party provides the other Party with written notice of its intent not to renew the Agreement at least 60 days prior to the end of the then-current term.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">11.2 Termination for Convenience</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Either party may terminate this Agreement, effective as of the last day of a calendar month, by providing <strong>60 days&apos;</strong> prior notice.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">11.3 Termination for Cause</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Either Party may terminate this Agreement, at any time, in the event that the other Party breaches any material term of this Agreement and fails to cure such breach within <strong>sixty (60) days</strong> following notice thereof from the non-breaching Party.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">11.4 MovingWalls Termination</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          In addition, MovingWalls may terminate this Agreement, at any time, in the event that:
                        </p>
                        <ul className="space-y-2">
                          {[
                            'Company breaches any payment-related provision and fails to cure such breach within (10) days following notice thereof from MovingWalls',
                            'Company becomes the subject of a voluntary or involuntary petition in bankruptcy or proceeding relating to insolvency, receivership, liquidation, or composition for the benefit of creditors',
                            'The company merges with or is acquired by another company, sells all or substantially all of its assets or stock or business to which this Agreement relates, or is subject to any substantial change in ownership, management or control'
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-700 text-xs font-bold">{String.fromCharCode(97 + i)}</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">11.5 Effects of Termination</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          Upon any termination of the Agreement:
                        </p>
                        <ul className="space-y-2">
                          {[
                            'All licenses granted by MovingWalls hereunder will automatically cease',
                            'Each party will promptly return to the other all of the other Party\'s Confidential Information within its possession or control',
                            'The payment dates of all amounts due MovingWalls will automatically be accelerated so that they will become due and payable on the effective date of termination, even if longer terms had been provided previously'
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-mw-blue-100 flex items-center justify-center text-mw-blue-700 text-xs font-bold">{String.fromCharCode(97 + i)}</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Section 12: Disclaimer */}
                  <section id="disclaimer" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">12</span>
                      <h2 className="text-2xl font-bold text-gray-900">Disclaimer</h2>
                    </div>
                    <div className="pl-11 space-y-4">
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                        <p className="text-amber-800 font-semibold text-lg mb-2">
                          The MovingWalls Service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;.
                        </p>
                        <p className="text-gray-700">
                          The Company accepts that MovingWalls does not give any representations and warranties, express, statutory or implied, including any implied warranties for fitness for a particular purpose, title, merchantability, non-infringement, and course of dealings or performance.
                        </p>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        Any defaults in the delivery of advertising materials by MovingWalls have to be reported immediately after inspection, but no later than <strong>three (3) working days</strong> after completion of the order, otherwise Company&apos;s warranty claims shall be excluded.
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        In case MovingWalls cannot provide the MovingWalls Service due to force majeure or any other event outside MovingWalls&apos;s control, this has no effect on the contractual conformity of the services provided by MovingWalls. Company&apos;s obligation to pay MovingWalls&apos;s fees shall, therefore, remain unaffected, however, the Term for the MovingWalls Services to be rendered shall be rescheduled if possible.
                      </p>
                    </div>
                  </section>

                  {/* Section 13: Indemnification */}
                  <section id="indemnification" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">13</span>
                      <h2 className="text-2xl font-bold text-gray-900">Indemnification</h2>
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        Company will defend, indemnify and hold harmless MovingWalls and its officers, directors, employees and agents from liabilities (including without limitation reimbursement for reasonable outside attorneys&apos; fees and disbursements) arising out of all third-party claims relating to:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-gray-600">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-mw-blue-100 flex items-center justify-center text-mw-blue-700 text-xs font-bold">i</span>
                          <span>Company&apos;s culpable breach or alleged breach of its obligations under this Agreement</span>
                        </li>
                        <li className="flex items-start gap-2 text-gray-600">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-mw-blue-100 flex items-center justify-center text-mw-blue-700 text-xs font-bold">ii</span>
                          <span>Infringement or misappropriation of a third party&apos;s Intellectual Property Rights in connection with the creative, technology, data or other materials provided by Company to MovingWalls in connection with the MovingWalls Service hereunder</span>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* Section 14: General Provisions */}
                  <section id="general-provisions" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">14</span>
                      <h2 className="text-2xl font-bold text-gray-900">General Provisions</h2>
                    </div>
                    <div className="pl-11 space-y-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">14.1 Notice</h3>
                        <p className="text-gray-600 leading-relaxed">
                          All notices under this Agreement must be in writing (including, without limitation, email) and sent to the attention of the other Party&apos;s contact for notices. Either Party may change its contact for notices, billing contact and/or additional contact by providing notice to the other Party. Notice will be deemed given when delivered.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">14.2 Governing Law</h3>
                        <div className="bg-mw-blue-50 border border-mw-blue-200 rounded-lg p-4">
                          <p className="text-mw-blue-800 font-medium">
                            This Agreement shall be governed by the laws of Singapore and each of the parties hereto submits to the non-exclusive jurisdiction of the Courts of Singapore.
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">14.3 Independent Contractors</h3>
                        <p className="text-gray-600 leading-relaxed">
                          The Parties are independent contractors, and this Agreement does not create an agency, partnership or joint venture.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">14.4 Assignment</h3>
                        <p className="text-gray-600 leading-relaxed">
                          The company may not assign or transfer any part of this Agreement without the written consent of MovingWalls.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">14.5 Integration; Waiver</h3>
                        <p className="text-gray-600 leading-relaxed">
                          This Agreement is the Parties&apos; entire Agreement relating to its subject and supersedes any prior or contemporaneous Agreements on that subject. All amendments hereto must be executed by both Parties and expressly state that they are amending this Agreement. Failure to enforce any provision of this Agreement will not constitute a waiver. If any provision of the Agreement is found unenforceable, it and any related provisions will be interpreted to best accomplish the unenforceable provision&apos;s essential purpose. Nothing in this Agreement will limit a Party&apos;s ability to seek equitable relief.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">14.6 Force Majeure</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Neither Party will be liable for any acts or omissions resulting from circumstances or causes beyond its reasonable control. Without limiting the generality of the foregoing, and notwithstanding anything to the contrary in this Agreement, MovingWalls does not guarantee any MovingWalls Service will be operable at all times or during any down time caused by outages to any public Internet backbones, networks or servers, any failures of equipment, systems or local access services, or for previously scheduled maintenance.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">14.7 Restriction on Resale</h3>
                        <p className="text-gray-600 leading-relaxed">
                          The company may not resell any MovingWalls Service, it being understood and agreed that Company&apos;s use of the MovingWalls Service hereunder on behalf of advertisers and agencies that Company is authorized to act on behalf of in order to deliver advertising campaigns via the MovingWalls Service will not be deemed a breach of this Section.
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">14.8 Counterparts</h3>
                        <p className="text-gray-600 leading-relaxed">
                          The Parties may execute this Agreement in counterparts, including facsimile, PDF and other electronic copies, which taken together will constitute one instrument.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Contact Section */}
                  <section className="scroll-mt-24 pt-10 mt-10 border-t-2 border-mw-blue-200">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-mw-blue-100 mb-4">
                        <svg className="w-7 h-7 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Questions?</h2>
                      <p className="mt-2 text-gray-600">If you have any questions about these Terms &amp; Conditions, please contact us.</p>
                    </div>

                    <div className="bg-gradient-to-br from-mw-blue-50 to-mw-blue-100/50 rounded-xl p-6 border border-mw-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-mw-blue-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg mb-2">MovingWalls Pte. Ltd.</h4>
                          <div className="space-y-2 text-gray-700">
                            <p className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              info@movingwalls.com
                            </p>
                            <p className="flex items-start gap-2">
                              <svg className="w-4 h-4 text-mw-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Far East Finance Building, #8-02, 14 Robinson Road, Singapore 048545
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                </div>
              </div>

              {/* Back to top button */}
              <div className="mt-8 text-center">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-mw-blue-600 hover:text-mw-blue-700 font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Back to top
                </a>
              </div>

            </main>
          </div>
        </div>
      </section>
    </div>
  )
}
