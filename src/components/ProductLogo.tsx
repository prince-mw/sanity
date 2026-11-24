import Image from 'next/image'

// Official MW product logos (Nov 2026 set from Navneeth/Kritika). Every file shares one
// 885×190 canvas with identical icon/text placement, so logos line up when stacked.
//   white — colour icon + white text, for the dark product-page heroes
//   navy  — colour icon + navy text, for white/light sections
// MW Inventory uses the MW Studio logo.

export type ProductLogoName = 'activate' | 'science' | 'planner' | 'measure' | 'studio' | 'influence' | 'market'

const NAMES: Record<ProductLogoName, string> = {
  activate: 'MW Activate',
  science: 'MW Science',
  planner: 'MW Planner',
  measure: 'MW Measure',
  studio: 'MW Studio',
  influence: 'MW Influence',
  market: 'MW Market',
}

export function ProductLogo({
  product,
  tone = 'white',
  alt,
  priority = false,
  className = 'h-9 sm:h-10 w-auto',
}: {
  product: ProductLogoName
  tone?: 'white' | 'navy'
  alt?: string
  priority?: boolean
  className?: string
}) {
  return (
    <Image
      src={`/assets/logo/products/mw-${product}-${tone}.png`}
      alt={alt || NAMES[product]}
      width={885}
      height={190}
      priority={priority}
      className={className}
    />
  )
}
