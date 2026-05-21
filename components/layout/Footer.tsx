'use client'

import { profile } from '@/lib/data'
import { useLang } from '@/lib/i18n'
import { content } from '@/lib/content'

export default function Footer() {
  const { lang } = useLang()
  const t = content[lang]
  return (
    <footer className="bg-page border-t border-line py-7" style={{ paddingBottom: 'max(28px, env(safe-area-inset-bottom))' }}>
      <div className="mx-auto max-w-[1200px] px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-ghost">
        <div className="flex items-center gap-2.5">
          <span className="w-[22px] h-[22px] rounded-[6px] bg-emerald-900 text-emerald-100 font-mono text-[10px] grid place-items-center">
            AC
          </span>
          <span>
            {profile.name} · {profile.location} · © 2026
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors duration-160"
          >
            GitHub
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors duration-160"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-ink transition-colors duration-160"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
