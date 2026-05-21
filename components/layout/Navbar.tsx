'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Download, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { profile } from '@/lib/data'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-all duration-240',
        scrolled
          ? 'bg-white/82 border-b border-line backdrop-blur-[14px] saturate-140'
          : 'bg-[rgba(245,245,242,0.72)] backdrop-blur-[14px] saturate-140 border-b border-transparent',
      ].join(' ')}
      style={{ WebkitBackdropFilter: 'saturate(140%) blur(14px)', backdropFilter: 'saturate(140%) blur(14px)' }}
    >
      <div className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="#top" className="flex items-center gap-3">
          <span
            className="w-9 h-9 rounded-[8px] bg-emerald-900 text-emerald-100 font-mono font-medium text-[13px] grid place-items-center tracking-[0.02em] shrink-0"
            style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset' }}
          >
            AC
          </span>
          <span className="text-sm font-medium tracking-[-0.01em] text-ink">
            {profile.name.split(' ')[0]} {profile.name.split(' ')[1]}{' '}
            <span className="text-ghost font-normal">/ {profile.tagline}</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-[8px] text-[14px] font-medium text-dim hover:text-ink hover:bg-surface transition-colors duration-160"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + mobile burger */}
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            asChild
            className="hidden sm:inline-flex bg-[#1A1A18] text-white hover:bg-[#1A1A18]/90"
          >
            <a href="/cv.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </Button>

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="md:hidden w-9 h-9 rounded-[8px] bg-surface border border-line inline-flex items-center justify-content-center"
                aria-label="Open menu"
              >
                <Menu className="w-[18px] h-[18px] mx-auto" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <div className="pt-14 px-6 flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-8 h-8 rounded-[6px] bg-emerald-900 text-emerald-100 font-mono font-medium text-xs grid place-items-center">
                    AC
                  </span>
                  <span className="text-sm font-medium text-ink">{profile.tagline}</span>
                </div>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2.5 rounded-[8px] text-sm font-medium text-dim hover:text-ink hover:bg-subtle transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-4 pt-4 border-t border-line">
                  <a
                    href="/cv.pdf"
                    download
                    className="flex items-center gap-2 px-3 py-2.5 rounded-[8px] text-sm font-medium text-ink hover:bg-subtle transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download CV
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
