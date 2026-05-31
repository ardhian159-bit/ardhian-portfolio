'use client'

import { motion } from 'framer-motion'

type Cell = {
  value: string
  tag?: string
  color: string
  bg: string
}

const grid: Cell[][] = [
  [
    { value: '(8, 8)', tag: 'NE₁ · Payoff-dominant', color: '#27AE60', bg: '#EAF7EF' },
    { value: '(-6, 4)', color: '#6B6B6B', bg: '#FFFFFF' },
  ],
  [
    { value: '(4, -6)', color: '#6B6B6B', bg: '#FFFFFF' },
    { value: '(3, 3)', tag: 'NE₂ · Risk-dominant', color: '#E67E22', bg: '#FDF1E7' },
  ],
]

export function NashMatrix() {
  return (
    <div className="w-full">
      <table className="w-full border-collapse text-center font-mono text-sm">
        <thead>
          <tr>
            <th className="w-20" />
            <th className="p-2 text-[11px] font-medium text-[#6B6B6B]">Commit</th>
            <th className="p-2 text-[11px] font-medium text-[#6B6B6B]">Wait</th>
          </tr>
        </thead>
        <tbody>
          {grid.map((row, i) => (
            <tr key={i}>
              <th className="p-2 text-[11px] font-medium text-[#6B6B6B] text-right pr-3">
                {i === 0 ? 'Commit' : 'Wait'}
              </th>
              {row.map((cell, j) => (
                <td key={j} className="border border-[#EBEBEB] p-0">
                  <div
                    className="flex flex-col items-center justify-center gap-1 py-6 px-2 rounded-sm"
                    style={{ background: cell.bg }}
                  >
                    <span className="text-[15px]" style={{ color: cell.color }}>
                      {cell.value}
                    </span>
                    {cell.tag && (
                      <span className="text-[9px] leading-tight" style={{ color: cell.color }}>
                        {cell.tag}
                      </span>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <div className="flex justify-between text-[10px] text-[#6B6B6B] font-mono mb-1">
          <span>x* = 0.692</span>
          <span>confidence required to commit</span>
        </div>
        <div className="h-2 w-full bg-[#EBEBEB] rounded-sm overflow-hidden">
          <motion.div
            className="h-full bg-[#27AE60] rounded-sm"
            initial={{ width: 0 }}
            animate={{ width: '69.2%' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </div>
  )
}
