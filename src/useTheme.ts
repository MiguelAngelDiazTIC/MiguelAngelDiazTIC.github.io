import { useEffect, useState } from 'react'
import { readStored, writeStored } from './storage'

type Theme = 'light' | 'dark'

function initialTheme(): Theme {
  const stored = readStored('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    writeStored('theme', next)
  }

  return { theme, toggle }
}
