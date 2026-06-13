'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Briefcase, BadgeCheck } from 'lucide-react'
import type { IconType } from 'react-icons'
import {
  SiPython,
  SiR,
  SiDuckdb,
  SiPandas,
  SiChartdotjs,
  SiNextdotjs,
  SiSupabase,
  SiPostgresql,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiVercel,
} from 'react-icons/si'
import { TbDatabase, TbChartBar, TbMathFunction, TbSpider } from 'react-icons/tb'
import { fadeUp, stagger, viewport } from '@/lib/animations'
import { skills, certifications, skillDescriptions } from '@/lib/data'
import { useLang } from '@/lib/i18n'
import { content } from '@/lib/content'

// Brand logos via react-icons (Simple Icons). Tableau/Power BI/Recharts have no
// trademark-cleared brand logo, so they fall back to a generic chart glyph;
// concept skills (business column) intentionally have no icon.
const skillIcons: Record<string, IconType> = {
  Python: SiPython,
  SQL: TbDatabase,
  R: SiR,
  EViews: TbMathFunction,
  DuckDB: SiDuckdb,
  pandas: SiPandas,
  BeautifulSoup: TbSpider,
  Econometrics: TbMathFunction,
  Tableau: TbChartBar,
  'Power BI': TbChartBar,
  'Chart.js': SiChartdotjs,
  Recharts: TbChartBar,
  'Next.js': SiNextdotjs,
  Supabase: SiSupabase,
  PostgreSQL: SiPostgresql,
  TypeScript: SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'Framer Motion': SiFramer,
  Vercel: SiVercel,
}

export default function Skills() {
  const { lang } = useLang()
  const t = content[lang]

  // Single open tooltip across all pills (hover on desktop, tap on mobile).
  const [openKey, setOpenKey] = useState<string | null>(null)
  useEffect(() => {
    if (!openKey) return
    const onDocClick = (e: MouseEvent) => {
      const el = e.target as Element | null
      if (!el || !el.closest('[data-skillpill]')) setOpenKey(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenKey(null)
    }
    const onScroll = () => setOpenKey(null)
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [openKey])

  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Section header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-12"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
            <span className="inline-block w-6 h-px bg-emerald-300" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-emerald-800">
              {t.skills.sectionLabel}
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-medium tracking-[-0.025em] leading-[1.08] text-ink"
            style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', textWrap: 'balance' } as React.CSSProperties}
          >
            {t.skills.sectionTitle}{' '}
            <em className="not-italic text-emerald-800">{t.skills.sectionAccent}</em>.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3.5 max-w-[620px] text-dim text-base leading-[1.55]">
            {t.skills.sectionSub}
          </motion.p>
        </motion.div>

        {/* Two-column skill cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"
        >
          {/* Technical */}
          <motion.div variants={fadeUp} className="bg-surface border border-line rounded-[12px] p-6">
            <div className="flex items-center gap-2.5 mb-[18px]">
              <div className="w-8 h-8 rounded-[8px] bg-emerald-100/45 text-emerald-900 grid place-items-center">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold tracking-[-0.01em] text-ink">{t.skills.technicalTitle}</h3>
            </div>
            {skills.technical.map((group) => (
              <div key={group.group} className="mb-[18px] last:mb-0">
                <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-ghost mb-2.5">
                  {group.group}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Pill
                      key={item}
                      name={item}
                      icon={skillIcons[item]}
                      desc={skillDescriptions[item]?.[lang]}
                      openKey={openKey}
                      setOpenKey={setOpenKey}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Business */}
          <motion.div variants={fadeUp} className="bg-surface border border-line rounded-[12px] p-6">
            <div className="flex items-center gap-2.5 mb-[18px]">
              <div className="w-8 h-8 rounded-[8px] bg-emerald-100/45 text-emerald-900 grid place-items-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold tracking-[-0.01em] text-ink">{t.skills.businessTitle}</h3>
            </div>
            {skills.business.map((group) => (
              <div key={group.group} className="mb-[18px] last:mb-0">
                <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-ghost mb-2.5">
                  {group.group}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Pill
                      key={item}
                      name={item}
                      icon={skillIcons[item]}
                      desc={skillDescriptions[item]?.[lang]}
                      openKey={openKey}
                      setOpenKey={setOpenKey}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="bg-surface border border-line rounded-[12px] px-6 py-5"
        >
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-ghost shrink-0">
              {t.skills.certificationsLabel}
            </span>
            {certifications.map((cert, i) => (
              <span key={i} className="flex items-center gap-2.5 text-[13px] text-ink">
                <BadgeCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                {cert.title}
                <span className="text-ghost">{cert.issuer}</span>
                {i < certifications.length - 1 && (
                  <span className="w-px h-[18px] bg-line ml-2" />
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Structural classes only — colors are applied separately so the active state
// never carries conflicting base colors (which made pills render blank).
const PILL_STRUCT =
  'group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[13px] font-medium transition-all duration-160 cursor-default'
const PILL_REST =
  'bg-page text-ink border-line hover:bg-ink hover:text-on-ink hover:border-ink hover:-translate-y-px'
const PILL_ACTIVE = 'bg-ink text-on-ink border-ink -translate-y-px'

function Pill({
  name,
  icon: Icon,
  desc,
  openKey,
  setOpenKey,
}: {
  name: string
  icon?: IconType
  desc?: string
  openKey: string | null
  setOpenKey: (key: string | null) => void
}) {
  // No description → plain, non-interactive pill (business concepts).
  if (!desc) {
    return (
      <span className={`${PILL_STRUCT} ${PILL_REST}`}>
        {Icon && <Icon className="w-3.5 h-3.5 shrink-0 text-ghost group-hover:text-on-ink" aria-hidden />}
        {name}
      </span>
    )
  }

  const open = openKey === name
  const iconColor = open ? 'text-on-ink' : 'text-ghost group-hover:text-on-ink'

  return (
    <span className="relative inline-flex" data-skillpill>
      <button
        type="button"
        aria-label={`${name} — ${desc}`}
        onPointerEnter={(e) => {
          if (e.pointerType !== 'touch') setOpenKey(name)
        }}
        onPointerLeave={(e) => {
          if (e.pointerType !== 'touch' && open) setOpenKey(null)
        }}
        onClick={() => setOpenKey(open ? null : name)}
        className={`${PILL_STRUCT} ${open ? PILL_ACTIVE : PILL_REST}`}
      >
        {Icon && <Icon className={`w-3.5 h-3.5 shrink-0 ${iconColor}`} aria-hidden />}
        {name}
      </button>
      {open && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[200px] -translate-x-1/2 whitespace-normal rounded-[8px] border border-line bg-surface px-2.5 py-1.5 text-center text-[11px] font-normal leading-snug text-dim shadow-[var(--shadow-md)] animate-in fade-in-0 zoom-in-95 duration-150"
        >
          {desc}
        </span>
      )}
    </span>
  )
}
