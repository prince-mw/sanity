import {definePlugin} from 'sanity'
import {ChartUpwardIcon} from '@sanity/icons'
import SeoDashboard from './SeoDashboard'

export const seoDashboardTool = definePlugin({
  name: 'seo-dashboard',
  tools: [
    {
      name: 'seo-dashboard',
      title: 'SEO Dashboard',
      icon: ChartUpwardIcon,
      component: SeoDashboard,
    },
  ],
})
