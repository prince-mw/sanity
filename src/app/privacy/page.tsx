import Link from 'next/link'

export default function PrivacyPolicyPage() {
  const lastUpdated = "February 2, 2026"

  const tableOfContents = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'advertising', title: '2. Moving Walls Pte Ltd Advertising' },
    { id: 'international-transfers', title: '3. International Transfers' },
    { id: 'third-party-info', title: '4. Information Collected on Behalf of Third Parties' },
    { id: 'cookies', title: '5. Cookies' },
    { id: 'children', title: '6. What About Children?' },
    { id: 'other-websites', title: '7. What About Other Websites?' },
    { id: 'changes', title: '8. Changes to This Privacy Policy' },
    { id: 'your-rights', title: '9. Your Rights' },
    { id: 'website-interaction', title: '10. Your Interaction with Moving Walls Pte Ltd Website' },
    { id: 'contact', title: '11. Contacting Us' },
    { id: 'cookie-policy', title: 'Cookie Policy' },
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
              Privacy Policy
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Last updated: {lastUpdated}
              </span>
              <span className="text-gray-300">|</span>
              <span>Moving Walls Pte. Ltd.</span>
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
                  {tableOfContents.map((item, index) => (
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
                  
                  {/* Section 1: Introduction */}
                  <section id="introduction" className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">1</span>
                      <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
                    </div>
                    <div className="pl-11 space-y-4">
                      <p className="text-gray-600 leading-relaxed">
                        Moving Walls Pte Ltd is committed to respecting and protecting individuals&apos; privacy rights. This Privacy Policy explains how Moving Walls Pte Ltd, its subsidiaries and affiliated companies (collectively, &quot;Moving Walls Pte Ltd&quot; or &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collect, use, secure, and/or disclose end-users&apos; (&quot;you&quot; or &quot;your&quot;) device-related information when:
                      </p>
                      <ul className="list-none space-y-3">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-mw-blue-50 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-mw-blue-500"></span>
                          </span>
                          <span className="text-gray-600">You view ads served by Moving Walls Pte Ltd on Digital Out-of-Home (DOOH) assets, third party websites or mobile apps (see the section below called &quot;Moving Walls Pte Ltd Ad Network&quot;)</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-mw-blue-50 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-mw-blue-500"></span>
                          </span>
                          <span className="text-gray-600">You visit the Moving Walls Pte Ltd website at www.movingwalls.com (see section below called &quot;Moving Walls Pte Ltd Website&quot;)</span>
                        </li>
                      </ul>
                      <p className="text-gray-600 leading-relaxed">
                        Any content aggregation services or feature (such as displaying of stories, articles, pictures, blogs, etc.) (whether through an app or other software integration) provided by Moving Walls Pte Ltd on a device will not be covered under this Privacy Policy, except to the extent the app or software promotes any interest-based advertising by Moving Walls Pte Ltd. We urge you to refer to the privacy policy of such services separately, as and when made available.
                      </p>
                    </div>
                  </section>

                  {/* Section 2: Moving Walls Advertising */}
                  <section id="advertising" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">2</span>
                      <h2 className="text-2xl font-bold text-gray-900">Moving Walls Pte Ltd Advertising</h2>
                    </div>
                    <div className="pl-11 space-y-6">
                      
                      {/* 2.1 */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">2.1 What Does Moving Walls Pte Ltd Provide?</h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>
                            Moving Walls Pte Ltd is a global media solutions provider with a suite of ad tech products. We partner with DOOH site owners, third-party mobile website publishers, and mobile app developers to serve ads on their sites and in their apps, and Moving Walls Pte Ltd may also serve ads on the site and mobile applications that Moving Walls Pte Ltd owns.
                          </p>
                          <p>
                            These ads may be customised to their users&apos; interests and geographic locations, which we may derive or infer from information that we collect about how those users interact with such sites and apps (this type of advertising is often called &quot;interest-based advertising&quot; or &quot;targeted advertising&quot;). This enables our partnering publishers and developers to provide content-rich services that are more relevant to their users, often using the advertising revenues they generate to offer their services for free or at a subsidised cost.
                          </p>
                          <p>
                            Further, we may also obtain user data from our data partners, advertisers and/or advertisers&apos; partners for optimising digital advertising and/or analytical purposes including to provide relevant advertising and reporting. Please note that collection, use or storage of such data is governed by the privacy policy of such third-party partners and/or advertisers providing the same.
                          </p>
                          <p>
                            Moving Walls Pte Ltd may engage in cross-device data collection, which refers to the process of collecting data from devices that have been determined through statistical analysis to be linked or related. We, or third parties whom we engage to provide this service, may use cross-device data to provide interest-based advertising services and to deliver tailored ads to users across multiple devices.
                          </p>
                        </div>
                      </div>

                      {/* 2.2 */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">2.2 What Information Do We Collect?</h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>
                            When you view a Moving Walls Pte Ltd ad on a media site, website or app, we may collect information about your device that you have viewed on. This information enables us to improve our services including to recognise your device when you use other sites and apps that have partnered with us.
                          </p>
                          
                          <div className="bg-white rounded-lg p-4 border border-gray-200 mt-4">
                            <h4 className="font-semibold text-gray-800 mb-3">(a) Information about your device</h4>
                            <p className="mb-3">Moving Walls Pte Ltd may collect some or all of the following information about your device:</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {[
                                'Device type (e.g. smartphone, tablet, etc.)',
                                'Operating system (e.g. iOS, Android, Windows)',
                                'Network provider and mobile browser used',
                                'Platform, SDK version, timestamp, API key',
                                'Application version, model, manufacturer',
                                'OS version, session start/stop time',
                                'Locale, time zone',
                                'Network statuses such as WiFi',
                                'Geo-location of your device (GPS)',
                                'Advertising ID (IDFA/AAID)'
                              ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <svg className="w-4 h-4 text-mw-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <p>
                            In some countries, we also collect information such as international mobile equipment identity (IMEI), Internet (IP) addresses or geo-location data, which may be considered to be personal information and in which case, we ensure compliance with applicable laws in our collection or use of the same.
                          </p>
                          <p>
                            Moving Walls Pte Ltd may collect the geo-location of your device only when an app or site, which leverages Moving Walls Pte Ltd&apos;s offerings through integration of Moving Walls Pte Ltd&apos;s technology/software (whether SDK, API or other integration) is active on the device. One way Moving Walls Pte Ltd derives a device&apos;s location is by collecting the device&apos;s latitude and longitude coordinates through GPS. Moving Walls Pte Ltd may infer the geo location of a device based on data collected through a WiFi identifier that the device is connected to, subject to country-specific laws and/or industry guidelines related to such collection or inference practices.
                          </p>

                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <h4 className="font-semibold text-gray-800 mb-3">(b) Information about ads presented on your device</h4>
                            <p className="mb-3">Moving Walls Pte Ltd also collects some or all of the following information about an ad presented on your device:</p>
                            <ul className="space-y-2">
                              {[
                                'The content type of the ad (what the ad is about, e.g. games, finance, entertainment, news)',
                                'The ad type (e.g. whether the ad is a text, image, or video based ad)',
                                'Where the ad is being served (e.g. the address of the site on which the ad appears)',
                                'Certain information about post-click activity in relation to the ad including user interaction with such ad'
                              ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <svg className="w-4 h-4 text-mw-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <p>
                            On occasion, our partnering mobile publishers or app developers may also disclose to us certain information they have separately collected about you so that we can improve the relevance of the ads we serve on their behalf. They do this in accordance with their own specific privacy policies and subject to their own applicable legal requirements. We do not use the information they provide to us for any purpose other than serving you with interest based ads or for reporting or analytical purpose(s).
                          </p>
                        </div>
                      </div>

                      {/* 2.3 */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">2.3 How Do We Use Information That We Collect?</h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>
                            Moving Walls Pte Ltd uses the information that we collect from your device to display advertising on DOOH media sites or your device, which may include interest-based advertising customised to individuals&apos; inferred interests, preferences and locations and to perform analysis aimed at improving our services.
                          </p>
                          <p>
                            The information we collect from your device also helps us to provide filtering options for publishers and developers to manage ads appearing on their sites and in their apps, and to provide targeting options for advertisers. This helps our publishers and developer clients, for example, to avoid presenting you ads that you have already seen, and helps our advertiser clients serve advertisements that are more likely to be of interest to you.
                          </p>
                        </div>
                      </div>

                      {/* 2.4 */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">2.4 Who Do We Share Information With?</h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <h4 className="font-semibold text-gray-800 mb-2">(a) Publishers, Developers, Advertisers, Data Partners, and Measurement Companies</h4>
                            <p className="text-sm">
                              Moving Walls Pte Ltd may share the information we collect or receive regarding you as described in this Policy with our publishers, developers, data partners, measurement companies and advertisers. These partners may use this information to show you relevant ads, measure your ad/site interaction, identify your interest areas, better understand the site and app traffic usage or user behaviour in order to refine and improve their services. Such partners&apos; use of the information we share with them will be governed by their privacy policies.
                            </p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <h4 className="font-semibold text-gray-800 mb-2">(b) With Moving Walls Pte Ltd Affiliates</h4>
                            <p className="text-sm">
                              We may also share your information among Moving Walls Pte Ltd affiliates so that we can better provide advertising that is relevant to you.
                            </p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <h4 className="font-semibold text-gray-800 mb-2">(c) Sharing Info with third parties such as advisors and law enforcement authorities</h4>
                            <p className="text-sm">
                              From time to time, we may also need to disclose your information to other third parties, such as law enforcement authorities or our legal advisers, where it is necessary to: comply with the law or regulations; enforce or apply our user terms and conditions; protect our rights, or; preserve the safety of our users. This may include exchanging information with other companies and organizations for fraud protection. Moving Walls Pte Ltd may also share your information in connection with any merger, a sale of Moving Walls Pte Ltd assets, or a financing or acquisition of all or a portion of our business to another company.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 2.5 */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">2.5 How Do We Keep Information Secure?</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Moving Walls Pte Ltd uses reasonable technical and organisational measures to protect the information it collects about you and your device. We may anonymise the information we collect using one-way hashing technology before sharing it with any third parties. We also seek appropriate contractual protection from our partners regarding their treatment of user data.
                        </p>
                      </div>

                      {/* 2.6 */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">2.6 How Long Do We Keep Information For?</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Moving Walls Pte Ltd may retain the information relating to your device collected from partnering mobile publishers or app developers for a period of up to <strong>thirteen (13) months</strong>, unless otherwise required by law or applicable contract.
                        </p>
                      </div>

                      {/* 2.7 */}
                      <div className="bg-amber-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          2.7 Opting Out of Interest-Based Advertising
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          If you prefer not to receive interest-based advertising from Moving Walls Pte Ltd, you can opt out of interest-based advertising at any time by going to the Moving Walls Pte Ltd Opt Out page and submitting your device ID. Please note that if you opt-out of interest-based advertising you will still receive &quot;generic&quot; ads from Moving Walls Pte Ltd. To effectively opt-out of our cross-device data collection activities, you must opt-out on every device browser and device using the appropriate opt-out methods.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 3: International Transfers */}
                  <section id="international-transfers" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">3</span>
                      <h2 className="text-2xl font-bold text-gray-900">International Transfers</h2>
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-600 leading-relaxed">
                        Moving Walls Pte Ltd may share your information with clients, affiliates and other third parties described above who are based in countries outside of your country of residence (for example, if you are an EU resident, we may share your information with our non-EU clients or affiliates), subject to any contractual or legal requirements. While some countries may not have data protection laws that are equivalent to those of the country in which you reside, we will take reasonable measures to protect your information in accordance with this Privacy Policy.
                      </p>
                    </div>
                  </section>

                  {/* Section 4: Information Collected on Behalf of Third Parties */}
                  <section id="third-party-info" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">4</span>
                      <h2 className="text-2xl font-bold text-gray-900">Information Collected on Behalf of Third Parties</h2>
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-600 leading-relaxed">
                        Moving Walls Pte Ltd may offer advertising solutions to clients that include the collection of voluntary information from you as part of an advertisement, e.g. serving an ad that contains an advertiser questionnaire. Such information may consist of personally identifiable information, non-personally identifiable information, or both. All of the information that you voluntarily provide in response to this form of advertisement is forwarded directly to the relevant client and will be governed by that client&apos;s privacy policies in place at the time of transfer. This information may be temporarily stored by Moving Walls Pte Ltd solely for the aforesaid purpose, subject to applicable legal requirements.
                      </p>
                    </div>
                  </section>

                  {/* Section 5: Cookies */}
                  <section id="cookies" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">5</span>
                      <h2 className="text-2xl font-bold text-gray-900">Cookies</h2>
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-600 leading-relaxed">
                        We use cookies and beacons to help us collect some of the information we have described above. This may be done when you interact with our advertiser or publisher partners who enable Moving Walls Pte Ltd to collect data related to your interaction with their apps or sites for the purpose of serving relevant Ads to you and/or improve our services. We recommend that you review the privacy policies of the third party apps, services or sites that you directly interact with to learn how those third parties use cookies. We may also use cookies to provide website functionality and advertising to you, and to save you having to provide the information you have already given us on subsequent visits to our site.
                      </p>
                    </div>
                  </section>

                  {/* Section 6: Children */}
                  <section id="children" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">6</span>
                      <h2 className="text-2xl font-bold text-gray-900">What About Children?</h2>
                    </div>
                    <div className="pl-11">
                      <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                        <p className="text-gray-700 leading-relaxed">
                          Moving Walls Pte Ltd complies with the Children&apos;s Online Privacy Protection Act (COPPA) in the U.S. and <strong>does not knowingly collect personal information</strong> about users of sites directed to children under the age of <strong>thirteen (13)</strong>.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 7: Other Websites */}
                  <section id="other-websites" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">7</span>
                      <h2 className="text-2xl font-bold text-gray-900">What About Other Websites?</h2>
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-600 leading-relaxed">
                        Our website and the ads we service may contain links to other websites. You should be aware that we are not responsible for the privacy practices of such other websites as those may have different privacy policies and terms of use and are not associated with us. You agree that we cannot control these links and we shall not be responsible for any use of such websites.
                      </p>
                    </div>
                  </section>

                  {/* Section 8: Changes to Policy */}
                  <section id="changes" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">8</span>
                      <h2 className="text-2xl font-bold text-gray-900">Changes to This Privacy Policy</h2>
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-600 leading-relaxed">
                        We may amend this Privacy Policy at any time. The amended Privacy Policy will be displayed on our site. If we make any material changes we will notify you by means of a notice on this site prior to the change becoming effective. Please check our Privacy Policy regularly to ensure you have read the latest version.
                      </p>
                    </div>
                  </section>

                  {/* Section 9: Your Rights */}
                  <section id="your-rights" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">9</span>
                      <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
                    </div>
                    <div className="pl-11 space-y-4">
                      <p className="text-gray-600 leading-relaxed">
                        Much of the information we hold is purely technical in nature, and relates to the devices that interact with our website or our ads. Information on how to refuse use of this information for interest-based advertising purposes is provided above in the section &quot;Opting Out of Interest-based Advertising&quot;.
                      </p>
                      <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                        <p className="text-gray-700 leading-relaxed">
                          Where we do hold limited personal information about you (such as personal information about a Moving Walls Pte Ltd account you have with us), you can ask us for:
                        </p>
                        <ul className="mt-3 space-y-2">
                          {[
                            'Access to this personal information',
                            'Correction or updating of any inaccurate personal information',
                            'Stop sending you direct marketing',
                            'Stop using your personal information altogether'
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-3 text-sm text-gray-600">
                          If you would like to exercise any of these rights, you may be able to make the update within your account settings or by contacting us using the details provided below.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 10: Website Interaction */}
                  <section id="website-interaction" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">10</span>
                      <h2 className="text-2xl font-bold text-gray-900">Your Interaction with Moving Walls Pte Ltd Website</h2>
                    </div>
                    <div className="pl-11 space-y-6">
                      
                      {/* 10.1 */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">10.1 What Information Do We Collect?</h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>
                            If you choose to create an account on the Moving Walls Pte Ltd website or on one of the cloud-based services provided by us, we collect your username, password, email address, country, and preferred account type when you register. You can also provide us with other optional information, such as your name, picture, postal address, phone number, social network profiles, questionnaire responses, general business information, and other personal, biographical, or demographic info.
                          </p>
                          <p>
                            This optional information is not necessary for you to use the Moving Walls Pte Ltd site or to maintain an account with us, but by sharing this information we can better serve you and improve your overall website experience. If you provide the name and email address of a friend or colleague, we will use that information to send the individual a one-time invitation to visit or register with our site.
                          </p>
                        </div>
                      </div>

                      {/* 10.2 */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">10.2 The Usage Information We Collect</h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>
                            In addition to the personal information described above, we also collect certain information about your usage of the site. Specifically, our servers collect the following information automatically about your usage of the site:
                          </p>
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <ul className="space-y-2">
                              {[
                                'The type of web browser you use (e.g. Internet Explorer, Mozilla Firefox, Google Chrome or another)',
                                'Where you travel within the site (e.g. the pages that you visit within the Moving Walls Pte Ltd site)',
                                'Your browsing preferences, such as your screen size, resolution and other viewing preferences',
                                'The links and adverts that you click on',
                                'Information about how you arrived at our site (e.g. whether you were directed to our site by a search engine or another third party website)',
                                'Information about how you leave our site (e.g. which website you visit immediately after visiting our site)'
                              ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <svg className="w-4 h-4 text-mw-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <p>We may use cookies to help us collect and store this information.</p>
                        </div>
                      </div>

                      {/* 10.3 */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">10.3 How Do We Use the Info We Collect?</h3>
                        <p className="text-gray-600 leading-relaxed">
                          We use the account information and other personal information you provide to manage your account, communicate with you, conduct business with you (e.g. reporting and payment), personalise the Moving Walls Pte Ltd website, comply with your requests, and inform you about products and services in accordance with your marketing preferences. We use your usage information to analyse our web traffic, to figure out how often customers use parts of the site, to improve the site and generally to make it appealing to as many users as possible.
                        </p>
                      </div>

                      {/* 10.4 */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">10.4 Who Do We Share Information With?</h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p className="font-medium text-gray-800">
                            We will share your personal information only in the ways that are described in this privacy statement. We do not sell your personal information to third parties.
                          </p>
                          <p>
                            From time to time, we may need to disclose your information to third parties such as to law enforcement authorities or our legal advisers, where it is necessary to comply with the law or regulation; enforce or apply our user terms and conditions; to protect our rights, or to preserve the safety of our users. This may include exchanging information with other companies and organizations for fraud protection.
                          </p>
                          <p>
                            We may also share your personal information with companies that provide services to help us with our business activities (e.g. processing payments or submitting emails to you on our behalf), in connection with any merger, a sale of Moving Walls Pte Ltd assets, or a financing or acquisition of all or a portion of our business to another company. Whenever we share your personal information for this reason we will ensure that the recipient is bound by all appropriate confidentiality obligations and that it commits to using your personal information only for the purposes for which you originally provided it.
                          </p>
                          <p>
                            You should also be aware that the information submitted to public areas, such as our blogs, may be read, collected, and used by others who access them. If you interact with social media features on our site, such as the Facebook Like button, or use your social network credentials to comment on our blog, these features may collect information about your use of this site as well as post information about your activities on this site to your profile page. Your interactions with these features are governed by the privacy policy of the company providing it.
                          </p>
                        </div>
                      </div>

                      {/* 10.5 */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">10.5 International Transfers</h3>
                        <p className="text-gray-600 leading-relaxed">
                          We may share your information with our affiliates and other third parties described above who are based in countries outside of your country of residence (for example, if you are an EU resident, we may share your information with our non-EU clients or affiliates). While some countries may not have data protection laws that are equivalent to those of the country in which you reside, we will take all reasonable measures to protect your information in accordance with this Privacy Policy and all applicable legal requirements.
                        </p>
                      </div>

                      {/* 10.6 */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">10.6 How Do We Keep Information Secure?</h3>
                        <p className="text-gray-600 leading-relaxed">
                          We use appropriate technical and organisational security measures to protect the information we collect. We use multiple electronic, procedural, and physical security measures to protect against unauthorised or unlawful use or alteration of information, and against any accidental loss, destruction, or damage to information. However, no method of transmission over the Internet, or method of electronic storage, is 100% secure.
                        </p>
                      </div>

                      {/* 10.7 */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">10.7 How Long Do You Keep Information?</h3>
                        <p className="text-gray-600 leading-relaxed">
                          We retain information for only as long as is necessary to fulfil the purposes outlined in this Privacy Policy, unless otherwise required by law.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 11: Contact */}
                  <section id="contact" className="mb-12 scroll-mt-24 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-mw-blue-100 text-mw-blue-700 text-sm font-bold">11</span>
                      <h2 className="text-2xl font-bold text-gray-900">Contacting Us</h2>
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        If you have any questions about this Privacy Policy, please contact us:
                      </p>
                      <div className="bg-gradient-to-br from-mw-blue-50 to-mw-blue-100/50 rounded-xl p-6 border border-mw-blue-200">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-mw-blue-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg mb-2">Moving Walls Pte. Ltd.</h4>
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
                    </div>
                  </section>

                  {/* Cookie Policy Section */}
                  <section id="cookie-policy" className="scroll-mt-24 pt-10 mt-10 border-t-2 border-mw-blue-200">
                    <div className="text-center mb-10">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-mw-blue-100 mb-4">
                        <svg className="w-7 h-7 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">Cookie Policy</h2>
                      <p className="mt-2 text-gray-600">This is the Cookie Policy for the Moving Walls website.</p>
                    </div>

                    <div className="space-y-6">
                      {/* What Are Cookies */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">What Are Cookies</h3>
                        <div className="space-y-3 text-gray-600 leading-relaxed">
                          <p>
                            As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or &apos;break&apos; certain elements of the site&apos;s functionality.
                          </p>
                          <p>
                            For more general information on cookies see the Wikipedia article on HTTP Cookies.
                          </p>
                        </div>
                      </div>

                      {/* How We Use Cookies */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">How We Use Cookies</h3>
                        <p className="text-gray-600 leading-relaxed">
                          We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
                        </p>
                      </div>

                      {/* Disabling Cookies */}
                      <div className="bg-amber-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Disabling Cookies
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies.
                        </p>
                      </div>

                      {/* The Cookies We Set */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">The Cookies We Set</h3>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h4 className="font-semibold text-gray-800 mb-2">Site preferences cookies</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            In order to provide you with a great experience on this site, we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences, we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.
                          </p>
                        </div>
                      </div>

                      {/* Third Party Cookies */}
                      <div className="bg-gray-50 rounded-xl p-6 ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Third Party Cookies</h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                          <p>
                            In some special cases, we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
                          </p>
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <ul className="space-y-3">
                              {[
                                'This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.',
                                'Third party analytics are used to track and measure usage of this site so that we can continue to produce engaging content. These cookies may track things such as how long you spend on the site or pages you visit which helps us to understand how we can improve the site for you.',
                                'From time to time we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimisations our users appreciate the most.',
                                'As we sell products it\'s important for us to understand statistics about how many of the visitors to our site actually make a purchase and as such this is the kind of data that these cookies will track.'
                              ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm">
                                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-mw-blue-100 flex items-center justify-center text-mw-blue-700 text-xs font-bold">{i + 1}</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mt-4">
                            <p className="text-sm text-gray-700">
                              <strong>Microsoft Clarity:</strong> We partner with Microsoft Clarity and Microsoft Advertising to capture how you use and interact with our website through behavioral metrics, heatmaps, and session replay to improve and market our products/services. Website usage data is captured using first and third-party cookies and other tracking technologies to determine the popularity of products/services and online activity. Additionally, we use this information for site optimization, fraud/security purposes, and advertising. For more information about how Microsoft collects and uses your data, visit the Microsoft Privacy Statement.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* More Information */}
                      <div className="bg-gradient-to-br from-mw-blue-50 to-mw-blue-100/50 rounded-xl p-6 border border-mw-blue-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">More Information</h3>
                        <div className="space-y-3 text-gray-600 leading-relaxed">
                          <p>
                            Hopefully, that has clarified things for you and as was previously mentioned if there is something that you aren&apos;t sure whether you need or not it&apos;s usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
                          </p>
                          <p>
                            However, if you are still looking for more information then you can contact us through one of our preferred contact methods:
                          </p>
                          <div className="inline-flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-mw-blue-200">
                            <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium text-gray-900">info@movingwalls.com</span>
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
