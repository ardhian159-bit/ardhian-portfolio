'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  ReferenceDot,
  ResponsiveContainer,
  Label,
} from 'recharts'

const data = Array.from({ length: 15 }, (_, t) => ({
  t,
  s: 100 * Math.exp(-0.15 * t),
}))

const annotations = [
  { t: 0, label: 'Frequent texting' },
  { t: 4.6, label: 'Reaction-based' },
  { t: 10.73, label: 'Structural failure' },
]

export function DecayCurve() {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 24, bottom: 28, left: 8 }}>
          <XAxis
            dataKey="t"
            type="number"
            domain={[0, 14]}
            ticks={[0, 2, 4, 6, 8, 10, 12, 14]}
            tick={{ fontSize: 11, fill: '#6B6B6B', fontFamily: 'var(--font-dm-mono)' }}
            stroke="#C8C8C4"
          >
            <Label value="Weeks" position="bottom" offset={12} style={{ fontSize: 11, fill: '#6B6B6B' }} />
          </XAxis>
          <YAxis
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tick={{ fontSize: 11, fill: '#6B6B6B', fontFamily: 'var(--font-dm-mono)' }}
            stroke="#C8C8C4"
            width={44}
          >
            <Label
              value="Structural Integrity S(t) (%)"
              angle={-90}
              position="insideLeft"
              style={{ fontSize: 11, fill: '#6B6B6B', textAnchor: 'middle' }}
            />
          </YAxis>
          <ReferenceLine y={20} stroke="#C0392B" strokeDasharray="5 4">
            <Label
              value="Ghosting Event Horizon"
              position="insideTopRight"
              style={{ fontSize: 10, fill: '#C0392B' }}
            />
          </ReferenceLine>
          <ReferenceDot x={10.73} y={20} r={4} fill="#C0392B" stroke="none">
            <Label
              value="t_d ≈ 10.73 weeks"
              position="top"
              style={{ fontSize: 10, fill: '#C0392B' }}
            />
          </ReferenceDot>
          <Line
            type="monotone"
            dataKey="s"
            stroke="#1A1A18"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive
            animationDuration={900}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-3 flex justify-between px-2 text-[10px] text-[#6B6B6B] font-mono">
        {annotations.map((a) => (
          <span key={a.t} className="max-w-[90px] leading-tight">
            <span className="block text-[#1A1A18]">Wk {a.t}</span>
            {a.label}
          </span>
        ))}
      </div>
    </div>
  )
}
