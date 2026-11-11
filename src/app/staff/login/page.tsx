import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { readStaff } from '@/lib/staff/auth'
import { StaffLoginForm } from './StaffLoginForm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Staff sign-in | Moving Walls', robots: { index: false, follow: false } }

export default async function StaffLoginPage({ searchParams }: { searchParams: Promise<{ back?: string; expired?: string }> }) {
  const { back, expired } = await searchParams
  if (await readStaff()) redirect(back && back.startsWith('/') ? back : '/staff/proposals')
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-[#2563eb] text-white mw-hero-top pb-10">
        <div className="mw-container">
          <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">Moving Walls team</span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Sign in</h1>
          <p className="mt-3 max-w-[60ch] text-blue-100/90">Enter your company email and we send you a link. No password.</p>
        </div>
      </section>
      <section className="bg-gray-50 mw-section">
        <div className="mw-container"><StaffLoginForm back={back} expired={expired === '1'} /></div>
      </section>
    </div>
  )
}
