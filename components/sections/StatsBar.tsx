'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, stagger, viewport } from '@/lib/animations'
import { stats } from '@/lib/data'

function useCountUp(target: number, decimals: number, active: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 1400
    const start = performance.now()
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [active, target, decimals])

  return decimals ? value.toFixed(decimals) : value.toLocaleString()
}

function StatItem({ stat, active }: { stat: typeof stats[number]; active: boolean }) {
  const display = useCountUp(stat.value, stat.decimals, active)
  return (
    <motion.div variants={fadeUp} className="px-6 border-l border-line first:border-l-0 first:pl-0">
      <div
        className="font-mono font-medium leading-none tracking-[-0.02em] text-ink tabular-nums"
        style={{ fontSize: 'clamp(28px, 4.5vw, 44px)' }}
      >
        {display}
        {stat.unit && (
          <span className="text-ghost" style={{ fontSize: '0.55em', marginLeft: '2px' }}>
            {stat.unit}
          </span>
        )}
      </div>
      <span className="block text-xs text-dim mt-2.5 tracking-[0.01em]">
        {stat.label} ·{' '}
        <span className="text-ghost">{stat.context}</span>
      </span>
    </motion.div>
  )
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-surface border-t border-b border-line py-0">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 py-9 gap-y-6 lg:gap-y-0"
          style={{
            gridTemplateColumns: undefined,
          }}
        >
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} active={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
