'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Download, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { AcMark } from '@/components/ui/brand-icons'
import { Button } from '@/components/ui/button'
import { profile } from '@/lib/data'
import { useLang } from '@/lib/i18n'
import { content } from '@/lib/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang } = useLang()
  const t = content[lang]

  const NAV_LINKS = [
    { href: '#about', label: t.nav.about },
    { href: '#work', label: t.nav.work },
    { href: '#experience', label: t.nav.experience },
    { href: '#skills', label: t.nav.skills },
    { href: '#contact', label: t.nav.contact },
  ]

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
          <AcMark className="w-9 h-9 shrink-0" />
          <span className="text-sm font-medium tracking-[-0.01em] text-ink">
            {profile.name}{' '}
            <span className="hidden sm:inline text-ghost font-normal">/ {profile.tagline}</span>
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
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "id" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EBEBEB] hover:bg-[#F5F5F2] transition-colors text-sm font-medium text-[#1A1A18]"
          >
            {lang === "en" ? (
              <>
                <svg className="w-5 h-[15px] rounded-[2px] overflow-hidden shrink-0" viewBox="0 0 20 15">
                  <rect width="20" height="7.5" fill="#E70011" />
                  <rect y="7.5" width="20" height="7.5" fill="#fff" />
                </svg>
                <span>ID</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-[15px] rounded-[2px] overflow-hidden shrink-0" viewBox="0 0 20 15">
                  <rect width="20" height="15" fill="#012169" />
                  <path d="M0,0 L20,15 M20,0 L0,15" stroke="#fff" strokeWidth="2.5" />
                  <path d="M0,0 L20,15 M20,0 L0,15" stroke="#C8102E" strokeWidth="1.5" />
                  <path d="M10,0 V15 M0,7.5 H20" stroke="#fff" strokeWidth="4" />
                  <path d="M10,0 V15 M0,7.5 H20" stroke="#C8102E" strokeWidth="2.5" />
                </svg>
                <span>EN</span>
              </>
            )}
          </button>

          <Button
            size="sm"
            asChild
            className="hidden sm:inline-flex bg-[#1A1A18] text-white hover:bg-[#1A1A18]/90"
          >
            <a href="/cv.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              {t.nav.downloadCV}
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
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="pt-14 px-6 flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-6">
                  <AcMark className="w-8 h-8 shrink-0" />
                  <span className="text-sm font-medium text-ink">{profile.name}</span>
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
                    {t.nav.downloadCV}
                  </a>
                </div>
                {/* Mobile language toggle */}
                <div className="mt-2">
                  <button
                    onClick={() => setLang(lang === "en" ? "id" : "en")}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-[8px] text-sm font-medium text-dim hover:text-ink hover:bg-subtle transition-colors w-full"
                  >
                    {lang === "en" ? (
                      <>
                        <svg className="w-5 h-[15px] rounded-[2px] overflow-hidden shrink-0" viewBox="0 0 20 15">
                          <rect width="20" height="7.5" fill="#E70011" />
                          <rect y="7.5" width="20" height="7.5" fill="#fff" />
                        </svg>
                        <span>Bahasa Indonesia</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-[15px] rounded-[2px] overflow-hidden shrink-0" viewBox="0 0 20 15">
                          <rect width="20" height="15" fill="#012169" />
                          <path d="M0,0 L20,15 M20,0 L0,15" stroke="#fff" strokeWidth="2.5" />
                          <path d="M0,0 L20,15 M20,0 L0,15" stroke="#C8102E" strokeWidth="1.5" />
                          <path d="M10,0 V15 M0,7.5 H20" stroke="#fff" strokeWidth="4" />
                          <path d="M10,0 V15 M0,7.5 H20" stroke="#C8102E" strokeWidth="2.5" />
                        </svg>
                        <span>English</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
