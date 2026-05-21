'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Clock } from 'lucide-react'
import { LinkedinIcon } from '@/components/ui/brand-icons'
import { scaleIn, fadeUp, stagger, viewport } from '@/lib/animations'
import { profile } from '@/lib/data'

export default function Contact() {
  return (
    <section className="relative py-24 bg-ink text-on-ink overflow-hidden">
      {/* Subtle dotted grid overlay */}
      <div className="absolute inset-0 dot-grid-dark pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] px-6 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-[18px]">
            <span className="inline-block w-6 h-px bg-emerald-300" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-emerald-300">
              Get in touch
            </span>
            <span className="inline-block w-6 h-px bg-emerald-300" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="font-medium tracking-[-0.03em] leading-[1.04] text-on-ink mb-[18px]"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', textWrap: 'balance' } as React.CSSProperties}
          >
            Looking for someone who ships?
            <br />
            <em className="not-italic text-emerald-300">Let&apos;s talk.</em>
          </motion.h2>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="max-w-[560px] mx-auto mb-9 text-on-ink/62 text-[17px] leading-[1.55]"
          >
            Open to Data Analytics, Management Consulting, and Management Trainee positions.
            Available immediately — based in Surakarta, happy to relocate.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={scaleIn} className="inline-flex flex-wrap gap-3 justify-center">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-[10px] bg-emerald-100 text-emerald-900 text-sm font-medium hover:bg-white active:translate-y-px transition-all duration-160"
            >
              <Mail className="w-4 h-4" />
              {profile.email}
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-[10px] text-on-ink text-sm font-medium border active:translate-y-px transition-all duration-160 hover:bg-white/5"
              style={{ borderColor: 'rgba(245,245,242,0.18)' }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,245,242,0.3)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,245,242,0.18)'
              }}
            >
              <LinkedinIcon className="w-4 h-4" />
              LinkedIn
            </a>
          </motion.div>

          {/* Contact meta */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 justify-center text-[13px]"
            style={{ color: 'rgba(245,245,242,0.45)' }}
          >
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-[13px] h-[13px]" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-[13px] h-[13px]" />
              Replies within 24h
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
