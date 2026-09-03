import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { ZohoResponsiveForm } from './ZohoResponsiveForm';
import styles from './race-week-malaysia-singapore.module.css';

// Revalidate on the same 60s cadence as the rest of the site — plus the Sanity webhook
// on-demand-revalidates '/race-week-malaysia-singapore' automatically whenever this landingPage
// doc is edited (see typeToPath['landingPage'] in src/app/api/sanity-webhook/route.ts).
export const revalidate = 60;

const PAGE_SLUG = 'race-week-malaysia-singapore';

const DEFAULT_TITLE = 'Race Week Journeys 2026 - Malaysia & Singapore | Moving Walls';
const DEFAULT_OG_TITLE = 'Race Week Journeys 2026 - Malaysia & Singapore';
const DEFAULT_DESCRIPTION =
  'Turn race-week movement into media opportunity. Curated OOH & DOOH placements across key locations in Malaysia and Singapore — from arrival and transit to the city and race-day journey.';
const DEFAULT_OG_DESCRIPTION =
  'Curated OOH & DOOH media packages across Malaysia and Singapore during race week.';
const DEFAULT_KEYWORDS = [
  'race week advertising Malaysia',
  'race week advertising Singapore',
  'Kuala Lumpur OOH',
  'Marina Bay DOOH',
  'race week sponsorship activation',
  'Curated Journeys',
  'OOH media packages',
];

interface RaceWeekPageDoc {
  isPublished?: boolean;
  status?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    keywords?: string[];
    enableKeywords?: boolean;
    noIndex?: boolean;
  };
}

// This page's content is fully hardcoded below — this only pulls the optional Sanity
// "landingPage" doc (slug: race-week-malaysia-singapore) for two self-service controls:
// SEO fields, and a publish/archive kill-switch. Never filtered by publish status here: a
// doc that simply doesn't exist yet (or a transient fetch error) must fall back to the
// defaults above and keep the page live, not take it down — only an *existing* doc
// explicitly marked unpublished/archived should do that (checked separately below).
async function getPageDoc(): Promise<RaceWeekPageDoc | null> {
  try {
    return await client.fetch(
      `*[_type == "landingPage" && slug.current == $slug][0]{
        isPublished,
        status,
        "seo": seo{
          metaTitle,
          metaDescription,
          "ogImage": ogImage.asset->url,
          keywords,
          enableKeywords,
          noIndex
        }
      }`,
      { slug: PAGE_SLUG }
    );
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getPageDoc();
  const seo = doc?.seo;
  const title = seo?.metaTitle || DEFAULT_TITLE;
  const description = seo?.metaDescription || DEFAULT_DESCRIPTION;
  const useKeywords = seo?.enableKeywords !== false;

  return {
    title,
    description,
    ...(useKeywords ? { keywords: seo?.keywords?.length ? seo.keywords : DEFAULT_KEYWORDS } : {}),
    ...(seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
    alternates: {
      canonical: 'https://www.movingwalls.com/race-week-malaysia-singapore',
    },
    openGraph: {
      title: seo?.metaTitle || DEFAULT_OG_TITLE,
      description: seo?.metaDescription || DEFAULT_OG_DESCRIPTION,
      url: 'https://www.movingwalls.com/race-week-malaysia-singapore',
      ...(seo?.ogImage ? { images: [seo.ogImage] } : {}),
    },
  };
}

const JOURNEY_TOUCHPOINTS = [
  {
    title: 'Airport Arrival',
    description: 'Reach travellers as they enter the market and begin their journey.',
  },
  {
    title: 'Transit & Mobility',
    description: 'Stay visible across key routes and high-traffic movement corridors.',
  },
  {
    title: 'City & Lifestyle',
    description: 'Connect with audiences where they work, shop, dine and spend time.',
  },
  {
    title: 'Event Destinations',
    description: 'Extend visibility around key destinations and high-interest areas during race week.',
  },
];

const DATA_CARDS = [
  {
    title: 'Audience Insights',
    description: 'Understand who your campaign can reach across selected environments.',
  },
  {
    title: 'Location Intelligence',
    description: 'Identify high-value locations and movement corridors.',
  },
  {
    title: 'Flexible Activation',
    description: 'Build campaigns across multiple OOH and DOOH environments based on your objectives.',
  },
  {
    title: 'Campaign Measurement',
    description: 'Evaluate campaign delivery and performance with measurable insights.',
  },
];

export default async function RaceWeekLandingPage() {
  const doc = await getPageDoc();

  // Explicit kill-switch: only take the page down when an existing doc has been
  // deliberately unpublished/archived in Studio (see landingPage.ts status field).
  if (doc && (doc.isPublished === false || doc.status === 'archived')) {
    notFound();
  }

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={`${styles.tag} ${styles.heroTag}`}>Race Week Journeys 2026</span>
          <h1>Turn Race-Week Movement Into Media Opportunity</h1>
          <p>
            Race week brings together highly mobile, engaged audiences across airports, transport
            corridors, city centres, retail environments and key destinations.
          </p>
          <p>
            With Moving Walls, brands can connect with these audiences through strategic OOH and
            DOOH placements across key locations in Malaysia and Singapore—from arrival and
            transit to the city and race-day journey.
          </p>
          <div className={styles.heroCta}>
            <a href="#locations" className={`${styles.btn} ${styles.heroBtnPrimary}`}>
              Explore Race Week Opportunities
            </a>
          </div>
        </div>
      </section>

      {/* Reach Audiences Along the Journey */}
      <section className={styles.touchpointsSection}>
        <div className={styles.container}>
          <h2>Reach Audiences Along the Journey</h2>
          <p className={styles.lead}>Race-week audiences don&apos;t stay in one place.</p>
          <p className={styles.lead}>
            They move between airports, hotels, city centres, entertainment districts and event
            destinations—creating multiple opportunities for brands to stay visible throughout the
            journey.
          </p>
          <p className={styles.lead}>
            Moving Walls helps you identify and activate the right OOH and DOOH environments based
            on location, audience movement and campaign objectives.
          </p>

          <div className={styles.touchpointsGrid}>
            {JOURNEY_TOUCHPOINTS.map((card) => (
              <div key={card.title} className={styles.touchpointCard}>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className={styles.locations}>
        <div className={styles.container}>
          <div className={styles.locationsGrid}>
            {/* Malaysia */}
            <div className={styles.locationCard}>
              <div
                className={styles.locationImage}
                style={{
                  backgroundImage:
                    "url('https://cdn.sanity.io/images/u10im6di/production/1c566659b9793c1f0e1cf9eb48240cb58fc93583-800x450.webp')",
                }}
              />
              <div className={styles.locationContent}>
                <span className={styles.tag}>Malaysia</span>
                <h3>Capture Race-Week Journeys Across Kuala Lumpur &amp; Sepang</h3>
                <p>
                  Build visibility across key arrival points, transport routes and destinations
                  connecting Kuala Lumpur and Sepang.
                </p>
                <p>
                  From airport arrivals to city movement and event-day travel, activate OOH and
                  DOOH placements across the moments that matter.
                </p>
                <ul className={styles.journeyHighlights}>
                  <li>Airport and arrival zones</li>
                  <li>Key transport corridors</li>
                  <li>Kuala Lumpur city environments</li>
                  <li>High-traffic destinations</li>
                  <li>Sepang-area environments</li>
                </ul>
                <a
                  href="#contact"
                  className={`${styles.btn} ${styles.btnOutline}`}
                  style={{ width: '100%', marginTop: 16 }}
                >
                  Explore Malaysia Opportunities
                </a>
              </div>
            </div>

            {/* Singapore */}
            <div className={styles.locationCard}>
              <div
                className={styles.locationImage}
                style={{
                  backgroundImage:
                    "url('https://cdn.sanity.io/images/u10im6di/production/e54d4ea1dadb8bd83a4c0863e62a9dcf1c5b8e09-800x493.webp')",
                }}
              />
              <div className={styles.locationContent}>
                <span className={styles.tag}>Singapore</span>
                <h3>Reach Audiences Across the Singapore Race-Week Journey</h3>
                <p>
                  Connect with audiences as they move through Singapore&apos;s airport, transport
                  network, downtown areas and key destinations.
                </p>
                <p>
                  Use strategically selected OOH and DOOH environments to build visibility
                  throughout the race-week journey.
                </p>
                <ul className={styles.journeyHighlights}>
                  <li>Airport and arrival zones</li>
                  <li>Major transport corridors</li>
                  <li>Downtown Singapore</li>
                  <li>Marina Bay area</li>
                  <li>High-footfall retail and lifestyle environments</li>
                </ul>
                <a
                  href="#contact"
                  className={`${styles.btn} ${styles.btnOutline}`}
                  style={{ width: '100%', marginTop: 16 }}
                >
                  Explore Singapore Opportunities
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* One Journey. Multiple Touchpoints. */}
      <section className={styles.curatedJourneys}>
        <div className={styles.container}>
          <h2>One Journey. Multiple Touchpoints.</h2>
          <p className={styles.lead}>
            OOH works best when audiences encounter your brand across multiple moments—not just a
            single screen.
          </p>
          <p className={styles.lead}>
            Moving Walls enables brands to plan connected OOH and DOOH journeys across:
          </p>

          <div className={styles.journeyFlow}>
            <div className={`${styles.flowStep} ${styles.stepArrive}`}>Arrive</div>
            <div className={styles.flowArrow} aria-hidden="true">→</div>
            <div className={`${styles.flowStep} ${styles.stepMove}`}>Move</div>
            <div className={styles.flowArrow} aria-hidden="true">→</div>
            <div className={`${styles.flowStep} ${styles.stepExplore}`}>Explore</div>
            <div className={styles.flowArrow} aria-hidden="true">→</div>
            <div className={`${styles.flowStep} ${styles.stepEngage}`}>Engage</div>
          </div>

          <p className={styles.lead} style={{ marginTop: '2.5rem' }}>
            Create a campaign that follows your audience through the city and reaches them at
            multiple points throughout their journey.
          </p>
        </div>
      </section>

      {/* Plan Smarter With Data */}
      <section className={`${styles.touchpointsSection} ${styles.alt}`}>
        <div className={styles.container}>
          <h2>Plan Smarter With Data</h2>
          <p className={styles.lead}>Move beyond simply buying screens.</p>
          <p className={styles.lead}>
            Use audience and location insights to identify relevant environments, understand
            movement patterns and build campaigns around where audiences are most likely to be.
          </p>

          <div className={styles.touchpointsGrid}>
            {DATA_CARDS.map((card) => (
              <div key={card.title} className={styles.touchpointCard}>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Brands That Want More From OOH */}
      <section className={styles.brandsCta}>
        <div className={styles.container}>
          <h2>Built for Brands That Want More From OOH</h2>
          <p className={styles.lead}>
            Whether your objective is awareness, reach or sustained visibility, race week creates
            a concentrated period of audience movement and attention.
          </p>
          <p className={styles.lead}>
            Moving Walls helps you turn that movement into a measurable OOH and DOOH strategy.
          </p>
          <a href="#contact" className={`${styles.btn} ${styles.btnPrimary}`}>
            Talk to Our OOH &amp; DOOH Team
          </a>
        </div>
      </section>

      {/* Final CTA & Form */}
      <section id="contact" className={styles.finalCta}>
        <div className={styles.container}>
          <div className={styles.ctaContainer}>
            <div className={styles.ctaText}>
              <h2>Ready to Own the Race-Week Journey?</h2>
              <p>Put your brand in front of audiences as they arrive, move and experience the city.</p>
              <p>Explore OOH and DOOH opportunities across Malaysia and Singapore with Moving Walls.</p>
            </div>

            <div className={styles.formCard}>
              <h3 className={styles.formCardHeading}>Plan Your Campaign</h3>
              <ZohoResponsiveForm
                formUrl="https://forms.zohopublic.com/movingwallsholdingpteltd/form/Formula1/formperma/EamMQdgYqq5VbcJX2A0I_j3xCG_lXWRrw3xxBcJ-o9g"
                title="Race Week Journeys Enquiry Form"
                defaultHeight={650}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
