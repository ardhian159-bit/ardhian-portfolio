'use client'

import { motion } from 'framer-motion'

const segments = [
  { label: 'Mutual Commitment', value: 20.7, color: '#2C3E50' },
  { label: 'One-sided Rejection', value: 7.5, color: '#C0392B' },
  { label: 'Fade-out', value: 71.8, color: '#BDC3C7' },
]

const stopping = [
  { label: 'Myopic', weeks: 9.14, color: '#C0392B' },
  { label: 'Optimal', weeks: 5.57, color: '#2C3E50' },
]

const maxWeeks = 10

export function OutcomeViz() {
  return (
    <div className="w-full space-y-8">
      <div>
        <p className="text-[11px] text-[#6B6B6B] font-mono mb-2">Outcome distribution (10,000 simulations)</p>
        <div className="flex h-9 w-full overflow-hidden rounded-sm">
          {segments.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex items-center justify-center"
              style={{ background: s.color }}
              initial={{ width: 0 }}
              animate={{ width: `${s.value}%` }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {s.value > 12 && (
                <span className="text-[10px] font-mono text-white px-1">{s.value}%</span>
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-[10px] font-mono text-[#6B6B6B]">
          {segments.map((s) => (
            <span key={s.label} className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
              {s.label} · {s.value}%
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] text-[#6B6B6B] font-mono mb-2">Average stopping time (weeks)</p>
        <div className="space-y-3">
          {stopping.map((d, i) => (
            <div key={d.label} className="flex items-center gap-3">
              <span className="w-16 text-[11px] font-mono text-[#1A1A18]">{d.label}</span>
              <div className="flex-1 h-6 bg-[#F0EEE9] rounded-sm overflow-hidden">
                <motion.div
                  className="h-full flex items-center justify-end pr-2 rounded-sm"
                  style={{ background: d.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(d.weeks / maxWeeks) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-[10px] font-mono text-white">{d.weeks}</span>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-[#C0392B] font-mono">−3.57 weeks if rational</p>
      </div>
    </div>
  )
}
