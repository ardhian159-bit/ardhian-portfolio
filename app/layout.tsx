import type { Metadata } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'
import Providers from './providers'
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
  title: "Ardhian Caesar Hermawan — Data & Strategy",
  description:
    "Economics grad (3.85, Cum Laude) turned full-stack analyst. Building data systems that ship to production.",
  openGraph: {
    title: "Ardhian Caesar Hermawan — Data & Strategy",
    description:
      "Economics grad (3.85, Cum Laude) turned full-stack analyst. Building data systems that ship to production.",
    url: "https://ardhian-portfolio.vercel.app",
    siteName: "Ardhian Caesar Hermawan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ardhian Caesar Hermawan — Data & Strategy",
    description:
      "Economics grad (3.85, Cum Laude) turned full-stack analyst. Building data systems that ship to production.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

