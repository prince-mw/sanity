// Creates a DRAFT Portuguese Americas page at /locations/americas-pt, cloned from the live Spanish page
// (/locations/americas-es, same layout) with every text swapped for Portuguese. Copy is the Portuguese tab of
// "Moving Walls Americas | Landing Page" (Sukriti's doc) with Marco Muñoz's 3 Nov 2026 adjustments, and follows
// the latest live English page (LATAM/Colombia wording, Latest News section, Marco and Carolina profiles).
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const SLUG = 'americas-pt'
const ID = 'location-americas-pt'

if (await c.fetch('count(*[slug.current==$s && !(_id in [$id, "drafts." + $id])])', { s: SLUG, id: ID })) { console.error('Slug already in use:', SLUG); process.exit(1) }

const es = await c.fetch('*[_type=="location" && slug.current=="americas-es" && !(_id in path("drafts.**"))][0]')

// [Spanish text on the live page, Portuguese replacement]
const TEXT = [
  ['Moving Walls Américas', 'Moving Walls Américas'],
  ['Tecnología, Medición y Soluciones de Medios para las Américas', 'Tecnologia, Mensuração e Soluções de Mídia para as Américas'],
  ['Moving Walls Américas ayuda a propietarios de medios, agencias y marcas en LATAM y toda la región de las Américas a aprovechar todo el potencial de la publicidad OOH mediante tecnología, inteligencia de audiencias, medición y soluciones de medios.',
    'A Moving Walls Américas ajuda proprietários de mídia, agências e marcas na LATAM e em toda a região das Américas a explorar todo o potencial da publicidade OOH por meio de tecnologia, inteligência de audiência, mensuração e soluções de mídia.'],
  ['Desde Norteamérica hasta Latinoamérica —incluyendo México, Colombia y Brasil—, trabajamos con socios de todo el ecosistema OOH para mejorar la rendición de cuentas de las campañas, profundizar el conocimiento de las audiencias, abrir nuevas oportunidades de ingresos e impulsar resultados de negocio medibles.',
    'Do Canadá aos Estados Unidos, passando por toda a América Latina, incluindo México, Colômbia e Brasil, trabalhamos com parceiros de todo o ecossistema OOH para aumentar a transparência e a comprovação de resultados das campanhas, aprofundar o conhecimento sobre as audiências, abrir novas oportunidades de receita e gerar resultados de negócios mensuráveis.'],
  ['Como parte de la red global de Moving Walls, el equipo de las Américas combina el conocimiento de los mercados locales con capacidades probadas de tecnología y datos para impulsar el crecimiento continuo del DOOH y el pDOOH en LATAM y toda la región.',
    'Como parte da rede global da Moving Walls, a equipe das Américas combina conhecimento dos mercados locais com recursos comprovados de tecnologia e dados para apoiar o crescimento contínuo do DOOH e do DOOH programático na LATAM e em toda a região.'],
  ['Contáctanos &rarr;', 'Entre em Contato &rarr;'],
  ['Pantallas accesibles en todo el mundo', 'Telas acessíveis em todo o mundo'],
  ['Años de experiencia en tecnología y medición OOH', 'Anos de experiência em tecnologia e mensuração OOH'],
  ['Mercados cubiertos en la Región', 'Mercados atendidos nas Américas'],
  ['Pilares integrados: Software, Science y Media', 'Pilares integrados: Software, Science e Media'],
  ['Impulsando el Futuro del OOH en las Américas', 'Impulsionando o Futuro do OOH nas Américas'],
  ['El OOH está evolucionando rápidamente. A medida que los anunciantes buscan una mayor rendición de cuentas y los propietarios de medios exploran nuevas formas de crecer y monetizar sus inventarios, la tecnología y la medición se han convertido en factores fundamentales para el éxito.',
    'O OOH está evoluindo rapidamente. À medida que os anunciantes buscam maior transparência e comprovação de resultados e os proprietários de mídia procuram novas formas de expandir seus negócios e monetizar seus inventários, a tecnologia e a mensuração tornaram-se essenciais para o sucesso.'],
  ['Con experiencia en entornos de publicidad exterior en vías públicas, comercios minoristas, espacios específicos y transporte público, ayudamos a nuestros socios a responder a las cambiantes demandas del mercado, maximizando el valor de sus activos e inversiones en medios.',
    'Com experiência em ambientes de mídia de rua, varejo, locais de grande circulação e transporte público, ajudamos nossos parceiros a acompanhar as mudanças nas demandas do mercado, maximizando o valor de seus ativos de mídia e investimentos.'],
  ['Nuestras Soluciones', 'Nossas Soluções'],
  ['Soluciones tecnológicas diseñadas para ayudar a los propietarios de medios a gestionar, optimizar y ampliar sus operaciones de OOH. Nuestras capacidades de software facilitan la gestión de inventario, la ejecución de campañas, la automatización de flujos de trabajo y la preparación para la publicidad programática. Esto permite a los operadores modernizar sus negocios, identificar nuevas oportunidades de ingresos y crecer de manera más eficiente en un mercado cada vez más competitivo.',
    'Soluções tecnológicas desenvolvidas para ajudar proprietários de mídia a gerenciar, otimizar e expandir suas operações de OOH. Nossos recursos de software oferecem suporte à gestão de inventário, execução de campanhas, automação de fluxos de trabalho e preparação para a mídia programática. Isso permite que os operadores modernizem seus negócios, identifiquem novas oportunidades de receita e cresçam com mais eficiência em um mercado cada vez mais competitivo.'],
  ['Soluciones de datos y medición que ayudan a anunciantes y propietarios de medios a comprender mejor a sus audiencias y el rendimiento de sus campañas. Nuestras capacidades incluyen medición de audiencias, atribución, estudios de efectividad de campañas, inteligencia de ubicación e investigación de marca, proporcionando una mayor visibilidad sobre cómo las campañas influyen en los resultados de negocio.',
    'Soluções de dados e mensuração que ajudam anunciantes e proprietários de mídia a compreender melhor suas audiências e o desempenho das campanhas. Nossos recursos incluem mensuração de audiência, atribuição, estudos de eficácia de campanhas, inteligência de localização e pesquisas de marca, proporcionando maior visibilidade sobre como as campanhas influenciam os resultados de negócios.'],
  ['Soluciones de medios que conectan a las marcas con sus audiencias a través de inventarios OOH premium en las Américas y otras regiones. Mediante activaciones gestionadas y programáticas, Moving Walls ayuda a los anunciantes a llegar a las audiencias adecuadas, al tiempo que ofrece a los propietarios de medios acceso a nuevas oportunidades de demanda.',
    'Soluções de mídia que conectam marcas às suas audiências por meio de inventários OOH premium nas Américas e em outras regiões. Por meio de ativações gerenciadas e programáticas, a Moving Walls ajuda os anunciantes a alcançar as audiências certas, ao mesmo tempo que oferece aos proprietários de mídia acesso a novas oportunidades de demanda.'],
  ['¿Por Qué Moving Walls?', 'Por que escolher a Moving Walls?'],
  ['Tecnología con una Base Sólida en Medición', 'Tecnologia com Base Sólida em Mensuração'],
  ['Durante más de una década, Moving Walls ha ayudado a organizaciones de todo el ecosistema publicitario a aprovechar los datos, la tecnología y los medios para tomar mejores decisiones y obtener mejores resultados.',
    'Há mais de uma década, a Moving Walls ajuda organizações de todo o ecossistema publicitário a utilizar dados, tecnologia e mídia para tomar decisões melhores e alcançar resultados superiores.'],
  ['Red Global de Pantallas', 'Rede Global de Telas'],
  ['Acceso a más de un millón de pantallas en todo el mundo.', 'Acesso a mais de um milhão de telas em todo o mundo.'],
  ['Medición y Atribución', 'Mensuração e Atribuição'],
  ['Soluciones de medición de audiencias y atribución.', 'Soluções de mensuração de audiência e atribuição.'],
  ['Activación Programática', 'Ativação Programática'],
  ['Capacidades de activación programática de medios.', 'Recursos de ativação programática de mídia.'],
  ['Brand Lift a través de Moving Walls Science', 'Brand Lift por meio da Moving Walls Science'],
  ['Experiencia en brand lift e investigación a través de Moving Walls Science.', 'Experiência em pesquisa e mensuração de brand lift por meio da Moving Walls Science.'],
  ['Integraciones del Ecosistema', 'Integrações do Ecossistema'],
  ['Integraciones de tecnología y datos en todo el ecosistema publicitario.', 'Integrações de tecnologia e dados em todo o ecossistema publicitário.'],
  ['Experiencia Multi-Mercado', 'Experiência Multimercado'],
  ['Experiencia trabajando con operadores, agencias y marcas en múltiples mercados.', 'Experiência no suporte a operadores, agências e marcas em diversos mercados.'],
  ['Al integrar software, ciencia y medios en un único ecosistema, ayudamos a nuestros socios a hacer que la publicidad sea más medible, transparente y efectiva.',
    'Ao integrar software, ciência e mídia em um único ecossistema, ajudamos nossos parceiros a tornar a publicidade mais mensurável, transparente e eficaz.'],
  ['Sectores a los que Apoyamos', 'Setores que Atendemos'],
  ['Propietarios y Operadores de Medios', 'Proprietários de Mídia e Operadores'],
  ['Identifique nuevas oportunidades de ingresos mediante la medición de audiencias, la optimización del inventario y la habilitación programática.',
    'Identifique novas oportunidades de receita por meio da mensuração de audiência, otimização de inventário e habilitação programática.'],
  ['Agencias', 'Agências'],
  ['Planifique, active y evalúe campañas con mayor confianza gracias a la inteligencia de audiencias y a información medible sobre el rendimiento.',
    'Planeje, ative e avalie campanhas com maior confiança por meio de inteligência de audiência e insights mensuráveis de desempenho.'],
  ['Llegue a sus audiencias de manera más efectiva mediante estrategias de medios basadas en datos y soluciones de medición de campañas diseñadas para generar impacto en el negocio.',
    'Alcance audiências com mais eficiência por meio de estratégias de mídia orientadas por dados e soluções de mensuração de campanhas desenvolvidas para gerar impacto nos negócios.'],
  ['Conectando las Américas', 'Conectando as Américas'],
  ['Moving Walls Américas trabaja con socios en Canadá, Estados Unidos, México, Colombia, América Central, el Caribe, Brasil y el resto de América del Sur, impulsando la publicidad OOH en toda la región de LATAM.',
    'A Moving Walls Américas apoia parceiros no Canadá, nos Estados Unidos, no México, na Colômbia, na América Central, no Caribe, no Brasil e no restante da América do Sul, impulsionando a publicidade OOH em toda a região da LATAM.'],
  ['Pase el cursor o toque un mercado para explorar nuestra presencia.', 'Passe o cursor ou toque em um mercado para explorar nossa presença.'],
  ['Nuestra presencia regional nos permite combinar el conocimiento de los mercados locales con nuestra experiencia global en tecnología, medición y medios, ayudando a nuestros socios a expandirse de manera efectiva en mercados y audiencias diversos.',
    'Nossa presença regional nos permite combinar o conhecimento dos mercados locais com a experiência global em tecnologia, mensuração e mídia, ajudando nossos parceiros a expandir suas operações de forma eficaz em mercados e audiências diversos.'],
  ['El Caribe', 'Caribe'],
  ['América del Sur', 'América do Sul'],
  ['Liderazgo', 'Liderança'],
  ['Líder Regional de Negocios, América Latina', 'Líder Regional de Negócios, América Latina'],
  ['Mauricio trabaja con propietarios de medios, anunciantes y actores clave de la industria en toda América Latina para impulsar la adopción de soluciones OOH basadas en audiencias. Su experiencia abarca el desarrollo de mercados, las alianzas estratégicas y el apoyo a organizaciones para que generen mayor valor mediante la tecnología y la toma de decisiones basada en datos.',
    'Mauricio trabalha com proprietários de mídia, anunciantes e stakeholders do setor em toda a América Latina para promover a adoção de soluções OOH orientadas por audiência. Sua experiência abrange desenvolvimento de mercado, parcerias estratégicas e apoio a organizações na geração de maior valor por meio de tecnologia e tomada de decisões orientada por dados.'],
  ['Director Científico de Datos', 'Cientista-Chefe de Dados'],
  ['Pramod colabora con clientes y actores clave de la industria en toda la región para impulsar el crecimiento del negocio, fortalecer las relaciones en el mercado y apoyar la implementación de soluciones de tecnología, medición y medios que generen resultados medibles.',
    'Pramod trabalha com clientes e stakeholders do setor em toda a região para impulsionar o crescimento dos negócios, fortalecer relacionamentos no mercado e apoiar a implementação de soluções de tecnologia, mensuração e mídia que gerem resultados mensuráveis.'],
  ['Director de Publishers Américas', 'Diretor de Publishers, Américas'],
  ['Con más de 25 años en la industria de OOH y DOOH en América Latina, lidera el desarrollo comercial, de marketing, operaciones y negocios para grandes actores del sector. Tras ocupar cargos directivos en Adsmovil OOH, Posterscope, Telefónica On The Spot, Terra Networks y Clear Channel, su trayectoria se enfoca en impulsar la expansión de la publicidad exterior digital, transformar el mercado regional y dirigir equipos multidisciplinarios en la ejecución de estrategias publicitarias basadas en datos y tecnología.',
    'Com mais de 25 anos na indústria de OOH e DOOH na América Latina, Marco lidera o desenvolvimento comercial, de marketing, de operações e de negócios de grandes players do setor. Depois de ocupar cargos de direção na Adsmovil OOH, Posterscope, Telefônica On The Spot, Terra Networks e Clear Channel, sua trajetória tem como foco impulsionar a expansão da mídia exterior digital, transformar o mercado regional e liderar equipes multidisciplinares na execução de estratégias publicitárias baseadas em dados e tecnologia.'],
  ['Gerente de Estrategia y Operaciones de Negocio', 'Gerente de Estratégia e Operações de Negócios'],
  ['Carolina lidera la conexión entre ecosistemas tecnológicos globales y Latinoamérica, impulsando la expansión regional de empresas e inversionistas. Con más de 9 años en el sector tech y un MBA de la Asia School of Business, se especializa en desarrollo de mercados, alianzas estratégicas e innovación con visión internacional.',
    'Carolina lidera a conexão entre os ecossistemas globais de tecnologia e a América Latina, impulsionando a expansão regional de empresas e investidores. Com mais de 9 anos no setor de tecnologia e um MBA pela Asia School of Business, é especializada em desenvolvimento de mercados, parcerias estratégicas e inovação com visão internacional.'],
  ['Alianzas y Ecosistema', 'Parcerias e Ecossistema'],
  ['A través de alianzas estratégicas e integraciones, ayudamos a nuestros clientes a acceder a las herramientas, los datos y la experiencia necesarios para desenvolverse en un entorno de medios cada vez más complejo y obtener resultados medibles.',
    'Por meio de parcerias estratégicas e integrações, ajudamos nossos clientes a acessar as ferramentas, os dados e a experiência necessários para navegar em um cenário de mídia cada vez mais complexo e alcançar resultados mensuráveis.'],
  ['Últimas Noticias', 'Últimas Notícias'],
  ['Noticias de Moving Walls en las Américas', 'Notícias da Moving Walls nas Américas'],
  ['Últimos avances de nuestra presencia creciente en LATAM y toda la región de las Américas.', 'Marcos recentes da nossa presença crescente na LATAM e em toda a região das Américas.'],
  ['Fortalecemos Nuestro Liderazgo en las Américas', 'Fortalecendo Nossa Liderança nas Américas'],
  ['Moving Walls amplía su equipo de liderazgo regional para acelerar el crecimiento en LATAM y las Américas.', 'A Moving Walls amplia sua equipe de liderança regional para acelerar o crescimento na LATAM e nas Américas.'],
  ['Mauricio Sabogal se Une como Chief Strategy Officer', 'Mauricio Sabogal Assume como Chief Strategy Officer'],
  ['Liderando la expansión global de Moving Walls, con foco en el crecimiento en Norteamérica y Latinoamérica.', 'Liderando a expansão global da Moving Walls, com foco no crescimento na América do Norte e na América Latina.'],
  ['Moving Walls Adquiere Insightz Club', 'A Moving Walls Adquire a Insightz Club'],
  ['Un nuevo paso para liderar la transformación impulsada por IA en la industria Out of Home, a nivel global y en las Américas.', 'Um novo passo para liderar a transformação da indústria Out of Home impulsionada por IA, em todo o mundo e nas Américas.'],
  ['¿Listo para Crecer en las Américas?', 'Pronto para Expandir seus Negócios nas Américas?'],
  ['Ya sea que sea un propietario de medios que busca modernizar sus operaciones, una agencia que necesita mayor transparencia y rendición de cuentas, o una marca que desea conectar con sus audiencias de manera más efectiva, Moving Walls Américas está aquí para ayudarle.',
    'Seja você um proprietário de mídia que deseja modernizar suas operações, uma agência que busca maior transparência e comprovação de resultados ou uma marca que deseja se conectar com suas audiências de forma mais eficaz, a Moving Walls Américas está pronta para ajudar.'],
  ['Póngase en contacto con nuestro equipo para descubrir cómo la tecnología, la medición y los medios pueden ayudarle a alcanzar sus objetivos de negocio.',
    'Entre em contato com nossa equipe para descubrir como tecnologia, mensuração e mídia podem ajudar você a alcançar seus objetivos de negócios.'],
]

const FORM_ES = 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/AmericasContact/formperma/6sAxfNT-LNESiBZWBHciVSPFVMzZ8QyGARPVJnz6PBU?zf_lang=es'
// Portuguese translation added to the Zoho form by Dg on 3 Nov 2026.
const FORM_PT = FORM_ES.replace('zf_lang=es', 'zf_lang=pt')

let html = es.sections[0].code
const swap = (from, to) => {
  if (!html.includes(from)) throw new Error('Not found on the Spanish page: ' + from.slice(0, 80))
  html = html.split(from).join(to)
}
for (const [from, to] of TEXT) {
  if (from === to) continue
  // as element text, and as alt / aria-label values (map hotspots, images)
  const asText = `>${from}<`, asAttr = `"${from}"`
  if (!html.includes(asText) && !html.includes(asAttr)) throw new Error('Not found on the Spanish page: ' + from.slice(0, 80))
  html = html.split(asText).join(`>${to}<`).split(asAttr).join(`"${to}"`)
}
swap('alt="Carolina"', 'alt="Carolina Trujillo"')
swap('<span class="mw-team-name">Carolina</span>', '<span class="mw-team-name">Carolina Trujillo</span>')
swap(FORM_ES, FORM_PT)
swap("aria-label='Contacto Américas'", "aria-label='Contato Américas'")

await c.createOrReplace({
  _id: `drafts.${ID}`,
  _type: 'location',
  country: 'Americas (Português)',
  slug: { _type: 'slug', current: SLUG },
  isActive: true,
  hideDefaultHero: true,
  heroImage: es.heroImage,
  contactFormUrl: FORM_PT,
  description: 'Escale a publicidade OOH no Canadá, nos Estados Unidos, no México, na Colômbia, no Brasil e em toda a região da LATAM com mensuração de audiência, DOOH programático, atribuição e soluções de tecnologia de mídia.',
  sections: [{ ...es.sections[0], _key: 'ptembed01', code: html }],
  seo: {
    _type: 'seo',
    metaTitle: 'Publicidade OOH e DOOH Programático na LATAM e nas Américas',
    metaDescription: 'Transforme a publicidade OOH na LATAM e nas Américas, incluindo Brasil, México, Colômbia e Estados Unidos, com mensuração de audiência, DOOH programático e soluções de tecnologia de mídia.',
    enableKeywords: false,
    noIndex: false,
    ogImage: es.seo?.ogImage,
  },
})
console.log('Draft created: drafts.' + ID, '-> /locations/' + SLUG)
