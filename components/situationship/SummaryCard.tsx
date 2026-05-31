'use client'

import { motion } from 'framer-motion'

const tiles = [
  { value: '4.62', unit: 'weeks', label: 'Half-life (t½)' },
  { value: '10.73', unit: 'weeks', label: 'Ghosting Event Horizon (t_d)' },
  { value: '9.14', unit: 'weeks', label: 'Avg stopping time (T*)' },
  { value: '71.8', unit: '%', label: 'Fade-out rate' },
]

export function SummaryCard() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-3">
        {tiles.map((t, i) => (
          <motion.div
            key={t.label}
            className="border border-[#EBEBEB] rounded-sm p-4 bg-[#FBFAF7]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="font-mono text-2xl text-[#1A1A18]">
              {t.value}
              <span className="text-sm text-[#6B6B6B] ml-1">{t.unit}</span>
            </div>
            <div className="mt-1 text-[10px] text-[#6B6B6B] leading-tight">{t.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 border-t border-[#EBEBEB] pt-4 text-[11px] text-[#6B6B6B] leading-relaxed">
        <p className="italic">
          Hermawan, A.C. (2026). <span className="not-italic">Optimal Stopping in Romantic Ambiguity: A
          Bayesian Game-Theoretic Analysis.</span> Universitas Negeri Malang.
        </p>
        <p className="mt-1">Cite also: Nahadi, F. (2026a, 2026b).</p>
      </div>
    </div>
  )
}
