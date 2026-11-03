// Adds Portuguese (pt) to every Sanity text that already has a Spanish version: header mega menu, footer,
// trust bar, client partners heading and homepage testimonials (3 Nov 2026, for the new "pt" site language).
// Writes the published documents directly (sets only the `.pt` keys); the old unpublished megaMenu draft is left alone.
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

// Spanish text -> Portuguese. Matched against the Spanish value so each field gets the right translation.
const PT = {
  'Tecnología de nivel empresarial | Hardware certificado': 'Tecnologia de nível empresarial | Hardware certificado',
  'Moving Walls conecta el ecosistema global de publicidad exterior en una plataforma unificada en la nube. Desde el descubrimiento de audiencias hasta la reserva, activación, medición y optimización, simplificamos la complejidad para que las marcas crezcan con confianza en todos los mercados.':
    'A Moving Walls conecta o ecossistema global de mídia exterior em uma plataforma unificada na nuvem. Da descoberta de audiências à reserva, ativação, mensuração e otimização, simplificamos a complexidade para que as marcas cresçam com confiança em todos os mercados.',
  '© {year} Moving Walls. Todos los derechos reservados.': '© {year} Moving Walls. Todos os direitos reservados.',
  'Política de privacidad': 'Política de Privacidade',
  'Términos del servicio': 'Termos de Serviço',
  'Política de cookies': 'Política de Cookies',
  'Más información': 'Saiba Mais',
  'Corazones conmovidos': 'Corações Tocados',
  'Amplifique causas e inspire la acción a través de DOOH': 'Amplifique causas e inspire ações por meio do DOOH',
  'Quiénes somos': 'Quem Somos',
  'Nuestra historia': 'Nossa História',
  'Empleos': 'Carreiras',
  'Contáctenos': 'Fale Conosco',
  'Empresa': 'Empresa',
  'Para marcas': 'Para Marcas',
  'Para propietarios de medios': 'Para Proprietários de Mídia',
  'Para agencias': 'Para Agências',
  'Para retailers': 'Para Varejistas',
  'Soluciones': 'Soluções',
  'Productos': 'Produtos',
  'Blog': 'Blog',
  'Casos de éxito': 'Cases de Sucesso',
  'E-books': 'E-books',
  'Eventos': 'Eventos',
  'Noticias': 'Notícias',
  'Webinars': 'Webinars',
  'Formatos OOH': 'Formatos OOH',
  'Recursos': 'Recursos',
  'África': 'África',
  'Américas': 'Américas',
  'India': 'Índia',
  'Japón': 'Japão',
  'Malasia': 'Malásia',
  'Singapur': 'Singapura',
  'Principales ubicaciones OOH': 'Principais Localidades OOH',
  'Comenzar': 'Comece Agora',
  'Por industria': 'Por Segmento',
  'Planifique y ejecute campañas DOOH medibles.': 'Planeje e execute campanhas DOOH mensuráveis.',
  'Llegue a sus audiencias a lo largo de sus trayectos en el mundo real.': 'Alcance audiências ao longo de suas jornadas no mundo real.',
  'Monetice y gestione su red de pantallas.': 'Monetize e gerencie sua rede de telas.',
  'Llegue a los compradores donde ocurren las compras.': 'Alcance os consumidores onde as compras acontecem.',
  'Planifique campañas DOOH con inteligencia de audiencias y ubicaciones.': 'Planeje campanhas DOOH com inteligência de audiência e localização.',
  'Mida el rendimiento de sus campañas con atribución en el mundo real.': 'Meça o desempenho das campanhas com atribuição no mundo real.',
  'Active la segmentación basada en audiencias en redes de pantallas.': 'Ative a segmentação por audiência em redes de telas.',
  'Ejecute y optimice campañas en tiempo real.': 'Execute e otimize campanhas em tempo real.',
  'Inteligencia de audiencias y movilidad impulsada por IA.': 'Inteligência de audiência e mobilidade com IA.',
  'Gestión y distribución de creatividades para redes de pantallas.': 'Gestão e distribuição de criativos para redes de telas.',
  'Acceda a inventario DOOH premium en todo el mundo.': 'Acesse inventário DOOH premium no mundo todo.',
  'Descubra nuestra plataforma, misión e impacto global.': 'Conheça nossa plataforma, missão e impacto global.',
  'Cómo Moving Walls pasó de Asia a convertirse en una plataforma global de tecnología de medios.': 'Como a Moving Walls evoluiu da Ásia para uma plataforma global de tecnologia de mídia.',
  'Únase a nosotros': 'Junte-se a Nós',
  'Construya con nosotros el futuro de la tecnología de medios.': 'Construa conosco o futuro da tecnologia de mídia.',
  'Nuestros socios de tecnología y pantallas.': 'Nossos parceiros de tecnologia e telas.',
  'Socios': 'Parceiros',
  'Nuestras oficinas globales': 'Nossos escritórios globais',
  'Ubicaciones': 'Localidades',
  'Nosotros': 'Sobre',
  'Aprenda': 'Aprenda',
  'Perspectivas sobre el futuro de la publicidad exterior.': 'Perspectivas sobre o futuro da mídia Out-of-Home.',
  'Campañas reales y resultados medibles.': 'Campanhas reais e resultados mensuráveis.',
  'Guías estratégicas e informes de investigación.': 'Guias estratégicos e relatórios de pesquisa.',
  'Conozca los formatos de vallas y digitales en todo el mundo.': 'Conheça os formatos de outdoor e digitais no mundo todo.',
  'Eventos y medios': 'Eventos e Mídia',
  'Anuncios de la empresa y reconocimientos de la industria.': 'Anúncios da empresa e reconhecimentos do setor.',
  'Eventos OOH próximos y pasados.': 'Próximos eventos OOH e edições anteriores.',
  'Sesiones de aprendizaje en línea.': 'Sessões de aprendizado online.',
  'Explore nuestra presencia global en medios.': 'Explore nossa presença global em mídia.',
  'Contacto': 'Contato',
  'Esta alianza nos brinda soluciones de medición de audiencias de vanguardia que aportan insights sin precedentes a nuestras campañas publicitarias.':
    'Esta parceria nos oferece soluções de vanguarda em mensuração de audiência, que trazem insights sem precedentes para nossas campanhas publicitárias.',
  'Director de Datos y Transformación Digital': 'Diretor de Dados e Transformação Digital',
  'La inversión de las marcas crece cuando los anunciantes tienen claridad sobre la ubicación y el rendimiento de sus anuncios. Esta alianza fortalece nuestra planificación DOOH y amplía las capacidades de medición para nuestros clientes.':
    'O investimento das marcas cresce quando os anunciantes têm clareza sobre onde seus anúncios aparecem e como performam. Esta parceria fortalece nosso planejamento de DOOH e amplia os recursos de mensuração para nossos clientes.',
  'Director de Inversiones': 'Diretor de Investimentos',
  'Al personalizar la plataforma de Moving Walls, Jeki incorpora nuevos servicios aprovechando su experiencia en publicidad en transporte. Nuestro objetivo es construir uno de los marketplaces más grandes de Japón, con inventario OOH diverso a nivel nacional.':
    'Ao personalizar a plataforma da Moving Walls, a Jeki incorpora novos serviços aproveitando sua experiência em mídia de transporte. Nosso objetivo é construir um dos maiores marketplaces do Japão, com inventário OOH diversificado em todo o país.',
  'Presidente y Director Representante': 'Presidente e Diretor Representante',
  'Sitios OOH': 'Pontos OOH',
  'Mercados': 'Mercados',
  'Clientes': 'Clientes',
}

const TYPES = ['megaMenu', 'footerConfig', 'trustBar', 'clientPartners', 'testimonial']
const docs = await c.fetch('*[!(_id in path("drafts.**")) && _type in $t]', { t: TYPES })

const tx = c.transaction()
let count = 0
const missing = []
const walk = (v, path, sets) => {
  if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${x?._key ? `_key=="${x._key}"` : i}]`, sets))
  else if (v && typeof v === 'object') {
    if (typeof v.es === 'string' && (typeof v.en === 'string' || path.endsWith('Translations'))) {
      if (PT[v.es] === undefined) missing.push(v.es)
      else sets[`${path}.pt`] = PT[v.es]
    }
    for (const [k, x] of Object.entries(v)) if (!k.startsWith('_')) walk(x, path ? `${path}.${k}` : k, sets)
  }
}
for (const d of docs) {
  const sets = {}
  walk(d, '', sets)
  if (Object.keys(sets).length) { tx.patch(d._id, (p) => p.set(sets)); count += Object.keys(sets).length }
}
if (missing.length) { console.error('No Portuguese for:', missing); process.exit(1) }
await tx.commit()
console.log(`Set ${count} Portuguese texts across ${docs.length} documents`)
