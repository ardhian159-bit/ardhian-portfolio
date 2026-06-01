'use client'

import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  Cell,
} from 'recharts'
import type { LucideIcon } from 'lucide-react'
import { Database, Zap, Shield, ExternalLink } from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const gajiData = [
  { provinsi: 'Jawa Timur', gaji: 120000000 },
  { provinsi: 'Papua Pegunungan', gaji: 92000000 },
  { provinsi: 'Papua', gaji: 92000000 },
  { provinsi: 'Jambi', gaji: 88000000 },
  { provinsi: 'Maluku Utara', gaji: 60000000 },
  { provinsi: 'Papua Tengah', gaji: 60000000 },
  { provinsi: 'Papua Barat', gaji: 52000000 },
  { provinsi: 'Sumatera Utara', gaji: 48000000 },
  { provinsi: 'Kalimantan Tengah', gaji: 40000000 },
  { provinsi: 'Papua Selatan', gaji: 36000000 },
]

const ghostSchools = [
  { nama: 'SPNF SKB Kerinci', guru: 10 },
  { nama: 'SMP Negeri 03 Belitang III', guru: 9 },
  { nama: 'SD Negeri 3 Candi', guru: 8 },
  { nama: 'SMP Negeri 58 Tanjung Jabung Barat', guru: 8 },
  { nama: 'SD Negeri Inpres Agisiga', guru: 7 },
  { nama: 'SD Negeri 2 Glinggangan', guru: 7 },
  { nama: 'SKHN 1 Marikit', guru: 6 },
  { nama: 'TK Kristoferus', guru: 6 },
  { nama: 'UPTD SD Negeri 2 Trisinar', guru: 5 },
  { nama: 'SD Negeri Talang Unggar', guru: 5 },
]

const rasioData = [
  { provinsi: 'Papua Pegunungan', rasio: 28.0 },
  { provinsi: 'Jawa Barat', rasio: 23.3 },
  { provinsi: 'DKI Jakarta', rasio: 22.6 },
  { provinsi: 'Banten', rasio: 22.5 },
  { provinsi: 'Papua Tengah', rasio: 19.8 },
  { provinsi: 'Kepulauan Riau', rasio: 18.1 },
  { provinsi: 'Kepulauan Bangka Belitung', rasio: 17.8 },
  { provinsi: 'Jawa Tengah', rasio: 17.6 },
  { provinsi: 'Papua Selatan', rasio: 17.3 },
  { provinsi: 'Bali', rasio: 16.7 },
  { provinsi: 'Kalimantan Timur', rasio: 16.1 },
  { provinsi: 'Jawa Timur', rasio: 16.0 },
  { provinsi: 'Yogyakarta', rasio: 15.5 },
  { provinsi: 'Sumatera Selatan', rasio: 14.9 },
  { provinsi: 'Lampung', rasio: 14.8 },
  { provinsi: 'Kalimantan Barat', rasio: 14.5 },
  { provinsi: 'Riau', rasio: 14.4 },
  { provinsi: 'Papua', rasio: 14.0 },
  { provinsi: 'Kalimantan Utara', rasio: 13.4 },
  { provinsi: 'Sumatera Utara', rasio: 13.3 },
  { provinsi: 'Sulawesi Selatan', rasio: 12.9 },
  { provinsi: 'Sumatera Barat', rasio: 12.9 },
  { provinsi: 'Kalimantan Selatan', rasio: 12.9 },
  { provinsi: 'Jambi', rasio: 12.4 },
  { provinsi: 'Gorontalo', rasio: 12.4 },
  { provinsi: 'Papua Barat', rasio: 11.8 },
  { provinsi: 'Bengkulu', rasio: 11.2 },
  { provinsi: 'Sulawesi Tengah', rasio: 11.2 },
  { provinsi: 'Nusa Tenggara Barat', rasio: 10.8 },
  { provinsi: 'Kalimantan Tengah', rasio: 10.8 },
  { provinsi: 'Sulawesi Utara', rasio: 10.5 },
  { provinsi: 'Nusa Tenggara Timur', rasio: 10.2 },
  { provinsi: 'Papua Barat Daya', rasio: 10.2 },
  { provinsi: 'Sulawesi Barat', rasio: 9.9 },
  { provinsi: 'Maluku Utara', rasio: 9.6 },
  { provinsi: 'Sulawesi Tenggara', rasio: 9.6 },
  { provinsi: 'Aceh', rasio: 9.5 },
  { provinsi: 'Maluku', rasio: 9.3 },
]

const benfordData = [
  { digit: '1', aktual: 31.04, benford: 30.10 },
  { digit: '2', aktual: 19.55, benford: 17.61 },
  { digit: '3', aktual: 13.78, benford: 12.49 },
  { digit: '4', aktual: 9.30, benford: 9.69 },
  { digit: '5', aktual: 7.00, benford: 7.92 },
  { digit: '6', aktual: 5.87, benford: 6.69 },
  { digit: '7', aktual: 5.04, benford: 5.80 },
  { digit: '8', aktual: 4.42, benford: 5.12 },
  { digit: '9', aktual: 3.99, benford: 4.58 },
]

// ─── Constants ───────────────────────────────────────────────────────────────

const statCards = [
  { value: '47', label: 'sekolah hantu' },
  { value: '197', label: 'guru terdampar' },
  { value: 'Rp 788 jt', label: 'potensi pemborosan/bulan' },
]

const heroPills = ['47 sekolah hantu', '197 guru terdampar', 'Rp 788 juta/bulan']

interface MetodologiItem {
  Icon: LucideIcon
  title: string
  body: string
}

const metodologiItems: MetodologiItem[] = [
  {
    Icon: Database,
    title: 'Sumber Data',
    body: 'Dapodik (Data Pokok Pendidikan) Kemendikbud. 38 provinsi, 450.000+ sekolah, diakses via scraping Python.',
  },
  {
    Icon: Zap,
    title: 'Query Engine',
    body: 'DuckDB di Google Colab — SQL langsung di atas CSV 450K baris tanpa server database.',
  },
  {
    Icon: Shield,
    title: 'Validasi',
    body: "Benford's Law audit pada distribusi digit pertama jumlah siswa untuk mendeteksi anomali sistemik.",
  },
]

// ─── Shared chart tick style ──────────────────────────────────────────────────

const tick = { fontSize: 11, fill: '#6B6B6B', fontFamily: 'var(--font-dm-sans)' } as const
const tooltipStyle = {
  fontSize: 12,
  borderColor: '#EBEBEB',
  borderRadius: 6,
  fontFamily: 'var(--font-dm-sans)',
} as const

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DuckDBPage() {
  return (
    <main className="bg-[#F5F5F2] text-[#1A1A18] antialiased font-[family-name:var(--font-dm-sans)]">
      <div className="max-w-[720px] mx-auto px-6 py-24">

        {/* ── Hero ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            450.000 Sekolah.<br />Tapi Tidak Semua Nyata.
          </h1>
          <p className="text-lg text-[#6B6B6B] mt-4 max-w-prose leading-relaxed">
            Analisis data Dapodik nasional menggunakan DuckDB dan Python —
            menemukan anomali dalam sistem pendidikan Indonesia.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {heroPills.map((pill) => (
              <span
                key={pill}
                className="border border-[#EBEBEB] rounded-full px-3 py-1 text-sm text-[#6B6B6B]"
              >
                {pill}
              </span>
            ))}
          </div>
        </motion.section>

        <hr className="border-[#EBEBEB] my-16" />

        {/* ── Section 1 — Sekolah Hantu ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-xs tracking-widest text-[#6B6B6B] uppercase mb-2">Finding 01</p>
          <h2 className="text-2xl font-semibold leading-snug mb-4">
            Sekolah yang Terdaftar tapi Tidak Beroperasi
          </h2>
          <p className="text-[#6B6B6B] leading-relaxed">
            Dari seluruh sekolah negeri dalam data Dapodik, kami menemukan 47 sekolah
            dengan nol siswa namun masih memiliki lebih dari 2 guru atau pegawai aktif.
            Kami menyebut ini sekolah hantu — terdaftar, dibiayai, tapi kosong.
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            {statCards.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="border border-[#EBEBEB] rounded-lg p-4"
              >
                <p className="text-3xl font-semibold">{s.value}</p>
                <p className="text-sm text-[#6B6B6B] mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Gaji chart */}
          <p className="text-sm font-medium mb-3">
            Estimasi Beban Gaji Tidak Produktif per Provinsi
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={gajiData}
              layout="vertical"
              margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
            >
              <CartesianGrid horizontal={false} stroke="#EBEBEB" />
              <XAxis
                type="number"
                tickFormatter={(v) => `Rp ${(v as number) / 1_000_000} jt`}
                tick={tick}
                tickLine={false}
                axisLine={{ stroke: '#EBEBEB' }}
              />
              <YAxis
                type="category"
                dataKey="provinsi"
                width={160}
                tick={tick}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(v) => [`Rp ${((v as number) / 1_000_000).toFixed(0)} jt`, 'Estimasi Gaji']}
                contentStyle={tooltipStyle}
              />
              <Bar dataKey="gaji" fill="#1A1A18" radius={[0, 2, 2, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>

          {/* Ghost school table */}
          <p className="text-sm font-medium mt-8 mb-3">
            Top 10 Sekolah dengan Guru Terbanyak, Siswa Nol
          </p>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-xs uppercase text-[#6B6B6B] pb-2 font-medium">
                  Nama Sekolah
                </th>
                <th className="text-left text-xs uppercase text-[#6B6B6B] pb-2 font-medium">
                  Guru
                </th>
                <th className="text-left text-xs uppercase text-[#6B6B6B] pb-2 font-medium">
                  Siswa
                </th>
              </tr>
            </thead>
            <tbody>
              {ghostSchools.map((s) => (
                <tr key={s.nama} className="border-b border-[#EBEBEB]">
                  <td className="py-2 text-sm">{s.nama}</td>
                  <td className="py-2 text-sm">{s.guru}</td>
                  <td className="py-2 text-sm text-red-500 font-medium">0</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-[#6B6B6B] leading-relaxed mt-6">
            Dengan asumsi konservatif Rp 4 juta per guru per bulan, total estimasi
            beban gaji yang berpotensi tidak produktif mencapai{' '}
            <strong className="text-[#1A1A18]">Rp 788 juta</strong> setiap bulan — hanya
            dari 47 sekolah ini.
          </p>
        </motion.section>

        <hr className="border-[#EBEBEB] my-16" />

        {/* ── Section 2 — Ketimpangan Beban Guru ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-xs tracking-widest text-[#6B6B6B] uppercase mb-2">Finding 02</p>
          <h2 className="text-2xl font-semibold leading-snug mb-4">
            Satu Guru, 28 Murid. Guru Lain, Tidak Ada.
          </h2>
          <p className="text-[#6B6B6B] leading-relaxed mb-6">
            Rasio murid-guru nasional menyimpan ketimpangan yang ekstrem. Papua Pegunungan
            mencatat rasio tertinggi: satu guru menanggung rata-rata 28 murid. Di sisi lain,
            Maluku hanya 9.3 — hampir sepertiga beban. Ironisnya, Papua Pegunungan juga
            masuk daftar provinsi dengan guru terdampar di sekolah hantu.
          </p>

          <p className="text-sm font-medium mb-3">
            Rasio Murid per Guru — Sekolah Negeri, per Provinsi
          </p>
          <ResponsiveContainer width="100%" height={560}>
            <BarChart
              data={rasioData}
              layout="vertical"
              margin={{ top: 0, right: 32, bottom: 24, left: 0 }}
            >
              <CartesianGrid horizontal={false} stroke="#EBEBEB" />
              <XAxis
                type="number"
                label={{
                  value: 'Rasio Murid per Guru',
                  position: 'insideBottom',
                  offset: -12,
                  fontSize: 11,
                  fill: '#6B6B6B',
                }}
                tick={tick}
                tickLine={false}
                axisLine={{ stroke: '#EBEBEB' }}
              />
              <YAxis
                type="category"
                dataKey="provinsi"
                width={180}
                tick={{ fontSize: 10, fill: '#6B6B6B', fontFamily: 'var(--font-dm-sans)' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(v) => [(v as number).toFixed(1), 'Rasio Murid/Guru']}
                contentStyle={tooltipStyle}
              />
              <ReferenceLine
                x={14}
                stroke="#EBEBEB"
                strokeDasharray="4 4"
                label={{
                  value: 'Rata-rata nasional ~14',
                  position: 'insideTopRight',
                  fontSize: 10,
                  fill: '#6B6B6B',
                }}
              />
              <Bar dataKey="rasio" radius={[0, 2, 2, 0]} barSize={10}>
                {rasioData.map((entry, i) => (
                  <Cell
                    key={`cell-${i}`}
                    fill={entry.rasio >= 20 ? '#1A1A18' : entry.rasio >= 15 ? '#6B6B6B' : '#D4D4D0'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <p className="text-[#6B6B6B] leading-relaxed mt-6">
            Kesenjangan tiga kali lipat antara provinsi terpadat dan terlonggar
            mencerminkan distribusi guru yang belum merata secara nasional.
            Redistribusi berbasis data seperti analisis ini adalah langkah pertama
            menuju alokasi yang lebih adil.
          </p>
        </motion.section>

        <hr className="border-[#EBEBEB] my-16" />

        {/* ── Section 3 — Audit Benford ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-xs tracking-widest text-[#6B6B6B] uppercase mb-2">Finding 03</p>
          <h2 className="text-2xl font-semibold leading-snug mb-4">
            Apakah Data Ini Bisa Dipercaya?
          </h2>
          <p className="text-[#6B6B6B] leading-relaxed mb-6">
            Hukum Benford menyatakan bahwa dalam dataset alami yang besar, digit pertama
            sebuah angka cenderung mengikuti distribusi logaritmik — angka 1 muncul
            sekitar 30% dari waktu, bukan 11% seperti yang diharapkan secara acak.
            Penyimpangan dari pola ini sering menjadi sinyal awal manipulasi data.
          </p>

          <p className="text-sm font-medium mb-3">
            Distribusi Digit Pertama Jumlah Siswa vs Ekspektasi Benford
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={benfordData}
              margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
              barCategoryGap="30%"
              barGap={2}
            >
              <CartesianGrid vertical={false} stroke="#EBEBEB" />
              <XAxis
                dataKey="digit"
                tick={tick}
                tickLine={false}
                axisLine={{ stroke: '#EBEBEB' }}
              />
              <YAxis
                tickFormatter={(v) => `${v}`}
                label={{ value: '%', position: 'insideTopLeft', offset: 0, fontSize: 11, fill: '#6B6B6B' }}
                tick={tick}
                tickLine={false}
                axisLine={false}
                domain={[0, 35]}
              />
              <Tooltip
                formatter={(v) => [`${v}%`]}
                contentStyle={tooltipStyle}
              />
              <Legend
                iconType="square"
                iconSize={10}
                wrapperStyle={{ fontSize: 12, paddingTop: 12, fontFamily: 'var(--font-dm-sans)' }}
              />
              <Bar dataKey="aktual" name="Aktual" fill="#1A1A18" radius={[2, 2, 0, 0]} />
              <Bar dataKey="benford" name="Ekspektasi" fill="#D4D4D0" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="border-l-2 border-[#1A1A18] pl-4 my-6 text-[#6B6B6B] leading-relaxed text-sm">
            Data Dapodik mengikuti Hukum Benford dengan deviasi yang sangat kecil.
            Temuan ini justru memperkuat kredibilitas anomali sekolah hantu — bukan
            artifact dari data yang dimanipulasi, melainkan realita yang memang ada
            di lapangan.
          </div>
        </motion.section>

        <hr className="border-[#EBEBEB] my-16" />

        {/* ── Section 4 — Metodologi ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-xs tracking-widest text-[#6B6B6B] uppercase mb-2">Metodologi</p>
          <h2 className="text-2xl font-semibold leading-snug mb-8">
            Cara Kerja Analisis Ini
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metodologiItems.map(({ Icon, title, body }) => (
              <div key={title} className="border border-[#EBEBEB] rounded-lg p-4">
                <Icon size={18} className="text-[#1A1A18] mb-3" />
                <p className="text-sm font-medium mb-1">{title}</p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#1A1A18] transition-colors"
            >
              <ExternalLink size={14} />
              Lihat Notebook di GitHub
            </a>
          </div>
        </motion.section>

      </div>
    </main>
  )
}
