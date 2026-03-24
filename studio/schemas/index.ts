import blogPost from './blogPost'
import caseStudy from './caseStudy'
import author from './author'
import category from './category'
import pressRelease from './pressRelease'
import event from './event'
import landingPage from './landingPage'
import teamMember from './teamMember'
import webinar from './webinar'
import jobPosition from './jobPosition'
import ebook from './ebook'
import whitepaper from './whitepaper'
import blockContent from './blockContent'
import location from './location'
import product from './product'
import companyPage from './companyPage'
import timelineEvent from './timelineEvent'
import office from './office'
import audiencePage from './audiencePage'
import industryPage from './industryPage'
import integration from './integration'
import oohFormat from './oohFormat'
import seo from './seo'
import analyticsConfig from './analyticsConfig'
import pageSeo from './pageSeo'
import testimonial from './testimonial'
// Mega Menu
import megaMenu from './megaMenu'
import menuItem from './objects/menuItem'
import menuColumn from './objects/menuColumn'
import menuLink from './objects/menuLink'
import featuredContent from './objects/featuredContent'
// Rich Text Block Types
import callout from './objects/callout'
import statBlock from './objects/statBlock'
import ctaButton from './objects/ctaButton'
import tableBlock from './objects/tableBlock'
import testimonialBlock from './objects/testimonialBlock'
import accordionBlock from './objects/accordionBlock'
// Workflow & i18n
import workflow from './objects/workflow'
import localeString from './objects/localeString'
import localeText from './objects/localeText'
import localeBlockContent from './objects/localeBlockContent'
// Reusable Content Blocks
import reusableTestimonial from './reusableTestimonial'
import reusableStatBlock from './reusableStatBlock'
import reusableCTA from './reusableCTA'
import zohoForm from './zohoForm'
import formField from './objects/formField'
import redirectSettings from './redirectSettings'
import careersPage from './careersPage'
import footerConfig from './footerConfig'
import contactPage from './contactPage'
import trustBar from './trustBar'
import clientPartners from './clientPartners'
import helpCenterFaq from './helpCenterFaq'
import apiReferencePage from './apiReferencePage'
import communityPage from './communityPage'
import legalPage from './legalPage'
import platformConfig from './platformConfig'

export const schemaTypes = [
  // Document types
  blogPost,
  caseStudy,
  author,
  category,
  pressRelease,
  event,
  landingPage,
  teamMember,
  webinar,
  jobPosition,
  ebook,
  whitepaper,
  location,
  product,
  companyPage,
  timelineEvent,
  office,
  audiencePage,
  industryPage,
  integration,
  oohFormat,
  analyticsConfig,
  pageSeo,
  megaMenu,
  testimonial,
  // Object types
  blockContent,
  seo,
  menuItem,
  menuColumn,
  menuLink,
  featuredContent,
  // Rich Text Block Types
  callout,
  statBlock,
  ctaButton,
  tableBlock,
  testimonialBlock,
  accordionBlock,
  // Workflow & i18n
  workflow,
  localeString,
  localeText,
  localeBlockContent,
  // Reusable Content Blocks
  reusableTestimonial,
  reusableStatBlock,
  reusableCTA,
  // Forms
  zohoForm,
  formField,
  // Settings
  redirectSettings,
  careersPage,
  footerConfig,
  contactPage,
  trustBar,
  clientPartners,
  // Phase 2: New content types
  helpCenterFaq,
  apiReferencePage,
  communityPage,
  legalPage,
  platformConfig,
]
