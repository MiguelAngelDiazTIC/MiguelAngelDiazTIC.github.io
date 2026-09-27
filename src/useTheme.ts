import { useEffect, useState } from 'react'
import { readStored, writeStored } from './storage'
import { setRevealOrigin, withViewTransition } from './viewTransition'

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

  /** `origin`: punto desde el que se expande el nuevo tema (el botón pulsado) */
  const toggle = (origin?: { x: number; y: number }) => {
    const next = theme === 'dark' ? 'light' : 'dark'
    if (origin) setRevealOrigin(origin.x, origin.y)
    withViewTransition(() => {
      // El DOM tiene que cambiar dentro de la transición, sin esperar al efecto
      document.documentElement.dataset.theme = next
      setTheme(next)
    }, 'theme')
    writeStored('theme', next)
  }

  return { theme, toggle }
}
