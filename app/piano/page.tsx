'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'

/* ──────────────────────────────────────────────────────────────────────────
   Secret route — /piano
   "La Fille aux Cheveux de Lin" — Debussy
   MIDI-driven falling-note piano roll synced to mp3 playback.

   Files must be placed manually (not crashed if absent):
     /public/audio/la-fille.mp3
     /public/midi/la-fille.mid
   ──────────────────────────────────────────────────────────────────────── */

interface NoteData {
  midi: number
  time: number
  duration: number
  velocity: number
}

const MIDI_LOW = 48 // C3
const MIDI_HIGH = 84 // C6
const LANES = MIDI_HIGH - MIDI_LOW + 1
const LOOKAHEAD = 4 // seconds of "future" shown above the now-line
const NOW_RATIO = 0.8 // now-line position from the top

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function PianoPage() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Note data + render size kept in refs so the rAF loop reads them without
  // re-subscribing on every state change.
  const notesRef = useRef<NoteData[]>([])
  const sizeRef = useRef<{ w: number; h: number }>({ w: 640, h: 280 })

  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [rollHeight, setRollHeight] = useState(280)

  /* ── Parse MIDI (lazy-loaded, client-only) ── */
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/midi/la-fille.mid')
        if (!res.ok) throw new Error('MIDI not found')
        const buf = await res.arrayBuffer()
        const { Midi } = await import('@tonejs/midi')
        const midi = new Midi(buf)
        const parsed: NoteData[] = []
        for (const track of midi.tracks) {
          for (const n of track.notes) {
            if (n.midi >= MIDI_LOW && n.midi <= MIDI_HIGH) {
              parsed.push({ midi: n.midi, time: n.time, duration: n.duration, velocity: n.velocity })
            }
          }
        }
        if (!cancelled) notesRef.current = parsed
      } catch {
        // Files not placed yet — roll renders empty; page stays alive.
        if (!cancelled) notesRef.current = []
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  /* ── Responsive height (200px on small screens) ── */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const apply = () => setRollHeight(mq.matches ? 200 : 280)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  /* ── Canvas sizing (DPR-aware) ── */
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = container.clientWidth
      const h = rollHeight
      sizeRef.current = { w, h }
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    return () => ro.disconnect()
  }, [rollHeight])

  /* ── Animation loop ── */
  useEffect(() => {
    let raf = 0
    const draw = () => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d') ?? null
      if (ctx) {
        const { w: W, h: H } = sizeRef.current
        const nowY = H * NOW_RATIO
        const pps = nowY / LOOKAHEAD
        const laneW = W / LANES
        const T = audioRef.current ? audioRef.current.currentTime : 0

        ctx.clearRect(0, 0, W, H)
        ctx.fillStyle = '#0A0A08'
        ctx.fillRect(0, 0, W, H)

        ctx.fillStyle = '#F5F5F2'
        for (const n of notesRef.current) {
          const onsetY = nowY - (n.time - T) * pps
          const blockH = Math.max(3, n.duration * pps)
          const top = onsetY - blockH
          if (top > H || onsetY < 0) continue // outside visible window
          const x = (n.midi - MIDI_LOW) * laneW
          const w = Math.max(2, laneW - 2)
          ctx.globalAlpha = 0.25 + 0.75 * n.velocity
          roundRect(ctx, x + 1, top, w, blockH, 3)
          ctx.fill()
        }
        ctx.globalAlpha = 1

        // Now-line
        ctx.strokeStyle = '#3A3A38'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, nowY + 0.5)
        ctx.lineTo(W, nowY + 0.5)
        ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  /* ── Audio event wiring ── */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setCurrentTime(audio.currentTime)
    const onMeta = () => setDuration(audio.duration)
    const onEnded = () => {
      audio.currentTime = 0
      setCurrentTime(0)
      setPlaying(false)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnded)
    // Metadata may already be loaded before listeners attach (preload race).
    if (audio.readyState >= 1 && Number.isFinite(audio.duration)) {
      setDuration(audio.duration)
    }
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    }
  }, [playing])

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current
      if (!audio || !Number.isFinite(duration) || duration <= 0) return
      const rect = e.currentTarget.getBoundingClientRect()
      const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
      audio.currentTime = ratio * duration
      setCurrentTime(audio.currentTime)
    },
    [duration],
  )

  const progress = duration > 0 ? currentTime / duration : 0

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0A0A08] px-6 font-[family-name:var(--font-dm-sans)]">
      <audio ref={audioRef} src="/audio/la-fille.mp3" preload="metadata" />

      <div className="w-full max-w-[640px]">
        {/* Caption */}
        <div className="text-center mb-8">
          <p className="text-xs text-[#6B6B6B] tracking-widest uppercase mb-4">
            La Fille aux Cheveux de Lin — Debussy
          </p>
          <p className="text-sm text-[#4A4A4A] mt-1">
            No barlines. No time signature. Played by feel.
          </p>
        </div>

        {/* Piano roll */}
        <div
          ref={containerRef}
          className="w-full overflow-hidden rounded-md"
          style={{ height: rollHeight }}
        >
          <canvas ref={canvasRef} className="block" />
        </div>

        {/* Player */}
        <div className="mt-8 flex items-center gap-4">
          <motion.button
            type="button"
            onClick={toggle}
            aria-label={playing ? 'Pause' : 'Play'}
            className="shrink-0 w-11 h-11 rounded-full border border-[#2A2A28] text-[#F5F5F2] grid place-items-center hover:border-[#4A4A48] transition-colors"
            animate={playing ? { scale: 1 } : { scale: [1, 1.06, 1] }}
            transition={
              playing
                ? { duration: 0.2 }
                : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {playing ? (
              <Pause className="w-4 h-4" fill="currentColor" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
            )}
          </motion.button>

          <div className="flex-1">
            <div
              onClick={seek}
              className="h-1 w-full rounded-full bg-[#3A3A38] cursor-pointer overflow-hidden"
            >
              <div
                className="h-full bg-[#F5F5F2]"
                style={{ width: `${Math.min(100, progress * 100)}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-[#6B6B6B] tabular-nums">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
