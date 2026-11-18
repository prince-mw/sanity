// Chinese version of "From 11.11 to Black Friday…" (13 Nov 2026), from the approved Chinese doc.
// /blog/11-11-black-friday-overseas-ooh-campaigns-zh. Author Qing He; same categories and images as the
// English post (per Dg). Linked to the English post through `translations` (language switcher + hreflang).
// Doc clean-ups: dropped an untranslated English copy of the cinema-campaign paragraph and stray "." lines,
// added missing full stops, bold kept in the same places as the English post.
// Run: node scripts/seed-blog-1111-zh.mjs          -> writes the DRAFT
//      node scripts/seed-blog-1111-zh.mjs publish  -> publishes it (and removes the draft)
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const EN_ID = 'blog-11-11-black-friday-overseas-ooh-campaigns'
const ID = 'blog-11-11-black-friday-overseas-ooh-campaigns-zh'
const QING_HE = '83d20cbf-166c-4eeb-a8ec-a72b17fa1ed5'
const k = () => Math.random().toString(36).slice(2, 14)

if (process.argv[2] === 'publish') {
  const d = await c.getDocument('drafts.' + ID)
  if (!d) throw new Error('No draft to publish')
  const { _rev, _createdAt, _updatedAt, ...doc } = d
  await c.transaction().createOrReplace({ ...doc, _id: ID }).delete('drafts.' + ID).commit()
  console.log('published', ID)
  process.exit(0)
}

// Inline text: **bold** and [text](url)
const spans = (text) => {
  const markDefs = []
  const children = []
  for (const part of text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/).filter(Boolean)) {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    const bold = part.match(/^\*\*(.+)\*\*$/)
    if (link) {
      const key = k()
      markDefs.push({ _key: key, _type: 'link', href: link[2] })
      children.push({ _key: k(), _type: 'span', marks: [key], text: link[1] })
    } else if (bold) children.push({ _key: k(), _type: 'span', marks: ['strong'], text: bold[1] })
    else children.push({ _key: k(), _type: 'span', marks: [], text: part })
  }
  return { markDefs, children }
}
const block = (style, text, listItem) => ({ _key: k(), _type: 'block', style, ...(listItem ? { listItem, level: 1 } : {}), ...spans(text) })

const en = await c.getDocument(EN_ID)
const enImg = en.content.find((b) => b._type === 'image')
if (!enImg || !en.featuredImage) throw new Error('English images not found')

const content = [
  ['p', '随着各大购物旺季临近，品牌和电商平台之间争夺消费者注意力的竞争日益激烈。社交媒体动态、搜索结果和线上购物平台上充斥着各种促销信息，如何让品牌在众多竞争者中脱颖而出，正成为一项越来越大的挑战。'],
  ['p', '中国的11.11购物节，以及起源于美国、如今已发展成为全球零售盛事的黑色星期五，都是促销活动日益密集的典型时期。当众多品牌都在线上争夺消费者的注意力时，广告主该如何让自己的营销信息获得更多关注？'],
  ['p', '户外广告（OOH）为品牌提供了突破数字信息流、吸引消费者注意力的另一种方式。通过数字户外大屏、购物中心屏幕和交通媒体，品牌及电商平台能够将营销活动融入更具影响力的线下场景，与数字营销形成互补，同时提升品牌在目标受众中的曝光度和可见度。'],
  ['h2', '从11.11购物节到黑色星期五：触达全新受众群体'],
  ['p', '广告活动的信息应根据目标受众和目标市场的实际情况进行调整。品牌需要充分考虑当地的购物习惯、产品供应情况，以及消费者进行购买时所使用的渠道。'],
  ['p', '例如，一家通过美国零售商销售产品的电子品牌，可以在黑色星期五到来之前，利用购物区附近的数字户外大屏提升品牌知名度。随后，通过搜索引擎、社交媒体和电商平台开展协同营销活动，帮助感兴趣的消费者进一步了解相关产品。'],
  ['p', '关键在于确定合适的目标市场、深入了解当地受众，并确保广告活动的信息能够契合他们的需求。'],
  ['h2', '户外广告如何助力季节性营销活动'],
  ['p', '在黑色星期五期间，品牌需要在电商平台、搜索引擎、社交媒体和促销邮件等多个渠道争夺消费者的注意力。户外广告（OOH）则为品牌提供了另一个在实体环境中触达消费者的机会。'],
  ['p', '数字户外大屏、购物中心屏幕和交通媒体能够支持不同的广告活动目标，从提升品牌知名度到强化消费者对当地促销优惠的认知。'],
  ['p', '品牌可以围绕以下三个阶段来规划广告活动：'],
  ['ul', [
    '**建立品牌认知：**在主要促销活动开始前，向消费者介绍品牌或产品。',
    '**强化购买意向：**将户外广告信息与搜索引擎、社交媒体及电商营销活动相结合，进一步推动消费者考虑购买。',
    '**突出促销优惠：**如果媒体预订条件允许更换广告创意素材，可在活动临近时更新广告内容，重点展示相关的黑色星期五促销优惠。',
  ]],
  ['p', '目标是将户外广告整合到整体媒体投放计划中，确保各渠道传递一致的信息，并为消费者提供清晰、便捷的购买路径。'],
  ['h2', '中国广告主正积极探索国际数字户外广告（DOOH）市场'],
  ['img'],
  ['p', '根据 [Marketing-Interactive](https://www.marketing-interactive.com/international-pdooh-campaigns-surge-as-chinese-advertisers-go-global) 报道的一项研究，在接受调查的中国广告主中，有25%在过去12个月内预订过中国境外的程序化数字户外广告（pDOOH）活动。'],
  ['p', '这表明，国际程序化数字户外广告（pDOOH）已经成为部分中国广告主媒体投放组合中的一部分。对于计划开展海外广告活动的品牌而言，下一步是确定合适的目标市场、相关的媒体场景，以及适当的广告效果衡量目标。'],
  ['h2', '2026年黑色星期五营销活动规划'],
  ['p', '2026年黑色星期五定于11月27日举行，品牌从10月29日起约有四周时间进行准备。制定清晰、合理的时间规划，有助于团队明确优先事项，并及时完成各项关键决策。'],
  ['p', '**10月29日—11月10日：确认目标市场与媒体资源。**选择品牌已具备销售条件的目标市场，制定预算，并确认媒体资源的可用情况及广告预订要求。'],
  ['p', '**11月11日—11月20日：敲定广告创意并协调各营销渠道。**根据当地市场调整广告信息，核实促销条款，并确保户外广告（OOH）与品牌的数字营销活动保持一致。'],
  ['p', '**11月21日—11月27日：突出黑色星期五促销优惠。**如果媒体预订条件允许，可更新广告创意素材，重点展示促销优惠，并引导消费者前往相关的当地零售商门店或电商页面。'],
  ['p', '以上为建议的广告活动规划时间节点。实际上线日期将取决于媒体资源的可用情况、广告制作要求以及审批流程所需的时间。'],
  ['h2', '衡量广告效果，而不仅仅是考虑媒体投放情况'],
  ['p', '国际广告活动需要设定明确的效果衡量目标，而不仅仅是记录广告的投放位置。'],
  ['p', '[Moving Walls 在阿联酋开展的 BYD SHARK 广告活动](https://www.movingwalls.com/case-studies/byd-shark-cinema-brand-lift-uae)展示了如何通过品牌提升研究（Brand Lift Research）来评估海外广告活动的效果。该活动采用影院广告投放，并通过对比广告触达受众与对照组受众的表现，评估广告带来的影响。'],
  ['p', 'Moving Walls 报告显示，在广告触达的受众中，对 BYD 皮卡产品的认知度从58%提升至96%，实现了**38个百分点的提升**。'],
  ['p', '这是一项影院广告活动，而非户外广告（OOH）活动，因此不应将其效果归因于户外广告。该案例说明，除了衡量媒体投放情况外，评估受众的实际反应同样至关重要。'],
  ['p', '对于户外广告（OOH）活动，品牌可以追踪媒体投放情况、预估触达人数、品牌知名度以及落地页访问情况。在具备适当数据和研究方法的情况下，还可以通过对照研究评估广告所带来的增量效果。'],
  ['h2', 'Moving Walls 如何助力品牌开展海外户外广告活动'],
  ['p', 'Moving Walls 提供一体化技术平台，支持品牌在不同市场开展户外广告（OOH）规划、广告活动执行及效果衡量。'],
  ['p', '品牌和广告代理公司仍可自主掌控其营销策略、预算及客户关系。该平台则为跨媒体场景协调广告活动提供运营支持，帮助团队有效管理广告执行流程并评估活动成效。'],
  ['p', '对于正在筹备黑色星期五营销活动或计划未来开展国际广告活动的中国品牌而言，Moving Walls 提供了一种系统化的方式，帮助品牌探索海外户外广告（OOH）市场机遇。'],
  ['p', '**想要规划您的下一场海外户外广告（OOH）活动吗？**'],
  ['p', '参与[户外广告（OOH）准备度测评](https://survey.zohopublic.com/zs/fwDB2f)，评估您的品牌是否已为拓展国际市场做好准备；或者进一步了解 [Moving Walls 的中国品牌出海平台（China-to-Global Platform）](https://www.movingwalls.com/locations/china)。'],
]

const body = []
for (const [type, a] of content) {
  if (type === 'p') body.push(block('normal', a))
  else if (type === 'h2') body.push(block('h2', a))
  else if (type === 'ul') a.forEach((t) => body.push(block('normal', t, 'bullet')))
  else if (type === 'img') body.push({ ...enImg, _key: k(), alt: '夜间繁华街道上方大型数字户外大屏上的品牌广告' })
}

const doc = {
  _id: 'drafts.' + ID,
  _type: 'blogPost',
  title: '从11.11购物节到黑色星期五：中国品牌与电商平台如何让户外广告活动拓展至海外市场',
  slug: { _type: 'slug', current: '11-11-black-friday-overseas-ooh-campaigns-zh' },
  language: 'zh',
  author: { _type: 'reference', _ref: QING_HE },
  categories: en.categories.map((r) => ({ ...r, _key: k() })),
  featuredImage: { ...en.featuredImage, alt: '11.11与黑色星期五购物季营销活动在海外城市数字户外大屏上展示' },
  content: body,
  publishedAt: new Date().toISOString(),
  isPublished: en.isPublished,
  status: en.status,
  translations: [{ _key: k(), _type: 'reference', _ref: EN_ID }],
  seo: {
    _type: 'seo',
    metaTitle: '从11.11到黑五：中国品牌海外户外广告投放指南',
    metaDescription: '从11.11到黑色星期五，了解中国品牌与电商平台如何借助海外数字户外广告（DOOH）、程序化投放与品牌提升研究，提升购物季跨境营销效果。',
    noIndex: false,
    enableKeywords: false,
    ogImage: { ...en.seo.ogImage, alt: '11.11与黑色星期五购物季营销活动在海外城市数字户外大屏上展示' },
  },
}
await c.createOrReplace(doc)
console.log('draft written', doc._id, body.length, 'blocks')
