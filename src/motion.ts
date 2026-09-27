/**
 * Movimiento de la página que no pertenece a un componente concreto:
 * - revelado al hacer scroll: cabeceras de sección, tarjetas y la banda de proyectos entran
 *   al cruzar el viewport; las que entran juntas lo hacen escalonadas;
 * - llegada: al pulsar un enlace interno, cuando termina el scroll la sección destino lo señala;
 * - luz de las tarjetas: un brillo suave sigue al puntero sobre cada tarjeta.
 * Sin JS no se oculta nada: el estado oculto solo existe con `reveal-on` en <html>.
 */

const REVEAL = '.section-head, .card, .band'

export function enableReveal() {
  document.documentElement.classList.add('reveal-on')
}

export function startMotion() {
  const cleanups = [startReveal(), startArrival(), startCardLight()]
  return () => cleanups.forEach((fn) => fn())
}

function startReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      // Las que entran en el mismo fotograma forman una lista: escalonadas, con el retraso acotado
      let i = 0
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        el.style.setProperty('--d', `${Math.min(i++, 4) * 80}ms`)
        el.dataset.in = ''
        io.unobserve(el)
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )

  const watch = (root: ParentNode) =>
    root.querySelectorAll<HTMLElement>(REVEAL).forEach((el) => {
      if (!('in' in el.dataset)) io.observe(el)
    })
  watch(document)

  // Tarjetas que React monta más tarde (p. ej. al cambiar de idioma) también entran
  const mo = new MutationObserver((records) => {
    for (const r of records)
      r.addedNodes.forEach((n) => {
        if (!(n instanceof HTMLElement)) return
        if (n.matches(REVEAL) && !('in' in n.dataset)) io.observe(n)
        watch(n)
      })
  })
  const main = document.querySelector('main')
  if (main) mo.observe(main, { childList: true, subtree: true })

  return () => {
    io.disconnect()
    mo.disconnect()
  }
}

function startArrival() {
  const timers = new WeakMap<HTMLElement, number>()

  const arrive = (el: HTMLElement) => {
    // Quitar, forzar reflow y volver a poner: la animación se repite en cada llegada
    delete el.dataset.arrived
    void el.offsetWidth
    el.dataset.arrived = ''
    clearTimeout(timers.get(el))
    timers.set(el, window.setTimeout(() => delete el.dataset.arrived, 1600))
  }

  let stopScroll = () => {}

  const onClick = (e: MouseEvent) => {
    // Ctrl/Cmd/Mayús + clic o botón central: el navegador decide (nueva pestaña, etc.)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
    const id = a?.getAttribute('href')?.slice(1)
    const el = id ? document.getElementById(id) : null
    if (!a || !el) return

    e.preventDefault()
    stopScroll()
    if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`)

    const land = () => {
      // Lo que haría el enlace nativo: el foco sigue en la sección de destino (teclado y lectores)
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
      el.focus({ preventScroll: true })
      arrive(el)
    }

    const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
    const max = document.documentElement.scrollHeight - innerHeight
    const to = Math.min(max, Math.max(0, el.getBoundingClientRect().top + scrollY - pad))
    stopScroll = scrollToY(to, land)
  }

  document.addEventListener('click', onClick)
  return () => {
    document.removeEventListener('click', onClick)
    stopScroll()
  }
}

/**
 * Scroll propio en lugar de `scroll-behavior: smooth`, que depende del navegador (Chrome permite
 * desactivarlo y entonces salta de golpe). Acelera y frena con suavidad; la duración crece con la
 * distancia pero con techo. Si el usuario toca la rueda, el teclado o la pantalla, se detiene.
 * Con movimiento reducido no hay recorrido: la página funde de una posición a la otra.
 */
function scrollToY(to: number, done: () => void) {
  const from = scrollY
  const distance = to - from
  const jump = () => window.scrollTo({ top: to, behavior: 'instant' })

  if (Math.abs(distance) < 2) {
    done()
    return () => {}
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if ('startViewTransition' in document) document.startViewTransition(jump).finished.then(done)
    else {
      jump()
      done()
    }
    return () => {}
  }

  const duration = Math.min(1100, 380 + Math.abs(distance) * 0.28)
  // ease-in-out cúbica: arranca sin tirón y se posa sin frenazo
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
  const start = performance.now()
  let frame = 0

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    window.scrollTo({ top: from + distance * ease(t), behavior: 'instant' })
    if (t < 1) frame = requestAnimationFrame(step)
    else {
      cleanup()
      done()
    }
  }

  const interrupt = () => cleanup()
  const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const
  const cleanup = () => {
    cancelAnimationFrame(frame)
    events.forEach((ev) => window.removeEventListener(ev, interrupt))
  }
  events.forEach((ev) => window.addEventListener(ev, interrupt, { passive: true }))
  frame = requestAnimationFrame(step)
  return cleanup
}

function startCardLight() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {}

  let frame = 0
  let last: PointerEvent | null = null

  const paint = () => {
    frame = 0
    if (!last) return
    const card = (last.target as Element).closest?.<HTMLElement>('.card')
    if (!card) return
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${last.clientX - r.left}px`)
    card.style.setProperty('--my', `${last.clientY - r.top}px`)
  }

  const onMove = (e: PointerEvent) => {
    last = e
    if (!frame) frame = requestAnimationFrame(paint)
  }

  document.addEventListener('pointermove', onMove, { passive: true })
  return () => {
    document.removeEventListener('pointermove', onMove)
    cancelAnimationFrame(frame)
  }
}
