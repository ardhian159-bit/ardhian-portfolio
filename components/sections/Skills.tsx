'use client'

import { motion } from 'framer-motion'
import { Terminal, Briefcase, BadgeCheck } from 'lucide-react'
import { fadeUp, stagger, viewport } from '@/lib/animations'
import { skills, certifications } from '@/lib/data'

export default function Skills() {
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
              Skills
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-medium tracking-[-0.025em] leading-[1.08] text-ink"
            style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', textWrap: 'balance' } as React.CSSProperties}
          >
            Technical fluency,{' '}
            <em className="not-italic text-emerald-800">business fluency</em>.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3.5 max-w-[620px] text-dim text-base leading-[1.55]">
            I read SQL and stakeholder emails with equal ease. The list below is what I reach for
            daily, not what I&apos;ve heard of.
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
              <h3 className="text-base font-semibold tracking-[-0.01em] text-ink">Technical &amp; data</h3>
            </div>
            {skills.technical.map((group) => (
              <div key={group.group} className="mb-[18px] last:mb-0">
                <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-ghost mb-2.5">
                  {group.group}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Pill key={item}>{item}</Pill>
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
              <h3 className="text-base font-semibold tracking-[-0.01em] text-ink">Business &amp; domain</h3>
            </div>
            {skills.business.map((group) => (
              <div key={group.group} className="mb-[18px] last:mb-0">
                <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-ghost mb-2.5">
                  {group.group}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Pill key={item}>{item}</Pill>
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
              Certifications
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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1.5 rounded-full bg-page border border-line text-[13px] font-medium text-ink hover:bg-ink hover:text-on-ink hover:border-ink hover:-translate-y-px transition-all duration-160 cursor-default">
      {children}
    </span>
  )
}
