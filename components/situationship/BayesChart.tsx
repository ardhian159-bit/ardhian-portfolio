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

const path1 = [0.3, 0.44, 0.6, 0.45, 0.6, 0.68, 0.73]
const path2 = [0.3, 0.44, 0.33, 0.25, 0.37, 0.28, 0.21]
const signals1 = ['+', '+', '-', '+', '+', '+']
const signals2 = ['+', '-', '-', '+', '-', '-']

const data = path1.map((p, i) => ({ week: i, p1: p, p2: path2[i] }))

export function BayesChart() {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 24, bottom: 28, left: 8 }}>
          <XAxis
            dataKey="week"
            type="number"
            domain={[0, 6]}
            ticks={[0, 1, 2, 3, 4, 5, 6]}
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
              value="Posterior belief p(t)"
              angle={-90}
              position="insideLeft"
              style={{ fontSize: 11, fill: '#6B6B6B', textAnchor: 'middle' }}
            />
          </YAxis>
          <ReferenceLine y={0.65} stroke="#C0392B" strokeDasharray="5 4">
            <Label value="p* = 0.65" position="insideTopRight" style={{ fontSize: 10, fill: '#C0392B' }} />
          </ReferenceLine>
          <ReferenceDot x={6} y={0.73} r={4} fill="#1A1A18" stroke="none">
            <Label value="Crosses threshold" position="top" style={{ fontSize: 10, fill: '#1A1A18' }} />
          </ReferenceDot>
          <Line
            type="monotone"
            dataKey="p1"
            stroke="#1A1A18"
            strokeWidth={1.5}
            dot={{ r: 2.5, fill: '#1A1A18' }}
            isAnimationActive
            animationDuration={900}
          />
          <Line
            type="monotone"
            dataKey="p2"
            stroke="#BEBEBE"
            strokeWidth={1.5}
            dot={{ r: 2.5, fill: '#BEBEBE' }}
            isAnimationActive
            animationDuration={900}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-3 flex gap-6 px-2 text-[10px] font-mono">
        <span className="text-[#1A1A18]">
          ── Path 1 &nbsp;{signals1.map((s, i) => (
            <span key={i} style={{ color: s === '+' ? '#27AE60' : '#C0392B' }}>{s === '+' ? '▲' : '▼'}</span>
          ))}
        </span>
        <span className="text-[#BEBEBE]">
          ── Path 2 &nbsp;{signals2.map((s, i) => (
            <span key={i} style={{ color: s === '+' ? '#27AE60' : '#C0392B' }}>{s === '+' ? '▲' : '▼'}</span>
          ))}
        </span>
      </div>
    </div>
  )
}
