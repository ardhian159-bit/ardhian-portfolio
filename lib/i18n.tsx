"use client"
import { createContext, useContext, useState, useEffect } from "react"

type Lang = "en" | "id"
type I18nContextType = { lang: Lang; setLang: (l: Lang) => void }

const I18nContext = createContext<I18nContextType>({ lang: "en", setLang: () => {} })

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang
    if (saved === "en" || saved === "id") setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem("lang", l)
  }

  return <I18nContext.Provider value={{ lang, setLang }}>{children}</I18nContext.Provider>
}

export const useLang = () => useContext(I18nContext)
