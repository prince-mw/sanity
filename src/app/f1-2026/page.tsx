import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { ZohoResponsiveForm } from './ZohoResponsiveForm';
import styles from './f1-2026.module.css';

// Revalidate on the same 60s cadence as the rest of the site — plus the Sanity webhook
// on-demand-revalidates '/f1-2026' automatically whenever this landingPage doc is edited
// (see typeToPath['landingPage'] in src/app/api/sanity-webhook/route.ts).
export const revalidate = 60;

const F1_SLUG = 'f1-2026';

const DEFAULT_TITLE = 'Curated Journeys - F1 Malaysia & Singapore | Moving Walls';
const DEFAULT_OG_TITLE = 'Curated Journeys - F1 Malaysia & Singapore';
const DEFAULT_DESCRIPTION =
  "Own the journey to F1. Curated OOH & DOOH media packages across Sepang, Malaysia (4 Oct 2026) and Marina Bay, Singapore (11 Oct 2026) — reach audiences on the way to, around, and home from the race.";
const DEFAULT_OG_DESCRIPTION =
  'Own the journey to F1. Curated OOH & DOOH media packages across Sepang and Marina Bay race week.';
const DEFAULT_KEYWORDS = [
  'F1 Malaysia advertising',
  'F1 Singapore advertising',
  'Sepang OOH',
  'Marina Bay DOOH',
  'F1 sponsorship activation',
  'Curated Journeys',
  'OOH media packages',
];

interface F1PageDoc {
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
// "landingPage" doc (slug: f1-2026) for two self-service controls: SEO fields, and a
// publish/archive kill-switch. Never filtered by publish status here: a doc that simply
// doesn't exist yet (or a transient fetch error) must fall back to the defaults above
// and keep the page live, not take it down — only an *existing* doc explicitly marked
// unpublished/archived should do that (checked separately below).
async function getF1PageDoc(): Promise<F1PageDoc | null> {
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
      { slug: F1_SLUG }
    );
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getF1PageDoc();
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
      canonical: 'https://www.movingwalls.com/f1-2026',
    },
    openGraph: {
      title: seo?.metaTitle || DEFAULT_OG_TITLE,
      description: seo?.metaDescription || DEFAULT_OG_DESCRIPTION,
      url: 'https://www.movingwalls.com/f1-2026',
      ...(seo?.ogImage ? { images: [seo.ogImage] } : {}),
    },
  };
}

function F1CarIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 300 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* front wing + endplate */}
      <path d="M8 88 L38 88 M8 80 L8 96" />
      {/* nose, cockpit halo, engine cover */}
      <path d="M38 88 L70 72 L110 58 L122 38 L150 38 L168 54 L200 50 L230 50" />
      {/* rear wing strut + plane */}
      <path d="M230 50 L230 24 L268 24" />
      {/* rear wing endplates */}
      <path d="M230 16 L230 32 M268 16 L268 32" />
      {/* rear diffuser taper */}
      <path d="M230 50 L250 86" />
      {/* underbody floor */}
      <path d="M42 92 L225 88" />
      {/* wheels */}
      <circle cx="55" cy="90" r="16" />
      <circle cx="245" cy="90" r="19" />
    </svg>
  );
}

export default async function F1LandingPage() {
  const doc = await getF1PageDoc();

  // Explicit kill-switch: only take the page down when an existing doc has been
  // deliberately unpublished/archived in Studio (see landingPage.ts status field).
  if (doc && (doc.isPublished === false || doc.status === 'archived')) {
    notFound();
  }

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.checkeredCorner} aria-hidden="true" />
        <F1CarIcon className={styles.f1CarIcon} />
        <div className={styles.container}>
          <span className={`${styles.tag} ${styles.heroTag}`}>#StreetsToScreen</span>
          <h1>
            The Race Comes Home.
            <br />
            The Journey Is Ours.
          </h1>
          <p>
            For nine years, Malaysia watched from a distance. On 4 October, lights out returns to
            Sepang. One week later, Marina Bay roars to life with Singapore&apos;s first-ever F1
            Sprint.
          </p>
          <p>
            Two races, seven days, one region at the centre of the F1 universe — and your campaign
            can travel every mile of it.
          </p>
          <div className={styles.dateline}>
            Sepang, Malaysia 4 Oct 2026 | Marina Bay, Singapore 11 Oct 2026
          </div>
          <div className={styles.heroCta}>
            <a href="#locations" className={`${styles.btn} ${styles.heroBtnPrimary}`}>
              Explore F1 Journeys
            </a>
            <a href="#contact" className={`${styles.btn} ${styles.btnSecondary}`}>
              Talk to Our Team
            </a>
          </div>
        </div>
      </section>

      {/* Curated Journeys */}
      <section className={styles.curatedJourneys}>
        <div className={styles.container}>
          <h2>Don&apos;t Just Own the Race. Own the Journey.</h2>
          <p className={styles.lead}>
            Every brand on the grid buys the badge. Almost none of them own the journey to it - the
            fans flying in, the families driving the North-South to Sepang, the supper crowd
            spilling out of Marina Bay at midnight. That&apos;s where sponsorship becomes demand.
          </p>
          <p className={styles.lead}>
            Today, that passion is chased almost entirely through social and digital feeds, where a
            fraction of every dollar reaches a real person. Curated Journeys is digital
            diversification: the same brief, the same creative, the same audience extended from the
            feed into the real world, on the verified journeys people actually take to, around, and
            home from the race.
          </p>

          <div className={styles.journeyFlow}>
            <div className={`${styles.flowStep} ${styles.stepArrive}`}>Arrive</div>
            <div className={styles.flowArrow} aria-hidden="true">→</div>
            <div className={`${styles.flowStep} ${styles.stepMove}`}>Move</div>
            <div className={styles.flowArrow} aria-hidden="true">→</div>
            <div className={`${styles.flowStep} ${styles.stepExperience}`}>Experience</div>
            <div className={styles.flowArrow} aria-hidden="true">→</div>
            <div className={`${styles.flowStep} ${styles.stepEngage}`}>Engage</div>
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
                <span className={styles.tag}>Malaysia - Sepang</span>
                <h3>KLIA – Sepang</h3>
                <div className={styles.date}>4 October 2026</div>
                <p>
                  The home straight itself — KL to Sepang mapped through TNG mobility signals
                  across 13 corridors, reaching audiences from arrival to race day.
                </p>
                <ul className={styles.journeyHighlights}>
                  <li>13 corridors, including the KLIA-Sepang home straight</li>
                  <li>Airport arrivals + key travel corridors</li>
                  <li>OOH &amp; DOOH inventory</li>
                  <li>Packages: finalized by corridor</li>
                </ul>
                <a
                  href="#contact"
                  className={`${styles.btn} ${styles.btnOutline}`}
                  style={{ width: '100%', marginTop: 16 }}
                >
                  Explore Malaysia Inventory
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
                <span className={styles.tag}>Singapore - Marina Bay</span>
                <h3>Marina Bay – Downtown Singapore</h3>
                <div className={styles.date}>11 October 2026 (First-ever F1 Sprint weekend)</div>
                <p>
                  Stellar Ace&apos;s 394 profiled screens along the streets that feed the circuit,
                  mapped across seven journeys through Singapore&apos;s highest-density downtown
                  environment.
                </p>
                <ul className={styles.journeyHighlights}>
                  <li>394 profiled screens, Stellar Ace network</li>
                  <li>7 mapped Singapore journeys</li>
                  <li>N1-N4 packages</li>
                  <li>Marina Bay and downtown environments</li>
                </ul>
                <a
                  href="#contact"
                  className={`${styles.btn} ${styles.btnOutline}`}
                  style={{ width: '100%', marginTop: 16 }}
                >
                  Explore Singapore Inventory
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>What is a Curated Journey?</h4>
              <p>
                A planned OOH and DOOH media package built around key audience movement corridors -
                not a single screen or location.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h4>Where are the F1 Curated Journeys available?</h4>
              <p>Malaysia (KLIA – Sepang) and Singapore (Marina Bay – Downtown).</p>
            </div>
            <div className={styles.faqItem}>
              <h4>When are the F1 journeys available?</h4>
              <p>
                Malaysia: 4 October 2026. Singapore: 11 October 2026 (Singapore&apos;s first-ever
                F1 Sprint weekend).
              </p>
            </div>
            <div className={styles.faqItem}>
              <h4>What inventory is available?</h4>
              <p>
                Inventory varies by journey and market, spanning OOH and DOOH opportunities across
                key F1 environments.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h4>How many screens are available?</h4>
              <p>
                Singapore: 394 profiled screens across the Stellar Ace network. Malaysia:
                structured across 13 corridors, including the KLIA-Sepang home straight.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h4>What packages are available?</h4>
              <p>
                Singapore offers N1-N4 packages. Malaysia packages are organized by corridor - full
                list available on enquiry.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h4>Can agencies book these journeys for their clients?</h4>
              <p>
                Yes - agencies can work with the Moving Walls team to explore available journeys,
                inventory, and packages.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h4>How is the campaign measured?</h4>
              <p>
                Campaign insights include audience reach, delivery reporting, location and movement
                data, heatmaps, and post-campaign reporting.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h4>Is inventory exclusive by category?</h4>
              <p>
                One brand per category, booked on a first-come basis — corridor availability
                updates as race weekend approaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA & Form */}
      <section id="contact" className={styles.finalCta}>
        <div className={styles.checkeredCorner} aria-hidden="true" />
        <F1CarIcon className={styles.f1CarIconCta} />
        <div className={styles.container}>
          <div className={styles.ctaContainer}>
            <div className={styles.ctaText}>
              <h2>Own the Journey to F1.</h2>
              <p>Your audience is moving. Make sure your brand is there.</p>
              <div className={styles.urgencyLine}>
                Corridor and screen inventory is limited and, where noted, exclusive by category.
                Enquire now to lock in availability ahead of race weekend.
              </div>
            </div>

            <div className={styles.formCard}>
              <ZohoResponsiveForm
                formUrl="https://forms.zohopublic.com/movingwallsholdingpteltd/form/Formula1/formperma/EamMQdgYqq5VbcJX2A0I_j3xCG_lXWRrw3xxBcJ-o9g"
                title="F1 Curated Journeys Enquiry Form"
                defaultHeight={650}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
