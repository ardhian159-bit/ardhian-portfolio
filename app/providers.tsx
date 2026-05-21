'use client'

import { I18nProvider } from '@/lib/i18n'
import LenisProvider from '@/components/providers/LenisProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <LenisProvider>
        {children}
      </LenisProvider>
    </I18nProvider>
  )
}
