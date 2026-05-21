import type { Metadata } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ardhian Caesar Hermawan — Data & Strategy',
  description:
    'Portfolio of Ardhian Caesar Hermawan — Economics graduate, full-stack analyst, and builder of data systems that ship to production. Open to Data Analytics, Management Consulting, and MT roles.',
  openGraph: {
    title: 'Ardhian Caesar Hermawan — Data & Strategy',
    description:
      'Two end-to-end products adopted by management. Next.js · Supabase · Python · SQL · Tableau.',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ardhian Caesar Hermawan — Data & Strategy',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
