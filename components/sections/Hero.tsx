'use client'

import Image from 'next/image'
import { Mail, MapPin, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, scaleIn, viewport } from '@/lib/animations'
import { profile } from '@/lib/data'
import { GithubIcon, LinkedinIcon } from '@/components/ui/brand-icons'
import { useLang } from '@/lib/i18n'
import { content } from '@/lib/content'

export default function Hero() {
  const { lang } = useLang()
  const t = content[lang]
  return (
    <section
      id="about"
      className="relative pt-24 pb-20 overflow-hidden"
    >
      {/* Dotted grid background — faint, only in hero */}
      <div
        className="absolute inset-0 dot-grid pointer-events-none"
        style={{
          opacity: 0.6,
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)',
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
          {/* Left: text content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Open to work badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 h-[30px] px-3 rounded-full bg-surface border border-line text-xs font-medium text-ink">
                <span
                  className="w-[7px] h-[7px] rounded-full bg-emerald-500 pulse-dot shrink-0"
                  style={{ boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.15)' }}
                />
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="mt-6 mb-5 font-sans font-medium leading-[0.98] tracking-[-0.035em] text-ink"
              style={{ fontSize: 'clamp(40px, 6.4vw, 76px)', textWrap: 'balance' } as React.CSSProperties}
            >
              {t.hero.headline1}{' '}
              <em className="not-italic text-emerald-800">
                {t.hero.headlineAccent}
                <span
                  className="cursor-blink inline-block w-[0.06em] h-[0.8em] bg-emerald-800 ml-[0.06em] align-[-0.05em]"
                />
              </em>
              <br />
              {t.hero.headline2}
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp}
              className="text-[17px] leading-[1.55] text-dim max-w-[520px]"
              style={{ textWrap: 'pretty' } as React.CSSProperties}
            >
              {t.hero.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-8">
              <a
                href="#work"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-[10px] bg-emerald-900 text-emerald-100 text-sm font-medium hover:bg-emerald-800 active:translate-y-px transition-all duration-160"
                style={{ boxShadow: 'var(--shadow-brand)' }}
              >
                {t.hero.cta1}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-[10px] bg-surface text-ink border border-line text-sm font-medium hover:bg-line active:translate-y-px transition-all duration-160"
              >
                <Mail className="w-4 h-4" />
                {t.hero.cta2}
              </a>
            </motion.div>

            {/* Social links + location */}
            <motion.div variants={fadeUp} className="flex items-center gap-1 mt-7">
              <a
                href={profile.githubUrl}
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[38px] h-[38px] rounded-[10px] inline-flex items-center justify-center text-dim border border-transparent hover:text-ink hover:bg-surface hover:border-line transition-all duration-160"
              >
                <GithubIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href={profile.linkedinUrl}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[38px] h-[38px] rounded-[10px] inline-flex items-center justify-center text-dim border border-transparent hover:text-ink hover:bg-surface hover:border-line transition-all duration-160"
              >
                <LinkedinIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="w-[38px] h-[38px] rounded-[10px] inline-flex items-center justify-center text-dim border border-transparent hover:text-ink hover:bg-surface hover:border-line transition-all duration-160"
              >
                <Mail className="w-[18px] h-[18px]" />
              </a>
              <span className="w-px h-5 bg-line mx-2.5" />
              <span className="text-xs text-ghost inline-flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                Surakarta, Indonesia · UTC+7
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.24 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="relative rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="relative">
                {/* Dot grid — bottom right corner */}
                <div
                  className="absolute -bottom-6 -right-6 w-48 h-48 -z-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #1A1A18 1.5px, transparent 1.5px)',
                    backgroundSize: '14px 14px',
                    opacity: 0.1
                  }}
                />

                {/* Accent line — left side */}
                <div className="absolute -left-3 top-8 bottom-8 w-1 bg-emerald-600 rounded-full opacity-60" />

                {/* Photo */}
                <div className="w-64 h-96 rounded-2xl overflow-hidden border border-[#EBEBEB] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)]">
                  <Image
                    src="/photo.jpg"
                    alt="Ardhian Caesar Hermawan"
                    width={256}
                    height={384}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
