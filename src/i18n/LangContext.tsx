import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Lang } from '../types'
import { strings } from './strings'
import { LangContext, type LangValue } from './context'
import { readStored, writeStored } from '../storage'

function initialLang(): Lang {
  const stored = readStored('lang')
  if (stored === 'es' || stored === 'en') return stored
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    writeStored('lang', next)
  }, [])

  const value = useMemo<LangValue>(
    () => ({
      lang,
      setLang,
      t: (key) => strings[key][lang],
      l: (v) => v[lang],
    }),
    [lang, setLang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
