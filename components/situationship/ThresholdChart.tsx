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

const pStar = [0.31, 0.35, 0.39, 0.44, 0.48, 0.53, 0.58, 0.63, 0.68, 0.74, 0.8, 0.89]

const data = pStar.map((p, t) => ({
  t,
  pStar: p,
  s: Math.exp(-0.15 * t),
}))

export function ThresholdChart() {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 20, right: 40, bottom: 28, left: 8 }}>
          <XAxis
            dataKey="t"
            type="number"
            domain={[0, 11]}
            ticks={[0, 2, 4, 6, 8, 10]}
            tick={{ fontSize: 11, fill: '#6B6B6B', fontFamily: 'var(--font-dm-mono)' }}
            stroke="#C8C8C4"
          >
            <Label value="Weeks" position="bottom" offset={12} style={{ fontSize: 11, fill: '#6B6B6B' }} />
          </XAxis>
          <YAxis
            yAxisId="left"
            domain={[0, 1]}
            ticks={[0, 0.25, 0.5, 0.75, 1]}
            tick={{ fontSize: 11, fill: '#6B6B6B', fontFamily: 'var(--font-dm-mono)' }}
            stroke="#C8C8C4"
            width={36}
          >
            <Label
              value="Threshold p*(t)"
              angle={-90}
              position="insideLeft"
              style={{ fontSize: 11, fill: '#6B6B6B', textAnchor: 'middle' }}
            />
          </YAxis>
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 1]}
            ticks={[0, 0.25, 0.5, 0.75, 1]}
            tick={{ fontSize: 11, fill: '#BDC3C7', fontFamily: 'var(--font-dm-mono)' }}
            stroke="#D8D8D4"
            width={36}
          >
            <Label
              value="S(t)"
              angle={90}
              position="insideRight"
              style={{ fontSize: 11, fill: '#BDC3C7', textAnchor: 'middle' }}
            />
          </YAxis>
          <ReferenceLine yAxisId="left" x={10.73} stroke="#C0392B" strokeDasharray="2 3">
            <Label
              value="Ghosting Event Horizon"
              position="insideTopLeft"
              style={{ fontSize: 10, fill: '#C0392B' }}
            />
          </ReferenceLine>
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="pStar"
            stroke="#C0392B"
            strokeWidth={1.5}
            fill="#FDECEA"
            isAnimationActive
            animationDuration={900}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="s"
            stroke="#BDC3C7"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive
            animationDuration={900}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <p className="mt-3 px-2 text-[10px] text-[#6B6B6B] font-mono">
        As S(t) shrinks, the bar rises — commitment gets harder over time.
      </p>
    </div>
  )
}
