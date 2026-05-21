'use client'

import { motion } from 'framer-motion'
import { slideLeft, stagger, fadeUp, viewport } from '@/lib/animations'
import { experience } from '@/lib/data'

export default function Experience() {
  return (
    <section className="py-24 border-t border-b border-line">
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
              Experience
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-medium tracking-[-0.025em] leading-[1.08] text-ink"
            style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', textWrap: 'balance' } as React.CSSProperties}
          >
            Three internships, one degree,{' '}
            <em className="not-italic text-emerald-800">one through-line</em>: data that ships.
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-7">
          {/* Vertical line */}
          <div className="absolute top-2 bottom-2 left-[7px] w-px bg-line" />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col gap-0"
          >
            {experience.map((item, i) => (
              <motion.div
                key={i}
                variants={slideLeft}
                className="relative pb-9 last:pb-0"
              >
                {/* Timeline dot */}
                <div
                  className={[
                    'absolute -left-7 top-1.5 w-4 h-4 rounded-full grid place-items-center',
                    item.current
                      ? 'bg-emerald-900 border-[1.5px] border-emerald-900'
                      : item.edu
                      ? 'bg-surface border-[1.5px] border-emerald-800'
                      : 'bg-surface border-[1.5px] border-line-strong',
                  ].join(' ')}
                  style={
                    item.current
                      ? { boxShadow: '0 0 0 4px rgba(6,78,59,0.12)' }
                      : undefined
                  }
                >
                  {item.current && (
                    <span className="w-[5px] h-[5px] rounded-full bg-emerald-100" />
                  )}
                  {item.edu && !item.current && (
                    <span className="w-1 h-1 rounded-full bg-emerald-800" />
                  )}
                </div>

                {/* Card */}
                <div
                  className="bg-surface border border-line rounded-[12px] px-6 py-[22px] hover:border-line-strong transition-all duration-240 group"
                  style={{
                    transition: 'border-color 240ms cubic-bezier(0.22,1,0.36,1), box-shadow 240ms cubic-bezier(0.22,1,0.36,1)',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                  }}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3.5">
                    <div>
                      <div className="text-base font-semibold text-ink tracking-[-0.01em] leading-[1.3]">
                        {item.role}
                      </div>
                      <div className="text-[13px] text-dim mt-1">
                        {item.org}{' '}
                        <span className="inline-block px-2 py-0.5 rounded-full ml-1.5 bg-page border border-line text-[11px] text-ghost font-mono">
                          {item.location}
                        </span>
                      </div>
                    </div>
                    <span
                      className={[
                        'font-mono text-[11px] px-2.5 py-1 rounded-full border whitespace-nowrap shrink-0',
                        item.current
                          ? 'bg-[#ECFDF5] text-[#047857] border-[#ECFDF5]'
                          : 'bg-page border-line text-ghost',
                      ].join(' ')}
                    >
                      {item.period}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                    {item.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="text-sm text-dim leading-[1.55] pl-[18px] relative"
                      >
                        <span className="absolute left-0 top-[9px] w-1.5 h-px bg-emerald-800" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
