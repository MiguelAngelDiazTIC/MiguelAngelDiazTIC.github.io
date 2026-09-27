import { flushSync } from 'react-dom'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Aplica un cambio de estado dentro de una View Transition si el navegador la soporta
 * y el usuario no pide menos movimiento. `kind` añade una clase a <html> para que el CSS
 * elija la animación (p. ej. el círculo del cambio de tema).
 */
export function withViewTransition(update: () => void, kind?: string) {
  if (!('startViewTransition' in document) || reducedMotion()) {
    update()
    return
  }
  const root = document.documentElement
  if (kind) root.classList.add(`vt-${kind}`)
  const transition = document.startViewTransition(() => flushSync(update))
  transition.finished.finally(() => {
    if (kind) root.classList.remove(`vt-${kind}`)
  })
}

/** Guarda el centro del círculo del cambio de tema y el radio que cubre toda la pantalla */
export function setRevealOrigin(x: number, y: number) {
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const s = document.documentElement.style
  s.setProperty('--vt-x', `${x}px`)
  s.setProperty('--vt-y', `${y}px`)
  s.setProperty('--vt-r', `${r}px`)
}
