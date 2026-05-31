'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ProseSection, Eq, Cite } from '@/components/situationship/ProseSection'
import { DecayCurve } from '@/components/situationship/DecayCurve'
import { NashMatrix } from '@/components/situationship/NashMatrix'
import { BayesChart } from '@/components/situationship/BayesChart'
import { ThresholdChart } from '@/components/situationship/ThresholdChart'
import { OutcomeViz } from '@/components/situationship/OutcomeViz'
import { Heatmap } from '@/components/situationship/Heatmap'
import { RakaJourney } from '@/components/situationship/RakaJourney'
import { SummaryCard } from '@/components/situationship/SummaryCard'

const vizRegistry: Record<string, ReactNode> = {
  decay: <DecayCurve />,
  nash: <NashMatrix />,
  bayes: <BayesChart />,
  threshold: <ThresholdChart />,
  outcome: <OutcomeViz />,
  heatmap: <Heatmap />,
  raka: <RakaJourney />,
  summary: <SummaryCard />,
}

export default function SituationshipPage() {
  const [activeViz, setActiveViz] = useState<string>('decay')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section')
            if (id) setActiveViz(id)
          }
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="bg-[#F5F5F2] text-[#1A1A18] antialiased">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 max-w-4xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase text-[#6B6B6B] mb-6">
          Research Paper · 2026
        </p>
        <h1 className="text-4xl md:text-5xl font-light leading-tight tracking-tight">
          Optimal Stopping in
          <br />
          Romantic Ambiguity
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#3A3A36]">
          A Bayesian game-theoretic analysis with Monte Carlo simulation of situationship
          dynamics — modelling when, exactly, one should stop waiting.
        </p>
        <div className="mt-10 text-sm text-[#6B6B6B] leading-relaxed">
          <p className="text-[#1A1A18]">
            Ardhian Caesar Hermawan
          </p>
          <p>Economics Development, Universitas Negeri Malang</p>
          <p className="mt-2 italic">Prior literature: Nahadi (2026a, 2026b)</p>
        </div>
        <a
          href="/paper.pdf"
          download="Hermawan_2026_Optimal_Stopping_Romantic_Ambiguity.pdf"
          className="inline-flex items-center gap-2 mt-6 px-4 py-2 border border-[#1A1A18] text-sm text-[#1A1A18] hover:bg-[#1A1A18] hover:text-[#F5F5F2] transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download Paper (PDF)
        </a>

        <div className="mt-16 flex items-center gap-2 text-[#6B6B6B]">
          <ChevronDown className="w-4 h-4 animate-bounce" />
          <span className="font-mono text-xs">Scroll to read</span>
        </div>
      </section>

      {/* Body: two-column sticky scroll */}
      <div ref={containerRef} className="grid md:grid-cols-2 max-w-7xl mx-auto">
        {/* Left: prose */}
        <div>
          <ProseSection id="decay" mobileViz={<DecayCurve />}>
            <h2 className="text-2xl font-light tracking-tight">Minggu 0: S₀ = 100%</h2>
            <p>
              Mereka ketemu di minggu ke-0. Agendanya standar: night drive gabut, muter playlist
              Spotify yang sama, terus ada momen pas lampu merah di mana dua-duanya ngerasa ada
              spark. Tapi ya gitu, piala tertinggi era sekarang adalah gengsi. Ga ada yang berani
              confess. Situationship resmi dimulai.
            </p>
            <p>
              Dua orang yang, kalau minjem istilah Nahadi (2026a), baru aja menginisialisasi{' '}
              <Eq>S₀ = 100%</Eq>. Structural integrity lagi penuh-penuhnya. Honeymoon phase. Raka
              masih bales WA dalam hitungan menit, ga pake taktik replying time.
            </p>
            <p>
              Tapi rumus peluruhan eksponensial tidak pernah tidur:{' '}
              <Eq>S(t) = 100 · e^(−0.15t)</Eq>. Decay berjalan di latar belakang tanpa notifikasi
              push, tanpa drama, tanpa ada yang sadar kalau tangki ketertarikan mereka sedang bocor
              halus.
            </p>
          </ProseSection>

          <ProseSection id="nash" mobileViz={<NashMatrix />}>
            <h2 className="text-2xl font-light tracking-tight">Kenapa Mereka Diam: Game Theory</h2>
            <p>
              Raka mau serius. Dira sebenarnya juga. Tapi dua-duanya milih mode cool dan jaga
              jarak. Ini bukan karena ga ada rasa, tapi karena di pasar interpersonal modern,
              komitmen duluan itu high risk.
            </p>
            <p>
              Kalau Raka all-in menyatakan perasaan tapi Dira ternyata cuma gabut, Raka harus
              membayar vulnerability cost sebesar <Eq>c = 6</Eq> — artinya dipermalukan, rontok,
              dan resmi jadi badut sendirian di second account teman-temannya.
            </p>
            <p>
              <Eq>NE₁</Eq> (Commit, Commit): hasil terbaik untuk berdua. <Eq>NE₂</Eq> (Vague,
              Vague): hasil paling aman buat ego masing-masing. Batas indifference <Eq>x*</Eq>{' '}
              ketemu di angka <Eq>0.692</Eq>. Raka harus yakin minimal 69.2% dulu bahwa Dira bakal
              menerima cintanya sebelum dia berani gerak. Karena keyakinannya belum sampai di sana,
              dia milih diam.
            </p>
          </ProseSection>

          <ProseSection id="bayes" mobileViz={<BayesChart />}>
            <h2 className="text-2xl font-light tracking-tight">Minggu 1–6: Ngumpulin Bukti</h2>
            <p>
              Raka memulai dengan prior belief <Eq>p = 0.30</Eq> — dia cuma 30% yakin kalau Dira
              beneran tertarik. Realistis? Mungkin. Pengecut? Sangat mungkin.
            </p>
            <p>
              Minggu 1: Dira WA duluan nanya &ldquo;Udah makan?&rdquo; → Sinyal positif, posterior
              naik ke <Eq>0.44</Eq>. Minggu 2: Dira dateng on-time, gercep bayar kopi duluan →
              Naik ke <Eq>0.60</Eq>. Raka mulai senyum-senyum sendiri. Minggu 3: Dira active di
              Instagram jam 11 malam, tapi chat Raka dari jam 9 cuma di-read → Sinyal negatif,
              posterior drop ke <Eq>0.45</Eq>.
            </p>
            <p>
              Satu sinyal negatif bisa langsung menghapus kerja keras dua minggu sinyal positif.
              Karena <Eq>q_H = 0.65</Eq> dan <Eq>q_L = 0.35</Eq> terlalu mepet — tipe yang
              beneran tertarik sama tipe yang cuma kesepian kelihatan mirip banget dari luar.
            </p>
          </ProseSection>

          <ProseSection id="threshold" mobileViz={<ThresholdChart />}>
            <h2 className="text-2xl font-light tracking-tight">Threshold yang Naik, Prize yang Menyusut</h2>
            <p>
              Masuk minggu ke-5, posterior Raka akhirnya nembus <Eq>0.65</Eq>. Dia udah megang HP,
              udah ngetik draf teks: &ldquo;Gue mau ngomong sesuatu deh...&rdquo; Tapi otaknya
              ngerem: &ldquo;Tunggu seminggu lagi deh, buat konfirmasi.&rdquo;
            </p>
            <p>
              Minggu 6: Dira cancel janji jalan Sabtu sore tanpa ngasih alternatif hari lain.
              Sinyal negatif. Posterior terjun bebas ke <Eq>0.52</Eq>. Draf dihapus bersih. Raka
              balik mode jaim.
            </p>
            <p>
              Yang Raka ga tahu: <Eq>p*(t)</Eq> naik terus setiap minggu dia menunda. Bukan karena
              standarnya berubah — tapi karena <Eq>u · S(t)</Eq> menyusut. Prize dari komitmen
              berkurang nilainya kalau kelamaan digantung.{' '}
              <Cite>
                Semakin lama lo nunggu, semakin tinggi bar yang harus lo capai, padahal hadiah di
                ujungnya udah makin hambar.
              </Cite>
            </p>
          </ProseSection>

          <ProseSection id="outcome" mobileViz={<OutcomeViz />}>
            <h2 className="text-2xl font-light tracking-tight">10.000 Semesta Raka dan Dira</h2>
            <p>
              Monte Carlo menjalankan 10.000 versi alternatif dari cerita mereka.
            </p>
            <p>
              <strong>2.070 semesta (20.7%)</strong>: Raka berani gerak cepet, Dira emang tipe
              θ_H, mereka resmi pacaran. <strong>750 semesta (7.5%)</strong>: Raka nekat ngomong,
              tapi Dira θ_L. One-sided rejection. <strong>7.180 semesta (71.8%)</strong>: Ga ada
              yang bersuara. Decay menutup cerita di minggu ke-10.73.
            </p>
            <p>
              Pahitnya, di sebagian besar dari 7.180 semesta yang gagal itu — Dira-nya padahal
              θ_H. Mereka berdua sama-sama mau, tapi dua-duanya nganut prinsip &ldquo;siapa yang
              gerak duluan dia kalah.&rdquo; Raka versi myopic baru ngomong di minggu{' '}
              <Eq>9.14</Eq>. Raka versi optimal di minggu <Eq>5.57</Eq>. Selisih{' '}
              <strong>−3.57 minggu</strong> yang dibuang percuma untuk menunggu sinyal yang tidak
              akan pernah cukup jelas.
            </p>
          </ProseSection>

          <ProseSection id="heatmap" mobileViz={<Heatmap />}>
            <h2 className="text-2xl font-light tracking-tight">Peta Keputusan: Di Mana Raka Tinggal</h2>
            <p>
              Nasib hubungan lo ditentukan dua variabel: <Eq>c</Eq> (seberapa gengsi lo kelihatan
              bego kalau ditolak) dan <Eq>p</Eq> (seberapa pede lo dari awal).
            </p>
            <p>
              Kalau <Eq>c</Eq> kecil — commit minggu 1, tidak perlu sinyal tambahan. Kalau{' '}
              <Eq>c</Eq> gede dan <Eq>p</Eq> rendah: terjebak di sudut kiri atas. Menunggu
              pembuktian yang tidak akan pernah datang sebelum Ghosting Event Horizon menjemput.
            </p>
            <p>
              Raka tinggal di sana — <Eq>c = 12</Eq>, <Eq>p = 0.20–0.30</Eq>.{' '}
              <strong>The Raka Region.</strong> Tempat di mana satu-satunya pilihan rational adalah
              bergerak sangat awal, atau tidak sama sekali. Karena menunggu hanya menaikkan bar
              yang sudah tidak bisa dicapai.
            </p>
          </ProseSection>

          <ProseSection id="raka" mobileViz={<RakaJourney />}>
            <h2 className="text-2xl font-light tracking-tight">Minggu 9.14: Terlambat Tepat Waktu</h2>
            <p>
              Minggu 7, 8, 9 — interaksi dari Dira hangat lagi. Posterior Raka naik beruntun:{' '}
              <Eq>0.67</Eq>, <Eq>0.71</Eq>, <Eq>0.73</Eq>. Stabil di atas threshold. Raka
              memantapkan hati.
            </p>
            <p>
              Tapi Raka salah baca data. Yang dia kira kehangatan baru itu sebenarnya sisa-sisa
              kesopanan dari seseorang yang proses Bayesian updating-nya sudah selesai. Di minggu
              ke-6, pas Dira ngetes ombak dan Raka cuma bales flat{' '}
              &ldquo;Oke, gak apa-apa kok&rdquo; — Dira udah menutup buku.
            </p>
            <p>
              Minggu <Eq>9.14</Eq>, Raka akhirnya ngomong. Dira menggelengkan kepala. Saat itu{' '}
              <Eq>S(9.14) = 25.3%</Eq>. Pembicaraan rasional datang tepat waktu secara teknis —{' '}
              <Cite>dan sudah terlambat secara spiritual.</Cite>
            </p>
          </ProseSection>

          <ProseSection id="summary" mobileViz={<SummaryCard />}>
            <h2 className="text-2xl font-light tracking-tight">Tagihan dari Rasa Takut</h2>
            <p>
              Di minggu ke-11, Raka doom scrolling tengah malam. Story Instagram Dira muncul —
              kafe tempat mereka pertama jalan, tapi kali ini ada akun cowok lain yang ditag. Dia
              ga akan pernah tahu kalau di 2.070 semesta lain, cowok di kursi itu adalah dia.
            </p>
            <p>
              Hubungan mereka hancur bukan karena ga cocok atau ga ada rasa. Hancur karena dua
              orang rasional, di dua kamar kos berbeda, sama-sama menyimpulkan keheningan
              pasangannya sebagai penolakan — dan ga ada yang salah dalam kalkulasi mereka.
            </p>
            <p>
              Musuh lo bukan si Dira. Musuh lo adalah <Eq>c = 12</Eq> yang lo pasang terlalu mahal
              sejak awal. Turunin <Eq>c</Eq> lo. Berhenti nyari aman. Minggu ke-8 adalah batas
              atas yang bisa diterima akal sehat.{' '}
              <Cite>
                Lewat dari itu, lo udah bukan lagi optimasi hubungan — lo cuma lagi pake notasi
                stokastik buat mendeskripsikan kematian administratif yang pelan.
              </Cite>
            </p>
          </ProseSection>
        </div>

        {/* Right: sticky viz panel (desktop only) */}
        <div className="hidden md:block">
          <div className="sticky top-0 h-screen flex items-center justify-center px-12">
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeViz}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {vizRegistry[activeViz]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-[#EBEBEB] px-8 md:px-16 py-12 text-center text-xs text-[#6B6B6B] font-mono">
        Ardhian Caesar Hermawan · Universitas Negeri Malang · 2026
      </footer>
    </main>
  )
}
