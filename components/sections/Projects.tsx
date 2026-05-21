'use client'

import { motion } from 'framer-motion'
import { ExternalLink, BadgeCheck, Activity, LayoutDashboard, Lock } from 'lucide-react'
import { GithubIcon } from '@/components/ui/brand-icons'
import { fadeUp, stagger, viewport } from '@/lib/animations'
import { projects, type ImpactVariant } from '@/lib/data'

/* ─── Project thumbnail visuals ──────────────────────────────────────── */

function NSMSThumb() {
  return (
    <div className="h-[168px] bg-page border-b border-line overflow-hidden relative pt-8 px-3.5 pb-3">
      <span className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/92 border border-line text-[10px] font-medium text-dim font-mono tracking-[0.02em]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
        Live · nsms-three.vercel.app
      </span>
      {/* Mini KPIs */}
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {[
          { l: 'Brutto', v: 'Rp 405 M', accent: false },
          { l: 'Netto', v: 'Rp 275 M', accent: false },
          { l: 'Closing', v: 'Rp 1.5 M', accent: true },
        ].map((k) => (
          <div
            key={k.l}
            className={`rounded-[6px] px-[7px] py-1.5 border ${k.accent ? 'bg-emerald-100/40 border-emerald-200' : 'bg-surface border-line'}`}
          >
            <div className={`text-[8px] uppercase tracking-[0.04em] ${k.accent ? 'text-emerald-800' : 'text-ghost'}`}>{k.l}</div>
            <div className={`font-mono font-medium text-[13px] mt-0.5 ${k.accent ? 'text-emerald-900' : 'text-ink'}`}>{k.v}</div>
          </div>
        ))}
      </div>
      {/* Mini funnel */}
      <div className="bg-surface border border-line rounded-[6px] px-2 py-1.5">
        <div className="text-[8px] font-semibold text-dim uppercase tracking-[0.08em] mb-1.5">Sales funnel · W19</div>
        {[
          { nm: '100', pct: 8, color: '#16A34A', n: '7' },
          { nm: '75', pct: 20, color: '#DC2626', n: '26' },
          { nm: '50', pct: 48, color: '#EA580C', n: '120' },
          { nm: '25', pct: 100, color: '#2563EB', n: '1,117' },
        ].map((row) => (
          <div key={row.nm} className="flex items-center gap-1.5 mb-0.5">
            <span className="w-7 text-[8px] text-ghost font-mono">{row.nm}</span>
            <div className="flex-1 h-1.5 bg-page rounded-[2px] overflow-hidden">
              <div className="h-full rounded-[2px]" style={{ width: `${row.pct}%`, background: row.color }} />
            </div>
            <span className="w-5 text-right text-[8px] text-dim font-mono">{row.n}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SIRUPThumb() {
  return (
    <div className="h-[168px] bg-ink border-b border-line overflow-hidden relative pt-8 px-3.5 pb-3 font-mono text-[9px] leading-[1.55] text-emerald-100">
      <span
        className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-mono tracking-[0.02em]"
        style={{ background: 'rgba(26,26,24,0.85)', color: '#D1FAE5', borderColor: 'rgba(245,245,242,0.18)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" />
        scraper · run #214
      </span>
      {/* Terminal dots */}
      <div className="absolute top-[11px] right-3 flex gap-1.5">
        {[0,1,2].map(i => <span key={i} className="w-[7px] h-[7px] rounded-full" style={{ background: 'rgba(245,245,242,0.18)' }} />)}
      </div>
      <div><span className="text-white/40">$</span> <span className="text-white">python</span> Scrapper_Sirup.py <span className="text-amber-400">--resume</span></div>
      <div className="text-white/40">→ session OK · 514 districts queued</div>
      <div><span className="text-emerald-300">[401/514]</span> <span className="text-white/70">aceh-tengah</span> <BarMini /> <span className="text-white/70">3,420 rows</span></div>
      <div><span className="text-emerald-300">[402/514]</span> <span className="text-white/70">aceh-timur</span> <BarMini /> <span className="text-white/70">2,981 rows</span></div>
      <div><span className="text-emerald-300">[403/514]</span> <span className="text-white/70">aceh-utara</span> <BarMini /> <span className="text-white/70">5,127 rows</span></div>
      <div className="text-white/40">→ checkpoint saved · resume-safe</div>
      <div><span className="text-emerald-300">✓</span> 403 / 514 · <span className="text-amber-400">78.4%</span> · est. 12m</div>
    </div>
  )
}

function BarMini() {
  return (
    <span className="inline-block w-[70px] h-[4px] align-middle mx-1 relative rounded-[2px]" style={{ background: 'rgba(255,255,255,0.08)' }}>
      <span className="absolute inset-0 w-[78%] rounded-[2px] bg-emerald-300" />
    </span>
  )
}

function WarehouseThumb() {
  const sewa = [
    'penuh','penuh','terisi','terisi','terisi','penuh','terisi','terisi','terisi','terisi',
    'terisi','terisi','terisi','terisi','terisi','terisi','terisi','terisi','terisi','terisi',
    'terisi','terisi','terisi','terisi','terisi','terisi','terisi','terisi','terisi','terisi',
    'terisi','terisi','terisi','terisi','terisi','penuh','penuh','penuh','penuh','penuh',
    'penuh','kosong','kosong','kosong','kosong','kosong','kosong','kosong','kosong','kosong',
  ]
  const fulfill = [
    'terisi','terisi','terisi','terisi','terisi','terisi','terisi','terisi','penuh','penuh',
    'terisi','dead','terisi','terisi','terisi','terisi','terisi','terisi','terisi','terisi',
    'terisi','terisi','terisi','terisi','terisi','terisi','terisi','terisi','terisi','terisi',
    'terisi','terisi','terisi','terisi','penuh','penuh','penuh','penuh','penuh','penuh',
    'kosong','kosong','kosong','kosong','kosong','terisi','terisi','terisi','terisi','terisi',
  ]
  const colorMap: Record<string, string> = {
    terisi: '#10B981',
    penuh: '#EC4899',
    dead: '#F97316',
    kosong: 'rgba(26,26,24,0.06)',
  }
  return (
    <div className="h-[168px] border-b border-line overflow-hidden relative pt-8 px-3 pb-2.5" style={{ background: 'linear-gradient(180deg,#FAFAF8,#F5F5F2)' }}>
      <span className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/92 border border-line text-[10px] font-medium text-dim font-mono tracking-[0.02em]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
        Live · Peta Gudang
      </span>
      <div className="grid grid-cols-2 gap-2">
        {[{ label: 'Sewa space · 360 m²', cells: sewa, foot: [{ c: '#10B981', n: '50' }, { c: '#EC4899', n: '8' }, { c: 'rgba(26,26,24,0.12)', n: '12' }] },
          { label: 'Fulfillment · 360 m²', cells: fulfill, foot: [{ c: '#10B981', n: '47' }, { c: '#EC4899', n: '7' }, { c: '#F97316', n: '1' }] }].map((zone) => (
          <div key={zone.label} className="bg-surface border border-line rounded-[6px] p-2">
            <div className="flex items-center gap-1 text-[8px] font-semibold text-dim uppercase tracking-[0.04em] mb-1.5">
              <span className="w-1 h-1 rounded-full bg-blue-600 shrink-0" />
              {zone.label}
            </div>
            <div className="grid gap-0.5" style={{ gridTemplateColumns: 'repeat(10, 1fr)' }}>
              {zone.cells.map((c, i) => (
                <div key={i} className="aspect-square rounded-[2px]" style={{ background: colorMap[c] }} />
              ))}
            </div>
            <div className="flex gap-2 mt-1.5 font-mono text-[8px] text-ghost">
              {zone.foot.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-[2px]" style={{ background: f.c }} />
                  {f.n}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Impact pill ─────────────────────────────────────────────────────── */

const impactStyles: Record<ImpactVariant, string> = {
  adopted: 'bg-emerald-100/50 text-emerald-900',
  live: 'bg-[#ECFDF5] text-[#047857]',
  proto: 'bg-[#EFF6FF] text-[#2563EB]',
}

const ImpactIcon = ({ icon }: { icon: string }) => {
  if (icon === 'badge-check') return <BadgeCheck className="w-3 h-3" />
  if (icon === 'activity') return <Activity className="w-3 h-3" />
  return <LayoutDashboard className="w-3 h-3" />
}

/* ─── Project card ────────────────────────────────────────────────────── */

function ProjectCard({ project }: { project: typeof projects[number] }) {
  const Thumb = project.slug === 'nsms' ? NSMSThumb : project.slug === 'sirup' ? SIRUPThumb : WarehouseThumb

  return (
    <motion.article
      variants={fadeUp}
      className="bg-surface border border-line rounded-[12px] flex flex-col overflow-hidden group"
      style={{ transition: 'transform 240ms cubic-bezier(0.22,1,0.36,1), box-shadow 240ms cubic-bezier(0.22,1,0.36,1), border-color 240ms cubic-bezier(0.22,1,0.36,1)' }}
      whileHover={{ y: -2, boxShadow: 'var(--shadow-md)' }}
    >
      <Thumb />

      <div className="p-[22px] flex flex-col flex-1">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-3.5">
          <span className="font-mono text-[11px] text-ghost">{project.id}</span>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${impactStyles[project.impactVariant]}`}>
            <ImpactIcon icon={project.impactIcon} />
            {project.impact}
          </span>
        </div>

        <h3 className="text-xl font-semibold tracking-[-0.015em] text-ink mb-1.5">
          {project.title}
        </h3>
        <div className="text-xs text-ghost mb-3.5 flex items-center gap-1.5">
          {project.org}
          <span className="text-line-strong">·</span>
          {project.division}
        </div>
        <p className="text-sm leading-[1.6] text-dim mb-5 flex-1">{project.description}</p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5 mb-4.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-page text-dim border border-line"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-1.5 mt-auto pt-3.5 border-t border-line">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 rounded-[8px] text-xs font-medium bg-page text-ink border border-line hover:bg-ink hover:text-on-ink hover:border-ink transition-all duration-160"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {project.liveLabel}
            </a>
          ) : (
            <span className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 rounded-[8px] text-xs font-medium bg-page text-ghost border border-line cursor-not-allowed">
              <Lock className="w-3.5 h-3.5" />
              {project.liveLabel}
            </span>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 rounded-[8px] text-xs font-medium bg-page text-ink border border-line hover:bg-ink hover:text-on-ink hover:border-ink transition-all duration-160"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            {project.githubLabel}
          </a>
        </div>
      </div>
    </motion.article>
  )
}

/* ─── Section ─────────────────────────────────────────────────────────── */

export default function Projects() {
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
              Selected work
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-medium tracking-[-0.025em] leading-[1.08] text-ink mb-0"
            style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', textWrap: 'balance' } as React.CSSProperties}
          >
            Three systems, all shipped to <em className="not-italic text-emerald-800">real teams</em>.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3.5 max-w-[620px] text-dim text-base leading-[1.55]">
            Each project started from a real operational problem and was adopted (or is being adopted)
            as the primary tool — not a portfolio exercise. Stack, role, and outcome below.
          </motion.p>
        </motion.div>

        {/* Project grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
