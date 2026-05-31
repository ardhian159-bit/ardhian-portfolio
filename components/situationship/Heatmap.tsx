'use client'

import { motion } from 'framer-motion'

// rows: c = 14,12,10,8,6,4 (top to bottom) — high commitment cost at top
// cols: p = 0.20,0.30,0.40,0.50,0.60,0.70
const cols = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7]

type Cell = { week: number; frac: number }

const rows: { c: number; cells: Cell[] }[] = [
  {
    c: 14,
    cells: [
      { week: 10.1, frac: 0.15 },
      { week: 9.1, frac: 0.29 },
      { week: 7.5, frac: 0.47 },
      { week: 7.0, frac: 0.54 },
      { week: 4.2, frac: 0.76 },
      { week: 2.8, frac: 0.88 },
    ],
  },
  {
    c: 12,
    cells: [
      { week: 10.1, frac: 0.15 },
      { week: 9.2, frac: 0.27 },
      { week: 7.4, frac: 0.49 },
      { week: 4.5, frac: 0.72 },
      { week: 4.2, frac: 0.75 },
      { week: 2.8, frac: 0.88 },
    ],
  },
  {
    c: 10,
    cells: [
      { week: 9.5, frac: 0.23 },
      { week: 9.2, frac: 0.28 },
      { week: 7.4, frac: 0.49 },
      { week: 4.5, frac: 0.72 },
      { week: 4.2, frac: 0.75 },
      { week: 2.8, frac: 0.89 },
    ],
  },
  { c: 8, cells: cols.map(() => ({ week: 1.0, frac: 1.0 })) },
  { c: 6, cells: cols.map(() => ({ week: 1.0, frac: 1.0 })) },
  { c: 4, cells: cols.map(() => ({ week: 1.0, frac: 1.0 })) },
]

// white -> #C0392B by week (1 -> 10+)
function cellColor(week: number) {
  const tNorm = Math.min(1, Math.max(0, (week - 1) / 9))
  // interpolate white (#FFFFFF) -> red (#C0392B = 192,57,43)
  const r = Math.round(255 + (192 - 255) * tNorm)
  const g = Math.round(255 + (57 - 255) * tNorm)
  const b = Math.round(255 + (43 - 255) * tNorm)
  return `rgb(${r}, ${g}, ${b})`
}

export function Heatmap() {
  let idx = 0
  return (
    <div className="w-full">
      <div className="flex">
        <div className="w-10 shrink-0" />
        <div className="flex-1 grid grid-cols-6 gap-1 mb-1">
          {cols.map((p) => (
            <span key={p} className="text-center text-[10px] font-mono text-[#6B6B6B]">
              {p.toFixed(2)}
            </span>
          ))}
        </div>
      </div>
      {rows.map((row) => (
        <div key={row.c} className="flex items-center">
          <span className="w-10 shrink-0 text-right pr-2 text-[10px] font-mono text-[#6B6B6B]">
            {row.c}
          </span>
          <div className="flex-1 grid grid-cols-6 gap-1 mb-1">
            {row.cells.map((cell, j) => {
              const stagger = idx++
              const isImmediate = cell.week <= 1.0
              return (
                <motion.div
                  key={j}
                  className="aspect-square rounded-sm flex items-center justify-center"
                  style={{ background: cellColor(cell.week) }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: stagger * 0.03 }}
                >
                  <span
                    className="text-[9px] font-mono"
                    style={{ color: cell.frac > 0.6 ? '#FFFFFF' : '#6B6B6B' }}
                  >
                    {isImmediate ? '1.0' : cell.week}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      ))}
      <div className="flex mt-2">
        <span className="w-10 shrink-0" />
        <p className="flex-1 text-center text-[10px] font-mono text-[#6B6B6B]">
          → trust prior p &nbsp;·&nbsp; ↑ commitment cost c
        </p>
      </div>
      <p className="mt-2 text-[10px] font-mono text-[#C0392B]">
        ← The Raka Region (high cost, low trust → commit immediately fails)
      </p>
    </div>
  )
}
