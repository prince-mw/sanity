'use client'

import Link from 'next/link'
import { useFormPopup } from './FormPopupProvider'

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  /** If true, always navigate (never open popup) */
  forceNavigate?: boolean
  [key: string]: unknown
}

/**
 * Drop-in replacement for Link/anchor on CTA buttons.
 * If a popup form is available for the current page, clicking opens the form popup.
 * Otherwise falls through to normal navigation.
 */
export function CTAButton({ href, children, className, forceNavigate, ...rest }: CTAButtonProps) {
  const { hasForm, openFormPopup } = useFormPopup()

  if (hasForm && !forceNavigate) {
    return (
      <button
        type="button"
        onClick={openFormPopup}
        className={className}
        {...rest}
      >
        {children}
      </button>
    )
  }

  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  )
}
