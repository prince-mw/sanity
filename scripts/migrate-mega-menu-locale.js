/**
 * Migrate Mega Menu to locale-aware fields
 *
 * The `megaMenu` document's `title`/`heading`/`description` fields and
 * `ctaButton.text` were plain strings; the Studio schema now expects
 * `localeString` objects ({ en, ja, ko, id, zh }). This script converts the
 * live document's existing English strings into that shape and fills in
 * ja/ko/id/zh translations, preserving every other field untouched via
 * `.patch().set(...)` (not a destructive replace).
 *
 * Usage:
 *   node scripts/migrate-mega-menu-locale.js            # dry run, prints the planned change
 *   node scripts/migrate-mega-menu-locale.js --apply     # writes the change to Sanity
 *
 * Requires SANITY_API_TOKEN (a write-capable token) in the environment.
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

const APPLY_FLAG = process.argv.includes('--apply');

if (APPLY_FLAG && !process.env.SANITY_API_TOKEN) {
  console.error('SANITY_API_TOKEN is not set. Export a write-capable Sanity API token and retry with --apply.');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// menuItem.title
const ITEM_TITLES = {
  Solutions: { ja: 'ソリューション', ko: '솔루션', id: 'Solusi', zh: '解决方案' },
  Products: { ja: '製品', ko: '제품', id: 'Produk', zh: '产品' },
  About: { ja: '会社概要', ko: '회사 소개', id: 'Tentang Kami', zh: '关于我们' },
  Resources: { ja: 'リソース', ko: '리소스', id: 'Sumber Daya', zh: '资源' },
  Contact: { ja: 'お問い合わせ', ko: '문의하기', id: 'Hubungi Kami', zh: '联系我们' },
};

// menuColumn.heading
const COLUMN_HEADINGS = {
  'By Industry': { ja: '業界別', ko: '업종별', id: 'Berdasarkan Industri', zh: '按行业' },
  Company: { ja: '会社情報', ko: '회사', id: 'Perusahaan', zh: '公司' },
  'Join Us': { ja: '採用情報', ko: '채용', id: 'Bergabung', zh: '加入我们' },
  Learn: { ja: '学ぶ', ko: '학습', id: 'Pelajari', zh: '学习' },
  'Events & Media': { ja: 'イベント＆メディア', ko: '이벤트 및 미디어', id: 'Acara & Media', zh: '活动与媒体' },
};

// ctaButton.text
const CTA_TEXT = {
  'Get Started': { ja: '始める', ko: '시작하기', id: 'Mulai', zh: '开始使用' },
};

// menuLink.title -> { title translations, description translations (keyed by the link's English description) }
const LINKS = {
  'For Agencies': {
    title: { ja: '代理店向け', ko: '에이전시', id: 'Untuk Agensi', zh: '代理商专区' },
    description: {
      en: 'Plan and execute measurable DOOH campaigns.',
      ja: '測定可能なDOOHキャンペーンを計画・実行。',
      ko: '측정 가능한 DOOH 캠페인을 계획하고 실행하세요.',
      id: 'Rencanakan dan jalankan kampanye DOOH yang terukur.',
      zh: '规划并执行可衡量的DOOH广告活动。',
    },
  },
  'For Brands': {
    title: { ja: 'ブランド向け', ko: '브랜드', id: 'Untuk Brand', zh: '品牌专区' },
    description: {
      en: 'Reach audiences across real-world journeys.',
      ja: '現実世界のジャーニー全体でオーディエンスにリーチ。',
      ko: '실제 고객 여정 전반에서 오디언스에게 도달하세요.',
      id: 'Jangkau audiens di seluruh perjalanan dunia nyata.',
      zh: '在真实世界的旅程中触达受众。',
    },
  },
  'For Media Owners': {
    title: { ja: 'メディアオーナー向け', ko: '미디어 오너', id: 'Untuk Pemilik Media', zh: '媒体业主专区' },
    description: {
      en: 'Monetise and manage your screen network.',
      ja: 'スクリーンネットワークを収益化・管理。',
      ko: '스크린 네트워크를 수익화하고 관리하세요.',
      id: 'Monetisasi dan kelola jaringan layar Anda.',
      zh: '实现屏幕网络的商业化与管理。',
    },
  },
  'MW Planner': {
    title: {}, // brand name kept in English across all locales
    description: {
      en: 'Plan DOOH campaigns using audience and location intelligence.',
      ja: 'オーディエンスと位置情報インテリジェンスを活用してDOOHキャンペーンを計画。',
      ko: '오디언스 및 위치 인텔리전스를 활용해 DOOH 캠페인을 계획하세요.',
      id: 'Rencanakan kampanye DOOH menggunakan intelijen audiens dan lokasi.',
      zh: '利用受众与位置智能规划DOOH广告活动。',
    },
  },
  'MW Measure': {
    title: {},
    description: {
      en: 'Measure campaign performance with real-world attribution.',
      ja: 'リアルワールドアトリビューションでキャンペーンパフォーマンスを計測。',
      ko: '실제 어트리뷰션으로 캠페인 성과를 측정하세요.',
      id: 'Ukur performa kampanye dengan atribusi dunia nyata.',
      zh: '通过真实世界归因衡量广告活动效果。',
    },
  },
  'MW Influence': {
    title: {},
    description: {
      en: 'Activate audience-led targeting across screen networks.',
      ja: 'スクリーンネットワーク全体でオーディエンス主導のターゲティングを実行。',
      ko: '스크린 네트워크 전반에서 오디언스 기반 타겟팅을 실행하세요.',
      id: 'Aktifkan penargetan berbasis audiens di seluruh jaringan layar.',
      zh: '在屏幕网络中激活以受众为导向的定向投放。',
    },
  },
  'MW Activate': {
    title: {},
    description: {
      en: 'Execute and optimise campaigns in real time.',
      ja: 'リアルタイムでキャンペーンを実行・最適化。',
      ko: '캠페인을 실시간으로 실행하고 최적화하세요.',
      id: 'Jalankan dan optimalkan kampanye secara real-time.',
      zh: '实时执行并优化广告活动。',
    },
  },
  'MW Science': {
    title: {},
    description: {
      en: 'AI-powered audience and mobility intelligence.',
      ja: 'AI駆動のオーディエンス＆モビリティインテリジェンス。',
      ko: 'AI 기반 오디언스 및 이동성 인텔리전스.',
      id: 'Intelijen audiens dan mobilitas bertenaga AI.',
      zh: 'AI驱动的受众与移动性智能。',
    },
  },
  'MW Studio': {
    title: {},
    description: {
      en: 'Creative management and distribution for screen networks.',
      ja: 'スクリーンネットワーク向けクリエイティブ管理と配信。',
      ko: '스크린 네트워크를 위한 크리에이티브 관리 및 배포.',
      id: 'Manajemen dan distribusi kreatif untuk jaringan layar.',
      zh: '面向屏幕网络的创意管理与分发。',
    },
  },
  'MW Market': {
    title: {},
    description: {
      en: 'Access premium DOOH inventory globally.',
      ja: 'プレミアムなDOOH在庫にグローバルにアクセス。',
      ko: '전 세계 프리미엄 DOOH 인벤토리에 액세스하세요.',
      id: 'Akses inventaris DOOH premium secara global.',
      zh: '全球获取优质DOOH广告资源。',
    },
  },
  'About Us': {
    title: { ja: '会社概要', ko: '회사 소개', id: 'Tentang Kami', zh: '关于我们' },
    description: {
      en: 'Discover our platform, mission and global impact.',
      ja: '私たちのプラットフォーム、ミッション、グローバルな影響力をご紹介。',
      ko: '우리의 플랫폼, 미션, 글로벌 영향력을 알아보세요.',
      id: 'Temukan platform, misi, dan dampak global kami.',
      zh: '了解我们的平台、使命与全球影响力。',
    },
  },
  'Our Story': {
    title: { ja: '私たちのストーリー', ko: '우리의 이야기', id: 'Kisah Kami', zh: '我们的故事' },
    description: {
      en: 'How Moving Walls evolved from Asia to a global media technology platform.',
      ja: 'Moving Wallsがアジアからグローバルなメディアテクノロジープラットフォームへと進化した軌跡。',
      ko: 'Moving Walls가 아시아에서 글로벌 미디어 기술 플랫폼으로 성장한 과정.',
      id: 'Bagaimana Moving Walls berkembang dari Asia menjadi platform teknologi media global.',
      zh: 'Moving Walls如何从亚洲发展成为全球媒体科技平台。',
    },
  },
  Careers: {
    title: { ja: '採用情報', ko: '채용정보', id: 'Karier', zh: '招聘信息' },
    description: {
      en: 'Build the future of media technology with us.',
      ja: '私たちと共にメディアテクノロジーの未来を築きましょう。',
      ko: '우리와 함께 미디어 기술의 미래를 만들어가세요.',
      id: 'Bangun masa depan teknologi media bersama kami.',
      zh: '与我们一起构建媒体科技的未来。',
    },
  },
  Locations: {
    title: { ja: '拠点', ko: '위치', id: 'Lokasi', zh: '办公地点' },
    description: {
      en: 'Our global offices',
      ja: '世界各地のオフィス。',
      ko: '전 세계 사무소.',
      id: 'Kantor global kami.',
      zh: '我们的全球办公室。',
    },
  },
  Blog: {
    title: { ja: 'ブログ', ko: '블로그', id: 'Blog', zh: '博客' },
    description: {
      en: 'Perspectives on the future of Out-of-Home media.',
      ja: 'アウトオブホームメディアの未来に関する視点。',
      ko: '아웃오브홈 미디어의 미래에 대한 인사이트.',
      id: 'Wawasan tentang masa depan media luar ruang.',
      zh: '关于户外媒体未来的观点。',
    },
  },
  'Case Studies': {
    title: { ja: '導入事例', ko: '고객 사례', id: 'Studi Kasus', zh: '案例研究' },
    description: {
      en: 'Real campaigns and measurable results.',
      ja: '実際のキャンペーンと測定可能な成果。',
      ko: '실제 캠페인과 측정 가능한 성과.',
      id: 'Kampanye nyata dan hasil yang terukur.',
      zh: '真实广告活动与可衡量的成果。',
    },
  },
  'E-Books': {
    title: { ja: '電子書籍', ko: '전자책', id: 'E-Book', zh: '电子书' },
    description: {
      en: 'Strategic guides and research reports.',
      ja: '戦略的ガイドと調査レポート。',
      ko: '전략 가이드 및 리서치 리포트.',
      id: 'Panduan strategis dan laporan riset.',
      zh: '战略指南与研究报告。',
    },
  },
  'OOH Formats': {
    title: { ja: 'OOH広告フォーマット', ko: 'OOH 광고 포맷', id: 'Format OOH', zh: '户外广告格式' },
    description: {
      en: 'Understand billboard and digital formats worldwide.',
      ja: '世界中の看板とデジタルフォーマットを理解する。',
      ko: '전 세계 빌보드 및 디지털 포맷을 이해하세요.',
      id: 'Pahami format billboard dan digital di seluruh dunia.',
      zh: '了解全球广告牌与数字广告格式。',
    },
  },
  News: {
    title: { ja: 'ニュース', ko: '뉴스', id: 'Berita', zh: '新闻' },
    description: {
      en: 'Company announcements and industry recognition.',
      ja: '会社の発表と業界での評価。',
      ko: '회사 소식 및 업계 인정 소식.',
      id: 'Pengumuman perusahaan dan pengakuan industri.',
      zh: '公司公告与行业认可。',
    },
  },
  Events: {
    title: { ja: 'イベント', ko: '이벤트', id: 'Acara', zh: '活动' },
    description: {
      en: 'Upcoming and past OOH events.',
      ja: '過去および今後のOOHイベント。',
      ko: '지난 및 예정된 OOH 이벤트.',
      id: 'Acara OOH mendatang dan yang telah berlalu.',
      zh: '过去与即将举行的户外广告活动。',
    },
  },
  Webinars: {
    title: { ja: 'ウェビナー', ko: '웨비나', id: 'Webinar', zh: '网络研讨会' },
    description: {
      en: 'Online learning sessions.',
      ja: 'オンライン学習セッション。',
      ko: '온라인 학습 세션.',
      id: 'Sesi pembelajaran online.',
      zh: '在线学习课程。',
    },
  },
};

function toLocaleString(enValue, translations) {
  if (enValue == null) return undefined;
  return { en: enValue, ...translations };
}

function migrateLink(link) {
  const entry = LINKS[link.title];
  if (!entry) {
    console.warn(`  ! No translation entry for link title "${link.title}" — keeping English only`);
  }
  return {
    ...link,
    title: toLocaleString(link.title, entry?.title || {}),
    description: link.description !== undefined
      ? toLocaleString(link.description, entry?.description ? { ja: entry.description.ja, ko: entry.description.ko, id: entry.description.id, zh: entry.description.zh } : {})
      : undefined,
  };
}

function migrateColumn(column) {
  const headingEntry = column.heading !== undefined ? COLUMN_HEADINGS[column.heading] : undefined;
  if (column.heading !== undefined && !headingEntry) {
    console.warn(`  ! No translation entry for column heading "${column.heading}" — keeping English only`);
  }
  return {
    ...column,
    heading: column.heading !== undefined ? toLocaleString(column.heading, headingEntry || {}) : undefined,
    links: column.links.map(migrateLink),
  };
}

function migrateItem(item) {
  const entry = ITEM_TITLES[item.title];
  if (!entry) {
    console.warn(`  ! No translation entry for item title "${item.title}" — keeping English only`);
  }
  return {
    ...item,
    title: toLocaleString(item.title, entry || {}),
    columns: item.columns ? item.columns.map(migrateColumn) : undefined,
  };
}

async function main() {
  console.log(`Fetching current megaMenu document (${APPLY_FLAG ? 'APPLY' : 'DRY RUN'})...`);
  const doc = await client.fetch('*[_type == "megaMenu" && _id == "megaMenu"][0]');
  if (!doc) {
    console.error('No megaMenu document found.');
    process.exit(1);
  }

  if (APPLY_FLAG) {
    const backupPath = path.join(__dirname, `megaMenu-backup-${Date.now()}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(doc, null, 2), 'utf8');
    console.log(`Backed up current document to ${backupPath}`);
  }

  const newMainNavItems = doc.mainNavItems.map(migrateItem);
  const newCtaButton = doc.ctaButton
    ? { ...doc.ctaButton, text: toLocaleString(doc.ctaButton.text, CTA_TEXT[doc.ctaButton.text] || {}) }
    : doc.ctaButton;

  console.log('\nPlanned mainNavItems:');
  console.log(JSON.stringify(newMainNavItems, null, 2));
  console.log('\nPlanned ctaButton:');
  console.log(JSON.stringify(newCtaButton, null, 2));

  if (!APPLY_FLAG) {
    console.log('\nDry run only — re-run with --apply to write this to Sanity.');
    return;
  }

  await client
    .patch('megaMenu')
    .set({ mainNavItems: newMainNavItems, ctaButton: newCtaButton })
    .commit();

  console.log('\nDone — megaMenu document updated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
