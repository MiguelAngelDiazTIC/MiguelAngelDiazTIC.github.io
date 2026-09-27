import { createContext } from 'react'
import type { Lang, Localized } from '../types'
import type { StringKey } from './strings'

export type LangValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Texto de UI por clave */
  t: (key: StringKey) => string
  /** Elige el idioma actual de un valor Localized */
  l: <T>(value: Localized<T>) => T
}

export const LangContext = createContext<LangValue | null>(null)
