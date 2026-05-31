'use client'

import { ReactNode } from 'react'

export function ProseSection({
  id,
  children,
  mobileViz,
}: {
  id: string
  children: ReactNode
  mobileViz?: ReactNode
}) {
  return (
    <section
      data-section={id}
      className="min-h-screen flex flex-col justify-center px-8 md:px-16 py-24 border-b border-[#EBEBEB]"
    >
      {mobileViz && (
        <div className="md:hidden mb-12 -mx-2">{mobileViz}</div>
      )}
      <div className="max-w-xl space-y-5 text-[15px] leading-relaxed text-[#1A1A18]">
        {children}
      </div>
    </section>
  )
}

export function Eq({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono bg-[#F0EEE9] px-1.5 py-0.5 text-sm rounded-sm whitespace-nowrap">
      {children}
    </code>
  )
}

export function Cite({ children }: { children: ReactNode }) {
  return <span className="text-[#6B6B6B] italic">{children}</span>
}
