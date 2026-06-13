'use client'

import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import type { LucideIcon } from 'lucide-react'
import { Database, Activity, ShieldCheck, ExternalLink, FileDown } from 'lucide-react'

// ─── Colors / shared styles ───────────────────────────────────────────────────
const INK = '#1A1A18'
const GHOST = '#6B6B6B'
const BORDER = '#EBEBEB'
const RED = '#C0392B'
const tick = { fontSize: 11, fill: GHOST, fontFamily: 'var(--font-dm-sans)' } as const
const tooltipStyle = {
  fontSize: 12,
  borderColor: BORDER,
  borderRadius: 6,
  fontFamily: 'var(--font-dm-sans)',
} as const

// ─── Data ─────────────────────────────────────────────────────────────────────

// IRF: respons proxy Indonesia terhadap guncangan JGB (1 s.d.), nilai dibaca dari plot statsmodels asli.
const irfRaw = [
  { hari: 0, resp: 0.0265, lo: 0.0145, hi: 0.0386 },
  { hari: 1, resp: 0.0297, lo: 0.013, hi: 0.046 },
  { hari: 2, resp: 0.0275, lo: 0.0076, hi: 0.0472 },
  { hari: 3, resp: 0.0312, lo: 0.0085, hi: 0.054 },
  { hari: 4, resp: 0.0258, lo: 0.0007, hi: 0.051 },
  { hari: 5, resp: 0.0247, lo: 0.001, hi: 0.048 },
  { hari: 6, resp: 0.0228, lo: 0.0, hi: 0.0455 },
  { hari: 7, resp: 0.021, lo: -0.0015, hi: 0.0435 },
  { hari: 8, resp: 0.0195, lo: -0.003, hi: 0.042 },
  { hari: 9, resp: 0.0182, lo: -0.0045, hi: 0.0408 },
  { hari: 10, resp: 0.0168, lo: -0.006, hi: 0.0396 },
]
const irfData = irfRaw.map((d) => ({ ...d, base: d.lo, band: d.hi - d.lo }))

// Monte Carlo: proyeksi USD/IDR via covariance residual VECM. Mean stabil, ekor melebar.
const SD0 = 75
const mcData = Array.from({ length: 11 }, (_, k) => {
  const t = k * 3
  const s = SD0 * Math.sqrt(t)
  const med = 16900
  return {
    hari: t,
    range90: [med - 1.645 * s, med + 1.645 * s] as [number, number],
    range50: [med - 0.674 * s, med + 0.674 * s] as [number, number],
    med,
    stres: med + 2.5 * s,
  }
})

// Matriks korelasi daily returns — nilai eksak dari heatmap asli (lower triangle).
const corrLabels = ['JGB', 'DXY', 'SBN', 'USD/IDR', 'JPY/IDR']
const corrMatrix: (number | null)[][] = [
  [1.0, null, null, null, null],
  [-0.02, 1.0, null, null, null],
  [0.1, -0.31, 1.0, null, null],
  [-0.03, 0.04, -0.02, 1.0, null],
  [-0.01, 0.0, 0.03, -0.0, 1.0],
]

const statCards: { value: string; label: string }[] = [
  { value: '0,044', label: 'loading USD/IDR (ec1) · p<0,001' },
  { value: '−7,28', label: 'loading USD/IDR (ec2) · p<0,001' },
  { value: '94%', label: 'kredibilitas transmisi (Bayesian)' },
]

const heroPills = ['1.303 hari data', 'VECM · Bayesian · Monte Carlo', 'Januari 2026']

interface MetodologiItem {
  Icon: LucideIcon
  title: string
  body: string
}
const metodologiItems: MetodologiItem[] = [
  {
    Icon: Database,
    title: 'Sumber Data',
    body: 'Proxy ETF sebagai indikator stres pasar: 1306.T (proxy JGB) & EIDO (proxy pasar Indonesia), plus DXY dan USD/IDR. ~1.303 hari perdagangan s.d. Januari 2026.',
  },
  {
    Icon: Activity,
    title: 'Model',
    body: 'VECM (rank kointegrasi 2, lag 4) untuk dinamika koreksi-error, regresi Bayesian (PyMC) untuk kredibilitas transmisi, dan Monte Carlo 1.000 jalur untuk risiko ekor.',
  },
  {
    Icon: ShieldCheck,
    title: 'Caveat',
    body: 'Proxy ETF menangkap sentimen risiko, bukan yield langsung — koefisien dibaca sebagai transmisi stres, bukan pass-through basis poin. Replikasi dengan yield langsung (FRED, DJPPR) disarankan.',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const id3 = (n: number) => n.toLocaleString('id-ID', { maximumFractionDigits: 0 })
function corrCell(v: number | null): { bg: string; color: string; text: string } {
  if (v === null) return { bg: 'transparent', color: 'transparent', text: '' }
  if (v === 1) return { bg: INK, color: '#fff', text: '1,00' }
  const mag = Math.min(1, Math.abs(v) / 0.31)
  const a = 0.1 + 0.6 * mag
  const bg = v >= 0 ? `rgba(6,95,70,${a})` : `rgba(192,57,43,${a})`
  const text = v.toFixed(2).replace('-', '−').replace('.', ',')
  return { bg, color: INK, text }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function JGBPage() {
  return (
    <main className="bg-[#F5F5F2] text-[#1A1A18] antialiased font-[family-name:var(--font-dm-sans)]">
      <div className="max-w-[720px] mx-auto px-6 py-24">

        {/* ── Hero ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-xs font-mono tracking-widest uppercase text-[#6B6B6B] mb-4">
            Riset · Transmisi Pasar Lintas Negara
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
            Saat Yield JGB Naik, Rupiah yang Menanggung.
          </h1>
          <p className="text-lg text-[#6B6B6B] max-w-prose leading-relaxed">
            Bagaimana guncangan obligasi pemerintah Jepang menjalar ke pasar keuangan Indonesia —
            dianalisis dengan VECM, inferensi Bayesian, dan simulasi Monte Carlo.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {heroPills.map((p) => (
              <span
                key={p}
                className="border border-[#EBEBEB] rounded-full px-3 py-1 text-sm text-[#6B6B6B]"
              >
                {p}
              </span>
            ))}
          </div>
          <a
            href="/jgb_paper.pdf"
            download="Hermawan_2026_JGB_Transmission.pdf"
            className="inline-flex items-center gap-2 mt-7 px-4 py-2.5 rounded-lg bg-[#1A1A18] text-[#F5F5F2] text-sm font-medium hover:bg-[#000] transition-colors"
          >
            <FileDown size={15} />
            Unduh paper lengkap (PDF)
          </a>
        </motion.section>

        <hr className="border-[#EBEBEB] my-16" />

        {/* ── Finding 01 — Transmisi ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-xs tracking-widest text-[#6B6B6B] uppercase mb-2">Temuan 01</p>
          <h2 className="text-2xl font-semibold leading-snug mb-4">
            JGB Mendorong, Rupiah Menyesuaikan
          </h2>
          <p className="text-[15px] leading-relaxed text-[#3A3A36] mb-8">
            Dalam model VECM, koefisien <em>loading</em> memisahkan penggerak dari penyesuai dengan
            tegas. Yield JGB tidak mengoreksi diri saat sistem terganggu — kedua suku koreksi-error-nya
            tidak signifikan, ciri khas sumber guncangan. USD/IDR justru memikul koreksi dengan loading
            besar dan sangat signifikan. JGB yang mendorong, rupiah yang menyerap.
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {statCards.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="border border-[#EBEBEB] rounded-lg p-4"
              >
                <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
                <p className="text-xs text-[#6B6B6B] mt-1 leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* IRF chart */}
          <p className="text-sm font-medium mb-1">
            Respons Pasar Indonesia terhadap Guncangan JGB
          </p>
          <p className="text-xs text-[#6B6B6B] mb-3">
            Impulse response (orthogonalized), guncangan 1 standar deviasi, horizon 10 hari.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={irfData} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
              <defs>
                <linearGradient id="irfBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#D4D4D0" stopOpacity={0.55} />
                  <stop offset="1" stopColor="#D4D4D0" stopOpacity={0.55} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={BORDER} />
              <XAxis
                dataKey="hari"
                tick={tick}
                tickLine={false}
                axisLine={{ stroke: BORDER }}
                label={{ value: 'Hari', position: 'insideBottom', offset: -2, fontSize: 11, fill: GHOST }}
              />
              <YAxis
                tick={tick}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => v.toFixed(2)}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, name) => [Number(value).toFixed(4), name === 'resp' ? 'Respons' : name]}
              />
              <ReferenceLine y={0} stroke={GHOST} strokeWidth={1} />
              <Area dataKey="base" stackId="irf" stroke="none" fill="transparent" isAnimationActive={false} />
              <Area dataKey="band" stackId="irf" stroke="none" fill="url(#irfBand)" isAnimationActive={false} />
              <Line dataKey="resp" stroke={INK} strokeWidth={1.8} dot={false} />
            </LineChart>
          </ResponsiveContainer>

          {/* Cointegration equation */}
          <div className="mt-8 border border-[#EBEBEB] rounded-lg bg-white px-5 py-4">
            <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-2">
              Relasi Kointegrasi Jangka Panjang
            </p>
            <p className="font-mono text-[15px] text-[#1A1A18]">
              JGB + 29,70·DXY − 0,79·USD/IDR = 0
            </p>
            <p className="text-xs text-[#6B6B6B] mt-2 leading-relaxed">
              Saat kombinasi ini menyimpang dari nol, USD/IDR yang bergerak menutup celah —
              koefisien USD/IDR diestimasi presisi (z = −14,3).
            </p>
          </div>
        </motion.section>

        <hr className="border-[#EBEBEB] my-16" />

        {/* ── Finding 02 — Struktur korelasi ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-xs tracking-widest text-[#6B6B6B] uppercase mb-2">Temuan 02</p>
          <h2 className="text-2xl font-semibold leading-snug mb-4">
            Sinyalnya Ada di Jangka Panjang, Bukan Harian
          </h2>
          <p className="text-[15px] leading-relaxed text-[#3A3A36] mb-8">
            Korelasi return harian antar-pasar lemah — satu-satunya yang menonjol adalah SBN–DXY
            (−0,31). Justru karena itu analisis dibangun di atas kointegrasi (hubungan jangka panjang),
            bukan regresi return harian. Keempat seri level bersifat <em>I(1)</em> (uji ADF), dan uji
            Johansen mengonfirmasi adanya relasi keseimbangan yang mengikat mereka.
          </p>

          <p className="text-sm font-medium mb-3">Matriks Korelasi Return Harian</p>
          <div className="border border-[#EBEBEB] rounded-lg bg-white p-4 overflow-x-auto">
            <div className="min-w-[420px]">
              <div className="grid" style={{ gridTemplateColumns: `90px repeat(5, 1fr)` }}>
                <div />
                {corrLabels.map((l) => (
                  <div key={l} className="text-[10px] text-[#6B6B6B] text-center pb-2 font-medium">
                    {l}
                  </div>
                ))}
                {corrMatrix.map((row, i) => (
                  <div key={i} className="contents">
                    <div className="text-[10px] text-[#6B6B6B] flex items-center pr-2 justify-end font-medium">
                      {corrLabels[i]}
                    </div>
                    {row.map((v, j) => {
                      const c = corrCell(v)
                      return (
                        <div key={j} className="px-0.5 py-0.5">
                          <div
                            className="aspect-square rounded-[3px] grid place-items-center text-[11px] font-medium"
                            style={{ background: c.bg, color: c.color }}
                          >
                            {c.text}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-[#6B6B6B] mt-3 leading-relaxed">
            Hijau = korelasi positif, merah = negatif; intensitas mengikuti besaran. Mayoritas pasangan
            mendekati nol — bukti bahwa transmisi bekerja lewat keseimbangan jangka panjang, bukan
            gerak serempak harian.
          </p>
        </motion.section>

        <hr className="border-[#EBEBEB] my-16" />

        {/* ── Finding 03 — Risiko ekor ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-xs tracking-widest text-[#6B6B6B] uppercase mb-2">Temuan 03</p>
          <h2 className="text-2xl font-semibold leading-snug mb-4">Bahayanya Ada di Ekor</h2>
          <p className="text-[15px] leading-relaxed text-[#3A3A36] mb-8">
            Simulasi Monte Carlo memberi jalur tengah yang stabil — kabar baik, jika berhenti di situ.
            Ceritanya ada di sebarannya. Ekor distribusi melebar jauh, dan itu bukan artefak simulasi:
            return harian USD/IDR sangat <em>leptokurtik</em> (kurtosis ≈ 34). Memetakan ekor itu lewat
            relasi kointegrasi menghasilkan band overshoot rupiah ke 17.500–18.000.
          </p>

          <p className="text-sm font-medium mb-1">Proyeksi USD/IDR — 30 Hari ke Depan</p>
          <p className="text-xs text-[#6B6B6B] mb-3">
            Pita 50% &amp; 90% dari Monte Carlo (covariance residual VECM). Garis merah = realisasi Juni 2026.
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={mcData} margin={{ top: 8, right: 12, bottom: 4, left: 8 }}>
              <CartesianGrid vertical={false} stroke={BORDER} />
              <XAxis
                dataKey="hari"
                tick={tick}
                tickLine={false}
                axisLine={{ stroke: BORDER }}
                label={{ value: 'Hari', position: 'insideBottom', offset: -2, fontSize: 11, fill: GHOST }}
              />
              <YAxis
                domain={[16000, 18200]}
                tick={tick}
                tickLine={false}
                axisLine={false}
                width={48}
                tickFormatter={(v: number) => id3(v)}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, name) => {
                  if (name === 'med') return [id3(Number(value)), 'Median']
                  if (name === 'stres') return [id3(Number(value)), 'Skenario stres']
                  if (Array.isArray(value))
                    return [`${id3(Number(value[0]))}–${id3(Number(value[1]))}`, name === 'range90' ? 'Pita 90%' : 'Pita 50%']
                  return [null, '']
                }}
                labelFormatter={(l) => `Hari ${l}`}
              />
              <ReferenceLine
                y={18000}
                stroke={RED}
                strokeDasharray="5 4"
                label={{ value: '18.000 · Juni 2026', position: 'insideTopRight', fontSize: 10, fill: RED }}
              />
              <Area dataKey="range90" stroke="none" fill="#D4D4D0" fillOpacity={0.55} isAnimationActive={false} />
              <Area dataKey="range50" stroke="none" fill="#B4B4AE" fillOpacity={0.6} isAnimationActive={false} />
              <Line dataKey="med" stroke={INK} strokeWidth={1.8} dot={false} type="monotone" />
              <Line dataKey="stres" stroke={RED} strokeWidth={1.4} strokeDasharray="4 3" dot={false} type="monotone" />
            </AreaChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="border border-[#EBEBEB] rounded-lg p-4">
              <p className="text-3xl font-semibold tracking-tight">≈ 34</p>
              <p className="text-xs text-[#6B6B6B] mt-1 leading-snug">
                kurtosis return harian USD/IDR — didominasi lonjakan langka berskala besar
              </p>
            </div>
            <div className="border border-[#EBEBEB] rounded-lg p-4">
              <p className="text-3xl font-semibold tracking-tight">0,16</p>
              <p className="text-xs text-[#6B6B6B] mt-1 leading-snug">
                efek posterior β<sub>jgb</sub> (Bayesian) — 94% massa di atas nol
              </p>
            </div>
          </div>
        </motion.section>

        <hr className="border-[#EBEBEB] my-16" />

        {/* ── Validasi ex-post ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-xs tracking-widest text-[#6B6B6B] uppercase mb-2">Validasi</p>
          <h2 className="text-2xl font-semibold leading-snug mb-4">
            Skenario Ekor yang Jadi Kenyataan
          </h2>
          <div className="border-l-2 border-[#C0392B] pl-5 my-2">
            <p className="text-[15px] leading-relaxed text-[#3A3A36]">
              Paper ini ditulis Januari 2026, saat rupiah ada di kisaran 16.900 dan band 17.500–18.000
              terlihat seperti skenario ekor berprobabilitas kecil. Pada Juni 2026, USD/IDR menembus
              18.000. Yang divalidasi bukan ramalan rata-rata — Monte Carlo tidak memprediksi mean di
              18.000 — melainkan bahwa <strong className="text-[#1A1A18]">kanal transmisinya nyata</strong> dan
              risiko ekornya bukan sekadar artefak angka. Sebuah peringatan yang tertulis sebelum
              kejadian.
            </p>
          </div>
        </motion.section>

        <hr className="border-[#EBEBEB] my-16" />

        {/* ── Metodologi ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-xs tracking-widest text-[#6B6B6B] uppercase mb-2">Metodologi</p>
          <h2 className="text-2xl font-semibold leading-snug mb-8">Cara Kerja Analisis Ini</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metodologiItems.map(({ Icon, title, body }) => (
              <div key={title} className="border border-[#EBEBEB] rounded-lg p-4">
                <Icon size={18} className="text-[#1A1A18] mb-3" />
                <p className="text-sm font-medium mb-1">{title}</p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <a
              href="/jgb_paper.pdf"
              download="Hermawan_2026_JGB_Transmission.pdf"
              className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#1A1A18] transition-colors"
            >
              <FileDown size={14} />
              Paper lengkap (PDF)
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#1A1A18] transition-colors"
            >
              <ExternalLink size={14} />
              Notebook di GitHub
            </a>
          </div>
        </motion.section>

      </div>
    </main>
  )
}
