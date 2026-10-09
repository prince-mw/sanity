// Default partner content for /partners and /partners/[slug].
// Used when Sanity has no published `partnerPage` documents (or is unreachable),
// and as the source copy for scripts/seed-partner-pages.mjs.

// Icon names available to sections, cards and highlights (rendered in PartnerDetailClient)
export type PartnerIconName =
  | 'store' | 'screen' | 'megaphone' | 'epaper' | 'chart' | 'network'
  | 'users' | 'settings' | 'target' | 'layers' | 'clock' | 'bolt'

export interface PartnerTextSection {
  _type: 'partnerTextSection'
  icon?: PartnerIconName
  heading: string
  intro?: string
  paragraphs?: string[]
  callout?: string
}

export interface PartnerCardsSection {
  _type: 'partnerCardsSection'
  heading: string
  intro?: string
  cards: { title: string; description: string; icon?: PartnerIconName }[]
}

export interface PartnerCtaSection {
  _type: 'partnerCtaSection'
  heading: string
  paragraphs?: string[]
  buttonText?: string
}

export type PartnerSection = PartnerTextSection | PartnerCardsSection | PartnerCtaSection

export interface PartnerPageContent {
  name: string
  slug: string
  logo: { url: string; alt: string } | null
  logoBackground?: string
  category?: string
  summary?: string
  order?: number
  heroEyebrow?: string
  heroTitle: string
  heroParagraphs: string[]
  heroCtaText?: string
  heroImage?: { url: string; alt: string } | null
  // Built-in hero illustration shown when no heroImage is uploaded
  heroIllustration?: 'retail-displays' | 'screen-network' | 'media-player'
  highlights?: { icon?: PartnerIconName; text: string }[]
  sections: PartnerSection[]
  metaTitle?: string
  metaDescription?: string
}

export const partnersIndexContent = {
  eyebrow: 'Partners',
  title: 'Technology partners that power our network',
  intro:
    'Moving Walls works with display and technology partners so retailers, media owners and system integrators can build, run and monetise screen networks on one platform.',
  metaTitle: 'Technology Partners | Moving Walls',
  metaDescription:
    "Explore Moving Walls' technology partners and how their displays and platforms combine with Moving Walls to build, manage and monetise screen networks.",
}

export const defaultPartners: PartnerPageContent[] = [
  {
    name: 'SOLUM',
    slug: 'solum',
    logo: {
      url: 'https://cdn.sanity.io/images/u10im6di/production/4e7ce9f7bbcee979921191c6ddde71785316a4de-299x168.png',
      alt: 'SOLUM logo',
    },
    logoBackground: '#2F006D',
    category: 'Retail display technology',
    summary:
      "SOLUM's LCD and e-paper retail displays, combined with Moving Walls' content management and media monetisation, help retailers build an in-store retail media network.",
    order: 1,
    heroEyebrow: 'SOLUM × Moving Walls',
    heroTitle: 'Reach shoppers. Promote products. Turn retail screens into advertising opportunities.',
    heroParagraphs: [
      "Bring together SOLUM's display technology, designed for retail environments, and Moving Walls' content management and media monetisation capabilities.",
      'Manage store promotions, deliver brand advertising and build a retail media offering across your locations. Alongside LCD digital signage, introduce e-paper as a new way to bring advertising into the shopping environment.',
    ],
    heroCtaText: 'Book a demo',
    heroIllustration: 'retail-displays',
    highlights: [
      { icon: 'bolt', text: 'CMS runs directly on supported SOLUM LCD displays' },
      { icon: 'layers', text: 'LCD digital signage and e-paper in one network' },
      { icon: 'target', text: 'Direct and programmatic brand advertising' },
    ],
    sections: [
      {
        _type: 'partnerTextSection',
        icon: 'store',
        heading: 'Make every location part of your retail media network',
        intro: 'Use your displays to communicate with shoppers where purchase decisions happen.',
        paragraphs: [
          'Schedule product promotions, store messages and advertising across your network. Keep campaigns consistent across locations or tailor content to individual stores.',
        ],
        callout:
          "Moving Walls' CMS runs directly on supported SOLUM LCD displays, without an additional external media player.",
      },
      {
        _type: 'partnerCardsSection',
        heading: 'Give brands a place in the shopping journey',
        intro: 'Your stores connect brands with shoppers. Your screens create another opportunity to make that connection.',
        cards: [
          {
            icon: 'megaphone',
            title: 'Run directly sold brand campaigns',
            description: 'Give brands advertising space across selected stores and displays, alongside your own promotions.',
          },
          {
            icon: 'screen',
            title: 'Enable programmatic advertising on supported LCD displays',
            description: 'Make eligible inventory available through connected programmatic buying platforms.',
          },
          {
            icon: 'clock',
            title: 'Balance advertising with store communications',
            description: 'Plan screen time around your own content needs and the campaigns you want to run.',
          },
        ],
      },
      {
        _type: 'partnerTextSection',
        icon: 'epaper',
        heading: 'Meet e-paper: a new format for retail advertising',
        intro:
          'Bring the paper-like appearance of a printed poster together with the ability to change its message digitally.',
        paragraphs: [
          'SOLUM e-paper holds a static image between updates and uses very little power. It offers an additional format for product promotions and brand messages that stay on display for agreed periods.',
          'With Moving Walls, e-paper can become part of your retail media offering, supporting directly sold campaigns alongside your store content.',
        ],
        callout: 'Choose LCD for moving content, e-paper for persistent static messages, or use both across your stores.',
      },
      {
        _type: 'partnerTextSection',
        icon: 'chart',
        heading: 'Make campaign delivery visible',
        intro: 'Track advertising delivery and provide reporting to participating brands.',
        paragraphs: [
          "Explore Moving Walls' audience and campaign measurement capabilities to better understand your locations and evaluate campaign performance, with options selected for your network and goals.",
        ],
      },
      {
        _type: 'partnerCardsSection',
        heading: 'What could this look like for you?',
        cards: [
          {
            icon: 'store',
            title: 'For retailers',
            description:
              'Support store promotions while creating an advertising offering for brands that want to reach your shoppers.',
          },
          {
            icon: 'network',
            title: 'For retail media operators and media owners',
            description:
              "Build networks across retail locations, combining SOLUM display formats with Moving Walls' advertising capabilities.",
          },
          {
            icon: 'settings',
            title: 'For system integrators',
            description: 'Bring retail customers a display solution with content management and media monetisation capabilities.',
          },
        ],
      },
      {
        _type: 'partnerTextSection',
        icon: 'settings',
        heading: 'Build around your stores',
        intro:
          'Start with your store layouts, shoppers and content needs. We help you identify suitable displays, plan advertising opportunities and define how the network will operate.',
        paragraphs: ['From an initial group of stores to a wider rollout, create a setup that fits your retail environment.'],
      },
      {
        _type: 'partnerCtaSection',
        heading: 'Discover your retail media opportunity',
        paragraphs: [
          'Planning an LCD screen network, exploring e-paper or looking to combine both?',
          'Tell us about your stores and what you want to achieve.',
        ],
        buttonText: 'Book a demo',
      },
    ],
    metaTitle: 'SOLUM × Moving Walls | Retail Media on LCD & E-Paper Screens',
    metaDescription:
      "Turn SOLUM LCD and e-paper retail displays into a retail media network with Moving Walls' CMS, direct and programmatic advertising, and campaign reporting.",
  },
  {
    name: 'LG Electronics',
    slug: 'lg-electronics',
    logo: {
      url: 'https://cdn.sanity.io/images/u10im6di/production/a6d87086894e45f8f5a1cb09b452e5a4c00b9de3-334x65.png',
      alt: 'LG Electronics logo',
    },
    logoBackground: '#ffffff',
    category: 'Commercial display technology',
    summary:
      "Moving Walls' CMS integrated with LG webOS Signage lets compatible LG commercial displays combine your own content with direct and programmatic advertising.",
    order: 2,
    heroEyebrow: 'LG Electronics × Moving Walls',
    heroTitle: 'Your LG screens. Your content. New advertising opportunities.',
    heroParagraphs: [
      'Make more of your digital signage with Moving Walls. Manage content across your LG screen network, run brand campaigns and open your advertising inventory to programmatic buyers.',
      "With Moving Walls' CMS integrated with LG webOS Signage, compatible displays bring your own communications and paid advertising together, whether you operate a retail chain, a media network or a portfolio of venues.",
    ],
    heroCtaText: 'Book a demo',
    heroIllustration: 'screen-network',
    highlights: [
      { icon: 'bolt', text: "Moving Walls' CMS integrated with LG webOS Signage" },
      { icon: 'target', text: 'Direct and programmatic advertising on your screens' },
      { icon: 'layers', text: 'Your own content and paid campaigns, side by side' },
    ],
    sections: [
      {
        _type: 'partnerTextSection',
        icon: 'network',
        heading: 'Bring your screen network together',
        intro:
          'Update a promotion in one location or schedule a campaign across your network. Moving Walls helps you manage content across locations, giving you control over where and when your messages appear.',
        paragraphs: [
          'Use your screens for product promotions, visitor information and brand advertising, with schedules that fit each location.',
        ],
      },
      {
        _type: 'partnerCardsSection',
        heading: 'Turn screen space into advertising inventory',
        intro:
          'Your screens reach people where they shop, travel and spend time. Moving Walls helps you make that screen space available to advertisers while keeping room for your own content.',
        cards: [
          {
            icon: 'megaphone',
            title: 'Run campaigns you sell directly',
            description: 'Deliver advertising booked by brands and agencies across selected screens and locations.',
          },
          {
            icon: 'bolt',
            title: 'Connect to programmatic demand',
            description:
              'Make eligible inventory available through connected programmatic buying platforms, giving advertisers another way to access your network.',
          },
          {
            icon: 'clock',
            title: 'Keep your own content in the mix',
            description: 'Plan how promotions, information and paid campaigns share screen time.',
          },
        ],
      },
      {
        _type: 'partnerTextSection',
        icon: 'screen',
        heading: 'Built around LG webOS Signage',
        intro:
          "The integration between Moving Walls' CMS and LG webOS Signage brings content management and advertising capabilities to compatible LG commercial displays.",
        paragraphs: [
          'For new installations or existing LG networks, we help identify the supported displays and setup suited to your requirements.',
        ],
      },
      {
        _type: 'partnerTextSection',
        icon: 'chart',
        heading: 'See what ran. Understand its impact.',
        intro: 'Track campaign delivery to support reporting to brands and agencies.',
        paragraphs: [
          'Moving Walls also offers audience and campaign measurement capabilities to help you understand the opportunity across your locations and evaluate advertising performance. Measurement options are selected according to your network and campaign goals.',
        ],
      },
      {
        _type: 'partnerCardsSection',
        heading: 'What could this look like for you?',
        cards: [
          {
            icon: 'store',
            title: 'For retailers',
            description:
              'Promote your products and offers, then give brands a way to reach shoppers through your in-store screens.',
          },
          {
            icon: 'network',
            title: 'For media owners',
            description:
              'Expand your LG display network and manage directly sold and programmatic campaigns alongside existing content.',
          },
          {
            icon: 'users',
            title: 'For venue and property owners',
            description: 'Combine visitor communications with advertising across malls, offices and transport hubs.',
          },
          {
            icon: 'settings',
            title: 'For system integrators',
            description:
              'Bring customers an LG display solution with content management and media monetisation capabilities built into the proposal.',
          },
        ],
      },
      {
        _type: 'partnerTextSection',
        icon: 'layers',
        heading: 'From your first screens to a wider network',
        intro:
          'Start with your locations, screen requirements and advertising goals. Together, we can assess your setup, plan your content and identify the steps to activate advertising.',
        paragraphs: [
          'Whether you are building a new network or exploring the potential of screens you already own, we can help you move forward.',
        ],
      },
      {
        _type: 'partnerCtaSection',
        heading: 'Discover what your LG screens could do',
        paragraphs: [
          "Tell us about your network. We'll show you how Moving Walls can help you manage content and develop your advertising opportunity.",
        ],
        buttonText: 'Book a demo',
      },
    ],
    metaTitle: 'LG Electronics × Moving Walls | webOS Signage Advertising',
    metaDescription:
      'Manage content on LG webOS Signage displays and monetise your screen network with Moving Walls: direct and programmatic advertising, scheduling and reporting.',
  },
  {
    name: 'BrightSign',
    slug: 'brightsign',
    logo: {
      url: 'https://cdn.sanity.io/images/u10im6di/production/4537927da104f386322a645055295775442d037f-702x168.png',
      alt: 'BrightSign logo',
    },
    logoBackground: '#ffffff',
    category: 'Digital signage media players',
    summary:
      'Available in the BrightSign Partner Gallery, the Moving Walls application adds content management and direct and programmatic advertising to BrightSign-powered networks.',
    order: 3,
    heroEyebrow: 'BrightSign × Moving Walls',
    heroTitle: 'Powerful playback. Simple content management. New advertising opportunities.',
    heroParagraphs: [
      "Bring Moving Walls' content management and media monetisation capabilities to your BrightSign screen network.",
      'Manage your own content, deliver brand campaigns and connect eligible advertising inventory to programmatic buyers. Available through the BrightSign Partner Gallery, the Moving Walls application brings these capabilities to networks powered by BrightSign.',
    ],
    heroCtaText: 'Book a demo',
    heroIllustration: 'media-player',
    highlights: [
      { icon: 'bolt', text: 'Available in the BrightSign Partner Gallery' },
      { icon: 'screen', text: 'BrightSign players power playback, Moving Walls manages content' },
      { icon: 'target', text: 'Direct and programmatic advertising' },
    ],
    sections: [
      {
        _type: 'partnerTextSection',
        icon: 'network',
        heading: 'Bring your screens together',
        intro:
          'From a single venue to a network across multiple locations, keep your content organised and your messages relevant.',
        paragraphs: [
          'Moving Walls helps you schedule promotions, information and advertising across your screens, while BrightSign media players power content playback.',
          'Update content across the network or tailor it to individual locations, with schedules that fit your business.',
        ],
      },
      {
        _type: 'partnerCardsSection',
        heading: 'Put your screen space to work',
        intro:
          'Your network already reaches an audience. Create opportunities for brands to reach that audience through paid advertising.',
        cards: [
          {
            icon: 'megaphone',
            title: 'Run campaigns you sell directly',
            description: 'Deliver campaigns booked by brands and agencies across selected screens and locations.',
          },
          {
            icon: 'bolt',
            title: 'Connect to programmatic demand',
            description: 'Make eligible inventory available through connected programmatic buying platforms.',
          },
          {
            icon: 'clock',
            title: 'Keep control of your content',
            description: 'Plan how your own promotions, information and paid advertising share screen time.',
          },
        ],
      },
      {
        _type: 'partnerTextSection',
        icon: 'settings',
        heading: 'Find Moving Walls in the BrightSign Partner Gallery',
        intro:
          'The Moving Walls application is available through the BrightSign Partner Gallery, giving customers a starting point for bringing content management and monetisation capabilities to their BrightSign installations.',
        paragraphs: [
          'Whether you are planning a new deployment or expanding an existing network, we help you assess compatibility and identify the setup suited to your requirements.',
        ],
      },
      {
        _type: 'partnerTextSection',
        icon: 'chart',
        heading: 'See what ran. Understand its impact.',
        intro: 'Track campaign delivery and support reporting to your advertising customers.',
        paragraphs: [
          "Explore Moving Walls' audience insights and campaign measurement capabilities to understand your locations and evaluate advertising performance, with options suited to your network and goals.",
        ],
      },
      {
        _type: 'partnerCardsSection',
        heading: 'What could this look like for you?',
        cards: [
          {
            icon: 'store',
            title: 'For retailers',
            description: 'Promote your products and offers while giving brands a way to reach shoppers through your screens.',
          },
          {
            icon: 'network',
            title: 'For media owners',
            description:
              'Build or expand a BrightSign-powered advertising network that supports direct and programmatic campaigns.',
          },
          {
            icon: 'users',
            title: 'For venue and property owners',
            description: 'Combine visitor information with advertising opportunities across your locations.',
          },
          {
            icon: 'settings',
            title: 'For system integrators',
            description: 'Add content management and media monetisation capabilities to your BrightSign projects.',
          },
        ],
      },
      {
        _type: 'partnerCtaSection',
        heading: 'Take the next step with your network',
        paragraphs: [
          'Tell us where your screens are, what content you need to show and how you want to develop your advertising offering.',
          "We'll help you plan the steps from setup to campaign delivery.",
        ],
        buttonText: 'Book a demo',
      },
    ],
    metaTitle: 'BrightSign × Moving Walls | Digital Signage Advertising',
    metaDescription:
      "Add Moving Walls' content management and media monetisation to BrightSign networks via the Partner Gallery: scheduling, direct and programmatic ads, reporting.",
  },
]
