// Tabs on /internal-insights (shared by server and client code). To add a tab: add it here,
// then render its content in src/app/internal-insights/page.tsx.
export type TabKey = 'locations' | 'campaigns' | 'leads' | 'content' | 'blog' | 'projects'

export const TABS: { key: TabKey; label: string; title: string }[] = [
  { key: 'locations', label: 'Location pages', title: 'Location Pages Performance' },
  { key: 'campaigns', label: 'Email campaigns', title: 'Email Campaign Performance' },
  { key: 'leads', label: 'Leads & Deals', title: 'Leads & Deals' },
  { key: 'content', label: 'Content', title: 'Content Effectiveness' },
  { key: 'blog', label: 'Blog findings', title: 'Blog Content Audit' },
  { key: 'projects', label: 'Roadmap & execution', title: 'Roadmap & Execution' },
]

export const DEFAULT_TAB: TabKey = 'locations'
