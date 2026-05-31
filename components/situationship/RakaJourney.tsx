'use client'

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  Label,
} from 'recharts'

const belief = [0.3, 0.44, 0.6, 0.45, 0.6, 0.68, 0.52, 0.67, 0.71, 0.73, 0.55, 0.4]

const data = belief.map((p, week) => ({
  week,
  p,
  above: p >= 0.65 ? p : 0.65,
  below: p < 0.65 ? p : 0.65,
}))

export function RakaJourney() {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 20, right: 24, bottom: 28, left: 8 }}>
          <XAxis
            dataKey="week"
            type="number"
            domain={[0, 11]}
            ticks={[0, 2, 4, 6, 8, 10]}
            tick={{ fontSize: 11, fill: '#6B6B6B', fontFamily: 'var(--font-dm-mono)' }}
            stroke="#C8C8C4"
          >
            <Label value="Weeks" position="bottom" offset={12} style={{ fontSize: 11, fill: '#6B6B6B' }} />
          </XAxis>
          <YAxis
            domain={[0, 1]}
            ticks={[0, 0.25, 0.5, 0.65, 0.75, 1]}
            tick={{ fontSize: 11, fill: '#6B6B6B', fontFamily: 'var(--font-dm-mono)' }}
            stroke="#C8C8C4"
            width={36}
          >
            <Label
              value="Raka's belief p(t)"
              angle={-90}
              position="insideLeft"
              style={{ fontSize: 11, fill: '#6B6B6B', textAnchor: 'middle' }}
            />
          </YAxis>
          <ReferenceLine y={0.65} stroke="#C0392B" strokeDasharray="5 4">
            <Label value="p* = 0.65" position="insideTopRight" style={{ fontSize: 10, fill: '#C0392B' }} />
          </ReferenceLine>
          <ReferenceLine x={9.14} stroke="#C0392B" strokeDasharray="0">
            <Label value="Have the talk" position="top" style={{ fontSize: 10, fill: '#C0392B' }} />
          </ReferenceLine>
          <ReferenceLine x={10.73} stroke="#6B6B6B" strokeDasharray="2 3">
            <Label value="Ghosting Event Horizon" position="insideBottomRight" style={{ fontSize: 9, fill: '#6B6B6B' }} />
          </ReferenceLine>
          <Area
            type="monotone"
            dataKey="above"
            stroke="none"
            fill="#EAF7EF"
            isAnimationActive={false}
            baseValue={0.65}
          />
          <Line
            type="monotone"
            dataKey="p"
            stroke="#1A1A18"
            strokeWidth={1.5}
            dot={{ r: 2.5, fill: '#1A1A18' }}
            isAnimationActive
            animationDuration={1000}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <p className="mt-3 px-2 text-[10px] text-[#6B6B6B] font-mono">
        Week 1: 0.44 — close, but not enough.
      </p>
    </div>
  )
}
