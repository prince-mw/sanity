"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useZohoPopup } from "@/components/ZohoPopupProvider";

// Content migrated from movinghearts.media (Home + Offerings) ahead of that domain being retired.
const CONTACT_FORM = "https://forms.zohopublic.com/movingwallsholdingpteltd/form/MovingHeartsContact/formperma/Xc0J2Orq3i0F-sTyr5WtvCkMOTb05KsrQ4QRVEkT500";
const FORM_TITLE = "Get Started with Moving Hearts";

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const audiences = [
  {
    id: "nonprofits",
    title: "Moving Hearts for Nonprofits",
    accent: "from-rose-500 to-pink-600",
    tint: "bg-rose-50 border-rose-100",
    items: [
      { title: "Expand Your Reach and Impact", text: "Boost your message through effective OOH campaigns. Our network displays ads in high-traffic spots for diverse audiences, driving awareness, support and change." },
      { title: "Discounted Advertising", text: "Cost-effective ways to connect with your audience. Through free and discounted models, we connect you with media owners donating their inventory, giving you exposure without the financial burden." },
      { title: "Access Expertise and Support", text: "We go beyond being a platform. Our experts help your campaign succeed with message refinement, ad spot selection and continuous guidance." },
    ],
  },
  {
    id: "media-owners",
    title: "Moving Hearts for Media Owners",
    accent: "from-blue-600 to-indigo-700",
    tint: "bg-blue-50 border-blue-100",
    items: [
      { title: "Amplify Your Impact", text: "Turn unbooked screen time into visibility for causes you believe in, and report the social contribution your network makes." },
      { title: "Enhance Brand Reputation", text: "Show audiences, advertisers and your community that your screens stand for more than advertising." },
      { title: "Create Stronger Industry Connections", text: "Campaign delivery is powered by LMX (Location Media Xchange), part of the Moving Walls group, which gives media owners revenue management, inventory management, programmatic demand, audience measurement and dynamic content tools." },
    ],
  },
  {
    id: "donors",
    title: "Moving Hearts for Donors",
    accent: "from-lime-500 to-green-600",
    tint: "bg-lime-50 border-lime-100",
    items: [
      { title: "Leave Your Mark", text: "Donate towards a Moving Hearts campaign and help your chosen cause go viral. Your support powers out-of-home campaigns that reach a vast audience and inspire others to join." },
      { title: "Use Creativity to Make a Difference", text: "Your donations fuel campaigns that spark public conversations and drive change through engagement and support." },
      { title: "Join a Network of Change Makers", text: "Join a community using out-of-home media for good, reshaping charitable giving through transparency, accessibility and effectiveness." },
    ],
  },
];

const steps = [
  "Causes are recruited and individually validated. Media owners decide whom they wish to support.",
  "LMX Connect, the supply-side platform, schedules the content on a non-guaranteed programmatic deal.",
  "MAX, the demand-side platform, runs the campaign with the objective of reaching a set number of 100,000 hearts (impressions).",
  "Moving Hearts formally reports the social contribution and the number of hearts reached.",
];

const causes = [
  { name: "Youth & Children", icon: "youth-children.svg" },
  { name: "Disaster Relief", icon: "disaster-relief.svg" },
  { name: "Poverty Alleviation", icon: "poverty-alleviation.png" },
  { name: "Arts & Culture", icon: "arts-culture.svg" },
  { name: "Animal Welfare", icon: "animal-welfare.svg" },
  { name: "Health", icon: "health.svg" },
  { name: "Environment", icon: "environment.svg" },
  { name: "Education", icon: "education.svg" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function MovingHeartsPage() {
  const { openZohoPopup } = useZohoPopup();
  const openForm = () => openZohoPopup(CONTACT_FORM, FORM_TITLE);

  const PrimaryButton = ({ children }: { children: React.ReactNode }) => (
    <button
      type="button"
      onClick={openForm}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      {children}
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-rose-200"
              style={{ left: `${(i / 20) * 100}%` }}
              initial={{ y: "-10%", scale: 0.5 + (i % 4) * 0.2, opacity: 0 }}
              animate={{ y: ["-10%", "110%"], opacity: [0, 0.6, 0.6, 0] }}
              transition={{ duration: 18 + (i % 5) * 3, repeat: Infinity, delay: (i / 20) * 10, ease: "linear", opacity: { times: [0, 0.1, 0.9, 1] } }}
            >
              <HeartIcon className="w-6 h-6" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.p {...fadeUp} className="text-sm font-semibold tracking-widest uppercase text-rose-600 mb-4">
              Media for a Better World
            </motion.p>
            <motion.h1 {...fadeUp} className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Amplify Causes, <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">Inspire Action</span>
            </motion.h1>
            <motion.p {...fadeUp} className="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8">
              Moving Hearts gives donated digital out-of-home screen time to social and humanitarian causes, connecting nonprofits with media owners who share our dedication to a better world.
            </motion.p>
            <motion.div {...fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <PrimaryButton>Get Started</PrimaryButton>
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-rose-100">
                <HeartIcon className="w-6 h-6 text-rose-500" />
                <span className="text-2xl font-bold text-gray-900">3M+</span>
                <span className="text-gray-600">Hearts Touched</span>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-8 sm:p-10">
              <Image src="/assets/moving-hearts/moving-hearts-logo.webp" alt="Moving Hearts logo – Media for a Better World" width={333} height={492} priority className="w-48 sm:w-60 h-auto" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who are we */}
      <section className="py-20 bg-white">
        <motion.div {...fadeUp} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Who Are We?</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            We are change-makers, harmonising philanthropy with dynamic out-of-home (OOH) media owners who share our dedication to creating a better world. Using our advanced tech stack and an innovative approach to digital out-of-home, we illuminate social and humanitarian initiatives.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Moving Hearts is part of the Moving Walls group, a global media technology company providing enterprise software that automates out-of-home media for advertisers, agencies and media owners. Together, let&apos;s shape a world where screens don&apos;t just engage minds but also <span className="font-semibold text-rose-600">touch hearts</span>.
          </p>
        </motion.div>
      </section>

      {/* Offerings */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Elevate Awareness With Our Platform</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Elevate a nonprofit&apos;s mission, attract supporters and boost fundraising through out-of-home media.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {audiences.map((a, i) => (
              <motion.div
                key={a.id}
                id={a.id}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`flex flex-col rounded-2xl border p-8 ${a.tint}`}
              >
                <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${a.accent} mb-6`} />
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{a.title}</h3>
                <ul className="space-y-5 mb-8 flex-1">
                  {a.items.map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <HeartIcon className="w-5 h-5 text-rose-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">{item.title}</p>
                        <p className="text-gray-600 text-[15px] leading-relaxed">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={openForm}
                  className="self-start inline-flex items-center gap-2 font-semibold text-rose-600 hover:text-rose-700"
                >
                  Get Started
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Joining Moving Hearts takes just a few clicks. The whole process is automated to show the power and scale of DOOH in this global mission of giving.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((text, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="text-7xl font-bold text-rose-100 mb-4">{String(i + 1).padStart(2, "0")}</div>
                <p className="text-gray-700 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Causes */}
      <section className="py-20 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Causes We Support</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Giving is a language understood everywhere. These are the causes our network puts on screen.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {causes.map((cause, i) => (
              <motion.div
                key={cause.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-lg"
              >
                <Image src={`/assets/moving-hearts/${cause.icon}`} alt="" width={64} height={64} className="w-16 h-16 mb-4" />
                <p className="font-semibold text-gray-900">{cause.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20 bg-white">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HeartIcon className="w-12 h-12 text-rose-500 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Join the Movement</h2>
          <p className="text-lg text-gray-600 mb-8">
            At Moving Hearts, we believe compassion transcends boundaries. Whether you&apos;re a nonprofit seeking visibility, a media owner with screen time to give or a donor who wants to make a difference, join us on this journey, wherever you are.
          </p>
          <PrimaryButton>Contact Moving Hearts</PrimaryButton>
        </motion.div>
      </section>
    </main>
  );
}
