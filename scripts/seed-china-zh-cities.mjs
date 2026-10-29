// Creates DRAFT Chinese versions of five China city pages under the Chinese China page:
//   /locations/china-zh/{beijing,shanghai,guangzhou,shenzhen,chengdu}
// Copy is from the Chinese docs (Oct 2026). Each page copies its English page's design: the custom-HTML
// block is cloned and every text node is swapped for the Chinese text, in order. Images, layout and
// popups are unchanged; forms use the Chinese ChinaContact form (zf_lang=zh-cn), as on /locations/china-zh.
// Things the docs didn't include (some banner text, card blurbs, SEO) were written in Chinese for these pages.
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const CHINA_ZH = 'mSyYDtb4LR10cN8Ptt6pOT'
const EN_IDS = {
  beijing: '13b4488b-dcad-451c-9a04-a15b7fc56bde',
  shanghai: '0afcdc52-39df-47b0-935e-901227fd9584',
  guangzhou: '3c82d3f4-08d5-45fd-a6fc-1a1cfbb5cf2f',
  shenzhen: '411690ac-6f1f-4a95-bf90-2fbbfa4b6160',
  chengdu: 'b904808d-6fcc-421c-9e1e-2be1a51792c6',
}
const FORM_EN = 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/ChinaContact/formperma/nvy57hJomHEC_B86q0RdqW2SKg0CbwdeFC5N25Ce5e0'
const FORM = FORM_EN + '?zf_lang=zh-cn'
let n = 0
const k = () => `zh${(n++).toString(36)}${Math.random().toString(36).slice(2, 7)}`

// ---- text swapping ----
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#0?39;|&rsquo;|’/g, "'").replace(/&mdash;/g, '—').replace(/&nbsp;/g, ' ').replace(/&middot;/g, '·').replace(/\s+/g, ' ').trim()
// pairs: [english, chinese] in page order. "P:<prefix>" replaces a whole <p> (keeps inline HTML in the Chinese).
function swap(html, pairs) {
  let pos = 0
  for (const [eng, zh] of pairs) {
    let done = false
    if (eng.startsWith('P:')) {
      const key = eng.slice(2)
      const re = /<p(\s[^>]*)?>([\s\S]*?)<\/p>/g
      re.lastIndex = pos
      for (let m; (m = re.exec(html));) {
        if (decode(m[2].replace(/<[^>]+>/g, '')).startsWith(key)) {
          const rep = `<p${m[1] || ''}>${zh}</p>`
          html = html.slice(0, m.index) + rep + html.slice(m.index + m[0].length)
          pos = m.index + rep.length
          done = true
          break
        }
      }
    } else {
      const re = />([^<]+)</g
      re.lastIndex = pos
      for (let m; (m = re.exec(html));) {
        if (decode(m[1]) === eng) {
          const start = m.index + 1
          html = html.slice(0, start) + zh + html.slice(start + m[1].length)
          pos = start + zh.length
          done = true
          break
        }
      }
    }
    if (!done) throw new Error('Not found: ' + eng.slice(0, 70))
  }
  return html
    .replaceAll(FORM_EN + '"', FORM + '"')
    .replaceAll('aria-label="Contact Moving Walls"', 'aria-label="联系 Moving Walls"')
    .replaceAll('title="Moving Walls China Contact Form"', 'title="Moving Walls 中国联系表单"')
}
// English left in visible text after swapping (for the check at the end)
const leftovers = (html) => {
  const s = html.replace(/<style>[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '')
  return [...s.matchAll(/>([^<]+)</g)].map((m) => decode(m[1])).filter((t) => /[A-Za-z]{3}/.test(t) && !/^(Moving Walls|Calvin Klein|MW Measure|D2C|OOH|DOOH|B2B)\b/.test(t) && !/[一-鿿]/.test(t) && t !== '&times;')
}

// ---- portable text ----
const span = (text, marks = []) => ({ _key: k(), _type: 'span', marks, text })
const rich = (s, style = 'normal') => ({ _key: k(), _type: 'block', style, markDefs: [], children: s.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((p) => (p.startsWith('**') ? span(p.slice(2, -2), ['strong']) : span(p))) })
const faq = (list) => list.map(([question, answer]) => ({ _key: k(), question, answer }))

const CK_STATS = [['Days', '天'], ['Digital Screens', '块数字屏幕'], ['Premium Locations', '个优质点位'], ['Audience Reached', '触达受众'], ['Billable Impressions', '次计费曝光']]
const MEDIA_OVERSEAS = (h) => [
  ['Digital Billboards', '数字户外大屏'], ['P:' + h[0], h[1]],
  ['Airport Networks', '机场媒体网络'], ['P:' + h[2], h[3]],
  ['Transit Advertising', '交通媒体广告'], ['P:' + h[4], h[5]],
  ['Mall & Business District Networks', '商场与商务区媒体网络'], ['P:' + h[6], h[7]],
]

// ---------- Chengdu ----------
const chengdu = {
  slug: 'chengdu', name: '成都',
  h1: '借助数字户外广告，助力成都品牌走向全球',
  intro: '成都品牌正积极拓展国际市场，但寻找合适的海外媒体资源往往是其中最具挑战的环节。Moving Walls 为您连接全球媒体资源方及优质数字户外广告（DOOH）资源，让您通过一个平台完成跨境广告活动的规划、投放执行与效果衡量。',
  button: '预约战略咨询',
  card: '为成都品牌连接全球媒体资源，一个平台完成海外数字户外广告的规划、投放与效果衡量。',
  swap: [
    ['Countries', '个国家'], ['Billboard Inventory', '广告牌媒体资源'], ['Partner Networks', '个合作网络'], ['Daily Impressions', '日均曝光'],
    ['Why Chengdu Brands Are Going Global', '为什么成都品牌积极拓展全球市场'],
    ['P:Chengdu is Western China', '成都是中国西部的重要商业中心，人口约为 2,150 万。当地品牌正将目光投向国内市场以外的增长机会，积极拓展东南亚、中东、非洲、欧洲及美洲等海外市场。'],
    ['P:Entering a new market', '进入新市场意味着需要面对不熟悉的媒体资源方、广告形式及受众行为。中国品牌通常能够自行寻找本地媒体资源，但要在海外市场找到值得信赖的媒体合作伙伴则更加困难。<strong>这正是 Moving Walls 能够提供帮助的地方。</strong>'],
    ['Find Overseas Media Opportunities, Without the Guesswork', '发掘海外媒体机会，让投放规划更有依据'],
    ['Global Media Network', '全球媒体网络'], ['P:Access premium DOOH inventory', '通过覆盖 20 多个国家的媒体资源方网络，获取优质数字户外广告媒体资源。'],
    ['Audience Intelligence', '受众洞察'], ['P:Plan using audience and location insights', '利用受众与地理位置洞察规划广告活动，了解目标消费者的分布及所在位置。'],
    ['One Platform, Many Markets', '一个平台，覆盖多个市场'], ['P:Plan, book, and manage', '通过统一的工作流程，规划、预订并管理多个国家的广告活动。'],
    ['Transparent Measurement', '透明的效果衡量'], ['P:Track delivery and performance', '通过不同市场中统一的报告体系，跟踪广告投放情况并评估活动表现。'],
    ['Where Can We Take Your Brand?', '我们能助力您的品牌拓展哪些市场？'],
    ['Southeast Asia', '东南亚'], ['Singapore', '新加坡'], ['Malaysia', '马来西亚'], ['Thailand', '泰国'], ['Indonesia', '印度尼西亚'], ['the Philippines', '菲律宾'], ['Vietnam', '越南'],
    ['Middle East', '中东'], ['UAE', '阿联酋'], ['Saudi Arabia', '沙特阿拉伯'], ['Qatar', '卡塔尔'],
    ['Africa', '非洲'], ['South Africa', '南非'], ['and wider markets', '及其他非洲市场'],
    ['Europe', '欧洲'], ['UK', '英国'], ['Germany', '德国'], ['and more', '及其他欧洲市场'],
    ['Americas', '美洲'], ['US', '美国'], ['Canada', '加拿大'], ['Mexico', '墨西哥'], ['Brazil', '巴西'], ['LATAM', '拉丁美洲其他市场'],
    ['Asia-Pacific', '亚太地区'], ['Japan', '日本'], ['South Korea', '韩国'], ['Hong Kong', '中国香港'], ['Australia', '澳大利亚'],
    ['Explore All Locations', '探索所有覆盖地区'],
    ['OOH Media Types Available Overseas', '海外可用的媒体类型'],
    ...MEDIA_OVERSEAS(['High-impact screens', '位于城市核心地段、具有高曝光潜力的数字屏幕。', 'Premium placements', '覆盖国际机场航站楼的优质广告点位。', 'Metro, rail', '地铁、铁路及公交媒体网络。', 'High-traffic retail', '人流量较大的零售场所及商业枢纽。']),
    ['The Challenges of Going Global', '品牌拓展全球市场面临的挑战'],
    ['Unfamiliar Media Landscape', '不熟悉的海外媒体环境'], ['P:Hard to know', '难以判断哪些海外媒体资源方值得信赖。'],
    ['Multiple Partners', '合作伙伴众多'], ['P:Different countries mean', '不同国家涉及不同的媒体资源方及工作流程。'],
    ['Campaign Complexity', '广告活动管理复杂'], ['P:Approvals, creatives', '随着覆盖市场增加，审批、广告创意管理及报告整合工作也随之增加。'],
    ['Inconsistent Measurement', '效果衡量标准不统一'], ['P:Performance is hard to compare', '缺乏标准化报告，导致不同市场的广告表现难以直接比较。'],
    ['Book a Strategy Session', '预约战略咨询'],
    ['From Chengdu to the World: How It Works', '从成都走向全球：合作流程'],
    ['Tell Us Your Target Markets', '告诉我们您的目标市场'], ['P:Share where', '告诉我们您计划拓展的市场，以及希望触达的目标受众。'],
    ['We Find the Right Media', '我们为您匹配合适的媒体资源'], ['P:We match you', '我们将从全球媒体网络中为您匹配符合需求的海外媒体资源。'],
    ['Activate Across Markets', '协调多个市场的广告投放'], ['P:Coordinate execution', '协调不同国家及媒体资源方的广告投放执行。'],
    ['Measure and Optimise', '衡量效果并持续优化'], ['P:Use consistent reporting', '利用统一的报告体系评估广告表现，并为后续投放规划提供依据。'],
    ['Proven International Campaign Delivery', '经验证的国际广告投放案例'],
    ['Calvin Klein Vietnam', 'Calvin Klein 越南市场案例'], ...CK_STATS,
    ["Let's Connect", '立即联系我们'],
  ],
  banner: ['准备好让您的品牌走出成都、拓展全球市场了吗？', '无论您计划进入一个新的海外市场，还是在多个地区同步开展广告活动，Moving Walls 都能帮助您更有信心地规划、执行并衡量国际数字户外广告活动。', '预约战略咨询'],
  faqs: [
    ['为什么成都品牌应选择国际数字户外广告？', '数字户外广告有助于品牌在新市场建立知名度，在机场、交通网络及购物中心等优质公共场景中触达目标受众，并通过可衡量的结果支持品牌拓展。它还可以与搜索广告、社交媒体及在线视频广告相结合，将品牌传播延伸至线下实体环境。'],
    ['Moving Walls 可以支持哪些海外市场？', '我们支持在东南亚、中东、非洲、欧洲、美洲及亚太地区开展广告活动。我们的网络覆盖 20 多个国家，拥有超过 85 万个广告牌媒体资源。'],
    ['我不熟悉海外媒体资源方，你们可以提供帮助吗？', '当然可以，这正是我们能够重点提供支持的地方。只需告诉我们您的目标市场及受众，我们就能从全球媒体资源方网络中为您匹配相关媒体资源，让您无需逐一寻找海外媒体合作伙伴。'],
    ['可以同时在多个国家开展广告活动吗？', '可以。您可以通过统一的工作流程规划、执行并管理多个国家的广告活动，而无需在每个市场分别对接不同的媒体资源方。'],
    ['如何衡量广告活动的效果？', '我们结合受众、地理位置及广告投放数据，并采用标准化报告体系，帮助您以统一的标准比较不同市场的广告活动表现。'],
    ['我们可以先从一个市场开始吗？', '可以。许多品牌会先从一个城市或国家开始，根据实际结果逐步拓展至更多市场。'],
    ['海外有哪些可用的广告形式？', '海外可用的广告形式包括数字户外大屏、机场媒体网络、交通媒体广告（地铁、铁路及公交），以及商场与商务区媒体网络。具体资源取决于各市场的实际供应情况。'],
    ['我们该如何开始？', '预约一次战略咨询，向我们介绍您的目标市场、目标受众及预期投放时间，我们的团队将为您推荐相关的海外广告投放机会。'],
  ],
  seo: ['成都品牌出海：国际数字户外广告（DOOH）解决方案 | Moving Walls', '助力成都品牌走向全球。通过一个平台，在 20 多个国家规划、执行并衡量数字户外广告活动，覆盖超过 85 万个广告牌媒体资源。'],
}

// ---------- Shenzhen ----------
const OVERSEAS_CHALLENGE = (city, teamText) => [
  [`P:Booking overseas media is only half the job`, `对于${city}品牌而言，预订海外媒体资源只是第一步。如何向${teamText}证明广告投放的实际效果，才是许多海外广告活动面临的真正挑战。`],
  ['From Delivery to Proof', '从投放执行到效果验证'], ['P:Overseas partners typically', '海外媒体合作伙伴通常会提供广告播放照片、静态广告牌清单及预估曝光量。这些资料能够证明广告曾经投放，却不一定能说明广告是否有效。MW Measure 通过基于真实世界信号的验证触达数据、受众构成及影响力数据，帮助弥合这一差距。'],
  ['One View, No Vendor Guesswork', '统一视图，告别多方数据整合难题'],
]
const WHY_MW = [
  ['Why Moving Walls?', '为什么选择 Moving Walls？'],
  ["P:International expansion shouldn't", '拓展国际市场不应意味着每进入一个新市场，就必须管理一套不同的技术平台、媒体合作伙伴及报告格式。'],
  ['Global Media Network', '全球媒体网络'], ['P:Access relevant overseas', '通过一个一体化平台获取相关海外户外广告与数字户外广告媒体资源，无需在每个市场分别寻找和建立本地媒体合作关系。'],
  ['Audience Intelligence', '受众洞察'], ['P:Plan campaigns using audience', '利用受众与地理位置洞察规划广告活动，帮助品牌在各个海外市场触达合适的消费者。'],
  ['Connected Campaign Execution', '一体化广告投放执行'], ['P:Coordinate campaigns across', '通过统一的工作流程，协调多个国家及不同媒体资源方的广告活动执行。'],
  ['Transparent, Independent Measurement', '透明、独立的效果衡量'], ['P:Measure campaign performance consistently', '通过统一的标准化系统，在不同市场中一致地衡量广告活动表现，而不只是依赖媒体资源方自行报告的数据。'],
]
const VERIFIED = (city, team) => [
  ['Verified Reach & Audience Insight', '经验证的触达数据与受众洞察'], ['P:Instead of estimated', 'MW Measure 不仅关注基于历史数据估算的曝光量，还提供实时触达、频次及受众饱和度分析，并呈现广告活动在各个海外市场实际触达受众的人口统计特征。相关数据通过独立验证，而非仅依赖媒体资源方自行报告的数据。'],
  ['Proving Business Impact', '证明广告的商业影响'], ['P:Go beyond confirming', `通过品牌提升研究，衡量品牌知名度、品牌熟悉度、购买意向及广告回忆度的变化，不再局限于确认广告是否投放。这有助于${city}企业的${team}获得可用于管理层汇报的证据，说明海外广告投入${city === '深圳' ? '实际带来的成效' : '所带来的成效'}。`],
]
const shenzhen = {
  slug: 'shenzhen', name: '深圳',
  h1: '从深圳走向全球：数字户外广告解决方案',
  intro: '深圳汇聚了中国众多积极拓展海外市场的出口企业，涵盖消费电子与科技公司，以及面向国际市场、快速发展的 D2C（直接面向消费者）和生活方式品牌。随着这些品牌不断开拓海外市场，Moving Walls 通过一体化平台，帮助企业在目标市场规划、执行并衡量数字户外广告（DOOH）活动。',
  button: '预约战略咨询',
  card: '助力深圳科技与消费品牌进入海外市场，一个平台完成规划、投放与独立效果衡量。',
  swap: [
    ['Why Shenzhen Brands Look Beyond China for Media', '为什么深圳品牌将广告投放拓展至海外市场'],
    ["P:Shenzhen's own OOH", '深圳本地的户外广告（OOH）与数字户外广告（DOOH）媒体资源由成熟的本地媒体资源方提供支持，因此当地品牌通常可以较为便捷地寻找和预订国内广告点位。'],
    ['P:The harder problem starts', '真正的挑战始于深圳品牌进入海外市场之后。不同海外市场往往涉及不熟悉的媒体资源方、各异的预订流程、不统一的效果衡量标准，以及缺乏能够统一协调所有环节的对接渠道。'],
    ["P:Moving Walls' advantage", '<strong>Moving Walls 的优势不在于深圳本地的媒体资源</strong>，而在于支持品牌拓展海外市场的全球媒体网络，以及能够通过一个平台完成广告规划、投放执行与效果衡量的技术能力。'],
    ['Where Shenzhen Brands Are Expanding', '深圳品牌正在拓展哪些海外市场？'],
    ['Southeast Asia', '东南亚'],
    ['P:A natural first step', '对于许多深圳出口企业而言，东南亚是拓展海外业务的重要起点。<a class="mw-sz-regions__link" href="https://www.movingwalls.com/locations/malaysia">马来西亚</a>、<a class="mw-sz-regions__link" href="https://www.movingwalls.com/locations/singapore">新加坡</a>、越南、<a class="mw-sz-regions__link" href="https://www.movingwalls.com/locations/thailand">泰国</a>和<a class="mw-sz-regions__link" href="https://www.movingwalls.com/locations/philippines">菲律宾</a>等市场的消费市场正在快速发展。'],
    ['Middle East', '中东'], ['P:An increasingly important region', '中东正成为深圳科技、电商及消费电子品牌拓展高端市场与高增长市场的重要区域。'],
    ['Africa', '非洲'], ['P:An emerging growth frontier', '非洲是深圳品牌不断探索的新兴增长市场，尤其适合正在拓展电子产品、移动设备及消费品业务的企业进一步开拓市场份额。'],
    ['Established Markets', '成熟市场'], ['P:Europe and the Americas', '<a class="mw-sz-regions__link" href="https://www.movingwalls.com/locations/europe">欧洲</a>与<a class="mw-sz-regions__link" href="https://www.movingwalls.com/locations/americas">美洲</a>是深圳科技及消费品牌进军成熟国际市场、参与更广泛竞争的重要目标区域。'],
    ['Media Types Available Overseas', '海外可用的媒体类型'],
    ...MEDIA_OVERSEAS(['High-impact digital screens', '通过 Moving Walls 的国际媒体网络，在海外主要城市的核心地段寻找具有高曝光潜力的数字屏幕资源。', 'Premium placements', '在目标市场的国际机场航站楼中寻找优质广告点位。', 'Metro, rail', '覆盖海外主要城市的地铁、铁路及公交媒体网络。', 'High-traffic shopping', '覆盖目标市场中人流量较大的购物中心及商业枢纽。']),
    ['The Challenge of Going Overseas From Shenzhen', '深圳品牌拓展海外市场面临的挑战'],
    ...OVERSEAS_CHALLENGE('深圳', '国内团队及相关利益方'),
    ['P:Running media across', '在多个海外市场开展广告投放，通常意味着需要手动整合各地媒体供应商提供的独立且格式不统一的报告。MW Measure 对不同媒体资源方的投放数据进行去重与整合，并汇总至一份报告，同时关联媒体、受众、品牌及结果信号，减少人工核对不同报告的工作。'],
    ...VERIFIED('深圳', '营销团队'),
    ['Book a Strategy Session', '预约战略咨询'],
    ...WHY_MW,
    ['Proven International Campaign Delivery', '经验证的国际广告投放案例'],
    ['Case Study', '案例研究'], ['Calvin Klein Vietnam', 'Calvin Klein 越南市场案例'],
    ['P:To strengthen brand visibility', '为了提升 Calvin Klein 在越南城市消费者中的品牌曝光度，该品牌在 Moving Walls 的支持下开展了一项为期 27 天的数字户外广告活动。'],
    ['Digital Screens', '块数字屏幕'], ['Premium Locations', '个优质点位'], ['Audience Reached', '触达受众'], ['Billable Impressions', '次计费曝光'],
    ['Read the case study', '阅读案例研究'], ["Let's Connect", '立即联系我们'],
  ],
  banner: ['准备好助力您的深圳品牌拓展海外市场了吗？', '无论您计划进入一个新的海外市场，还是在多个地区同步开展广告活动，Moving Walls 都能通过一个平台，帮助您更有信心地规划、执行并衡量国际数字户外广告活动。', '预约战略咨询'],
  faqs: [
    ['为什么深圳品牌应选择 Moving Walls 开展海外数字户外广告投放？', 'Moving Walls 帮助深圳品牌接入全球媒体网络，无需在每个新市场单独建立本地合作关系，并通过一个一体化平台完成广告规划、投放执行及跨市场独立效果衡量。'],
    ['Moving Walls 可以支持哪些海外市场？', 'Moving Walls 支持东南亚、中东及非洲等快速发展的市场，以及欧洲和美洲等成熟市场，覆盖深圳品牌常见的海外拓展区域。'],
    ['可以同时在多个国家开展广告活动吗？', '可以。Moving Walls 通过统一的工作流程，协调不同市场的媒体资源方、审批、广告创意及效果报告，使深圳品牌能够在多个国家开展和管理广告活动，而无需为每个地区切换不同的平台或合作伙伴。'],
    ['如何衡量海外广告活动的效果？这与依赖当地媒体资源方的报告有何不同？', 'Moving Walls 通过自身的平台衡量广告投放执行情况与活动表现，而不是将各地媒体资源方分别报告的数据手动拼接整合。这使深圳品牌能够以统一、独立的视角查看各个投放市场的广告表现，而不必依赖每家媒体资源方各自的报告格式及可能存在的偏差。'],
    ['我是否需要提前建立目标市场的媒体合作关系？', '不需要。接入 Moving Walls 的全球媒体网络正是深圳品牌拓展海外市场的一项核心优势。您无需事先建立当地合作关系，即可寻找并预订相关的海外户外广告与数字户外广告媒体资源。'],
  ],
  seo: ['深圳品牌出海：海外数字户外广告（DOOH）投放 | Moving Walls', '帮助深圳科技、电商及消费品牌在东南亚、中东、非洲、欧洲及美洲投放数字户外广告，一个平台完成规划、执行与独立效果衡量。'],
}

// ---------- Guangzhou ----------
const guangzhou = {
  slug: 'guangzhou', name: '广州',
  h1: '从广州走向全球：数字户外广告解决方案',
  intro: '广州是中国重要的贸易中心，拥有广交会、密集的制造业产业集群，以及快速发展的跨境电商和 D2C（直接面向消费者）品牌。随着这些品牌不断开拓海外市场，Moving Walls 通过一体化平台，帮助企业在目标消费者所在的市场规划、执行并衡量数字户外广告（DOOH）活动。',
  button: '预约战略咨询',
  card: '助力广州出口企业与跨境电商品牌在海外市场投放数字户外广告，并独立衡量投放效果。',
  swap: [
    ['Why Guangzhou Brands Look Beyond China for Media', '广州品牌为何放眼海外媒介市场'],
    ["P:Guangzhou's own OOH", '广州本地的户外广告（OOH）与数字户外广告（DOOH）媒体资源丰富，体系成熟。当地品牌可以相对便捷地在珠江三角洲地区预订国内广告点位。'],
    ['P:The harder problem starts', '真正的挑战始于广州制造的产品或由广州企业运营的品牌进入海外市场之后。通过广交会或跨境电商平台开发的客户遍布数十个市场，而每个市场都有不同的媒体资源方、各异的预订流程，也缺乏统一的方式来衡量海外广告活动的实际投放效果。'],
    ["P:Moving Walls' advantage", '<strong>Moving Walls 的优势不在于广州本地的媒体资源</strong>，而在于支持品牌拓展海外市场的全球媒体网络，以及能够通过一个平台完成广告规划、投放执行与效果衡量的技术能力。'],
    ['Where Guangzhou Brands Are Expanding', '广州品牌正在拓展哪些海外市场？'],
    ['Southeast Asia', '东南亚'], ['P:The natural next market', '广州出口企业及 D2C 品牌拓展海外业务的重要目标市场。马来西亚、新加坡、越南、泰国和菲律宾等市场的消费需求持续增长。'],
    ['Middle East', '中东'], ['P:A high-growth destination', '广州家居用品、服装及电子产品出口企业拓展高端零售与消费市场的重要目的地，拥有较大的增长潜力。'],
    ['Africa', '非洲'], ['P:An expanding frontier', '广州贸易企业不断拓展的新兴市场。过去长期向非洲批发商供货的企业，如今也开始建立直接面向消费者的品牌业务。'],
    ['Established Markets', '成熟市场'], ['P:Europe and the Americas', '欧洲及美洲市场。广州制造商和跨境电商品牌在这些成熟且注重品牌价值的市场中争取更多市场份额。'],
    ['Expand Your Brand', '拓展您的品牌'],
    ['DOOH Media Types Available Overseas', '海外可用的数字户外广告媒体类型'],
    ...MEDIA_OVERSEAS(['High-impact digital screens', '通过 Moving Walls 的国际媒体网络，在海外主要城市的核心地段寻找具有高曝光潜力的数字屏幕资源。', 'Premium placements', '在目标市场的国际机场航站楼中寻找优质广告点位。', 'Metro, rail', '覆盖海外主要城市的地铁、铁路及公交媒体网络。', 'High-traffic shopping', '覆盖目标市场中人流量较大的购物中心及商业枢纽。']),
    ['The Challenge of Going Overseas From Guangzhou', '广州品牌拓展海外市场面临的挑战'],
    ...OVERSEAS_CHALLENGE('广州', '客户、经销商或国内团队'),
    ['P:Running media across', '在多个海外市场开展广告投放，通常意味着需要手动整合各地媒体供应商提供的独立且格式不统一的报告。MW Measure 将不同媒体资源方的投放数据汇总至一份报告，并整合媒体、受众、品牌及结果信号，减少人工核对不同报告的工作。'],
    ...VERIFIED('广州', '营销与贸易团队'),
    ['Reach Global Audiences', '触达全球受众'],
    ...WHY_MW,
    ['Proven International Campaign Delivery', '经验证的国际广告投放案例'],
    ['Case Study · Calvin Klein, Vietnam', '案例研究 · Calvin Klein 越南市场'],
    ['P:A 27-day cross-border', '为了提升 Calvin Klein 在越南城市消费者中的品牌曝光度，该品牌在 Moving Walls 的支持下开展了一项为期 27 天的跨境数字户外广告活动。'],
    ['Digital Screens', '块数字屏幕'], ['Premium Locations', '个优质点位'], ['Audience Reached', '触达受众'], ['Billable Impressions', '次计费曝光'],
    ['Book a Strategy Session', '预约战略咨询'],
  ],
  banner: ['准备好助力广州品牌拓展海外市场了吗？', '无论您计划进入一个新的海外市场，还是在多个地区同步开展广告活动，Moving Walls 都能通过一个平台，帮助您更有信心地规划、执行并衡量国际数字户外广告活动。', '联系全球业务团队'],
  faqs: [
    ['为什么广州品牌应选择 Moving Walls 开展海外数字户外广告投放？', 'Moving Walls 帮助广州品牌接入全球媒体网络，无需在每个新市场单独建立本地合作关系，并通过一个一体化平台完成广告规划、投放执行及跨市场独立效果衡量。'],
    ['Moving Walls 可以支持哪些海外市场？', 'Moving Walls 的媒体网络覆盖东南亚、中东、非洲、欧洲及美洲。品牌可以通过一个平台管理相关本地媒体资源，而无需分别建立和维护各个市场的合作关系。'],
    ['可以同时在多个国家开展广告活动吗？', '可以。广告活动可在多个海外市场同步进行规划、投放与报告，并将各市场的投放情况整合至统一视图中，无需分别处理每家供应商的报告。'],
    ['如何衡量海外广告活动的效果？这与依赖当地媒体资源方的报告有何不同？', 'MW Measure 提供经过独立验证的触达、频次及受众构成数据，而不是仅依赖预估曝光量或媒体资源方自行提供的广告播放照片。'],
    ['我是否需要提前建立目标市场的媒体合作关系？', '不需要。借助 Moving Walls 的全球媒体网络，广州品牌无需自行寻找和建立当地媒体合作关系，即可探索进入新的海外市场。'],
  ],
  seo: ['广州品牌出海：海外数字户外广告（DOOH）投放 | Moving Walls', '帮助广州出口企业、跨境电商及 D2C 品牌在海外市场投放数字户外广告，通过 MW Measure 获得经独立验证的触达与效果数据。'],
}

// ---------- Beijing ----------
const beijing = {
  slug: 'beijing', name: '北京',
  h1: '北京数字户外广告（DOOH）',
  intro: '通过战略性的户外广告（OOH）与数字户外广告（DOOH）投放，让您的品牌触达北京的消费者、通勤人群、商务人士、购物人群及旅客。\n\nMoving Walls 利用受众、地理位置及出行洞察，帮助品牌方和广告代理机构规划户外广告活动、发掘合适的媒体投放机会，并制定可衡量的跨市场广告策略。',
  button: '规划您的北京广告活动',
  card: '在北京投放户外与数字户外广告，覆盖地铁、机场、商场及核心商圈，触达通勤人群、商务人士与旅客。',
  mediaTypesHeading: '覆盖北京核心户外广告场景',
  mediaTypes: [
    ['交通媒体广告', '交通媒体适合注重高频品牌曝光、通勤人群触达及全城品牌知名度提升的广告活动。'],
    ['机场广告', '机场媒体有助于品牌触达商务旅客、游客、高消费能力人群，以及进出北京的消费者。'],
    ['数字户外大屏', '在具备相应媒体资源的场景中，数字户外广告支持动态创意、灵活排期及结合场景的广告信息传递。'],
    ['商场与零售媒体', '商场及零售媒体适用于新品发布、品牌推广、促销活动，以及希望在消费者临近购买决策时影响其选择的品牌。'],
  ],
  twoColumn: ['触达北京各类受众', [
    '北京是中国的首都，也是中国规模较大、影响力较强的商业中心之一，常住人口超过 **2,180 万**。',
    '北京拥有全球线路总长度最长的地铁网络之一，日均客运量约为 **980 万至 1,030 万人次**，工作日客运量超过 1,100 万人次。与此同时，北京首都国际机场与北京大兴国际机场在 2025 年的旅客吞吐量合计超过 **1.2 亿人次**。',
    '对于广告主而言，这意味着可以在受众的日常出行过程中创造多种触达机会，涵盖通勤、商务出行、购物、娱乐、旅游及大型活动等场景。',
  ], '规划您的北京广告活动'],
  swap: [
    ['Reach Key Commercial Areas Across Beijing', '覆盖北京主要商业区域'],
    ["P:Beijing's major commercial areas", '北京的主要商业区域汇聚了政务、商务、零售、科技及旅游等多元受众。'],
    ['CBD / Guomao', '中央商务区 / 国贸'], ["P:Beijing's central business district", '北京的核心商务与金融中心，汇聚跨国企业总部及高端办公楼。适合希望触达商务人士、企业高管及高端消费人群的品牌。'],
    ['Wangfujing', '王府井'], ["P:One of Beijing's oldest", '北京历史悠久、知名度较高的商业购物街之一，吸引本地居民、游客及购物人群。适合希望打造高曝光消费者营销活动的品牌。'],
    ['Sanlitun', '三里屯'], ['P:A major retail, nightlife', '北京重要的零售、夜生活及国际化生活方式商业区。适合希望触达年轻、城市化及具有国际视野的消费者的广告活动。'],
    ['Zhongguancun', '中关村'], ["P:China's leading technology", '中国领先的科技与创新中心，常被称为“中国硅谷”。适合希望触达科技行业专业人士、初创企业及 B2B 受众的品牌。'],
    ['Wangjing', '望京'], ['P:A fast-growing business district', '一个快速发展的商务区，拥有规模较大的国际及韩国侨民群体。适合希望触达跨境商务受众及国际化人群的品牌。'],
    ['Build Campaigns Around Your Audience', '围绕目标受众规划广告活动'],
    ['P:Not every campaign needs', '不同的广告活动需要不同的媒体点位组合。Moving Walls 将受众洞察与地理位置分析相结合，帮助广告主突破单一广告牌的思维局限，实现更有针对性的广告规划。'],
    ['Brand Awareness', '品牌知名度提升'], ['P:Build visibility across', '在人流量较大的城市环境中建立品牌曝光，并在消费者旅程的不同阶段持续强化品牌认知。'],
    ['Product Launches', '新品发布'], ['P:Create high-impact visibility', '在零售、商业、交通及其他相关场景中打造高影响力的品牌曝光。'],
    ['Business & B2B Campaigns', '商务与 B2B 营销活动'], ['P:Reach professionals', '在商务区、交通枢纽及主要商业区域触达专业人士与决策者。'],
    ['Travel & Tourism', '旅游与出行营销'], ['P:Connect with travellers', '通过机场、交通枢纽、零售目的地及旅游相关场景触达旅客。'],
    ['Cross-Market Campaigns', '跨市场广告活动'], ['P:For brands expanding beyond China', '对于计划拓展中国以外市场的品牌，可将北京纳入更广泛的区域或国际户外广告策略。'],
    ['From Audience Planning to Campaign Measurement', '从受众规划到广告效果衡量'],
    ['Campaign Delivery', '广告投放执行'], ['P:Track campaign delivery', '跟踪广告投放数据，了解计划中的户外广告与数字户外广告活动是否按预期执行。'],
    ['Audience & Location Insights', '受众与地理位置洞察'], ['P:Use audience intelligence', '利用受众洞察及地理位置数据，了解广告活动触达的受众群体及相关投放场景。'],
    ['Performance Evaluation', '效果评估'], ['P:Bring campaign intelligence', '整合广告活动相关数据与洞察，评估活动表现，并为未来的广告活动提供参考。'],
    ['Cross-Channel Measurement', '跨渠道效果衡量'], ['P:Connect campaign delivery', '将广告投放及效果洞察与其他营销渠道的数据相结合，更全面地评估广告活动的整体成效。'],
    ['Why Advertise in Beijing?', '为什么选择在北京投放户外广告？'],
    ['A Large Urban Audience', '庞大的城市受众'], ['P:Beijing is home to', '北京常住人口超过 2,180 万。'],
    ['High Daily Mobility', '高频日常出行'], ["P:The world's longest metro", '北京拥有全球线路总长度最长的地铁网络之一，日均客运量约为 1,000 万人次。'],
    ['A Global Travel Hub', '国际化交通枢纽'], ["P:Beijing's dual airports", '2025 年，北京首都国际机场与北京大兴国际机场的旅客吞吐量合计超过 1.2 亿人次。'],
    ['Major Commercial Centres', '核心商业区域'], ['P:From CBD and Wangfujing', '从中央商务区、王府井到三里屯、中关村，广告主可以根据目标受众及营销目标选择不同的投放场景。'],
    ['The Political and Cultural Capital', '政治与文化中心'], ['P:Home to national institutions', '北京汇聚了国家级机构、各国使领馆，以及重要的文化与媒体组织。'],
    ['Dynamic Digital Opportunities', '多元化的数字户外广告机会'], ["P:Beijing's DOOH ecosystem", '北京的数字户外广告媒体网络覆盖交通及商业等场景，为动态品牌传播提供多种潜在投放机会。'],
  ],
  banner: ['触达北京超过 1.2 亿人次旅客', '通过首都国际机场与大兴国际机场的数字屏幕，触达全球商务高管、高端游客及国内旅客。', '探索北京数字户外广告'],
  faqs: [
    ['为什么选择在北京投放户外广告？', '北京拥有庞大的城市人口、覆盖广泛的地铁网络、主要商业与科技产业区、国际旅客群体，并作为中国的政治与文化中心，为广告主提供多样化的户外广告投放机会。'],
    ['北京有哪些户外广告形式？', '北京的户外广告资源可包括数字户外大屏、地铁及交通媒体广告、机场媒体，以及商场与零售显示屏。具体可用形式取决于投放位置及广告活动需求。'],
    ['我可以在北京开展数字户外广告活动吗？', '可以。广告主可根据媒体资源的可用情况及广告活动需求，在相关交通、零售、商务区及机场场景中规划数字户外广告活动。'],
    ['Moving Walls 可以协助规划北京户外广告活动吗？', '可以。Moving Walls 利用受众、地理位置及出行洞察，帮助品牌方和广告代理机构规划户外广告活动，并协调跨市场的广告投放执行与效果衡量。'],
    ['如何衡量北京户外广告活动的效果？', 'Moving Walls 将受众洞察、地理位置数据及广告投放数据整合至协同工作流程中，帮助广告主跟踪和评估广告活动表现，并结合其他营销渠道进行分析。'],
    ['北京有针对户外广告的相关规定吗？', '北京的户外广告须遵守当地有关广告内容、设置位置及审批许可的规定，具体要求可能因行政区及媒体形式而异。广告主应在广告活动启动前，确认具体投放方案所适用的相关规定。'],
  ],
  seo: ['北京户外广告与数字户外广告（DOOH）投放 | Moving Walls', '在北京投放户外与数字户外广告，覆盖地铁、首都及大兴机场、国贸、王府井、三里屯等核心商圈，并通过受众洞察规划与衡量广告效果。'],
}

// ---------- Shanghai ----------
const shanghai = {
  slug: 'shanghai', name: '上海',
  h1: '上海户外广告与数字户外广告',
  intro: '覆盖亚洲最具活力的城市之一，触达多元受众。\n\n通过战略性的户外广告（OOH）与数字户外广告（DOOH）投放，让您的品牌触达上海的消费者、通勤人群、商务人士、购物人群及旅客。\n\nMoving Walls 利用受众、地理位置及出行洞察，帮助品牌方和广告代理机构规划户外广告活动、发掘合适的媒体投放机会，并制定可衡量的跨市场广告策略。',
  button: '获取上海媒体资源信息',
  card: '在上海投放户外与数字户外广告，覆盖陆家嘴、南京路、虹桥等核心商圈及地铁、机场网络。',
  mediaTypesHeading: '覆盖上海核心户外广告场景',
  mediaTypes: [
    ['交通媒体广告', '通过上海广泛的地铁及交通网络，触达通勤人群与出行旅客。交通媒体适合注重高频品牌曝光、通勤人群触达及全城品牌知名度提升的广告活动。', 'transit'],
    ['机场广告', '通过上海的机场媒体网络，触达国内及国际旅客。机场媒体有助于品牌触达商务旅客、游客、高消费能力人群，以及进出上海的消费者。', 'airport'],
    ['数字户外大屏', '利用大幅面数字显示屏，在城市环境中打造醒目的品牌曝光。在具备相应媒体资源的场景中，数字户外广告支持动态创意、灵活排期及结合场景的广告信息传递。', 'digital'],
    ['商场与零售媒体', '在零售及商业场景中与消费者建立联系。商场及零售媒体适用于新品发布、品牌推广、促销活动，以及希望在消费者临近购买决策时影响其选择的品牌。', 'mall'],
    ['商务区媒体', '在上海的商业中心触达专业人士及高价值受众。商务区媒体尤其适合金融服务、科技、B2B 品牌、高端产品及面向职场专业人士的企业。', 'static'],
  ],
  twoColumn: ['触达上海各类受众', [
    '上海是中国重要的商业中心和国际商务枢纽之一，常住人口超过 **2,480 万**。',
    '上海还拥有全球最繁忙的城市交通网络之一。2024 年，上海轨道交通日均客运量超过 **1,000 万人次**；2025 年，上海两大机场的旅客吞吐量合计超过 **1.35 亿人次**。',
    '对于广告主而言，这意味着可以在受众的日常出行过程中创造多种触达机会，涵盖通勤、商务出行、购物、娱乐、旅游及大型活动等场景。',
  ], '规划您的上海广告活动'],
  districts: ['覆盖上海主要商业区域', '上海的主要商业区域汇聚了购物、商务、旅游及交通等多元受众。', [
    ['陆家嘴', '陆家嘴是上海重要的金融与商业中心，汇聚了知名金融机构、企业办公楼及标志性商业综合体。', '适合希望触达商务人士、金融行业受众、企业高管及高端消费人群的品牌。'],
    ['南京路', '南京路是上海最具代表性的商业与购物区域之一，吸引本地居民、游客及购物人群。', '适合希望开展高曝光消费者营销活动、提升品牌知名度的企业。'],
    ['徐家汇', '徐家汇是上海西南部重要的商业与交通枢纽，集购物、商务、科技及文化活动于一体。', '适合希望触达城市消费者、职场人士及年轻受众的广告活动。'],
    ['虹桥', '虹桥是重要的商务与交通枢纽，通过高铁、机场及区域交通网络连接各类商业活动。', '适合希望提升品牌在商务旅客、通勤人群及区域出行受众中的曝光度的企业。'],
    ['北外滩', '北外滩是上海正在发展的商务与商业区域，与中心城区保持紧密联系。', '为希望触达不断发展的商务、文化及商业受众的品牌提供潜在投放机会。'],
  ]],
  swap: [
    ['Build Campaigns Around Your Audience', '围绕目标受众规划广告活动'],
    ['P:Not every campaign needs', '不同的广告活动需要不同的媒体点位组合。'],
    ['P:Moving Walls helps advertisers think', 'Moving Walls 将受众洞察与地理位置分析相结合，帮助广告主突破单一广告牌的思维局限，实现更有针对性的广告规划。'],
    ['Brand Awareness', '品牌知名度提升'], ['P:Build visibility across', '在高人流量的城市环境中建立品牌曝光，并在消费者旅程的不同阶段持续强化品牌认知。'],
    ['Product Launches', '新品发布'], ['P:Create high-impact visibility', '在零售、商业、交通及其他相关场景中打造高影响力的品牌曝光。'],
    ['Business & B2B Campaigns', '商务与 B2B 营销活动'], ['P:Reach professionals', '在商务区、交通枢纽及主要商业区域触达专业人士与决策者。'],
    ['Travel & Tourism', '旅游与出行营销'], ['P:Connect with travellers', '通过机场、交通枢纽、零售目的地及旅游相关场景触达旅客。'],
    ['Cross-Market Campaigns', '跨市场广告活动'], ['P:For brands expanding beyond China', '对于计划拓展中国以外市场的品牌，可将上海纳入更广泛的区域或国际户外广告策略。'],
    ['From Audience Planning to Campaign Measurement', '从受众规划到广告效果衡量'],
    ['P:OOH becomes more valuable', '当广告主不仅能够选择媒体点位，还能了解广告活动如何规划、执行及衡量时，户外广告的价值将得到进一步提升。'],
    ['P:Moving Walls brings audience intelligence', 'Moving Walls 将受众洞察、地理位置数据、广告活动规划及效果衡量整合至协同工作流程中。'],
    ['Audience Intelligence', '受众洞察'], ['P:Understand where relevant audiences', '了解目标受众的分布与出行特征，识别符合广告活动目标的媒体点位。'],
    ['Campaign Planning', '广告活动规划'], ['P:Evaluate media opportunities', '根据受众特征、地理位置及广告需求，评估合适的媒体投放机会。'],
    ['Campaign Activation', '广告投放执行'], ['P:Coordinate campaign execution', '协调相关户外广告与数字户外广告媒体资源的投放执行。'],
    ['Measurement & Insights', '效果衡量与洞察'], ['P:Use campaign intelligence', '利用广告活动数据与相关洞察，了解广告投放情况并评估活动表现。'],
    ['Discuss Your Campaign Goals', '与我们探讨您的广告目标'],
    ['Why Advertise in Shanghai?', '为什么选择在上海投放户外广告？'],
    ['A Large Urban Audience', '庞大的城市受众'], ['P:Shanghai is home to', '上海常住人口超过 2,480 万，为品牌提供了广泛的潜在受众基础。'],
    ['High Daily Mobility', '高频日常出行'], ["P:The city's extensive metro", '上海完善的地铁网络日均客运量超过 1,000 万人次，为品牌创造了多次触达受众的机会。'],
    ['A Global Travel Hub', '国际化交通枢纽'], ["P:Shanghai's two airports", '2025 年，上海两大机场的旅客吞吐量合计超过 1.35 亿人次，连接国内外旅客。'],
    ['Major Commercial Centres', '核心商业区域'], ['P:From Lujiazui and Nanjing Road', '从陆家嘴、南京路到徐家汇、虹桥，广告主可以根据目标受众及广告活动目标，选择不同的商业与交通场景。'],
    ['A Major Business & Events Market', '重要的商务与会展市场'], ['P:Shanghai hosts major exhibitions', '上海全年举办各类大型展览、行业会议、零售活动及国际商务活动。'],
    ['Dynamic Digital Opportunities', '多元化的数字户外广告机会'], ["P:Shanghai's DOOH ecosystem", '上海的数字户外广告媒体网络覆盖交通及商业等场景，为动态且富有吸引力的品牌传播提供支持。'],
  ],
  banner: ['规划您的上海户外广告活动', '希望在上海触达消费者、通勤人群、专业人士或旅客？\n请告诉我们您的广告目标、目标受众及期望投放时间。我们的团队可以根据您的需求和当前媒体资源情况，协助评估合适的户外广告与数字户外广告投放机会。', '获取上海媒体资源信息'],
  faqs: [
    ['为什么选择在上海投放户外广告？', '上海拥有庞大的城市人口、广泛的公共交通网络、主要商业区、国际旅客群体，以及活跃的商务与会展生态，为广告主提供了多样化的户外广告投放机会。'],
    ['上海有哪些户外广告形式？', '户外广告机会可包括数字户外大屏、交通媒体广告、机场媒体、零售与商场媒体，以及商务区广告点位。具体形式取决于当前媒体资源情况及适用的当地要求。'],
    ['我可以在上海开展数字户外广告活动吗？', '上海的数字媒体生态中存在多种数字户外广告投放机会。具体可用形式、媒体位置及投放要求可能有所不同，建议广告主在规划广告活动前确认当前媒体资源情况。'],
    ['Moving Walls 可以协助规划上海户外广告活动吗？', 'Moving Walls 可提供基于受众洞察的户外广告规划、广告策略及效果衡量支持。具体媒体投放机会取决于广告需求及当前资源的可用情况。'],
    ['如何衡量上海户外广告活动的效果？', '效果衡量方式取决于广告活动目标、可用数据及所选媒体场景。Moving Walls 提供广告规划与效果衡量能力，旨在帮助广告主更清晰地了解广告活动表现。'],
    ['上海有针对户外广告的相关规定吗？', '是的。上海对户外广告设施设有相关管理要求，包括设置规划、安装要求、技术标准及审批流程。因此，在执行广告活动前，应根据适用的当地规定评估相关媒体点位及投放方案。'],
  ],
  seo: ['上海户外广告与数字户外广告（DOOH）投放 | Moving Walls', '在上海投放户外与数字户外广告，覆盖陆家嘴、南京路、徐家汇、虹桥等核心商圈及地铁、机场网络，借助受众洞察规划与衡量广告效果。'],
}

// ---------- build ----------
const out = []
for (const p of [beijing, shanghai, guangzhou, shenzhen, chengdu]) {
  const en = await c.getDocument(EN_IDS[p.slug])
  const sections = []
  for (const s of en.sections) {
    if (s._type === 'customEmbed') {
      const code = swap(s.code, p.swap)
      const left = leftovers(code)
      if (left.length) throw new Error(`${p.slug}: English left: ${JSON.stringify(left.slice(0, 8))}`)
      sections.push({ ...s, _key: k(), code })
    } else if (s._type === 'twoColumn') {
      sections.push({ ...s, _key: k(), heading: p.twoColumn[0], content: p.twoColumn[1].map((t) => rich(t)), ctaText: p.twoColumn[2], ctaLink: FORM })
    } else if (s._type === 'textBlock') {
      const [heading, lead, items] = p.districts
      sections.push({ ...s, _key: k(), heading, content: [rich(lead), ...items.flatMap(([h, a, b]) => [rich(h, 'h3'), rich(a), rich(b)])] })
    } else if (s._type === 'logoCarousel') {
      sections.push({ ...s, _key: k(), heading: '广受全球营销人员信赖' })
    } else if (s._type === 'ctaBanner') {
      sections.push({ ...s, _key: k(), heading: p.banner[0], subheading: p.banner[1], ctaText: p.banner[2], ctaLink: FORM })
    } else {
      throw new Error(`${p.slug}: unexpected section ${s._type}`)
    }
  }
  const doc = {
    _id: `drafts.city-china-zh-${p.slug}`,
    _type: 'locationCity',
    country: { _type: 'reference', _ref: CHINA_ZH },
    city: p.name,
    slug: { _type: 'slug', current: p.slug },
    ...(en.order ? { order: en.order } : {}),
    isActive: true,
    heroTitle: p.h1,
    heroImage: en.heroImage,
    fullDescription: p.intro,
    description: p.card,
    ctaButtonText: p.button,
    showAllLocationsButton: true,
    contactFormUrl: FORM,
    faqsHeading: '常见问题',
    ...(p.mediaTypes ? {
      mediaTypesHeading: p.mediaTypesHeading,
      mediaTypes: p.mediaTypes.map(([name, description, icon], i) => ({ _key: k(), name, description, icon: icon || en.mediaTypes[i].icon })),
    } : {}),
    sectionsPosition: en.sectionsPosition,
    sections,
    faqs: faq(p.faqs),
    seo: { _type: 'seo', metaTitle: p.seo[0], metaDescription: p.seo[1], enableKeywords: false, noIndex: false, ogImage: en.seo?.ogImage || en.heroImage },
  }
  out.push(doc)
}

// Chinese China page: Chinese heading for the new city cards (draft)
const zh = (await c.getDocument('drafts.' + CHINA_ZH)) || (await c.getDocument(CHINA_ZH))
const { _rev, _updatedAt, _createdAt, _system, ...zhRest } = zh
const tx = c.transaction()
for (const d of out) tx.createOrReplace(d)
tx.createOrReplace({ ...zhRest, _id: 'drafts.' + CHINA_ZH, citiesHeading: '按城市探索', citiesSubheading: '探索中国主要城市的户外广告机会' })
await tx.commit()
console.log('Drafts saved:', out.map((d) => '/locations/china-zh/' + d.slug.current).join(', '), '+ china-zh city heading')
