import React, {useEffect, useState, useCallback} from 'react'
import {useClient} from 'sanity'
import {
  Card,
  Stack,
  Text,
  Heading,
  Box,
  Badge,
  Flex,
  Spinner,
  TextInput,
  Select,
  Button,
  Grid,
} from '@sanity/ui'
import {SearchIcon, WarningOutlineIcon, CheckmarkCircleIcon, CloseCircleIcon, SyncIcon} from '@sanity/icons'

interface SeoData {
  _id: string
  _type: string
  title?: string
  name?: string
  pageId?: string
  slug?: {current: string}
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: any
    keywords?: string[]
    noIndex?: boolean
  }
}

interface SeoScore {
  score: number
  issues: string[]
  warnings: string[]
}

const CONTENT_TYPES = [
  {value: 'all', title: 'All Content'},
  {value: 'blogPost', title: 'Blog Posts'},
  {value: 'caseStudy', title: 'Case Studies'},
  {value: 'pressRelease', title: 'Press & News'},
  {value: 'product', title: 'Products'},
  {value: 'landingPage', title: 'Landing Pages'},
  {value: 'pageSeo', title: 'Static Pages'},
  {value: 'event', title: 'Events'},
  {value: 'webinar', title: 'Webinars'},
  {value: 'ebook', title: 'E-books'},
  {value: 'whitepaper', title: 'Whitepapers'},
]

function calculateSeoScore(item: SeoData): SeoScore {
  const issues: string[] = []
  const warnings: string[] = []
  let score = 100

  const seo = item.seo
  const title = item.title || item.name || item.pageId || ''

  // Check meta title
  if (!seo?.metaTitle) {
    issues.push('Missing meta title')
    score -= 25
  } else {
    const titleLength = seo.metaTitle.length
    if (titleLength < 30) {
      warnings.push(`Meta title too short (${titleLength}/50-60 chars)`)
      score -= 5
    } else if (titleLength > 60) {
      warnings.push(`Meta title too long (${titleLength}/60 chars)`)
      score -= 5
    }
  }

  // Check meta description
  if (!seo?.metaDescription) {
    issues.push('Missing meta description')
    score -= 25
  } else {
    const descLength = seo.metaDescription.length
    if (descLength < 120) {
      warnings.push(`Meta description too short (${descLength}/150-160 chars)`)
      score -= 5
    } else if (descLength > 160) {
      warnings.push(`Meta description too long (${descLength}/160 chars)`)
      score -= 5
    }
  }

  // Check social share image
  if (!seo?.ogImage?.asset) {
    warnings.push('Missing social share image')
    score -= 10
  }

  // Check keywords
  if (!seo?.keywords || seo.keywords.length === 0) {
    warnings.push('No SEO keywords defined')
    score -= 5
  }

  // Check noIndex
  if (seo?.noIndex) {
    warnings.push('Page is hidden from search engines')
  }

  return {score: Math.max(0, score), issues, warnings}
}

function getScoreColor(score: number): 'positive' | 'caution' | 'critical' {
  if (score >= 80) return 'positive'
  if (score >= 50) return 'caution'
  return 'critical'
}

function CharacterCount({current, min, max, label}: {current: number; min: number; max: number; label: string}) {
  const isShort = current < min
  const isLong = current > max
  const isOptimal = current >= min && current <= max

  return (
    <Flex gap={2} align="center">
      <Text size={1} muted>{label}:</Text>
      <Badge
        tone={isOptimal ? 'positive' : isShort ? 'caution' : 'critical'}
        mode="outline"
      >
        {current}/{min}-{max}
      </Badge>
    </Flex>
  )
}

function SeoCard({item, onEdit}: {item: SeoData; onEdit: (id: string) => void}) {
  const seoScore = calculateSeoScore(item)
  const title = item.title || item.name || item.pageId || 'Untitled'
  const metaTitle = item.seo?.metaTitle || ''
  const metaDesc = item.seo?.metaDescription || ''

  return (
    <Card padding={4} radius={2} shadow={1} tone={seoScore.score < 50 ? 'critical' : 'default'}>
      <Stack space={4}>
        <Flex justify="space-between" align="center">
          <Stack space={2}>
            <Text weight="semibold" size={2}>{title}</Text>
            <Badge tone="primary" mode="outline">{item._type}</Badge>
          </Stack>
          <Flex align="center" gap={2}>
            <Badge tone={getScoreColor(seoScore.score)} padding={3}>
              <Text size={2} weight="bold">{seoScore.score}%</Text>
            </Badge>
          </Flex>
        </Flex>

        <Box>
          <Stack space={3}>
            <Box>
              <Text size={1} weight="medium" muted>Meta Title</Text>
              <Card padding={2} radius={2} tone={!metaTitle ? 'critical' : 'default'} marginTop={1}>
                <Text size={1}>{metaTitle || 'Not set'}</Text>
              </Card>
              {metaTitle && <CharacterCount current={metaTitle.length} min={50} max={60} label="Chars" />}
            </Box>

            <Box>
              <Text size={1} weight="medium" muted>Meta Description</Text>
              <Card padding={2} radius={2} tone={!metaDesc ? 'critical' : 'default'} marginTop={1}>
                <Text size={1} style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {metaDesc || 'Not set'}
                </Text>
              </Card>
              {metaDesc && <CharacterCount current={metaDesc.length} min={150} max={160} label="Chars" />}
            </Box>
          </Stack>
        </Box>

        {(seoScore.issues.length > 0 || seoScore.warnings.length > 0) && (
          <Stack space={2}>
            {seoScore.issues.map((issue, i) => (
              <Flex key={i} align="center" gap={2}>
                <CloseCircleIcon style={{color: '#f03e3e'}} />
                <Text size={1} style={{color: '#f03e3e'}}>{issue}</Text>
              </Flex>
            ))}
            {seoScore.warnings.map((warning, i) => (
              <Flex key={i} align="center" gap={2}>
                <WarningOutlineIcon style={{color: '#f59f00'}} />
                <Text size={1} style={{color: '#f59f00'}}>{warning}</Text>
              </Flex>
            ))}
          </Stack>
        )}

        <Button
          text="Edit SEO"
          mode="ghost"
          onClick={() => onEdit(item._id)}
          style={{marginTop: 'auto'}}
        />
      </Stack>
    </Card>
  )
}

function SummaryCard({title, value, tone, icon}: {title: string; value: number | string; tone: 'positive' | 'caution' | 'critical' | 'default'; icon: React.ReactNode}) {
  return (
    <Card padding={4} radius={2} shadow={1} tone={tone}>
      <Flex justify="space-between" align="center">
        <Stack space={2}>
          <Text size={1} muted>{title}</Text>
          <Text size={4} weight="bold">{value}</Text>
        </Stack>
        <Box style={{fontSize: 32}}>{icon}</Box>
      </Flex>
    </Card>
  )
}

export default function SeoDashboard() {
  const client = useClient({apiVersion: '2024-01-01'})
  const [data, setData] = useState<SeoData[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const query = `*[
        _type in ["blogPost", "caseStudy", "pressRelease", "product", "landingPage", "pageSeo", "event", "webinar", "ebook", "whitepaper"]
        && !(_id in path("drafts.**"))
      ]{
        _id,
        _type,
        title,
        name,
        pageId,
        slug,
        seo
      } | order(_type asc, title asc)`

      const result = await client.fetch<SeoData[]>(query)
      setData(result)
    } catch (error) {
      console.error('Error fetching SEO data:', error)
    } finally {
      setLoading(false)
    }
  }, [client])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const filteredData = data.filter((item) => {
    const matchesType = filter === 'all' || item._type === filter
    const title = (item.title || item.name || item.pageId || '').toLowerCase()
    const matchesSearch = !search || title.includes(search.toLowerCase())
    return matchesType && matchesSearch
  })

  const handleEdit = (id: string) => {
    // Open the document in a new tab
    const studioUrl = `/desk/__edit__${id}`
    window.open(studioUrl, '_blank')
  }

  // Calculate summary stats
  const totalItems = data.length
  const withSeo = data.filter(item => item.seo?.metaTitle && item.seo?.metaDescription).length
  const missingTitle = data.filter(item => !item.seo?.metaTitle).length
  const missingDesc = data.filter(item => !item.seo?.metaDescription).length
  const avgScore = data.length > 0
    ? Math.round(data.reduce((sum, item) => sum + calculateSeoScore(item).score, 0) / data.length)
    : 0

  if (loading) {
    return (
      <Flex justify="center" align="center" height="fill" padding={6}>
        <Spinner muted />
      </Flex>
    )
  }

  return (
    <Box padding={4} style={{maxHeight: '100vh', overflowY: 'auto'}}>
      <Stack space={5}>
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Heading as="h1" size={3}>SEO Dashboard</Heading>
          <Button
            icon={SyncIcon}
            text="Refresh"
            mode="ghost"
            onClick={fetchData}
          />
        </Flex>

        {/* Summary Cards */}
        <Grid columns={[1, 2, 4]} gap={4}>
          <SummaryCard
            title="Average SEO Score"
            value={`${avgScore}%`}
            tone={avgScore >= 80 ? 'positive' : avgScore >= 50 ? 'caution' : 'critical'}
            icon={<CheckmarkCircleIcon />}
          />
          <SummaryCard
            title="Complete SEO"
            value={`${withSeo}/${totalItems}`}
            tone={withSeo === totalItems ? 'positive' : 'caution'}
            icon={<CheckmarkCircleIcon />}
          />
          <SummaryCard
            title="Missing Title"
            value={missingTitle}
            tone={missingTitle === 0 ? 'positive' : 'critical'}
            icon={<WarningOutlineIcon />}
          />
          <SummaryCard
            title="Missing Description"
            value={missingDesc}
            tone={missingDesc === 0 ? 'positive' : 'critical'}
            icon={<WarningOutlineIcon />}
          />
        </Grid>

        {/* Filters */}
        <Flex gap={3}>
          <Box flex={1}>
            <TextInput
              icon={SearchIcon}
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </Box>
          <Box style={{width: 200}}>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.currentTarget.value)}
            >
              {CONTENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.title}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>

        {/* Results count */}
        <Text size={1} muted>
          Showing {filteredData.length} of {totalItems} items
        </Text>

        {/* Content Grid */}
        <Grid columns={[1, 1, 2, 3]} gap={4}>
          {filteredData.map((item) => (
            <SeoCard key={item._id} item={item} onEdit={handleEdit} />
          ))}
        </Grid>

        {filteredData.length === 0 && (
          <Card padding={6} radius={2} tone="caution">
            <Stack space={3} align="center">
              <SearchIcon style={{fontSize: 48, opacity: 0.5}} />
              <Text align="center">No content found matching your filters.</Text>
            </Stack>
          </Card>
        )}
      </Stack>
    </Box>
  )
}
